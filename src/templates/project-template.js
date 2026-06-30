/**
 * PLANTILLA UNIVERSAL DE PROYECTO - XPRINTA PRO
 *
 * Esta es la plantilla estándar para TODOS los proyectos.
 * Todas las páginas de proyecto deben seguir esta estructura.
 *
 * ESTRUCTURA OBLIGATORIA:
 * 1. Hero (título + video/imagen)
 * 2. Meta Bento (cliente, sector, servicio)
 * 3. Location (opcional - mapa)
 * 4. Storytelling (desafío y solución)
 * 5. Blueprints (opcional - planos técnicos)
 * 6. 3D Render (opcional - modelo 3D)
 * 7. Gallery (opcional - fotos finales)
 * 8. Testimonial (opcional - quote del cliente)
 *
 * USO:
 * import { createProjectPage } from './templates/project-template.js'
 *
 * const html = createProjectPage(projectData)
 * document.querySelector('#app').innerHTML = html
 *
 * @module project-template
 */

import { createLayout } from '../layout.js'
import content from '../data/content.json'

/**
 * Renderiza la sección Hero del proyecto
 * @param {Object} data - Datos del proyecto
 * @returns {string} HTML del hero
 */
const renderHero = (data) => `
  <section class="project-hero" style="width: 100%; min-height: 100vh; padding-top: 27vh; padding-bottom: 5vh; background-color: var(--color-background); display: flex; flex-direction: column; align-items: center; justify-content: flex-start; overflow: hidden;">

    <div class="hero-text-container" style="text-align: center; z-index: 2; position: relative; padding: 0 5vw; margin-bottom: 5vh; width: 100%;">
      <h1 class="hero-title text-large font-serif font-regular text-primary" style="font-size: clamp(2.5rem, 3vw, 4rem); margin-bottom: 2rem; max-width: 1400px; margin-left: auto; margin-right: auto; overflow: hidden;">
        <span class="hero-title-inner" style="display: block; transform: translateY(110%);">${data.title}</span>
      </h1>
    </div>

    <div class="hero-media-wrapper" style="width: 95vw; height: 75vh; position: relative; z-index: 1; overflow: hidden; border-radius: 30px;">
      ${data.hero.video ? `
      <video class="hero-media" autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover;">
        <source src="${data.hero.video}" type="video/mp4" />
      </video>
      ` : `
      <img class="hero-media" src="${data.hero.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;" />
      `}
    </div>
  </section>
`

/**
 * Renderiza la sección Meta Bento (Cliente, Sector, Servicio)
 * @param {Object} data - Datos del proyecto
 * @returns {string} HTML del meta bento
 */
const renderMetaBento = (data) => {
  const ui = content.projectUi.labels;
  return `
  <section class="project-meta" style="padding: 6rem 0; background-color: var(--color-secondary); color: var(--color-primary);">
    <div class="container-fluid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1px; background: rgba(0,0,0,0.05); border-top: 1px solid rgba(0,0,0,0.05); border-bottom: 1px solid rgba(0,0,0,0.05);">

      <div class="meta-item gsap-bento-item" style="background: var(--color-secondary); padding: 4rem 2rem; display: flex; flex-direction: column; justify-content: flex-start;">
        <span class="text-caption text-muted text-uppercase" style="margin-bottom: 2rem; display: block;">${ui.cliente}</span>
        <div>
          <h3 class="font-serif font-regular" style="font-size: 2.5rem; margin-bottom: 1rem;">${data.client.name}</h3>
          <p class="text-body-hero">${data.client.description}</p>
          ${data.service?.logo ? `<img src="${data.service.logo}" alt="${data.client.name} Logo" style="max-width: 150px; margin-top: 2rem; mix-blend-mode: multiply;" />` : ''}
        </div>
      </div>

      <div class="meta-item gsap-bento-item" style="background: var(--color-secondary); padding: 4rem 2rem; display: flex; flex-direction: column; justify-content: flex-start;">
        <span class="text-caption text-muted text-uppercase" style="margin-bottom: 2rem; display: block;">${ui.sector}</span>
        <h3 class="font-serif font-regular" style="font-size: 2.5rem;">${data.sector}</h3>
      </div>

      <div class="meta-item gsap-bento-item" style="background: var(--color-secondary); padding: 4rem 2rem; display: flex; flex-direction: column; justify-content: flex-start;">
        <span class="text-caption text-muted text-uppercase" style="margin-bottom: 2rem; display: block;">${ui.servicio}</span>
        <h3 class="font-serif font-regular" style="font-size: 2.5rem;">${data.service.title}</h3>
      </div>

    </div>
  </section>
  `
}

