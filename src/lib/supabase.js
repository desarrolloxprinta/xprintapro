/**
 * Cliente de Supabase
 * Configuración centralizada para acceso a la base de datos
 */

import { createClient } from '@supabase/supabase-js';

// Obtener credenciales desde variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// DEBUG temporal
console.log('🔍 Supabase config check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  url: supabaseUrl,
  keyLength: supabaseAnonKey?.length
});

// Validar que existan las credenciales
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Credenciales de Supabase no configuradas. Usando datos de fallback (JSON).');
}

// Crear cliente de Supabase
let supabase = null;
try {
  if (supabaseUrl && supabaseAnonKey) {
    // Limpiar valores (eliminar espacios/saltos de línea)
    const cleanUrl = supabaseUrl.trim();
    const cleanKey = supabaseAnonKey.trim();

    console.log('🔧 Creating Supabase client with:', {
      urlLength: cleanUrl.length,
      keyLength: cleanKey.length,
      urlValid: cleanUrl.startsWith('https://'),
      keyValid: cleanKey.startsWith('eyJ')
    });

    // Crear cliente con opciones explícitas
    const options = {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      },
      global: {
        headers: {}
      }
    };

    supabase = createClient(cleanUrl, cleanKey, options);
    console.log('✅ Supabase client created successfully with options:', options);
  }
} catch (error) {
  console.error('❌ Error creating Supabase client:', error);
  supabase = null;
}

export { supabase };

/**
 * Verifica si Supabase está configurado
 * @returns {boolean}
 */
export function isSupabaseConfigured() {
  return supabase !== null;
}

/**
 * Obtiene todos los proyectos publicados, ordenados por fecha
 * @param {number} limit - Número máximo de proyectos a obtener
 * @returns {Promise<Array>}
 */
export async function getProjects(limit = null) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase no configurado. Retornando datos de fallback.');
    return getFallbackProjects();
  }

  try {
    console.log('🔍 Using direct fetch to Supabase REST API...');

    // Construir URL con query params
    let url = `${supabaseUrl.trim()}/rest/v1/projects?select=*&published=eq.true&order=created_date.desc`;
    if (limit) {
      url += `&limit=${limit}`;
    }

    console.log('📡 Fetching from:', url.substring(0, 80) + '...');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey.trim(),
        'Authorization': `Bearer ${supabaseAnonKey.trim()}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    });

    console.log('📦 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ HTTP error:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Query successful, returning', data?.length, 'projects');
    return data || [];
  } catch (error) {
    console.error('Error obteniendo proyectos:', error);
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      stack: error?.stack?.substring(0, 200),
      name: error?.name
    });
    console.warn('⚠️ Falling back to local JSON data');
    return getFallbackProjects();
  }
}

/**
 * Obtiene los N proyectos más recientes
 * @param {number} count - Número de proyectos (default: 3)
 * @returns {Promise<Array>}
 */
export async function getRecentProjects(count = 3) {
  return getProjects(count);
}

/**
 * Obtiene un proyecto por su slug
 * @param {string} slug - Slug del proyecto (ej: "redeia", "arval")
 * @returns {Promise<Object|null>}
 */
export async function getProjectBySlug(slug) {
  if (!supabase) {
    console.warn('Supabase no configurado. Retornando datos de fallback.');
    return getFallbackProjectBySlug(slug);
  }

  try {
    // Obtener proyecto principal
    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;
    if (!project) return null;

    // Obtener blueprints del proyecto
    const { data: blueprints } = await supabase
      .from('project_blueprints')
      .select('*')
      .eq('project_id', project.id)
      .order('sort_order', { ascending: true });

    // Obtener galería del proyecto
    const { data: gallery } = await supabase
      .from('project_gallery')
      .select('*')
      .eq('project_id', project.id)
      .order('sort_order', { ascending: true });

    // Combinar datos
    return {
      ...project,
      blueprints: blueprints || [],
      gallery: gallery || []
    };
  } catch (error) {
    console.error('Error obteniendo proyecto:', error);
    return getFallbackProjectBySlug(slug);
  }
}

/**
 * Obtiene posts del blog, ordenados por fecha
 * @param {number} limit - Número máximo de posts
 * @returns {Promise<Array>}
 */
export async function getBlogPosts(limit = null) {
  if (!supabase) {
    console.warn('Supabase no configurado. Retornando array vacío.');
    return [];
  }

  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_date', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error obteniendo blog posts:', error);
    return [];
  }
}

/**
 * Obtiene un post del blog por su slug
 * @param {string} slug - Slug del post
 * @returns {Promise<Object|null>}
 */
export async function getBlogPostBySlug(slug) {
  if (!supabase) {
    console.warn('Supabase no configurado.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error obteniendo blog post:', error);
    return null;
  }
}

// ============================================
// FUNCIONES DE FALLBACK (cuando Supabase no está configurado)
// ============================================

/**
 * Datos de fallback para proyectos (JSON local)
 */
async function getFallbackProjects() {
  try {
    const arval = await import('../data/projects/arval.json');
    const redeia = await import('../data/projects/redeia.json');

    const projects = [arval.default, redeia.default]
      .map(p => ({
        ...p,
        slug: p.id,
        published: true,
        created_date: p.createdDate
      }))
      .sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

    return projects;
  } catch (error) {
    console.error('Error cargando proyectos de fallback:', error);
    return [];
  }
}

/**
 * Obtiene un proyecto de fallback por slug
 */
async function getFallbackProjectBySlug(slug) {
  try {
    const projectData = await import(`../data/projects/${slug}.json`);
    return {
      ...projectData.default,
      slug: projectData.default.id,
      blueprints: projectData.default.blueprints || [],
      gallery: projectData.default.gallery || []
    };
  } catch (error) {
    console.error(`Error cargando proyecto ${slug}:`, error);
    return null;
  }
}
