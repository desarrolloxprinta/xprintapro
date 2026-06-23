import './style.css'
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

import { initProyectoAnimations } from './template-proyecto.js'
import { initDynamicHeader } from './layout.js'
import { getRedeiaHTML } from './pages/proyectos/redeia.js'
import { getArvalHTML } from './pages/proyectos/arval.js'
import { getHomeHTML } from './pages/home.js'

// ==========================================================================
// Router - Sistema de Layout Universal
// ==========================================================================

const pageType = document.body.dataset.page;

if (pageType === 'proyecto-redeia') {
  // Proyecto Redeia usando plantilla universal
  document.querySelector('#app').innerHTML = getRedeiaHTML()
} else if (pageType === 'proyecto-arval') {
  // Proyecto Arval usando plantilla universal
  document.querySelector('#app').innerHTML = getArvalHTML()
} else {
  // Home usando plantilla universal
  document.querySelector('#app').innerHTML = getHomeHTML()
}

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

  // 2. Hero Entry Animation (Butter smooth reveal)
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

  // 5. Interactive Pinned Scroll Timeline (Map Section)
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
      height: 620,
      sphereRadius: 156, // +20% from 130
      count: 1700,
      dotColor: "#000000",
      accentColor: "#F18108",
      accentRatio: 0.4,
      dotRadius: 3.66,
      alpha: 0.95,
      idleSpeed: 0.5,
      rotationSpeed: 0.25,
      endLife: 0
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
          
          // Dynamic mask to fade out the particles at the top (where text is)
          // At progress 0: transparent 15%, black 100% (faded at very top)
          // At progress 1: transparent 0%, black 0% (fully solid)
          const transPoint = 15 - (self.progress * 15);
          const fadePoint = 100 - (self.progress * 100); 
          lottieContainer.style.maskImage = `linear-gradient(to bottom, transparent 0%, transparent ${transPoint}%, black ${fadePoint}%)`;
          lottieContainer.style.webkitMaskImage = `linear-gradient(to bottom, transparent 0%, transparent ${transPoint}%, black ${fadePoint}%)`;
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
}

window.addEventListener('DOMContentLoaded', () => {
  // Inicializar header dinámico (importado de layout.js)
  initDynamicHeader();

  // Inicializar animaciones según tipo de página
  if (pageType && pageType.startsWith('proyecto-')) {
    initProyectoAnimations();
  } else {
    initAnimations();
  }
});
