/**
 * Proyecto Redeia - Plantilla Madre
 *
 * Este proyecto usa la plantilla universal y sirve como referencia
 * para todos los demás proyectos.
 *
 * Carga dinámica desde Supabase con fallback automático a JSON local.
 *
 * @module pages/proyectos/redeia
 */

import { createProjectPage } from '../../templates/project-template.js'
import { getProjectBySlug } from '../../lib/supabase.js'
import redeiaData from '../../data/projects/redeia.json'

/**
 * Genera el HTML completo del proyecto Redeia
 * usando la plantilla universal
 *
 * Intenta cargar desde Supabase primero. Si no encuentra datos
 * o hay un error de conexión, hace fallback automático al JSON local.
 *
 * @returns {Promise<string>} HTML completo con header + proyecto + footer
 */
export const getRedeiaHTML = async () => {
  let projectData = redeiaData // Fallback por defecto

  try {
    console.log('🔍 [Redeia] Intentando cargar desde Supabase...')

    // Intentar obtener datos de Supabase
    const supabaseData = await getProjectBySlug('redeia')

    if (supabaseData) {
      console.log('✅ [Redeia] Datos cargados desde Supabase')
      projectData = supabaseData
    } else {
      console.warn('⚠️ [Redeia] No se encontró en Supabase, usando JSON local')
    }
  } catch (error) {
    console.warn('⚠️ [Redeia] Error consultando Supabase, usando fallback local:', error.message)
  }

  return await createProjectPage(projectData)
}
