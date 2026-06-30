import { createLayout } from '../layout.js'

export const getBrandGuideHTML = async () => {
  const layoutHTML = `
    <style>
      /* Utility classes para replicar Regius Operating Framework con variables globales */
      .regius-bg-light { background-color: var(--bc-light); }
      .regius-bg-dark { background-color: var(--bc-dark); color: var(--bc-white); }
      
      .regius-pill {
        display: inline-block;
        border: 1px solid rgba(0, 0, 0, 0.15);
        padding: 8px 12px;
        border-radius: 24px;
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--bc-dark);
        margin-bottom: 1rem;
      }
      .regius-bg-dark .regius-pill {
        border-color: rgba(255, 255, 255, 0.32);
        color: var(--bc-white);
      }

      .regius-h2 {
        font-family: var(--font-family-serif, serif);
        font-size: 48px;
        font-weight: 500;
        line-height: 1.1;
        color: var(--bc-dark);
        margin-bottom: 1.5rem;
      }
      .regius-bg-dark .regius-h2 { color: var(--bc-white); }
      
      .regius-desc {
        font-family: var(--font-family-base, sans-serif);
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        color: var(--bc-text-muted);
      }
      
      .regius-grid-halves {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 6rem 0;
      }
      @media (min-width: 992px) {
        .regius-grid-halves {
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          padding: 8rem 0;
        }
      }

      /* Cards Section 1 */
      .regius-feature-card {
        background: var(--bc-white);
        border-radius: 8px;
        padding: 2.5rem;
        display: flex;
        flex-direction: column;
        gap: 4rem;
        margin-bottom: 2rem;
      }
      .regius-icon-wrap {
        width: 64px;
        height: 64px;
        background-color: var(--bc-light);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .regius-icon-wrap svg {
        width: 32px;
        height: 32px;
        opacity: 0.32;
        color: var(--bc-dark);
      }
      .regius-card-h3 {
        font-family: var(--font-family-serif, serif);
        font-size: 24px;
        font-weight: 500;
        color: var(--bc-dark);
        margin-bottom: 0.75rem;
      }

      /* Text Large */
      .regius-text-large {
        font-family: var(--font-family-serif, serif);
        font-size: 20px;
        line-height: 1.4;
        color: var(--bc-dark);
        margin-bottom: 2rem;
      }

      /* Dark Cards Section */
      .regius-dark-card {
        background-color: rgba(255, 255, 255, 0.08);
        padding: 2rem;
        border-radius: 8px;
      }
      .regius-dark-card-h3 {
        font-family: var(--font-family-serif, serif);
        font-size: 20px;
        font-weight: 500;
        color: var(--bc-white);
        margin-bottom: 0.75rem;
      }
      .regius-dark-card-p {
        font-size: 15px;
        color: rgba(255,255,255,0.7);
        line-height: 1.5;
        font-family: var(--font-family-base, sans-serif);
      }
    </style>

    <main class="bc-main">
      <!-- HERO -->
      <section class="bc-hero">
        <div class="bc-hero-bg">
          <video id="bc-dynamic-video" autoplay loop muted playsinline src="https://pikaso.cdnpk.net/private/production/4691259679/b2dfb949-bc71-4bb4-ab35-3f1994dd29e9-0.mp4?token=exp=1782518400~hmac=0a32ffe1a1027919178b1bf5492711bb98f96349bc6b8841a5364c8fbad2a707" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7);"></video>
        </div>
        <div class="bc-hero-bg-overlay"></div>
        <div class="bc-hero-content gsap-reveal">
          <div class="bc-label">Línea de Servicio</div>
          <h1>BrandGuide</h1>
          <p>Un manual técnico de marca para implantar una imagen uniforme en todos los puntos de venta.</p>
        </div>
      </section>

      <!-- SECCIÓN 1: INTRO (Copia de "It is not an open offer of services...") -->
      <section class="regius-bg-light">
        <div class="bc-container">
          <div class="regius-grid-halves">
            <div class="gsap-reveal">
              <div style="width: 100%; aspect-ratio: 1/1; border-radius: 8px; overflow: hidden; background: linear-gradient(135deg, #e5d8d3, #a29baf);">
                 <!-- Imagen abstracta tipo Regius Intro -->
                 <img src="/servicios/brandguide_manual1.jpg" style="width: 100%; height: 100%; object-fit: cover; mix-blend-mode: overlay; opacity: 0.6;" />
              </div>
            </div>
            <div class="gsap-reveal" style="display: flex; flex-direction: column; justify-content: center;">
              <h2 style="font-family: var(--font-family-serif, serif); font-size: 36px; font-weight: 400; line-height: 1.2; color: var(--bc-dark); margin-bottom: 3rem;">
                BrandGuide no es un manual corporativo convencional centrado en logotipos o tipografías, sino un marco técnico que traduce la identidad visual a elementos físicos reales bajo rigurosos estándares de calidad.
              </h2>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div style="background: var(--bc-white); padding: 1.5rem; border-radius: 8px;">
                  <div class="regius-icon-wrap" style="width: 48px; height: 48px; margin-bottom: 1.5rem;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                  </div>
                  <h4 style="font-family: var(--font-family-serif, serif); font-size: 14px; font-weight: 600; color: var(--bc-dark); margin-bottom: 0.5rem;">Actuamos cuando el objetivo</h4>
                  <p style="font-size: 13px; color: var(--bc-text-muted); line-height: 1.4;">no puede resolverse únicamente con diseño general, requiriendo especificaciones físicas.</p>
                </div>
                <div style="background: var(--bc-white); padding: 1.5rem; border-radius: 8px;">
                  <div class="regius-icon-wrap" style="width: 48px; height: 48px; margin-bottom: 1.5rem;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <h4 style="font-family: var(--font-family-serif, serif); font-size: 14px; font-weight: 600; color: var(--bc-dark); margin-bottom: 0.5rem;">Aportamos valor si el plan</h4>
                  <p style="font-size: 13px; color: var(--bc-text-muted); line-height: 1.4;">exige una estructura técnica que ordene a proveedores, fabricantes e instaladores.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECCIÓN 2: QUÉ INCLUYE (Copia de "Institutional Intervention Contexts") -->
      <section class="regius-bg-light" style="padding-top: 2rem;">
        <div class="bc-container">
          <div class="regius-grid-halves" style="align-items: start; padding-top: 0;">
            
            <!-- Left Sticky Column -->
            <div class="gsap-reveal" style="position: sticky; top: 120px;">
              <div class="regius-pill">ESPECIFICACIONES TÉCNICAS</div>
              <h2 class="regius-h2">Qué Incluye el BrandGuide</h2>
              <p class="regius-desc">Nuestro manual técnico interviene en los elementos físicos de la marca, detallando las siguientes áreas estructurales para garantizar una implantación precisa:</p>
            </div>

            <!-- Right Column with vertical cards -->
            <div class="gsap-reveal">
              
              <div class="regius-feature-card">
                <div class="regius-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <div>
                  <h3 class="regius-card-h3">Diseño y Definición</h3>
                  <p class="regius-desc">Diseño de un manual de marca específico para el punto de venta. Se definen exhaustivamente los elementos de rotulación exterior, vinilos de escaparate, señalética interior y todas las piezas corporativas necesarias.</p>
                </div>
              </div>

              <div class="regius-feature-card">
                <div class="regius-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                </div>
                <div>
                  <h3 class="regius-card-h3">Características Técnicas</h3>
                  <p class="regius-desc">Documentación rigurosa sobre medidas, cotas y proporciones de cada elemento. Incluye los materiales exigidos o recomendados para fabricación, así como la codificación exacta de colores y acabados.</p>
                </div>
              </div>

              <div class="regius-feature-card">
                <div class="regius-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                </div>
                <div>
                  <h3 class="regius-card-h3">Fabricación e Instalación</h3>
                  <p class="regius-desc">Establecemos pautas ineludibles de fabricación y montaje. Fijamos los criterios de aplicación según el formato de la fachada, el soporte arquitectónico o la normativa técnica del emplazamiento.</p>
                </div>
              </div>

              <div class="regius-feature-card">
                <div class="regius-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <div>
                  <h3 class="regius-card-h3">Base Documental</h3>
                  <p class="regius-desc">Generamos el repositorio maestro de información que permitirá replicar la imagen de marca de forma idéntica en futuras aperturas, facilitando reformas, mantenimiento y reposiciones.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <!-- SECCIÓN 3: BENEFICIOS (Copia de "Institutional Boundaries") -->
      <section class="regius-bg-light">
        <div class="bc-container">
          <div class="regius-grid-halves" style="align-items: start;">
            
            <div class="gsap-reveal">
              <div class="regius-pill">VENTAJAS ESTRUCTURALES</div>
              <h2 class="regius-h2">Beneficios Principales</h2>
            </div>

            <div class="gsap-reveal">
              <div style="width: 100%; border-radius: 8px; overflow: hidden; margin-bottom: 3rem; aspect-ratio: 16/9;">
                <img src="/servicios/brandguide_manual2.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" alt="Brand manual visual" />
              </div>
              
              <p class="regius-text-large"><strong>Uniformidad Nacional:</strong> Todos los puntos siguen las mismas especificaciones, reduciendo diferencias visuales y de calidad entre centros o proveedores locales.</p>
              
              <p class="regius-text-large"><strong>Agilidad y Eficiencia:</strong> Medidas, materiales y colores quedan definidos desde el inicio. Se eliminan las decisiones improvisadas en cada apertura.</p>
              
              <p class="regius-text-large"><strong>Escalabilidad Global:</strong> Permite replicar la imagen coherentemente a medida que la red crece, compartiendo la misma base técnica con todos los equipos implicados.</p>
            </div>
            
          </div>
        </div>
      </section>

      <!-- SECCIÓN 4: METODOLOGÍA (Copia de "Integration with the Model") -->
      <section class="regius-bg-dark">
        <div class="bc-container">
          <div class="regius-grid-halves">
            
            <div class="gsap-reveal" style="border-radius: 8px; overflow: hidden; aspect-ratio: 1/1;">
              <img src="/servicios/brandguide_team.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Equipo analizando la implantación" />
            </div>

            <div class="gsap-reveal" style="display: flex; flex-direction: column; justify-content: center;">
              <h2 class="regius-h2">Cómo Trabajamos</h2>
              <p class="regius-desc" style="color: rgba(255,255,255,0.7); margin-bottom: 3rem;">El BrandGuide no funciona de manera aislada. Se integra dentro de la operativa de tu departamento de marketing y expansión, estructurando cada caso según un modelo riguroso.</p>

              <div style="display: grid; grid-template-columns: 1fr; gap: 1rem; @media (min-width: 768px) { grid-template-columns: 1fr 1fr; }">
                
                <div class="regius-dark-card">
                  <h3 class="regius-dark-card-h3">1. Análisis de Identidad</h3>
                  <p class="regius-dark-card-p">Evaluamos la identidad visual del cliente y revisamos los elementos físicos que se instalarán habitualmente.</p>
                </div>

                <div class="regius-dark-card">
                  <h3 class="regius-dark-card-h3">2. Desarrollo Técnico</h3>
                  <p class="regius-dark-card-p">Estructuramos el manual documentando cada elemento con especificaciones cerradas y exactas.</p>
                </div>

                <div class="regius-dark-card">
                  <h3 class="regius-dark-card-h3">3. Activación Operativa</h3>
                  <p class="regius-dark-card-p">El BrandGuide se convierte en la herramienta ejecutiva y de consulta para la red y proveedores autorizados.</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="bc-about regius-bg-light" style="text-align: center; border-top: 1px solid rgba(0,0,0,0.05); padding: 6rem 0;">
        <div class="gsap-reveal" style="max-width: 800px; margin: 0 auto; padding: 0 1rem;">
          <div class="regius-pill" style="margin-bottom: 2rem;">Siguientes Pasos</div>
          <h2 class="regius-h2" style="font-size: 56px; line-height: 1.1; margin-bottom: 3rem;">¿Consideras oportuno iniciar una conversación?</h2>
          <a href="/servicios.html" class="btn btn-primary" style="display: inline-block; padding: 14px 32px; border-radius: 40px; font-weight: 600; text-decoration: none; font-size: 16px; transition: opacity 0.3s;">Contacta con Nosotros</a>
        </div>
      </section>
    </main>
  `;

  return await createLayout({ content: layoutHTML, pageClass: 'page-brandguide' });
}

export const initBrandGuideDirectory = () => {};
