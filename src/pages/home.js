/**
 * Página Home - Xprinta Pro
 * Usa el sistema de layout universal
 *
 * @module pages/home
 */

import { createLayout } from '../layout.js'
import content from '../data/content.json'
import { getRecentProjects } from '../lib/supabase.js'

// Cache de proyectos para el home
let homeProjectsCache = null;

/**
 * Renderiza el Hero con slider de imágenes (Comentado temporalmente)
 *
const renderHeroOld = () => `
  <section id="hero" class="ark-hero">
    <div class="ark-hero-left">
      <div class="ark-hero-content gsap-reveal">
        <h1 class="ark-hero-title">
          <span class="hero-title-solid">Implantación de</span>
          <span class="hero-title-solid"><span class="hero-highlight-word">imagen</span> de marca</span>
          <span class="hero-title-solid">en toda <span class="hero-highlight-word">España</span></span>
        </h1>
        <p class="ark-hero-desc">Fabricación propia, logística y delegaciones en toda España para grandes proyectos. Transforma la identidad de tu marca con máxima calidad.</p>

        <div class="ark-hero-info">
          <div class="ark-info-col">
            <strong>COBERTURA TOTAL</strong>
            <span>Península y Baleares</span>
          </div>
          <div class="ark-info-col">
            <strong>+50 DELEGACIONES</strong>
            <span>Fabricación propia</span>
          </div>
          <div class="ark-info-col ark-info-cta">
            <a href="#contacto" class="btn-regius">
              <div class="btn-regius-bg"></div>
              <div class="btn-regius-text-wrapper">
                <div class="btn-regius-text _1">EMPEZAR PROYECTO →</div>
                <div class="btn-regius-text _2">EMPEZAR PROYECTO →</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="ark-hero-right">
      <div class="ark-hero-slider" id="hero-slider">
        ${content.hero.sliderImages.map((src, index) => {
          const isParadigma = src.includes('PARADIGMA');
          const isRedeia = src.includes('REDEIA');
          const isFoster = src.includes('foster');
          const isIberia = src.includes('iberia');
          const isRemax = src.includes('Remax');
          const isHelloCars = src.includes('hellocars');

          let videoSrc = '';
          if (isParadigma) videoSrc = '/imagen central hero/paradigma_hover.mp4';
          else if (isRedeia) videoSrc = '/imagen central hero/redeia_hover.mp4';
          else if (isFoster) videoSrc = '/imagen central hero/foster_hover.mp4';
          else if (isIberia) videoSrc = '/imagen central hero/iberia_hover.mp4';
          else if (isRemax) videoSrc = '/imagen central hero/remax_hover.mp4';
          else if (isHelloCars) videoSrc = '/imagen central hero/hellocars_hover.mp4';

          if (videoSrc) {
            return `
              <div class="hero-slide ${index === 0 ? 'hero-slide--active' : ''}">
                <video src="${videoSrc}" muted playsinline autoplay class="hero-slide__video"></video>
              </div>
            `;
          }
          return `
            <div class="hero-slide ${index === 0 ? 'hero-slide--active' : ''}" style="background-image: url('${src}');"></div>
          `;
        }).join('')}
      </div>
    </div>
  </section>
`
*/

/**
 * Nuevo Hero inspirado en bgslaw.ch con frame de vídeo expandible y animacionesGSAP
 */
