import { createLayout } from '../layout.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const getBrandVisionHTML = async () => {
  const layoutHTML = `
    <style>
      /* Layout Limits & Responsibilities - Regius */
      .lr-bg-light { background-color: var(--bc-light); }
      .lr-bg-dark { background-color: var(--bc-dark); color: var(--bc-white); }
      
      .lr-h2 {
        font-family: var(--font-family-serif, serif);
        font-size: 40px;
        font-weight: 400;
        line-height: 1.2;
        color: var(--bc-dark);
        margin-bottom: 2rem;
      }
      .lr-h4 {
        font-family: var(--font-family-serif, serif);
        font-size: 32px;
        font-weight: 400;
        line-height: 1.3;
        color: var(--bc-dark);
      }
      @media (min-width: 992px) {
        .lr-h4 { font-size: 42px; }
      }

      .lr-desc {
        font-family: var(--font-family-base, 'Inter', sans-serif);
        font-size: 16px;
        font-weight: 400;
        line-height: 1.6;
        color: rgba(51,44,63,0.8);
      }
      
      .lr-label {
        font-family: var(--font-family-base, 'Inter', sans-serif);
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: rgba(51,44,63,0.5);
      }

      /* Section 1: Asymmetric Text */
      .lr-intro-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 6rem 0;
        border-bottom: 1px solid rgba(0,0,0,0.1);
      }
      @media (min-width: 992px) {
        .lr-intro-grid {
          grid-template-columns: 2fr 8fr;
          gap: 4rem;
          padding: 8rem 0;
        }
      }

      /* Section 2: Vertical Tabs */
      .lr-tabs-section {
        padding: 8rem 0;
        background-color: var(--bc-white);
      }
      .lr-tabs-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 4rem;
      }
      @media (min-width: 992px) {
        .lr-tabs-grid {
          grid-template-columns: 5fr 5fr;
          gap: 6rem;
        }
      }
      
      .lr-tab-item {
        padding: 0 0 1.5rem 0;
        margin-bottom: 4rem;
        border-bottom: 2px solid transparent;
        opacity: 0.1;
      }
      .lr-tab-item.active {
        border-bottom: 2px solid var(--bc-dark);
        opacity: 1;
      }
      .lr-tab-title {
        font-family: var(--font-family-serif, serif);
        font-size: 32px;
        font-weight: 500;
        color: var(--bc-dark);
        margin-bottom: 0.5rem;
      }
      
      .lr-tab-image-container {
        position: relative;
        width: 100%;
        aspect-ratio: 3/4;
        border-radius: 8px;
        overflow: hidden;
      }
      .lr-tab-image {
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        object-fit: cover;
        opacity: 0;
        transition: opacity 0.6s ease;
      }
      .lr-tab-image.active {
        opacity: 1;
        z-index: 2;
      }

      /* Section 3: Split Content */
      .lr-split-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 4rem;
        padding: 8rem 0;
      }
      @media (min-width: 992px) {
        .lr-split-grid {
          grid-template-columns: 6fr 4fr;
          gap: 6rem;
          align-items: center;
        }
      }
      
      .lr-checklist {
        list-style: none;
        padding: 0;
        margin: 2rem 0;
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      @media (min-width: 768px) {
        .lr-checklist { grid-template-columns: 1fr 1fr; }
      }
      .lr-checklist li {
        font-size: 15px;
        color: rgba(51,44,63,0.8);
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .lr-checklist li::before {
        content: "—";
        color: var(--bc-dark);
        font-weight: bold;
      }
    </style>

    <main class="bc-main">
      <!-- HERO -->
      <section class="bc-hero">
        <div class="bc-hero-bg">
          <video autoplay loop muted playsinline src="/servicios/videos%20hero/BRANDVISION/brandvision%20low.mp4" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7);"></video>
        </div>
        <div class="bc-hero-bg-overlay"></div>
        <div class="bc-hero-content gsap-reveal">
          <div class="bc-label">Línea de Servicio</div>
          <h1>BrandVision</h1>
          <p>Visualiza la imagen de marca en el local real mediante Realidad Aumentada antes de fabricar e instalar.</p>
        </div>
      </section>

      <!-- SECTION 1: QUÉ ES -->
      <section class="lr-bg-light">
        <div class="bc-container">
          <div class="lr-intro-grid">
            <div class="gsap-reveal">
              <span class="lr-label">TECNOLOGÍA AR</span>
            </div>
            <div class="gsap-reveal">
              <h2 class="lr-h4" style="margin-bottom: 2rem;">BrandVision ayuda a resolver la incertidumbre mostrando una previsualización clara, contextualizada y fácil de entender.</h2>
              <p class="lr-desc" style="font-size: 18px;">Permite superponer elementos digitales sobre el entorno real. El responsable de zona, el equipo de expansión o comercial puede enseñar al potencial franquiciado una representación visual del resultado final directamente en el propio local utilizando un smartphone o tablet.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: VERTICAL TABS (BENEFICIOS) -->
      <section class="lr-tabs-section">
        <div class="bc-container">
          <div class="lr-tabs-grid">
            <div style="position: relative;">
              <div class="pin-title-container" style="background-color: var(--bc-white); padding: 2rem 0; margin-bottom: 2rem; position: relative; z-index: 10;">
                <h2 class="lr-h2" style="font-size: 56px; line-height: 1.1; font-weight: 400; margin: 0;">Claridad y Confianza</h2>
              </div>
              
              <div class="lr-tabs-mask" style="overflow: hidden; position: relative; height: 60vh;">
                <div class="lr-tab-list-wrapper">
                  <div class="lr-tab-item active" data-tab="1">
                    <h3 class="lr-tab-title">Previsualización Realista</h3>
                    <p class="lr-desc">Permite ver los elementos de marca aplicados sobre el propio local en escala y perspectiva real antes de ordenar su producción.</p>
                  </div>
                  
                  <div class="lr-tab-item" data-tab="2">
                    <h3 class="lr-tab-title">Toma de Decisiones Ágil</h3>
                    <p class="lr-desc">Facilita que todas las partes (equipos internos, expansión, responsables) entiendan cómo quedará la implantación, reduciendo dudas antes de aprobar rótulos o aplicaciones gráficas.</p>
                  </div>
                  
                  <div class="lr-tab-item" data-tab="3">
                    <h3 class="lr-tab-title">Apoyo a la Venta</h3>
                    <p class="lr-desc">Los responsables de zona cuentan con una herramienta visual potente para mostrar al potencial franquiciado el resultado esperado y cerrar acuerdos comerciales.</p>
                  </div>
                </div>
              </div>

            </div>
            <div style="position: relative; height: 100%;">
              <div class="lr-tab-image-container">
                <img src="/servicios/videos%20hero/BRANDVISION/RENDER-ADAMS-LOCAL%20EXTERIOR-VERSION%202.png" class="lr-tab-image active" id="tab-img-1" alt="AR Preview" />
                <img src="/servicios/videos%20hero/BRANDVISION/RENDER-CITADEL-FACHADA%202025%20-%20VISTA%202%20-%20NOCTURNO.png" class="lr-tab-image" id="tab-img-2" alt="Decision Making" />
                <img src="/servicios/BrandVision/ambiente-6.jpg" class="lr-tab-image" id="tab-img-3" alt="Sales Support" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 3: QUÉ INCLUYE -->
      <section class="lr-bg-light">
        <div class="bc-container">
          <div class="lr-split-grid">
            <div class="gsap-reveal">
              <span class="lr-label" style="margin-bottom: 1rem; display: block;">ALCANCE TÉCNICO</span>
              <h2 class="lr-h2">Cómo Trabajamos y Qué Incluye</h2>
              <p class="lr-desc">En Xprinta partimos de los elementos de imagen definidos para el proyecto: rótulos, kits de recepción o piezas corporativas. Preparamos una versión digital 3D adaptada para visualizarse mediante Realidad Aumentada.</p>
              
              <ul class="lr-checklist">
                <li>Previsualización en fachadas</li>
                <li>Rótulos interiores e iluminación</li>
                <li>Kits de recepción virtuales</li>
                <li>Adaptación al espacio real</li>
                <li>Soporte para smartphones</li>
                <li>Validación previa a fabricación</li>
                <li>Presentaciones a franquiciados</li>
                <li>Integración con Xprinta</li>
              </ul>
              
              <p class="lr-desc" style="margin-top: 2rem;">La marca y el potencial franquiciado pueden comprobar cómo quedaría la instalación antes de avanzar. La propuesta deja de ser abstracta y se muestra directamente en el espacio.</p>
            </div>
            
            <div class="gsap-reveal">
              <div style="border-radius: 8px; overflow: hidden; aspect-ratio: 3/4;">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=1200" alt="Corporate Architecture" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="bc-about lr-bg-dark" style="text-align: center; padding: 6rem 0;">
        <div class="gsap-reveal" style="max-width: 800px; margin: 0 auto; padding: 0 1rem;">
          <h2 class="lr-h2" style="color: #fff; margin-bottom: 2rem;">Ve el futuro de tu marca antes de construirlo.</h2>
          <p class="lr-desc" style="color: rgba(255,255,255,0.7); margin-bottom: 3rem;">Una solución que une rotulación, tecnología y expansión comercial.</p>
          <a href="/servicios.html" class="btn btn-primary" style="background: #fff; color: var(--bc-dark); display: inline-block; padding: 14px 32px; border-radius: 40px; font-weight: 600; text-decoration: none; font-size: 16px;">Solicita una Demostración</a>
        </div>
      </section>
    </main>
  `;

  return await createLayout({ content: layoutHTML, pageClass: 'page-brandvision' });
}

