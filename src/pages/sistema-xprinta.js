/**
 * Página Sistema Xprinta - Metodología de Trabajo
 * Diseño consistente con otras páginas (Equipo, Nosotros)
 * @module pages/sistema-xprinta
 */

import { createLayout } from '../layout.js'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fases del Sistema Xprinta
 */
const sistemaXprintaFases = [
  {
    title: 'Guía inicial',
    description: 'Definición de normas visuales, análisis de identidad corporativa y establecimiento de estándares de marca.'
  },
  {
    title: 'Gestión digital',
    description: 'Plataforma centralizada para documentación, planos, normativas y catálogos accesibles en tiempo real.'
  },
  {
    title: 'Instalación',
    description: 'Ejecución profesional con equipos propios, garantizando precisión técnica y coherencia visual.'
  },
  {
    title: 'Mantenimiento',
    description: 'Programa continuo de revisión, reparación y actualización de elementos de señalética.'
  },
  {
    title: 'Documentación',
    description: 'Registro fotográfico, informes de estado y trazabilidad completa de cada punto de venta.'
  },
  {
    title: 'Comunicación',
    description: 'Reporting periódico con datos consolidados, métricas de cumplimiento y visibilidad total del proyecto.'
  }
]

/**
 * Render principal
 */
export async function renderSistemaXprinta() {
  const layoutHTML = `
    <main class="w-full flex-1">

      <!-- HERO SECTION -->
      <section class="sistema-hero">
        <h1 class="sistema-hero-title">
          <span class="sistema-hero-line">Una metodología propia</span>
          <span class="sistema-hero-line">que conecta lo físico</span>
          <span class="sistema-hero-line">con lo digital</span>
        </h1>
      </section>

      <!-- ABOUT SECTION -->
      <section class="section sistema-about-section">
        <div class="main-container-sistema">
          <div class="sistema-halves">
            <div class="label-master-dark">
              <div class="label-small-sistema">Metodología integral</div>
            </div>
            <div class="text-h4-sistema">
              El Sistema Xprinta es nuestra forma de trabajar. Una metodología propia que une lo físico y lo digital para gestionar la imagen de marca desde la guía inicial hasta la instalación, el mantenimiento, la documentación y la comunicación posterior.
            </div>
          </div>
        </div>
        <img src="https://cdn.prod.website-files.com/699456d718b50304347a3db7/699456d918b50304347a40c2_Dots%20Dark.svg"
             loading="lazy"
             alt="Decorative dots"
             class="sistema-dots" />
      </section>

      <!-- FASES SECTION -->
      <section class="section-sistema-fases">
        <div class="main-container-sistema">
          <div class="fases-header">
            <span class="label-small-sistema">Las 6 Fases</span>
            <h2 class="fases-title">
              Proceso <span class="text-primary italic">Integral</span>
            </h2>
          </div>
          <div class="grid-sistema-fases">
            ${sistemaXprintaFases.map((fase, index) => `
              <div class="fase-card">
                <div class="fase-card__header">
                  <span class="fase-card__number">${(index + 1).toString().padStart(2, '0')}</span>
                  <h3 class="fase-card__title">${fase.title}</h3>
                </div>
                <p class="fase-card__description">${fase.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

    </main>
  `

  return createLayout({
    content: layoutHTML,
    pageClass: 'page-sistema-xprinta'
  })
}

/**
 * Inicializa las animaciones de la página Sistema Xprinta
 * Debe llamarse DESPUÉS de que el HTML esté insertado en el DOM
 */
export function initSistemaXprintaAnimations() {
  setTimeout(() => {
    initSistemaAnimations()
    ScrollTrigger.refresh()
  }, 100)
}

/**
 * Animaciones GSAP para la página
 */
function initSistemaAnimations() {
  // Hero: blur + translateX alternando por línea (igual que Nosotros)
  const heroLines = document.querySelectorAll('.sistema-hero-line')
  heroLines.forEach((line, i) => {
    const dir = i % 2 === 0 ? 1 : -1
    gsap.fromTo(line,
      { opacity: 0, filter: 'blur(8px)', x: `${16 * dir}%` },
      { opacity: 1, filter: 'blur(0px)', x: '0%', duration: 1.4, ease: 'power3.out', delay: 0.1 * i }
    )
  })

  // Fade in header de fases
  gsap.fromTo('.fases-header',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.fases-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  )

  // Fase cards con animación staggered
  const faseCards = document.querySelectorAll('.fase-card')
  faseCards.forEach((card, index) => {
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 60
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })
}
