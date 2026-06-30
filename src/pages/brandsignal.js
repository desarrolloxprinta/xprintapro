import { createLayout } from '../layout.js'

export const getBrandSignalHTML = async () => {
  const layoutHTML = `
    <style>
      /* Layout Evaluation Protocol - Regius */
      .container {
        width: 100%;
        max-width: 1320px;
        margin: 0 auto;
        padding: 0 24px;
      }
      .ep-bg-light { background-color: var(--bc-light); }
      .ep-bg-dark { background-color: var(--bc-dark); color: var(--bc-light); }
      
      .regius-pill {
        display: inline-block;
        border: 1px solid rgba(51,44,63,0.2);
        border-radius: 50px;
        padding: 6px 16px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        margin-bottom: 24px;
        font-family: var(--font-family-base, 'Inter');
      }
      .ep-bg-dark .regius-pill {
        border-color: rgba(248,247,245,0.2);
        color: var(--bc-light);
      }

      .regius-h2 {
        font-family: var(--font-family-serif, serif);
        font-size: 48px;
        font-weight: 500;
        line-height: 1.1;
        color: var(--bc-dark);
        margin-bottom: 24px;
      }
      .regius-h3 {
        font-family: var(--font-family-serif, serif);
        font-size: 32px;
        font-weight: 400;
        line-height: 1.2;
        color: var(--bc-dark);
      }
      .regius-p {
        font-family: var(--font-family-base, 'Inter');
        font-size: 18px;
        line-height: 1.6;
        color: rgba(51,44,63,0.8);
      }

      /* About Section (Split layout) */
      .about-split {
        display: grid;
        grid-template-columns: 4fr 6fr;
        gap: 60px;
        padding: 120px 0;
      }
      .about-left-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
        min-height: 600px;
      }
      .about-right-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .about-large-text {
        font-family: var(--font-family-serif, serif);
        font-size: 32px;
        line-height: 1.3;
        margin-bottom: 60px;
        color: var(--bc-dark);
      }
      
      /* Benefits Grid */
      .benefits-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
      }
      .benefit-card {
        background: #fff;
        border-radius: 8px;
        padding: 32px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.03);
      }
      .benefit-icon {
        width: 24px;
        height: 24px;
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .benefit-title {
        font-family: var(--font-family-base, 'Inter');
        font-size: 16px;
        font-weight: 600;
        color: var(--bc-dark);
      }
      .benefit-desc {
        font-family: var(--font-family-base, 'Inter');
        font-size: 14px;
        line-height: 1.5;
        color: rgba(51,44,63,0.7);
      }

      /* Stages Section */
      .stages-section {
        padding: 120px 0;
        border-top: 1px solid rgba(0,0,0,0.1);
      }
      .stages-layout {
        display: grid;
        grid-template-columns: 3fr 7fr;
        gap: 60px;
      }
      .stages-sticky-sidebar {
        position: sticky;
        top: 120px;
      }
      .stages-stack {
        display: flex;
        flex-direction: column;
        gap: 40px;
      }
      .stage-card {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        background: #fff;
      }
      .stage-img {
        width: 100%;
        height: 400px;
        object-fit: cover;
      }
      .stage-card-content {
        padding: 40px;
        background: #fff;
      }
      .stage-number {
        position: absolute;
        top: 30px;
        left: 30px;
        width: 40px;
        height: 40px;
        background: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 18px;
        color: var(--bc-dark);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      .stage-title {
        font-family: var(--font-family-serif, serif);
        font-size: 24px;
        margin-bottom: 16px;
        color: var(--bc-dark);
      }
      .stage-desc {
        font-family: var(--font-family-base, 'Inter');
        font-size: 16px;
        line-height: 1.6;
        color: rgba(51,44,63,0.8);
      }

      /* Grid Info Section */
      .info-grid-section {
        padding: 100px 0;
        background-color: #fff;
      }
      .info-grid-header {
        text-align: center;
        max-width: 800px;
        margin: 0 auto 60px auto;
      }
      .info-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
      }
      .info-box h4 {
        font-family: var(--font-family-serif, serif);
        font-size: 24px;
        margin-bottom: 24px;
        color: var(--bc-dark);
        border-bottom: 1px solid rgba(0,0,0,0.1);
        padding-bottom: 16px;
      }
      .info-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .info-list li {
        position: relative;
        padding-left: 24px;
        margin-bottom: 16px;
        font-family: var(--font-family-base, 'Inter');
        font-size: 16px;
        line-height: 1.5;
        color: rgba(51,44,63,0.8);
      }
      .info-list li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 8px;
        width: 8px;
        height: 8px;
        background-color: var(--bc-dark);
        border-radius: 50%;
        opacity: 0.3;
      }

      @media (max-width: 991px) {
        .about-split, .stages-layout, .info-columns {
          grid-template-columns: 1fr;
        }
        .about-left-img { min-height: 400px; }
        .benefits-grid { grid-template-columns: 1fr; }
        .stages-sticky-sidebar { position: relative; top: 0; margin-bottom: 40px; }
        .stage-img { height: 250px; }
      }
    </style>

    <main class="bc-main">
      <!-- HERO -->
      <section class="bc-hero">
        <div class="bc-hero-bg">
          <img src="/servicios/hero_brandsignal.jpg" alt="BrandSignal Hero" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7);" />
        </div>
        <div class="bc-hero-bg-overlay"></div>
        <div class="bc-hero-content gsap-reveal">
          <div class="bc-label">Línea de Servicio</div>
          <h1>BrandSignal</h1>
          <p>Señalética clara, accesible y coherente para orientar a las personas dentro de cada espacio.</p>
        </div>
      </section>

      <!-- SECTION 1: ABOUT & BENEFITS -->
    <section class="ep-bg-light">
      <div class="container">
        <div class="about-split">
          <div class="about-left">
            <img src="/servicios/brandsignal_map.jpg" alt="Directory Map" class="about-left-img" />
          </div>
          <div class="about-right-content">
            <div class="regius-pill">ACERCA DEL SERVICIO</div>
            <div class="about-large-text">
              BrandSignal es el servicio especializado en diseño, fabricación e instalación de sistemas de señalética para espacios físicos. Sirve para guiar a las personas de forma intuitiva, reducir dudas y reforzar la percepción de profesionalidad de la marca.
            </div>
            
            <div class="benefits-grid">
              <div class="benefit-card">
                <div class="benefit-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <div class="benefit-title">Mejor orientación</div>
                <div class="benefit-desc">Ayuda a los usuarios a encontrar accesos, zonas y servicios con gran facilidad.</div>
              </div>
              <div class="benefit-card">
                <div class="benefit-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
                </div>
                <div class="benefit-title">Experiencia fluida</div>
                <div class="benefit-desc">Reduce dudas, preguntas repetidas y recorridos confusos dentro del edificio.</div>
              </div>
              <div class="benefit-card">
                <div class="benefit-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <div class="benefit-title">Mayor accesibilidad</div>
                <div class="benefit-desc">Incorpora soluciones para que más personas puedan comprender la información.</div>
              </div>
              <div class="benefit-card">
                <div class="benefit-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18M9 21V9"/></svg>
                </div>
                <div class="benefit-title">Coherencia de marca</div>
                <div class="benefit-desc">Integra toda la señalética dentro de la identidad visual global del cliente.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: STAGES (CÓMO TRABAJAMOS) -->
    <section class="stages-section ep-bg-light">
      <div class="container">
        <div class="stages-layout">
          <div class="stages-sidebar">
            <div class="stages-sticky-sidebar">
              <div class="regius-pill">METODOLOGÍA EN FASES</div>
              <h2 class="regius-h2">Etapas del Protocolo.</h2>
              <p class="regius-p">En Xprinta analizamos el espacio y definimos las señales necesarias, asegurando funcionalidad y coherencia de marca en cada etapa.</p>
            </div>
          </div>
          <div class="stages-stack">
            <!-- Stage 1 -->
            <div class="stage-card">
              <div class="stage-number">1</div>
              <img src="/servicios/brandsignal_stage1.jpg" alt="Stage 1" class="stage-img" />
              <div class="stage-card-content">
                <h3 class="stage-title">Análisis del Espacio y Recorridos</h3>
                <p class="stage-desc">Comenzamos analizando el espacio: accesos, zonas de tránsito, puntos de decisión, servicios y áreas de atención. A partir de este estudio, definimos qué señales son necesarias, dónde deben ubicarse y qué función debe cumplir cada una para evitar puntos de confusión.</p>
              </div>
            </div>
            <!-- Stage 2 -->
            <div class="stage-card">
              <div class="stage-number">2</div>
              <img src="/servicios/brandsignal_stage2.jpg" alt="Stage 2" class="stage-img" />
              <div class="stage-card-content">
                <h3 class="stage-title">Diseño de Propuesta y Accesibilidad</h3>
                <p class="stage-desc">Desarrollamos una propuesta de señalética alineada con la identidad visual del cliente. Cuando el proyecto requiere señalética accesible, incorporamos criterios como contraste, lectura táctil, braille, altorrelieve o sistemas de encaminamiento, siguiendo la normativa aplicable.</p>
              </div>
            </div>
            <!-- Stage 3 -->
            <div class="stage-card">
              <div class="stage-number">3</div>
              <img src="/servicios/brandsignal_stage3.jpg" alt="Stage 3" class="stage-img" />
              <div class="stage-card-content">
                <h3 class="stage-title">Fabricación e Instalación</h3>
                <p class="stage-desc">Finalmente, fabricamos e instalamos los elementos, coordinando el proyecto para que el resultado sea claro, funcional y coherente con la marca en interiores, exteriores, fachadas, pasillos y zonas comunes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: QUÉ INCLUYE Y A QUIÉN VA DIRIGIDO -->
    <section class="info-grid-section">
      <div class="container">
        <div class="info-grid-header">
          <div class="regius-pill">ALCANCE DEL SERVICIO</div>
          <h2 class="regius-h2">Aplicación y Destinatarios</h2>
        </div>
        <div class="info-columns">
          <div class="info-box">
            <h4>Qué incluye</h4>
            <ul class="info-list">
              <li>Análisis del espacio, recorridos y necesidades de orientación.</li>
              <li>Diseño de un sistema de señalética adaptado a la marca.</li>
              <li>Señalización direccional para guiar recorridos.</li>
              <li>Señales identificativas para salas, zonas, accesos o servicios.</li>
              <li>Señalética informativa para normas, horarios o instrucciones.</li>
              <li>Señalética accesible con braille, altorrelieve o pictogramas.</li>
              <li>Elementos podotáctiles o de encaminamiento.</li>
            </ul>
          </div>
          <div class="info-box">
            <h4>A quién va dirigido</h4>
            <ul class="info-list">
              <li>Oficinas corporativas y sedes empresariales.</li>
              <li>Cadenas de retail y franquicias comerciales.</li>
              <li>Cafeterías, restaurantes y hoteles.</li>
              <li>Centros comerciales y de ocio.</li>
              <li>Clínicas, centros médicos y espacios asistenciales.</li>
              <li>Centros educativos o formativos.</li>
              <li>Edificios públicos o privados de alta afluencia.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    </main>
  `

  return await createLayout({ content: layoutHTML, pageClass: 'page-brandsignal' });
}

export const initBrandSignalDirectory = () => {
  // Inicialización de lógicas específicas de BrandSignal si es necesario
}
