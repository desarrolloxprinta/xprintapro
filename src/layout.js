/**
 * SISTEMA DE LAYOUT UNIVERSAL - XPRINTA PRO
 *
 * Este módulo proporciona componentes reutilizables (header, footer) y una función
 * de layout que envuelve el contenido de cada página.
 *
 * USO:
 * import { createLayout } from './layout.js'
 *
 * document.querySelector('#app').innerHTML = createLayout({
 *   content: '<div>Mi contenido</div>',
 *   pageClass: 'page-home' // Opcional
 * })
 *
 * @module layout
 */

import content from './data/content.json'
import { getRecentProjects } from './lib/supabase.js'

// Cache de proyectos recientes para el header
let headerProjectsCache = null;

/**
 * Carga los 3 proyectos más recientes para el mega-menu
 * @returns {Promise<Array>} Proyectos recientes
 */
async function loadHeaderProjects() {
  if (headerProjectsCache) return headerProjectsCache;

  try {
    const projects = await getRecentProjects(3);
    headerProjectsCache = projects.map(p => ({
      title: p.title,
      description: p.short_description || p.client_description,
      image: p.hero_image || p.hero_video,
      url: `/proyecto-${p.slug}.html` // Arreglado: usar formato correcto /proyecto-slug.html
    }));
    return headerProjectsCache;
  } catch (error) {
    console.error('Error cargando proyectos para header:', error);
    // Fallback a content.json si falla
    return content.proyectos.slice(0, 3);
  }
}

/**
 * Renderiza el header/navbar universal
 * Ahora es DINÁMICO - carga proyectos desde Supabase
 *
 * @returns {Promise<string>} HTML del header
 */
