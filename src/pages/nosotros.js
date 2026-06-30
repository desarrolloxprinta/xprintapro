/**
 * Pagina Nosotros - Estilo Noteworthy adaptado a Xprinta
 * @module pages/nosotros
 */

import { createLayout } from '../layout.js'
import { getProjects } from '../lib/supabase.js'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Extrae items de proyectos (imágenes + videos) para el ticker
 * Estructura Noteworthy: cada card tiene imagen (thumbnail) + video (hover)
 */
function getProjectItems(projects) {
  const items = [];
  if (!projects || projects.length === 0) return items;

  for (const p of projects) {
    // Estrategia: usar hero_image como thumbnail y hero_video para hover
    const heroImage = p.hero_image || (p.hero && p.hero.image);
    const heroVideo = p.hero_video || (p.hero && p.hero.video);

    if (heroImage) {
      items.push({
        image: heroImage,
        video: heroVideo || null, // Video opcional
        title: p.title || 'Proyecto',
        slug: p.slug,
        client: p.client
      });
    }

    // También incluir items de la galería
    if (p.gallery && Array.isArray(p.gallery)) {
      for (const g of p.gallery) {
        if (g.image) {
          items.push({
            image: g.image,
            video: g.video || null,
            title: g.alt || p.title || 'Proyecto',
            slug: p.slug,
            client: p.client
          });
        }
      }
    }
  }

  return items;
}

/**
 * Inicializa los efectos de hover de video
 */
function initVideoHover() {
  const videoWrappers = document.querySelectorAll('.nw-ticker-video-wrapper');

  videoWrappers.forEach(wrapper => {
    const video = wrapper.querySelector('.nw-ticker-video');
    const poster = wrapper.querySelector('.nw-ticker-poster');

    if (!video || !poster) return;

    wrapper.addEventListener('mouseenter', () => {
      video.play().catch(err => console.log('Video play error:', err));
      poster.style.opacity = '0';
    });

    wrapper.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
      poster.style.opacity = '1';
    });
  });
}

/**
 * Inicializa las animaciones
 */
