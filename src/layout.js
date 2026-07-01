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
import { getRecentProjects, getAreaTecnicaPosts } from './lib/supabase.js'

// Cache de proyectos recientes para el header
let headerProjectsCache = null;
let headerAreaTecnicaCache = null;

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
 * Carga los 3 artículos más recientes del Área Técnica para el mega-menu
 * @returns {Promise<Array>} Artículos recientes
 */
async function loadHeaderAreaTecnica() {
  if (headerAreaTecnicaCache) return headerAreaTecnicaCache;

  try {
    console.log('🔍 [Header] Cargando artículos de Área Técnica...');
    const posts = await getAreaTecnicaPosts();
    console.log('📦 [Header] Artículos recibidos:', posts?.length, posts);

    // Tomar solo los 3 más recientes
    const recentPosts = posts.slice(0, 3);
    console.log('✂️ [Header] Artículos recientes (3):', recentPosts);

    headerAreaTecnicaCache = recentPosts.map(post => ({
      title: post.title,
      description: post.category || 'Artículo Técnico',
      image: post.thumbnail || '/area tecnica/thumb-parking.jpeg', // Usar thumbnail, fallback a parking
      url: `/area-tecnica-post.html?slug=${post.slug}`
    }));
    console.log('✅ [Header] Cache de Área Técnica creado:', headerAreaTecnicaCache);
    return headerAreaTecnicaCache;
  } catch (error) {
    console.error('❌ [Header] Error cargando artículos del área técnica:', error);
    // Fallback vacío si falla
    return [];
  }
}

/**
 * Renderiza el header/navbar universal
 * Ahora es DINÁMICO - carga proyectos y artículos del área técnica desde Supabase
 *
 * @returns {Promise<string>} HTML del header
 */
