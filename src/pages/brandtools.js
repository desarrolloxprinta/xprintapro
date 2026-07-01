import { createLayout } from '../layout.js'

export const getBrandToolsHTML = async () => {
  const layoutHTML = `
    <style>
      /* Layout Economic Engagement - Regius */
      .ee-bg-light { background-color: #FAF9F6; }
      
      .ee-h2 {
        font-family: var(--font-family-serif, serif);
        font-size: 40px;
        font-weight: 400;
        line-height: 1.2;
        color: var(--bc-dark);
        margin-bottom: 2rem;
      }
      @media (min-width: 992px) {
        .ee-h2 { font-size: 52px; }
      }

      .ee-desc {
        font-family: var(--font-family-base, 'Inter', sans-serif);
        font-size: 16px;
        font-weight: 400;
        line-height: 1.6;
        color: rgba(51,44,63,0.8);
      }
      
      /* Asymmetric Columns */
      .ee-asym-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
        padding: 6rem 0;
      }
      @media (min-width: 992px) {
        .ee-asym-grid {
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          padding: 8rem 0;
        }
      }

      /* Bulleted List with Custom Icon */
      .ee-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .ee-list-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
      .ee-list-icon {
        font-family: var(--font-family-serif, serif);
        font-size: 18px;
        color: var(--bc-dark);
        line-height: 1.5;
        flex-shrink: 0;
      }
      .ee-list-content h4 {
        font-family: var(--font-family-serif, serif);
        font-size: 20px;
        font-weight: 500;
        color: var(--bc-dark);
        margin-bottom: 0.5rem;
      }
      .ee-list-content p {
        font-family: var(--font-family-base, 'Inter', sans-serif);
        font-size: 15px;
        line-height: 1.6;
        color: rgba(51,44,63,0.8);
      }

      /* Italic Callout */
      .ee-callout {
        font-family: var(--font-family-serif, serif);
        font-size: 32px;
        font-style: italic;
        line-height: 1.4;
        color: var(--bc-dark);
        text-align: center;
        max-width: 1000px;
        margin: 0 auto;
        padding: 6rem 2rem;
      }
      @media (min-width: 992px) {
        .ee-callout { font-size: 42px; padding: 8rem 0; }
      }

      /* Tag above title */
      .ee-tag {
        font-family: var(--font-family-base, 'Inter', sans-serif);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: rgba(51,44,63,0.5);
        margin-bottom: 1rem;
        display: block;
      }
    </style>

    <main class="bc-main">
      <!-- HERO -->
      <section class="bc-hero">
        <div class="bc-hero-bg">
          <video autoplay loop muted playsinline src="/servicios/videos%20hero/BRANDTOOLS/Presupuestos%20nestle%20low.mp4" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6);"></video>
        </div>
        <div class="bc-hero-bg-overlay"></div>
        <div class="bc-hero-content gsap-reveal">
          <div class="bc-label">Línea de Servicio</div>
          <h1>BrandTools</h1>
          <p>Tecnología a medida para conectar los equipos del cliente con la implantación de marca en punto de venta.</p>
        </div>
      </section>

      <!-- SECTION 1: QUÉ ES -->
      <section class="ee-bg-light">
        <div class="bc-container">
          <div class="ee-asym-grid">
            <div class="gsap-reveal">
              <span class="ee-tag">Soluciones Digitales</span>
              <h2 class="ee-h2">Desarrollo tecnológico aplicado a la imagen corporativa en punto de venta.</h2>
            </div>
            <div class="gsap-reveal">
              <p class="ee-desc" style="margin-bottom: 1.5rem;">Consiste en diseñar y programar aplicaciones, plataformas o herramientas digitales adaptadas a la operativa de cada cliente, con el objetivo de simplificar procesos, ordenar información, agilizar solicitudes o mejorar la coordinación.</p>
              <p class="ee-desc">Cada solución se desarrolla en función de una necesidad concreta. Puede tratarse de un sistema de presupuestación en tablets para un equipo nacional de ventas, una aplicación para equipos comerciales, o cualquier desarrollo específico que facilite la gestión.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: QUÉ INCLUYE (LISTAS CON ICONO PERSONALIZADO) -->
      <section style="background-color: var(--bc-white); border-top: 1px solid rgba(0,0,0,0.05);">
        <div class="bc-container">
          <div class="ee-asym-grid">
            <div class="gsap-reveal">
              <div style="border-radius: 8px; overflow: hidden; aspect-ratio: 4/3; margin-bottom: 2rem;">
                <img src="/servicios/videos%20hero/BRANDTOOLS/Captura%20de%20pantalla%202026-07-01%20121222.png" alt="Desarrollo Digital" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
            </div>
            <div class="gsap-reveal">
              <span class="ee-tag">Integración Operativa</span>
              <h2 class="ee-h2" style="font-size: 36px;">Elementos del Desarrollo</h2>
              <ul class="ee-list">
                <li class="ee-list-item">
                  <div class="ee-list-icon">☉</div>
                  <div class="ee-list-content">
                    <h4>Análisis de Necesidades</h4>
                    <p>Definición funcional de la solución digital basada en la operativa real del cliente y sus procesos internos.</p>
                  </div>
                </li>
                <li class="ee-list-item">
                  <div class="ee-list-icon">☉</div>
                  <div class="ee-list-content">
                    <h4>Desarrollo a Medida</h4>
                    <p>Programación de aplicaciones para consulta, solicitud, presupuestación o gestión de materiales corporativos.</p>
                  </div>
                </li>
                <li class="ee-list-item">
                  <div class="ee-list-icon">☉</div>
                  <div class="ee-list-content">
                    <h4>Automatización y Entornos</h4>
                    <p>Organización de datos, referencias y automatización de tareas en entornos personalizados según la marca.</p>
                  </div>
                </li>
                <li class="ee-list-item">
                  <div class="ee-list-icon">☉</div>
                  <div class="ee-list-content">
                    <h4>Integración Xprinta</h4>
                    <p>Acompañamiento e integración directa con los procesos de fabricación e implantación física de imagen en punto de venta.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 3: CALLOUT -->
      <section class="ee-bg-light">
        <div class="bc-container">
          <div class="gsap-reveal">
            <div class="ee-callout">
              "Transformamos procesos manuales o dispersos en herramientas digitales ágiles, reduciendo la dependencia de correos y hojas de cálculo para la gestión de la marca física."
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 4: BENEFICIOS / A QUIÉN VA DIRIGIDO -->
      <section style="background-color: var(--bc-white); border-top: 1px solid rgba(0,0,0,0.05); padding-bottom: 8rem;">
        <div class="bc-container">
          <div class="ee-asym-grid">
            <div class="gsap-reveal">
              <span class="ee-tag">Dirigido A</span>
              <h2 class="ee-h2" style="font-size: 36px; margin-bottom: 2rem;">¿Para quién diseñamos BrandTools?</h2>
              <ul class="ee-list">
                <li class="ee-list-item">
                  <div class="ee-list-icon">✓</div>
                  <div class="ee-list-content"><p style="font-size: 16px;">Grandes marcas con equipos comerciales nacionales.</p></div>
                </li>
                <li class="ee-list-item">
                  <div class="ee-list-icon">✓</div>
                  <div class="ee-list-content"><p style="font-size: 16px;">Departamentos de marketing, ventas y compras.</p></div>
                </li>
                <li class="ee-list-item">
                  <div class="ee-list-icon">✓</div>
                  <div class="ee-list-content"><p style="font-size: 16px;">Equipos de expansión y cadenas de retail o franquicias.</p></div>
                </li>
                <li class="ee-list-item">
                  <div class="ee-list-icon">✓</div>
                  <div class="ee-list-content"><p style="font-size: 16px;">Organizaciones buscando digitalizar la gestión de proyectos de imagen.</p></div>
                </li>
              </ul>
            </div>
            <div class="gsap-reveal">
              <span class="ee-tag">Ventajas</span>
              <h2 class="ee-h2" style="font-size: 36px; margin-bottom: 2rem;">Beneficios Operativos</h2>
              <p class="ee-desc" style="margin-bottom: 1.5rem;"><strong>Más autonomía para los equipos:</strong> Los usuarios pueden trabajar con herramientas preparadas específicamente para su función y su marca, conectando marketing, ventas y operaciones.</p>
              <p class="ee-desc" style="margin-bottom: 1.5rem;"><strong>Menos procesos manuales:</strong> Se automatizan gestiones repetitivas. Los datos relevantes quedan estructurados en una herramienta específica con escalabilidad a futuro.</p>
              <p class="ee-desc"><strong>Integración con la actividad real:</strong> BrandTools no busca imponer una plataforma estándar, sino crear una solución a medida que se aplica directamente a proyectos de imagen física y rotulación.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  `;

  return await createLayout({ content: layoutHTML, pageClass: 'page-brandtools' });
}

export const initBrandToolsDirectory = () => {};
