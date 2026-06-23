import './style.css'
import './proceso-lottie.css'
import content from './data/content.json'
import puntos from './data/puntos.json'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import DotsField from './DotsField'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
import { renderProcesoLottie, initProcesoLottie } from './proceso-lottie'

gsap.registerPlugin(ScrollTrigger)

// ==========================================================================
// Render Functions - Premium Studio Aesthetic
// ==========================================================================

const renderNavbar = () => `
  <header class="site-header">
    <div class="container-fluid navbar">
      <a href="/" class="navbar-brand">
        <img src="/logo-xprina-azul.png" alt="Xprinta Pro" class="navbar-logo" style="height: 76px;" />
      </a>
      <nav class="navbar-nav" style="gap: 1.5rem;">
        
        <div class="nav-item-dropdown has-mega-menu" id="nav-item-proyectos">
          <a href="/#proyectos" class="nav-link" style="font-size: 0.9rem;">${content.navbar.proyectos.title} <svg class="dropdown-icon" viewBox="0 0 12 8"><path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="mega-menu">
            <div class="container-fluid mega-menu-proyectos-inner">
              ${content.proyectos.slice(0, 3).map(proj => `
                <div class="mega-menu-proyectos-card">
                  <a href="${proj.url || '/#proyectos'}" style="display: flex; flex-direction: column; height: 100%; text-decoration: none; color: inherit;">
                    <img src="${proj.image}" alt="${proj.title}" class="mega-menu-proyectos-image" />
                    <h4 class="mega-menu-proyectos-title">${proj.title}</h4>
                    <p class="mega-menu-proyectos-desc">${proj.description}</p>
                    <div style="margin-top: auto;">
                      <span class="mega-menu-proyectos-link">${content.navbar.proyectos.verProyecto}</span>
                    </div>
                  </a>
                </div>
              `).join('')}
            </div>
            <div class="container-fluid" style="display: flex; justify-content: flex-end; padding: 0 32px; margin-top: 8px;">
              <a href="/#proyectos" class="btn-regius">
                <div class="btn-regius-text-wrapper">
                  <div class="btn-regius-text _1">${content.navbar.proyectos.verTodos}</div>
                  <div class="btn-regius-text _2">${content.navbar.proyectos.verTodos}</div>
                </div>
                <div class="btn-regius-bg"></div>
              </a>
            </div>
          </div>
        </div>

        <div class="nav-item-dropdown has-mega-menu">
          <a href="/#servicios" class="nav-link" style="font-size: 0.9rem;">${content.navbar.servicios.title} <svg class="dropdown-icon" viewBox="0 0 12 8"><path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="mega-menu">
            <div class="container-fluid mega-menu-inner">
              <div class="mega-menu-left">
                <div class="mega-menu-column">
                  <span class="mega-menu-title">${content.navbar.servicios.solucionesBrand.title}</span>
                  <div class="mega-menu-links">
                    ${content.navbar.servicios.solucionesBrand.links.map(link => `<a href="#" class="mega-menu-link">${link}</a>`).join('')}
                  </div>
                </div>
                <div class="mega-menu-column">
                  <span class="mega-menu-title">${content.navbar.servicios.gestionLegal.title}</span>
                  <div class="mega-menu-links">
                    ${content.navbar.servicios.gestionLegal.links.map(link => `<a href="#" class="mega-menu-link">${link}</a>`).join('')}
                  </div>
                </div>
              </div>
              <div class="mega-menu-right">
                <div class="mega-menu-card">
                  <img src="${content.navbar.servicios.card.image}" alt="${content.navbar.servicios.title}" class="mega-menu-image" />
                  <div class="mega-menu-card-content" style="display: flex; flex-direction: column; flex: 1;">
                    <h4 style="margin-bottom: auto;">${content.navbar.servicios.card.title}</h4>
                    <a href="/#servicios" class="btn-regius outline" style="align-self: flex-start; margin-top: 16px;">
                      <div class="btn-regius-text-wrapper">
                        <div class="btn-regius-text _1">${content.navbar.servicios.card.cta}</div>
                        <div class="btn-regius-text _2">${content.navbar.servicios.card.cta}</div>
                      </div>
                      <div class="btn-regius-bg"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="nav-item-dropdown has-mega-menu">
          <a href="/#por-que-xprinta" class="nav-link" style="font-size: 0.9rem;">${content.navbar.porQueXprinta.title} <svg class="dropdown-icon" viewBox="0 0 12 8"><path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="mega-menu">
            <div class="container-fluid mega-menu-inner">
              <div class="mega-menu-left">
                <div class="mega-menu-column">
                  <span class="mega-menu-title">${content.navbar.porQueXprinta.ventajas.title}</span>
                  <div class="mega-menu-links">
                    ${content.navbar.porQueXprinta.ventajas.links.map(link => `<a href="#" class="mega-menu-link">${link}</a>`).join('')}
                  </div>
                </div>
                <div class="mega-menu-column">
                  <span class="mega-menu-title">${content.navbar.porQueXprinta.garantia.title}</span>
                  <div class="mega-menu-links">
                    ${content.navbar.porQueXprinta.garantia.links.map(link => `<a href="#" class="mega-menu-link">${link}</a>`).join('')}
                  </div>
                </div>
              </div>
              <div class="mega-menu-right">
                <div class="mega-menu-card">
                  <img src="${content.navbar.porQueXprinta.card.image}" alt="${content.navbar.porQueXprinta.title}" class="mega-menu-image" />
                  <div class="mega-menu-card-content" style="display: flex; flex-direction: column; flex: 1;">
                    <h4 style="margin-bottom: auto;">${content.navbar.porQueXprinta.card.title}</h4>
                    <a href="/#por-que-xprinta" class="btn-regius outline" style="align-self: flex-start; margin-top: 16px;">
                      <div class="btn-regius-text-wrapper">
                        <div class="btn-regius-text _1">${content.navbar.porQueXprinta.card.cta}</div>
                        <div class="btn-regius-text _2">${content.navbar.porQueXprinta.card.cta}</div>
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
          <a href="/#mapa" class="nav-link" style="font-size: 0.9rem;">${content.navbar.redXprinta}</a>
        </div>

        <div class="nav-item-dropdown">
          <a href="/#area-tecnica" class="nav-link" style="font-size: 0.9rem;">${content.navbar.areaTecnica}</a>
        </div>

        <div class="nav-item-dropdown has-mega-menu">
          <a href="/#nosotros" class="nav-link" style="font-size: 0.9rem;">${content.navbar.nosotros.title} <svg class="dropdown-icon" viewBox="0 0 12 8"><path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="mega-menu">
            <div class="container-fluid mega-menu-inner">
              <div class="mega-menu-left">
                <div class="mega-menu-column">
                  <span class="mega-menu-title">${content.navbar.nosotros.nuestraEmpresa.title}</span>
                  <div class="mega-menu-links">
                    ${content.navbar.nosotros.nuestraEmpresa.links.map(link => `<a href="#" class="mega-menu-link">${link}</a>`).join('')}
                  </div>
                </div>
              </div>
              <div class="mega-menu-right">
                <div class="mega-menu-card">
                  <img src="${content.navbar.nosotros.card.image}" alt="${content.navbar.nosotros.title}" class="mega-menu-image" />
                  <div class="mega-menu-card-content">
                    <h4>${content.navbar.nosotros.card.title}</h4>
                    <span class="mega-menu-card-link">${content.navbar.nosotros.card.cta}</span>
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
            <div class="btn-regius-text _1">${content.navbar.contactoBtn}</div>
            <div class="btn-regius-text _2">${content.navbar.contactoBtn}</div>
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
          ${content.hero.titleParts.map(part => part.highlight 
            ? `<span class="hero-title-solid"><span class="hero-highlight-word">${part.text}</span></span>`
            : `<span class="hero-title-solid">${part.text}</span>`).join('')}
        </h1>
        <p class="ark-hero-desc">${content.hero.subtitle}</p>
        
        <div class="ark-hero-info">
          ${content.hero.infoCols.map(col => `
          <div class="ark-info-col">
            <strong>${col.title}</strong>
            <span>${col.desc}</span>
          </div>
          `).join('')}
          <div class="ark-info-col ark-info-cta">
            <a href="#contacto" class="btn-regius">
              <div class="btn-regius-bg"></div>
              <div class="btn-regius-text-wrapper">
                <div class="btn-regius-text _1">${content.hero.cta}</div>
                <div class="btn-regius-text _2">${content.hero.cta}</div>
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
              <div class="hero-slide" style="${index === 0 ? 'opacity: 1;' : ''}">
                <video src="${videoSrc}" muted playsinline autoplay style="width: 100%; height: 100%; object-fit: cover;"></video>
              </div>
            `;
          }
          return `
            <div class="hero-slide" style="background-image: url('${src}'); ${index === 0 ? 'opacity: 1;' : ''}"></div>
          `;
        }).join('')}
      </div>
    </div>
  </section>