export const renderHeader = async () => {
  const proyectosHeader = await loadHeaderProjects();

  return `
  <header class="site-header">
    <div class="container-fluid navbar">
      <a href="/" class="navbar-brand">
        <img src="/logo-xprina-azul.png" alt="Xprinta Pro" class="navbar-logo" />
      </a>
      <nav class="navbar-nav">

        <div class="nav-item-dropdown">
          <a href="/proyectos.html" class="nav-link">Proyectos <svg class="dropdown-icon" viewBox="0 0 12 8"><path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="mega-menu">
            <div class="container-fluid mega-menu-proyectos-inner">
              ${proyectosHeader.map(proj => `
                <div class="mega-menu-proyectos-card">
                  <a href="${proj.url}" class="mega-menu__link-block">
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
              <a href="/proyectos.html" class="btn-regius">
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
                    <a href="/brandcommerce.html" class="mega-menu-link">BRANDCOMMERCE</a>
                    <a href="/brandcheck.html" class="mega-menu-link">BRANDCHECK</a>
                    <a href="/brandsurveys.html" class="mega-menu-link">BRANDSURVEYS</a>
                    <a href="/brandsignal.html" class="mega-menu-link">BRANDSIGNAL</a>
                    <a href="/brandvision.html" class="mega-menu-link">BRANDVISION</a>
                  </div>
                </div>
                <div class="mega-menu-column">
                  <span class="mega-menu-title">Gestión y Legal</span>
                  <div class="mega-menu-links">
                    <a href="/brandguide.html" class="mega-menu-link">BRANDGUIDE</a>
                    <a href="/brandcenter.html" class="mega-menu-link">BRANDCENTER</a>
                    <a href="/brandtools.html" class="mega-menu-link">BRANDTOOLS</a>
                    <a href="/brandcare.html" class="mega-menu-link">BRANDCARE</a>
                    <a href="/brandlegal.html" class="mega-menu-link">BRANDLEGAL</a>
                  </div>
                </div>
              </div>
              <div class="mega-menu-right">
                <div class="mega-menu-card">
                  <video class="mega-menu-image" autoplay loop muted playsinline style="object-fit: cover;" src="/servicios/video-servicio-header.mp4"></video>
                  <div class="mega-menu-card-content">
                    <h4>Soluciones a medida para corporaciones</h4>
                    <a href="/servicios.html" class="btn-regius outline">
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
          <a href="#por-que-xprinta" class="nav-link">¿Por qué Xprinta? <svg class="dropdown-icon" viewBox="0 0 12 8"><path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="mega-menu">
            <div class="container-fluid mega-menu-inner">
              <div class="mega-menu-left">
                <div class="mega-menu-column">
                  <span class="mega-menu-title">Ventajas Competitivas</span>
                  <div class="mega-menu-links">
                    <a href="/red-profesional.html" class="mega-menu-link">RED PROFESIONAL</a>
                    <a href="/proveedor-unificado.html" class="mega-menu-link">PROVEEDOR UNIFICADO</a>
                    <a href="/ahorro-costes.html" class="mega-menu-link">AHORRO DE COSTES</a>
                    <a href="/proyecto-pic.html" class="mega-menu-link">PROYECTO PIC</a>
                    <a href="/gestion-proyectos.html" class="mega-menu-link">GESTION DE PROYECTOS</a>
                  </div>
                </div>
                <div class="mega-menu-column">
                  <span class="mega-menu-title">Garantía y Seguridad</span>
                  <div class="mega-menu-links">
                    <a href="/trazabilidad-producto.html" class="mega-menu-link">TRAZABILIDAD</a>
                    <a href="/financiacion.html" class="mega-menu-link">FINANCIACION</a>
                    <a href="/garantia.html" class="mega-menu-link">GARANTIA XPRINTA</a>
                    <a href="/ecosign.html" class="mega-menu-link">ECOSIGN</a>
                    <a href="/legalizacion.html" class="mega-menu-link">LEGALIZACION</a>
                  </div>
                </div>
              </div>
              <div class="mega-menu-right">
                <div class="mega-menu-card">
                  <video class="mega-menu-image" autoplay loop muted playsinline style="object-fit: cover;" src="/por-que-xprinta/Gestión%20de%20proyectos/header-remax-video.mp4"></video>
                  <div class="mega-menu-card-content">
                    <h4>Experiencia en todos los sectores productivos</h4>
                    <a href="/proyectos.html" class="btn-regius outline">
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
                <div class="mega-menu-card overflow-hidden">
                  <video class="mega-menu-image" autoplay loop muted playsinline style="object-fit: cover;" poster="/nosotros/xprinta-home-800.jpg">
                    <source src="/nosotros/nosotros-video-800.mp4" type="video/mp4">
                  </video>
                  <div class="mega-menu-card-content">
                    <h4>Conoce nuestro equipo y filosofía</h4>
                    <a href="#nosotros" class="btn-regius outline">
                      <div class="btn-regius-text-wrapper">
                        <div class="btn-regius-text _1">Sobre Nosotros</div>
                        <div class="btn-regius-text _2">Sobre Nosotros</div>
                      </div>
                      <div class="btn-regius-bg"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </nav>
      <a href="#contacto" class="btn btn-primary">Contacto</a>
    </div>
  </header>
`
}

/**
 * Renderiza el footer universal
 *
 * @returns {string} HTML del footer
 */
export const renderFooter = () => `
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

/**
 * Crea un layout completo con header + contenido + footer
 *
 * EJEMPLO DE USO:
 *
 * ```javascript
 * import { createLayout } from './layout.js'
 *
 * document.querySelector('#app').innerHTML = createLayout({
 *   content: `
 *     <section class="hero">
 *       <h1>Mi Página</h1>
 *     </section>
 *   `,
 *   pageClass: 'page-home' // Opcional
 * })
 * ```
 *
 * @param {Object} options - Opciones del layout
 * @param {string} options.content - Contenido HTML de la página
 * @param {string} [options.pageClass=''] - Clase CSS adicional para el main
 * @returns {Promise<string>} HTML completo con header + contenido + footer (AHORA ES ASYNC)
 */
export const createLayout = async ({ content, pageClass = '', hideHeader = false }) => {
  const header = hideHeader ? '' : await renderHeader();

  return `
  ${header}
  <main class="${pageClass}">
    ${content}
  </main>
  ${renderFooter()}
  <!-- Cursor personalizado global -->
  <div class="custom-cursor__dot"></div>
  <div class="custom-cursor__ring"><span class="custom-cursor__text"></span></div>
`;
}

/**
 * Inicializa el header dinámico
 * Debe llamarse después de que el DOM esté listo
 *
 * @returns {void}
 */
export function initDynamicHeader() {
  const header = document.querySelector('.site-header');
  const navItems = document.querySelectorAll('.nav-item-dropdown');

  if (!header) {
    console.warn('⚠️ Header no encontrado - initDynamicHeader abortado');
    return;
  }

  if (!navItems.length) {
    console.warn('⚠️ Nav items con dropdown no encontrados');
    return;
  }

  const HEADER_BASE_HEIGHT = 80;
  const SAFETY_MARGIN = 10;

  navItems.forEach((navItem, index) => {
    const megaMenu = navItem.querySelector('.mega-menu');

    if (!megaMenu) {
      console.warn(`⚠️ Mega menu no encontrado en nav-item ${index}`);
      return;
    }

    let isExpanded = false;

    navItem.addEventListener('mouseenter', () => {
      if (isExpanded) return;

      const megaMenuHeight = megaMenu.scrollHeight;

      if (megaMenuHeight < 100 || megaMenuHeight > 2000) {
        console.warn(`⚠️ Altura anómala del mega menu: ${megaMenuHeight}px`);
      }

      const totalHeight = HEADER_BASE_HEIGHT + megaMenuHeight + SAFETY_MARGIN;
      header.style.height = `${totalHeight}px`;
      isExpanded = true;
    });

    navItem.addEventListener('mouseleave', () => {
      header.style.height = `${HEADER_BASE_HEIGHT}px`;
      isExpanded = false;
    });
  });

  console.log('✅ Header dinámico inicializado correctamente');
}
