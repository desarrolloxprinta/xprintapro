import { createLayout } from '../layout.js'
import { getSectorBySlug, getProjectsBySector } from '../lib/supabase.js'
import { gsap } from 'gsap'

import '../styles/sector-detail.css'

export async function getSectorDetailHTML(slug = 'industria') {
  const sector = await getSectorBySlug(slug);
  
  if (!sector) {
    return await createLayout({
      content: `
        <div class="container" style="padding-top: 150px; text-align: center;">
          <h2>Sector no encontrado</h2>
          <a href="/" class="btn-primary" style="margin-top: 2rem; display: inline-block;">Volver al inicio</a>
        </div>
      `,
      pageClass: 'page-404'
    });
  }

  const projects = await getProjectsBySector(slug);

  // Renderizar las 2 capacidades para la rejilla inferior de la Fila 2 (Hero)
  const capabilities = sector.capabilities || [];
  const cap1 = capabilities[0] || { title: "Rotulación de Fachadas", description: "Rótulos de gran formato para naves." };
  const cap2 = capabilities[1] || { title: "Señalética Vial", description: "Marcación y seguridad industrial." };

  const capCard1HTML = `
    <div class="features-card about-a-feature gsap-reveal">
      <div class="icon-wrap-feature-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="16"></line><line x1="15" y1="22" x2="15" y2="16"></line></svg>
      </div>
      <div class="about-card-text-wrap">
        <h4>${cap1.title}</h4>
        <p class="text-dark-64">${cap1.description}</p>
      </div>
    </div>
  `;

  const capCard2HTML = `
    <div class="features-card about-a-feature gsap-reveal">
      <div class="icon-wrap-feature-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      </div>
      <div class="about-card-text-wrap">
        <h4>${cap2.title}</h4>
        <p class="text-dark-64">${cap2.description}</p>
      </div>
    </div>
  `;

  // Renderizar proyectos asociados en la sección STICKY (Section 2)
  const projectsHTML = projects.map(proj => {
    // Si no tiene imagen del hero_image en base de datos, usamos un fallback inteligente
    const thumbnail = proj.heroImage || `/proyectos/${proj.slug}/${proj.slug}-rotulo-animado.mp4`; // fallback si no se tiene imagen estática
    const hasVideo = !!proj.heroVideo;
    const mediaHTML = hasVideo
      ? `<video src="${proj.heroVideo}" poster="${proj.heroImage || '/placeholder.png'}" class="nw-project-video" autoplay loop muted playsinline></video>`
      : `<img src="${proj.heroImage || '/placeholder.png'}" alt="${proj.clientName || proj.title}" />`;

    return `
      <a href="/proyecto-${proj.slug}.html" class="features-card large gsap-reveal" data-cursor="nw-view">
        <div class="project-video-wrapper">
          ${mediaHTML}
        </div>
        <span class="text-caption-badge" style="border-color: var(--color-highlight); color: var(--color-highlight);">${proj.clientName || 'Caso de Éxito'}</span>
        <h3>${proj.title}</h3>
        <p class="text-dark-64">${proj.shortDescription || ''}</p>
        <div class="card-action">
          Ver caso de estudio
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </a>
    `;
  }).join('');

  // Imagenes generadas especificas de empresa de rotulos en el sector industria
  const heroLargeImage = '/sectores/sector_industria_hero_large.png';
  const heroSmallImage = '/sectores/sector_industria_hero_small.png';
  const benefitsImage = '/sectores/sector_industria_benefits.png';

  // Contenido de la sección de Highlights (Section 3 - Dark Theme)
  const highlight = sector.highlights || {
    label: "COBERTURA NACIONAL",
    title: "Un Solo Proveedor para Todas tus Plantas",
    image: heroSmallImage,
    description: "Con nuestra red de fábricas y talleres cubrimos cualquier polígono industrial de España. Sincronizamos la implantación de marca en múltiples ubicaciones con un único interlocutor."
  };

  const layoutHTML = `
    <main class="page-sector-detail">
      <div class="nav-spacer"></div>

      <!-- 1. HERO SECTION (.hero-about-b) -->
      <section class="section hero-about-b">
        <div class="container-fluid">
          
          <!-- Headline Group -->
          <div class="headline-about-b gsap-reveal">
            <div class="text-caption-badge" style="border-color: var(--color-highlight); color: var(--color-highlight);">${sector.title}</div>
            <h1 class="heading-jumbo">${sector.hero_title || sector.title}</h1>
          </div>

          <!-- Vertical Content block (.about-b-content) -->
          <div class="about-b-content">
            
            <!-- Row 1: Left Text, Right Large Image -->
            <div class="about-b-halves">
              <div class="about-b-left gsap-reveal">
                <div class="about-b-left-inner">
                  <p class="text-dark-64">${sector.intro || ''}</p>
                </div>
              </div>
              <div class="about-b-right gsap-reveal">
                <div class="about-b-image _1">
                  <img class="image-cover parallax" src="${heroLargeImage}" alt="Instalación de rótulo industrial de gran formato" />
                </div>
              </div>
            </div>

            <!-- Row 2: Left Small Image, Right sub-headline & features -->
            <div class="about-b-halves">
              <div class="about-b-left gsap-reveal">
                <div class="about-b-image _2">
                  <img class="image-cover parallax" src="${heroSmallImage}" alt="Soldadura y fabricación de letras corpóreas gigantes" />
                </div>
              </div>
              <div class="about-b-right">
                <div class="text-h4-regius gsap-reveal">
                  Diseñamos estructuras de alta resistencia calculadas para soportar fatiga al viento y condiciones climatológicas extremas.
                </div>
                <div class="about-b-feature-halves">
                  ${capCard1HTML}
                  ${capCard2HTML}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- 2. SECTION 2 (servicios-2) - STICKY SPLIT LAYOUT -->
      <section class="servicios-2">
        <div class="container-fluid">
          <div class="home-c-feature-halves">
            
            <div class="headline-home-c-features">
              <span class="text-caption-badge gsap-reveal" style="border-color: var(--color-highlight); color: var(--color-highlight);">Casos de Éxito</span>
              <h2 class="heading-jumbo gsap-reveal">Nuestra Experiencia Real en el Sector</h2>
              <p class="text-dark-64 gsap-reveal">
                Explora cómo hemos ayudado a empresas líderes de este sector a unificar su identidad de marca y optimizar la señalética de sus naves e instalaciones industriales.
              </p>
            </div>
            
            <div class="home-c-feature-list">
              ${projectsHTML.length > 0 ? projectsHTML : `
                <div class="features-card">
                  <p class="text-dark-64">Próximamente añadiremos proyectos a este sector.</p>
                </div>
              `}
            </div>

          </div>
        </div>
      </section>

      <!-- 3. SECTION 3 (home-a-momentum-section) - DARK THEME -->
      <section class="home-a-momentum-section">
        <div class="container-fluid">
          <div class="cta-halves">
            
            <div class="cta-block-image gsap-reveal">
              <img src="${heroLargeImage}" alt="Monolitos y tótems industriales instalados" />
            </div>
            
            <div class="cta-block-right">
              <span class="text-caption-badge inverted gsap-reveal" style="border-color: var(--color-highlight); color: var(--color-highlight);">${highlight.label}</span>
              <h2 class="heading-jumbo inverted gsap-reveal">${highlight.title}</h2>
              
              <div class="features-card about-a-feature inverted gsap-reveal" style="margin-bottom: 2rem;">
                <h4>Logística Integrada</h4>
                <p class="text-light-64">${highlight.description}</p>
              </div>

              <div class="features-card about-a-feature inverted gsap-reveal">
                <h4>Garantía Única</h4>
                <p class="text-light-64">Mantén la misma tarifa, plazos de entrega y calidad de instalación en todas tus sedes a nivel nacional con un único interlocutor.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 4. SECTION 4 (about-b-benefits-section) -->
      <section class="about-b-benefits-section">
        <div class="container-fluid">
          <div class="about-a-benefit-halves">
            
            <div class="about-a-benefit-left gsap-reveal">
              <span class="text-caption-badge" style="border-color: var(--color-highlight); color: var(--color-highlight);">Compromiso</span>
              <h2 class="heading-jumbo">Diseñado para durar en entornos exigentes</h2>
            </div>
            
            <div class="about-a-benefit-right gsap-reveal">
              <div class="benefits-image">
                <img src="${benefitsImage}" alt="Totem directorio minimalista para parque empresarial" />
              </div>
              <p class="text-large">
                Nuestras soluciones de señalización exterior utilizan materiales con tratamientos anticorrosivos, iluminación LED IP67 de alta eficiencia y sistemas de anclaje de máxima seguridad certificados por ingenieros de edificación.
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- 5. FOOTER / CONTACT CTA -->
      <section class="footer-cta-wrapper">
        <div class="container-fluid">
          <div class="footer-cta-inner gsap-reveal">
            <h2 class="footer-cta-title">¿Hablamos de tu próximo proyecto?</h2>
            <a href="/index.html#contacto" class="cta-button-regius">Contactar con nosotros</a>
          </div>
        </div>
      </section>

    </main>
  `;

  return await createLayout({
    content: layoutHTML,
    pageClass: 'page-sector'
  });
}

export function initSectorDetailAnimations() {
  // Animaciones de revelado con ScrollTrigger
  const revealElements = document.querySelectorAll('.page-sector-detail .gsap-reveal');
  revealElements.forEach((el, index) => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  });

  // Parallax en imágenes de Row 1 y Row 2 del Hero
  const parallaxImages = document.querySelectorAll('.image-cover.parallax');
  parallaxImages.forEach(img => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: -50,
      ease: 'none'
    });
  });

  // Activar videos de proyectos on hover
  const projectCards = document.querySelectorAll('.features-card.large');
  projectCards.forEach(card => {
    const video = card.querySelector('.nw-project-video');
    if (video) {
      card.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        video.play().catch(e => {});
      });
      card.addEventListener('mouseleave', () => {
        video.pause();
      });
    }
  });
}