/**
 * Renderiza la sección de ubicación (opcional)
 * @param {Object} data - Datos del proyecto
 * @returns {string} HTML de location o string vacío
 */
const renderLocation = (data) => {
  if (!data.location) return '';

  const ui = content.projectUi.labels;
  return `
  <section class="project-location" style="position: relative; height: 80vh; min-height: 600px; background-color: var(--color-primary); color: #FFFFFF; overflow: hidden; display: flex; align-items: center;">

    <!-- Background Map -->
    <div style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1;">
      <div id="google-map" style="width: 100%; height: 100%;" ${data.location.markers ? `data-markers='${JSON.stringify(data.location.markers)}'` : ''}></div>
      <div style="position: absolute; inset: 0; background: linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) 15%, transparent 60%); pointer-events: none; z-index: 2;"></div>
    </div>

    <!-- Foreground Text -->
    <div class="container-fluid" style="position: relative; z-index: 10; width: 100%;">
      <div class="gsap-reveal location-content" style="max-width: 500px;">
        <h2 class="text-large font-serif font-regular text-inverse" style="margin-bottom: 1.5rem;">${ui.ubicacion}</h2>
        ${data.location.title ? `<p class="font-sans text-inverse opacity-90" style="font-size: 1.5rem; font-weight: 500; margin-bottom: 1rem;">${data.location.title}</p>` : ''}
        <p class="font-sans text-inverse opacity-80" style="font-size: 1.25rem;">
          ${data.location.description}
        </p>
      </div>
    </div>
  </section>
  `
}

/**
 * Renderiza la sección Storytelling (Desafío y Solución)
 * @param {Object} data - Datos del proyecto
 * @returns {string} HTML del storytelling
 */
const renderStorytelling = (data) => {
  const ui = content.projectUi.labels;
  return `
  <section class="project-storytelling" style="padding: 10rem 0; background-color: var(--color-tertiary); color: var(--color-primary);">
    <div class="container-fluid">

      <div class="story-block gsap-reveal" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8vw; margin-bottom: 15rem; align-items: center;">
        <div class="story-content">
          <span class="text-caption text-muted text-uppercase">${ui.desafioNumber}</span>
          <h2 class="text-large font-serif font-regular" style="margin: 2rem 0;">${data.story.challengeTitle}</h2>
          <p class="text-body-hero">${data.story.challenge}</p>
        </div>
        <div class="story-image" style="overflow: hidden; border-radius: var(--border-radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.05);">
          <img src="${data.story.challengeImage}" alt="${ui.desafioNumber}" style="width: 100%; height: 120%; object-fit: cover; transform: translateY(-10%);" class="parallax-img" />
        </div>
      </div>

      <div class="story-block gsap-reveal" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8vw; align-items: center;">
        <div class="story-image" style="order: -1; overflow: hidden; border-radius: var(--border-radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.05);">
          <img src="${data.story.solutionImage}" alt="${ui.solucionNumber}" style="width: 100%; height: 120%; object-fit: cover; transform: translateY(-10%);" class="parallax-img" />
        </div>
        <div class="story-content">
          <span class="text-caption text-muted text-uppercase">${ui.solucionNumber}</span>
          <h2 class="text-large font-serif font-regular" style="margin: 2rem 0;">${data.story.solutionTitle}</h2>
          <p class="text-body-hero">${data.story.solution}</p>
        </div>
      </div>

    </div>
  </section>
  `
}

