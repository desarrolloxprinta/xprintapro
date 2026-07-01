import { createLayout } from '../layout.js'

export const getBrandSurveysHTML = async () => {
  const layoutHTML = `
    <style>
      /* Layout Regulatory Framework - Regius */
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

      .regius-h2 {
        font-family: var(--font-family-serif, serif);
        font-size: 48px;
        font-weight: 500;
        line-height: 1.1;
        color: var(--bc-dark);
        margin-bottom: 1.5rem;
      }
      
      .regius-desc {
        font-family: var(--font-family-base, 'Inter', sans-serif);
        font-size: 18px;
        font-weight: 400;
        line-height: 1.6;
        color: rgba(51,44,63,0.8);
      }
      
      /* Asymmetric Two Column */
      .regius-asym-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 6rem 0;
      }
      @media (min-width: 992px) {
        .regius-asym-grid {
          grid-template-columns: 3fr 7fr;
          gap: 4rem;
          padding: 8rem 0;
        }
      }

      /* Borderless Card Grid */
      .regius-card-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 4rem 2rem;
        padding-top: 4rem;
        padding-bottom: 8rem;
      }
      @media (min-width: 768px) {
        .regius-card-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (min-width: 1024px) {
        .regius-card-grid { grid-template-columns: repeat(3, 1fr); }
      }

      .regius-num-card {
        display: flex;
        flex-direction: column;
      }
      .regius-num-card span.num {
        font-family: var(--font-family-serif, serif);
        font-size: 18px;
        font-weight: 600;
        color: var(--bc-dark);
        opacity: 0.5;
        margin-bottom: 1rem;
        display: block;
      }
      .regius-num-card h3 {
        font-family: var(--font-family-serif, serif);
        font-size: 24px;
        font-weight: 500;
        color: var(--bc-dark);
        margin-bottom: 1rem;
      }
      
      /* Dark Statement Callout */
      .regius-dark-statement {
        padding: 8rem 0;
        text-align: center;
      }
      .regius-dark-statement h2 {
        font-family: var(--font-family-serif, serif);
        font-size: 40px;
        font-weight: 400;
        line-height: 1.3;
        color: var(--bc-white);
        max-width: 900px;
        margin: 0 auto 2rem;
      }
      @media (min-width: 992px) {
        .regius-dark-statement h2 { font-size: 56px; }
      }
      .regius-dark-statement p {
        font-size: 18px;
        color: rgba(255,255,255,0.7);
        max-width: 700px;
        margin: 0 auto;
        line-height: 1.6;
      }
    </style>

    <main class="bc-main">
      <!-- HERO -->
      <section class="bc-hero">
        <div class="bc-hero-bg">
          <video autoplay loop muted playsinline src="/servicios/videos%20hero/BRANDSURVEYS/4937421%20Repairman%20Improvement%20low.mp4" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6);"></video>
        </div>
        <div class="bc-hero-bg-overlay"></div>
        <div class="bc-hero-content gsap-reveal">
          <div class="bc-label">Línea de Servicio</div>
          <h1>BrandSurveys</h1>
          <p>Mediciones precisas para diseñar, fabricar e instalar con seguridad desde el primer paso.</p>
        </div>
      </section>

      <!-- SECTION 1: QUÉ ES & PARA QUÉ SIRVE -->
      <section class="regius-bg-light">
        <div class="bc-container">
          <div class="regius-asym-grid">
            <div class="gsap-reveal">
              <div class="regius-pill">ANÁLISIS TÉCNICO</div>
              <div class="regius-pill">FASE PREVIA</div>
            </div>
            <div class="gsap-reveal">
              <h2 class="regius-h2">BrandSurveys es una fase técnica previa al desarrollo del proyecto.</h2>
              <p class="regius-desc" style="margin-bottom: 2rem;">Consiste en visitar, medir y documentar el lugar donde se va a intervenir para obtener la información necesaria antes de plantear diseños, definir materiales, preparar propuestas o poner en marcha la fabricación.</p>
              <p class="regius-desc" style="margin-bottom: 2rem;">En proyectos de imagen física, una medición incorrecta puede provocar errores de proporción, piezas que no encajan o instalaciones más complejas. Sirve para disponer de referencias reales antes de tomar decisiones, detectando dimensiones, alturas, obstáculos y puntos de anclaje.</p>
              
              <div style="margin-top: 4rem; width: 100%; border-radius: 8px; overflow: hidden; aspect-ratio: 16/9;">
                <img src="/servicios/videos%20hero/BRANDSURVEYS/team-architects-building-site.jpg" alt="Medición de fachada" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: BENEFICIOS / QUÉ INCLUYE -->
      <section style="background-color: var(--bc-white);">
        <div class="bc-container">
          <div class="gsap-reveal" style="padding-top: 6rem; max-width: 800px;">
            <div class="regius-pill">NUESTROS SERVICIOS</div>
            <h2 class="regius-h2">Qué incluye el proceso</h2>
            <p class="regius-desc">Aporta precisión, control y seguridad antes de iniciar el trabajo, asegurando menos errores y diseños mejor adaptados.</p>
          </div>
          
          <div class="regius-card-grid gsap-reveal">
            <div class="regius-num-card">
              <span class="num">01</span>
              <h3>Visita y Medición</h3>
              <p class="regius-desc" style="font-size: 16px;">Visita técnica al lugar. Medición de fachadas, interiores, escaparates y toma de referencias dimensionales exactas.</p>
            </div>
            <div class="regius-num-card">
              <span class="num">02</span>
              <h3>Revisión de Superficies</h3>
              <p class="regius-desc" style="font-size: 16px;">Revisión de materiales existentes, condiciones del soporte, y registro fotográfico completo del entorno.</p>
            </div>
            <div class="regius-num-card">
              <span class="num">03</span>
              <h3>Detección de Obstáculos</h3>
              <p class="regius-desc" style="font-size: 16px;">Identificación de accesos, alturas, instalaciones previas y posibles dificultades para el posterior montaje.</p>
            </div>
            <div class="regius-num-card">
              <span class="num">04</span>
              <h3>Validación Técnica</h3>
              <p class="regius-desc" style="font-size: 16px;">Validación de medidas antes de desarrollar propuestas gráficas y apoyo técnico para definir formatos adecuados.</p>
            </div>
            <div class="regius-num-card">
              <span class="num">05</span>
              <h3>Presupuestación</h3>
              <p class="regius-desc" style="font-size: 16px;">Preparación de datos fidedignos para planificar el proyecto y presupuestar con rigor los materiales.</p>
            </div>
            <div class="regius-num-card">
              <span class="num">06</span>
              <h3>Coordinación Xprinta</h3>
              <p class="regius-desc" style="font-size: 16px;">Conexión directa de los datos con nuestros equipos de diseño, producción e instalación.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 3: CÓMO TRABAJAMOS -->
      <section class="regius-bg-dark">
        <div class="bc-container">
          <div class="regius-dark-statement gsap-reveal">
            <h2>El punto de partida técnico para que el proyecto avance con control.</h2>
            <p>Comenzamos con una revisión de las necesidades y del espacio. Con esa información, el equipo de Xprinta puede plantear soluciones más realistas, definir tamaños adecuados y coordinar la producción con precisión milimétrica. Ideal para cadenas de retail, franquicias y departamentos de expansión.</p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="bc-about regius-bg-light" style="text-align: center; border-top: 1px solid rgba(0,0,0,0.05); padding: 6rem 0;">
        <div class="gsap-reveal" style="max-width: 800px; margin: 0 auto; padding: 0 1rem;">
          <div class="regius-pill" style="margin-bottom: 2rem;">Contacto</div>
          <h2 class="regius-h2" style="font-size: 48px; line-height: 1.1; margin-bottom: 3rem;">¿Listo para asegurar tu proyecto?</h2>
          <a href="/servicios.html" class="btn btn-primary" style="display: inline-block; padding: 14px 32px; border-radius: 40px; font-weight: 600; text-decoration: none; font-size: 16px;">Hablemos de tu expansión</a>
        </div>
      </section>
    </main>
  `;

  return await createLayout({ content: layoutHTML, pageClass: 'page-brandsurveys' });
}

export const initBrandSurveysDirectory = () => {};
