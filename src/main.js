import './style.css'
import content from './data/content.json'
import puntos from './data/puntos.json'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import DotsField from './DotsField'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

gsap.registerPlugin(ScrollTrigger)

// ==========================================================================
// Render Functions - Premium Studio Aesthetic
// ==========================================================================

const renderNavbar = () => `
  <header class="site-header">
    <div class="container-fluid navbar">
      <a href="/" class="navbar-brand">
        <img src="/logo-xprina-azul.png" alt="Xprinta Pro" class="navbar-logo" />
      </a>
      <nav class="navbar-nav">

        <div class="nav-item-dropdown">
          <a href="#proyectos" class="nav-link">Proyectos <svg class="dropdown-icon" viewBox="0 0 12 8"><path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="mega-menu">
            <div class="container-fluid mega-menu-proyectos-inner">
              ${content.proyectos.slice(0, 3).map(proj => `
                <div class="mega-menu-proyectos-card">
                  <a href="${proj.url || '#proyectos'}" class="mega-menu__link-block">
                    <img src="${proj.image}" alt="${proj.title}" class="mega-menu-proyectos-image" />
                    <h4 class="mega-menu-proyectos-title">${proj.title}</h4>
                    <p class="mega-menu-proyectos-desc">${proj.description}</p>
                  </a>
                  <div class="mega-menu__item-footer">
                    <span class="mega-menu-proyectos-link">Ver Proyecto &rarr;</span>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="container-fluid mega-menu__footer-actions">
              <a href="#proyectos" class="btn-regius">
                <div class="btn-regius-text-wrapper">
                  <div class="btn-regius-text _1">Ver todos los proyectos</div>
                  <div class="btn-regius-text _2">Ver todos los proyectos</div>
                </div>
                <div class="btn-regius-bg"></div>
              </a>
            </div>
          </div>
        </div>

        <div class="nav-item-dropdown">
          <a href="#servicios" class="nav-link">Servicios <svg class="dropdown-icon" viewBox="0 0 12 8"><path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="mega-menu">
            <div class="container-fluid mega-menu-inner">
              <div class="mega-menu-left">
                <div class="mega-menu-column">
                  <span class="mega-menu-title">Soluciones Brand</span>
                  <div class="mega-menu-links">
                    <a href="#" class="mega-menu-link">BRANDCOMMERCE</a>
                    <a href="#" class="mega-menu-link">BRANDCHECK</a>
                    <a href="#" class="mega-menu-link">BRAND SURVEYS</a>
                    <a href="#" class="mega-menu-link">BRANDSIGNAL</a>
                    <a href="#" class="mega-menu-link">BRANDVISION</a>
                  </div>
                </div>
                <div class="mega-menu-column">
                  <span class="mega-menu-title">Gestión y Legal</span>
                  <div class="mega-menu-links">
                    <a href="#" class="mega-menu-link">BRANDGUIDE</a>
                    <a href="#" class="mega-menu-link">BRANDCENTER</a>
                    <a href="#" class="mega-menu-link">BRANDTOOLS</a>
                    <a href="#" class="mega-menu-link">BRANDCARE</a>
                    <a href="#" class="mega-menu-link">BRANDLEGAL</a>
                  </div>
                </div>
              </div>
              <div class="mega-menu-right">
                <div class="mega-menu-card">
                  <img src="https://images.pexels.com/photos/8128188/pexels-photo-8128188.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Servicios" class="mega-menu-image" />
                  <div class="mega-menu-card-content">
                    <h4>Soluciones a medida para corporaciones</h4>
                    <a href="#servicios" class="btn-regius outline">
                      <div class="btn-regius-text-wrapper">
                        <div class="btn-regius-text _1">Explorar Servicios</div>
                        <div class="btn-regius-text _2">Explorar Servicios</div>
                      </div>
                      <div class="btn-regius-bg"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="nav-item-dropdown">
          <a href="#por-que-xprinta" class="nav-link">Por Qué Xprinta <svg class="dropdown-icon" viewBox="0 0 12 8"><path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="mega-menu">
            <div class="container-fluid mega-menu-inner">
              <div class="mega-menu-left">
                <div class="mega-menu-column">
                  <span class="mega-menu-title">Ventajas Competitivas</span>
                  <div class="mega-menu-links">
                    <a href="#" class="mega-menu-link">RED PROFESIONAL</a>
                    <a href="#" class="mega-menu-link">PROVEEDOR UNIFICADO</a>
                    <a href="#" class="mega-menu-link">AHORRO DE COSTES</a>
                    <a href="#" class="mega-menu-link">PROYECTO PIC</a>
                    <a href="#" class="mega-menu-link">GESTION DE PROYECTOS</a>
                  </div>
                </div>
                <div class="mega-menu-column">
                  <span class="mega-menu-title">Garantía y Seguridad</span>
                  <div class="mega-menu-links">
                    <a href="#" class="mega-menu-link">TRAZABILIDAD</a>
                    <a href="#" class="mega-menu-link">FINANCIACION</a>
                    <a href="#" class="mega-menu-link">GARANTIA XPRINTA</a>
                    <a href="#" class="mega-menu-link">ECOSIGN</a>
                    <a href="#" class="mega-menu-link">LEGALIZACION</a>
                  </div>
                </div>
              </div>
              <div class="mega-menu-right">
                <div class="mega-menu-card">
                  <img src="https://images.pexels.com/photos/37466061/pexels-photo-37466061.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Ventajas" class="mega-menu-image" />
                  <div class="mega-menu-card-content">
                    <h4>Experiencia en todos los sectores productivos</h4>
                    <a href="#por-que-xprinta" class="btn-regius outline">
                      <div class="btn-regius-text-wrapper">
                        <div class="btn-regius-text _1">Ver Casos de Éxito</div>
                        <div class="btn-regius-text _2">Ver Casos de Éxito</div>
                      </div>
                      <div class="btn-regius-bg"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="nav-item">
          <a href="#mapa" class="nav-link">Red Xprinta</a>
        </div>

        <div class="nav-item">
          <a href="#area-tecnica" class="nav-link">Área Técnica</a>
        </div>

        <div class="nav-item-dropdown">
          <a href="#nosotros" class="nav-link">Nosotros <svg class="dropdown-icon" viewBox="0 0 12 8"><path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="mega-menu">
            <div class="container-fluid mega-menu-inner">
              <div class="mega-menu-left">
                <div class="mega-menu-column">
                  <span class="mega-menu-title">Nuestra Empresa</span>
                  <div class="mega-menu-links">
                    <a href="#" class="mega-menu-link">HISTORIA</a>
                    <a href="#" class="mega-menu-link">EQUIPO</a>
                    <a href="#" class="mega-menu-link">SISTEMA XPRINTA</a>
                    <a href="#" class="mega-menu-link">FAQs</a>
                  </div>
                </div>
              </div>
              <div class="mega-menu-right">
                <div class="mega-menu-card">
                  <img src="https://images.pexels.com/photos/8276211/pexels-photo-8276211.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Equipo" class="mega-menu-image" />
                  <div class="mega-menu-card-content">
                    <h4>Personas que construyen el éxito de tu marca</h4>
                    <span class="mega-menu-card-link">Conocer al Equipo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </nav>
      <div class="navbar-cta">
        <a href="#contacto" class="btn-regius outline">
          <div class="btn-regius-bg"></div>
          <div class="btn-regius-text-wrapper">
            <div class="btn-regius-text _1">Contacto</div>
            <div class="btn-regius-text _2">Contacto</div>
          </div>
        </a>
      </div>
    </div>
  </header>