`

const renderMarquee = () => {
  const logos = [...content.clientes, ...content.clientes, ...content.clientes]
  return `
    <section class="marquee-container gsap-reveal" id="clientes" style="padding-top: 8rem; padding-bottom: 8rem; position: relative;">
      <!-- Subtle top border/gradient -->
      <div style="position: absolute; top: 0; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 50%, transparent);"></div>
      
      <div class="container-fluid" style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 6rem;">
        <span class="text-caption">${content.sections.marquee.caption || ''}</span>
        <h2 class="text-large" style="max-width: 900px; margin-bottom: 1.5rem;">
          ${content.sections.marquee.title}
        </h2>
      </div>
      
      <div style="position: relative; mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);">
        <div class="marquee-content">
          ${logos.map(logo => `<img src="${logo}" alt="Logo cliente" />`).join('')}
        </div>
        <div class="marquee-content" aria-hidden="true">
          ${logos.map(logo => `<img src="${logo}" alt="Logo cliente" />`).join('')}
        </div>
      </div>
    </section>
  `
}

const renderProyectos = () => `
  <section id="proyectos" class="nw-proyectos-section">
    <div class="nw-proyectos-header gsap-reveal">
      <div class="nw-proyectos-title-wrapper gsap-reveal">
          <span class="text-caption text-muted text-uppercase" style="margin-bottom: 1rem; display: block;">${content.sections.proyectos.subtitle || ''}</span>
          <h2 class="text-large font-serif font-regular" style="margin: 0; max-width: 800px;">
            ${content.sections.proyectos.title}
          </h2>
        </div>
        <div class="nw-proyectos-action gsap-reveal" style="padding-bottom: 1rem;">
          <a href="#" class="btn-regius outline" style="border-color: var(--color-border);">
            <div class="btn-regius-bg" style="background: var(--color-text);"></div>
            <div class="btn-regius-text-wrapper" style="color: var(--color-text);">
              <div class="btn-regius-text _1">${content.sections.proyectos.linkExplorar || 'Explorar proyectos'}</div>
              <div class="btn-regius-text _2" style="color: var(--color-background);">${content.sections.proyectos.linkExplorar || 'Explorar proyectos'}</div>
            </div>
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
  </section>