export const renderHeader = async () => {
  const proyectosHeader = await loadHeaderProjects();
  const areaTecnicaHeader = await loadHeaderAreaTecnica();

  return `
  <header class="site-header">
    <div class="container-fluid navbar">
      <a href="/" class="navbar-brand">
        <img src="/logo-xprina-azul.svg" alt="Xprinta Pro" class="navbar-logo" />
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

        <div class="nav-item-dropdown">
          <a href="/area-tecnica.html" class="nav-link">Área Técnica <svg class="dropdown-icon" viewBox="0 0 12 8"><path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="mega-menu">
            <div class="container-fluid mega-menu-proyectos-inner">
              ${areaTecnicaHeader.map(article => `
                <div class="mega-menu-proyectos-card">
                  <a href="${article.url}" class="mega-menu__link-block">
                    <img src="${article.image}" alt="${article.title}" class="mega-menu-proyectos-image" />
                    <h4 class="mega-menu-proyectos-title">${article.title}</h4>
                    <p class="mega-menu-proyectos-desc">${article.description}</p>
                  </a>
                  <div class="mega-menu__item-footer">
                    <span class="mega-menu-proyectos-link">Leer artículo &rarr;</span>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="container-fluid mega-menu__footer-actions">
              <a href="/area-tecnica.html" class="btn-regius">
                <div class="btn-regius-text-wrapper">
                  <div class="btn-regius-text _1">Ver todos los artículos</div>
                  <div class="btn-regius-text _2">Ver todos los artículos</div>
                </div>
                <div class="btn-regius-bg"></div>
              </a>
            </div>
          </div>
        </div>

        <div class="nav-item">
          <a href="/red-xprinta.html" class="nav-link">Red Xprinta</a>
        </div>

        <div class="nav-item-dropdown">
          <a href="#nosotros" class="nav-link">Nosotros <svg class="dropdown-icon" viewBox="0 0 12 8"><path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="mega-menu">
            <div class="container-fluid mega-menu-inner">
              <div class="mega-menu-left">
                <div class="mega-menu-column">
                  <span class="mega-menu-title">Nuestra Empresa</span>
                  <div class="mega-menu-links">
                    <a href="/nosotros.html" class="mega-menu-link">HISTORIA</a>
                    <a href="/equipo.html" class="mega-menu-link">EQUIPO</a>
                    <a href="/sistema-xprinta.html" class="mega-menu-link">SISTEMA XPRINTA</a>
                    <a href="/faq.html" class="mega-menu-link">FAQs</a>
                  </div>
                </div>
              </div>
              <div class="mega-menu-right">
                <div class="mega-menu-card overflow-hidden">
                  <video class="mega-menu-image" autoplay loop muted playsinline poster="/nosotros/historia/xprinta-home-800.jpg">
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
        <div class="footer-social-wrap">
          <a href="https://www.linkedin.com/company/xprinta/" target="_blank" class="social-link" aria-label="LinkedIn">
            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/xprinta_signs/" target="_blank" class="social-link" aria-label="Instagram">
            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://www.tiktok.com/@xprinta" target="_blank" class="social-link" aria-label="TikTok">
            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.52-4.06-1.47-.94-.78-1.63-1.85-2-3.03V15.5c0 1.61-.39 3.25-1.35 4.55-1.54 2.12-4.26 3.19-6.81 2.69-2.83-.56-5.17-2.84-5.66-5.67-.67-3.87 1.83-7.79 5.71-8.32 1.09-.15 2.2.03 3.22.46V13.1c-.88-.41-1.89-.56-2.85-.36-1.89.4-3.32 2.15-3.26 4.09.07 2.05 1.85 3.69 3.9 3.51 1.84-.16 3.23-1.72 3.16-3.56V.02z"/>
            </svg>
          </a>
        </div>
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
            <img src="/miembro/fespa.png" alt="FESPA">
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
              <a href="/red-xprinta.html" class="footer-link">Ver red completa →</a>
            </div>
          </div>
          <div class="footer-column">
            <div class="footer-label">CONTACTO</div>
            <div class="footer-links-column">
              <a href="tel:915052927" class="footer-link">Tel. 91 505 29 27</a>
              <a href="mailto:presupuesto@xprinta.com?subject=Contacto%20desde%20Xprinta%20Pro" class="footer-link">presupuesto@xprinta.com</a>
              <a href="/" class="footer-link">xprintapro.com</a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom-tile">
        <div class="footer-divider"></div>
        <div class="footer-bottom-wrap">
          <div class="footer-rights-wrap">
            <div class="footer-text footer-text--small">© Copyright - 2026, Xprinta Signs Spain - desarrollado por Xprinta Digital</div>
          </div>
          <div class="footer-legal-links">
            <a href="/politica-de-cookies.html" class="footer-text footer-text--small">Política de Cookies</a>
            <a href="/aviso-legal.html" class="footer-text footer-text--small">Aviso Legal</a>
            <a href="/proteccion-de-datos.html" class="footer-text footer-text--small">Protección de Datos</a>
          </div>
        </div>
      </div>
    </div>
  </section>
`

/**
 * Genera meta tags SEO dinámicos
 * @param {Object} metadata - Metadatos de la página
 * @returns {string} HTML con meta tags
 */
function generateMetaTags(metadata) {
  if (!metadata) return '';

  const escapedTitle = (metadata.title || '').replace(/"/g, '&quot;');
  const escapedDescription = (metadata.description || '').replace(/"/g, '&quot;');
  const escapedKeywords = (metadata.keywords || '').replace(/"/g, '&quot;');
  const escapedImage = (metadata.image || '').replace(/"/g, '&quot;');
  const escapedUrl = (metadata.url || '').replace(/"/g, '&quot;');
  const escapedAuthor = (metadata.author || 'Xprinta Pro').replace(/"/g, '&quot;');

  return `
    <!-- SEO Meta Tags -->
    <title>${escapedTitle}</title>
    <meta name="description" content="${escapedDescription}">
    ${escapedKeywords ? `<meta name="keywords" content="${escapedKeywords}">` : ''}
    <meta name="author" content="${escapedAuthor}">
    <link rel="canonical" href="${escapedUrl}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${metadata.type || 'website'}">
    <meta property="og:url" content="${escapedUrl}">
    <meta property="og:title" content="${escapedTitle}">
    <meta property="og:description" content="${escapedDescription}">
    <meta property="og:image" content="${escapedImage}">
    ${metadata.publishedTime ? `<meta property="article:published_time" content="${metadata.publishedTime}">` : ''}
    ${metadata.modifiedTime ? `<meta property="article:modified_time" content="${metadata.modifiedTime}">` : ''}
    ${metadata.author ? `<meta property="article:author" content="${escapedAuthor}">` : ''}

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="${escapedUrl}">
    <meta name="twitter:title" content="${escapedTitle}">
    <meta name="twitter:description" content="${escapedDescription}">
    <meta name="twitter:image" content="${escapedImage}">

    ${metadata.schemas ? metadata.schemas.join('\n    ') : ''}
  `;
}

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
 *   pageClass: 'page-home', // Opcional
 *   metadata: { // Opcional - para SEO
 *     title: 'Mi Página',
 *     description: 'Descripción de mi página',
 *     image: '/images/hero.jpg'
 *   }
 * })
 * ```
 *
 * @param {Object} options - Opciones del layout
 * @param {string} options.content - Contenido HTML de la página
 * @param {string} [options.pageClass=''] - Clase CSS adicional para el main
 * @param {Object} [options.metadata] - Metadatos SEO de la página
 * @param {boolean} [options.hideHeader=false] - Ocultar el header
 * @returns {Promise<string>} HTML completo con header + contenido + footer (AHORA ES ASYNC)
 */
export const createLayout = async ({ content, pageClass = '', hideHeader = false, metadata = null }) => {
  const header = hideHeader ? '' : await renderHeader();
  const metaTags = metadata ? generateMetaTags(metadata) : '';

  // Inyectar meta tags en el <head> si existen
  if (metaTags && typeof document !== 'undefined') {
    // En el cliente, inyectar los meta tags dinámicamente
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = metaTags;
    const head = document.head;

    // Eliminar meta tags antiguos (excepto los básicos)
    const oldMetaTags = head.querySelectorAll('meta[property^="og:"], meta[property^="article:"], meta[name="twitter:"], meta[name="description"], meta[name="keywords"], meta[name="author"], link[rel="canonical"], script[type="application/ld+json"]');
    oldMetaTags.forEach(tag => tag.remove());

    // Agregar nuevos meta tags
    Array.from(tempDiv.children).forEach(child => {
      if (child.tagName === 'TITLE') {
        document.title = child.textContent;
      } else {
        head.appendChild(child.cloneNode(true));
      }
    });
  }

  return `
  ${header}
  <main class="${pageClass}">
    ${content}
  </main>
  ${renderFooter()}
  <!-- Cursor personalizado global -->
  <div class="custom-cursor__dot"></div>
  <div class="custom-cursor__ring"><span class="custom-cursor__text"></span></div>

  <!-- Banner de cookies RGPD -->
  <div id="xprinta-cookie-banner" class="cookie-banner" style="display: none;">
    <div class="cookie-banner-content">
      <p>Utilizamos cookies propias y de terceros para analizar su navegación y mostrarle publicidad personalizada según un perfil elaborado a partir de sus hábitos de navegación. Puede aceptar todas las cookies pulsando "Aceptar todas", rechazarlas o configurar sus preferencias. Más información en nuestra <a href="/politica-de-cookies.html" style="color: var(--color-highlight); text-decoration: none; font-weight: 600;">Política de Cookies</a>.</p>
      <div class="cookie-banner-actions">
        <button id="cookie-btn-configure" class="btn-cookie outline">Configurar</button>
        <button id="cookie-btn-reject" class="btn-cookie outline">Rechazar todas</button>
        <button id="cookie-btn-accept" class="btn-cookie">Aceptar todas</button>
      </div>
    </div>
  </div>

  <!-- Modal de configuración de cookies -->
  <div id="cookie-config-modal" class="cookie-modal" style="display: none;">
    <div class="cookie-modal-backdrop"></div>
    <div class="cookie-modal-content">
      <h3>Centro de Preferencias de Privacidad</h3>
      <p style="font-size: 0.95rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">De acuerdo con el Reglamento General de Protección de Datos de la UE (RGPD), puede configurar el uso de cookies en nuestro portal:</p>
      
      <div class="cookie-option" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div class="cookie-option-info" style="max-width: 80%;">
          <strong style="display: block; color: var(--color-tertiary); font-size: 1rem; margin-bottom: 0.25rem;">Cookies Técnicas (Obligatorias)</strong>
          <span style="font-size: 0.85rem; color: var(--color-text-muted);">Establecen la sesión y recuerdan sus preferencias de privacidad de forma segura.</span>
        </div>
        <input type="checkbox" checked disabled style="width: 20px; height: 20px;">
      </div>

      <div class="cookie-option" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 2rem;">
        <div class="cookie-option-info" style="max-width: 80%;">
          <strong style="display: block; color: var(--color-tertiary); font-size: 1rem; margin-bottom: 0.25rem;">Cookies Analíticas (Google Analytics)</strong>
          <span style="font-size: 0.85rem; color: var(--color-text-muted);">Recopilan datos estadísticos de visitas a la web de forma anónima para ayudarnos a mejorar.</span>
        </div>
        <input type="checkbox" id="cookie-opt-analytics" checked style="width: 20px; height: 20px;">
      </div>

      <div class="cookie-modal-actions" style="display: flex; justify-content: flex-end; gap: 1rem;">
        <button id="cookie-config-save" class="btn-cookie">Guardar Ajustes</button>
      </div>
    </div>
  </div>
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

  // ==========================================================================
  // Inicialización de Consentimiento de Cookies (RGPD Europea)
  // ==========================================================================
  const consent = localStorage.getItem('xprinta-cookie-consent');
  const banner = document.getElementById('xprinta-cookie-banner');
  const modal = document.getElementById('cookie-config-modal');

  if (!consent && banner) {
    banner.style.display = 'block';
  }

  const acceptBtn = document.getElementById('cookie-btn-accept');
  const rejectBtn = document.getElementById('cookie-btn-reject');
  const configBtn = document.getElementById('cookie-btn-configure');
  const saveConfigBtn = document.getElementById('cookie-config-save');
  const backdrop = modal ? modal.querySelector('.cookie-modal-backdrop') : null;

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('xprinta-cookie-consent', 'all');
      if (banner) banner.style.display = 'none';
      console.log('🍪 [Cookies] Aceptadas todas las cookies');
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      localStorage.setItem('xprinta-cookie-consent', 'essential');
      if (banner) banner.style.display = 'none';
      console.log('🍪 [Cookies] Rechazadas las cookies de terceros');
    });
  }

  if (configBtn && modal) {
    configBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  }

  if (backdrop && modal) {
    backdrop.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (saveConfigBtn && modal) {
    saveConfigBtn.addEventListener('click', () => {
      const analyticsAllowed = document.getElementById('cookie-opt-analytics')?.checked;
      localStorage.setItem('xprinta-cookie-consent', analyticsAllowed ? 'all' : 'essential');
      modal.style.display = 'none';
      if (banner) banner.style.display = 'none';
      console.log(`🍪 [Cookies] Preferencias guardadas. Analíticas: ${analyticsAllowed}`);
    });
  }

  console.log('✅ Header dinámico y Consentimiento de Cookies inicializados correctamente');
}
