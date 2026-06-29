/**
 * Pagina Nosotros - Xprinta Pro
 * Proyectos dinámicos desde Supabase con thumbnail + video hover
 * @module pages/nosotros
 */

import { createLayout } from '../layout.js'
import { getProjects } from '../lib/supabase.js'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Extrae items de proyecto con su thumbnail y video
 * Soporta campos Supabase (hero_image, hero_video) y JSON fallback (hero.image, hero.video)
 */
function getProjectCards(projects) {
  if (!projects || projects.length === 0) return [];

  return projects.map(p => {
    // Thumbnail: hero_image (Supabase) || hero.image (JSON) || primera gallery
    const heroImage = p.hero_image || (p.hero && p.hero.image);
    const firstGallery = p.gallery && p.gallery.length > 0 ? p.gallery[0].image : null;
    const image = heroImage || firstGallery;

    // Video: hero_video (Supabase) || hero.video (JSON)
    const video = p.hero_video || (p.hero && p.hero.video) || null;

    // Titulo y slug
    const title = p.title || '';
    const slug = p.slug || p.id || '';
    const category = p.category || p.sector || '';
    const clientName = p.client?.name || p.client_name || '';

    return { image, video, title, slug, category, clientName };
  }).filter(item => item.image || item.video); // Solo items con al menos imagen o video
}

/**
 * Inicializa animaciones y video hover
 */
function initAnimations() {
  // HERO: blur + translateX alternando por linea
  const heroLines = document.querySelectorAll('.nw-hero-line');
  heroLines.forEach((line, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    gsap.fromTo(line,
      { opacity: 0, filter: 'blur(8px)', x: `${16 * dir}%` },
      { opacity: 1, filter: 'blur(0px)', x: '0%', duration: 1.4, ease: 'power3.out', delay: 0.1 * i }
    );
    gsap.to(line, {
      opacity: 0, filter: 'blur(8px)', x: `${20 * dir}%`,
      scrollTrigger: { trigger: '.nw-hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  });

  // MANIFESTO: fade in
  const manifestoPs = document.querySelectorAll('.nw-manifesto p');
  if (manifestoPs.length) {
    gsap.fromTo(manifestoPs,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.nw-manifesto', start: 'top 80%' }
      }
    );
  }

  // PROJECT CARDS: stagger reveal
  const projectCards = document.querySelectorAll('.nw-project-card');
  if (projectCards.length) {
    gsap.fromTo(projectCards,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.nw-projects-section', start: 'top 85%' }
      }
    );
  }

  // VIDEO HOVER: play on mouseenter, pause on mouseleave
  const videoWrappers = document.querySelectorAll('.nw-project-media');
  videoWrappers.forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const poster = wrapper.querySelector('.nw-project-poster');
    if (!video) return;

    wrapper.addEventListener('mouseenter', () => {
      video.play().catch(e => console.warn('Autoplay prevented:', e));
      if (poster) poster.style.opacity = '0';
    });
    wrapper.addEventListener('mouseleave', () => {
      video.pause();
      if (poster) poster.style.opacity = '1';
    });
  });

  // CAPABILITIES: reveal
  const capItems = document.querySelectorAll('.nw-capability-item');
  if (capItems.length) {
    gsap.fromTo(capItems,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.nw-capabilities', start: 'top 85%' }
      }
    );
  }
}

/**
 * Render principal
 */
