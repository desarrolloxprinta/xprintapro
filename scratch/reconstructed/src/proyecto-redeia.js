import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const renderProyectoRedeia = () => `
<!-- HERO -->
  <section class="project-hero" style="position: relative; width: 100%; height: 100vh; background-color: var(--color-background); display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden;">
    
    <div class="hero-media-wrapper" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; overflow: hidden; clip-path: inset(25% 15% 25% 15% round 20px);">
      <video class="hero-media" autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover; transform: scale(1.15);">
        <source src="/proyectos/redeia/redeia_hero_video.mp4" type="video/mp4" />
      </video>
    </div>

    <div class="hero-text-container" style="text-align: center; z-index: 2; position: relative; padding: 0 15vw; width: 100%;">
      <h1 class="hero-title text-large font-serif font-regular text-inverse" style="margin-bottom: 2rem; max-width: 1400px; margin-left: auto; margin-right: auto; overflow: hidden; color: #fff;">
        <span class="hero-title-inner" style="display: block; transform: translateY(110%);">Campaña de rebranding sorpresa para Redeia red electrica — instalación de rótulos a nivel nacional.</span>
      </h1>
    </div>
  </section>

  <!-- META BENTO -->
  <section class="project-meta" style="padding: 6rem 0; background-color: var(--color-secondary); color: var(--color-primary);">
    <div class="container-fluid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1px; background: rgba(0,0,0,0.05); border-top: 1px solid rgba(0,0,0,0.05); border-bottom: 1px solid rgba(0,0,0,0.05);">
      
      <div class="meta-item gsap-bento-item" style="background: var(--color-secondary); padding: 4rem 2rem; display: flex; flex-direction: column; justify-content: flex-start;">
        <span class="text-caption text-muted text-uppercase" style="margin-bottom: 2rem; display: block;">Cliente</span>
        <div>
          <h3 class="font-serif font-regular" style="font-size: 2.5rem; margin-bottom: 1rem;">Redeia</h3>
          <p class="text-body-hero">Desde 1985 nacieron como el primer TSO del mundo. Hoy son un grupo sólido con el propósito de garantizar el suministro eléctrico.</p>
        </div>
      </div>

      <div class="meta-item gsap-bento-item" style="background: var(--color-secondary); padding: 4rem 2rem; display: flex; flex-direction: column; justify-content: flex-start;">
        <span class="text-caption text-muted text-uppercase" style="margin-bottom: 2rem; display: block;">Sector</span>
        <h3 class="font-serif font-regular" style="font-size: 2.5rem;">Energía / Corporativo</h3>
      </div>

      <div class="meta-item gsap-bento-item" style="background: var(--color-secondary); padding: 4rem 2rem; display: flex; flex-direction: column; justify-content: flex-start;">
        <span class="text-caption text-muted text-uppercase" style="margin-bottom: 2rem; display: block;">Servicio</span>
        <div>
          <h3 class="font-serif font-regular" style="font-size: 2.5rem;">Rebranding Nacional</h3>
          <img src="/proyectos/redeia/logo-redeia.webp" alt="Redeia Logo" style="max-width: 150px; margin-top: 2rem; mix-blend-mode: multiply;" />
        </div>
      </div>

    </div>
  </section>

  <!-- PROJECT LOCATION -->
  <section class="project-location" style="position: relative; height: 80vh; min-height: 600px; background-color: var(--color-primary); color: #FFFFFF; overflow: hidden; display: flex; align-items: center;">
    
    <!-- Background Map -->
    <div style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1;">
      <div id="google-map" style="width: 100%; height: 100%;"></div>
      <!-- Gradient overlay: black on the left fading to transparent occupying 60% of the container -->
      <div style="position: absolute; inset: 0; background: linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) 15%, transparent 60%); pointer-events: none; z-index: 2;"></div>
    </div>

    <!-- Foreground Text -->
    <div class="container-fluid" style="position: relative; z-index: 10; width: 100%;">
      <div class="gsap-reveal location-content" style="max-width: 500px;">
        <span class="text-caption text-uppercase opacity-90 text-inverse" style="color: var(--color-highlight);">Ubicación / Cobertura</span>
        <h2 class="text-large font-serif font-regular text-inverse" style="margin: 1.5rem 0;">Despliegue Nacional</h2>
        <p class="font-sans text-inverse opacity-80" style="font-size: 1.25rem;">
          ${{title:`Despliegue Nacional`,description:`Implantación coordinada en múltiples puntos de la geografía española, sincronizando fabricación y logística para asegurar una cobertura total bajo estrictos tiempos de entrega.`,type:`national`,markers:[{lat:40.4168,lng:-3.7038},{lat:41.3851,lng:2.1734},{lat:39.4699,lng:-.3774},{lat:37.3891,lng:-5.9845},{lat:43.263,lng:-2.935},{lat:41.6488,lng:-.8891},{lat:36.7213,lng:-4.4214}]}.description}
        </p>
      </div>
    </div>
  </section>

  <!-- STORYTELLING (Challenge & Solution) -->
  <section class="project-storytelling" style="padding: 10rem 0; background-color: var(--color-tertiary); color: var(--color-primary);">
    <div class="container-fluid">
      
      <div class="story-block gsap-reveal" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8vw; margin-bottom: 15rem; align-items: center;">
        <div class="story-content">
          <span class="text-caption text-muted text-uppercase">01 &mdash; El Desafío</span>
          <h2 class="text-large font-serif font-regular" style="margin: 2rem 0;">Un verdadero <span style="font-style: italic; color: var(--color-highlight);">reto</span>.</h2>
          <p class="text-body-hero">El nuevo nombre y la identidad de Redeia, una red compuesta por cinco marcas y más de 2.400 profesionales. Significó un verdadero reto. El desafío consistía en lograr un cambio uniforme y de manera discreta a nivel nacional en tiempo récord que culminaba con el relanzamiento en un evento retransmitido a nivel internacional.</p>
        </div>
        <div class="story-image" style="overflow: hidden; border-radius: var(--border-radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.05);">
          <img src="/proyectos/redeia/REDEIA-CORPORATIVO-01.jpg" alt="Desafío Redeia" style="width: 100%; height: 120%; object-fit: cover; transform: translateY(-10%);" class="parallax-img" />
        </div>
      </div>

      <div class="story-block gsap-reveal" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8vw; align-items: center;">
        <div class="story-image" style="order: -1; overflow: hidden; border-radius: var(--border-radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.05);">
          <img src="/proyectos/redeia/REDEIA_ALBATROS_IDENTIFICACION_01.jpeg" alt="Solución Redeia" style="width: 100%; height: 120%; object-fit: cover; transform: translateY(-10%);" class="parallax-img" />
        </div>
        <div class="story-content">
          <span class="text-caption text-muted text-uppercase">02 &mdash; La Solución</span>
          <h2 class="text-large font-serif font-regular" style="margin: 2rem 0;">Estrategia y <span style="font-style: italic; color: var(--color-highlight);">Sincronización</span>.</h2>
          <p class="text-body-hero">Nuestro plan de actuación pasó por la creación de una estrategia que nos permitía un cambio discreto y rápido en toda España, de forma sincronizada, contando con los diferentes puntos Xprinta y los más estrictos controles de confidencialidad, con trabajos nocturnos de desmontajes y montajes.</p>
        </div>
      </div>

    </div>
  </section>

  <!-- PLANOS TECNICOS -->
  <section class="project-blueprints" style="background-color: var(--color-primary); color: #FFFFFF; position: relative; width: 100%;">
    <div class="blueprints-scroll-container" style="display: flex; position: relative; align-items: flex-start; width: 100%;">
      
      <!-- Left side: Pinned Images Full Bleed -->
      <div class="blueprints-pinned-media" style="width: 50vw; position: sticky; top: 0; height: 100vh; background-color: #fff; overflow: hidden; z-index: 10;">
        <img src="/proyectos/redeia/planos-tecnicos-2.png" alt="Plano 1" class="blueprint-pinned-img blueprint-img-0 lightbox-trigger" data-cursor="Ver Plano" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; padding: 4rem; z-index: 1; clip-path: inset(0% 0% 0% 0%); pointer-events: auto;" />
        <img src="/proyectos/redeia/planos-tecnicos-3.png" alt="Plano 2" class="blueprint-pinned-img blueprint-img-1 lightbox-trigger" data-cursor="Ver Plano" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; padding: 4rem; z-index: 2; clip-path: inset(100% 0% 0% 0%); pointer-events: none;" />
        <img src="/proyectos/redeia/planos-tecnicos-4.png" alt="Plano 3" class="blueprint-pinned-img blueprint-img-2 lightbox-trigger" data-cursor="Ver Plano" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; padding: 4rem; z-index: 3; clip-path: inset(100% 0% 0% 0%); pointer-events: none;" />
        <img src="/proyectos/redeia/planos-tecnicos-5.png" alt="Plano 4" class="blueprint-pinned-img blueprint-img-3 lightbox-trigger" data-cursor="Ver Plano" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; padding: 4rem; z-index: 4; clip-path: inset(100% 0% 0% 0%); pointer-events: none;" />
      </div>

      <!-- Right side: Scrolling Text Blocks -->
      <div class="blueprints-scrolling-content" style="width: 50vw; padding: 15vh 6vw 30vh 6vw; display: flex; flex-direction: column;">
        
        <div style="margin-bottom: 10rem;" class="gsap-reveal">
          <span class="text-caption text-uppercase opacity-90 text-inverse">03 &mdash; Ingeniería</span>
          <h2 class="text-large font-serif font-regular text-inverse" style="margin: 1.5rem 0;">Planos Técnicos</h2>
          <p class="font-sans text-inverse opacity-80" style="font-size: 1.25rem; max-width: 600px;">
            Desarrollo técnico y vistas de detalle para la producción de cada elemento corporativo.
          </p>
        </div>

        <div class="blueprint-text-block blueprint-block-0" style="min-height: 80vh; display: flex; flex-direction: column; justify-content: center; opacity: 1;">
          <span class="text-caption" style="color: var(--color-highlight); margin-bottom: 1rem; display: block;">Fase 01</span>
          <h3 class="font-serif text-inverse" style="font-size: 2.5rem; margin-bottom: 1.5rem;">Cotas Generales</h3>
          <p class="font-sans text-inverse opacity-70" style="font-size: 1.2rem; line-height: 1.6; max-width: 600px;">
            Medidas maestras y desarrollo estructural principal. Especificamos las dimensiones generales para la correcta integración arquitectónica del rótulo en fachada.
          </p>
        </div>
        
        <div class="blueprint-text-block blueprint-block-1" style="min-height: 80vh; display: flex; flex-direction: column; justify-content: center; opacity: 0.3;">
          <span class="text-caption" style="color: var(--color-highlight); margin-bottom: 1rem; display: block;">Fase 02</span>
          <h3 class="font-serif text-inverse" style="font-size: 2.5rem; margin-bottom: 1.5rem;">Despiece de Materiales</h3>
          <p class="font-sans text-inverse opacity-70" style="font-size: 1.2rem; line-height: 1.6; max-width: 600px;">
            Identificación de componentes metálicos, perfilería interior y cerramientos frontales. Se asegura que la dilatación de materiales en exteriores quede compensada.
          </p>
        </div>

        <div class="blueprint-text-block blueprint-block-2" style="min-height: 80vh; display: flex; flex-direction: column; justify-content: center; opacity: 0.3;">
          <span class="text-caption" style="color: var(--color-highlight); margin-bottom: 1rem; display: block;">Fase 03</span>
          <h3 class="font-serif text-inverse" style="font-size: 2.5rem; margin-bottom: 1.5rem;">Electrificación</h3>
          <p class="font-sans text-inverse opacity-70" style="font-size: 1.2rem; line-height: 1.6; max-width: 600px;">
            Disposición de los módulos LED, recorridos de cableado y fuentes de alimentación. Optimización para garantizar una luminosidad homogénea sin sombras proyectadas.
          </p>
        </div>

        <div class="blueprint-text-block blueprint-block-3" style="min-height: 80vh; display: flex; flex-direction: column; justify-content: center; opacity: 0.3;">
          <span class="text-caption" style="color: var(--color-highlight); margin-bottom: 1rem; display: block;">Fase 04</span>
          <h3 class="font-serif text-inverse" style="font-size: 2.5rem; margin-bottom: 1.5rem;">Anclajes y Fijación</h3>
          <p class="font-sans text-inverse opacity-70" style="font-size: 1.2rem; line-height: 1.6; max-width: 600px;">
            Planos de anclaje estructural. Sistema de sujeción calculado para soportar cargas de viento y peso, garantizando la seguridad absoluta de la instalación.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- 3D Render Section -->
  <section class="project-render" style="padding: 10rem 0; background-color: var(--color-background); color: var(--color-primary);">
    <div class="container-fluid">
      <div style="margin-bottom: 4rem;" class="gsap-reveal">
        <span class="text-caption text-muted text-uppercase">04 &mdash; Previsualización</span>
        <h2 class="text-large font-serif font-regular" style="margin: 1rem 0;">Render 3D Interactiva</h2>
        <p style="color: var(--color-text-muted); font-size: 1.2rem; max-width: 600px; margin-top: 1.5rem;">
          Explora todos los detalles de este rótulo en nuestro visor interactivo. Gira, acerca y descubre cada ángulo del modelo antes de su fabricación.
        </p>
      </div>
      <div class="gsap-reveal" style="width: 100%; height: 70vh; background-color: #ececec; border-radius: var(--border-radius-lg); overflow: hidden; border: 1px solid rgba(0,0,0,0.05); cursor: grab; box-shadow: 0 20px 40px rgba(0,0,0,0.05);">
        <!-- Interactive 3D Model Viewer -->
        <!-- Note: using a placeholder .glb model to demonstrate interaction since we don't have the final file -->
        <model-viewer 
          src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" 
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

  <!-- FINISHED PHOTOS -->
  <section class="project-gallery" style="padding: 10rem 0; background-color: var(--color-secondary); color: var(--color-primary);">
    <div class="container-fluid">
      <div style="margin-bottom: 6rem;" class="gsap-reveal">
        <span class="text-caption text-muted text-uppercase">05 &mdash; Realidad</span>
        <h2 class="text-large font-serif font-regular" style="margin: 1rem 0;">El Resultado <span style="font-style: italic; color: var(--color-highlight);">Final</span></h2>
      </div>

      <div class="masonry-grid" style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 2vw;">
        <!-- Photos -->
        <div class="masonry-item gsap-reveal" style="grid-column: span 8; height: 80vh; overflow: hidden; border-radius: var(--border-radius-md); box-shadow: 0 10px 40px rgba(0,0,0,0.05);">
          <img src="/proyectos/redeia/REDEIA_GAITANES_CORONACION_06.jpeg" alt="Gaitanes Coronación" style="width: 100%; height: 120%; object-fit: cover; transform: translateY(-10%);" class="parallax-img" data-cursor="Ver Foto" />
        </div>
        <div class="masonry-item gsap-reveal" style="grid-column: span 4; height: 80vh; overflow: hidden; border-radius: var(--border-radius-md); box-shadow: 0 10px 40px rgba(0,0,0,0.05);">
          <img src="/proyectos/redeia/20221026_135051-scaled-1.jpg" alt="Instalación" style="width: 100%; height: 120%; object-fit: cover; transform: translateY(-10%);" class="parallax-img" data-cursor="Ver Foto" />
        </div>
        
        <div class="masonry-item gsap-reveal" style="grid-column: span 4; height: 60vh; overflow: hidden; border-radius: var(--border-radius-md); box-shadow: 0 10px 40px rgba(0,0,0,0.05);">
          <img src="/proyectos/redeia/REDEIA_ALBATROS_IDENTIFICACION_06.jpeg" alt="Albatros" style="width: 100%; height: 120%; object-fit: cover; transform: translateY(-10%);" class="parallax-img" data-cursor="Ver Foto" />
        </div>
        <div class="masonry-item gsap-reveal" style="grid-column: span 4; height: 60vh; overflow: hidden; border-radius: var(--border-radius-md); box-shadow: 0 10px 40px rgba(0,0,0,0.05);">
          <img src="/proyectos/redeia/redeia_01.jpg" alt="Redeia Detalle" style="width: 100%; height: 120%; object-fit: cover; transform: translateY(-10%);" class="parallax-img" data-cursor="Ver Foto" />
        </div>
        <div class="masonry-item gsap-reveal" style="grid-column: span 4; height: 60vh; overflow: hidden; border-radius: var(--border-radius-md); box-shadow: 0 10px 40px rgba(0,0,0,0.05);">
          <img src="/proyectos/redeia/20221026_133248-scaled-1.jpg" alt="Detalle Montaje" style="width: 100%; height: 120%; object-fit: cover; transform: translateY(-10%);" class="parallax-img" data-cursor="Ver Foto" />
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIAL / CONCLUSION -->
  <section class="project-testimonial" style="padding: 15rem 0; background-color: var(--color-primary); color: #FFFFFF; text-align: center;">
    <div class="container-fluid" style="max-width: 100%; margin: 0 auto;" class="gsap-reveal">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1" style="margin-bottom: 4rem;">
        <path d="M14.017 21L16.417 14.583C16.417 14.583 14.833 14.583 14.833 11.25C14.833 7.91667 17.5 5 21 5C24.5 5 24.5 9 24.5 9C24.5 9 22.833 9 22.833 11.25C22.833 13.5 20.333 19.333 19.333 21H14.017ZM3.517 21L5.917 14.583C5.917 14.583 4.333 14.583 4.333 11.25C4.333 7.91667 7 5 10.5 5C14 5 14 9 14 9C14 9 12.333 9 12.333 11.25C12.333 13.5 9.833 19.333 8.833 21H3.517Z" />
      </svg>
      <blockquote class="text-large font-serif font-light text-inverse" style="margin-bottom: 4rem; line-height: 1.3;">
        Con este proyecto dejamos claro que proyectos exigentes en cuanto a factores tales como tiempo o compromisos de confidencialidad son <span style="font-style: italic; color: var(--color-highlight);">posibles</span> gracias a una excelente coordinación.
      </blockquote>
      <div class="font-sans text-uppercase text-inverse font-regular" style="font-size: 1.1rem; letter-spacing: 0.15em;">
        <span style="color: var(--color-highlight); font-weight: 600;">Garantía Xprinta</span> / Equipo Nacional
      </div>
    </div>
  </section>
`;