`

const renderHero = () => `
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

const renderProyectos = () => `
  <section id="proyectos" class="nw-proyectos-section">
    <div class="nw-proyectos-header gsap-reveal">
      <h2 class="nw-proyectos-title">
        Construimos <span class="nw-accent">identidades visuales</span> que dominan el espacio. Fabricación propia, precisión técnica y <span class="nw-accent">cobertura nacional</span>.
      </h2>
      <div class="nw-proyectos-links">
        <a href="#nosotros" class="nw-link">
          Nosotros
          <svg aria-hidden="true" viewBox="0 0 100 100" fill="currentColor" class="nw-link-icon"><path d="M57.40 20.30L42.50 20.30L66.50 44.30L13 44.30L13 55.10L66.50 55.10L42.50 79.10L57.40 79.10L87 49.70Z"></path></svg>
        </a>
        <a href="#proyectos" class="nw-link">
          Explorar proyectos
          <svg aria-hidden="true" viewBox="0 0 100 100" fill="currentColor" class="nw-link-icon"><path d="M57.40 20.30L42.50 20.30L66.50 44.30L13 44.30L13 55.10L66.50 55.10L42.50 79.10L57.40 79.10L87 49.70Z"></path></svg>
        </a>
      </div>
    </div>
    
    <div class="nw-grid">
      ${content.proyectos.map((proj, i) => {
        const isParadigma = proj.title.toLowerCase() === 'paradigma';
        const isRedeia = proj.title.toLowerCase() === 'redeia';
        const isFoster = proj.title.toLowerCase() === "foster's hollywood";
        const isIberia = proj.title.toLowerCase() === 'iberia express';
        const isRemax = proj.title.toLowerCase() === 'remax prime';
        const isHelloCars = proj.title.toLowerCase() === 'hello cars';
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
      <a href="#proyectos" class="nw-link nw-link--large">
        Ver todos los proyectos
      </a>
    </div>
  </section>
`

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
          // Asymmetrical grid logic - determine card size class
          let sizeClass = 'bento-card--default';

          if (index === 0 || index === 5) {
            sizeClass = 'bento-card--large';
          } else if (index === 2 || index === 8) {
            sizeClass = 'bento-card--wide';
          }

          return `
          <div class="bento-card bento-card-bg ${sizeClass} gsap-bento-item gsap-reveal" style="background-image: url('${sector.bgImage}')">
            <div class="bento-card__header">
              <span class="text-caption bento-card__number">0${index + 1}</span>
            </div>
            <div>
               <h3 class="bento-card__title">${sector.name}</h3>
            </div>
          </div>
        `}).join('')}
      </div>
    </div>
  </section>
