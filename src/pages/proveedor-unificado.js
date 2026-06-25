import { createLayout } from '../layout.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const renderProveedorUnificado = async () => {
  const content = `
    <!-- Dark Section (Header/Hero) -->
    <div style="background-color: var(--color-primary); padding-bottom: 4rem; padding-top: 10rem;">
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <h1 class="font-serif text-large" style="color: white; max-width: 800px; line-height: 1.1; margin-bottom: 2rem;">
          Un solo partner para coordinar todos los soportes de imagen visual de tu marca.
        </h1>
        <div class="font-body" style="color: #9ca3af; font-size: 1.125rem; max-width: 600px; line-height: 1.7;">
          <p>Xprinta actúa como proveedor unificado para gestionar esa imagen de forma global, evitando la dispersión de proveedores y facilitando una implantación coherente, controlada y eficiente.</p>
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
              La imagen de una marca en el punto de venta no depende de un único elemento. Vive en la fachada, en el interior, en los accesos, en los vehículos, en los soportes textiles, en la señalética y en cada punto de contacto físico con el cliente.
            </p>
          </div>
          <div style="flex: 1; min-width: 300px;">
            <p class="font-body" style="color: #4b5563; font-size: 1.125rem; line-height: 1.6;">
              Xprinta actúa como proveedor unificado para gestionar esa imagen de forma global, evitando la dispersión de proveedores y facilitando una implantación coherente, controlada y eficiente.
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
            Ser un proveedor unificado 360º significa cubrir, desde una misma coordinación, los principales soportes físicos que intervienen en la presencia visual de una marca.
          </p>
          <p style="font-family: var(--font-family-base); color: rgba(255,255,255,0.8); font-size: 1.5rem; line-height: 1.6; max-width: 900px;">
            El cliente no tiene que gestionar cada soporte por separado ni coordinar distintos equipos para cada necesidad. Cuenta con un interlocutor capaz de ordenar el proyecto completo y adaptarlo a cada ubicación.
          </p>

          <!-- Break Image inside Dark Card -->
          <div style="border-radius: 1.5rem; overflow: hidden; width: 100%; height: 500px; margin-top: 4rem;">
            <img src="/por-que-xprinta/Proveedor%20unificado%20360º/proveedor-360-printing.jpg" alt="Impresión Industrial y Fabricación" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>

        </div>
      </div>
    </div>

    <!-- Qué aporta al cliente (Light Grid con iconos) -->
    <div style="background-color: white; padding-bottom: 6rem;">
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <p style="text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 3rem;">Qué aporta al cliente</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 3rem;">
          
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <p class="font-body" style="font-weight: 600; font-size: 1.125rem;">Único interlocutor</p>
            <p style="color: #6b7280;">Para diferentes soportes de imagen visual.</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            <p class="font-body" style="font-weight: 600; font-size: 1.125rem;">Coordinación integral</p>
            <p style="color: #6b7280;">De mediciones, diseño, fabricación e instalación.</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            <p class="font-body" style="font-weight: 600; font-size: 1.125rem;">Mayor coherencia</p>
            <p style="color: #6b7280;">Entre fachada, interior, señalética, vehículos y otros elementos corporativos.</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            <p class="font-body" style="font-weight: 600; font-size: 1.125rem;">Reducción de errores</p>
            <p style="color: #6b7280;">Derivados de trabajar con varios proveedores y menor carga de gestión.</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <p class="font-body" style="font-weight: 600; font-size: 1.125rem;">Capacidad Nacional</p>
            <p style="color: #6b7280;">Para actuar en cualquier ciudad de España y gestionar mantenimiento y legalización.</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-highlight)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <p class="font-body" style="font-weight: 600; font-size: 1.125rem;">Visión Global</p>
            <p style="color: #6b7280;">Del proyecto, desde la primera medición hasta el seguimiento y la trazabilidad.</p>
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
              Cuando la imagen visual se reparte entre muchos proveedores, aumentan los riesgos: diferencias de criterio, errores de medida, retrasos, falta de seguimiento, incidencias no resueltas o resultados poco homogéneos entre puntos de venta.
            </p>
            <p class="font-body" style="color: rgba(255,255,255,0.8); font-size: 1.125rem; line-height: 1.6; margin-bottom: 1.5rem;">
              Esto es especialmente crítico para empresas, cadenas, franquicias y grandes marcas que necesitan mantener una identidad coherente en múltiples espacios físicos.
            </p>
            <p class="font-body" style="color: var(--color-highlight); font-size: 1.25rem; line-height: 1.6; font-weight: 600;">
              Un proveedor unificado centraliza la gestión, mejora el control del proyecto y facilita que cada soporte cumpla su función dentro de una visión global de marca.
            </p>
          </div>

          <div style="flex: 1; min-width: 300px; background-color: rgba(255,255,255,0.03); padding: 3rem; border-radius: 1.5rem; border: 1px solid rgba(255,255,255,0.1);">
            <p style="text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-highlight); font-size: 0.875rem; margin-bottom: 2rem;">Aplicado a proyectos reales</p>
            
            <div style="margin-bottom: 2rem;">
              <h4 class="font-serif" style="color: white; font-size: 1.5rem; margin-bottom: 0.5rem;">Apertura de Punto de Venta</h4>
              <p style="color: rgba(255,255,255,0.7); line-height: 1.5;">Xprinta puede coordinar la medición del espacio, el desarrollo técnico de la fachada, rótulos o luminosos, vinilos interiores, señalética y vehículos asociados a la actividad.</p>
            </div>

            <div style="margin-bottom: 2rem;">
              <h4 class="font-serif" style="color: white; font-size: 1.5rem; margin-bottom: 0.5rem;">Renovación de Imagen</h4>
              <p style="color: rgba(255,255,255,0.7); line-height: 1.5;">Permite actualizar distintos soportes de forma ordenada, manteniendo criterios visuales comunes entre locales, oficinas, franquicias o centros de trabajo.</p>
            </div>

            <div style="margin-bottom: 2rem;">
              <h4 class="font-serif" style="color: white; font-size: 1.5rem; margin-bottom: 0.5rem;">Red Comercial Nacional</h4>
              <p style="color: rgba(255,255,255,0.7); line-height: 1.5;">Facilita la implantación o mantenimiento de la imagen en diferentes ciudades, centralizando la gestión y adaptando cada actuación a sus condiciones reales.</p>
            </div>

            <div>
              <h4 class="font-serif" style="color: white; font-size: 1.5rem; margin-bottom: 0.5rem;">Trámites Legales y Mantenimiento</h4>
              <p style="color: rgba(255,255,255,0.7); line-height: 1.5;">Xprinta puede incorporar la gestión de legalización y el mantenimiento preventivo o correctivo para asegurar que la imagen se mantiene operativa y alineada.</p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Cierre -->
    <div style="background-color: white; padding: 6rem 0;">
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; text-align: center;">
        <h2 class="font-serif" style="font-size: 2.5rem; margin-bottom: 2rem;">
          Coordinación 360º para tu imagen
        </h2>
        <p class="font-body" style="font-size: 1.25rem; color: #4b5563; max-width: 800px; margin: 0 auto; line-height: 1.6;">
          Con Xprinta, las empresas disponen de un proveedor 360º capaz de coordinar todos los soportes físicos de su imagen de marca con <strong style="color: black;">control, eficiencia y capacidad operativa en todo el territorio nacional</strong>.
        </p>
      </div>
    </div>
  `;

  return await createLayout({ content, pageClass: 'page-proveedor-unificado', hideHeader: false });
};
