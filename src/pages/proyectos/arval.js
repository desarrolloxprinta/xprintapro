/**
 * Proyecto Arval - Rótulo de Coronación
 *
 * Rótulo corpóreo iluminado para Arval, líder en renting y gestión de flotas.
 * Usa la plantilla universal de proyectos.
 *
 * Carga dinámica desde Supabase con fallback automático a JSON local.
 *
 * @module pages/proyectos/arval
 */

import { createProjectPage } from '../../templates/project-template.js'
import { getProjectBySlug } from '../../lib/supabase.js'
import arvalData from '../../data/projects/arval.json'

/**
 * Genera el HTML completo del proyecto Arval
 * usando la plantilla universal
 *
 * Intenta cargar desde Supabase primero. Si no encuentra datos
 * o hay un error de conexión, hace fallback automático al JSON local.
 *
 * @returns {Promise<string>} HTML completo con header + proyecto + footer
 */
export const getArvalHTML = async () => {
  let projectData = arvalData // Fallback por defecto

  try {
    console.log('🔍 [Arval] Intentando cargar desde Supabase...')

    // Intentar obtener datos de Supabase
    const supabaseData = await getProjectBySlug('arval')

    if (supabaseData) {
      console.log('✅ [Arval] Datos cargados desde Supabase')
      projectData = supabaseData
    } else {
      console.warn('⚠️ [Arval] No se encontró en Supabase, usando JSON local')
    }
  } catch (error) {
    console.warn('⚠️ [Arval] Error consultando Supabase, usando fallback local:', error.message)
  }

  return await createProjectPage(projectData)
}
