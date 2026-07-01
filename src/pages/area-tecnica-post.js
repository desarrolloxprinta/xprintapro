import { createLayout } from '../layout.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getAreaTecnicaPostBySlug } from '../lib/supabase.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * Extrae metadatos SEO de las secciones internas del post
 * @param {Object} post - Post completo con secciones
 * @returns {Object} Metadatos estructurados
 */
function extractSEOMetadata(post) {
  // Buscar la sección de metadatos SEO
  const seoSection = post.sections.find(s =>
    s.id === 'bloque-t-cnico-seo' ||
    s.id === 'bloque-tecnico-seo' ||
    s.id === 'metadatos-internos'
  );

  let metadata = {
    title: post.title,
    description: post.intro || `Un buen proyecto de señalización combina diferentes capas. Todas deben funcionar juntas y mantener una lógica visual coherente.`,
    keywords: [],
    image: post.thumbnail || '/images/default-og-image.jpg',
    url: `https://xprintapro.com/area-tecnica?slug=${post.slug}`,
    type: 'article',
    author: post.author || 'Equipo Xprinta',
    publishedTime: post.date || new Date().toISOString(),
    modifiedTime: post.updatedAt || post.date || new Date().toISOString(),
    category: post.category || 'Área Técnica',
    slug: post.slug
  };

  // Si existe sección SEO, parsear el contenido
  if (seoSection && seoSection.content) {
    const content = seoSection.content;

    // Extraer Meta Title
    const metaTitleMatch = content.match(/Meta title:\s*([^\n]+)/i);
    if (metaTitleMatch) {
      metadata.title = metaTitleMatch[1].trim();
    }

    // Extraer Meta Description
    const metaDescMatch = content.match(/Meta description:\s*([^\n]+)/i);
    if (metaDescMatch) {
      metadata.description = metaDescMatch[1].trim();
    }

    // Extraer Keywords
    const keywordMatches = [
      content.match(/Keyword principal:\s*([^\n]+)/i),
      content.match(/Keywords secundarias:\s*([^\n]+)/i),
      content.match(/Keywords long tail:\s*([^\n]+)/i)
    ];

    keywordMatches.forEach(match => {
      if (match) {
        const keywords = match[1].split(',').map(k => k.trim());
        metadata.keywords.push(...keywords);
      }
    });
  }

  return metadata;
}

/**
 * Genera JSON-LD Schema.org para Article
 * @param {Object} post - Post completo
 * @param {Object} metadata - Metadatos extraídos
 * @returns {string} JSON-LD script tag
 */
function generateArticleSchema(post, metadata) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": metadata.title,
    "description": metadata.description,
    "image": metadata.image,
    "datePublished": metadata.publishedTime,
    "dateModified": metadata.modifiedTime,
    "author": {
      "@type": "Organization",
      "name": "Xprinta Pro",
      "url": "https://xprintapro.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://xprintapro.com/images/logo-xprinta.png"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Xprinta Pro",
      "url": "https://xprintapro.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://xprintapro.com/images/logo-xprinta.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": metadata.url
    }
  };

  if (post.audioUrl) {
    schema.audio = {
      "@type": "AudioObject",
      "contentUrl": post.audioUrl,
      "description": `Audio resumen del artículo: ${metadata.title}`
    };
  }

  if (post.heroVideo) {
    schema.video = {
      "@type": "VideoObject",
      "contentUrl": post.heroVideo,
      "thumbnailUrl": metadata.image,
      "description": `Video relacionado con: ${metadata.title}`
    };
  }

  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

/**
 * Genera JSON-LD Schema.org para BreadcrumbList
 * @param {Object} post - Post completo
 * @returns {string} JSON-LD script tag
 */
function generateBreadcrumbSchema(post) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://xprintapro.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Área Técnica",
        "item": "https://xprintapro.com/area-tecnica"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://xprintapro.com/area-tecnica?slug=${post.slug}`
      }
    ]
  };

  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

