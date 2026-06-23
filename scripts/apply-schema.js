/**
 * Aplica el esquema SQL a Supabase usando el service_role key
 * Ejecutar con: node scripts/apply-schema.js
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer credenciales desde .env.local
const envPath = path.join(__dirname, '../.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ Archivo .env.local no encontrado.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const envLines = envContent.split('\n');
const env = {};

envLines.forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

// Extraer service_role key del comentario
const serviceRoleMatch = envContent.match(/# VITE_SUPABASE_SERVICE_ROLE_KEY=(.+)/);
const serviceRoleKey = serviceRoleMatch ? serviceRoleMatch[1].trim() : null;

const supabaseUrl = env.VITE_SUPABASE_URL;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Credenciales de Supabase no configuradas correctamente');
  console.error('URL:', supabaseUrl ? '✓' : '✗');
  console.error('Service Role Key:', serviceRoleKey ? '✓' : '✗');
  process.exit(1);
}

// Crear cliente con service_role (tiene privilegios de admin)
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Ejecuta un bloque SQL
 */
async function executeSQL(sql, description) {
  console.log(`\n📝 Ejecutando: ${description}...`);

  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      // Si la función exec_sql no existe, intentar crear las tablas directamente
      if (error.code === 'PGRST202') {
        console.log('⚠️  Función exec_sql no disponible, usando enfoque alternativo...');
        return { success: false, needsManual: true };
      }
      throw error;
    }

    console.log(`  ✅ ${description} ejecutado correctamente`);
    return { success: true };
  } catch (error) {
    console.error(`  ❌ Error en ${description}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Lee y divide el archivo SQL en bloques ejecutables
 */
function parseSQLFile(filePath) {
  const sqlContent = fs.readFileSync(filePath, 'utf-8');

  // Dividir por secciones comentadas
  const sections = [];
  const lines = sqlContent.split('\n');
  let currentSection = { name: '', sql: '' };

  for (const line of lines) {
    // Detectar inicio de nueva sección
    const sectionMatch = line.match(/^-- (\d+)\. (.+)/);
    if (sectionMatch) {
      if (currentSection.sql.trim()) {
        sections.push(currentSection);
      }
      currentSection = {
        name: sectionMatch[2],
        sql: ''
      };
    } else if (line.trim() && !line.startsWith('--')) {
      currentSection.sql += line + '\n';
    }
  }

  // Agregar última sección
  if (currentSection.sql.trim()) {
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Main
 */
async function main() {
  console.log('🚀 Aplicando esquema SQL a Supabase...\n');
  console.log(`📡 URL: ${supabaseUrl}`);
  console.log(`🔑 Service Role Key: ${serviceRoleKey.substring(0, 20)}...`);

  const schemaPath = path.join(__dirname, '../supabase/schema.sql');

  if (!fs.existsSync(schemaPath)) {
    console.error('❌ Archivo schema.sql no encontrado');
    process.exit(1);
  }

  console.log(`📄 Leyendo esquema desde: ${schemaPath}\n`);

  const sections = parseSQLFile(schemaPath);

  console.log(`📋 ${sections.length} secciones detectadas\n`);

  let successCount = 0;
  let failCount = 0;
  let needsManual = false;

  for (const section of sections) {
    const result = await executeSQL(section.sql, section.name);

    if (result.needsManual) {
      needsManual = true;
      break;
    }

    if (result.success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  if (needsManual) {
    console.log('\n⚠️  APLICACIÓN MANUAL REQUERIDA\n');
    console.log('La API de Supabase no soporta ejecución SQL directa desde el cliente.');
    console.log('Por favor, aplica el esquema manualmente:\n');
    console.log('1. Ve a: https://app.supabase.com/project/bdotuurxrdksolhywapd/sql/new');
    console.log('2. Copia el contenido de: supabase/schema.sql');
    console.log('3. Ejecuta el query en el SQL Editor');
    console.log('4. Luego ejecuta: node scripts/migrate-to-supabase.js\n');
    process.exit(0);
  }

  console.log(`\n✅ Completado: ${successCount} exitosos, ${failCount} fallidos`);

  if (failCount === 0) {
    console.log('\n🎉 ¡Esquema aplicado correctamente!');
    console.log('👉 Siguiente paso: node scripts/migrate-to-supabase.js');
  }
}

main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