const renderHero = () => `
  <section id="hero" class="relative overflow-hidden text-white" style="min-height: 100svh; background-color: #080A15;">
    <!-- Frame del vídeo de fondo con clip-path -->
    <div data-hero-frame="true" class="absolute overflow-hidden shadow-2xl" aria-hidden="true" style="top:0; right:0; bottom:0; left:0; clip-path:inset(22% 18% 22% 18% round 32px); will-change:clip-path; background-color: #080A15;">
      <video autoplay muted loop playsinline preload="auto" class="absolute inset-0 h-full w-full object-cover">
        <source src="/videos/home.mp4" type="video/mp4" />
      </video>
      <!-- Gradientes y capas de cobertura (personalizadas al color primario) -->
      <div class="pointer-events-none absolute inset-0" style="background-color: var(--color-primary); opacity: 0.80;" aria-hidden="true"></div>
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" aria-hidden="true"></div>
      <div data-hero-tint="true" class="pointer-events-none absolute inset-0 opacity-0" style="background-color: #080A15;" aria-hidden="true"></div>
      <div data-hero-darken="true" class="pointer-events-none absolute inset-0 opacity-0" style="background-color: #080A15;" aria-hidden="true"></div>
      <div class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px overflow-hidden bg-white/10" aria-hidden="true">
        <div class="absolute inset-y-0 left-0 w-1/3 opacity-60" style="background: linear-gradient(to right, transparent, #E65000, transparent); animation: sweep 4s infinite linear;"></div>
      </div>
    </div>
    
    <!-- Contenido frontal del Hero -->
    <div data-hero-content="true" class="relative" style="z-index: 2; min-height: 100svh; display: flex; flex-direction: column; justify-content: flex-end; padding: 14rem;">
      <div class="w-full">
        <h1 class="leading-[1.04] tracking-tight" style="font-size: 5.5rem; font-family: var(--font-family-base); color: white;">
          <span class="block overflow-hidden pb-[0.18em]" style="line-height: 1.1;">
            <span data-hero-line="true" class="block">Implantación de</span>
          </span>
          <span class="block overflow-hidden pb-[0.18em]" style="line-height: 1.1;">
            <span data-hero-line="true" class="block">imagen de marca.</span>
          </span>
        </h1>
        <div data-hero-tag="true" class="mt-10 grid w-full items-end gap-8 md:grid-cols-12">
          <p class="leading-[1.3] md:col-span-9" style="font-family: var(--font-family-body); font-weight: 500; color: var(--color-white);">
            Fabricación propia, logística y delegaciones en toda España.<br>
            <span class="block" style="color: var(--color-highlight, #E65000); margin-top: 0.5rem; font-weight: 800; font-family: var(--font-family-serif); font-size: 3rem;">Your BRAND under control</span>
          </p>
          <div data-hero-cue="true" class="hidden flex-col items-center gap-3 self-end md:col-span-2 md:flex">
            <span class="font-mono text-xs uppercase tracking-[0.28em]" style="color: rgba(255,255,255,0.6); font-family: var(--font-family-mono);">Descubrir</span>
            <span data-hero-cue-bar="true" class="block h-12 w-px origin-top bg-white/40" aria-hidden="true"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
`

/**
 * Renderiza la sección de Sectores
 */
const renderSectores = () => `
  <section id="sectores" class="py-32">
    <div class="container-fluid gsap-reveal mb-12">
      <span class="text-caption">01 / Aplicaciones</span>
      <h2 class="text-large max-w-800 mb-6">
        Sectores de <br>
        <span class="accent-text italic">Especialización</span>
      </h2>
    </div>
    <div class="container-fluid">
      <div class="bento-grid">
        ${content.sectores.map((sector, index) => {
          let sizeClass = 'bento-card--default';

          if (index === 0 || index === 5) {
            sizeClass = 'bento-card--large';
          } else if (index === 2 || index === 8) {
            sizeClass = 'bento-card--wide';
          }

          return `
          <a href="${sector.slug ? `/sector.html?slug=${sector.slug}` : '#sectores'}" class="bento-card bento-card-bg ${sizeClass} gsap-bento-item gsap-reveal" style="background-image: url('${sector.bgImage || '/sectores/default.jpg'}')">
            <div class="bento-card__header">
              <span class="text-caption bento-card__number">0${index + 1}</span>
            </div>
            <div>
               <h3 class="bento-card__title">${sector.name}</h3>
            </div>
          </a>
        `}).join('')}
      </div>
    </div>
  </section>
`

/**
 * Renderiza el mapa de red nacional
 */
const renderMapa = () => `
  <div id="red-nacional-container" class="container-fluid red-nacional-container">
    <section id="red-nacional" class="red-nacional-section">

      <!-- Static Background Map Image -->
      <div class="red-nacional__map-bg">
        <img id="static-map-image" src="/mapa/mapa-fondo.png" alt="" class="red-nacional__map-img">
      </div>

      <!-- Stats Content (Left side) -->
      <div class="red-nacional__content">
        <h2 id="red-nacional-title" class="red-nacional__title">Una red de <span class="hero-highlight-word">fábricas</span> para la <span class="hero-highlight-word">imagen</span> de tu empresa.</h2>
        <div class="red-nacional__stats">
          ${content.mapa.stats.map(stat => `
            <div class="stat-block">
              <p class="stat-block__number">
                <span class="stat-counter" data-target="${stat.number}">0</span><span class="stat-block__number-suffix">+</span>
              </p>
              <p class="stat-block__text">
                ${stat.text}
              </p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Button (Bottom Right) -->
      <div class="stat-block red-nacional__cta">
        <a href="/red-xprinta.html" class="btn-regius outline-light">
          <div class="btn-regius-bg"></div>
          <div class="btn-regius-text-wrapper">
            <div class="btn-regius-text _1">VER MAPA DE DELEGACIONES</div>
            <div class="btn-regius-text _2">VER MAPA DE DELEGACIONES</div>
          </div>
        </a>
      </div>

    </section>
  </div>
