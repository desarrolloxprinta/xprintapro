/**
 * Página Red Xprinta - Xprinta Pro
 * Layout estilo Regius Group - Contenedores centrados, grids 50/50
 * @module pages/red-xprinta
 */

import { createLayout } from '../layout.js'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import xprintaLocationsData from '../data/red-xprinta-locations.json'

gsap.registerPlugin(ScrollTrigger)

// Cargar todas las 286 ubicaciones Xprinta desde JSON
const xprintaLocations = xprintaLocationsData

// ============================================================
// MAP LOGIC (preserved exactly as-is)
// ============================================================
let map = null
let geocoder = null
let markers = []
let infoWindows = []
let activeInfoWindow = null

function initMap() {
  const centerSpain = { lat: 40.4168, lng: -3.7038 }
  const mapElement = document.getElementById('xprinta-map')
  if (!mapElement) return

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

  xprintaLocations.forEach((location, index) => {
    geocodeAndAddMarker(location, index)
  })
}

function geocodeAndAddMarker(location, index) {
  if (!geocoder) return

  geocoder.geocode({ address: location.address }, (results, status) => {
    if (status === 'OK' && results[0]) {
      const position = results[0].geometry.location

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

      marker.addListener('click', () => {
        if (activeInfoWindow) {
          activeInfoWindow.close()
        }
        infoWindow.open(map, marker)
        activeInfoWindow = infoWindow
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

// ============================================================
// ANIMATIONS
// ============================================================
function initRedAnimations() {
  // Hero
  gsap.fromTo('.rx-hero-label',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 }
  )
  gsap.fromTo('.rx-hero-title',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
  )
  gsap.fromTo('.rx-hero-subtitle',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
  )

  // Section reveals with images
  document.querySelectorAll('.rx-section').forEach(section => {
    const left = section.querySelector('.rx-col-left')
    const right = section.querySelector('.rx-col-right')
    const image = section.querySelector('.rx-image-reveal')

    if (left) {
      gsap.fromTo(left,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 78%' }
        }
      )
    }
    if (right) {
      gsap.fromTo(right,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: section, start: 'top 78%' }
        }
      )
    }
    
    // Image reveal effect
    if (image) {
      gsap.fromTo(image,
        { opacity: 0, scale: 1.1, clipPath: 'inset(10% 10% 10% 10%)' },
        { 
          opacity: 1, 
          scale: 1, 
          clipPath: 'inset(0% 0% 0% 0%)', 
          duration: 1.2, 
          ease: 'power3.out', 
          delay: 0.2,
          scrollTrigger: { trigger: section, start: 'top 75%' }
        }
      )
    }
  })

  // Stat items
  const statItems = document.querySelectorAll('.rx-stat-item')
  if (statItems.length) {
    gsap.fromTo(statItems,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.rx-stats-grid', start: 'top 80%' }
      }
    )
  }

  // Sector cards
  const sectorCards = document.querySelectorAll('.rx-sector-card')
  if (sectorCards.length) {
    gsap.fromTo(sectorCards,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: '.rx-sectors-grid', start: 'top 82%' }
      }
    )
  }

  // Map
  const mapContainer = document.querySelector('.rx-map-wrap')
  if (mapContainer) {
    gsap.fromTo(mapContainer,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.rx-map-section', start: 'top 80%' }
      }
    )
  }
}