/**
 * Dinámicamente mejora el formato del contenido del artículo para diagramarlo mejor.
 * Convierte listas secuenciales (p.ej. Primero, Segundo...) en tarjetas (step-cards),
 * y los detalles de "Servicio recomendado" en un bloque de recomendación premium.
 */
function formatArticleContent(html) {
  if (!html) return '';

  let processed = html;

  // 1. Convertir listas secuenciales Primero, Segundo... en tarjetas step-card
  const stepPattern = /<p>(Primero|Segundo|Tercero|Cuarto|Quinto|Sexto|Séptimo|Octavo),\s*([^<]+)<\/p>/gi;
  if (stepPattern.test(processed)) {
    processed = processed.replace(stepPattern, (match, step, text) => {
      const parts = text.split(':');
      const title = parts[0].trim();
      const desc = parts.slice(1).join(':').trim();
      return `
        <div class="step-card">
          <div class="step-card-badge">${step}</div>
          <h4 class="step-card-title">${title}</h4>
          ${desc ? `<p class="step-card-desc">${desc}</p>` : ''}
        </div>
      `;
    });
  }

  // 2. Convertir la sección de Servicio Recomendado en un bloque de recomendación premium
  const recommendedPattern = /(Servicio recomendado|Por qué te ayudaría|Qué problema concreto soluciona|Cuándo conviene contratarlo|Qué resultado podrías esperar)/gi;
  if (recommendedPattern.test(processed)) {
    // Primero, envolvemos el título y la descripción inicial del bloque si existiera
    // Y envolvemos los items individuales de la recomendación
    processed = processed.replace(/<p>(<strong>)?(Servicio recomendado|Por qué te ayudaría|Qué problema concreto soluciona|Cuándo conviene contratarlo|Qué resultado podrías esperar[^:]*)(<\/strong>)?:?\s*([^<]+)<\/p>/gi, (match, p1, label, p2, desc) => {
      return `
        <div class="service-recommendation-item">
          <span class="service-recommendation-label">${label.replace(':', '')}</span>
          <p class="service-recommendation-desc">${desc}</p>
        </div>
      `;
    });

    // Envolver todos los service-recommendation-item adyacentes en una grid
    const itemsPattern = /((?:\s*<div class="service-recommendation-item">[\s\S]*?<\/div>)+)/gi;
    processed = processed.replace(itemsPattern, (match, items) => {
      return `
        <div class="service-recommendation-wrapper">
          <h3 class="service-recommendation-title">Servicio Recomendado</h3>
          <div class="service-recommendation-grid">
            ${items}
          </div>
        </div>
      `;
    });
  }

  return processed;
}

