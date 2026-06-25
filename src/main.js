import './style.css'
import './styles/proyectos.css'
import './styles/servicios.css'
import './styles/brandcare.css'
import content from './data/content.json'
import puntos from './data/puntos.json'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import DotsField from './DotsField'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

gsap.registerPlugin(ScrollTrigger)

// ==========================================================================
// Imports - Sistema Universal
// ==========================================================================

import { initDynamicHeader } from './layout.js'
import { getRedeiaHTML } from './pages/proyectos/redeia.js'
import { getArvalHTML } from './pages/proyectos/arval.js'
import { getHomeHTML } from './pages/home.js'
import { getProyectosHTML, initProyectosDirectory } from './pages/proyectos.js'
import { getServiciosHTML, initServiciosDirectory } from './pages/servicios.js'
import { getBrandCareHTML, initBrandCareDirectory } from './pages/brandcare.js'
import { getBrandCenterHTML, initBrandCenterDirectory } from './pages/brandcenter.js'
import { getBrandCheckHTML, initBrandCheckDirectory } from './pages/brandcheck.js'
import { getBrandCommerceHTML, initBrandCommerceDirectory } from './pages/brandcommerce.js'
import { getBrandGuideHTML, initBrandGuideDirectory } from './pages/brandguide.js'
import { getBrandLegalHTML, initBrandLegalDirectory } from './pages/brandlegal.js'
import { getBrandSignalHTML, initBrandSignalDirectory } from './pages/brandsignal.js'
import { getBrandSurveysHTML, initBrandSurveysDirectory } from './pages/brandsurveys.js'
import { getBrandToolsHTML, initBrandToolsDirectory } from './pages/brandtools.js'
import { getBrandVisionHTML, initBrandVisionDirectory } from './pages/brandvision.js'
import { renderAhorroCostes } from './pages/ahorro-costes.js'
import { renderEcosign } from './pages/ecosign.js'
import { renderFinanciacion } from './pages/financiacion.js'
import { renderGarantia } from './pages/garantia.js'
import { renderGestionProyectos } from './pages/gestion-proyectos.js'
import { renderLegalizacion } from './pages/legalizacion.js'
import { renderProveedorUnificado } from './pages/proveedor-unificado.js'
import { renderProyectoPic } from './pages/proyecto-pic.js'
import { renderRedProfesional } from './pages/red-profesional.js'
import { renderTrazabilidadProducto } from './pages/trazabilidad-producto.js'

// ==========================================================================
// Router - Sistema de Layout Universal (AHORA ASYNC)
// ==========================================================================

const pageType = document.body.dataset.page;