export const initProyectoAnimations = () => {
  if(window.initRedeiaMap=()=>{let e=new google.maps.Map(document.getElementById(`google-map`),{zoom:6.6,center:{lat:39.5,lng:-6.5},styles:[{featureType:`administrative.province`,elementType:`all`,stylers:[{visibility:`off`}]},{featureType:`administrative.locality`,elementType:`labels`,stylers:[{lightness:`-8`}]},{featureType:`administrative.locality`,elementType:`labels.text.fill`,stylers:[{color:`#000000`}]},{featureType:`administrative.locality`,elementType:`labels.text.stroke`,stylers:[{visibility:`off`}]},{featureType:`administrative.neighborhood`,elementType:`all`,stylers:[{color:`#acacac`}]},{featureType:`administrative.neighborhood`,elementType:`labels.text.fill`,stylers:[{color:`#484848`}]},{featureType:`administrative.neighborhood`,elementType:`labels.text.stroke`,stylers:[{color:`#ff0000`},{visibility:`off`}]},{featureType:`administrative.land_parcel`,elementType:`all`,stylers:[{lightness:`-3`}]},{featureType:`landscape`,elementType:`all`,stylers:[{saturation:-100},{lightness:`72`},{visibility:`on`}]},{featureType:`landscape`,elementType:`labels`,stylers:[{lightness:`23`}]},{featureType:`poi`,elementType:`all`,stylers:[{saturation:-100},{lightness:`30`},{visibility:`off`}]},{featureType:`road`,elementType:`all`,stylers:[{lightness:`-19`}]},{featureType:`road`,elementType:`geometry`,stylers:[{lightness:`2`},{gamma:`1.21`}]},{featureType:`road`,elementType:`geometry.stroke`,stylers:[{visibility:`off`},{saturation:`15`},{hue:`#ff0000`}]},{featureType:`road`,elementType:`labels`,stylers:[{lightness:`-43`}]},{featureType:`road`,elementType:`labels.text`,stylers:[{visibility:`on`},{lightness:`22`}]},{featureType:`road`,elementType:`labels.text.fill`,stylers:[{weight:`0.12`},{lightness:`-23`},{visibility:`on`}]},{featureType:`road`,elementType:`labels.text.stroke`,stylers:[{visibility:`off`},{lightness:`71`}]},{featureType:`road`,elementType:`labels.icon`,stylers:[{visibility:`on`}]},{featureType:`road.highway`,elementType:`all`,stylers:[{saturation:-100},{visibility:`simplified`}]},{featureType:`road.arterial`,elementType:`all`,stylers:[{saturation:-100},{lightness:30},{visibility:`on`}]},{featureType:`road.local`,elementType:`all`,stylers:[{saturation:-100},{lightness:40},{visibility:`on`}]},{featureType:`transit`,elementType:`all`,stylers:[{saturation:-100},{visibility:`simplified`}]},{featureType:`transit`,elementType:`geometry.fill`,stylers:[{saturation:`5`},{visibility:`on`},{lightness:`5`}]},{featureType:`water`,elementType:`geometry`,stylers:[{hue:`#ffff00`},{lightness:`-24`},{saturation:-97}]},{featureType:`water`,elementType:`geometry.fill`,stylers:[{saturation:`-88`},{lightness:`-23`},{visibility:`on`}]},{featureType:`water`,elementType:`labels`,stylers:[{visibility:`on`},{lightness:-25},{saturation:-100}]},{featureType:`water`,elementType:`labels.text`,stylers:[{weight:`0.01`},{lightness:`9`}]},{featureType:`water`,elementType:`labels.text.fill`,stylers:[{lightness:`-32`},{gamma:`2.99`}]}],disableDefaultUI:!0,backgroundColor:`#0a0a0a`,gestureHandling:`none`}),t=[{lat:40.4168,lng:-3.7038},{lat:41.3851,lng:2.1734},{lat:39.4699,lng:-.3774},{lat:37.3891,lng:-5.9845},{lat:43.263,lng:-2.935},{lat:41.6488,lng:-.8891},{lat:36.7213,lng:-4.4214}],n={path:`M 0,0 m -10,0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0`,fillColor:`#F18108`,fillOpacity:1,strokeWeight:2,strokeColor:`#ffffff`,scale:1.4},r=new google.maps.LatLngBounds;if(t.forEach((t,i)=>{new google.maps.Marker({position:t,map:e,icon:n}),r.extend(t)}),t.length>1){let t=window.innerWidth>992?window.innerWidth*.55:50;e.fitBounds(r,{left:t,right:50,top:50,bottom:50})}else t.length===1&&(e.setCenter(t[0]),e.setZoom(12),setTimeout(()=>{window.innerWidth>992&&e.panBy(-(window.innerWidth*.25),0)},100))},document.getElementById(`google-maps-script`))window.google&&window.google.maps&&window.initRedeiaMap();else{let e=document.createElement(`script`);e.id=`google-maps-script`,e.src=`https://maps.googleapis.com/maps/api/js?key=AIzaSyAI2t5YjVo0PA48446eeMzLwUgRrrSz9sw&callback=initRedeiaMap`,e.async=!0,e.defer=!0,document.head.appendChild(e)}gsap.timeline({defaults:{ease:`power4.out`}}).to(`.hero-media-wrapper`,{clipPath:`inset(0% 0% 0% 0% round 0px)`,duration:1.6,ease:`power3.inOut`,delay:.1}).to(`.hero-media`,{scale:1,duration:1.6,ease:`power3.inOut`},`<`).fromTo(`.hero-title-inner`,{yPercent:110},{yPercent:0,duration:1.2,ease:`power4.out`,clearProps:`transform`},`-=0.8`),gsap.to(`.hero-text-container`,{yPercent:-60,opacity:0,ease:`none`,scrollTrigger:{trigger:`.project-hero`,start:`top top`,end:`bottom top`,scrub:!0}}),gsap.to(`.hero-media-wrapper`,{scale:.92,yPercent:15,ease:`none`,scrollTrigger:{trigger:`.project-hero`,start:`top top`,end:`bottom top`,scrub:!0}}),gsap.from(`.project-render`,{opacity:0,duration:1,scrollTrigger:{trigger:`.project-render`,start:`top 80%`}}),document.querySelectorAll(`.parallax-img`).forEach(e=>{gsap.to(e,{yPercent:20,ease:`none`,scrollTrigger:{trigger:e.parentElement,start:`top bottom`,end:`bottom top`,scrub:!0}})});let e=document.querySelectorAll(`.blueprint-text-block`);e.length>0&&e.forEach((t,n)=>{ScrollTrigger.create({trigger:t,start:`top 60%`,end:`bottom 60%`,onEnter:()=>{e.forEach((e,t)=>{gsap.to(`.blueprint-img-${t}`,{clipPath:t<=n?`inset(0% 0% 0% 0%)`:`inset(100% 0% 0% 0%)`,pointerEvents:t===n?`auto`:`none`,duration:.8,ease:`power3.inOut`,overwrite:`auto`})}),gsap.to(`.blueprint-text-block`,{opacity:.3,duration:.3}),gsap.to(t,{opacity:1,duration:.3})},onEnterBack:()=>{e.forEach((e,t)=>{gsap.to(`.blueprint-img-${t}`,{clipPath:t<=n?`inset(0% 0% 0% 0%)`:`inset(100% 0% 0% 0%)`,pointerEvents:t===n?`auto`:`none`,duration:.8,ease:`power3.inOut`,overwrite:`auto`})}),gsap.to(`.blueprint-text-block`,{opacity:.3,duration:.3}),gsap.to(t,{opacity:1,duration:.3})}})}),document.querySelector(`.project-meta`)&&ScrollTrigger.create({trigger:`.project-meta`,start:`top 80%`,onEnter:()=>{gsap.to(`.gsap-bento-item`,{y:0,opacity:1,visibility:`visible`,stagger:.15,duration:1.2,ease:`power3.out`})}});let t=document.querySelectorAll(`.masonry-item`);if(t.length&&gsap.fromTo(t,{y:100,opacity:0},{y:0,opacity:1,stagger:.15,duration:1.5,ease:`power4.out`,scrollTrigger:{trigger:`.project-gallery`,start:`top 70%`}}),!document.getElementById(`nw-lightbox`)){let e=document.createElement(`div`);e.id=`nw-lightbox`,e.innerHTML=`<img src="" alt="Zoomed view" />`,document.body.appendChild(e),e.addEventListener(`click`,()=>{e.classList.remove(`active`),setTimeout(()=>e.querySelector(`img`).src=``,400)})}document.querySelectorAll(`.blueprint-img, .blueprint-pinned-img, .parallax-img`).forEach(e=>{e.classList.add(`lightbox-trigger`),e.addEventListener(`click`,()=>{let t=document.getElementById(`nw-lightbox`);t.querySelector(`img`).src=e.src,t.classList.add(`active`)})})
};