`

const renderSectores = () => `
  <section id="sectores" style="padding-top: 8rem; padding-bottom: 8rem;">
    <div class="container-fluid">
      <div class="sectores-header gsap-reveal" style="margin-bottom: 5rem;">
        <span class="text-caption text-muted text-uppercase" style="margin-bottom: 1rem; display: block;">${content.sections.sectores.caption}</span>
        <h2 class="text-large font-serif font-regular text-inverse" style="margin: 0; max-width: 800px;">
          ${content.sections.sectores.title}
        </h2>
      </div>
      <div class="bento-grid">
        ${content.sectores.map((sector, index) => {
          let spanCols = 1;
          let spanRows = 1;
          let minHeight = "180px";
          
          if (index === 0 || index === 5) {
            spanCols = 2; spanRows = 2; minHeight = "360px";
          } else if (index === 2 || index === 8) {
            spanCols = 2; spanRows = 1; minHeight = "180px";
          }
          
          return `
          <div class="bento-card bento-card-bg gsap-bento-item gsap-reveal" style="grid-column: span ${spanCols}; grid-row: span ${spanRows}; min-height: ${minHeight}; padding: 2rem; background-image: url('${sector.bgImage}')">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <span class="text-caption" style="color: rgba(255,255,255,0.7);">0${index + 1}</span>
            </div>
            <div>
               <h3 style="font-size: clamp(1.2rem, 2.4vw, 2.0rem); line-height: 1.1; color: #FFFFFF; font-weight: 500;">${sector.name}</h3>
            </div>
          </div>
        `}).join('')}
      </div>
    </div>
  </section>
