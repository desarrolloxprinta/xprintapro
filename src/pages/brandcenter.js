import { createLayout } from '../layout.js';
import '../styles/brandcare.css'; // Usamos el diseño centralizado de servicios (BrandCare)

export const getBrandCenterHTML = async () => {
  const layoutHTML = `
    <main class="bc-main">
      <!-- HERO -->
      <section class="bc-hero">
        <video class="bc-hero-video-bg" autoplay loop muted playsinline src="/servicios/videos%20hero/BRANDCENTER/Stranet%20Nestle%20low.mp4" style="filter: brightness(0.7);"></video>
        <div class="bc-hero-bg-overlay"></div>
        <div class="bc-hero-content gsap-reveal">
          <div class="bc-label">Línea de Servicio</div>
          <h1>BrandCenter</h1>
          <p>Supervisa, organiza y controla todas las actuaciones de tu marca desde una única plataforma digital.</p>
        </div>
      </section>

      <!-- SOBRE EL SERVICIO -->
      <section class="bc-section" style="background-color: var(--bc-dark); color: var(--bc-white);">
        <div class="bc-container">
          <div class="bc-split">
            <div class="bc-split-left gsap-reveal">
              <div class="bc-label">Sobre el servicio</div>
            </div>
            <div class="bc-about-text gsap-reveal" style="transition-delay: 0.2s;">
              BrandCenter es una extranet online desarrollada para que cada cliente pueda consultar, organizar y supervisar los proyectos que Xprinta está ejecutando para su marca en cualquier punto de España. Una herramienta privada, segura y adaptada a la operativa de cada empresa, pensada para ofrecer visibilidad, orden y control durante todo el proceso.
            </div>
          </div>
        </div>
      </section>

      <!-- QUÉ INCLUYE (Lista con divisores) -->
      <section class="bc-section" style="background-color: var(--bc-dark); color: var(--bc-white); padding-top: 0;">
        <div class="bc-container">
          <div class="bc-split">
            <div class="bc-split-left gsap-reveal">
              <h2 class="bc-section-title" style="color: var(--bc-white);">Qué Incluye</h2>
              <p style="color: rgba(255,255,255,0.7); line-height: 1.6; margin-top: 1rem; max-width: 90%;">Principales módulos y beneficios incluidos en la plataforma BrandCenter para nuestros clientes.</p>
            </div>
            <div class="bc-benefit-list" style="margin-top: 0; border-top: none;">
              <div class="bc-benefit-item gsap-reveal" style="border-top: 1px solid rgba(255,255,255,0.1); border-bottom: none; padding-bottom: 0;">
                <div class="bc-benefit-title" style="font-size: 1.5rem; color: var(--bc-white);">Extranet Privada y Segura</div>
                <div class="bc-benefit-desc" style="color: rgba(255,255,255,0.7);">Entorno online personalizado según la marca, con acceso restringido por usuario y contraseña para tu equipo.</div>
              </div>
              <div class="bc-benefit-item gsap-reveal" style="border-top: 1px solid rgba(255,255,255,0.1); border-bottom: none; padding-bottom: 0;">
                <div class="bc-benefit-title" style="font-size: 1.5rem; color: var(--bc-white);">Seguimiento Nacional en Tiempo Real</div>
                <div class="bc-benefit-desc" style="color: rgba(255,255,255,0.7);">Control de fases de progreso por proyecto en rotulaciones de toda España, evitando la dispersión de información.</div>
              </div>
              <div class="bc-benefit-item gsap-reveal" style="border-top: 1px solid rgba(255,255,255,0.1); border-bottom: none; padding-bottom: 0;">
                <div class="bc-benefit-title" style="font-size: 1.5rem; color: var(--bc-white);">Gestor Documental Centralizado</div>
                <div class="bc-benefit-desc" style="color: rgba(255,255,255,0.7);">Toda la información técnica, administrativa, planos y fotografías del resultado final centralizadas en la ficha de cada ubicación.</div>
              </div>
              <div class="bc-benefit-item gsap-reveal" style="border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1);">
                <div class="bc-benefit-title" style="font-size: 1.5rem; color: var(--bc-white);">Trazabilidad Total</div>
                <div class="bc-benefit-desc" style="color: rgba(255,255,255,0.7);">Conoce el estado y evolución de cada actuación 24/7 disponible online. Conecta a tu equipo con los técnicos de Xprinta reduciendo correos.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- A QUIÉN VA DIRIGIDO -->
      <section class="bc-section" style="background-color: var(--bc-dark); color: var(--bc-white); padding-top: 0;">
        <div class="bc-container">
          <div class="bc-split">
            <div class="bc-split-left gsap-reveal">
              <div class="bc-label">Perfiles</div>
              <h2 class="bc-section-title" style="color: var(--bc-white);">¿A quién va dirigido?</h2>
            </div>
            <div class="gsap-reveal" style="font-size: 1.25rem; font-family: var(--font-family-base); font-weight: 400; line-height: 1.8; color: rgba(255,255,255,0.9); transition-delay: 0.2s;">
              <p style="margin-bottom: 2rem;">Especialmente útil cuando se trabaja con redes de centros, puntos de venta o delegaciones repartidas por diferentes ubicaciones.</p>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 1.5rem;"><strong style="color: var(--bc-white); font-weight: 600;">Cadenas de Retail:</strong> Gestión simultánea de aperturas y reformas de tiendas.</li>
                <li style="margin-bottom: 1.5rem;"><strong style="color: var(--bc-white); font-weight: 600;">Franquicias:</strong> Asegura la coherencia visual en toda la red de franquiciados.</li>
                <li style="margin-bottom: 1.5rem;"><strong style="color: var(--bc-white); font-weight: 600;">Expansión y Operaciones:</strong> Visión centralizada para planificar y mantener ubicaciones con agilidad.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- CÓMO TRABAJAMOS -->
      <section class="bc-section" style="background-color: var(--bc-light);">
        <div class="bc-container">
          <div style="text-align: center; max-width: 800px; margin: 0 auto;" class="gsap-reveal">
            <div class="bc-label" style="color: var(--color-primary);">Metodología</div>
            <h2 class="bc-section-title">Cómo Trabajamos</h2>
          </div>
          
          <div class="bc-grid-3">
            <div class="bc-card gsap-reveal" style="background-color: var(--bc-white);">
              <div class="bc-label" style="margin-bottom: 1rem; color: var(--color-highlight);">Paso 01</div>
              <h3>Configuración a Medida</h3>
              <p>En Xprinta configuramos cada BrandCenter según las necesidades del cliente, definiendo la estructura de proyectos, ubicaciones, fases y usuarios.</p>
            </div>
            <div class="bc-card gsap-reveal" style="background-color: var(--bc-white); transition-delay: 0.1s;">
              <div class="bc-label" style="margin-bottom: 1rem; color: var(--color-highlight);">Paso 02</div>
              <h3>Punto de Consulta Principal</h3>
              <p>Durante la ejecución, la plataforma se convierte en el HUB central. Accede a documentos, comprueba avances y mantén una visión actualizada.</p>
            </div>
            <div class="bc-card gsap-reveal" style="background-color: var(--bc-white); transition-delay: 0.2s;">
              <div class="bc-label" style="margin-bottom: 1rem; color: var(--color-highlight);">Paso 03</div>
              <h3>Gestión Transparente</h3>
              <p>El resultado es una gestión más ordenada, transparente y eficiente, fundamental para proyectos con múltiples ubicaciones simultáneas.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="bc-about" style="text-align: center;">
        <div class="gsap-reveal" style="max-width: 800px; margin: 0 auto;">
          <div class="bc-label" style="margin-bottom: 1rem;">Siguientes pasos</div>
          <h2 class="bc-section-title" style="color: var(--bc-white); margin-bottom: 2rem;">Toma el Control de tu Marca</h2>
          <p style="font-size: 1.25rem; line-height: 1.6; opacity: 0.9; margin-bottom: 3rem;">
            BrandCenter ofrece a cada cliente una forma más clara, cómoda y profesional de seguir sus proyectos de rotulación.
          </p>
          <a href="/servicios.html" class="btn btn-primary">Solicitar Demo</a>
        </div>
      </section>
    </main>
  `;

  return await createLayout({ content: layoutHTML, pageClass: 'page-brandcenter' });
}

export const initBrandCenterDirectory = () => {
  // Inicialización de interacciones si las hay
};
