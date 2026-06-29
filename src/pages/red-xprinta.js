/**
 * Página Red Xprinta - Xprinta Pro
 * Mapa interactivo de la red de puntos Xprinta con Google Maps
 * @module pages/red-xprinta
 */

import { createLayout } from '../layout.js'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import xprintaLocationsData from '../data/red-xprinta-locations.json'

gsap.registerPlugin(ScrollTrigger)

// Cargar todas las 286 ubicaciones Xprinta desde JSON
const xprintaLocations = xprintaLocationsData

/**
 * Inicializa el mapa de Google Maps
 */
let map = null
let geocoder = null
let markers = []
let infoWindows = []
let activeInfoWindow = null

function initMap() {
  // Centro de España (aproximado)
  const centerSpain = { lat: 40.4168, lng: -3.7038 }

  const mapElement = document.getElementById('xprinta-map')
  if (!mapElement) return

  // Crear mapa
  map = new google.maps.Map(mapElement, {
    zoom: 6,
    center: centerSpain,
    styles: [
      {
        featureType: 'all',
        elementType: 'geometry',
        stylers: [{ color: '#f5f5f5' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#e9e9e9' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }]
      }
    ],
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true
  })

  geocoder = new google.maps.Geocoder()

  // Crear marcadores para cada ubicación
  xprintaLocations.forEach((location, index) => {
    geocodeAndAddMarker(location, index)
  })
}

/**
 * Geocodifica una dirección y añade un marcador
 */
function geocodeAndAddMarker(location, index) {
  if (!geocoder) return

  geocoder.geocode({ address: location.address }, (results, status) => {
    if (status === 'OK' && results[0]) {
      const position = results[0].geometry.location

      // Crear marcador personalizado
      const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: location.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#FA8029',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2
        },
        animation: google.maps.Animation.DROP,
        optimized: false
      })

      // Crear info window con la info de la ubicación
      const infoContent = `
        <div class="xprinta-marker-info">
          <h3 class="marker-info-title">${location.name}</h3>
          <p class="marker-info-company">${location.company}</p>
          <p class="marker-info-category">${location.category}</p>
          <p class="marker-info-address">${location.address}</p>
          <p class="marker-info-description">${location.description}</p>
        </div>
      `

      const infoWindow = new google.maps.InfoWindow({
        content: infoContent,
        maxWidth: 300
      })

      // Click en marcador: cerrar ventana activa y abrir nueva
      marker.addListener('click', () => {
        if (activeInfoWindow) {
          activeInfoWindow.close()
        }
        infoWindow.open(map, marker)
        activeInfoWindow = infoWindow

        // Animar zoom hacia el marcador
        map.panTo(marker.getPosition())
        map.setZoom(12)
      })

      markers.push(marker)
      infoWindows.push(infoWindow)
    } else {
      console.warn(`Geocoding failed for ${location.name}:`, status)
    }
  })
}

/**
 * Inicializa animaciones GSAP específicas de Red Xprinta
 */
function initRedAnimations() {
  // HERO: fade in y slide up para texto
  gsap.fromTo('.red-hero-title-small',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
  )

  gsap.fromTo('.red-hero-title-main',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
  )

  gsap.fromTo('.red-hero-description',
    { opacity: 0, y: 20 },
    { opacity: 0.8, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
  )

  gsap.fromTo('.red-hero-stats',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
  )

  // DESCRIPCIÓN: fade in header y grid
  const descriptionHeader = document.querySelector('.red-description-header')
  if (descriptionHeader) {
    gsap.fromTo(descriptionHeader,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.red-description-section', start: 'top 75%' }
      }
    )
  }

  const descriptionBlocks = document.querySelectorAll('.red-description-content-block, .red-description-image-block')
  if (descriptionBlocks.length) {
    gsap.fromTo(descriptionBlocks,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.red-description-grid-content', start: 'top 80%' }
      }
    )
  }

  // STATS LARGE: header y números
  const statsHeader = document.querySelector('.red-stats-large-header')
  if (statsHeader) {
    gsap.fromTo(statsHeader,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.red-stats-large-section', start: 'top 75%' }
      }
    )
  }

  const statsItems = document.querySelectorAll('.red-stat-large-item')
  if (statsItems.length) {
    gsap.fromTo(statsItems,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.red-stats-large-grid', start: 'top 80%' }
      }
    )
  }

  // SECTORES: header y cards
  const sectorsHeader = document.querySelector('.red-sectors-header')
  if (sectorsHeader) {
    gsap.fromTo(sectorsHeader,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.red-sectors-section', start: 'top 75%' }
      }
    )
  }

  const sectorCards = document.querySelectorAll('.red-sector-card')
  if (sectorCards.length) {
    gsap.fromTo(sectorCards,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: '.red-sectors-grid', start: 'top 80%' }
      }
    )
  }

  // CTA: animación de entrada
  const ctaImage = document.querySelector('.red-cta-image-block')
  const ctaContent = document.querySelector('.red-cta-content-block')
  if (ctaImage && ctaContent) {
    gsap.fromTo(ctaImage,
      { opacity: 0, x: -50 },
      {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.red-cta-section', start: 'top 75%' }
      }
    )

    gsap.fromTo(ctaContent,
      { opacity: 0, x: 50 },
      {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: '.red-cta-section', start: 'top 75%' }
      }
    )
  }

  // MAPA: fade in
  const mapContainer = document.querySelector('.red-map-container')
  if (mapContainer) {
    gsap.fromTo(mapContainer,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.red-map-section', start: 'top 80%' }
      }
    )
  }
}