/**
 * Renderiza la sección de Planos Técnicos (opcional)
 * @param {Object} data - Datos del proyecto
 * @returns {string} HTML de blueprints o string vacío
 */
const renderBlueprints = (data) => {
  if (!data.blueprints || data.blueprints.length === 0) return '';

  const ui = content.projectUi.labels;
  return `
  <section class="project-blueprints" style="background-color: var(--color-primary); color: #FFFFFF; position: relative; width: 100%;">
    <div class="blueprints-scroll-container" style="display: flex; position: relative; align-items: flex-start; width: 100%;">

      <!-- Left side: Pinned Images -->
      <div class="blueprints-pinned-media" style="width: 50vw; position: sticky; top: 0; height: 100vh; background-color: #fff; border-right: 1px solid #E0E0E0; overflow: hidden; z-index: 10;">
        ${data.blueprints.map((bp, i) => `
        <div style="position: absolute; top: 15%; left: 10%; width: 80%; height: 80%; border: 2px solid #E0E0E0; border-radius: 8px; z-index: ${i+1}; pointer-events: ${i===0 ? 'auto' : 'none'}; opacity: ${i===0 ? 1 : 0}; transition: opacity 0.5s ease; overflow: hidden;" class="blueprint-pinned-wrapper blueprint-wrap-${i}">
            <img src="${bp}" alt="${ui.ingenieriaTitle} ${i+1}" class="blueprint-pinned-img blueprint-img-${i} lightbox-trigger" data-cursor="${ui.verPlano}" style="width: 100%; height: 100%; object-fit: contain; padding: 2rem; background-color: #fff;" />
        </div>
        `).join('')}
      </div>

      <!-- Right side: Scrolling Text -->
      <div class="blueprints-scrolling-content" style="width: 50vw; padding: 15vh 6vw 30vh 6vw; display: flex; flex-direction: column;">

        <div style="margin-bottom: 10rem;" class="gsap-reveal">
          <span class="text-caption text-uppercase opacity-90 text-inverse">${ui.ingenieriaNumber}</span>
          <h2 class="text-large font-serif font-regular text-inverse" style="margin: 1.5rem 0;">${ui.ingenieriaTitle}</h2>
          <p class="font-sans text-inverse opacity-80" style="font-size: 1.25rem; max-width: 600px;">
            ${ui.ingenieriaDesc}
          </p>
        </div>

        ${data.blueprintSteps ? data.blueprintSteps.map((step, i) => `
        <div class="blueprint-text-block blueprint-block-${i}" style="min-height: 80vh; display: flex; flex-direction: column; justify-content: center; opacity: ${i===0 ? 1 : 0.3}; transition: opacity 0.3s ease;">
          <span class="text-caption" style="color: var(--color-highlight); margin-bottom: 1rem; display: block;">${ui.fase} 0${i+1}</span>
          <h3 class="font-serif text-inverse" style="font-size: 2.5rem; margin-bottom: 1.5rem;">${step.title}</h3>
          <p class="font-sans text-inverse opacity-70" style="font-size: 1.2rem; line-height: 1.6; max-width: 600px;">
            ${step.description}
          </p>
        </div>
        `).join('') : data.blueprints.map((bp, i) => `
        <div class="blueprint-text-block blueprint-block-${i}" style="min-height: 80vh; display: flex; flex-direction: column; justify-content: center; opacity: ${i===0 ? 1 : 0.3}; transition: opacity 0.3s ease;">
          <span class="text-caption" style="color: var(--color-highlight); margin-bottom: 1rem; display: block;">${ui.fase} 0${i+1}</span>
          <h3 class="font-serif text-inverse" style="font-size: 2.5rem; margin-bottom: 1.5rem;">${ui.detalleTecnico}</h3>
        </div>
        `).join('')}
      </div>
    </div>
  </section>
  `
}

/**
 * Renderiza la sección de Render 3D (opcional)
 * @param {Object} data - Datos del proyecto
 * @returns {string} HTML del render 3D o string vacío
 */