`

const renderMapa = () => `
  <div id="red-nacional-container" class="container-fluid red-nacional-container">
    <section id="red-nacional" class="red-nacional-section">

      <!-- Static Background Map Image (Now much more prominent) -->
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
        <a href="#" class="btn-regius outline-light">
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

const renderProceso = () => `
  <div id="proceso-container" style="background-color: var(--color-bg); padding-bottom: 20vh;">
    <section id="proceso" style="height: 100vh; overflow: hidden; display: flex; align-items: center;">
      <div class="container-fluid grid grid-cols-2 gap-6" style="width: 100%;">

        <!-- Sticky Sidebar -->
        <div style="position: relative; display: flex; flex-direction: column; justify-content: flex-start; padding-right: 4rem;">

          <!-- Background Particles (expanded bounds to prevent clipping) -->
          <div id="lottie-bar" style="position: absolute; top: 77%; left: 40%; transform: translate(-50%, -50%); width: 40%; height: 120%; z-index: 0; pointer-events: none;"></div>

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
                  <a href="#" class="nw-link nw-link--medium">
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

const renderContacto = (isProject = false) => `
  <section id="contacto">
    <div class="container-fluid grid grid-cols-2 gap-6">
      <div class="gsap-reveal contacto-header">
        ${!isProject ? `<span class="text-caption">05 / Contacto</span>` : ''}
        <h2 class="text-large contacto-title">
          Contacta <br>
          <span class="accent-text italic">con nosotros</span>
        </h2>
        <p class="contacto-description">
          Conecta con nuestro equipo y asegura la imagen de tu red de puntos de venta.
        </p>
      </div>
      <div class="gsap-reveal">
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
      </div>
    </div>
  </section>
