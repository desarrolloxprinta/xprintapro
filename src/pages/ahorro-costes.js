import { createLayout } from '../layout.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const renderAhorroCostes = async () => {
  const content = `
    <!-- Dark Section (Header/Hero) -->
    <div style="background-color: var(--color-primary); padding-bottom: 4rem; padding-top: 10rem;">
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <h1 class="font-serif text-large" style="color: white; max-width: 800px; line-height: 1.1; margin-bottom: 2rem;">
          Optimizar costes sin renunciar a una imagen cuidada, coherente y profesional.
        </h1>
        <div class="font-body" style="color: #9ca3af; font-size: 1.125rem; max-width: 600px; line-height: 1.7;">
          <p>Gestionamos y optimizamos toda la implantación de imagen de tu marca para que ahorres costes de forma inteligente, coordinando la fabricación e instalación a nivel nacional.</p>
        </div>
      </div>
    </div>

    <!-- Introducción -->
    <div style="background-color: white; padding: 8rem 0;">
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <p style="text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 2rem;">Introducción</p>
        
        <div style="display: flex; gap: 4rem; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 300px;">
            <p class="font-serif text-medium" style="color: #9ca3af; line-height: 1.4;">
              Reducir la inversión en rotulación, señalética o implantación de imagen <span style="color: #1f2937;">no debería significar bajar la calidad del resultado.</span> En proyectos con varias oficinas, tiendas o locales, el ahorro real se consigue coordinando mejor las compras, la fabricación, las instalaciones y el mantenimiento.
            </p>
          </div>
          <div style="flex: 1; min-width: 300px;">
            <p class="font-body" style="color: #4b5563; font-size: 1.125rem; line-height: 1.6;">
              Xprinta ayuda a las empresas a optimizar sus costes operativos mediante una gestión unificada, planificada y más eficiente de cada actuación.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Qué significa (Dark Card) -->
    <div style="background-color: white; padding-bottom: 6rem;">
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <div style="background-color: black; border-radius: 1.5rem; padding: 4rem;">
          <p style="text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 2rem;">Qué significa</p>
          <p class="font-serif" style="color: white; font-size: clamp(1.5rem, 3vw, 2.5rem); line-height: 1.3; margin-bottom: 2rem;">
            El ahorro de costes no se basa en hacer menos ni en utilizar soluciones de menor calidad. <span style="color: var(--color-highlight);">Se basa en organizar mejor todo el proceso.</span>
          </p>
          <p style="font-family: var(--font-family-base); color: rgba(255,255,255,0.8); font-size: 1.5rem; line-height: 1.6; max-width: 900px;">
            Xprinta centraliza la compra de materiales, coordina la fabricación a través de su sistema online, optimiza los desplazamientos necesarios para las instalaciones y activa los mantenimientos desde el punto más cercano posible.
            <br><br>
            Esto permite reducir costes por oficina, tienda o local, especialmente en proyectos con múltiples ubicaciones o actuaciones repartidas por diferentes ciudades.
          </p>
        </div>
      </div>
    </div>

    <!-- Qué aporta al cliente (Grid) -->
    <div style="background-color: white; padding-bottom: 6rem;">
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <p style="text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 3rem;">Qué aporta al cliente</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 3rem;">
          
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
            <p class="font-body" style="font-weight: 600; font-size: 1.125rem;">Reducción de inversión</p>
            <p style="color: #6b7280;">Por oficina, tienda, local o punto de venta.</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            <p class="font-body" style="font-weight: 600; font-size: 1.125rem;">Compra unificada</p>
            <p style="color: #6b7280;">Adquisición de materiales de forma conjunta para mejores costes.</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <p class="font-body" style="font-weight: 600; font-size: 1.125rem;">Fabricación coordinada</p>
            <p style="color: #6b7280;">Procesos de producción más eficientes en red.</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <p class="font-body" style="font-weight: 600; font-size: 1.125rem;">Menos desplazamientos</p>
            <p style="color: #6b7280;">Reducción de viajes innecesarios en las instalaciones.</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
            <p class="font-body" style="font-weight: 600; font-size: 1.125rem;">Mantenimiento local</p>
            <p style="color: #6b7280;">Gestionado desde el punto operativo más cercano a la ubicación.</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
            <p class="font-body" style="font-weight: 600; font-size: 1.125rem;">Control del presupuesto</p>
            <p style="color: #6b7280;">Mejor trazabilidad y previsión sobre cada actuación.</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <p class="font-body" style="font-weight: 600; font-size: 1.125rem;">Calidad visual</p>
            <p style="color: #6b7280;">Mantenimiento de la consistencia visual de la marca en todo el territorio.</p>
          </div>
          
        </div>
      </div>
    </div>

    <!-- Por qué es importante & Aplicado a proyectos reales (Dark Section) -->
    <div style="background-color: var(--color-primary); padding: 8rem 0;">
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <div style="display: flex; gap: 4rem; flex-wrap: wrap;">
          
          <div style="flex: 1; min-width: 300px;">
            <p style="text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 2rem;">Por qué es importante</p>
            <p class="font-body" style="color: rgba(255,255,255,0.8); font-size: 1.125rem; line-height: 1.6; margin-bottom: 1.5rem;">
              Cuando una empresa gestiona cada punto de venta de forma independiente, los costes tienden a multiplicarse. Cada proveedor compra por separado, cada instalación se planifica de forma aislada y cada mantenimiento puede implicar desplazamientos innecesarios.
            </p>
            <p class="font-body" style="color: rgba(255,255,255,0.8); font-size: 1.125rem; line-height: 1.6; margin-bottom: 1.5rem;">
              Además, la falta de coordinación puede generar errores, repeticiones de trabajo, retrasos o diferencias de acabado entre ubicaciones.
            </p>
            <p class="font-body" style="color: var(--color-highlight); font-size: 1.25rem; line-height: 1.6; font-weight: 600;">
              Una gestión unificada permite aprovechar mejor los recursos, reducir ineficiencias y mantener un mayor control sobre la inversión total del proyecto.
            </p>
          </div>

          <div style="flex: 1; min-width: 300px; background-color: rgba(255,255,255,0.03); padding: 3rem; border-radius: 1.5rem; border: 1px solid rgba(255,255,255,0.1);">
            <p style="text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-highlight); font-size: 0.875rem; margin-bottom: 2rem;">Aplicado a proyectos reales</p>
            
            <div style="margin-bottom: 2rem;">
              <h4 class="font-serif" style="color: white; font-size: 1.5rem; margin-bottom: 0.5rem;">Cadenas y Franquicias</h4>
              <p style="color: rgba(255,255,255,0.7); line-height: 1.5;">Xprinta puede agrupar necesidades, coordinar materiales y organizar la fabricación para reducir costes unitarios sin perder consistencia en la imagen.</p>
            </div>

            <div style="margin-bottom: 2rem;">
              <h4 class="font-serif" style="color: white; font-size: 1.5rem; margin-bottom: 0.5rem;">Multinacionales</h4>
              <p style="color: rgba(255,255,255,0.7); line-height: 1.5;">En instalaciones repartidas por distintas ciudades, la planificación permite disminuir desplazamientos, ordenar rutas y evitar intervenciones aisladas que encarecen el proyecto.</p>
            </div>

            <div style="margin-bottom: 2rem;">
              <h4 class="font-serif" style="color: white; font-size: 1.5rem; margin-bottom: 0.5rem;">Mantenimiento</h4>
              <p style="color: rgba(255,255,255,0.7); line-height: 1.5;">En mantenimiento correctivo o preventivo, actuar desde el punto más cercano ayuda a resolver incidencias con mayor eficiencia y con menor impacto económico.</p>
            </div>

            <div>
              <h4 class="font-serif" style="color: white; font-size: 1.5rem; margin-bottom: 0.5rem;">Renovación de Imagen</h4>
              <p style="color: rgba(255,255,255,0.7); line-height: 1.5;">Esta forma de trabajar permite actualizar varios espacios bajo un mismo criterio, optimizando compras, producción, instalación y seguimiento.</p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Cierre -->
    <div style="background-color: white; padding: 6rem 0;">
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; text-align: center;">
        <h2 class="font-serif" style="font-size: 2.5rem; margin-bottom: 2rem;">
          Con Xprinta, el ahorro no viene de recortar calidad
        </h2>
        <p class="font-body" style="font-size: 1.25rem; color: #4b5563; max-width: 700px; margin: 0 auto; line-height: 1.6;">
          Sino de gestionar mejor cada fase del proyecto para que la inversión en imagen visual sea más <strong style="color: black;">eficiente, controlada y rentable</strong>.
        </p>
      </div>
    </div>
  `;

  return await createLayout({ content, pageClass: 'page-ahorro-costes', hideHeader: false });
};


