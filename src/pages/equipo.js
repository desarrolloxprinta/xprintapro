/**
 * Página Equipo - Nuestro Equipo
 * Grid de fotos profesional con el design system Xprinta
 * @module pages/equipo
 */

import { createLayout } from '../layout.js'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Datos del equipo con fotos - Ordenados por importancia
 */
const teamMembers = [
  // CEO - Máxima importancia
  {
    name: 'Sergio García',
    role: 'CEO',
    photo: '/nosotros/equipo/Sergio Garcia.jpg'
  },
  // Director de Operaciones - Segundo en importancia
  {
    name: 'Emilio Sánchez',
    role: 'Director de Operaciones',
    photo: '/nosotros/equipo/Emilio sánchez.jpg'
  },
  // Desarrollo / IA Architect
  {
    name: 'Ruy De Jesús',
    role: 'Desarrollador / IA Architect',
    photo: '/nosotros/equipo/Ruy De jesús.jpg'
  },
  {
    name: 'Jorge Rodríguez',
    role: 'Desarrollador / IA Architect',
    photo: '/nosotros/equipo/Jorge Rodríguez.jpg'
  },
  // Gestión Comercial
  {
    name: 'Francisco José Perona',
    role: 'Gestión Comercial',
    photo: '/nosotros/equipo/FRANCISCO JOSE PERONA.jpg'
  },
  {
    name: 'Lourdes Benavides',
    role: 'Gestión Comercial',
    photo: '/nosotros/equipo/LOURDES benavides.jpg'
  },
  // Diseño y Producción
  {
    name: 'Carlos Jiménez',
    role: 'Diseño y Producción',
    photo: '/nosotros/equipo/Carlos Jiménez.jpg'
  },
  {
    name: 'Mariana Díaz Solá',
    role: 'Diseño y Producción',
    photo: '/nosotros/equipo/Mariana Díaz Solá.jpg'
  },
  {
    name: 'Pablo Herraez',
    role: 'Diseño y Producción',
    photo: '/nosotros/equipo/Pablo herraez.jpg'
  },
  // Marketing
  {
    name: 'Martina',
    role: 'Marketing',
    photo: '/nosotros/equipo/martina.png'
  },
  {
    name: 'Eva Pérez',
    role: 'Marketing',
    photo: '/nosotros/equipo/Eva Perez.png'
  },
  // Diseño 3D
  {
    name: 'Jonathan Seldas',
    role: 'Diseñador y Especialista 3D',
    photo: '/nosotros/equipo/JONATHAN seldas.jpg'
  }
]

/**
 * Inicializa las animaciones GSAP
 */
function initAnimations() {
  // Configurar video para reproducir solo una vez
  const heroVideo = document.querySelector('.equipo-contain-image-1 video')
  if (heroVideo) {
    heroVideo.addEventListener('ended', () => {
      heroVideo.pause()
    })
  }

  // Hero heading fade in
  gsap.fromTo('.heading-equipo',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
  )

  // Hero subtitle fade in
  gsap.fromTo('.subtitle-equipo',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 }
  )

  // Hero grid fade in
  gsap.fromTo('.equipo-grid',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
  )

  // Parallax en imágenes del hero
  const parallaxImages = document.querySelectorAll('.parallax')
  parallaxImages.forEach((img) => {
    gsap.fromTo(img,
      { scale: 1.15 },
      {
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      }
    )
  })

  // Team cards con animación staggered
  const teamCards = document.querySelectorAll('.team-card-clickable')

  teamCards.forEach((card, index) => {
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

    // Parallax sutil en cada imagen
    const cardImage = card.querySelector('.image-cover')
    if (cardImage && !cardImage.classList.contains('parallax')) {
      gsap.fromTo(cardImage,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  })

}

/**
 * Render principal
 */
export async function renderEquipo() {
  const teamCards = teamMembers.map((member, index) => `
    <div class="team-card-clickable" data-index="${index}">
      <div class="team-card-large">
        <div class="team-large-image">
          <img src="${member.photo}" alt="${member.name}" loading="lazy" class="image-cover" />
        </div>
        <div class="team-card-inner-content">
          <div class="team-large-bottom-tile">
            <div class="team-member-name-large">${member.name}</div>
            <div class="team-member-role-wrap">
              <div class="team-member-role-large">${member.role}</div>
            </div>
          </div>
        </div>
        <div class="team-large-shadow"></div>
      </div>
    </div>
  `).join('')

  const layoutHTML = `
    <main class="w-full flex-1">

      <!-- HERO SECTION -->
      <section class="section hero-equipo">
        <div class="main-container-equipo">
          <div class="headline-equipo">
            <div class="heading-equipo">
              <h1>Nuestro <span class="text-primary">Equipo.</span></h1>
            </div>
            <h6 class="subtitle-equipo">Profesionales comprometidos con la excelencia en cada proyecto.</h6>
          </div>
          <div class="equipo-grid">
            <div class="equipo-contain-image-1">
              <video autoplay muted playsinline class="video-cover parallax">
                <source src="/nosotros/equipo/nosotros-video-800.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
            <div class="equipo-contain-image-2">
              <div class="equipo-absolute-image">
                <img src="https://cdn.prod.website-files.com/699456d718b50304347a3db7/699456d918b50304347a409a_Fluid%20BG.jpeg"
                     loading="lazy"
                     alt="Background gradient"
                     class="image-cover parallax" />
              </div>
              <div class="card-equipo-quote">
                <div class="equipo-card-top-tile">
                  <div class="icon-quote">
                    <svg width="24" height="24" fill="currentColor" fill-opacity="0.48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 19H15C15.65 19 16.26 18.68 16.63 18.16L21 12L16.63 5.84C16.26 5.31 15.65 5 15 5H3L7.5 12L3 19Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div class="quote-text">Somos un equipo especializado en señalética, rotulación y soluciones de imagen corporativa que transforman espacios con profesionalismo y dedicación.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ABOUT SECTION -->
      <section class="section equipo-about-section">
        <div class="main-container-equipo">
          <div class="equipo-halves">
            <div class="label-master-dark">
              <div class="label-small-equipo">Sobre el equipo</div>
            </div>
            <div class="text-h4-equipo">
              Nuestro equipo combina experiencia técnica con creatividad y compromiso.
              <br/><br/>
              Cada miembro aporta su expertise para garantizar resultados excepcionales en cada proyecto de imagen corporativa.
            </div>
          </div>
        </div>
        <img src="https://cdn.prod.website-files.com/699456d718b50304347a3db7/699456d918b50304347a40c2_Dots%20Dark.svg"
             loading="lazy"
             alt="Decorative dots"
             class="equipo-dots" />
      </section>

      <!-- TEAM GRID SECTION -->
      <section class="section-team-grid">
        <div class="main-container-equipo">
          <div class="grid-team-members">
            ${teamCards}
          </div>
        </div>
      </section>

    </main>
  `

  return createLayout({
    content: layoutHTML,
    pageClass: 'page-equipo'
  })
}

/**
 * Inicializa las animaciones de la página Equipo
 * Debe llamarse DESPUÉS de que el HTML esté insertado en el DOM
 */
export function initEquipoAnimations() {
  setTimeout(() => {
    initAnimations()
    ScrollTrigger.refresh()
  }, 100)
}