export async function renderAreaTecnicaPost(slug = 'senalizacion-de-parkings') {
  const post = await getAreaTecnicaPostBySlug(slug)

  if (!post) {
    return await createLayout({
      content: `
        <div class="container" style="padding-top: 150px; text-align: center;">
          <h2>Artículo no encontrado</h2>
          <a href="/" class="btn-primary" style="margin-top: 2rem; display: inline-block;">Volver al inicio</a>
        </div>
      `,
      pageClass: 'page-404'
    })
  }

  // Extraer metadatos SEO del post
  const metadata = extractSEOMetadata(post)

  // Filtrar secciones internas que no deben mostrarse (metadatos, SEO, etc.)
  const hiddenSectionIds = [
    'espacio-para-recomendar-proyecto',
    'bloque-t-cnico-seo',
    'bloque-tecnico-seo',
    'metadatos-internos',
    'seo-keywords'
  ];

  const faqStartIndex = post.sections.findIndex(s => s.id === 'preguntas-seo-geo-respondidas' || s.id === 'preguntas-seo-geo-respondidas-1');

  let regularSections = post.sections;
  let faqSections = [];

  if (faqStartIndex !== -1) {
    regularSections = post.sections.slice(0, faqStartIndex);
    faqSections = post.sections.slice(faqStartIndex + 1).filter(section =>
      !hiddenSectionIds.includes(section.id) && section.content.trim() !== ''
    );
  }

  const visibleSections = regularSections.filter(section =>
    !hiddenSectionIds.includes(section.id)
  );

  const tocHTML = [
    ...visibleSections.map(section => `
      <li class="toc-item">
        <a href="#${section.id}" class="toc-link">${section.title}</a>
      </li>
    `),
    ...(faqSections.length > 0 ? [`
      <li class="toc-item">
        <a href="#preguntas-frecuentes" class="toc-link">Preguntas frecuentes</a>
      </li>
    `] : [])
  ].join('')

  const contentHTML = visibleSections.map(section => `
    <div id="${section.id}" class="blog-section gsap-reveal">
      ${formatArticleContent(section.content)}
    </div>
  `).join('')

  const faqHTML = faqSections.length > 0 ? `
    <div id="preguntas-frecuentes" class="blog-section gsap-reveal">
      <h2 class="font-serif" style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; color: #111827; margin-bottom: 2.5rem; margin-top: 4rem;">Preguntas frecuentes</h2>
      <div class="faq-list-group">
        ${faqSections.map(item => `
          <div class="faq-list-item">
            <div style="min-width: 0; flex: 1;">
              <h3>${item.title}</h3>
            </div>
            ${item.content}
            <span class="faq-list-icon">→</span>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  const audioHTML = post.audioUrl ? `
    <div class="custom-audio-wrapper gsap-reveal" style="margin-bottom: 2.5rem;">
      <h4 class="custom-audio-invitation" style="font-family: var(--font-family-body); font-size: 0.8rem; font-weight: 700; color: var(--color-highlight, #E65000); margin: 0 0 1rem 0; text-transform: uppercase; letter-spacing: 0.15em;">
        ¿Poco tiempo? Escucha el resumen
      </h4>
      <div class="custom-audio-glass">
        <div class="custom-audio-glow"></div>
        <div class="custom-audio-inner">
          <button class="custom-audio-playbtn" id="audio-play-btn" aria-label="Reproducir resumen">
            <svg class="icon-play" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor" style="display: none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          </button>
          <div class="custom-audio-details">
            <span class="custom-audio-title">Audio Resumen</span>
            <div class="custom-audio-track" id="audio-track">
              <div class="custom-audio-progress" id="audio-progress"></div>
            </div>
            <div class="custom-audio-time">
              <span id="audio-current-time">0:00</span> / <span id="audio-duration">0:00</span>
            </div>
          </div>
        </div>
      </div>
      <audio id="blog-audio-element" src="${post.audioUrl}" preload="metadata"></audio>
    </div>
  ` : '';

  // Prioridad: Paperform embed > PDF Lead Magnet > Nada
  let leadMagnetHTML = '';

  if (post.paperformEmbedCode) {
    // Si hay código de Paperform, usar embed directo
    leadMagnetHTML = `
      <div class="paperform-embed-wrapper gsap-reveal">
        ${post.paperformEmbedCode}
      </div>
    `;
  } else if (post.pdfUrl) {
    // Fallback al lead magnet tradicional con PDF
    leadMagnetHTML = `
      <div class="lead-magnet-2026 gsap-reveal">
        <div class="lead-magnet-2026__bg-element"></div>
        <div class="lead-magnet-2026__content">
          <div class="lead-magnet-2026__header">
            <span class="lead-magnet-2026__badge">Material Exclusivo</span>
            <h3 class="lead-magnet-2026__title">Descarga el informe técnico en PDF</h3>
            <p class="lead-magnet-2026__desc">Accede a la guía detallada de este artículo con diagramas y mejores prácticas para aplicar en tu próximo proyecto.</p>
          </div>

          <form id="lead-magnet-form" class="lead-form-grid">
            <div class="lead-input-group">
              <input type="text" id="lm-name" class="lead-input" required placeholder=" ">
              <label class="lead-label" for="lm-name">Nombre y apellidos</label>
            </div>
            <div class="lead-input-group">
              <input type="text" id="lm-company" class="lead-input" required placeholder=" ">
              <label class="lead-label" for="lm-company">Empresa</label>
            </div>
            <div class="lead-input-group">
              <input type="email" id="lm-email" class="lead-input" required placeholder=" ">
              <label class="lead-label" for="lm-email">Email corporativo</label>
            </div>
            <div class="lead-input-group">
              <input type="tel" id="lm-phone" class="lead-input" required placeholder=" ">
              <label class="lead-label" for="lm-phone">Teléfono</label>
            </div>
            <button type="submit" class="lead-submit-btn">
              <span>Obtener Informe PDF</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </form>

          <div id="lead-magnet-success" class="lead-success-state">
            <div class="lead-success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h4 class="lead-success-title">¡Todo listo!</h4>
            <a href="${post.pdfUrl}" target="_blank" class="lead-download-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Abrir PDF Ahora
            </a>
          </div>
        </div>
      </div>
    `;
  }

  const summaryVideoHTML = post.heroVideo ? `
    <div class="summary-video-thumbnail-wrapper gsap-reveal" style="position: relative; cursor: pointer; border-radius: 12px; overflow: hidden; margin-top: 2rem; aspect-ratio: 16/9; background-color: #000; box-shadow: 0 10px 30px rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.05);">
      <img src="${post.thumbnail || '/area tecnica/thumb-parking.jpeg'}" alt="Video Resumen" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
      <div class="video-play-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); transition: background 0.3s;">
        <div class="video-play-button" style="width: 54px; height: 54px; border-radius: 50%; background: var(--color-highlight); display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 15px rgba(230, 80, 0, 0.4); transition: transform 0.3s;">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"/></svg>
        </div>
      </div>
      <span style="position: absolute; bottom: 0.75rem; left: 0.75rem; color: white; font-weight: 600; font-size: 0.85rem; text-shadow: 0 2px 4px rgba(0,0,0,0.8); display: flex; align-items: center; gap: 0.35rem; font-family: var(--font-family-body);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
        Ver vídeo resumen
      </span>
    </div>
  ` : '';

  const layoutHTML = `
    <main>
      <div class="nav-spacer"></div>

      <!-- Hero Header Section (Project Hero Redesign) -->
      <section class="project-hero" style="width: 100%; min-height: 80vh; padding-top: 18vh; padding-bottom: 5vh; background-color: var(--color-background); display: flex; flex-direction: column; align-items: center; justify-content: flex-start; overflow: hidden;">
        <div class="hero-text-container" style="text-align: center; z-index: 2; position: relative; padding: 0 5vw; margin-bottom: 5vh; width: 100%;">
          <span class="blog_category-badge" style="font-family: var(--font-family-body); font-size: 0.85rem; font-weight: 700; color: var(--color-highlight); text-transform: uppercase; letter-spacing: 0.15em; display: inline-block; margin-bottom: 1.5rem;">
            ${post.category || 'INFORME TÉCNICO'} &mdash; POR ${post.author || 'EQUIPO XPRINTA'}
          </span>
          <h1 class="hero-title text-large font-serif font-regular text-primary" style="font-size: clamp(2.5rem, 3.5vw, 4.5rem); margin-bottom: 2rem; max-width: 1200px; margin-left: auto; margin-right: auto; line-height: 1.1; font-weight: 500;">
            ${post.title}
          </h1>
          <p style="font-size: 1.15rem; color: var(--color-text-muted); max-width: 800px; margin: 0 auto; line-height: 1.6; font-family: var(--font-family-body);">
            ${post.intro || "Un buen proyecto de señalización combina diferentes capas. Todas deben funcionar juntas y mantener una lógica visual coherente."}
          </p>
        </div>

        <div class="hero-media-wrapper" style="width: 95vw; height: 60vh; position: relative; z-index: 1; overflow: hidden; border-radius: 30px; background-color: #000; box-shadow: 0 20px 50px rgba(0,0,0,0.15);">
          <img class="hero-media" src="${post.thumbnail || '/area tecnica/thumb-parking.jpeg'}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
      </section>

      <!-- Content Section -->
      <section class="blog-content-section" style="padding-top: 6rem;">
        <div class="padding-global">
          <div class="blog-content_component">
            
            <!-- Sidebar Left: Audio Resumen + Video Resumen (Span 3) -->
            <div class="blog-content_content-left">
              ${audioHTML}
              ${summaryVideoHTML}
            </div>

            <!-- Main Content Area (Span 6) -->
            <div class="blog-content_content">
              <article class="blog-main-content">
                ${contentHTML}
                ${faqHTML}
                ${leadMagnetHTML}
              </article>
            </div>

            <!-- Sidebar Right: Table of Contents (Span 3) -->
            <div class="blog-content_content-right">
              <div class="post-content_sidebar-content">
                <h4 class="toc-title">Índice de contenidos</h4>
                <div class="post-content_link-content">
                  <div class="post-content_progress"></div>
                  <ul class="toc-list">
                    ${tocHTML}
                  </ul>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <!-- Modal del reproductor de video (Pop-Up) -->
      <div id="video-popup-modal" class="cookie-modal" style="display: none;">
        <div class="cookie-modal-backdrop" id="video-popup-backdrop" style="background-color: rgba(0,0,0,0.92); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);"></div>
        <div class="cookie-modal-content" style="max-width: 960px; width: 90vw; padding: 0; background: transparent; border: none; box-shadow: none; overflow: visible;">
          <button id="video-popup-close" style="position: absolute; top: -3.5rem; right: 0; background: transparent; border: none; color: white; font-size: 1.25rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; z-index: 100;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            Cerrar
          </button>
          <div style="width: 100%; aspect-ratio: 16/9; border-radius: 16px; overflow: hidden; background: #000; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 25px 60px rgba(0,0,0,0.8);">
            <video id="popup-video-element" controls style="width: 100%; height: 100%; object-fit: contain;"></video>
          </div>
        </div>
      </div>
    </main>
  `

  return await createLayout({
    content: layoutHTML,
    pageClass: 'page-area-tecnica',
    metadata: {
      title: metadata.title,
      description: metadata.description,
      keywords: metadata.keywords.join(', '),
      image: metadata.image,
      url: metadata.url,
      type: metadata.type,
      author: metadata.author,
      publishedTime: metadata.publishedTime,
      modifiedTime: metadata.modifiedTime,
      schemas: [
        generateArticleSchema(post, metadata),
        generateBreadcrumbSchema(post)
      ]
    }
  })
}