/**
 * Renderiza el contenido de la página
 */
export async function renderRedXprinta() {
  const content = `
    <!-- HERO -->
    <section class="red-hero">
      <div class="red-hero-container">
        <div class="red-hero-content">
          <div class="red-hero-text">
            <h1 class="red-hero-title">
              <span class="red-hero-title-small">Red Xprinta</span>
              <span class="red-hero-title-main">Una red profesional en España y Portugal</span>
            </h1>
            <p class="red-hero-description">
              286 puntos estratégicamente distribuidos ofreciendo soluciones integrales
              de imagen corporativa, rotulación y señalética con los más altos estándares de calidad.
            </p>
            <div class="red-hero-stats">
              <div class="red-hero-stat">
                <span class="red-hero-stat-number">286</span>
                <span class="red-hero-stat-label">Puntos</span>
              </div>
              <div class="red-hero-stat">
                <span class="red-hero-stat-number">2</span>
                <span class="red-hero-stat-label">Países</span>
              </div>
              <div class="red-hero-stat">
                <span class="red-hero-stat-number">17</span>
                <span class="red-hero-stat-label">Comunidades</span>
              </div>
            </div>
          </div>
          <div class="red-hero-images">
            <img src="/images/red-hero-1.jpg" alt="Red profesional Xprinta" class="red-hero-image red-hero-image-1">
            <img src="/images/red-hero-2.jpg" alt="Equipo Xprinta" class="red-hero-image red-hero-image-2">
          </div>
        </div>
      </div>
    </section>

    <!-- DESCRIPCIÓN -->
    <section class="red-description-section">
      <div class="red-description-container">
        <div class="red-description-header">
          <span class="red-description-label">LA RED</span>
          <h2 class="red-description-title">La mayor red de rotulación<br>en la península ibérica</h2>
          <p class="red-description-intro-text">
            Xprinta cuenta con una red profesional de 286 puntos distribuidos
            estratégicamente por toda España y Portugal, ofreciendo soluciones integrales
            de imagen corporativa, rotulación y señalética con los más altos estándares de calidad.
          </p>
        </div>

        <!-- Grid de contenido alternado -->
        <div class="red-description-grid-content">
          <!-- Fila 1: Texto + Imagen -->
          <div class="red-description-content-block">
            <h3 class="red-description-block-title">Cobertura Nacional Completa</h3>
            <p class="red-description-block-text">
              Presencia estratégica en todas las comunidades autónomas de España y Portugal.
              Nuestros 286 puntos garantizan respuesta rápida y servicio local especializado
              en cualquier ubicación de la península ibérica.
            </p>
          </div>
          <div class="red-description-image-block">
            <img src="/images/red-description-1.jpg" alt="Instalación profesional de señalética Xprinta" class="red-description-image">
          </div>

          <!-- Fila 2: Imagen + Texto -->
          <div class="red-description-image-block">
            <img src="/images/red-description-2.jpg" alt="Equipo profesional Xprinta" class="red-description-image">
          </div>
          <div class="red-description-content-block">
            <h3 class="red-description-block-title">Experiencia y Conocimiento Local</h3>
            <p class="red-description-block-text">
              Cada punto Xprinta es experto en su mercado local. Conocimiento profundo de
              normativas municipales, proveedores regionales y particularidades de cada zona
              para ofrecer soluciones adaptadas y eficientes.
            </p>
          </div>

          <!-- Fila 3: Texto + Imagen -->
          <div class="red-description-content-block">
            <h3 class="red-description-block-title">Calidad y Metodología Garantizada</h3>
            <p class="red-description-block-text">
              Todos nuestros partners certificados siguen los estándares de calidad Xprinta.
              Metodología unificada, materiales premium y procesos validados que garantizan
              resultados profesionales en cada proyecto.
            </p>
          </div>
          <div class="red-description-image-block">
            <img src="/images/red-description-3.jpg" alt="Red de cobertura Xprinta" class="red-description-image">
          </div>
        </div>
      </div>
    </section>

    <!-- NÚMEROS / STATS GRANDE -->
    <section class="red-stats-large-section">
      <div class="red-stats-large-container">
        <div class="red-stats-large-header">
          <span class="red-stats-large-label">EN CIFRAS</span>
          <h2 class="red-stats-large-title">Una red que abarca<br>toda la península</h2>
        </div>

        <div class="red-stats-large-grid">
          <div class="red-stat-large-item">
            <div class="red-stat-large-number">286</div>
            <div class="red-stat-large-label">Puntos Xprinta</div>
            <p class="red-stat-large-text">
              Cobertura completa en España y Portugal para garantizar proximidad y servicio rápido
            </p>
          </div>

          <div class="red-stat-large-item">
            <div class="red-stat-large-number">17</div>
            <div class="red-stat-large-label">Comunidades Autónomas</div>
            <p class="red-stat-large-text">
              Presencia en todas las regiones con conocimiento local y experiencia sectorial
            </p>
          </div>

          <div class="red-stat-large-item">
            <div class="red-stat-large-number">2</div>
            <div class="red-stat-large-label">Países</div>
            <p class="red-stat-large-text">
              Red peninsular integrada con estándares unificados de calidad y servicio
            </p>
          </div>

          <div class="red-stat-large-item">
            <div class="red-stat-large-number">100%</div>
            <div class="red-stat-large-label">Calidad Certificada</div>
            <p class="red-stat-large-text">
              Todos los partners certificados bajo los estándares Xprinta de excelencia
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTORES -->
    <section class="red-sectors-section">
      <div class="red-sectors-container">
        <div class="red-sectors-header">
          <span class="red-sectors-label">SECTORES</span>
          <h2 class="red-sectors-title">Experiencia profesional<br>en múltiples sectores</h2>
          <p class="red-sectors-subtitle">
            Soluciones especializadas adaptadas a las necesidades específicas de cada industria
          </p>
        </div>

        <div class="red-sectors-grid">
          <div class="red-sector-card">
            <div class="red-sector-card-number">01</div>
            <h3 class="red-sector-card-title">Corporativo</h3>
            <p class="red-sector-card-text">Soluciones integrales de branding e imagen corporativa para empresas y organizaciones de todos los tamaños</p>
          </div>
          <div class="red-sector-card">
            <div class="red-sector-card-number">02</div>
            <h3 class="red-sector-card-title">Retail</h3>
            <p class="red-sector-card-text">Señalización comercial y soluciones visuales para puntos de venta que potencian la identidad de marca</p>
          </div>
          <div class="red-sector-card">
            <div class="red-sector-card-number">03</div>
            <h3 class="red-sector-card-title">Industrial</h3>
            <p class="red-sector-card-text">Rotulación técnica, señalización de seguridad y identificación de espacios industriales</p>
          </div>
          <div class="red-sector-card">
            <div class="red-sector-card-number">04</div>
            <h3 class="red-sector-card-title">Logística</h3>
            <p class="red-sector-card-text">Sistemas de señalización eficientes para almacenes, centros de distribución y operaciones logísticas</p>
          </div>
          <div class="red-sector-card">
            <div class="red-sector-card-number">05</div>
            <h3 class="red-sector-card-title">Sanidad</h3>
            <p class="red-sector-card-text">Señalización especializada para hospitales y centros sanitarios con normativa específica</p>
          </div>
          <div class="red-sector-card">
            <div class="red-sector-card-number">06</div>
            <h3 class="red-sector-card-title">Educación</h3>
            <p class="red-sector-card-text">Señalización y wayfinding para centros educativos, universidades y espacios de formación</p>
          </div>
          <div class="red-sector-card">
            <div class="red-sector-card-number">07</div>
            <h3 class="red-sector-card-title">Hostelería</h3>
            <p class="red-sector-card-text">Imagen corporativa y rotulación para restaurantes, hoteles y espacios de hostelería</p>
          </div>
          <div class="red-sector-card">
            <div class="red-sector-card-number">08</div>
            <h3 class="red-sector-card-title">Sector Público</h3>
            <p class="red-sector-card-text">Rotulación institucional y señalización para organismos públicos y servicios administrativos</p>
          </div>
          <div class="red-sector-card">
            <div class="red-sector-card-number">09</div>
            <h3 class="red-sector-card-title">Distribución</h3>
            <p class="red-sector-card-text">Señalética profesional para centros de distribución y redes de franquicias</p>
          </div>
          <div class="red-sector-card">
            <div class="red-sector-card-number">10</div>
            <h3 class="red-sector-card-title">Servicios</h3>
            <p class="red-sector-card-text">Soluciones de imagen corporativa y rotulación para empresas de servicios profesionales</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="red-cta-section">
      <div class="red-cta-container">
        <div class="red-cta-image-block">
          <img src="/images/red-cta.jpg" alt="Consultoría profesional Xprinta" class="red-cta-image">
        </div>
        <div class="red-cta-content-block">
          <span class="red-cta-label">ENCUENTRA TU PUNTO</span>
          <h2 class="red-cta-title">¿Listo para empezar<br>tu proyecto?</h2>
          <p class="red-cta-text">
            Encuentra el punto Xprinta más cercano a tu ubicación. Nuestros expertos locales
            están preparados para ofrecerte soluciones profesionales adaptadas a las necesidades
            específicas de tu proyecto de rotulación y señalética.
          </p>
          <div class="red-cta-features">
            <div class="red-cta-feature">
              <span class="red-cta-feature-icon">✓</span>
              <span class="red-cta-feature-text">Asesoramiento personalizado</span>
            </div>
            <div class="red-cta-feature">
              <span class="red-cta-feature-icon">✓</span>
              <span class="red-cta-feature-text">Presupuesto sin compromiso</span>
            </div>
            <div class="red-cta-feature">
              <span class="red-cta-feature-icon">✓</span>
              <span class="red-cta-feature-text">Respuesta en menos de 24h</span>
            </div>
          </div>
          <a href="#xprinta-map" class="red-cta-button">Ver mapa de puntos</a>
        </div>
      </div>
    </section>

    <!-- MAPA INTERACTIVO -->
    <section class="red-map-section">
      <div class="red-map-container">
        <div class="red-map-header">
          <h2 class="red-section-title">Encuentra tu punto Xprinta</h2>
          <p class="red-map-subtitle">
            Haz clic en los marcadores para ver la información de cada ubicación
          </p>
        </div>
        <div id="xprinta-map" class="xprinta-map"></div>
        <div class="red-map-stats">
          <div class="red-map-stat">
            <span class="red-map-stat-number">286</span>
            <span class="red-map-stat-label">Puntos Xprinta</span>
          </div>
          <div class="red-map-stat">
            <span class="red-map-stat-number">2</span>
            <span class="red-map-stat-label">Países</span>
          </div>
          <div class="red-map-stat">
            <span class="red-map-stat-number">17</span>
            <span class="red-map-stat-label">Comunidades</span>
          </div>
        </div>
      </div>
    </section>
  `

  // Retornar el HTML envuelto en el layout
  return await createLayout({
    content: content,
    pageClass: 'page-red-xprinta'
  })
}

/**
 * Inicializa la página Red Xprinta
 */
export function initRedXprintaAnimations() {
  // Esperar a que el DOM esté listo y Google Maps esté cargado
  setTimeout(() => {
    initRedAnimations()

    // Inicializar mapa cuando Google Maps esté disponible
    if (typeof google !== 'undefined' && google.maps) {
      initMap()
    } else {
      console.error('Google Maps API no está cargada')
    }

    ScrollTrigger.refresh()
  }, 100)
}
