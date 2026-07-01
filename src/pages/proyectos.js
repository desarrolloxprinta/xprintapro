/**
 * Página de Directorio de Proyectos - Xprinta Pro
 * Diseño basado en principios de Ignite Agency
 * Código 100% original, sistema de diseño Xprinta
 *
 * @module pages/proyectos
 */

import { createLayout } from '../layout.js'
import content from '../data/content.json'
import { getProjects } from '../lib/supabase.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Renderiza el Header del directorio (título principal)
 */
const renderHeader = (projectsCount) => {
  const ui = content.projectsDirectoryUi || {
    title: 'your BRAND under control',
    subtitle: 'Nuestros proyectos'
  }

  return `
    <section class="at-index-header">
      <div class="container-fluid">
        <h1 class="at-index-title gsap-reveal">${ui.subtitle}</h1>
        
        <div class="at-index-meta gsap-reveal">
          <span>${ui.title}</span>
          <span>${projectsCount} Proyectos</span>
        </div>
      </div>
    </section>
  `
}

/**
 * Renderiza el Layout Principal de Trabajo (Filtros + Navegación + Contenido)
 * @param {Array} projects - Array de proyectos desde Supabase
 */
const renderWorkComponent = (projects) => {
  if (!projects || projects.length === 0) {
    return `
      <section class="projects-empty" style="padding: 8rem 5vw; text-align: center;">
        <p class="font-body" style="font-size: 1.5rem; color: var(--color-text-muted);">
          No hay proyectos disponibles en este momento.
        </p>
      </section>
    `
  }

  const ui = content.projectsDirectoryUi || {
    filterAll: 'Todos'
  }

  const uniqueSectors = [...new Set(projects.map(p => (p.sector || p.category || 'retail').toLowerCase()))];

  return `
    <section class="section_work" style="padding: 1rem 5vw 8rem 5vw; background-color: var(--color-background);">
      <div class="work-container" style="max-width: 1600px; margin: 0 auto;">
        
        <!-- Filtros sticky -->
        <div class="filter-form-sticky">
          <div class="projects-filters-inline">
            <button class="filter-inline active" data-filter="all">${ui.filterAll}</button>
            ${uniqueSectors.map(sector => `<button class="filter-inline" data-filter="${sector}" style="text-transform: capitalize;">${sector}</button>`).join('')}
          </div>
        </div>

        <!-- Componente Principal -->
        <div class="work_component">
          
          <!-- Lado Izquierdo: Lista de Títulos -->
          <div class="work_project-nav">
            <div class="work_project-nav_items">
            ${projects.map((project, index) => {
              const sector = (project.sector || project.category || 'retail').toLowerCase();
              
              // Determinar el nombre corto de la empresa para el menú
              let companyName = project.client?.name || project.client_name;
              if (!companyName && project.slug) {
                // Si no hay client_name, capitalizar el slug (ej: "redeia" -> "Redeia")
                companyName = project.slug.charAt(0).toUpperCase() + project.slug.slice(1).replace(/-/g, ' ');
              } else if (!companyName) {
                // Fallback extremo
                companyName = project.title;
              }

              return `
                <div class="work_item_toggle ${index === 0 ? 'is-active' : ''}" data-sector="${sector}">
                  <a href="#project-${project.slug}" class="work_item_title font-serif">
                    ${companyName}
                  </a>
                </div>
              `
            }).join('')}
          </div>
          </div>

          <!-- Lado Derecho: Contenido de Proyectos -->
          <div class="work_item_content-wrapper">
            ${projects.map(project => {
              const sector = (project.sector || project.category || 'retail').toLowerCase();
              const videoSrc = project.hero?.video || project.hero_video || null;
              return `
                <div id="project-${project.slug}" class="work_item_content" data-sector="${sector}">
                  
                  <div class="work_item_image-container">
                    <img src="${project.hero_image || '/proyectos/placeholder.jpg'}" alt="${project.title}" class="work_item_image" />
                    ${videoSrc ? `<video src="${videoSrc}" class="work_item_video" muted loop playsinline preload="none"></video>` : ''}
                  </div>
                  
                  <div class="work_content-bottom">
                    <div class="work_content-bottom_left">
                      <p class="font-serif text-size-large">${project.title}</p>
                      <span class="project-tag font-body">${project.sector || 'Retail'}</span>
                    </div>
                    <div class="work_content-bottom_right">
                      <p class="font-body text-muted">${project.short_description || project.client_description || ''}</p>
                      <a href="/proyecto-${project.slug}.html" class="button_component font-body">Ver Proyecto →</a>
                    </div>
                  </div>

                </div>
              `
            }).join('')}
          </div>
          
        </div>
      </div>
    </section>
  `
}

/**
 * Obtiene proyectos desde Supabase usando fetch directo
 */