`

const renderMapa = () => `
  <div id="red-nacional-container" class="container-fluid" style="padding-top: 4rem; padding-bottom: 4rem;">
    <section id="red-nacional" style="position: relative; padding: 60px 80px; background-color: #0A0A0A; color: #FFFFFF; border-radius: 40px; box-shadow: 0 40px 80px rgba(0,0,0,0.1); overflow: hidden; min-height: 80vh; display: flex; align-items: center;">
      
      <div style="position: absolute; right: 0%; top: 50%; transform: translateY(-50%); width: 75%; height: 130%; display: flex; justify-content: flex-end; align-items: center; z-index: 0; pointer-events: none;">
        <img id="static-map-image" src="/mapa/mapa-fondo.png" alt="" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5)); opacity: 0.1;">
      </div>

      <div class="nw-mapa-content gsap-reveal" style="position: relative; z-index: 10; padding: 10rem 4vw; display: flex; flex-direction: column; align-items: flex-end; text-align: right; pointer-events: none;">
        <span class="text-caption text-uppercase text-inverse" style="color: var(--color-highlight); margin-bottom: 1rem;">${content.mapa.mapTitle || 'COBERTURA'}</span>
        <h2 class="text-large font-serif font-regular text-inverse" style="max-width: 600px; margin-bottom: 2rem;">
          ${content.mapa.title}
        </h2>
        <p class="text-inverse opacity-80" style="font-size: 1.2rem; max-width: 400px; line-height: 1.6; margin-bottom: 3rem;">
          ${content.mapa.description || 'Una red de delegaciones y fábricas propias para garantizar cobertura nacional, agilidad local y control centralizado en cada uno de tus proyectos.'}
        </p>
        
        <div style="display: flex; gap: 3rem; background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); padding: 2rem 3rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); pointer-events: auto;">
          ${(content.mapa.stats || []).map(stat => `
          <div>
            <div style="font-size: 3rem; color: var(--color-highlight); line-height: 1; margin-bottom: 0.5rem;" class="font-serif">${stat.number}</div>
            <div class="text-caption text-inverse text-uppercase opacity-70">${stat.text || stat.label || ''}</div>
          </div>
          `).join('')}
        </div>
      </div>
    </section>
  </div>
