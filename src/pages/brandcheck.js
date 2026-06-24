import { createLayout } from '../layout.js'

export const getBrandCheckHTML = async () => {
  const layoutHTML = `
    <main class="bc-main">
      <!-- HERO -->
      <section class="bc-hero">
        <div class="bc-hero-bg">
          <video autoplay loop muted playsinline src="https://videos.pexels.com/video-files/7598770/7598770-hd_1920_1080_30fps.mp4" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85);"></video>
        </div>
        <div class="bc-hero-bg-overlay"></div>
        <div class="bc-hero-content gsap-reveal">
          <div class="bc-label">Línea de Servicio</div>
          <h1>BrandCheck</h1>
          <p>Asesoramiento experto para aplicar la imagen corporativa de forma correcta, viable y adaptada a cada espacio.</p>
        </div>
      </section>

      <!-- QUÉ ES / PARA QUÉ SIRVE -->
      <section class="bc-section">
        <div class="bc-container">
          <div class="bc-split">
            <div class="bc-split-left gsap-reveal">
              <h2 class="bc-section-title">Qué es y para qué sirve</h2>
              <p style="color: var(--bc-text-muted); line-height: 1.6; margin-top: 1rem; max-width: 90%;">
                BrandCheck es un servicio de asesoramiento técnico y visual para la implantación de imagen corporativa en espacios físicos. Consiste en analizar las características de cada fachada, interior o local para definir qué tipo de rótulo, vinilo, señalética o elemento de comunicación visual es más adecuado.
              </p>
            </div>
            <div class="bc-card-list">
              <div class="bc-card gsap-reveal">
                <div class="bc-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3>Prevención de Errores</h3>
                <p>Sirve para evitar errores de implantación, elegir soluciones coherentes con la marca y anticipar posibles condicionantes técnicos o normativos.</p>
              </div>
              <div class="bc-card gsap-reveal">
                <div class="bc-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h3>Análisis de Viabilidad</h3>
                <p>Permite estudiar cada caso y recomendar la solución más adecuada para que la marca se vea bien y cumpla con los criterios municipales.</p>
              </div>
              <div class="bc-card gsap-reveal">
                <div class="bc-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
                </div>
                <h3>Resolución de Dudas</h3>
                <p>Ayuda a resolver dudas habituales antes de iniciar el proyecto sobre ubicación, adaptación de imagen y elementos a utilizar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- QUÉ INCLUYE (Scope) -->
      <section class="bc-section" style="background-color: var(--bc-white);">
        <div class="bc-container">
          <div style="text-align: center; max-width: 800px; margin: 0 auto; margin-bottom: 3rem;" class="gsap-reveal">
            <div class="bc-label" style="color: var(--color-primary);">Alcance</div>
            <h2 class="bc-section-title">Qué Incluye</h2>
          </div>
          
          <div class="bc-grid-3">
            <div class="bc-card gsap-reveal" style="background-color: var(--bc-light);">
              <h3>Revisión Técnica</h3>
              <p>Revisión de fachada, interior o espacio de aplicación y análisis del tipo de local y sus condicionantes técnicos.</p>
            </div>
            <div class="bc-card gsap-reveal" style="background-color: var(--bc-light); transition-delay: 0.1s;">
              <h3>Asesoramiento Visual</h3>
              <p>Orientación sobre aplicaciones interiores de marca y revisión de coherencia con la identidad corporativa.</p>
            </div>
            <div class="bc-card gsap-reveal" style="background-color: var(--bc-light); transition-delay: 0.2s;">
              <h3>Análisis Normativo</h3>
              <p>Orientación sobre regulaciones municipales aplicables y detección de posibles limitaciones del soporte.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- A QUIÉN VA DIRIGIDO / BENEFICIOS -->
      <section class="bc-about">
        <div class="bc-about-grid">
          <div class="bc-about-text gsap-reveal">
            <h3>A quién va dirigido</h3>
            <p>BrandCheck está dirigido a marcas, cadenas y negocios que necesitan implantar su imagen corporativa en locales físicos y quieren hacerlo con criterio antes de avanzar con la instalación.</p>
            <ul style="margin-top: 1rem; margin-left: 1.5rem; color: var(--bc-text-muted);">
              <li>Cadenas de cafeterías y redes de restauración.</li>
              <li>Locales comerciales y franquicias.</li>
              <li>Equipos de expansión, marketing y operaciones.</li>
            </ul>
          </div>
          <div class="bc-about-image gsap-reveal" style="transition-delay: 0.2s">
            <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Corporate Architecture Team" style="border-radius: 12px; height: 100%; object-fit: cover; width: 100%;"/>
          </div>
        </div>
      </section>

      <!-- COMO TRABAJAMOS -->
      <section class="bc-section" style="background-color: var(--bc-white);">
        <div class="bc-container">
          <div class="gsap-reveal">
            <div class="bc-label" style="color: var(--color-primary);">Metodología</div>
            <h2 class="bc-section-title">Cómo Trabajamos</h2>
          </div>
          <div class="bc-benefit-list">
            <div class="bc-benefit-item gsap-reveal">
              <div class="bc-benefit-title">01. Análisis y Entorno</div>
              <div class="bc-benefit-desc">
                En Xprinta analizamos cada caso partiendo de la marca, el tipo de local y las características del espacio donde se va a implantar la imagen.
              </div>
            </div>
            <div class="bc-benefit-item gsap-reveal">
              <div class="bc-benefit-title">02. Valoración de Soportes</div>
              <div class="bc-benefit-desc">
                Revisamos la fachada, el interior y los soportes disponibles para aconsejar sobre la aplicación, el rótulo más conveniente y las limitaciones municipales.
              </div>
            </div>
            <div class="bc-benefit-item gsap-reveal">
              <div class="bc-benefit-title">03. Integración de Servicios</div>
              <div class="bc-benefit-desc">
                BrandCheck sirve como paso previo a otros servicios de Xprinta, como fabricación, instalación o legalización, garantizando decisiones fundamentadas.
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="bc-about" style="text-align: center;">
        <div class="gsap-reveal" style="max-width: 800px; margin: 0 auto;">
          <h2 class="bc-section-title" style="color: var(--bc-white); margin-bottom: 2rem;">Decisiones Firmes Antes de Instalar</h2>
          <p style="font-size: 1.25rem; line-height: 1.6; opacity: 0.9; margin-bottom: 3rem;">
            BrandCheck ayuda a convertir cada fachada e interior en una aplicación de marca coherente, viable y bien resuelta.
          </p>
          <a href="/servicios.html" class="btn btn-primary">Ver todos los Servicios</a>
        </div>
      </section>
    </main>
  `;

  // Usamos el layout global de header y footer
  return await createLayout({ content: layoutHTML, pageClass: 'page-brandcheck' });
}

export const initBrandCheckDirectory = () => {
  // Inicialización de BrandCheck si es necesaria
};