const fetchProjects = async () => {
  try {
    // Usar la función getProjects que ya usa fetch directo
    const projects = await getProjects()
    return projects || []
  } catch (err) {
    console.error('Error fetching projects:', err)
    return []
  }
}

/**
 * Genera el HTML completo de la página
 */
export const getProyectosHTML = async () => {
  const projects = await fetchProjects()

  const pageContent = `
    ${renderHeader(projects.length)}
    ${renderWorkComponent(projects)}
  `

  return await createLayout({
    content: pageContent,
    pageClass: 'page-proyectos-directorio'
  })
}

/**
 * Inicializa la lógica de filtrado y animaciones del directorio
 */
export const initProyectosDirectory = () => {
  // Asegurarnos de tener ScrollTrigger
  if (!window.ScrollTrigger && gsap.ScrollTrigger) {
    gsap.registerPlugin(gsap.ScrollTrigger);
  }

  // Animación de entrada para los elementos revelados en proyectos (incluye la cabecera)
  const revealElements = document.querySelectorAll('.page-proyectos-directorio .gsap-reveal');
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

  const filters = document.querySelectorAll('.filter-inline');
  const navItems = Array.from(document.querySelectorAll('.work_item_toggle'));
  const contentItems = Array.from(document.querySelectorAll('.work_item_content'));

  if (!filters.length || !navItems.length) return;

  // Lógica de Filtrado
  filters.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (gsap.isTweening(contentItems) || gsap.isTweening(navItems)) return;

      filters.forEach(f => f.classList.remove('active'));
      e.currentTarget.classList.add('active');

      const filterValue = e.currentTarget.getAttribute('data-filter');

      const toHideNav = navItems.filter(item => filterValue !== 'all' && item.getAttribute('data-sector') !== filterValue);
      const toShowNav = navItems.filter(item => filterValue === 'all' || item.getAttribute('data-sector') === filterValue);

      const toHideContent = contentItems.filter(item => filterValue !== 'all' && item.getAttribute('data-sector') !== filterValue);
      const toShowContent = contentItems.filter(item => filterValue === 'all' || item.getAttribute('data-sector') === filterValue);

      // Animate out
      if (toHideNav.length) {
        gsap.to([toHideNav, toHideContent], {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            toHideNav.forEach(c => c.style.display = 'none');
            toHideContent.forEach(c => c.style.display = 'none');
            if (gsap.ScrollTrigger) gsap.ScrollTrigger.refresh();
          }
        });
      }

      // Animate in
      if (toShowNav.length) {
        toShowNav.forEach(c => { if (c.style.display === 'none') { c.style.display = 'block'; gsap.set(c, { opacity: 0 }); } });
        toShowContent.forEach(c => { if (c.style.display === 'none') { c.style.display = 'block'; gsap.set(c, { opacity: 0 }); } });
        
        gsap.to([toShowNav, toShowContent], {
          opacity: 1,
          duration: 0.5,
          delay: toHideNav.length ? 0.3 : 0,
          onComplete: () => {
             if (gsap.ScrollTrigger) gsap.ScrollTrigger.refresh();
          }
        });
      }
    });
  });

  // Smooth Scroll on nav click (Native)
  navItems.forEach(item => {
    const link = item.querySelector('.work_item_title');
    if(link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        if(targetEl) {
          const y = targetEl.getBoundingClientRect().top + window.scrollY - 150;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    }
  });

  // ScrollSpy con ScrollTrigger para resaltar el menú lateral activo
  // Añadimos un pequeño retraso para asegurar que las imágenes hayan pintado su alto inicial
  setTimeout(() => {
    contentItems.forEach((content) => {
      const id = content.getAttribute('id');
      const navItem = document.querySelector(`.work_item_title[href="#${id}"]`)?.parentElement;

      if(navItem) {
        ScrollTrigger.create({
          trigger: content,
          start: "top 60%", // Cuando la parte superior de la imagen llega al 60% de la pantalla
          end: "bottom 60%", // Cuando la parte inferior de la imagen llega al 60%
          onEnter: () => {
            navItems.forEach(n => n.classList.remove('is-active'));
            navItem.classList.add('is-active');
          },
          onEnterBack: () => {
            navItems.forEach(n => n.classList.remove('is-active'));
            navItem.classList.add('is-active');
          }
        });
      }
    });
    ScrollTrigger.refresh();
  }, 200);

  // Reproducir video en hover
  const imageContainers = document.querySelectorAll('.work_item_image-container');
  imageContainers.forEach(container => {
    const video = container.querySelector('.work_item_video');
    if (video) {
      container.addEventListener('mouseenter', () => {
        video.play().catch(e => console.warn('Autoplay prevented:', e));
      });
      container.addEventListener('mouseleave', () => {
        video.pause();
      });
    }
  });
}
