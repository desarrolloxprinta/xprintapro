/**
 * Proceso con Iconos Lottie - Versión Vanilla JS
 * Sistema de 14 iconos animados con lazy loading inteligente
 */

import lottie from 'lottie-web';
import { iconosConfig } from './animations/iconos-config';

/**
 * Renderiza HTML de la sección de proceso con iconos Lottie
 */
export const renderProcesoLottie = () => `
  <div id="proceso-lottie-container" class="proceso-lottie-section">
    <div class="proceso-lottie-container">
      <!-- Header -->
      <div class="proceso-lottie-header">
        <span class="text-caption">03 / Metodología</span>
        <h2 class="proceso-lottie-title">
          El Proceso <br>
          <span class="accent-text" style="font-style: italic;">Lineal</span>
        </h2>
        <p class="proceso-lottie-subtitle">
          14 pasos para transformar tu identidad de marca en realidad física
        </p>
      </div>

      <!-- Grid de iconos -->
      <div class="proceso-lottie-grid">
        ${iconosConfig.map((icono) => `
          <div
            class="lottie-icon-item"
            data-icono-id="${icono.id}"
            data-archivo="${icono.archivo}"
            data-delay="${icono.delay * 1000}"
          >
            <!-- Contenedor de animación Lottie -->
            <div class="lottie-icon-animation"></div>

            <!-- Placeholder mientras carga -->
            <div class="lottie-icon-placeholder" style="display: flex;">
              <div class="lottie-icon-spinner"></div>
            </div>

            <!-- Texto -->
            <div class="lottie-icon-text">
              <h3 class="lottie-icon-nombre">${icono.nombre}</h3>
              <p class="lottie-icon-descripcion">${icono.descripcion}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Footer -->
      <div class="proceso-lottie-footer">
        <p class="proceso-lottie-footer-text">
          De la estrategia al resultado final, cada paso está diseñado para
          garantizar la máxima calidad y fidelidad a tu marca.
        </p>
      </div>
    </div>
  </div>
`;

/**
 * Inicializa las animaciones Lottie con lazy loading
 */
export const initProcesoLottie = () => {
  const items = document.querySelectorAll('.lottie-icon-item');
  if (!items.length) return;

  // Map para almacenar las instancias de animación
  const animations = new Map();

  // Configuración del IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '100px', // Precargar 100px antes
    threshold: 0.1
  };

  // Callback del observer
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      const item = entry.target;
      const iconoId = item.dataset.iconoId;
      const archivo = item.dataset.archivo;
      const delay = parseInt(item.dataset.delay || '0');

      const animContainer = item.querySelector('.lottie-icon-animation');
      const placeholder = item.querySelector('.lottie-icon-placeholder');

      if (entry.isIntersecting) {
        // Elemento visible - cargar y reproducir
        if (!animations.has(iconoId)) {
          // Primera vez que se ve - cargar animación
          const lottieFileName = archivo.replace('.svg', '.json');

          setTimeout(() => {
            fetch(`/lottie/${lottieFileName}`)
              .then(response => response.json())
              .then(data => {
                // Ocultar placeholder
                if (placeholder) placeholder.style.display = 'none';

                // Crear animación Lottie
                const animation = lottie.loadAnimation({
                  container: animContainer,
                  renderer: 'svg',
                  loop: true,
                  autoplay: true,
                  animationData: data,
                  rendererSettings: {
                    progressiveLoad: true,
                    hideOnTransparent: true,
                    preserveAspectRatio: 'xMidYMid meet'
                  }
                });

                // Event listeners
                animation.addEventListener('DOMLoaded', () => {
                  console.log(`✨ Animación ${iconoId} cargada`);
                });

                animation.addEventListener('complete', () => {
                  // Reiniciar después del draw-on, mantener loop de breathing
                  animation.goToAndPlay(72, true); // Frame donde empieza breathing loop
                });

                // Guardar referencia
                animations.set(iconoId, animation);
              })
              .catch(error => {
                console.error(`Error cargando ${lottieFileName}:`, error);
                if (placeholder) {
                  placeholder.innerHTML = '<div style="color: var(--color-text-muted); font-size: 12px;">Error</div>';
                }
              });
          }, delay);
        } else {
          // Ya existe - reproducir
          const animation = animations.get(iconoId);
          if (animation) animation.play();
        }
      } else {
        // Elemento fuera de viewport - pausar
        const animation = animations.get(iconoId);
        if (animation) animation.pause();
      }
    });
  };

  // Crear observer
  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  // Observar todos los items
  items.forEach(item => observer.observe(item));

  // Cleanup en caso de navegación
  return () => {
    observer.disconnect();
    animations.forEach(animation => animation.destroy());
    animations.clear();
  };
};
