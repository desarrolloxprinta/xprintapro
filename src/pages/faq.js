/**
 * Página FAQ - Preguntas Frecuentes
 * Estilo Interract Labs con design system Xprinta
 * @module pages/faq
 */

import { createLayout } from '../layout.js'
import { supabase } from '../lib/supabase.js'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Cargar FAQs desde Supabase
 */
async function loadFAQs() {
  console.log('📋 [FAQ] Cargando FAQs desde Supabase...')

  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('id, question, answer, category')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('❌ [FAQ] Error al cargar FAQs:', error)
      return []
    }

    console.log(`✅ [FAQ] ${data.length} FAQs cargadas exitosamente`)
    return data || []
  } catch (err) {
    console.error('❌ [FAQ] Error inesperado:', err)
    return []
  }
}

/**
 * Inicializa las animaciones y filtros del directorio FAQ
 */
function initAnimations() {
  // Hero fade in
  gsap.fromTo('.faq-hero',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
  )

  const filters = document.querySelectorAll('.filter-inline')
  const items = Array.from(document.querySelectorAll('.faq-list-item'))

  // FAQ List Items stagger reveal inicial
  items.forEach((item, index) => {
    gsap.fromTo(item,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })

  // Lógica de Filtrado por Tabs
  if (filters.length && items.length) {
    filters.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (gsap.isTweening(items)) return

        filters.forEach(f => f.classList.remove('active'))
        e.currentTarget.classList.add('active')

        const filterValue = e.currentTarget.getAttribute('data-filter')

        const toHide = items.filter(item => filterValue !== 'all' && item.getAttribute('data-category') !== filterValue)
        const toShow = items.filter(item => filterValue === 'all' || item.getAttribute('data-category') === filterValue)

        // Animate out
        if (toHide.length) {
          gsap.to(toHide, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            onComplete: () => {
              toHide.forEach(item => item.style.display = 'none')
              ScrollTrigger.refresh()
            }
          })
        }

        // Animate in
        if (toShow.length) {
          toShow.forEach(item => {
            if (item.style.display === 'none') {
              item.style.display = 'flex'
              gsap.set(item, { opacity: 0, y: 15 })
            }
          })

          gsap.to(toShow, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: toHide.length ? 0.35 : 0,
            stagger: 0.05,
            onComplete: () => {
              ScrollTrigger.refresh()
            }
          })
        }
      })
    })
  }
}

/**
 * Obtener categorías únicas de las FAQs
 */
function getUniqueCategories(faqs) {
  const categories = [...new Set(faqs.map(faq => faq.category))].filter(Boolean)
  return categories
}

/**
 * Mapeo de nombres de categorías para display
 */
const categoryLabels = {
  'servicios': 'Servicios',
  'metodologia': 'Metodología',
  'gestion': 'Gestión y Costes'
}

/**
 * Render principal
 */
export async function renderFAQ() {
  // Cargar FAQs desde Supabase
  const faqData = await loadFAQs()

  // Si no hay FAQs, mostrar mensaje
  if (!faqData || faqData.length === 0) {
    const layoutHTML = `
      <main class="w-full bg-white flex-1" style="min-height: 100vh;">
        <div class="faq-hero">
          <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
            <span class="faq-caption">Preguntas Frecuentes</span>
            <h1 class="faq-title">No hay preguntas frecuentes disponibles en este momento.</h1>
          </div>
        </div>
      </main>
    `
    return createLayout({
      content: layoutHTML,
      pageClass: 'page-faq'
    })
  }

  // Obtener categorías únicas para los filtros
  const uniqueCategories = getUniqueCategories(faqData)

  // Generar botones de filtro dinámicamente
  const filterButtons = [
    '<button class="filter-inline active" data-filter="all">Todas</button>',
    ...uniqueCategories.map(category =>
      `<button class="filter-inline" data-filter="${category}">${categoryLabels[category] || category}</button>`
    )
  ].join('')

  // Generar items de FAQ
  const faqItems = faqData.map((item) => `
    <div class="faq-list-item" data-category="${item.category || 'general'}">
      <div style="min-width: 0; flex: 1;">
        <h3>${item.question}</h3>
      </div>
      <p>${item.answer}</p>
      <span class="faq-list-icon">→</span>
    </div>
  `).join('')

  const layoutHTML = `
    <main class="w-full bg-white flex-1" style="min-height: 100vh;">

      <!-- HERO SECTION (DARK) -->
      <div class="faq-hero">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
          <span class="faq-caption">Preguntas Frecuentes</span>
          <h1 class="faq-title">
            Resolvemos las dudas más habituales sobre nuestros servicios y metodología.
          </h1>
          <div class="faq-subtitle">
            <p>Descubre cómo trabajamos, qué servicios ofrecemos y cómo podemos ayudarte con tu proyecto de rotulación e imagen corporativa.</p>
          </div>
        </div>
      </div>

      <!-- FAQ LIST SECTION -->
      <div style="width: 100%;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; padding-bottom: 6rem; padding-top: 1rem;">

          <!-- Tabs de Filtrado (Dinámico) -->
          <div class="filter-form-sticky">
            <div class="projects-filters-inline">
              ${filterButtons}
            </div>
          </div>

          <div class="faq-list-group">
            ${faqItems}
          </div>

        </div>
      </div>

      <!-- CTA BANNER -->
      <section class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; margin-bottom: 6rem;">
        <div style="background-color: black; border-radius: 1.5rem; padding: 3rem 4rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 2rem;">
          <h2 class="font-serif" style="flex: 1 1 50%; min-width: 300px; font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 700; color: white; line-height: 1.2; margin: 0;">
            ¿Todavía tienes dudas sobre tu proyecto?
          </h2>
          <div style="flex: 0 0 auto; display: flex; flex-direction: column; align-items: center;">
            <a href="/contacto" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border-radius: 9999px; background-color: white; color: black; font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; border: 2px solid white; transition: all 0.3s ease;"
               onmouseover="this.style.backgroundColor='transparent'; this.style.color='white';"
               onmouseout="this.style.backgroundColor='white'; this.style.color='black';">
              Contactar
              <span>→</span>
            </a>
            <span style="margin-top: 0.75rem; font-size: 0.75rem; font-style: italic; color: #9ca3af;">Estamos aquí para ayudarte</span>
          </div>
        </div>
      </section>

    </main>
  `

  return createLayout({
    content: layoutHTML,
    pageClass: 'page-faq'
  })
}

/**
 * Inicializa las animaciones de la página FAQ
 * Debe llamarse DESPUÉS de que el HTML esté insertado en el DOM
 */
export function initFAQAnimations() {
  setTimeout(() => {
    initAnimations()
    ScrollTrigger.refresh()
  }, 100)
}

