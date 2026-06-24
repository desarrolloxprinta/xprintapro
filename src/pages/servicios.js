import { createLayout } from '../layout.js'
import content from '../data/content.json'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const getServiciosHTML = async () => {
  const servicios = content.proceso || [];

  const layoutHTML = `
    <header class="section_header" style="position: relative; z-index: 45; padding: 12rem 5vw 3rem 5vw; background-color: var(--color-background);">
      <div class="gsap-reveal" style="max-width: 1600px; margin: 0 auto; text-align: center;">
        <h1 class="font-body" style="font-size: 1.2rem; color: var(--color-text-muted); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">
          Nuestro Método
        </h1>
        <p class="font-serif" style="font-size: clamp(3rem, 5vw, 6rem); line-height: 1; font-weight: 400; margin: 0;">
          Servicios <span style="font-style: italic; color: var(--color-highlight);">Integrales</span>
        </p>
      </div>
    </header>

    <section class="section_services" style="padding: 3rem 5vw 8rem 5vw; background-color: var(--color-background);">
      <div class="services-container" style="max-width: 1600px; margin: 0 auto;">
        
        <!-- Elemento para mantener el espacio superior pegajoso limpio -->
        <div class="services-sticky-cap" style="position: sticky; top: 100px; z-index: 40; height: 50px; background-color: var(--color-background); margin-left: -5vw; margin-right: -5vw; padding: 0 5vw;">
           <div style="position: absolute; bottom: 100%; left: 0; width: 100%; height: 200px; background-color: var(--color-background); pointer-events: none;"></div>
        </div>

        <div class="services_component">
          
          <!-- Lado Izquierdo: Menú -->
          <div class="services_nav">
            <div class="services_nav_items">
              ${servicios.map((servicio, index) => `
                <div class="services_item_toggle ${index === 0 ? 'is-active' : ''}">
                  <a href="#servicio-${index}" class="services_item_title font-serif">
                    ${servicio.title}
                  </a>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Lado Derecho: Contenido -->
          <div class="services_content-wrapper">
            ${servicios.map((servicio, index) => {
              const number = String(index + 1).padStart(2, '0');
              return `
                <div id="servicio-${index}" class="services_item_content">
                  <div class="services_card gsap-reveal">
                    <div class="services_card_number font-serif">${number}</div>
                    <h2 class="services_card_title font-serif">${servicio.title}</h2>
                    <p class="services_card_desc font-body">${servicio.description}</p>
                    
                    <div style="margin-top: auto; padding-top: 3rem;">
                      <a href="/proyectos.html" class="button_component font-body" style="display: inline-block;">Ver Casos de Éxito →</a>
                    </div>
                  </div>
                </div>
              `
            }).join('')}
          </div>

        </div>
      </div>
    </section>
  `;

  return await createLayout({ content: layoutHTML, pageClass: 'page-servicios' });
}

export const initServiciosDirectory = () => {
  const contentItems = document.querySelectorAll('.services_item_content');
  const navItems = document.querySelectorAll('.services_item_toggle');

  if (!contentItems.length) return;

  // Smooth scroll para anclas del menú
  document.querySelectorAll('a[href^="#servicio-"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      
      if (targetEl) {
        // Compensamos el header
        const offset = 180;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ScrollSpy
  setTimeout(() => {
    contentItems.forEach((content) => {
      const id = content.getAttribute('id');
      const navItem = document.querySelector(`.services_item_title[href="#${id}"]`)?.parentElement;

      if(navItem) {
        ScrollTrigger.create({
          trigger: content,
          start: "top 60%", 
          end: "bottom 60%",
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
}