export async function renderNosotros() {
  const projects = await getProjects();
  const projectCards = getProjectCards(projects);

  console.log('Nosotros - Proyectos:', projects?.length, 'Cards:', projectCards.length);

  // Render project cards dinámicamente
  const projectsHTML = projectCards.length > 0 ? `
    <section class="nw-projects-section">
      <h2 class="nw-projects-title">Nuestros proyectos</h2>
      <div class="nw-projects-grid">
        ${projectCards.map(card => `
          <a href="/proyecto-${card.slug}.html" class="nw-project-card">
            <div class="nw-project-media">
              ${card.video ? `
                <video class="nw-project-video" loop muted playsinline preload="none">
                  <source src="${card.video}" type="video/mp4">
                </video>
              ` : ''}
              ${card.image ? `
                <img src="${card.image}" alt="${card.title}" class="nw-project-poster" loading="lazy">
              ` : ''}
            </div>
            <div class="nw-project-info">
              <span class="nw-project-category">${card.category}</span>
              <h3 class="nw-project-name">${card.clientName || card.title}</h3>
            </div>
          </a>
        `).join('')}
      </div>
    </section>
  ` : '';

  // Contenido real de historia.txt
  const layoutHTML = `
    <main class="page-nosotros-nw flex-1">

      <section class="nw-hero">
        <h1 class="nw-hero-title">
          <span class="nw-hero-line">De la rotulación tradicional</span>
          <span class="nw-hero-line">a la gestión integral de la</span>
          <span class="nw-hero-line">imagen de marca</span>
        </h1>
      </section>

      <section class="nw-manifesto">
        <div class="nw-manifesto-inner">
          <div class="nw-manifesto-content">
            <p>Xprinta nace dentro del sector de la rotulación y la comunicación visual con una idea clara: ayudar a las empresas a <span class="highlight">hacer visible su marca en el espacio físico</span>.</p>

            <p>Durante más de 20 años hemos trabajado en la implantación de imagen corporativa en puntos de venta, locales comerciales, oficinas, redes de franquicia y espacios donde la <span class="highlight">presencia visual de una marca tiene un impacto directo en la percepción del cliente</span>.</p>

            <p>Con el tiempo, el sector ha cambiado. Las marcas ya no necesitan únicamente fabricar un rótulo, colocar un vinilo o instalar una señal. Necesitan <span class="highlight">controlar cómo se aplica su identidad en diferentes ubicaciones</span>, asegurar que cada elemento responde al manual de marca, reducir errores, cumplir normativas, optimizar costes y disponer de información actualizada sobre cada proyecto.</p>

            <p>Hemos pasado de fabricar elementos de comunicación visual a <span class="highlight">gestionar proyectos completos de imagen física de marca</span>. Eso implica coordinar diseño, medición, producción, instalación, legalización, seguimiento y mantenimiento con una visión global.</p>

            <p>Hoy trabajamos con una estructura preparada para dar servicio a marcas con redes de puntos de venta distribuidas en España y Portugal, combinando capacidad productiva, profesionales cualificados y herramientas tecnológicas de seguimiento.</p>

            <p>Nuestra visión actual es clara: <span class="highlight">conectar la imagen física de marca con procesos digitales</span> que permitan <span class="highlight">mejorar la trazabilidad</span>, controlar el avance de cada proyecto, documentar cada instalación y <span class="highlight">convertir el punto de venta en un espacio coherente</span> también desde el punto de vista comunicativo.</p>
          </div>
        </div>
      </section>

      ${projectsHTML}

      <section class="nw-capabilities">
        <h2 class="nw-capabilities-title">Lo que hacemos mejor.</h2>
        <div class="nw-capabilities-grid">
          <div class="nw-capability-item">
            <h3>+20 años de experiencia</h3>
            <p>Implantación de imagen corporativa en puntos de venta, locales comerciales, oficinas y redes de franquicia a nivel nacional.</p>
          </div>
          <div class="nw-capability-item">
            <h3>Gestión integral</h3>
            <p>Coordinamos diseño, medición, producción, instalación, legalización, seguimiento y mantenimiento con visión global.</p>
          </div>
          <div class="nw-capability-item">
            <h3>Cobertura nacional</h3>
            <p>Servicio a marcas con redes distribuidas en España y Portugal, combinando capacidad productiva y herramientas tecnológicas.</p>
          </div>
          <div class="nw-capability-item">
            <h3>Visión digital</h3>
            <p>Conectamos la imagen física de marca con procesos digitales para mejorar trazabilidad y documentar cada instalación.</p>
          </div>
        </div>
      </section>

    </main>
  `;

  return createLayout({
    content: layoutHTML,
    pageClass: 'page-nosotros'
  });
}

/**
 * Inicializa las animaciones de la página Nosotros
 * Debe llamarse DESPUÉS de que el HTML esté insertado en el DOM
 */
export function initNosotrosAnimations() {
  setTimeout(() => {
    initAnimations();
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, 300);
}