// ============================================================
// RENDER
// ============================================================
export async function renderRedXprinta() {
  const content = `
    <!-- HERO (Regius: centered text, no images, clean) -->
    <section class="rx-hero">
      <div class="rx-container">
        <span class="rx-hero-label">RED XPRINTA</span>
        <h1 class="rx-hero-title">Una red profesional<br>en España y Portugal</h1>
        <p class="rx-hero-subtitle">
          286 puntos estratégicamente distribuidos ofreciendo soluciones integrales
          de imagen corporativa, rotulación y señalética con los más altos estándares de calidad.
        </p>
      </div>
    </section>

    <!-- SECTION 1: La Red (Regius 50/50 grid) -->
    <section class="rx-section">
      <div class="rx-container rx-grid-50">
        <div class="rx-col-left">
          <span class="rx-label">LA RED</span>
          <h2 class="rx-section-title">La mayor red de rotulación en la península ibérica</h2>
        </div>
        <div class="rx-col-right">
          <p class="rx-body-text">
            Xprinta cuenta con una red profesional de 286 puntos distribuidos
            estratégicamente por toda España y Portugal, ofreciendo soluciones integrales
            de imagen corporativa, rotulación y señalética con los más altos estándares de calidad.
          </p>
        </div>
      </div>
    </section>

    <!-- MAP (moved here, right after LA RED) -->
    <section class="rx-map-section">
      <div class="rx-container">
        <div class="rx-map-header">
          <span class="rx-label">MAPA INTERACTIVO</span>
          <h2 class="rx-section-title rx-centered">Encuentra tu punto Xprinta</h2>
          <p class="rx-body-text rx-centered rx-narrow">
            Haz clic en los marcadores para ver la información de cada ubicación
          </p>
        </div>
        <div class="rx-map-wrap">
          <div id="xprinta-map" class="xprinta-map"></div>
        </div>
      </div>
    </section>

    <!-- STATS (Regius: horizontal stat row with dividers) -->
    <section class="rx-section rx-stats-section">
      <div class="rx-container">
        <div class="rx-stats-grid">
          <div class="rx-stat-item">
            <div class="rx-stat-number">286</div>
            <div class="rx-stat-label">Puntos Xprinta</div>
            <p class="rx-stat-text">Cobertura completa en España y Portugal para garantizar proximidad y servicio rápido</p>
          </div>
          <div class="rx-stat-item">
            <div class="rx-stat-number">17</div>
            <div class="rx-stat-label">Comunidades Autónomas</div>
            <p class="rx-stat-text">Presencia en todas las regiones con conocimiento local y experiencia sectorial</p>
          </div>
          <div class="rx-stat-item">
            <div class="rx-stat-number">2</div>
            <div class="rx-stat-label">Países</div>
            <p class="rx-stat-text">Red peninsular integrada con estándares unificados de calidad y servicio</p>
          </div>
          <div class="rx-stat-item">
            <div class="rx-stat-number">100%</div>
            <div class="rx-stat-label">Calidad Certificada</div>
            <p class="rx-stat-text">Todos los partners certificados bajo los estándares Xprinta de excelencia</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: Cobertura (Regius 50/50 grid with image) -->
    <section class="rx-section">
      <div class="rx-container rx-grid-50">
        <div class="rx-col-left">
          <span class="rx-label">COBERTURA</span>
          <h2 class="rx-section-title">Cobertura Nacional Completa</h2>
          <p class="rx-body-text">
            Presencia estratégica en todas las comunidades autónomas de España y Portugal.
            Nuestros 286 puntos garantizan respuesta rápida y servicio local especializado
            en cualquier ubicación de la península ibérica.
          </p>
        </div>
        <div class="rx-col-right rx-image-container">
          <img src="/red-xprinta/pexels-jbarbozameca-38302372.jpg" alt="Cobertura Xprinta" class="rx-image-reveal">
        </div>
      </div>
    </section>

    <!-- SECTION 3: Experiencia (Regius 50/50 alternate) -->
    <section class="rx-section">
      <div class="rx-container rx-grid-50">
        <div class="rx-col-left rx-image-container">
          <img src="/red-xprinta/logotipo-para-fachada-2-2-768x1024.jpeg" alt="Experiencia Xprinta" class="rx-image-reveal">
        </div>
        <div class="rx-col-right">
          <span class="rx-label">EXPERIENCIA</span>
          <h2 class="rx-section-title">Experiencia y Conocimiento Local</h2>
          <p class="rx-body-text">
            Cada punto Xprinta es experto en su mercado local. Conocimiento profundo de
            normativas municipales, proveedores regionales y particularidades de cada zona
            para ofrecer soluciones adaptadas y eficientes.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 4: Calidad (Regius 50/50 grid with image) -->
    <section class="rx-section">
      <div class="rx-container rx-grid-50">
        <div class="rx-col-left">
          <span class="rx-label">CALIDAD</span>
          <h2 class="rx-section-title">Calidad y Metodología Garantizada</h2>
          <p class="rx-body-text">
            Todos nuestros partners certificados siguen los estándares de calidad Xprinta.
            Metodología unificada, materiales premium y procesos validados que garantizan
            resultados profesionales en cada proyecto.
          </p>
        </div>
        <div class="rx-col-right rx-image-container">
          <img src="/red-xprinta/wrap.jpg" alt="Calidad Xprinta" class="rx-image-reveal">
        </div>
      </div>
    </section>

    <!-- SECTORS (Regius: centered title + card grid) -->
    <section class="rx-section rx-sectors-section">
      <div class="rx-container">
        <div class="rx-sectors-header">
          <span class="rx-label">SECTORES</span>
          <h2 class="rx-section-title rx-centered">Experiencia profesional<br>en múltiples sectores</h2>
          <p class="rx-body-text rx-centered rx-narrow">
            Soluciones especializadas adaptadas a las necesidades específicas de cada industria
          </p>
        </div>
        <div class="rx-sectors-grid">
          <div class="rx-sector-card">
            <div class="rx-sector-number">01</div>
            <h3 class="rx-sector-title">Corporativo</h3>
            <p class="rx-sector-text">Soluciones integrales de branding e imagen corporativa para empresas y organizaciones de todos los tamaños</p>
          </div>
          <div class="rx-sector-card">
            <div class="rx-sector-number">02</div>
            <h3 class="rx-sector-title">Retail</h3>
            <p class="rx-sector-text">Señalización comercial y soluciones visuales para puntos de venta que potencian la identidad de marca</p>
          </div>
          <div class="rx-sector-card">
            <div class="rx-sector-number">03</div>
            <h3 class="rx-sector-title">Industrial</h3>
            <p class="rx-sector-text">Rotulación técnica, señalización de seguridad y identificación de espacios industriales</p>
          </div>
          <div class="rx-sector-card">
            <div class="rx-sector-number">04</div>
            <h3 class="rx-sector-title">Logística</h3>
            <p class="rx-sector-text">Sistemas de señalización eficientes para almacenes, centros de distribución y operaciones logísticas</p>
          </div>
          <div class="rx-sector-card">
            <div class="rx-sector-number">05</div>
            <h3 class="rx-sector-title">Sanidad</h3>
            <p class="rx-sector-text">Señalización especializada para hospitales y centros sanitarios con normativa específica</p>
          </div>
          <div class="rx-sector-card">
            <div class="rx-sector-number">06</div>
            <h3 class="rx-sector-title">Educación</h3>
            <p class="rx-sector-text">Señalización y wayfinding para centros educativos, universidades y espacios de formación</p>
          </div>
          <div class="rx-sector-card">
            <div class="rx-sector-number">07</div>
            <h3 class="rx-sector-title">Hostelería</h3>
            <p class="rx-sector-text">Imagen corporativa y rotulación para restaurantes, hoteles y espacios de hostelería</p>
          </div>
          <div class="rx-sector-card">
            <div class="rx-sector-number">08</div>
            <h3 class="rx-sector-title">Sector Público</h3>
            <p class="rx-sector-text">Rotulación institucional y señalización para organismos públicos y servicios administrativos</p>
          </div>
          <div class="rx-sector-card">
            <div class="rx-sector-number">09</div>
            <h3 class="rx-sector-title">Distribución</h3>
            <p class="rx-sector-text">Señalética profesional para centros de distribución y redes de franquicias</p>
          </div>
          <div class="rx-sector-card">
            <div class="rx-sector-number">10</div>
            <h3 class="rx-sector-title">Servicios</h3>
            <p class="rx-sector-text">Soluciones de imagen corporativa y rotulación para empresas de servicios profesionales</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA (Regius: 50/50 text + features left, button) -->
    <section class="rx-section rx-cta-section">
      <div class="rx-container rx-grid-50">
        <div class="rx-col-left">
          <span class="rx-label">ENCUENTRA TU PUNTO</span>
          <h2 class="rx-section-title">¿Listo para empezar<br>tu proyecto?</h2>
          <p class="rx-body-text">
            Encuentra el punto Xprinta más cercano a tu ubicación. Nuestros expertos locales
            están preparados para ofrecerte soluciones profesionales adaptadas a las necesidades
            específicas de tu proyecto de rotulación y señalética.
          </p>
          <div class="rx-cta-features">
            <div class="rx-cta-feature">
              <span class="rx-cta-check">✓</span>
              <span>Asesoramiento personalizado</span>
            </div>
            <div class="rx-cta-feature">
              <span class="rx-cta-check">✓</span>
              <span>Presupuesto sin compromiso</span>
            </div>
            <div class="rx-cta-feature">
              <span class="rx-cta-check">✓</span>
              <span>Respuesta en menos de 24h</span>
            </div>
          </div>
          <a href="#xprinta-map" class="rx-cta-button">Ver mapa de puntos</a>
        </div>
        <div class="rx-col-right rx-col-visual">
          <div class="rx-cta-visual">
            <img src="/red-xprinta/empezar-proyecto.jpg" alt="Consultoría profesional Xprinta" class="rx-cta-image rx-image-reveal">
          </div>
        </div>
      </div>
    </section>


  `

  return await createLayout({
    content: content,
    pageClass: 'page-red-xprinta'
  })
}

/**
 * Inicializa la página Red Xprinta
 */
export function initRedXprintaAnimations() {
  setTimeout(() => {
    initRedAnimations()

    if (typeof google !== 'undefined' && google.maps) {
      initMap()
    } else {
      console.error('Google Maps API no está cargada')
    }

    ScrollTrigger.refresh()
  }, 100)
}