`

const renderFooter = () => `
  <section class="footer-component">
    <div class="footer-card">
      <div class="footer-top-tile">
        <img src="${content.header.logoPath}" alt="${content.header.brandName}" class="footer-logo">
      </div>
      <div class="footer-divider"></div>
      <div class="footer-halves">
        <div class="footer-left">
          <div class="footer-text footer-text--max-width">
            <strong>Miembro de:</strong>
          </div>
          <div class="footer-logos">
            <img src="/miembro/aserluz-xprinta.webp" alt="Aserluz">
            <img src="/miembro/european-sign-federation-xprinta.webp" alt="European Sign Federation">
            <img src="/miembro/international-sign-association-xprinta.webp" alt="International Sign Association">
          </div>
        </div>
        <div class="footer-right">
          <div class="footer-column">
            <div class="footer-label">SEDE CENTRAL</div>
            <div class="footer-links-column">
              <span class="footer-text">Calle Laguna del Marquesado 10<br>28041 Madrid (España)</span>
            </div>
          </div>
          <div class="footer-column">
            <div class="footer-label">RED XPRINTA IBERIA</div>
            <div class="footer-links-column">
              <span class="footer-text">Más de 125 puntos Xprinta<br>en España y Portugal</span>
            </div>
          </div>
          <div class="footer-column">
            <div class="footer-label">CONTACTO</div>
            <div class="footer-links-column">
              <a href="tel:915052927" class="footer-link">Tel. 91 505 29 27</a>
              <a href="mailto:${content.footer.contact.email}" class="footer-link">${content.footer.contact.email}</a>
              <a href="/" class="footer-link">xprintapro.com</a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom-tile">
        <div class="footer-divider"></div>
        <div class="footer-bottom-wrap">
          <div class="footer-rights-wrap">
            <div class="footer-social-wrap">
              <a href="#" target="_blank" class="social-link" aria-label="X (Twitter)">
                <svg class="social-icon" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M5 1a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4zm-.334 3.5a.75.75 0 0 0-.338 1.154l5.614 7.45l-5.915 6.345l-.044.051H6.03l4.83-5.179l3.712 4.928a.75.75 0 0 0 .337.251h4.422a.75.75 0 0 0 .336-1.154l-5.614-7.45L20.017 4.5h-2.05l-4.83 5.18l-3.714-4.928a.75.75 0 0 0-.337-.252zm10.88 13.548L6.431 5.952H8.45l9.114 12.095z" clip-rule="evenodd"></path>
                </svg>
              </a>
              <a href="#" target="_blank" class="social-link" aria-label="LinkedIn">
                <svg class="social-icon" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248c-.015-.709-.52-1.248-1.342-1.248c-.822 0-1.359.54-1.359 1.248c0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586c.173-.431.568-.878 1.232-.878c.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252c-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"></path>
                </svg>
              </a>
            </div>
            <div class="footer-text footer-text--small">© 2026 Xprinta Pro. Trade Marketing & Corporate Visual Identity.</div>
          </div>
          <div class="footer-legal-links">
            <a href="#" class="footer-text footer-text--small">Términos de Servicio</a>
            <a href="#" class="footer-text footer-text--small">Aviso Legal</a>
            <a href="#" class="footer-text footer-text--small">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </div>
  </section>
