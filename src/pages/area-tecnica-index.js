import { createLayout } from '../layout.js'
import { getAreaTecnicaPosts } from '../lib/supabase.js'
import { gsap } from 'gsap'

import '../styles/area-tecnica-index.css'

export async function getAreaTecnicaIndexHTML() {
  const posts = await getAreaTecnicaPosts();

  const postsHTML = posts.map(post => {
    // Si no hay fecha, usamos el año actual como fallback
    const dateObj = post.published_date ? new Date(post.published_date) : new Date();
    const year = dateObj.getFullYear();
    
    // Determinar si hay video o usamos la clase de fallback
    const hasVideo = !!post.heroVideo;
    const bgClass = hasVideo ? 'at-index-bg' : 'at-index-bg no-video';
    
    const videoHTML = hasVideo 
      ? `<video src="${post.heroVideo}" class="nw-project-video" autoplay loop muted playsinline></video>` 
      : '';

    return `
      <a href="/area-tecnica-post.html?slug=${post.slug}" class="at-index-item gsap-reveal" data-cursor="nw-view">
        <div class="${bgClass}">
          ${videoHTML}
        </div>
        
        <div class="at-index-year">
          ${year}
        </div>
        
        <div class="at-index-info">
          <h3>${post.title}</h3>
          <span>${post.category || 'Artículo Técnico'}</span>
        </div>
        
        <div class="at-index-action">
          Leer artículo
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </a>
    `;
  }).join('');

  const layoutHTML = `
    <main class="page-area-tecnica-index">
      <div class="nav-spacer"></div>

      <section class="at-index-header">
        <div class="container-fluid">
          <h1 class="at-index-title gsap-reveal">Área Técnica</h1>
          
          <div class="at-index-meta gsap-reveal">
            <span>Directorio de artículos y guías</span>
            <span>${posts.length} Documentos</span>
          </div>
        </div>
      </section>

      <section class="at-index-directory">
        <div class="container-fluid">
          <div class="at-index-list">
            ${postsHTML}
          </div>
        </div>
      </section>
    </main>
  `;

  return await createLayout({
    content: layoutHTML,
    pageClass: 'page-area-tecnica'
  });
}

export function initAreaTecnicaIndexAnimations() {
  // Animación de entrada
  const revealElements = document.querySelectorAll('.page-area-tecnica-index .gsap-reveal');
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
  });

  // Manejo de reproducción de videos on hover
  // (El cursor personalizado ya maneja parte de esto globalmente en main.js,
  // pero añadimos este bloque por seguridad para pausar videos que no se están viendo).
  const items = document.querySelectorAll('.at-index-item');
  items.forEach(item => {
    const video = item.querySelector('.nw-project-video');
    if (video) {
      item.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        video.play().catch(e => {});
      });
      item.addEventListener('mouseleave', () => {
        video.pause();
      });
    }
  });
}
