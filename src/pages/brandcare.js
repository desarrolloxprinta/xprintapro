import { createLayout } from '../layout.js'

export const getBrandCareHTML = async () => {
  const layoutHTML = `
    <main class="bc-main">
      <!-- HERO -->
      <section class="bc-hero">
        <div class="bc-hero-bg" style="background-image: url('/servicios/hero_brandcare.jpg');"></div>
        <div class="bc-hero-bg-overlay"></div>
        <div class="bc-hero-content gsap-reveal">
          <div class="bc-label">Línea de Servicio</div>
          <h1>BrandCare</h1>
          <p>Mantenimiento y seguimiento continuo para que tus rótulos sigan representando la marca como el primer día.</p>
        </div>
      </section>

      <!-- ABOUT -->
      <section class="bc-about">
        <div class="bc-about-grid">
          <div class="bc-about-text gsap-reveal">
            BrandCare es el servicio de Xprinta orientado al mantenimiento, control y seguimiento de proyectos de rotulación una vez finalizada la instalación. Porque un rótulo no termina cuando se coloca: necesita conservar su estado, cumplir su periodo de garantía, responder ante posibles incidencias y adaptarse cuando la marca o el espacio requieren una renovación.
          </div>
          <div class="bc-about-image gsap-reveal" style="transition-delay: 0.2s">
            <img src="https://pikaso.cdnpk.net/private/production/4690008861/render.jpg?token=exp=1782518400~hmac=37fbd17bc69604137f8f04a1f48f75c506ed2c798e01e44809f806e3cbf343cd" alt="BrandCare Maintenance Technician" />
          </div>
        </div>
      </section>

      <!-- QUÉ ES / PARA QUÉ SIRVE -->
      <section class="bc-section">
        <div class="bc-container">
          <div class="bc-split">
            <div class="bc-split-left gsap-reveal">
              <h2 class="bc-section-title">Qué es y para qué sirve</h2>
              <p style="color: var(--bc-text-muted); line-height: 1.6; margin-top: 1rem; max-width: 90%;">
                BrandCare es una solución especialmente importante para marcas con varios puntos de venta, oficinas, delegaciones o activos de imagen exterior que necesitan una gestión ordenada más allá de la instalación inicial.
              </p>
            </div>
            <div class="bc-card-list">
              <div class="bc-card gsap-reveal">
                <div class="bc-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3>Seguimiento Postinstalación</h3>
                <p>Permite controlar el estado de los rótulos a lo largo del tiempo, gestionar garantías y planificar actuaciones de mantenimiento.</p>
              </div>
              <div class="bc-card gsap-reveal">
                <div class="bc-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h3>Prolongación de Vida Útil</h3>
                <p>Sirve para mantener los rótulos en buen estado, reducir incidencias y actuar a tiempo cuando un elemento necesita revisión o reparación.</p>
              </div>
              <div class="bc-card gsap-reveal">
                <div class="bc-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
                </div>
                <h3>Control de Garantías</h3>
                <p>Permite controlar los periodos de garantía asociados a cada proyecto y disponer de una visión clara sobre las actuaciones realizadas o pendientes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- QUE INCLUYE (BENEFITS) -->
      <section class="bc-section" style="background-color: var(--bc-white);">
        <div class="bc-container">
          <div style="text-align: center; max-width: 800px; margin: 0 auto;" class="gsap-reveal">
            <div class="bc-label" style="color: var(--color-primary);">Programa</div>
            <h2 class="bc-section-title">Qué Incluye</h2>
          </div>
          
          <div class="bc-grid-3">
            <div class="bc-card gsap-reveal" style="background-color: var(--bc-light);">
              <h3>Mantenimiento Preventivo</h3>
              <p>Revisión periódica del estado de rótulos y elementos de imagen, para anticiparse a averías.</p>
            </div>
            <div class="bc-card gsap-reveal" style="background-color: var(--bc-light); transition-delay: 0.1s;">
              <h3>Gestión de Incidencias</h3>
              <p>Respuesta rápida y coordinada ante cualquier problema relacionado con los elementos instalados.</p>
            </div>
            <div class="bc-card gsap-reveal" style="background-color: var(--bc-light); transition-delay: 0.2s;">
              <h3>Renovación y Actualización</h3>
              <p>Valoración y propuestas de sustitución para elementos deteriorados, obsoletos o desactualizados.</p>
            </div>
            <div class="bc-card gsap-reveal" style="background-color: var(--bc-light);">
              <h3>Coordinación Nacional</h3>
              <p>Intervenciones en punto de venta u oficina con registro de actuaciones para redes nacionales.</p>
            </div>
            <div class="bc-card gsap-reveal" style="background-color: var(--bc-light); transition-delay: 0.1s;">
              <h3>Homogeneidad de Redes</h3>
              <p>Apoyo constante para mantener la imagen de marca en condiciones idénticas en todas partes.</p>
            </div>
            <div class="bc-card gsap-reveal" style="background-color: var(--bc-light); transition-delay: 0.2s;">
              <h3>Servicio Integral Xprinta</h3>
              <p>Integración total si el proyecto requiere fabricación o nuevas instalaciones.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- COMO TRABAJAMOS -->
      <section class="bc-section">
        <div class="bc-container">
          <div class="gsap-reveal">
            <h2 class="bc-section-title">Cómo Trabajamos</h2>
          </div>
          <div class="bc-benefit-list">
            <div class="bc-benefit-item gsap-reveal">
              <div class="bc-benefit-title">01. Seguimiento Post-Instalación</div>
              <div class="bc-benefit-desc">
                En Xprinta realizamos el seguimiento del proyecto una vez finalizada la instalación, manteniendo control sobre los elementos instalados, su garantía y las posibles necesidades futuras.
              </div>
            </div>
            <div class="bc-benefit-item gsap-reveal">
              <div class="bc-benefit-title">02. Valoración e Intervención</div>
              <div class="bc-benefit-desc">
                Cuando surge una incidencia o se detecta una necesidad de revisión, analizamos el caso, valoramos el estado del rótulo y definimos la actuación más adecuada: mantenimiento, reparación o sustitución parcial.
              </div>
            </div>
            <div class="bc-benefit-item gsap-reveal">
              <div class="bc-benefit-title">03. Ejecución Nacional</div>
              <div class="bc-benefit-desc">
                En proyectos con varios puntos de venta, coordinamos las intervenciones de forma ordenada para que la marca mantenga una imagen homogénea en todas sus ubicaciones, apoyándonos en la experiencia de fabricación e instalación de Xprinta.
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="bc-about" style="text-align: center;">
        <div class="gsap-reveal" style="max-width: 800px; margin: 0 auto;">
          <h2 class="bc-section-title" style="color: var(--bc-white); margin-bottom: 2rem;">Protege tu Imagen de Marca</h2>
          <p style="font-size: 1.25rem; line-height: 1.6; opacity: 0.9; margin-bottom: 3rem;">
            BrandCare asegura que los rótulos de tu marca no solo se instalen correctamente, sino que sigan funcionando, comunicando y representando tu imagen con calidad a lo largo del tiempo.
          </p>
          <a href="/servicios.html" class="btn btn-primary">Ver todos los Servicios</a>
        </div>
      </section>
    </main>
  `;

  // Usamos el layout global de header y footer
  return await createLayout({ content: layoutHTML, pageClass: 'page-brandcare' });
}

export const initBrandCareDirectory = () => {
  // Inicialización de BrandCare si es necesaria
};