// Función async para cargar páginas dinámicamente
async function loadPage() {
  const app = document.querySelector('#app');

  if (pageType === 'proyecto-redeia') {
    // Proyecto Redeia usando plantilla universal
    app.innerHTML = await getRedeiaHTML();
  } else if (pageType === 'proyecto-arval') {
    // Proyecto Arval usando plantilla universal
    app.innerHTML = await getArvalHTML();
  } else if (pageType === 'proyectos') {
    // Directorio de Proyectos - Carga dinámica desde Supabase
    app.innerHTML = await getProyectosHTML();
  } else if (pageType === 'servicios') {
    // Directorio de Servicios
    app.innerHTML = await getServiciosHTML();
  } else if (pageType === 'brandcare') {
    // Servicio Individual BrandCare
    app.innerHTML = await getBrandCareHTML();
  } else if (pageType === 'brandcenter') {
    // Servicio Individual BrandCenter
    app.innerHTML = await getBrandCenterHTML();
  } else if (pageType === 'brandcheck') {
    // Servicio Individual BrandCheck
    app.innerHTML = await getBrandCheckHTML();
  } else if (pageType === 'brandcommerce') {
    // Servicio Individual BrandCommerce
    app.innerHTML = await getBrandCommerceHTML();
  } else if (pageType === 'brandguide') {
    // Servicio Individual BrandGuide
    app.innerHTML = await getBrandGuideHTML();
  } else if (pageType === 'brandlegal') {
    // Servicio Individual BrandLegal
    app.innerHTML = await getBrandLegalHTML();
  } else if (pageType === 'brandsignal') {
    // Servicio Individual BrandSignal
    app.innerHTML = await getBrandSignalHTML();
  } else if (pageType === 'brandsurveys') {
    // Servicio Individual BrandSurveys
    app.innerHTML = await getBrandSurveysHTML();
  } else if (pageType === 'brandtools') {
    // Servicio Individual BrandTools
    app.innerHTML = await getBrandToolsHTML();
  } else if (pageType === 'brandvision') {
    // Servicio Individual BrandVision
    app.innerHTML = await getBrandVisionHTML();
    setTimeout(() => initBrandVisionDirectory(), 0);
  } else if (pageType === 'ahorro-costes') {
    // Página Ahorro de Costes
    app.innerHTML = await renderAhorroCostes();
  } else if (pageType === 'ecosign') {
    // Página ECOSIGN
    app.innerHTML = await renderEcosign();
  } else if (pageType === 'financiacion') {
    // Página Financiación de Clientes
    app.innerHTML = await renderFinanciacion();
  } else if (pageType === 'garantia') {
    // Página Garantía Xprinta
    app.innerHTML = await renderGarantia();
  } else if (pageType === 'gestion-proyectos') {
    // Página Gestión de Proyectos
    app.innerHTML = await renderGestionProyectos();
  } else if (pageType === 'legalizacion') {
    // Página Legalización
    app.innerHTML = await renderLegalizacion();
  } else if (pageType === 'proveedor-unificado') {
    // Página Proveedor Unificado
    app.innerHTML = await renderProveedorUnificado();
  } else if (pageType === 'proyecto-pic') {
    // Página Proyecto PIC
    app.innerHTML = await renderProyectoPic();
  } else if (pageType === 'red-profesional') {
    // Página Red Profesional
    app.innerHTML = await renderRedProfesional();
  } else if (pageType === 'trazabilidad-producto') {
    // Página Trazabilidad de Producto
    app.innerHTML = await renderTrazabilidadProducto();
  } else {
    // Home usando plantilla universal - CARGA DINÁMICA DESDE SUPABASE
    app.innerHTML = await getHomeHTML();
  }

  // IMPORTANTE: Inicializar header dinámico DESPUÉS de cargar el HTML
  // Esperar un tick para que el DOM se actualice
  setTimeout(() => {
    initDynamicHeader();
  }, 0);

  // IMPORTANTE: Inicializar animaciones en TODAS las páginas
  // (incluye cursor personalizado, smooth scroll, y animaciones con condicionales)
  initAnimations();

  if (pageType === 'proyectos') {
    initProyectosDirectory();
  } else if (pageType === 'servicios') {
    initServiciosDirectory();
  }
}

// Cargar la página
loadPage().catch(error => {
  console.error('Error cargando página:', error);
});

