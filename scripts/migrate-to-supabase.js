/**
 * Script de migración de datos JSON a Supabase
 * Ejecutar con: node scripts/migrate-to-supabase.js
 */

import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer credenciales desde .env.local
const envPath = path.join(__dirname, '../.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ Archivo .env.local no encontrado.');
  console.error('   Copia .env.example a .env.local y configura tus credenciales de Supabase.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');

// Extraer URL y Key directamente con regex
const urlMatch = envContent.match(/VITE_SUPABASE_URL=(.*)/);
// Usar service_role key para tener permisos de escritura (bypassea RLS)
const serviceRoleMatch = envContent.match(/# VITE_SUPABASE_SERVICE_ROLE_KEY=(.*)/);

const supabaseUrl = urlMatch ? urlMatch[1].trim() : null;
const supabaseKey = serviceRoleMatch ? serviceRoleMatch[1].trim() : null;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Credenciales de Supabase no configuradas en .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    transport: ws
  }
});

/**
 * Migra un proyecto JSON a Supabase
 */
async function migrateProject(projectFile) {
  const projectPath = path.join(__dirname, '../src/data/projects', projectFile);
  const projectData = JSON.parse(fs.readFileSync(projectPath, 'utf-8'));

  console.log(`\n📦 Migrando proyecto: ${projectData.title}`);

  try {
    // 1. Insertar proyecto principal
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .upsert({
        slug: projectData.id,
        title: projectData.title,
        short_description: projectData.shortDescription || projectData.client?.description,
        category: projectData.category || projectData.sector,
        sector: projectData.sector,
        created_date: projectData.createdDate,
        published: true,
        featured: true,

        // Hero
        hero_video: projectData.hero?.video,
        hero_image: projectData.hero?.image,

        // Client
        client_name: projectData.client?.name,
        client_description: projectData.client?.description,

        // Service
        service_title: projectData.service?.title,
        service_logo: projectData.service?.logo,

        // Location
        location_title: projectData.location?.title,
        location_description: projectData.location?.description,
        location_type: projectData.location?.type,
        location_markers: projectData.location?.markers,

        // Story
        challenge_title: projectData.story?.challengeTitle,
        challenge_description: projectData.story?.challenge,
        challenge_image: projectData.story?.challengeImage,
        solution_title: projectData.story?.solutionTitle,
        solution_description: projectData.story?.solution,
        solution_image: projectData.story?.solutionImage,

        // 3D Render
        render3d_title: projectData.render3d?.title,
        render3d_description: projectData.render3d?.description,
        render3d_model_url: projectData.render3d?.model,

        // Testimonial
        testimonial_quote: projectData.testimonial?.quote,
        testimonial_author: projectData.testimonial?.author,
        testimonial_role: projectData.testimonial?.role
      }, {
        onConflict: 'slug'
      })
      .select()
      .single();

    if (projectError) throw projectError;

    console.log(`  ✅ Proyecto insertado con ID: ${project.id}`);

    // 2. Insertar blueprints
    if (projectData.blueprints && projectData.blueprints.length > 0) {
      // Eliminar blueprints antiguos
      await supabase
        .from('project_blueprints')
        .delete()
        .eq('project_id', project.id);

      const blueprints = projectData.blueprints.map((imageUrl, index) => ({
        project_id: project.id,
        image_url: imageUrl,
        title: projectData.blueprintSteps?.[index]?.title || `Plano ${index + 1}`,
        description: projectData.blueprintSteps?.[index]?.description || '',
        sort_order: index
      }));

      const { error: blueprintsError } = await supabase
        .from('project_blueprints')
        .insert(blueprints);

      if (blueprintsError) throw blueprintsError;

      console.log(`  ✅ ${blueprints.length} blueprints insertados`);
    }

    // 3. Insertar galería
    if (projectData.gallery && projectData.gallery.length > 0) {
      // Eliminar galería antigua
      await supabase
        .from('project_gallery')
        .delete()
        .eq('project_id', project.id);

      const gallery = projectData.gallery.map((item, index) => ({
        project_id: project.id,
        image_url: item.image || item,
        alt_text: item.alt || `Imagen ${index + 1}`,
        grid_cols: item.gridCols || 4,
        height: item.height || '60vh',
        sort_order: index
      }));

      const { error: galleryError } = await supabase
        .from('project_gallery')
        .insert(gallery);

      if (galleryError) throw galleryError;

      console.log(`  ✅ ${gallery.length} imágenes de galería insertadas`);
    }

    console.log(`✅ Proyecto "${projectData.title}" migrado exitosamente\n`);

  } catch (error) {
    console.error(`❌ Error migrando proyecto ${projectData.id}:`, error.message);
  }
}

/**
 * Ejecutar migración
 */
async function main() {
  console.log('🚀 Iniciando migración de datos a Supabase...\n');
  console.log(`📡 URL: ${supabaseUrl}\n`);

  const projectsDir = path.join(__dirname, '../src/data/projects');
  const projectFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));

  console.log(`📁 Proyectos encontrados: ${projectFiles.length}\n`);

  for (const file of projectFiles) {
    await migrateProject(file);
  }

  console.log('✅ Migración completada!\n');
  console.log('👉 Verifica los datos en: https://app.supabase.com/project/_/editor');
}

main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