`

const renderProceso = () => `
  <div id="proceso-container" style="background-color: var(--color-bg); padding-bottom: 20vh;">
    <section id="proceso" style="height: 100vh; overflow: hidden; display: flex; align-items: center;">
      <div class="container-fluid grid grid-cols-2 gap-6" style="width: 100%;">
        
        <div class="sticky-sidebar" style="position: relative; display: flex; flex-direction: column; justify-content: flex-start; padding-top: 0vh; padding-right: 4rem;">
          
          <div id="lottie-bar" style="position: absolute; top: 77%; left: 40%; transform: translate(-50%, -50%); width: 40%; height: 120%; z-index: 0; pointer-events: none;"></div>

          <div style="position: relative; z-index: 10;">
            <span class="text-caption">${content.sections.proceso.caption || ''}</span>
            <h2 class="text-large" style="margin-bottom: 1.5rem;">
              ${content.sections.proceso.title}
            </h2>
            <p style="margin-top: 2rem; font-size: 1.25rem; color: var(--color-text-muted); max-width: 400px; font-weight: 400;">
              ${content.sections.proceso.description}
            </p>
          </div>
        </div>
        
        <div style="position: relative; height: 70vh; overflow: hidden; mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent); -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);">
          <div class="process-list-wrapper" style="width: 100%;">
            ${content.proceso.map((paso, index) => `
              <div class="process-item-animated" style="opacity: 0.1; margin-bottom: 5rem; padding: 2rem 0;">
                <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 0.5rem;">
                  <span style="font-family: var(--font-mono); font-size: 1.5rem; color: var(--color-highlight);">${(index + 1).toString().padStart(2, '0')}</span> 
                  <h3 style="font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 600; line-height: 1; margin: 0;">${paso.title}</h3>
                </div>
                <p style="font-size: 1.25rem; color: var(--color-text-muted); margin-left: 2.5rem; max-width: 550px; line-height: 1.6;">${paso.description}</p>
                <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem; max-width: 550px; margin-left: 2.5rem;">
                  <a href="#" class="nw-link" style="font-size: 1rem; font-weight: 500; color: var(--color-text);">
                    ${content.sections.proceso.cta || 'Conocer más'}
                    <svg aria-hidden="true" viewBox="0 0 100 100" fill="currentColor" class="nw-link-icon" style="width: 1em; height: 1em; margin-left: 0.5em;"><path d="M57.40 20.30L42.50 20.30L66.50 44.30L13 44.30L13 55.10L66.50 55.10L42.50 79.10L57.40 79.10L87 49.70Z"></path></svg>
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
  <section id="contacto" style="padding: 6rem 0; background-color: var(--color-tertiary);">
    <div class="container-fluid grid grid-cols-2 gap-6">
      <div class="gsap-reveal" style="display: flex; flex-direction: column; justify-content: flex-start;">
        ${!isProject ? `<span class="text-caption">${content.sections.contacto.caption || ''}</span>` : ''}
        <h2 class="text-large" style="margin-bottom: 1.5rem;">
          ${content.sections.contacto.title}
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1.5rem; max-width: 400px;">
          ${content.sections.contacto.description}
        </p>
      </div>
      <div class="gsap-reveal">
        <form class="contact-form">
          <div class="form-group">
            <label class="form-label">${content.sections.contacto.form.nameLabel}</label>
            <input type="text" class="form-control" placeholder="${content.sections.contacto.form.namePlaceholder}" required>
          </div>
          <div class="form-group">
            <label class="form-label">${content.sections.contacto.form.companyLabel}</label>
            <input type="text" class="form-control" placeholder="${content.sections.contacto.form.companyPlaceholder}">
          </div>
          <div class="form-group">
            <label class="form-label">${content.sections.contacto.form.emailLabel}</label>
            <input type="email" class="form-control" placeholder="${content.sections.contacto.form.emailPlaceholder}" required>
          </div>
          <div class="form-group">
            <label class="form-label">${content.sections.contacto.form.telephoneLabel}</label>
            <input type="tel" class="form-control" placeholder="${content.sections.contacto.form.telephonePlaceholder}">
          </div>
          <div class="form-group" style="grid-column: 1 / -1;">
            <label class="form-label">${content.sections.contacto.form.messageLabel}</label>
            <textarea class="form-control" rows="4" placeholder="${content.sections.contacto.form.messagePlaceholder}" required style="resize: vertical; background: transparent; border: none; border-bottom: 1px solid var(--color-border); color: var(--color-text); padding: 1rem 0; width: 100%; font-family: var(--font-sans); font-size: 1.25rem; outline: none; transition: border-color 0.3s;"></textarea>
          </div>
          <div style="margin-top: 2rem;">
            <button type="submit" class="btn-regius" style="width: 100%; padding: 1.5rem; border: none; cursor: pointer;">
              <div class="btn-regius-bg"></div>
              <div class="btn-regius-text-wrapper">
                <div class="btn-regius-text _1" style="font-size: 1.25rem;">${content.sections.contacto.form.submitBtn}</div>
                <div class="btn-regius-text _2" style="font-size: 1.25rem;">${content.sections.contacto.form.submitBtn}</div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
`

const renderFooter = () => `
  <section class="footer-component" style="background: var(--color-text); color: var(--color-background); padding: 4rem 0;">
    <div class="container-fluid">
      <div style="display: flex; flex-wrap: wrap; gap: 4rem; margin-bottom: 4rem;">
        <div class="footer-col" style="flex: 2; min-width: 300px;">
            <a href="#" class="logo" style="margin-bottom: 2rem; display: block; color: var(--color-background);">${content.footer.logo}</a>
            <p style="color: rgba(255,255,255,0.6); line-height: 1.6; max-width: 300px;">
              ${content.footer.description}
            </p>
          </div>
          
          <div class="footer-col" style="flex: 1; min-width: 200px;">
            <h4 style="color: var(--color-background); margin-bottom: 1.5rem; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">${content.footer.soluciones.title}</h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.8rem;">
              ${content.footer.soluciones.links.map(link => `<li><a href="#" class="footer-link">${link}</a></li>`).join('')}
            </ul>
          </div>

          <div class="footer-col" style="flex: 1; min-width: 200px;">
            <h4 style="color: var(--color-background); margin-bottom: 1.5rem; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">${content.footer.empresa.title}</h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.8rem;">
              ${content.footer.empresa.links.map(link => `<li><a href="#" class="footer-link">${link}</a></li>`).join('')}
            </ul>
          </div>

          <div class="footer-col" style="flex: 1; min-width: 250px;">
            <h4 style="color: var(--color-background); margin-bottom: 1.5rem; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">${content.footer.contacto.title}</h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.8rem; color: rgba(255,255,255,0.6);">
              ${content.footer.contacto.info.map(info => `<li>${info}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <p style="color: rgba(255,255,255,0.5); font-size: 0.9rem;">&copy; ${new Date().getFullYear()} ${content.footer.copyright}</p>
          <div style="display: flex; gap: 1.5rem;">
            ${content.footer.legal.map(link => `<a href="#" style="color: rgba(255,255,255,0.5); font-size: 0.9rem; text-decoration: none;" class="link-hover">${link}</a>`).join('')}
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
  // Determine which project data to load based on URL or dataset
  // For now we map redeia directly
  let projectData = redeiaData; 

  document.querySelector('#app').innerHTML = `
    ${renderNavbar()}
    <main>
      ${renderProyectoTemplate(projectData)}
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
      ${renderProcesoLottie()}
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
    if (!document.querySelector('#red-nacional-container')) return;
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

  // Inicializar iconos Lottie de la nueva sección
  initProcesoLottie();

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

window.addEventListener('DOMContentLoaded', () => {
  initAnimations(); // Global animations (Lenis, Cursor, GSAP Reveals)
  if (isProyectoPage) {
    initProyectoAnimations();
  }
});
