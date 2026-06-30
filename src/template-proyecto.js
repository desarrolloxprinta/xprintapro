import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import content from './data/content.json';

export const renderProyectoTemplate = (data) => {
  const ui = content.projectUi.labels;
  return `
  <!-- HERO -->
  <section class="project-hero" style="width: 100%; min-height: 100vh; padding-top: 27vh; padding-bottom: 5vh; background-color: var(--color-background); display: flex; flex-direction: column; align-items: center; justify-content: flex-start; overflow: hidden;">
    
    <div class="hero-text-container" style="text-align: center; z-index: 2; position: relative; padding: 0 5vw; margin-bottom: 5vh; width: 100%;">
      <h1 class="hero-title text-large font-serif font-regular text-primary" style="font-size: clamp(2.5rem, 3vw, 4rem); margin-bottom: 2rem; max-width: 1400px; margin-left: auto; margin-right: auto; overflow: hidden;">
        <span class="hero-title-inner" style="display: block; transform: translateY(110%);">${data.title}</span>
      </h1>
    </div>

    <div class="hero-media-wrapper" style="width: 95vw; height: 75vh; position: relative; z-index: 1; overflow: hidden; clip-path: inset(15% 15% 15% 15% round 20px);">
      ${data.hero.video ? `
      <video class="hero-media" autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover; transform: scale(1.15);">
        <source src="${data.hero.video}" type="video/mp4" />
      </video>
      ` : `
      <img class="hero-media" src="${data.hero.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover; transform: scale(1.15);" />
      `}
    </div>
  </section>

  <!-- META BENTO -->
  <section class="project-meta" style="padding: 6rem 0; background-color: var(--color-secondary); color: var(--color-primary);">
    <div class="container-fluid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1px; background: rgba(0,0,0,0.05); border-top: 1px solid rgba(0,0,0,0.05); border-bottom: 1px solid rgba(0,0,0,0.05);">
      
      <div class="meta-item gsap-bento-item" style="background: var(--color-secondary); padding: 4rem 2rem; display: flex; flex-direction: column; justify-content: flex-start;">
        <span class="text-caption text-muted text-uppercase" style="margin-bottom: 2rem; display: block;">${ui.cliente}</span>
        <div>
          ${data.client.logo ? `<img src="${data.client.logo}" alt="${data.client.name} Logo" style="max-width: 165px; mix-blend-mode: multiply;" />` : ''}
          <p class="text-body-hero" style="margin-top: 1.5rem;">${data.client.description}</p>
        </div>
      </div>

      <div class="meta-item gsap-bento-item" style="background: var(--color-secondary); padding: 4rem 2rem; display: flex; flex-direction: column; justify-content: flex-start;">
        <span class="text-caption text-muted text-uppercase" style="margin-bottom: 2rem; display: block;">${ui.sector}</span>
        <h3 class="font-serif font-regular" style="font-size: 1.5rem;">${data.sector}</h3>
      </div>

      <div class="meta-item gsap-bento-item" style="background: var(--color-secondary); padding: 4rem 2rem; display: flex; flex-direction: column; justify-content: flex-start;">
        <span class="text-caption text-muted text-uppercase" style="margin-bottom: 2rem; display: block;">${ui.servicio}</span>
        <div>
          <h3 class="font-serif font-regular" style="font-size: 1.5rem;">${data.service.title}</h3>
          ${data.service.logo ? `<img src="${data.service.logo}" alt="${data.client.name} Logo" style="max-width: 165px; margin-top: 2rem; mix-blend-mode: multiply;" />` : ''}
        </div>
      </div>

    </div>
  </section>

  <!-- PROJECT LOCATION -->
  ${data.location ? `
  <section class="project-location" style="position: relative; height: 80vh; min-height: 600px; background-color: var(--color-primary); color: #FFFFFF; overflow: hidden; display: flex; align-items: center;">
    
    <!-- Background Map -->
    <div style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1;">
      <div id="google-map" style="width: 100%; height: 100%;" ${data.location.markers ? `data-markers='${JSON.stringify(data.location.markers)}'` : ''}></div>
      <!-- Gradient overlay: black on the left fading to transparent occupying 60% of the container -->
      <div style="position: absolute; inset: 0; background: linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) 15%, transparent 60%); pointer-events: none; z-index: 2;"></div>
    </div>

    <!-- Foreground Text -->
    <div class="container-fluid" style="position: relative; z-index: 10; width: 100%;">
      <div class="gsap-reveal location-content" style="max-width: 500px;">
        <span class="text-caption text-uppercase opacity-90 text-inverse" style="color: var(--color-highlight);">${ui.ubicacion}</span>
        <h2 class="text-large font-serif font-regular text-inverse" style="margin: 1.5rem 0;">${data.location.title}</h2>
        <p class="font-sans text-inverse opacity-80" style="font-size: 1.25rem;">
          ${data.location.description}
        </p>
      </div>
    </div>
  </section>
  ` : ''}

  <!-- STORYTELLING (Challenge & Solution) -->
  <section class="project-storytelling" style="padding: 10rem 0; background-color: var(--color-tertiary); color: var(--color-primary);">
    <div class="container-fluid">
      
      <div class="story-block gsap-reveal" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8vw; margin-bottom: 15rem; align-items: center;">
        <div class="story-content">
          <span class="text-caption text-muted text-uppercase">${ui.desafioNumber}</span>
          <h2 class="text-large font-serif font-regular" style="margin: 2rem 0;">${data.story.challengeTitle}</h2>
          <p class="text-body-hero">${data.story.challenge}</p>
        </div>
        <div class="story-image" style="overflow: hidden; border-radius: var(--border-radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.05);">
          <img src="${data.story.challengeImage}" alt="${ui.desafioNumber}" style="width: 100%; height: 120%; object-fit: cover; transform: translateY(-10%);" class="parallax-img" />
        </div>
      </div>

      <div class="story-block gsap-reveal" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8vw; align-items: center;">
        <div class="story-image" style="order: -1; overflow: hidden; border-radius: var(--border-radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.05);">
          <img src="${data.story.solutionImage}" alt="${ui.solucionNumber}" style="width: 100%; height: 120%; object-fit: cover; transform: translateY(-10%);" class="parallax-img" />
        </div>
        <div class="story-content">
          <span class="text-caption text-muted text-uppercase">${ui.solucionNumber}</span>
          <h2 class="text-large font-serif font-regular" style="margin: 2rem 0;">${data.story.solutionTitle}</h2>
          <p class="text-body-hero">${data.story.solution}</p>
        </div>
      </div>

    </div>
  </section>

  ${data.blueprints && data.blueprints.length > 0 ? `
  <!-- PLANOS TECNICOS -->
  <section class="project-blueprints" style="background-color: var(--color-primary); color: #FFFFFF; position: relative; width: 100%;">
    <div class="blueprints-scroll-container" style="display: flex; position: relative; align-items: flex-start; width: 100%;">
      
      <!-- Left side: Pinned Images Full Bleed with LIGHT GRAY FRAME -->
      <div class="blueprints-pinned-media" style="width: 50vw; position: sticky; top: 0; height: 100vh; background-color: #fff; border-right: 1px solid #E0E0E0; overflow: hidden; z-index: 10;">
        ${data.blueprints.map((bp, i) => `
        <div style="position: absolute; top: 15%; left: 10%; width: 80%; height: 80%; border: 2px solid #E0E0E0; border-radius: 8px; z-index: ${i+1}; pointer-events: ${i===0 ? 'auto' : 'none'}; opacity: ${i===0 ? 1 : 0}; transition: opacity 0.5s ease; overflow: hidden;" class="blueprint-pinned-wrapper blueprint-wrap-${i}">
            <img src="${bp}" alt="${ui.ingenieriaTitle} ${i+1}" class="blueprint-pinned-img blueprint-img-${i} lightbox-trigger" data-cursor="${ui.verPlano}" style="width: 100%; height: 100%; object-fit: contain; padding: 2rem; background-color: #fff;" />
        </div>
        `).join('')}
      </div>

      <!-- Right side: Scrolling Text Blocks -->
      <div class="blueprints-scrolling-content" style="width: 50vw; padding: 15vh 6vw 30vh 6vw; display: flex; flex-direction: column;">
        
        <div style="margin-bottom: 10rem;" class="gsap-reveal">
          <span class="text-caption text-uppercase opacity-90 text-inverse">${ui.ingenieriaNumber}</span>
          <h2 class="text-large font-serif font-regular text-inverse" style="margin: 1.5rem 0;">${ui.ingenieriaTitle}</h2>
          <p class="font-sans text-inverse opacity-80" style="font-size: 1.25rem; max-width: 600px;">
            ${ui.ingenieriaDesc}
          </p>
        </div>

        ${data.blueprintSteps ? data.blueprintSteps.map((step, i) => `
        <div class="blueprint-text-block blueprint-block-${i}" style="min-height: 80vh; display: flex; flex-direction: column; justify-content: center; opacity: ${i===0 ? 1 : 0.3}; transition: opacity 0.3s ease;">
          <span class="text-caption" style="color: var(--color-highlight); margin-bottom: 1rem; display: block;">${ui.fase} 0${i+1}</span>
          <h3 class="font-serif text-inverse" style="font-size: 2.5rem; margin-bottom: 1.5rem;">${step.title}</h3>
          <p class="font-sans text-inverse opacity-70" style="font-size: 1.2rem; line-height: 1.6; max-width: 600px;">
            ${step.description}
          </p>
        </div>
        `).join('') : data.blueprints.map((bp, i) => `
        <div class="blueprint-text-block blueprint-block-${i}" style="min-height: 80vh; display: flex; flex-direction: column; justify-content: center; opacity: ${i===0 ? 1 : 0.3}; transition: opacity 0.3s ease;">
          <span class="text-caption" style="color: var(--color-highlight); margin-bottom: 1rem; display: block;">${ui.fase} 0${i+1}</span>
          <h3 class="font-serif text-inverse" style="font-size: 2.5rem; margin-bottom: 1.5rem;">${ui.detalleTecnico}</h3>
        </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- 3D Render Section -->
  ${data.render3d ? `
  <section class="project-render" style="padding: 10rem 0; background-color: var(--color-background); color: var(--color-primary);">
    <div class="container-fluid">
      <div style="margin-bottom: 4rem;" class="gsap-reveal">
        <span class="text-caption text-muted text-uppercase">${ui.previsualizacionNumber}</span>
        <h2 class="text-large font-serif font-regular" style="margin: 1rem 0;">${data.render3d.title}</h2>
        <p style="color: var(--color-text-muted); font-size: 1.2rem; max-width: 600px; margin-top: 1.5rem;">
          ${data.render3d.description}
        </p>
      </div>
      <div class="gsap-reveal" style="width: 100%; height: 70vh; background-color: #ececec; border-radius: var(--border-radius-lg); overflow: hidden; border: 1px solid rgba(0,0,0,0.05); cursor: grab; box-shadow: 0 20px 40px rgba(0,0,0,0.05);">
        <!-- Interactive 3D Model Viewer -->
        <model-viewer 
          src="${data.render3d.model}" 
          camera-controls 
          auto-rotate 
          rotation-per-second="30deg"
          environment-image="neutral" 
          shadow-intensity="1" 
          style="width: 100%; height: 100%; outline: none;"
          interaction-prompt="auto">
        </model-viewer>
      </div>
    </div>
  </section>
  ` : ''}

  ${data.gallery && data.gallery.length > 0 ? `
  <!-- FINISHED PHOTOS -->
  <section class="project-gallery" style="padding: 10rem 0; background-color: var(--color-secondary); color: var(--color-primary);">
    <div class="container-fluid">
      <div style="margin-bottom: 6rem;" class="gsap-reveal">
        <span class="text-caption text-muted text-uppercase">${ui.realidadNumber}</span>
        <h2 class="text-large font-serif font-regular" style="margin: 1rem 0;">${ui.resultadoFinal}</h2>
      </div>

      <div class="masonry-grid" style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 2vw;">
        ${data.gallery.map((img, i) => `
        <div class="masonry-item" style="grid-column: span ${img.gridCols || (i === 0 ? 8 : 4)}; height: ${img.height || (i < 2 ? '80vh' : '60vh')}; overflow: hidden; border-radius: var(--border-radius-md); box-shadow: 0 10px 40px rgba(0,0,0,0.05);">
          <img src="${img.image || img}" alt="${img.alt || ui.verFoto}" style="width: 100%; height: 120%; object-fit: cover; transform: translateY(-10%);" class="parallax-img" data-cursor="${ui.verFoto}" />
        </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  ${data.testimonial ? `
  <!-- TESTIMONIAL / CONCLUSION -->
  <section class="project-testimonial" style="padding: 15rem 0; background-color: var(--color-primary); color: #FFFFFF; text-align: center;">
    <div class="container-fluid" style="max-width: 100%; margin: 0 auto;" class="gsap-reveal">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1" style="margin-bottom: 4rem;">
        <path d="M14.017 21L16.417 14.583C16.417 14.583 14.833 14.583 14.833 11.25C14.833 7.91667 17.5 5 21 5C24.5 5 24.5 9 24.5 9C24.5 9 22.833 9 22.833 11.25C22.833 13.5 20.333 19.333 19.333 21H14.017ZM3.517 21L5.917 14.583C5.917 14.583 4.333 14.583 4.333 11.25C4.333 7.91667 7 5 10.5 5C14 5 14 9 14 9C14 9 12.333 9 12.333 11.25C12.333 13.5 9.833 19.333 8.833 21H3.517Z" />
      </svg>
      <blockquote class="text-large font-serif font-light text-inverse" style="margin-bottom: 4rem; line-height: 1.3;">
        ${data.testimonial.quote}
      </blockquote>
      <div class="font-sans text-uppercase text-inverse font-regular" style="font-size: 1.1rem; letter-spacing: 0.15em;">
        <span style="color: var(--color-highlight); font-weight: 600;">${data.testimonial.author}</span> / ${data.testimonial.role}
      </div>
    </div>
  </section>
  ` : ''}
`;
};

export const initProyectoAnimations = () => {
  // 1. Initial State (Noteworthy style)
  gsap.set('.hero-title-inner', { y: '110%' });
  gsap.set('.hero-media-wrapper', { clipPath: 'inset(15% 15% 15% 15% round 20px)' });

  // 2. Load Timeline
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

  // 3. Hero Scroll Parallax (Noteworthy style)
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

  // Add simple fade in for the 3D model container
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

  // Add Parallax to images
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

  // Blueprint Scroll-Spy Animation
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

  // Stagger reveal for project meta bento
  if (document.querySelector('.project-meta')) {
    ScrollTrigger.create({
      trigger: '.project-meta',
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
    });
  }

  // Stagger reveals for Masonry
  const items = document.querySelectorAll('.masonry-item');
  if (items.length) {
    gsap.fromTo(items, { y: 100, opacity: 0 }, {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".project-gallery",
        start: "top 70%"
      }
    });
  }

  // Generic ScrollTrigger Reveal for all .gsap-reveal elements
  // (Copied from main.js - was missing in proyecto pages causing invisible text)
  const revealElements = document.querySelectorAll('.gsap-reveal:not(.gsap-bento-item):not(.masonry-item)');
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
    });
  });

  // Inject Lightbox HTML if not exists
  if (!document.getElementById('nw-lightbox')) {
    const lb = document.createElement('div');
    lb.id = 'nw-lightbox';
    lb.innerHTML = '<img src="" alt="Zoomed view" />';
    document.body.appendChild(lb);

    lb.addEventListener('click', () => {
      lb.classList.remove('active');
      setTimeout(() => lb.querySelector('img').src = '', 400); // clean up after fade
    });
  }

  // Bind Lightbox clicks to images
  document.querySelectorAll('.blueprint-pinned-img, .parallax-img').forEach(img => {
    img.classList.add('lightbox-trigger');
    img.addEventListener('click', () => {
      const lb = document.getElementById('nw-lightbox');
      lb.querySelector('img').src = img.src;
      lb.classList.add('active');
    });
  });

  // Load Google Maps
  if (document.getElementById('google-map')) {
    window.initProjectMap = () => {
      const mapElement = document.getElementById('google-map');
      
      // Premium styled map from stable version
      const mapStyle = [
        {featureType: "administrative.province", elementType: "all", stylers: [{visibility: "off"}]},
        {featureType: "administrative.locality", elementType: "labels", stylers: [{lightness: "-8"}]},
        {featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{color: "#000000"}]},
        {featureType: "administrative.locality", elementType: "labels.text.stroke", stylers: [{visibility: "off"}]},
        {featureType: "administrative.neighborhood", elementType: "all", stylers: [{color: "#acacac"}]},
        {featureType: "administrative.neighborhood", elementType: "labels.text.fill", stylers: [{color: "#484848"}]},
        {featureType: "administrative.neighborhood", elementType: "labels.text.stroke", stylers: [{color: "#ff0000"}, {visibility: "off"}]},
        {featureType: "administrative.land_parcel", elementType: "all", stylers: [{lightness: "-3"}]},
        {featureType: "landscape", elementType: "all", stylers: [{saturation: -100}, {lightness: "72"}, {visibility: "on"}]},
        {featureType: "landscape", elementType: "labels", stylers: [{lightness: "23"}]},
        {featureType: "poi", elementType: "all", stylers: [{saturation: -100}, {lightness: "30"}, {visibility: "off"}]},
        {featureType: "road", elementType: "all", stylers: [{lightness: "-19"}]},
        {featureType: "road", elementType: "geometry", stylers: [{lightness: "2"}, {gamma: "1.21"}]},
        {featureType: "road", elementType: "geometry.stroke", stylers: [{visibility: "off"}, {saturation: "15"}, {hue: "#ff0000"}]},
        {featureType: "road", elementType: "labels", stylers: [{lightness: "-43"}]},
        {featureType: "road", elementType: "labels.text", stylers: [{visibility: "on"}, {lightness: "22"}]},
        {featureType: "road", elementType: "labels.text.fill", stylers: [{weight: "0.12"}, {lightness: "-23"}, {visibility: "on"}]},
        {featureType: "road", elementType: "labels.text.stroke", stylers: [{visibility: "off"}, {lightness: "71"}]},
        {featureType: "road", elementType: "labels.icon", stylers: [{visibility: "on"}]},
        {featureType: "road.highway", elementType: "all", stylers: [{saturation: -100}, {visibility: "simplified"}]},
        {featureType: "road.arterial", elementType: "all", stylers: [{saturation: -100}, {lightness: 30}, {visibility: "on"}]},
        {featureType: "road.local", elementType: "all", stylers: [{saturation: -100}, {lightness: 40}, {visibility: "on"}]},
        {featureType: "transit", elementType: "all", stylers: [{saturation: -100}, {visibility: "simplified"}]},
        {featureType: "transit", elementType: "geometry.fill", stylers: [{saturation: "5"}, {visibility: "on"}, {lightness: "5"}]},
        {featureType: "water", elementType: "geometry", stylers: [{hue: "#ffff00"}, {lightness: "-24"}, {saturation: -97}]},
        {featureType: "water", elementType: "geometry.fill", stylers: [{saturation: "-88"}, {lightness: "-23"}, {visibility: "on"}]},
        {featureType: "water", elementType: "labels", stylers: [{visibility: "on"}, {lightness: -25}, {saturation: -100}]},
        {featureType: "water", elementType: "labels.text", stylers: [{weight: "0.01"}, {lightness: "9"}]},
        {featureType: "water", elementType: "labels.text.fill", stylers: [{lightness: "-32"}, {gamma: "2.99"}]}
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
          
          // Custom orange marker icons from stable version
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
                map.setCenter(markers[0]);
                map.setZoom(12);
                setTimeout(() => {
                  if (window.innerWidth > 992) {
                    map.panBy(-(window.innerWidth * 0.25), 0);
                  }
                }, 100);
              } else {
                let padLeft = window.innerWidth > 992 ? window.innerWidth * 0.55 : 50;
                map.fitBounds(bounds, { left: padLeft, right: 50, top: 50, bottom: 50 });
              }
            }, 100);
          }
        } catch(e) {
          console.error("Error parsing markers:", e);
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

  // =========================================================================
  // Custom Premium Cursor (Copied from main.js for proyecto pages)
  // =========================================================================
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
  }
};