const render3D = (data) => {
  if (!data.render3d) return '';

  const ui = content.projectUi.labels;
  return `
  <section class="project-render" style="padding: 10rem 0; background-color: var(--color-background); color: var(--color-primary);">
    <div class="container-fluid">
      <div style="margin-bottom: 4rem;" class="gsap-reveal">
        <span class="text-caption text-muted text-uppercase">${ui.previsualizacionNumber}</span>
        <h2 class="text-large font-serif font-regular" style="margin: 1rem 0;">${data.render3d.title}</h2>
        <p style="color: var(--color-text-muted); font-size: 1.2rem; max-width: 600px; margin-top: 1.5rem;">
          ${data.render3d.description}
        </p>
      </div>
      <div class="gsap-reveal" style="width: 100%; height: 70vh; background-color: #ececec; border-radius: var(--border-radius-lg); overflow: hidden; border: 1px solid rgba(0,0,0,0.05); cursor: grab; box-shadow: 0 20px 40px rgba(0,0,0,0.05);">
        <model-viewer
          src="${data.render3d.model}"
          camera-controls
          auto-rotate
          rotation-per-second="30deg"
          environment-image="neutral"
          shadow-intensity="1"
          style="width: 100%; height: 100%; outline: none;"
          interaction-prompt="auto">
        </model-viewer>
      </div>
    </div>
  </section>
  `
}

/**
 * Renderiza la galería de fotos finales (opcional)
 * @param {Object} data - Datos del proyecto
 * @returns {string} HTML de gallery o string vacío
 */
const renderGallery = (data) => {
  if (!data.gallery || data.gallery.length === 0) return '';

  const ui = content.projectUi.labels;
  return `
  <section class="project-gallery" style="padding: 10rem 0; background-color: var(--color-secondary); color: var(--color-primary);">
    <div class="container-fluid">
      <div style="margin-bottom: 6rem;" class="gsap-reveal">
        <span class="text-caption text-muted text-uppercase">${ui.realidadNumber}</span>
        <h2 class="text-large font-serif font-regular" style="margin: 1rem 0;">${ui.resultadoFinal}</h2>
      </div>

      <div class="masonry-grid" style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 2vw;">
        ${data.gallery.map((img, i) => `
        <div class="masonry-item" style="grid-column: span ${img.gridCols || (i === 0 ? 8 : 4)}; height: ${img.height || (i < 2 ? '80vh' : '60vh')}; overflow: hidden; border-radius: var(--border-radius-md); box-shadow: 0 10px 40px rgba(0,0,0,0.05);">
          <img src="${img.image || img}" alt="${img.alt || ui.verFoto}" style="width: 100%; height: 120%; object-fit: cover; transform: translateY(-10%);" class="parallax-img" data-cursor="${ui.verFoto}" />
        </div>
        `).join('')}
      </div>
    </div>
  </section>
  `
}

/**
 * Renderiza el testimonial del cliente (opcional)
 * @param {Object} data - Datos del proyecto
 * @returns {string} HTML del testimonial o string vacío
 */
const renderTestimonial = (data) => {
  if (!data.testimonial) return '';

  return `
  <section class="project-testimonial" style="padding: 15rem 0; background-color: var(--color-primary); color: #FFFFFF; text-align: center;">
    <div class="container-fluid" style="max-width: 100%; margin: 0 auto;" class="gsap-reveal">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1" style="margin-bottom: 4rem;">
        <path d="M14.017 21L16.417 14.583C16.417 14.583 14.833 14.583 14.833 11.25C14.833 7.91667 17.5 5 21 5C24.5 5 24.5 9 24.5 9C24.5 9 22.833 9 22.833 11.25C22.833 13.5 20.333 19.333 19.333 21H14.017ZM3.517 21L5.917 14.583C5.917 14.583 4.333 14.583 4.333 11.25C4.333 7.91667 7 5 10.5 5C14 5 14 9 14 9C14 9 12.333 9 12.333 11.25C12.333 13.5 9.833 19.333 8.833 21H3.517Z" />
      </svg>
      <blockquote class="text-large font-serif font-light text-inverse" style="margin-bottom: 4rem; line-height: 1.3;">
        ${data.testimonial.quote}
      </blockquote>
      <div class="font-sans text-uppercase text-inverse font-regular" style="font-size: 1.1rem; letter-spacing: 0.15em;">
        <span style="color: var(--color-highlight); font-weight: 600;">${data.testimonial.author}</span> / ${data.testimonial.role}
      </div>
    </div>
  </section>
  `
}