function initAnimations() {
  // 1. HERO: blur + translateX alternando por linea (solo entrada, sin fade-out)
  const heroLines = document.querySelectorAll('.nw-hero-line');
  heroLines.forEach((line, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    gsap.fromTo(line,
      { opacity: 0, filter: 'blur(8px)', x: `${16 * dir}%` },
      { opacity: 1, filter: 'blur(0px)', x: '0%', duration: 1.4, ease: 'power3.out', delay: 0.1 * i }
    );
    // Eliminado: fade-out al hacer scroll para que el hero permanezca visible
  });

  // 2. TICKER: scroll horizontal proporcional al scroll vertical
  const topRow = document.querySelector('.nw-ticker-list.row-top');
  // const bottomRow = document.querySelector('.nw-ticker-list.row-bottom'); // Comentado: solo una fila actualmente

  if (topRow && topRow.children.length > 0) {
    const topWidth = topRow.scrollWidth;

    // Desplazar 75% del ancho (ya que duplicamos 4 veces)
    gsap.to(topRow, {
      x: () => -(topWidth * 0.75),
      ease: 'none',
      scrollTrigger: {
        trigger: '.nw-ticker-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
  }

  /* SEGUNDA FILA: Comentada hasta tener más proyectos
     Descomentar cuando haya 10+ proyectos para efecto paralaje de dos filas

  if (bottomRow && bottomRow.children.length > 0) {
    const bottomWidth = bottomRow.scrollWidth;

    // Empezar desde -75% y llegar a 0 (dirección opuesta)
    gsap.fromTo(bottomRow,
      { x: () => -(bottomWidth * 0.75) },
      {
        x: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.nw-ticker-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true
        }
      }
    );
  }
  */

  // 3. MANIFESTO: fade in
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
}

/**
 * Render principal
 */
export async function renderNosotros() {
  const projects = await getProjects();
  let projectItems = getProjectItems(projects);

  console.log('Nosotros - Proyectos cargados:', projects?.length, 'Items extraidos:', projectItems.length);

  // Si no hay proyectos, crear items de prueba
  if (projectItems.length === 0) {
    console.warn('⚠️ No hay proyectos, usando placeholders');
    projectItems = [
      { image: 'https://picsum.photos/800/600?random=1', video: null, title: 'Proyecto 1', slug: 'p1' },
      { image: 'https://picsum.photos/800/800?random=2', video: null, title: 'Proyecto 2', slug: 'p2' },
      { image: 'https://picsum.photos/600/800?random=3', video: null, title: 'Proyecto 3', slug: 'p3' },
      { image: 'https://picsum.photos/800/600?random=4', video: null, title: 'Proyecto 4', slug: 'p4' },
      { image: 'https://picsum.photos/800/800?random=5', video: null, title: 'Proyecto 5', slug: 'p5' },
      { image: 'https://picsum.photos/600/800?random=6', video: null, title: 'Proyecto 6', slug: 'p6' }
    ];
  }

  // Config del ticker (aspect ratios y widths estilo Noteworthy)
  const topRowConfig = [
    { ar: 'nw-ar-3-2', w: 'nw-w-40' },
    { ar: 'nw-ar-square', w: 'nw-w-35' },
    { ar: 'nw-ar-3-4', w: 'nw-w-34' },
    { ar: 'nw-ar-square', w: 'nw-w-36' },
    { ar: 'nw-ar-square', w: 'nw-w-36' },
    { ar: 'nw-ar-2-3', w: 'nw-w-33' }
  ];

  const bottomRowConfig = [
    { ar: 'nw-ar-4-3', w: 'nw-w-40' },
    { ar: 'nw-ar-square', w: 'nw-w-40' },
    { ar: 'nw-ar-3-2', w: 'nw-w-40' },
    { ar: 'nw-ar-2-1', w: 'nw-w-40' },
    { ar: 'nw-ar-square', w: 'nw-w-30' }
  ];

  const renderItem = (itemIndex, config) => {
    if (projectItems.length === 0) return '';
    const item = projectItems[itemIndex % projectItems.length];

    // Si tiene video, usar estructura con video hover como Noteworthy
    if (item.video) {
      return `
        <li class="nw-ticker-item">
          <div class="nw-ticker-video-wrapper ${config.ar} ${config.w}">
            <video class="nw-ticker-video" loop muted playsinline preload="none">
              <source src="${item.video}" type="video/mp4">
            </video>
            <img src="${item.image}" alt="${item.title}" class="nw-ticker-poster" loading="lazy">
          </div>
        </li>
      `;
    }

    // Solo imagen (sin video)
    return `
      <li class="nw-ticker-item">
        <img src="${item.image}" alt="${item.title}" class="nw-ticker-img ${config.ar} ${config.w}" loading="lazy">
      </li>
    `;
  };

  const hasProjects = projectItems.length > 0;

  // Duplicar items 4 veces para efecto loop infinito con suficiente contenido
  const topRowHTML = hasProjects
    ? topRowConfig.map((cfg, i) => renderItem(i, cfg)).join('') +
      topRowConfig.map((cfg, i) => renderItem(i, cfg)).join('') +
      topRowConfig.map((cfg, i) => renderItem(i, cfg)).join('') +
      topRowConfig.map((cfg, i) => renderItem(i, cfg)).join('')
    : '';

  // SEGUNDA FILA: Comentada actualmente (solo una fila visible)
  // Para reactivar cuando haya 10+ proyectos:
  // 1. Descomentar bottomRowHTML aquí
  // 2. Descomentar el div .nw-ticker-row de row-bottom en tickerHTML (líneas 242-247)
  // 3. Descomentar la animación GSAP de bottomRow en initAnimations() (líneas 115-132)
  const bottomRowHTML = hasProjects
    ? bottomRowConfig.map((cfg, i) => renderItem(i + topRowConfig.length, cfg)).join('') +
      bottomRowConfig.map((cfg, i) => renderItem(i + topRowConfig.length, cfg)).join('') +
      bottomRowConfig.map((cfg, i) => renderItem(i + topRowConfig.length, cfg)).join('') +
      bottomRowConfig.map((cfg, i) => renderItem(i + topRowConfig.length, cfg)).join('')
    : '';

  const tickerHTML = hasProjects ? `
      <div class="nw-ticker-section">
        <h2 class="nw-ticker-title">Hemos hecho match con...</h2>

        <div class="nw-ticker-row">
          <ul class="nw-ticker-list row-top">
            ${topRowHTML}
          </ul>
        </div>

        <!-- SEGUNDA FILA: Comentada hasta tener más proyectos -->
        <!-- Descomentar cuando haya 10+ proyectos para efecto de dos filas con scroll paralaje -->
        <!--
        <div class="nw-ticker-row">
          <ul class="nw-ticker-list row-bottom">
            ${bottomRowHTML}
          </ul>
        </div>
        -->
      </div>
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

      ${tickerHTML}

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
    initVideoHover();

    // Refrescar ScrollTrigger después de un pequeño delay
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, 500);
}
