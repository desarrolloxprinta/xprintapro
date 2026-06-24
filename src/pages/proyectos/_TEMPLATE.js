/**
 * Proyecto: [NOMBRE DEL PROYECTO]
 *
 * INSTRUCCIONES DE USO:
 * 1. Copiar este archivo y renombrarlo a: tu-proyecto.js
 * 2. Reemplazar [NOMBRE DEL PROYECTO] con el nombre real
 * 3. Reemplazar [slug-proyecto] con el slug (mismo que el JSON)
 * 4. Reemplazar [TuProyecto] con CamelCase del nombre
 * 5. Importar en main.js y agregar la ruta
 *
 * @module pages/proyectos/[slug-proyecto]
 */

import { createProjectPage } from '../../templates/project-template.js'
import tuProyectoData from '../../data/projects/[slug-proyecto].json'

/**
 * Genera el HTML completo del proyecto [NOMBRE DEL PROYECTO]
 * usando la plantilla universal
 *
 * @returns {Promise<string>} HTML completo con header + proyecto + footer
 */
export const get[TuProyecto]HTML = async () => await createProjectPage(tuProyectoData)