/**
 * Renderiza la sección de contacto (siempre incluida en proyectos)
 * @returns {string} HTML del formulario de contacto
 */
const renderContacto = () => `
  <section id="contacto">
    <div class="container-fluid grid grid-cols-2 gap-6">
      <div class="gsap-reveal contacto-header">
        <h2 class="text-large contacto-title">
          Contacta <br>
          <span class="accent-text italic">con nosotros</span>
        </h2>
        <p class="contacto-description">
          Conecta con nuestro equipo y asegura la imagen de tu red de puntos de venta.
        </p>
      </div>
      <div class="gsap-reveal">
        <!-- Paperform embed (script cargado en main.js) -->
        <div data-paperform-id="xprintapro-contacto"></div>

        <!-- FORMULARIO ORIGINAL (comentado para no perderlo)
        <form class="contact-form">
          <div class="form-group">
            <label class="form-label">Nombre Completo</label>
            <input type="text" class="form-control" placeholder="Ej. Carlos Martínez" required>
          </div>
          <div class="form-group">
            <label class="form-label">Empresa / Cadena</label>
            <input type="text" class="form-control" placeholder="Ej. Nestlé España" required>
          </div>
          <div class="form-group">
            <label class="form-label">Email Corporativo</label>
            <input type="email" class="form-control" placeholder="carlos@empresa.com" required>
          </div>
          <div class="form-group">
            <label class="form-label">¿En qué podemos ayudarte?</label>
            <textarea class="form-control form-control--textarea" rows="2" placeholder="Describe brevemente tu necesidad..." required></textarea>
          </div>
          <div class="contacto-submit-wrapper">
            <button type="submit" class="btn-regius btn-regius--full">
              <div class="btn-regius-bg"></div>
              <div class="btn-regius-text-wrapper">
                <div class="btn-regius-text _1 btn-regius-text--large">Enviar Solicitud</div>
                <div class="btn-regius-text _2 btn-regius-text--large">Enviar Solicitud</div>
              </div>
            </button>
          </div>
        </form>
        -->
      </div>
    </div>
  </section>
`

/**
 * Combina todas las secciones del proyecto
 * @param {Object} data - Datos completos del proyecto
 * @returns {string} HTML completo del contenido del proyecto
 */
const renderProjectContent = (data) => `
  ${renderHero(data)}
  ${renderMetaBento(data)}
  ${renderLocation(data)}
  ${renderStorytelling(data)}
  ${renderBlueprints(data)}
  ${render3D(data)}
  ${renderGallery(data)}
  ${renderTestimonial(data)}
  ${renderContacto()}
`

/**
 * Crea una página completa de proyecto con layout universal
 *
 * ESTA ES LA FUNCIÓN PRINCIPAL - úsala para crear páginas de proyecto
 *
 * @param {Object} projectData - Datos del proyecto (ver estructura en docs)
 * @returns {string} HTML completo con header + proyecto + footer + cursor
 *
 * @example
 * import { createProjectPage } from './templates/project-template.js'
 * import redeiaData from './data/projects/redeia.json'
 *
 * document.querySelector('#app').innerHTML = createProjectPage(redeiaData)
 */
export const createProjectPage = async (projectData) => {
  return await createLayout({
    content: `
      ${renderProjectContent(projectData)}
      <div class="custom-cursor__dot"></div>
      <div class="custom-cursor__ring"><span class="custom-cursor__text"></span></div>
    `,
    pageClass: `page-proyecto project-${projectData.slug || 'default'}`
  })
}

// Exportar secciones individuales para uso avanzado
export {
  renderHero,
  renderMetaBento,
  renderLocation,
  renderStorytelling,
  renderBlueprints,
  render3D,
  renderGallery,
  renderTestimonial,
  renderContacto,
  renderProjectContent
}
