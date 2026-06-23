/**
 * Proyecto Redeia - Plantilla Madre
 *
 * Este proyecto usa la plantilla universal y sirve como referencia
 * para todos los demás proyectos.
 *
 * @module pages/proyectos/redeia
 */

import { createProjectPage } from '../../templates/project-template.js'
import redeiaData from '../../data/projects/redeia.json'

/**
 * Genera el HTML completo del proyecto Redeia
 * usando la plantilla universal
 *
 * @returns {string} HTML completo con header + proyecto + footer
 */
export const getRedeiaHTML = () => createProjectPage(redeiaData)