`

import { renderProyectoTemplate, initProyectoAnimations } from './template-proyecto.js'
import redeiaData from './data/projects/redeia.json'

// Inject HTML based on page type
const isProyectoPage = document.body.dataset.page === 'proyecto';

if (isProyectoPage) {
  document.querySelector('#app').innerHTML = `
    ${renderNavbar()}
    <main>
      ${renderProyectoTemplate(redeiaData)}
      ${renderContacto(true)}
    </main>
    ${renderFooter()}
    <div class="custom-cursor__dot"></div>
    <div class="custom-cursor__ring"><span class="custom-cursor__text"></span></div>
  `
} else {
  document.querySelector('#app').innerHTML = `
    ${renderNavbar()}
    <main>
      ${renderHero()}
      ${renderSectores()}
      ${renderMapa()}
      ${renderProceso()}
      ${renderProyectos()}
      ${renderMarquee()}
      ${renderContacto()}
    </main>
    ${renderFooter()}
    <div class="custom-cursor__dot"></div>
    <div class="custom-cursor__ring"><span class="custom-cursor__text"></span></div>
  `
}

// ==========================================================================
// Initialization & Animations
// ==========================================================================
const initAnimations = () => {
  // --- Hero Slider Futuristic Animation ---
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    let currentSlide = 0;
    
    // Initial Ken Burns on first slide
    gsap.set(slides[0], { opacity: 1, zIndex: 2, clipPath: 'none' });
    const firstVideo = slides[0].querySelector('video');
    if (firstVideo) {
      firstVideo.currentTime = 0;
      firstVideo.play().catch(e => {});
    } else {
      gsap.to(slides[0], { scale: 1.1, duration: 6, ease: "none" });
    }

    let transitionTimeout = null;

    const playActiveSlide = (index) => {
      const slide = slides[index];
      const video = slide.querySelector('video');

      if (video) {
        video.currentTime = 0;
        video.play().catch(e => {});

        let triggered = false;
        video.ontimeupdate = () => {
          // Trigger next slide transition exactly 1.2 seconds before the video ends
          if (!triggered && video.duration && (video.duration - video.currentTime <= 1.2)) {
            triggered = true;
            video.ontimeupdate = null;
            nextSlide();
          }
        };
        video.onended = () => {
          if (!triggered) {
            triggered = true;
            nextSlide();
          }
        };
      } else {
        // Fallback for images
        transitionTimeout = setTimeout(nextSlide, 5000);
      }
    };

    const nextSlide = () => {
      clearTimeout(transitionTimeout);
      const prev = currentSlide;
      currentSlide = (currentSlide + 1) % slides.length;
      
      const outgoing = slides[prev];
      const incoming = slides[currentSlide];
      
      const outVideo = outgoing.querySelector('video');
      if (outVideo) {
        outVideo.ontimeupdate = null;
        outVideo.onended = null;
      }
      
      // Prep incoming: on top, opacity 1, hidden via clip-path
      gsap.set(incoming, { 
        zIndex: 3, 
        opacity: 1,
        scale: 1,
        clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" // Start hidden at right edge
      });
      gsap.set(outgoing, { zIndex: 2 }); // outgoing stays visible underneath initially
      
      // Animate clip-path to swipe left to right revealing incoming
      gsap.to(incoming, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.2,
        ease: "power3.inOut"
      });
      
      const inVideo = incoming.querySelector('video');
      if (!inVideo) {
        gsap.to(incoming, {
          scale: 1.1,
          duration: 6,
          ease: "none"
        });
      }
      
      playActiveSlide(currentSlide);
      
      // Cleanup outgoing after transition
      gsap.to(outgoing, {
        opacity: 0,
        duration: 0.1,
        delay: 1.2,
        onComplete: () => {
          gsap.set(outgoing, { zIndex: 1, clipPath: 'none' });
          if (outVideo) {
            outVideo.pause();
          }
        }
      });
    };

    // Initial trigger
    playActiveSlide(0);
  }

  // --- Scroll Animations --- (Smooth Scroll)
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // 2. Hero Entry Animation (Butter smooth reveal)
  const tl = gsap.timeline({ 
    defaults: { ease: 'power4.out', duration: 1.5 },
    onComplete: () => {
      document.querySelector('.ark-hero-desc')?.classList.add('revealed');
    }
  })
  tl.to('#hero .gsap-reveal', {
    y: 0,
    opacity: 1,
    visibility: 'visible',
    stagger: 0.2,
    duration: 1.5
  }, "-=1")

  // Parallax glass scroll effect
  gsap.to('.ark-hero-content', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: -80,
    opacity: 0.15,
    filter: 'blur(8px)',
    ease: 'none'
  });

  // 3. ScrollTrigger Reveal for normal sections
  const revealElements = document.querySelectorAll('.gsap-reveal:not(#hero .gsap-reveal):not(.gsap-bento-item)')
  revealElements.forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 0,
      opacity: 1,
      visibility: 'visible',
      duration: 1.2,
      ease: 'power3.out'
    })
  })

  // 4. Staggered reveal for Bento Grid
  if (document.querySelector('#sectores .bento-grid')) {
    ScrollTrigger.create({
      trigger: '#sectores .bento-grid',
      start: 'top 80%',
      onEnter: () => {
        gsap.to('.gsap-bento-item', {
          y: 0,
          opacity: 1,
          visibility: 'visible',
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out'
        })
      }
    })
  }

  // 5. Interactive Pinned Scroll Timeline (Map Section)
  const initMapAnimation = () => {
    // Create a timeline that is locked to the scrollbar
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#red-nacional-container",
        pin: true,           // Locks the section on the screen
        start: "top top+=100px", // Pin it securely below the fixed navbar
        end: "+=200%",       // Forces the user to scroll down an extra 200% of height to finish the animation
        scrub: 1             // Smoothly scrub the timeline based on scroll position
      }
    })

    // Fade the map AND the title in throughout the scroll duration
    tl.to("#static-map-image", { opacity: 0.8, duration: 4 }, 0)
    tl.to("#red-nacional-title", { opacity: 1, duration: 4 }, 0)

    // Sequence the stats
    const statBlocks = document.querySelectorAll('.stat-block')
    statBlocks.forEach((block, index) => {
      const counter = block.querySelector('.stat-counter')
      const startPos = index * 1.2 // Stagger the start time of each block
      
      // Block slides up and fades in
      tl.to(block, { opacity: 1, y: 0, duration: 1 }, startPos)

      if (counter) {
        const target = +counter.getAttribute('data-target')
        let obj = { val: 0 }
        // Counter increments synchronously
        tl.to(obj, {
          val: target,
          duration: 1,
          onUpdate: () => {
            counter.innerHTML = Math.floor(obj.val).toLocaleString('es-ES')
          }
        }, startPos)
      }
    })
  }
  initMapAnimation()

  // 6. Interactive Pinned Scroll for Process (Must init AFTER Map)
  const initProcessAnimation = () => {
    const items = document.querySelectorAll('.process-item-animated');
    if (!items.length) return;

    const lottieContainer = document.querySelector('#lottie-bar');
    if (!lottieContainer) return;
    
    // Clear container
    lottieContainer.innerHTML = '';

    // Initialize custom Canvas WebGL particles field (3D Sphere version)
    const dotsField = new DotsField(lottieContainer, {
      height: 620,
      sphereRadius: 156, // +20% from 130
      count: 1700,
      dotColor: "#000000",
      accentColor: "#F18108",
      accentRatio: 0.4,
      dotRadius: 3.66,
      alpha: 0.95,
      idleSpeed: 0.5,
      rotationSpeed: 0.25,
      endLife: 0
    });

    const processTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#proceso-container",
        pin: true,
        start: "top top", // Prevent overlap by pinning exactly at top
        end: "+=1200%", // Very long scroll distance for comfortable reading and pauses
        scrub: 1,
        onUpdate: (self) => {
          // Pass exactly the scroll progress to our canvas animation
          dotsField.setProgress(self.progress);
          
          // Dynamic mask to fade out the particles at the top (where text is)
          // At progress 0: transparent 15%, black 100% (faded at very top)
          // At progress 1: transparent 0%, black 0% (fully solid)
          const transPoint = 15 - (self.progress * 15);
          const fadePoint = 100 - (self.progress * 100); 
          lottieContainer.style.maskImage = `linear-gradient(to bottom, transparent 0%, transparent ${transPoint}%, black ${fadePoint}%)`;
          lottieContainer.style.webkitMaskImage = `linear-gradient(to bottom, transparent 0%, transparent ${transPoint}%, black ${fadePoint}%)`;
        }
      }
    });

    const wrapper = document.querySelector('.process-list-wrapper');
    const parentHeight = wrapper.parentElement.offsetHeight;

    // Set initial state: first item perfectly centered and fully visible
    const startY = (parentHeight / 2) - items[0].offsetTop - (items[0].offsetHeight / 2);
    gsap.set(wrapper, { y: startY });
    gsap.set(items[0], { opacity: 1 });

    // Initial pause for reading the first item
    processTl.to({}, { duration: 1 });

    items.forEach((item, i) => {
      if (i === 0) return; // Skip first item as it's already centered
      
      const targetY = (parentHeight / 2) - item.offsetTop - (item.offsetHeight / 2);
      
      // Move wrapper to center the NEXT item
      processTl.to(wrapper, {
        y: targetY,
        ease: "power2.inOut",
        duration: 1
      }, `step${i}`);
      
      // Fade out PREVIOUS item
      processTl.to(items[i - 1], {
        opacity: 0.1,
        duration: 0.4,
        ease: "none"
      }, `step${i}`);
      
      // Fade in CURRENT item
      processTl.to(item, {
        opacity: 1,
        duration: 0.4,
        ease: "none"
      }, `step${i}+=0.6`);
      
      // READ TIME PAUSE: Wait while user scrolls before moving to next item
      processTl.to({}, { duration: 1.5 });
    });
  }
  initProcessAnimation();

  // 5. Custom Premium Cursor (Noteworthy Style 100%)
  const cursorDot = document.querySelector('.custom-cursor__dot');
  const cursorRing = document.querySelector('.custom-cursor__ring');
  const cursorText = document.querySelector('.custom-cursor__text');

  if (cursorDot && cursorRing) {
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorRing, { xPercent: -50, yPercent: -50 });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;
    let hoverTarget = null;
    let isTextHover = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursorDot, { x: mouseX, y: mouseY, duration: 0, overwrite: 'auto' });
    });

    gsap.ticker.add(() => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      gsap.set(cursorRing, { x: ringX, y: ringY });
    });

    const handleHoverEnter = (e) => {
      isHovering = true;
      hoverTarget = e.currentTarget;
      const target = e.currentTarget;
      const cursorType = target.getAttribute('data-cursor');
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || cursorType === 'text';
      isTextHover = isInput;
      
      if (isInput) {
        // Text state: ring disappears, dot morphs into I-beam
        gsap.to(cursorRing, { width: 0, height: 0, opacity: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(cursorDot, { 
          width: 4, 
          height: 28, 
          borderRadius: '500% / 71.4%', 
          borderWidth: 0,
          scale: 1,
          duration: 0.3, 
          ease: 'power2.out' 
        });
      } else if (cursorType === 'nw-view') {
        cursorText.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(-45deg);"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
        gsap.to(cursorText, { opacity: 1, duration: 0.3 });
        gsap.fromTo(cursorText.querySelector('svg'), 
          { x: -15, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
        );
        gsap.to(cursorRing, { 
          width: 80, 
          height: 80, 
          opacity: 1, 
          borderRadius: '50%',
          backgroundColor: '#fff',
          border: 'none',
          backdropFilter: 'none',
          duration: 0.5, 
          ease: 'power3.out' 
        });
        gsap.to(cursorDot, { scale: 0, duration: 0.2 });
      } else if (cursorType) {
        // Text bubble inside the expanded ring
        cursorText.textContent = cursorType;
        cursorText.style.color = '#fff';
        gsap.to(cursorText, { opacity: 1, duration: 0.3 });
        gsap.to(cursorRing, { 
          width: 90, 
          height: 90, 
          opacity: 1, 
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 90, 0, 0.9)',
          border: 'none',
          backdropFilter: 'none',
          duration: 0.4, 
          ease: 'power3.out' 
        });
        gsap.to(cursorDot, { scale: 0, duration: 0.2 });
      } else {
        // Interactive element hover: ring expands around the cursor
        gsap.to(cursorRing, { 
          width: 60, 
          height: 60, 
          opacity: 0.7, 
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(1.5px)',
          duration: 0.4, 
          ease: 'power3.out' 
        });
        
        // Dot remains unchanged (20px white exclusion)
        gsap.to(cursorDot, { 
          width: 20, 
          height: 20, 
          borderRadius: '20px', 
          borderWidth: 2,
          scale: 1,
          duration: 0.3, 
          ease: 'power2.out' 
        });
      }
    };

    const handleHoverLeave = () => {
      isHovering = false;
      hoverTarget = null;
      isTextHover = false;
      
      // Revert ring
      gsap.to(cursorText, { opacity: 0, duration: 0.2 });
      gsap.to(cursorRing, { 
        width: 0, 
        height: 0, 
        opacity: 0, 
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(1.5px)',
        duration: 0.3, 
        ease: 'power2.out' 
      });
      
      // Revert dot
      gsap.to(cursorDot, { 
        width: 20, 
        height: 20, 
        borderRadius: '20px', 
        borderWidth: 2,
        scale: 1,
        duration: 0.3, 
        ease: 'power2.out' 
      });
    };

    document.querySelectorAll('a, button, .bento-item, .stat-block, input, textarea, .btn-regius, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', handleHoverEnter);
      el.addEventListener('mouseleave', handleHoverLeave);
    });

    // Control video playback on project card hovers
    document.querySelectorAll('.nw-project-card').forEach(card => {
      const video = card.querySelector('.nw-project-video');
      if (video) {
        card.addEventListener('mouseenter', () => {
          video.currentTime = 0;
          video.play().catch(err => console.log('Video play interrupted:', err));
        });
        card.addEventListener('mouseleave', () => {
          video.pause();
        });
      }
    });
  }
}

// Header dinámico - ajusta altura según contenido del mega menu
function initDynamicHeader() {
  const header = document.querySelector('.site-header');
  const navItems = document.querySelectorAll('.nav-item-dropdown');

  if (!header || !navItems.length) return;

  navItems.forEach(navItem => {
    const megaMenu = navItem.querySelector('.mega-menu');
    if (!megaMenu) return;

    navItem.addEventListener('mouseenter', () => {
      // Calcular altura del mega menu + barra superior (80px)
      const megaMenuHeight = megaMenu.scrollHeight;
      const totalHeight = 80 + megaMenuHeight;

      // Aplicar altura calculada al header
      header.style.height = `${totalHeight}px`;
    });

    navItem.addEventListener('mouseleave', () => {
      // Volver a altura original
      header.style.height = '80px';
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  if (isProyectoPage) {
    initProyectoAnimations();
  } else {
    initAnimations();
  }

  // Inicializar header dinámico
  initDynamicHeader();
});