`

/**
 * Renderiza la sección de Proceso
 */
/*
const renderProceso = () => `
  <div id="proceso-container" style="background-color: var(--color-bg); padding-bottom: 20vh;">
    <section id="proceso" style="height: 100vh; overflow: hidden; display: flex; align-items: center;">
      <div class="container-fluid grid grid-cols-2 gap-6" style="width: 100%;">

        <!-- Sticky Sidebar -->
        <div style="position: relative; display: flex; flex-direction: column; justify-content: flex-start; padding-right: 4rem;">

          <!-- Background Particles (expanded bounds to prevent clipping) -->
          <div id="lottie-bar" style="position: absolute; top: 82%; left: 43%; transform: translate(-50%, -50%); width: 58%; height: 170%; z-index: 0; pointer-events: none;"></div>

          <!-- Foreground Text -->
          <div style="position: relative; z-index: 10;">
            <span class="text-caption">03 / Metodología</span>
            <h2 class="text-large" style="margin-bottom: 1.5rem;">
              El Proceso <br>
              <span class="accent-text italic">Lineal</span>
            </h2>
            <p style="margin-top: 2rem; font-size: 1.25rem; color: var(--color-text-muted); max-width: 400px; font-weight: 400;">
              Estandarizamos la excelencia en 14 pasos precisos, garantizando trazabilidad y ahorro de costes a nivel nacional.
            </p>
          </div>
        </div>

        <!-- Scrolling List -->
        <div class="process-scroll-container">
          <div class="process-list-wrapper">
            ${content.proceso.map((paso, index) => `
              <div class="process-item-animated">
                <div class="process-item__header">
                  <span class="process-item__number">${(index + 1).toString().padStart(2, '0')}</span>
                  <h3 class="process-item__title">${paso.title}</h3>
                </div>
                <p class="process-item__description">${paso.description}</p>
                <div class="process-item__footer">
                  <a href="/sistema-xprinta.html" class="nw-link nw-link--medium">
                    Conocer más
                    <svg aria-hidden="true" viewBox="0 0 100 100" fill="currentColor" class="nw-link-icon nw-link-icon--inline"><path d="M57.40 20.30L42.50 20.30L66.50 44.30L13 44.30L13 55.10L66.50 55.10L42.50 79.10L57.40 79.10L87 49.70Z"></path></svg>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </section>
  </div>
`
*/

const renderProceso = () => `
  <div id="proceso-container" style="background-color: var(--color-bg); padding-bottom: 20vh;">
    <section id="proceso" style="height: 100vh; overflow: hidden; display: flex; align-items: center;">
      <div class="container-fluid grid grid-cols-2 gap-6" style="width: 100%;">

        <!-- Sticky Sidebar -->
        <div style="position: relative; display: flex; flex-direction: column; justify-content: flex-start; padding-right: 4rem;">

          <!-- Process Icons Container (Replaces Lottie) -->
          <div id="process-icons-wrapper" style="position: absolute; top: 81%; left: 35%; transform: translate(-50%, -50%); width: 560px; height: 560px; z-index: 0; pointer-events: none; display: flex; align-items: center; justify-content: center;">
            ${[
              '/iconos/nuevos/brandguide.png',
              '/iconos/nuevos/brandcenter.png',
              '/iconos/nuevos/auditoria tecnica.png',
              '/iconos/nuevos/ahorro-costes.png',
              '/iconos/nuevos/estudio normativo.png',
              '/iconos/nuevos/auditoria tecnica.png', // Toma de datos
              '/iconos/nuevos/pic.png',
              '/iconos/nuevos/aceptacion-cliente.png',
              '/iconos/nuevos/fabricacion.png',
              '/iconos/nuevos/INSTALACION.png',
              '/iconos/nuevos/TRABAJO TERMINADO.png',
              '/iconos/nuevos/COMUNICACION DIGITAAL.png',
              '/iconos/nuevos/cobertura audiovisual.png',
              '/iconos/nuevos/rrss.png'
            ].map((src, index) => `
              <img class="process-icon-img process-icon-${index}" src="${src}" alt="Icono Proceso" style="position: absolute; width: 100%; height: 100%; object-fit: contain; opacity: ${index === 0 ? 1 : 0}; transition: opacity 0.5s ease; filter: none; max-width: 560px; max-height: 560px;" />
            `).join('')}
          </div>

          <!-- Foreground Text -->
          <div style="position: relative; z-index: 10;">
            <span class="text-caption">03 / Metodología</span>
            <h2 class="text-large" style="margin-bottom: 1.5rem;">
              El Proceso <br>
              <span class="accent-text italic">Lineal</span>
            </h2>
            <p style="margin-top: 2rem; font-size: 1.25rem; color: var(--color-text-muted); max-width: 400px; font-weight: 400;">
              Estandarizamos la excelencia en 14 pasos precisos, garantizando trazabilidad y ahorro de costes a nivel nacional.
            </p>
          </div>
        </div>

        <!-- Scrolling List -->
        <div class="process-scroll-container">
          <div class="process-list-wrapper">
            ${content.proceso.map((paso, index) => `
              <div class="process-item-animated">
                <div class="process-item__header">
                  <span class="process-item__number">${(index + 1).toString().padStart(2, '0')}</span>
                  <h3 class="process-item__title">${paso.title}</h3>
                </div>
                <p class="process-item__description">${paso.description}</p>
                <div class="process-item__footer">
                  <a href="/sistema-xprinta.html" class="nw-link nw-link--medium">
                    Conocer más
                    <svg aria-hidden="true" viewBox="0 0 100 100" fill="currentColor" class="nw-link-icon nw-link-icon--inline"><path d="M57.40 20.30L42.50 20.30L66.50 44.30L13 44.30L13 55.10L66.50 55.10L42.50 79.10L57.40 79.10L87 49.70Z"></path></svg>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </section>
  </div>
`

/**
 * Carga proyectos recientes desde Supabase
 * @param {number} limit - Número de proyectos a cargar
 * @returns {Promise<Array>} Proyectos recientes
 */
async function loadHomeProjects(limit = 6) {
  if (homeProjectsCache) return homeProjectsCache;

  try {
    const projects = await getRecentProjects(limit);
    homeProjectsCache = projects.map(p => ({
      slug: p.slug, // IMPORTANTE: agregar slug para detección de videos
      title: p.client_name || p.title.split(' ').slice(0, 2).join(' '), // Ej: "Arval", "Redeia"
      category: p.category || p.sector,
      description: p.short_description || p.client_description,
      image: p.hero_image || p.hero_video || '/placeholder-project.jpg', // IMPORTANTE: fallback si no hay imagen
      url: `/proyecto-${p.slug}.html` // Arreglado: usar formato correcto /proyecto-slug.html
    }));
    return homeProjectsCache;
  } catch (error) {
    console.error('Error cargando proyectos para home:', error);
    // Fallback a content.json si falla
    return content.proyectos;
  }
}

/**
 * Renderiza la galería de proyectos destacados
 * AHORA ES DINÁMICO - carga desde Supabase
 */
const renderProyectos = async () => {
  const proyectos = await loadHomeProjects(6);

  return `
  <section id="proyectos" class="nw-proyectos-section">
    <div class="nw-proyectos-header gsap-reveal">
      <h2 class="nw-proyectos-title">
        Construimos <span class="nw-accent">identidades visuales</span> que dominan el espacio. Fabricación propia, precisión técnica y <span class="nw-accent">cobertura nacional</span>.
      </h2>
      <div class="nw-proyectos-links">
        <a href="/nosotros.html" class="nw-link">
          Nosotros
          <svg aria-hidden="true" viewBox="0 0 100 100" fill="currentColor" class="nw-link-icon"><path d="M57.40 20.30L42.50 20.30L66.50 44.30L13 44.30L13 55.10L66.50 55.10L42.50 79.10L57.40 79.10L87 49.70Z"></path></svg>
        </a>
        <a href="/proyectos.html" class="nw-link">
          Explorar proyectos
          <svg aria-hidden="true" viewBox="0 0 100 100" fill="currentColor" class="nw-link-icon"><path d="M57.40 20.30L42.50 20.30L66.50 44.30L13 44.30L13 55.10L66.50 55.10L42.50 79.10L57.40 79.10L87 49.70Z"></path></svg>
        </a>
      </div>
    </div>

    <div class="nw-grid">
      ${proyectos.map((proj, i) => {
        // IMPORTANTE: Usar slug en lugar de title para detección confiable
        const isParadigma = proj.slug === 'paradigma';
        const isRedeia = proj.slug === 'redeia';
        const isFoster = proj.slug === 'fosters-hollywood';
        const isIberia = proj.slug === 'iberia-express';
        const isRemax = proj.slug === 'remax-prime';
        const isHelloCars = proj.slug === 'hello-cars';
        const isArval = proj.slug === 'arval';
        return `
        <article class="nw-project-card gsap-reveal item-${i + 1}" data-cursor="nw-view">
          <a href="${proj.url || '#'}" class="nw-project-link">
            ${isParadigma ? `
              <video src="/imagen central hero/paradigma_hover.mp4" loop muted playsinline class="nw-project-video"></video>
            ` : ''}
            ${isRedeia ? `
              <video src="/imagen central hero/redeia_hover.mp4" loop muted playsinline class="nw-project-video"></video>
            ` : ''}
            ${isFoster ? `
              <video src="/imagen central hero/foster_hover.mp4" loop muted playsinline class="nw-project-video"></video>
            ` : ''}
            ${isIberia ? `
              <video src="/imagen central hero/iberia_hover.mp4" loop muted playsinline class="nw-project-video"></video>
            ` : ''}
            ${isRemax ? `
              <video src="/imagen central hero/remax_hover.mp4" loop muted playsinline class="nw-project-video"></video>
            ` : ''}
            ${isHelloCars ? `
              <video src="/imagen central hero/hellocars_hover.mp4" loop muted playsinline class="nw-project-video"></video>
            ` : ''}
            ${isArval ? `
              <video src="/proyectos/arval/arval-rotulo-animado.mp4" loop muted playsinline class="nw-project-video"></video>
            ` : ''}
            <img src="${proj.image}" alt="${proj.title}" class="nw-project-image" />
            <div class="nw-project-overlay">
              <h1 class="nw-project-title">${proj.title}</h1>
              <div class="nw-project-bottom">
                <div class="nw-project-category">${proj.category}</div>
                ${proj.description ? `<p class="nw-project-desc">${proj.description}</p>` : ''}
              </div>
            </div>
          </a>
        </article>
        `;
      }).join('')}
    </div>

    <div class="nw-proyectos-footer gsap-reveal">
      <a href="/proyectos.html" class="nw-link nw-link--large">
        Ver todos los proyectos
      </a>
    </div>
  </section>
`
}

/**
 * Renderiza el marquee de logos de clientes
 */
const renderMarquee = () => {
  const logos = [...content.clientes, ...content.clientes, ...content.clientes]
  return `
    <section class="marquee-container gsap-reveal py-32 relative" id="clientes">
      <!-- Subtle top border/gradient -->
      <div class="marquee-container__border-gradient"></div>

      <div class="container-fluid flex flex-col items-center text-center mb-24">
        <span class="text-caption">Confianza corporativa</span>
        <h2 class="text-large max-w-900 mb-6">
          Trabajamos con las principales <br>
          <span class="accent-text italic">empresas de España</span>
        </h2>
      </div>

      <!-- Fade edges for marquee -->
      <div class="marquee-container__mask">
        <div class="marquee-content">
          ${logos.map(logo => `<img src="${logo}" alt="Cliente corporativo" />`).join('')}
        </div>
      </div>
    </section>
  `
}

/**
 * Renderiza la sección de contacto
 */
const renderContacto = () => `
  <section id="contacto">
    <div class="container-fluid grid grid-cols-2 gap-6">
      <div class="gsap-reveal contacto-header">
        <span class="text-caption">05 / Contacto</span>
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
 * Genera el HTML completo de la página home
 * usando el sistema de layout universal
 * AHORA ES ASYNC - carga proyectos dinámicamente desde Supabase
 *
 * @returns {Promise<string>} HTML completo con header + home + footer
 */
export const getHomeHTML = async () => {
  const proyectosSection = await renderProyectos();

  return await createLayout({
    content: `
      ${renderHero()}
      ${renderSectores()}
      ${renderMapa()}
      ${renderProceso()}
      ${proyectosSection}
      ${renderMarquee()}
      ${renderContacto()}
    `,
    pageClass: 'page-home'
  });
}
