/**
 * Proyecto Arval - Rótulo de Coronación
 *
 * Rótulo corpóreo iluminado para Arval, líder en renting y gestión de flotas.
 * Usa la plantilla universal de proyectos.
 *
 * @module pages/proyectos/arval
 */

import { createProjectPage } from '../../templates/project-template.js'
import arvalData from '../../data/projects/arval.json'

/**
 * Genera el HTML completo del proyecto Arval
 * usando la plantilla universal
 *
 * @returns {string} HTML completo con header + proyecto + footer
 */
export const getArvalHTML = () => createProjectPage(arvalData)
