import { createLayout } from '../layout.js'
import content from '../data/content.json'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const getServiciosHTML = async () => {
  const servicios = content.servicios_xprinta || [];
  
  const renderServicesList = (items) => `
    <div class="xprinta-services-grid">
      ${items.map(servicio => `
        <div class="xprinta-service-card gsap-reveal">
          <div class="xprinta-service-image-wrapper">
            <img src="${servicio.image}" loading="lazy" alt="${servicio.title}" class="xprinta-service-image"/>
          </div>
          <div class="xprinta-service-content">
            <div class="xprinta-service-text" style="flex: 1; display: flex; flex-direction: column;">
              <h3 class="ee-h2" style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--color-primary);">${servicio.title}</h3>
              <p class="font-body" style="font-size: 1rem; color: var(--color-text-muted); margin-bottom: 2rem;">${servicio.description}</p>
              
              <div style="margin-top: auto; padding-top: 1rem;">
                <a href="${servicio.url}" class="btn-regius outline" style="width: 100%; text-align: center;">
                  <div class="btn-regius-text-wrapper">
                    <div class="btn-regius-text _1">Conocer más detalle</div>
                    <div class="btn-regius-text _2">Conocer más detalle</div>
                  </div>
                  <div class="btn-regius-bg"></div>
                </a>
              </div>
            </div>
          </div>
          <div class="xprinta-service-hover-overlay"></div>
        </div>
      `).join('')}
    </div>
  `;

  const layoutHTML = `
<style>
  .xprinta-hero-servicios {
    padding: 8rem 5vw 4rem;
    background-color: var(--color-background);
  }
  .xprinta-hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
    max-width: 1400px;
    margin: 0 auto 4rem;
  }
  @media (max-width: 991px) {
    .xprinta-hero-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
  .xprinta-hero-title {
    font-size: clamp(3rem, 5vw, 4.5rem);
    line-height: 1.1;
    color: var(--color-primary);
  }
  .xprinta-hero-desc {
    font-size: 1.25rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    margin-top: 1rem;
  }
  
  .xprinta-images-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto 6rem;
  }
  @media (max-width: 991px) {
    .xprinta-images-grid {
      grid-template-columns: 1fr;
    }
  }
  .xprinta-img-left {
    height: 700px;
    border-radius: 8px;
    overflow: hidden;
  }
  .xprinta-img-left img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .xprinta-img-right {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .xprinta-img-right-top {
    height: 400px;
    border-radius: 8px;
    overflow: hidden;
  }
  .xprinta-img-right-top img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .xprinta-quote-card {
    background-color: var(--color-tertiary);
    padding: 3rem;
    border-radius: 8px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }
  .xprinta-quote-text {
    font-size: 1.125rem;
    color: var(--color-primary);
    line-height: 1.6;
    font-weight: 500;
  }
  
  .xprinta-services-section {
    padding: 4rem 5vw 8rem;
    background-color: var(--color-background);
  }
  .xprinta-services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  @media (max-width: 1200px) {
    .xprinta-services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 768px) {
    .xprinta-services-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .xprinta-service-card {
    background-color: var(--color-tertiary);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    text-decoration: none;
    display: flex;
    flex-direction: column;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    position: relative;
    height: 100%;
  }
  .xprinta-service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.1);
  }
  .xprinta-service-image-wrapper {
    height: 240px;
    overflow: hidden;
  }
  .xprinta-service-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  .xprinta-service-card:hover .xprinta-service-image {
    transform: scale(1.05);
  }
  .xprinta-service-content {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    flex: 1;
    background: var(--color-tertiary);
    z-index: 2;
  }
  .xprinta-service-icon {
    width: 32px;
    height: 32px;
    object-fit: contain;
    opacity: 0.5;
  }
  
  .xprinta-benefits-section {
    padding: 6rem 5vw;
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
  }
  .xprinta-benefits-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 4rem;
    max-width: 1400px;
    margin: 0 auto;
    align-items: center;
  }
  @media (max-width: 991px) {
    .xprinta-benefits-grid {
      grid-template-columns: 1fr;
    }
  }
  .xprinta-benefits-title {
    font-size: 2.5rem;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: var(--color-text-inverse);
  }
  .xprinta-benefits-image {
    width: 100%;
    height: 400px;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 2rem;
  }
</style>

<section class="xprinta-hero-servicios">
  <div class="xprinta-hero-grid gsap-reveal">
    <div class="xprinta-hero-left">
      <h1 class="xprinta-hero-title font-serif">Directorio de<br/><span style="color: var(--color-highlight);">Servicios</span></h1>
    </div>
    <div class="xprinta-hero-right">
      <p class="xprinta-hero-desc font-body">
        Un ecosistema integral para la implantación y gestión de la imagen de tu marca en cualquier punto de venta. Soluciones diseñadas para coordinar y ejecutar proyectos en contextos que requieren alta especialización.
      </p>
    </div>
  </div>

  <div class="xprinta-images-grid">
    <div class="xprinta-img-left gsap-reveal">
      <img src="/servicios/hero_corporate.png" loading="lazy" alt="Corporate" class="parallax"/>
    </div>
    <div class="xprinta-img-right">
      <div class="xprinta-img-right-top gsap-reveal" style="transition-delay: 0.1s;">
        <img src="/servicios/hero_consulting.png" loading="lazy" alt="Consulting" class="parallax"/>
      </div>
      <div class="xprinta-quote-card gsap-reveal" style="transition-delay: 0.2s;">
        <svg width="40" height="32" viewBox="0 0 20 16" fill="var(--color-highlight)" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 1rem; opacity: 0.5;">
          <path d="M7.67123 8.96861V16H0V9.5426C0 7.86846 0.22831 6.43348 0.684931 5.23766C1.18721 4.04185 1.84931 3.06128 2.67123 2.29596C3.49315 1.48281 4.42922 0.908817 5.47945 0.573988C6.57534 0.191329 7.71689 0 8.90411 0V3.58744C7.39726 3.58744 6.27854 4.06577 5.54794 5.02242C4.86301 5.93124 4.52055 7.24664 4.52055 8.96861H7.67123ZM18.7671 8.96861V16H11.0959V9.5426C11.0959 7.86846 11.3242 6.43348 11.7808 5.23766C12.2831 4.04185 12.9452 3.06128 13.7671 2.29596C14.589 1.48281 15.5251 0.908817 16.5753 0.573988C17.6712 0.191329 18.8128 0 20 0V3.58744C18.4931 3.58744 17.3744 4.06577 16.6438 5.02242C15.9589 5.93124 15.6164 7.24664 15.6164 8.96861H18.7671Z" />
        </svg>
        <div class="xprinta-quote-text font-body">No son servicios estandarizados. Cada intervención se define según la naturaleza de la marca, el nivel de complejidad y la forma de participación adecuada según nuestro modelo institucional.</div>
      </div>
    </div>
  </div>
</section>

<section class="xprinta-services-section">
  ${renderServicesList(servicios)}
</section>

<section class="xprinta-benefits-section">
  <div class="xprinta-benefits-grid gsap-reveal">
    <div class="xprinta-benefits-left">
      <div style="text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-highlight); font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600;">Tu empresa de rótulos</div>
      <h2 class="xprinta-benefits-title font-serif" style="font-size: clamp(2rem, 3.5vw, 3rem); line-height: 1.2;">Ventajas de trabajar con un proveedor único de rotulación nacional</h2>
    </div>
    <div class="xprinta-benefits-right">
      <img src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&h=800&w=800" loading="lazy" alt="Corporate buildings" class="xprinta-benefits-image parallax"/>
      <p class="font-body" style="font-size: 1.125rem; line-height: 1.6; color: rgba(255,255,255,0.8);">
        Trabaja con la primera red de rotulación con implantación en toda España. Con Xprinta, toda la imagen de tu marca está en buenas manos: la de fabricantes profesionales.<br/><br/>Contar con Xprinta como proveedor de rotulación es tener un servicio REAL de atención comercial, fabricación, instalación y mantenimiento en toda España.
      </p>
    </div>
  </div>
</section>
  `;

  return await createLayout({ content: layoutHTML, pageClass: 'page-servicios', hideHeader: false });
}

export const initServiciosDirectory = () => {
  const reveals = document.querySelectorAll('.gsap-reveal');
  reveals.forEach((el) => {
    gsap.fromTo(el, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  const parallaxImages = document.querySelectorAll('.parallax');
  parallaxImages.forEach(img => {
    gsap.to(img, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: img.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
}