// ==========================================================================
// Initialization & Animations
// ==========================================================================
const initAnimations = () => {
  // --- Hero Slider Futuristic Animation ---
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    let currentSlide = 0;
    
    // Initial Ken Burns on first slide
    gsap.set(slides[0], { opacity: 1, zIndex: 2, clipPath: 'none' });
    const firstVideo = slides[0].querySelector('video');
    if (firstVideo) {
      firstVideo.currentTime = 0;
      firstVideo.play().catch(e => {});
    } else {
      gsap.to(slides[0], { scale: 1.1, duration: 6, ease: "none" });
    }

    let transitionTimeout = null;

    const playActiveSlide = (index) => {
      const slide = slides[index];
      const video = slide.querySelector('video');

      if (video) {
        video.currentTime = 0;
        video.play().catch(e => {});

        let triggered = false;
        video.ontimeupdate = () => {
          // Trigger next slide transition exactly 1.2 seconds before the video ends
          if (!triggered && video.duration && (video.duration - video.currentTime <= 1.2)) {
            triggered = true;
            video.ontimeupdate = null;
            nextSlide();
          }
        };
        video.onended = () => {
          if (!triggered) {
            triggered = true;
            nextSlide();
          }
        };
      } else {
        // Fallback for images
        transitionTimeout = setTimeout(nextSlide, 5000);
      }
    };

    const nextSlide = () => {
      clearTimeout(transitionTimeout);
      const prev = currentSlide;
      currentSlide = (currentSlide + 1) % slides.length;
      
      const outgoing = slides[prev];
      const incoming = slides[currentSlide];
      
      const outVideo = outgoing.querySelector('video');
      if (outVideo) {
        outVideo.ontimeupdate = null;
        outVideo.onended = null;
      }
      
      // Prep incoming: on top, opacity 1, hidden via clip-path
      gsap.set(incoming, { 
        zIndex: 3, 
        opacity: 1,
        scale: 1,
        clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" // Start hidden at right edge
      });
      gsap.set(outgoing, { zIndex: 2 }); // outgoing stays visible underneath initially
      
      // Animate clip-path to swipe left to right revealing incoming
      gsap.to(incoming, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.2,
        ease: "power3.inOut"
      });
      
      const inVideo = incoming.querySelector('video');
      if (!inVideo) {
        gsap.to(incoming, {
          scale: 1.1,
          duration: 6,
          ease: "none"
        });
      }
      
      playActiveSlide(currentSlide);
      
      // Cleanup outgoing after transition
      gsap.to(outgoing, {
        opacity: 0,
        duration: 0.1,
        delay: 1.2,
        onComplete: () => {
          gsap.set(outgoing, { zIndex: 1, clipPath: 'none' });
          if (outVideo) {
            outVideo.pause();
          }
        }
      });
    };

    // Initial trigger
    playActiveSlide(0);
  }

  // --- Scroll Animations --- (Smooth Scroll)
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // 2. Hero Entry Animation (Butter smooth reveal) - Solo para páginas de proyecto
  const heroElement = document.querySelector('#hero');
  if (heroElement && document.querySelector('#hero .gsap-reveal')) {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out', duration: 1.5 },
      onComplete: () => {
        document.querySelector('.ark-hero-desc')?.classList.add('revealed');
      }
    })
    tl.to('#hero .gsap-reveal', {
      y: 0,
      opacity: 1,
      visibility: 'visible',
      stagger: 0.2,
      duration: 1.5
    }, "-=1")

    // Parallax glass scroll effect
    const arkHeroContent = document.querySelector('.ark-hero-content');
    if (arkHeroContent) {
      gsap.to('.ark-hero-content', {
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: -80,
        opacity: 0.15,
        filter: 'blur(8px)',
        ease: 'none'
      });
    }
  }

  // 3. ScrollTrigger Reveal for normal sections
  const revealElements = document.querySelectorAll('.gsap-reveal:not(#hero .gsap-reveal):not(.gsap-bento-item)')
  revealElements.forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 0,
      opacity: 1,
      visibility: 'visible',
      duration: 1.2,
      ease: 'power3.out'
    })
  })

  // 4. Staggered reveal for Bento Grid
  if (document.querySelector('#sectores .bento-grid')) {
    ScrollTrigger.create({
      trigger: '#sectores .bento-grid',
      start: 'top 80%',
      onEnter: () => {
        gsap.to('.gsap-bento-item', {
          y: 0,
          opacity: 1,
          visibility: 'visible',
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out'
        })
      }
    })
  }

  // 5. Interactive Pinned Scroll Timeline (Map Section) - Solo para páginas de proyecto
  const redNacionalContainer = document.querySelector('#red-nacional-container');
  if (redNacionalContainer) {
    const initMapAnimation = () => {
      // Create a timeline that is locked to the scrollbar
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#red-nacional-container",
          pin: true,           // Locks the section on the screen
          start: "top top+=100px", // Pin it securely below the fixed navbar
          end: "+=200%",       // Forces the user to scroll down an extra 200% of height to finish the animation
          scrub: 1             // Smoothly scrub the timeline based on scroll position
        }
      })

      // Fade the map AND the title in throughout the scroll duration
      tl.to("#static-map-image", { opacity: 0.8, duration: 4 }, 0)
      tl.to("#red-nacional-title", { opacity: 1, duration: 4 }, 0)

      // Sequence the stats
      const statBlocks = document.querySelectorAll('.stat-block')
      statBlocks.forEach((block, index) => {
        const counter = block.querySelector('.stat-counter')
        const startPos = index * 1.2 // Stagger the start time of each block

        // Block slides up and fades in
        tl.to(block, { opacity: 1, y: 0, duration: 1 }, startPos)

        if (counter) {
          const target = +counter.getAttribute('data-target')
          let obj = { val: 0 }
          // Counter increments synchronously
          tl.to(obj, {
            val: target,
            duration: 1,
            onUpdate: () => {
              counter.innerHTML = Math.floor(obj.val).toLocaleString('es-ES')
            }
          }, startPos)
        }
      })
    }
    initMapAnimation()
  }

  // 6. Interactive Pinned Scroll for Process (Must init AFTER Map)
  const initProcessAnimation = () => {
    const items = document.querySelectorAll('.process-item-animated');
    if (!items.length) return;

    const lottieContainer = document.querySelector('#lottie-bar');
    if (!lottieContainer) return;
    
    // Clear container
    lottieContainer.innerHTML = '';

    // Initialize custom Canvas WebGL particles field (3D Sphere version)
    const dotsField = new DotsField(lottieContainer, {
      height: 1200, 
      sphereRadius: 450,
      count: 16000,
      dotColor: "#000000",
      accentColor: "#F18108",
      accentRatio: 0.4,
      alpha: 0.95,
      idleSpeed: 0.5,
      rotationSpeed: 0.25,
      core: false
    });

    const processTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#proceso-container",
        pin: true,
        start: "top top", // Prevent overlap by pinning exactly at top
        end: "+=1200%", // Very long scroll distance for comfortable reading and pauses
        scrub: 1,
        onUpdate: (self) => {
          // Pass exactly the scroll progress to our canvas animation
          dotsField.setProgress(self.progress);
        }
      }
    });

    const wrapper = document.querySelector('.process-list-wrapper');
    const parentHeight = wrapper.parentElement.offsetHeight;

    // Set initial state: first item perfectly centered and fully visible
    const startY = (parentHeight / 2) - items[0].offsetTop - (items[0].offsetHeight / 2);
    gsap.set(wrapper, { y: startY });
    gsap.set(items[0], { opacity: 1 });

    // Initial pause for reading the first item
    processTl.to({}, { duration: 1 });

    items.forEach((item, i) => {
      if (i === 0) return; // Skip first item as it's already centered
      
      const targetY = (parentHeight / 2) - item.offsetTop - (item.offsetHeight / 2);
      
      // Move wrapper to center the NEXT item
      processTl.to(wrapper, {
        y: targetY,
        ease: "power2.inOut",
        duration: 1
      }, `step${i}`);
      
      // Fade out PREVIOUS item
      processTl.to(items[i - 1], {
        opacity: 0.1,
        duration: 0.4,
        ease: "none"
      }, `step${i}`);
      
      // Fade in CURRENT item
      processTl.to(item, {
        opacity: 1,
        duration: 0.4,
        ease: "none"
      }, `step${i}+=0.6`);
      
      // READ TIME PAUSE: Wait while user scrolls before moving to next item
      processTl.to({}, { duration: 1.5 });
    });
  }
  initProcessAnimation();

  // 5. Custom Premium Cursor (Noteworthy Style 100%)
  const cursorDot = document.querySelector('.custom-cursor__dot');
  const cursorRing = document.querySelector('.custom-cursor__ring');
  const cursorText = document.querySelector('.custom-cursor__text');

  if (cursorDot && cursorRing) {
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorRing, { xPercent: -50, yPercent: -50 });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;
    let hoverTarget = null;
    let isTextHover = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursorDot, { x: mouseX, y: mouseY, duration: 0, overwrite: 'auto' });
    });

    gsap.ticker.add(() => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      gsap.set(cursorRing, { x: ringX, y: ringY });
    });

    const handleHoverEnter = (e) => {
      isHovering = true;
      hoverTarget = e.currentTarget;
      const target = e.currentTarget;
      const cursorType = target.getAttribute('data-cursor');
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || cursorType === 'text';
      isTextHover = isInput;
      
      if (isInput) {
        // Text state: ring disappears, dot morphs into I-beam
        gsap.to(cursorRing, { width: 0, height: 0, opacity: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(cursorDot, { 
          width: 4, 
          height: 28, 
          borderRadius: '500% / 71.4%', 
          borderWidth: 0,
          scale: 1,
          duration: 0.3, 
          ease: 'power2.out' 
        });
      } else if (cursorType === 'nw-view') {
        cursorText.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(-45deg);"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
        gsap.to(cursorText, { opacity: 1, duration: 0.3 });
        gsap.fromTo(cursorText.querySelector('svg'), 
          { x: -15, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
        );
        gsap.to(cursorRing, { 
          width: 80, 
          height: 80, 
          opacity: 1, 
          borderRadius: '50%',
          backgroundColor: '#fff',
          border: 'none',
          backdropFilter: 'none',
          duration: 0.5, 
          ease: 'power3.out' 
        });
        gsap.to(cursorDot, { scale: 0, duration: 0.2 });
      } else if (cursorType) {
        // Text bubble inside the expanded ring
        cursorText.textContent = cursorType;
        cursorText.style.color = '#fff';
        gsap.to(cursorText, { opacity: 1, duration: 0.3 });
        gsap.to(cursorRing, { 
          width: 90, 
          height: 90, 
          opacity: 1, 
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 90, 0, 0.9)',
          border: 'none',
          backdropFilter: 'none',
          duration: 0.4, 
          ease: 'power3.out' 
        });
        gsap.to(cursorDot, { scale: 0, duration: 0.2 });
      } else {
        // Interactive element hover: ring expands around the cursor
        gsap.to(cursorRing, { 
          width: 60, 
          height: 60, 
          opacity: 0.7, 
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(1.5px)',
          duration: 0.4, 
          ease: 'power3.out' 
        });
        
        // Dot remains unchanged (20px white exclusion)
        gsap.to(cursorDot, { 
          width: 20, 
          height: 20, 
          borderRadius: '20px', 
          borderWidth: 2,
          scale: 1,
          duration: 0.3, 
          ease: 'power2.out' 
        });
      }
    };

    const handleHoverLeave = () => {
      isHovering = false;
      hoverTarget = null;
      isTextHover = false;
      
      // Revert ring
      gsap.to(cursorText, { opacity: 0, duration: 0.2 });
      gsap.to(cursorRing, { 
        width: 0, 
        height: 0, 
        opacity: 0, 
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(1.5px)',
        duration: 0.3, 
        ease: 'power2.out' 
      });
      
      // Revert dot
      gsap.to(cursorDot, { 
        width: 20, 
        height: 20, 
        borderRadius: '20px', 
        borderWidth: 2,
        scale: 1,
        duration: 0.3, 
        ease: 'power2.out' 
      });
    };

    document.querySelectorAll('a, button, .bento-item, .stat-block, input, textarea, .btn-regius, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', handleHoverEnter);
      el.addEventListener('mouseleave', handleHoverLeave);
    });

    // Control video playback on project card hovers
    document.querySelectorAll('.nw-project-card').forEach(card => {
      const video = card.querySelector('.nw-project-video');
      if (video) {
        card.addEventListener('mouseenter', () => {
          video.currentTime = 0;
          video.play().catch(err => console.log('Video play interrupted:', err));
        });
        card.addEventListener('mouseleave', () => {
          video.pause();
        });
      }
    });
  }

  // PROJECT PAGE GOOGLE MAPS INITIALIZATION
  if (document.getElementById('google-map')) {
    window.initProjectMap = () => {
      const mapElement = document.getElementById('google-map');

      // Premium styled map
      const mapStyle = [
        {featureType: "administrative.province", elementType: "all", stylers: [{visibility: "off"}]},
        {featureType: "administrative.locality", elementType: "labels", stylers: [{lightness: "-8"}]},
        {featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{color: "#000000"}]},
        {featureType: "administrative.locality", elementType: "labels.text.stroke", stylers: [{visibility: "off"}]},
        {featureType: "administrative.neighborhood", elementType: "all", stylers: [{color: "#acacac"}]},
        {featureType: "administrative.neighborhood", elementType: "labels.text.fill", stylers: [{color: "#484848"}]},
        {featureType: "administrative.neighborhood", elementType: "labels.text.stroke", stylers: [{color: "#ff0000"}, {visibility: "off"}]},
        {featureType: "landscape", elementType: "all", stylers: [{hue: "#FFAD00"}, {saturation: 10.2}, {lightness: -10.2}, {gamma: 1}]},
        {featureType: "poi", elementType: "all", stylers: [{hue: "#FFAD00"}, {saturation: "7.7"}, {lightness: "-5.47"}, {gamma: 1}]},
        {featureType: "poi.school", elementType: "all", stylers: [{lightness: "-2"}, {gamma: "1.00"}]},
        {featureType: "road.highway", elementType: "all", stylers: [{hue: "#FFAD00"}, {saturation: -52.2}, {lightness: -4.6}, {gamma: 1}]},
        {featureType: "road.arterial", elementType: "all", stylers: [{hue: "#FFAD00"}, {saturation: -17.8}, {lightness: -4.3}, {gamma: 1}]},
        {featureType: "road.local", elementType: "all", stylers: [{hue: "#FFAD00"}, {saturation: -22}, {lightness: -3.9}, {gamma: 1}]},
        {featureType: "transit", elementType: "all", stylers: [{visibility: "on"}]},
        {featureType: "water", elementType: "all", stylers: [{hue: "#FFAD00"}, {saturation: -78}, {lightness: 67.6}, {gamma: 1}]}
      ];

      const map = new google.maps.Map(mapElement, {
        zoom: 6.6,
        center: { lat: 39.5, lng: -6.5 },
        styles: mapStyle,
        disableDefaultUI: true,
        backgroundColor: '#0a0a0a',
        gestureHandling: "none"
      });

      const markersStr = mapElement.getAttribute('data-markers');
      if (markersStr) {
        try {
          const markers = JSON.parse(markersStr);
          const bounds = new google.maps.LatLngBounds();

          const markerIcon = {
            path: "M 0,0 m -10,0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
            fillColor: '#F18108',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#ffffff',
            scale: 1.4
          };

          markers.forEach(markerPos => {
            new google.maps.Marker({
              position: markerPos,
              map: map,
              icon: markerIcon
            });
            bounds.extend(markerPos);
          });

          if (markers.length > 0) {
            setTimeout(() => {
              if (markers.length === 1) {
                // Un solo marcador: centrarlo y desplazar hacia la derecha
                // para compensar el gradiente negro de la izquierda
                map.setCenter(markers[0]);
                map.setZoom(11);

                // Desplazar el mapa hacia la derecha (25% del ancho del contenedor)
                // para que el marcador quede más visible en la parte derecha
                const mapWidth = mapElement.offsetWidth;
                map.panBy(-mapWidth * 0.25, 0);
              } else {
                // Múltiples marcadores: usar padding asimétrico
                // Más padding a la izquierda para compensar el gradiente negro
                map.fitBounds(bounds, {
                  left: mapElement.offsetWidth * 0.35,   // 35% padding izquierda
                  right: mapElement.offsetWidth * 0.05,  // 5% padding derecha
                  top: 50,
                  bottom: 50
                });
              }
            }, 100);
          }
        } catch (e) {
          console.error('Error parsing markers:', e);
        }
      }
    };

    if (window.google && window.google.maps) {
      window.initProjectMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAI2t5YjVo0PA48446eeMzLwUgRrrSz9sw&callback=initProjectMap';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }

  // PROJECT PAGE LIGHTBOX INITIALIZATION
  // Inject Lightbox HTML if not exists
  if (!document.getElementById('nw-lightbox')) {
    const lb = document.createElement('div');
    lb.id = 'nw-lightbox';
    lb.innerHTML = '<img src="" alt="Zoomed view" />';
    document.body.appendChild(lb);

    // Close lightbox on click
    lb.addEventListener('click', () => {
      lb.classList.remove('active');
      setTimeout(() => lb.querySelector('img').src = '', 400); // clean up after fade
    });
  }

  // Bind Lightbox clicks to blueprint and gallery images
  document.querySelectorAll('.blueprint-pinned-img, .parallax-img').forEach(img => {
    img.classList.add('lightbox-trigger');
    img.addEventListener('click', () => {
      const lb = document.getElementById('nw-lightbox');
      lb.querySelector('img').src = img.src;
      lb.classList.add('active');
    });
  });

  // PROJECT PAGE ANIMATIONS (Noteworthy style)
  const projectHero = document.querySelector('.project-hero');
  if (projectHero) {
    // 1. Hero Load Timeline - Animate title and media
    const heroTitleInner = document.querySelector('.hero-title-inner');
    const heroMediaWrapper = document.querySelector('.hero-media-wrapper');

    if (heroTitleInner && heroMediaWrapper) {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.to('.hero-title-inner', {
        y: '0%',
        duration: 1.8,
        delay: 0.1
      })
      .to('.hero-media-wrapper', {
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        duration: 2.2,
        ease: 'expo.inOut'
      }, "-=1.5");
    }

    // 2. Hero Scroll Parallax
    const heroTextContainer = document.querySelector('.hero-text-container');
    if (heroTextContainer) {
      gsap.to('.hero-text-container', {
        yPercent: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.project-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    if (heroMediaWrapper) {
      gsap.to('.hero-media-wrapper', {
        scale: 0.92,
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.project-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // 3. 3D Model Fade In
    if (document.querySelector('.project-render')) {
      gsap.from('.project-render', {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.project-render',
          start: 'top 80%',
        }
      });
    }

    // 4. Parallax Images
    document.querySelectorAll('.parallax-img').forEach(img => {
      gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // 5. Blueprint Scroll-Spy Animation
    const blueprintBlocks = document.querySelectorAll('.blueprint-text-block');
    if (blueprintBlocks.length > 0) {
      blueprintBlocks.forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: 'top 60%',
          end: 'bottom 60%',
          onEnter: () => {
            gsap.to('.blueprint-pinned-wrapper', { opacity: 0, pointerEvents: 'none', duration: 0.4 });
            gsap.to(`.blueprint-wrap-${i}`, { opacity: 1, pointerEvents: 'auto', duration: 0.5 });

            gsap.to('.blueprint-text-block', { opacity: 0.3, duration: 0.3 });
            gsap.to(block, { opacity: 1, duration: 0.3 });
          },
          onEnterBack: () => {
            gsap.to('.blueprint-pinned-wrapper', { opacity: 0, pointerEvents: 'none', duration: 0.4 });
            gsap.to(`.blueprint-wrap-${i}`, { opacity: 1, pointerEvents: 'auto', duration: 0.5 });

            gsap.to('.blueprint-text-block', { opacity: 0.3, duration: 0.3 });
            gsap.to(block, { opacity: 1, duration: 0.3 });
          }
        });
      });
    }

    // 6. Stagger reveal for project meta bento
    if (document.querySelector('.project-meta')) {
      ScrollTrigger.create({
        trigger: '.project-meta',
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.gsap-bento-item', {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1.2,
            ease: 'power3.out'
          });
        }
      });
    }
  }

  // DIRECTORIO DE PROYECTOS - Animaciones y filtrado
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid) {
    // 1. Scroll Reveal con Stagger en Cards
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
      gsap.from(projectCards, {
        scrollTrigger: {
          trigger: projectsGrid,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }

    // 2. Sistema de Filtrado
    const filterButtons = document.querySelectorAll('.filter-inline');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Actualizar botón activo
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filtrar proyectos con animación
        projectCards.forEach((card, index) => {
          const cardSector = card.dataset.sector;
          const shouldShow = filter === 'all' || cardSector === filter;

          if (shouldShow) {
            card.classList.remove('hidden');
            card.classList.add('visible');
            gsap.fromTo(card,
              { opacity: 0, y: 40, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: index * 0.1, ease: 'power2.out' }
            );
          } else {
            gsap.to(card, {
              opacity: 0,
              scale: 0.8,
              duration: 0.3,
              onComplete: () => {
                card.classList.add('hidden');
                card.classList.remove('visible');
              }
            });
          }
        });
      });
    });

    // 3. Header Reveal
    const projectsHeader = document.querySelector('.projects-header');
    if (projectsHeader) {
      gsap.from('.projects-header .gsap-reveal', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Nota: initDynamicHeader() ahora se llama dentro de loadPage()
  // Nota: initAnimations() ahora se llama dentro de loadPage() para TODAS las páginas
  //       (cursor personalizado, smooth scroll, y otras animaciones globales)
});
