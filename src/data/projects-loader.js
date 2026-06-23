/**
 * Carga dinámica de proyectos desde /src/data/projects/
 * Ordena por fecha de creación (más reciente primero)
 */

// Importar todos los proyectos disponibles
import arvalData from './projects/arval.json';
import redeiaData from './projects/redeia.json';

/**
 * Lista de todos los proyectos disponibles
 * Se actualiza automáticamente al agregar nuevos archivos JSON
 */
const allProjects = [
  arvalData,
  redeiaData
];

/**
 * Obtiene todos los proyectos ordenados por fecha (más reciente primero)
 * @returns {Array} Lista de proyectos ordenada
 */
export function getAllProjects() {
  return allProjects
    .filter(p => p.createdDate) // Solo proyectos con fecha
    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
}

/**
 * Obtiene los N proyectos más recientes
 * @param {number} count - Número de proyectos a obtener (default: 3)
 * @returns {Array} Lista de proyectos recientes
 */
export function getRecentProjects(count = 3) {
  return getAllProjects().slice(0, count);
}

/**
 * Obtiene un proyecto por su ID
 * @param {string} id - ID del proyecto
 * @returns {Object|null} Proyecto encontrado o null
 */
export function getProjectById(id) {
  return allProjects.find(p => p.id === id) || null;
}

/**
 * Formatea un proyecto para el slider del header
 * @param {Object} project - Datos del proyecto
 * @returns {Object} Proyecto formateado para el slider
 */
export function formatProjectForSlider(project) {
  return {
    id: project.id,
    title: project.title,
    category: project.category || project.sector,
    description: project.shortDescription || project.client?.description || '',
    image: project.hero.image || project.gallery?.[0]?.image,
    video: project.hero.video,
    url: `/proyecto-${project.id}.html`
  };
}

/**
 * Obtiene los proyectos recientes formateados para el header
 * @param {number} count - Número de proyectos (default: 3)
 * @returns {Array} Proyectos formateados
 */
export function getRecentProjectsForSlider(count = 3) {
  return getRecentProjects(count).map(formatProjectForSlider);
}
