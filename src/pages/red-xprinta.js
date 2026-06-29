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
  // HERO: blur + translateX alternando por línea
  const heroLines = document.querySelectorAll('.red-hero-line')
  heroLines.forEach((line, i) => {
    const dir = i % 2 === 0 ? 1 : -1
    gsap.fromTo(line,
      { opacity: 0, filter: 'blur(8px)', x: `${16 * dir}%` },
      { opacity: 1, filter: 'blur(0px)', x: '0%', duration: 1.4, ease: 'power3.out', delay: 0.1 * i }
    )
    gsap.to(line, {
      opacity: 0, filter: 'blur(8px)', x: `${20 * dir}%`,
      scrollTrigger: { trigger: '.red-hero', start: 'top top', end: 'bottom top', scrub: true }
    })
  })

  // DESCRIPCIÓN: fade in
  const descriptionItems = document.querySelectorAll('.red-description-item')
  if (descriptionItems.length) {
    gsap.fromTo(descriptionItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.red-description-section', start: 'top 80%' }
      }
    )
  }

  // SECTORES: stagger reveal
  const sectorCards = document.querySelectorAll('.red-sector-card')
  if (sectorCards.length) {
    gsap.fromTo(sectorCards,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.red-sectors-section', start: 'top 85%' }
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
      <h1 class="red-hero-title">
        <span class="red-hero-line">Una red profesional</span>
        <span class="red-hero-line">en España y Portugal</span>
      </h1>
    </section>

    <!-- DESCRIPCIÓN -->
    <section class="red-description-section">
      <div class="red-description-container">
        <div class="red-description-intro">
          <h2 class="red-section-title">La mayor red de<br>rotulación en la península</h2>
          <p class="red-description-text">
            Xprinta cuenta con una red profesional de 286 puntos distribuidos
            estratégicamente por toda España y Portugal, ofreciendo soluciones integrales
            de imagen corporativa, rotulación y señalética.
          </p>
        </div>

        <div class="red-description-grid">
          <div class="red-description-item">
            <h3 class="red-description-item-title">Cobertura Nacional</h3>
            <p class="red-description-item-text">
              Presencia en todas las comunidades autónomas con equipos locales especializados.
            </p>
          </div>
          <div class="red-description-item">
            <h3 class="red-description-item-title">Experiencia Local</h3>
            <p class="red-description-item-text">
              Cada punto Xprinta conoce su mercado y ofrece soluciones adaptadas a las necesidades locales.
            </p>
          </div>
          <div class="red-description-item">
            <h3 class="red-description-item-title">Calidad Garantizada</h3>
            <p class="red-description-item-text">
              Todos nuestros partners siguen los estándares de calidad y metodología Xprinta.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTORES -->
    <section class="red-sectors-section">
      <div class="red-sectors-container">
        <h2 class="red-section-title">Sectores que atendemos</h2>
        <div class="red-sectors-grid">
          <div class="red-sector-card">
            <h3>Corporativo</h3>
            <p>Soluciones de branding para empresas y organizaciones</p>
          </div>
          <div class="red-sector-card">
            <h3>Distribución</h3>
            <p>Señalética y rotulación para centros de distribución</p>
          </div>
          <div class="red-sector-card">
            <h3>Educación</h3>
            <p>Señalización y wayfinding para centros educativos</p>
          </div>
          <div class="red-sector-card">
            <h3>Industrial</h3>
            <p>Rotulación técnica y de seguridad industrial</p>
          </div>
          <div class="red-sector-card">
            <h3>Logística</h3>
            <p>Señalización eficiente para almacenes y logística</p>
          </div>
          <div class="red-sector-card">
            <h3>Restauración</h3>
            <p>Imagen corporativa para restaurantes y hostelería</p>
          </div>
          <div class="red-sector-card">
            <h3>Retail</h3>
            <p>Soluciones visuales para puntos de venta</p>
          </div>
          <div class="red-sector-card">
            <h3>Sanidad</h3>
            <p>Señalización especializada para centros sanitarios</p>
          </div>
          <div class="red-sector-card">
            <h3>Sector Público</h3>
            <p>Rotulación institucional y de servicio público</p>
          </div>
          <div class="red-sector-card">
            <h3>Servicios</h3>
            <p>Imagen corporativa para empresas de servicios</p>
          </div>
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
