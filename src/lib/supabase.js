/**
 * Cliente de Supabase
 * Configuración centralizada para acceso a la base de datos
 */

import { createClient } from '@supabase/supabase-js';

// Obtener credenciales desde variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validar que existan las credenciales
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Credenciales de Supabase no configuradas. Usando datos de fallback (JSON).');
}

// Crear cliente de Supabase
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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
  if (!supabase) {
    console.warn('Supabase no configurado. Retornando datos de fallback.');
    return getFallbackProjects();
  }

  try {
    let query = supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('created_date', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error obteniendo proyectos:', error);
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