export const initBrandVisionDirectory = () => {
  gsap.registerPlugin(ScrollTrigger);

  const tabItems = document.querySelectorAll('.lr-tab-item');
  const tabImages = document.querySelectorAll('.lr-tab-image');
  const wrapper = document.querySelector('.lr-tab-list-wrapper');

  if (tabItems.length === 0 || !wrapper) return;

  const processTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.lr-tabs-section',
      pin: true,
      start: 'top top', 
      end: '+=400%', // Very long scroll distance to give time to read
      scrub: 1
    }
  });

  // Initial state
  gsap.set(tabItems, { opacity: 0.1 });
  gsap.set(tabItems[0], { opacity: 1 });
  gsap.set(tabImages, { opacity: 0 });
  gsap.set(tabImages[0], { opacity: 1 });
  gsap.set(wrapper, { y: 0 });

  // Initial pause for reading the first item
  processTl.to({}, { duration: 1 });

  tabItems.forEach((item, i) => {
    if (i === 0) return; // Skip first item as it's already visible
    
    // Calculate how far to move wrapper up
    const targetY = -(item.offsetTop - tabItems[0].offsetTop);
    
    // Move wrapper
    processTl.to(wrapper, {
      y: targetY,
      ease: "power2.inOut",
      duration: 1
    }, `step${i}`);
    
    // Fade out PREVIOUS item and image
    processTl.to(tabItems[i - 1], {
      opacity: 0.1,
      duration: 0.4,
      ease: "none"
    }, `step${i}`);
    processTl.to(tabImages[i - 1], {
      opacity: 0,
      duration: 1,
      ease: "none"
    }, `step${i}`);
    
    // Fade in CURRENT item and image
    processTl.to(item, {
      opacity: 1,
      duration: 0.4,
      ease: "none"
    }, `step${i}+=0.6`);
    processTl.to(tabImages[i], {
      opacity: 1,
      duration: 1,
      ease: "none"
    }, `step${i}`);
    
    // Update active class for border
    processTl.call(() => {
      tabItems.forEach(t => t.classList.remove('active'));
      item.classList.add('active');
    }, null, `step${i}+=0.6`);
    
    // READ TIME PAUSE: Wait while user scrolls before moving to next item
    processTl.to({}, { duration: 1.5 });
  });
};