export function initAreaTecnicaPostAnimations() {
  setTimeout(() => {
    // 0. Inicializar Paperform si existe el embed
    const paperformDiv = document.querySelector('[data-paperform-id]');
    if (paperformDiv) {
      console.log('✅ Paperform embed detectado, inicializando...');
      // Cargar script de Paperform dinámicamente
      if (!window.Paperform && !document.querySelector('script[src*="paperform.co"]')) {
        const script = document.createElement('script');
        script.src = "https://paperform.co/__embed.min.js";
        script.async = true;
        document.body.appendChild(script);
        console.log('✅ Paperform script cargado');
      }
    }

    // Scroll indicator fade-out on scroll
    const scrollIndicator = document.querySelector('.at-scroll-indicator');
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: scrollIndicator,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: true
        }
      });
    }

    // 1. Reveal Animations
    const revealElements = document.querySelectorAll('.gsap-reveal')
    revealElements.forEach((el, index) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    // 2. Interactive TOC Logic
    const sections = document.querySelectorAll('.blog-section')
    const navLinks = document.querySelectorAll('.toc-link')
    const progressLine = document.querySelector('.post-content_progress')
    const tocContainer = document.querySelector('.post-content_link-content')

    if (tocContainer && progressLine) {
      const setProgressHeight = gsap.quickTo(progressLine, "height", { duration: 0.3, ease: "power2.out" })

      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: self => {
            if (self.isActive) {
              navLinks.forEach(link => link.classList.remove('w--current'))
              
              const currentLink = navLinks[i]
              if (currentLink) {
                currentLink.classList.add('w--current')
                const containerRect = tocContainer.getBoundingClientRect()
                const linkRect = currentLink.getBoundingClientRect()
                const targetHeight = (linkRect.top - containerRect.top) + (linkRect.height / 2)
                setProgressHeight(targetHeight)
              }
            }
          }
        })
      })
      
      // Smooth scroll
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          const targetId = link.getAttribute('href')
          const targetSection = document.querySelector(targetId)
          if (targetSection) {
            window.scrollTo({ top: targetSection.offsetTop - 100, behavior: 'smooth' })
          }
        })
      })
    }

    // 3. Custom Audio Player Logic
    const audioEl = document.getElementById('blog-audio-element')
    const playBtn = document.getElementById('audio-play-btn')
    const progressBar = document.getElementById('audio-progress')
    const track = document.getElementById('audio-track')
    const currentTimeEl = document.getElementById('audio-current-time')
    const durationEl = document.getElementById('audio-duration')
    
    if (audioEl && playBtn) {
      const iconPlay = playBtn.querySelector('.icon-play')
      const iconPause = playBtn.querySelector('.icon-pause')

      const formatTime = (time) => {
        if (isNaN(time)) return '0:00'
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
      }

      audioEl.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audioEl.duration)
      })

      playBtn.addEventListener('click', () => {
        if (audioEl.paused) {
          audioEl.play()
          iconPlay.style.display = 'none'
          iconPause.style.display = 'block'
        } else {
          audioEl.pause()
          iconPlay.style.display = 'block'
          iconPause.style.display = 'none'
        }
      })

      audioEl.addEventListener('timeupdate', () => {
        const progress = (audioEl.currentTime / audioEl.duration) * 100
        progressBar.style.width = `${progress}%`
        currentTimeEl.textContent = formatTime(audioEl.currentTime)
      })

      track.addEventListener('click', (e) => {
        const rect = track.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const percent = clickX / rect.width
        audioEl.currentTime = percent * audioEl.duration
      })
      
      audioEl.addEventListener('ended', () => {
        iconPlay.style.display = 'block'
        iconPause.style.display = 'none'
        progressBar.style.width = '0%'
      })
    }

    // 4. Formulario Lead Magnet Logic
    const leadForm = document.getElementById('lead-magnet-form')
    const successMsg = document.getElementById('lead-magnet-success')
    const formContainer = document.querySelector('.lead-magnet-2026__content')
    
    if (leadForm && successMsg) {
      leadForm.addEventListener('submit', (e) => {
        e.preventDefault()
        
        const tl = gsap.timeline()
        tl.to(leadForm, { opacity: 0, y: -20, duration: 0.4 })
          .set(leadForm, { display: 'none' })
          .set(successMsg, { display: 'flex' })
          .fromTo(successMsg, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" })
      })
    }

    // 5. Video Summary Popup Player Logic
    const videoCard = document.querySelector('.summary-video-thumbnail-wrapper')
    const videoModal = document.getElementById('video-popup-modal')
    const popupVideo = document.getElementById('popup-video-element')
    const videoClose = document.getElementById('video-popup-close')
    const videoBackdrop = document.getElementById('video-popup-backdrop')

    if (videoCard && videoModal && popupVideo) {
      videoCard.addEventListener('click', () => {
        // Encontrar la url del video (por si no se renderiza en línea)
        const videoSrc = videoCard.closest('main')?.querySelector('.blog-main-content')?.dataset?.heroVideo || '';
        popupVideo.src = "${post.heroVideo || ''}";
        videoModal.style.display = 'flex';
        popupVideo.play();
      })

      const closeVideoModal = () => {
        popupVideo.pause();
        popupVideo.src = '';
        videoModal.style.display = 'none';
      }

      if (videoClose) videoClose.addEventListener('click', closeVideoModal)
      if (videoBackdrop) videoBackdrop.addEventListener('click', closeVideoModal)
    }

    ScrollTrigger.refresh()
  }, 100)
}
