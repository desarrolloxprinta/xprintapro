import { createLayout } from '../layout.js'

export const getBrandCommerceHTML = async () => {
  const layoutHTML = `
    <main class="bc-main">
      <!-- HERO -->
      <section class="bc-hero">
        <div class="bc-hero-bg">
          <video id="bc-dynamic-video" autoplay loop muted playsinline src="/servicios/hero_brandcommerce.mp4" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7);"></video>
        </div>
        <div class="bc-hero-bg-overlay"></div>
        <div class="bc-hero-content gsap-reveal">
          <div class="bc-label">Línea de Servicio</div>
          <h1>BrandCommerce</h1>
          <p>La imagen de marca siempre está disponible, actualizada y lista para cada punto de venta.</p>
        </div>
      </section>

      <!-- INTRO -->
      <section class="bc-section" style="padding-bottom: 2rem;">
        <div class="bc-container">
          <div class="gsap-reveal" style="max-width: 900px;">
            <h2 class="bc-section-title">Qué es y para qué sirve</h2>
            <p style="font-size: 1.1rem; line-height: 1.6; color: var(--bc-text-muted); margin-bottom: 1.5rem;">
              BrandCommerce es un ecommerce personalizado para cada cliente, diseñado para centralizar la compra de elementos de imagen que se repiten con frecuencia y que no requieren instalación especializada (displays, carteles, posters, vinilos sencillos, soportes promocionales).
            </p>
            <p style="font-size: 1.1rem; line-height: 1.6; color: var(--bc-text-muted);">
              Sirve para simplificar la reposición, compra y distribución de materiales de imagen en redes con múltiples ubicaciones, evitando gestiones dispersas y ahorrando tiempo a los equipos de marketing, compras o expansión.
            </p>
          </div>
        </div>
      </section>

      <!-- APPLIED EXPERTISE STYLE: CATEGORIES -->
      <section class="bc-section" style="background-color: var(--bc-white); padding-top: 4rem;">
        <div class="bc-container">
          
          <!-- Category 1: Qué incluye -->
          <div class="bc-expertise-category gsap-reveal" style="margin-bottom: 4rem;">
            <div class="bc-label" style="color: var(--color-primary); margin-bottom: 1rem;">Alcance del Servicio</div>
            <h2 style="font-size: 2rem; margin-bottom: 2rem;">Qué Incluye</h2>
            <div class="bc-grid-3">
              <div class="bc-card" style="background-color: var(--bc-light);">
                <h3>Plataforma Dedicada</h3>
                <p>Creación de un ecommerce específico para la marca con catálogo personalizado.</p>
              </div>
              <div class="bc-card" style="background-color: var(--bc-light);">
                <h3>Catálogo Dinámico</h3>
                <p>Organización por categorías y actualización constante de productos y referencias.</p>
              </div>
              <div class="bc-card" style="background-color: var(--bc-light);">
                <h3>Control de Accesos</h3>
                <p>Gestión de pedidos centralizada con acceso para diferentes usuarios o departamentos.</p>
              </div>
              <div class="bc-card" style="background-color: var(--bc-light);">
                <h3>Producción</h3>
                <p>Fabricación directa de los elementos solicitados con los más altos estándares de calidad.</p>
              </div>
              <div class="bc-card" style="background-color: var(--bc-light);">
                <h3>Logística</h3>
                <p>Preparación y envío de los materiales a cualquier punto de la red comercial.</p>
              </div>
              <div class="bc-card" style="background-color: var(--bc-light);">
                <h3>Optimización</h3>
                <p>Reducción de llamadas, correos y procesos manuales mediante trazabilidad digital.</p>
              </div>
            </div>
          </div>

          <div style="width: 100%; height: 1px; background-color: rgba(0,0,0,0.1); margin-bottom: 4rem;"></div>

          <!-- Category 2: Beneficios -->
          <div class="bc-expertise-category gsap-reveal" style="margin-bottom: 4rem;">
            <div class="bc-label" style="color: var(--color-primary); margin-bottom: 1rem;">Ventajas Competitivas</div>
            <h2 style="font-size: 2rem; margin-bottom: 2rem;">Beneficios</h2>
            <div class="bc-card-list">
              <div class="bc-card" style="border: 1px solid rgba(0,0,0,0.05);">
                <h3>Ahorro de tiempo y menos errores</h3>
                <p>Los pedidos se realizan directamente desde una plataforma pre-configurada, solicitando referencias ya definidas y aprobadas.</p>
              </div>
              <div class="bc-card" style="border: 1px solid rgba(0,0,0,0.05);">
                <h3>Coherencia y Disponibilidad</h3>
                <p>Todos los puntos de venta trabajan con los mismos materiales. Los elementos habituales siempre están accesibles cuando se necesitan.</p>
              </div>
              <div class="bc-card" style="border: 1px solid rgba(0,0,0,0.05);">
                <h3>Autonomía Controlada</h3>
                <p>Cada ubicación solicita lo que necesita sin gestiones complejas, manteniendo control total sobre los pedidos a nivel central.</p>
              </div>
            </div>
          </div>

          <div style="width: 100%; height: 1px; background-color: rgba(0,0,0,0.1); margin-bottom: 4rem;"></div>

          <!-- Category 3: A quién va dirigido -->
          <div class="bc-expertise-category gsap-reveal">
            <div class="bc-label" style="color: var(--color-primary); margin-bottom: 1rem;">Perfil del Cliente</div>
            <h2 style="font-size: 2rem; margin-bottom: 2rem;">A quién va dirigido</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
              <span style="padding: 0.75rem 1.5rem; background-color: var(--color-primary); color: white; border-radius: 40px; font-weight: 500;">Cadenas de retail</span>
              <span style="padding: 0.75rem 1.5rem; background-color: var(--color-primary); color: white; border-radius: 40px; font-weight: 500;">Franquicias</span>
              <span style="padding: 0.75rem 1.5rem; background-color: var(--color-primary); color: white; border-radius: 40px; font-weight: 500;">Marcas con red comercial</span>
              <span style="padding: 0.75rem 1.5rem; background-color: var(--color-primary); color: white; border-radius: 40px; font-weight: 500;">Departamentos de marketing</span>
              <span style="padding: 0.75rem 1.5rem; background-color: var(--color-primary); color: white; border-radius: 40px; font-weight: 500;">Expansión y Compras</span>
              <span style="padding: 0.75rem 1.5rem; background-color: var(--color-primary); color: white; border-radius: 40px; font-weight: 500;">Redes de hostelería</span>
            </div>
          </div>

        </div>
      </section>

      <!-- COMO TRABAJAMOS -->
      <section class="bc-section" style="background-color: var(--bc-dark); color: white;">
        <div class="bc-container">
          <div class="gsap-reveal">
            <div class="bc-label" style="color: var(--color-primary);">Metodología</div>
            <h2 class="bc-section-title" style="color: white;">Cómo Trabajamos</h2>
          </div>
          <div class="bc-benefit-list" style="border-left-color: rgba(255,255,255,0.2);">
            <div class="bc-benefit-item gsap-reveal">
              <div class="bc-benefit-title" style="color: white;">01. Análisis de Necesidades</div>
              <div class="bc-benefit-desc" style="color: rgba(255,255,255,0.7);">
                Analizamos qué materiales utiliza la marca recurrentemente y qué necesitan sus delegaciones.
              </div>
            </div>
            <div class="bc-benefit-item gsap-reveal">
              <div class="bc-benefit-title" style="color: white;">02. Catálogo y Plataforma</div>
              <div class="bc-benefit-desc" style="color: rgba(255,255,255,0.7);">
                Definimos el catálogo inicial y organizamos los productos, adaptando la estructura del ecommerce a la operativa del cliente.
              </div>
            </div>
            <div class="bc-benefit-item gsap-reveal">
              <div class="bc-benefit-title" style="color: white;">03. Activación y Logística</div>
              <div class="bc-benefit-desc" style="color: rgba(255,255,255,0.7);">
                Los usuarios realizan pedidos. Xprinta se encarga de la producción, preparación y envío de los elementos, manteniendo todo actualizado.
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="bc-about" style="text-align: center;">
        <div class="gsap-reveal" style="max-width: 800px; margin: 0 auto;">
          <h2 class="bc-section-title" style="color: var(--bc-white); margin-bottom: 2rem;">Digitaliza y Centraliza tu Logística de Marca</h2>
          <p style="font-size: 1.25rem; line-height: 1.6; opacity: 0.9; margin-bottom: 3rem;">
            BrandCommerce convierte la gestión de materiales corporativos en un proceso rápido y ordenado. Tu marca lista en cualquier ubicación, sin complicaciones.
          </p>
          <a href="/servicios.html" class="btn btn-primary">Ver todos los Servicios</a>
        </div>
      </section>
    </main>
  `;

  return await createLayout({ content: layoutHTML, pageClass: 'page-brandcommerce' });
}

export const initBrandCommerceDirectory = () => {};
