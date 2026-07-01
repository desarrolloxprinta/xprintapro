/**
 * Página FAQ - Preguntas Frecuentes
 * Estilo Interract Labs con design system Xprinta
 * @module pages/faq
 */

import { createLayout } from '../layout.js'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Datos de las preguntas frecuentes categorizadas y con iconos
 */
const faqData = [
  {
    category: 'servicios',
    question: '¿Qué tipo de proyectos realiza Xprinta?',
    answer: 'En Xprinta hacemos proyectos de <strong>rotulación, señalética, rótulos luminosos, vinilos, letras corpóreas, decoración gráfica, rotulación de vehículos</strong> y soluciones para <strong>puntos de venta</strong>.<br><br>Trabajamos con empresas que necesitan cuidar su imagen en locales, oficinas, franquicias, tiendas, fachadas o espacios de atención al público.',
    icon: '43x4NXx9Aa.svg'
  },
  {
    category: 'metodologia',
    question: '¿Trabajáis solo proyectos grandes o también trabajos puntuales?',
    answer: 'Podemos hacer <strong>trabajos puntuales</strong>, pero donde más valor aportamos es en <strong>proyectos que necesitan coordinación</strong>.<br><br>Por ejemplo, cuando una marca tiene varios locales, varias sedes o necesita que todos sus puntos de venta mantengan la misma imagen. Ahí Xprinta ayuda a ordenar el trabajo y a evitar errores.',
    icon: '8vY8DmgIrU.svg'
  },
  {
    category: 'gestion',
    question: '¿Podéis ayudar a reducir costes sin perder calidad?',
    answer: 'Sí. Buscamos soluciones que funcionen bien y que tengan sentido a <strong>nivel técnico y económico</strong>.<br><br>A veces se puede ahorrar eligiendo mejor los materiales, simplificando sistemas, agrupando trabajos o usando soluciones que se puedan repetir en varios locales.<br><br>La clave no es hacer algo más barato sin más, sino <strong>evitar costes innecesarios</strong>.',
    icon: 'EqeE4pmuuO.svg'
  },
  {
    category: 'metodologia',
    question: '¿Qué es el Sistema Xprinta?',
    answer: 'El <strong>Sistema Xprinta</strong> es nuestra forma de trabajar. Nos ayuda a organizar cada proyecto desde el principio hasta el final: revisar la marca, tomar medidas, estudiar la normativa, preparar el presupuesto, fabricar, instalar y dejar todo documentado.<br><br>Así el cliente sabe <strong>qué se va a hacer, cómo se va a hacer y en qué punto está cada trabajo</strong>.',
    icon: 'EqeEaaAuuO.svg'
  },
  {
    category: 'metodologia',
    question: '¿Qué significa trabajar con una línea phygital?',
    answer: 'Significa unir el <strong>trabajo físico con herramientas digitales</strong>.<br><br>El trabajo físico es el rótulo, la señalética, el vinilo, la instalación o el punto de venta. La parte digital es el seguimiento del proyecto, contenido audiovisual, la documentación, los estados de cada trabajo y la información organizada en una plataforma.<br><br>De esta forma, el cliente puede tener <strong>más control sin tener que estar pendiente de cada detalle</strong>.',
    icon: 'IaW8dActvE.svg'
  },
  {
    category: 'gestion',
    question: '¿Revisáis la normativa antes de fabricar un rótulo?',
    answer: 'Sí. Cuando el proyecto lo necesita, revisamos qué se puede instalar y qué límites puede tener la <strong>normativa</strong>.<br><br>Esto puede afectar al tamaño del rótulo, la iluminación, la ubicación, el tipo de fachada o los permisos necesarios.<br><br>Revisarlo antes ayuda a <strong>evitar problemas después</strong>.',
    icon: 'IaWI2ILtvE.svg'
  },
  {
    category: 'metodologia',
    question: '¿Podéis gestionar proyectos en diferentes ubicaciones?',
    answer: 'Sí. Podemos trabajar en <strong>diferentes ciudades y zonas de España y Portugal</strong>.<br><br>La idea es que una marca pueda tener un mismo criterio de imagen en todos sus puntos de venta, aunque estén en ubicaciones distintas.<br><br>Esto ayuda a que todos los locales se vean <strong>coherentes y bien alineados con la marca</strong>.',
    icon: 'NZLNl276D9.svg'
  },
  {
    category: 'servicios',
    question: '¿Os encargáis de la medición, fabricación e instalación?',
    answer: 'Sí. Podemos encargarnos de <strong>todo el proceso</strong>.<br><br>Primero tomamos datos y medidas. Después preparamos la propuesta, fabricamos los elementos y coordinamos la instalación.<br><br>Esto evita que el cliente tenga que hablar con varios proveedores y reduce muchos <strong>errores habituales</strong>.',
    icon: 'Pix99VX42C.svg'
  },
  {
    category: 'gestion',
    question: '¿Qué ocurre después de terminar un proyecto?',
    answer: 'Cuando el trabajo está terminado, <strong>documentamos el resultado con fotos</strong> y dejamos constancia de la instalación.<br><br>Además, podemos ayudar con mantenimiento, revisiones, incidencias o futuras actualizaciones de la imagen.<br><br>El proyecto <strong>no tiene por qué acabar el día de la instalación</strong>.',
    icon: 'cD9WRxH0eP.svg'
  },
  {
    category: 'servicios',
    question: '¿También ayudáis con contenidos digitales o audiovisuales del punto de venta?',
    answer: 'Sí. Algunos proyectos se pueden documentar con <strong>fotos, vídeo o contenido para redes sociales</strong>.<br><br>Esto permite aprovechar el trabajo realizado no solo en el espacio físico, sino también en la <strong>comunicación digital de la marca</strong>.<br><br>Por ejemplo, para mostrar una nueva apertura, una renovación de imagen o una instalación especial.',
    icon: 'e82esLDdqL.svg'
  }
]

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
 * Render principal
 */
export async function renderFAQ() {
  const faqItems = faqData.map((item) => `
    <div class="faq-list-item" data-category="${item.category}">
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
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; padding-bottom: 6rem; padding-top: 4rem;">

          <!-- Tabs de Filtrado -->
          <div class="filter-form-sticky">
            <div class="projects-filters-inline">
              <button class="filter-inline active" data-filter="all">Todas</button>
              <button class="filter-inline" data-filter="servicios">Servicios</button>
              <button class="filter-inline" data-filter="metodologia">Metodología</button>
              <button class="filter-inline" data-filter="gestion">Gestión y Costes</button>
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

