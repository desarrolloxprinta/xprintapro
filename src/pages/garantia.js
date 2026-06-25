import { createLayout } from '../layout.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const renderGarantia = async () => {
  const content = `
    <!-- MAIN CONTAINER matching Elixir Studio The Studio structure -->
    <main class="w-full bg-white flex-1" style="min-height: 100vh; background-color: #F3F4F6;">

      <!-- 1. HERO SECTION (DARK) -->
      <div style="background-color: var(--color-primary); padding: 10rem 0 6rem 0; margin-bottom: 4rem;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">

          <!-- Título Principal -->
          <h1 class="font-serif text-large" style="color: white; max-width: 900px; line-height: 1.1; margin-bottom: 2.5rem;">
            Garantía por escrito y materiales seleccionados para una imagen duradera y fiable.
          </h1>

          <!-- Descripción -->
          <div class="font-body" style="color: #9ca3af; font-size: 1.125rem; max-width: 600px; line-height: 1.7;">
            <p>La imagen visual de una empresa debe mantenerse en buen estado mucho después de la instalación. Un rótulo, un vinilo, una señalética o cualquier elemento corporativo no solo debe verse bien el primer día: debe responder correctamente al uso, al entorno y a las condiciones reales de cada ubicación.</p>
          </div>
        </div>
      </div>

      <!-- 2. ORIGINS (LIGHT BACKGROUND 2-COLUMN) -->
      <section style="background-color: #F3F4F6; color: #0f172a; padding: 6rem 0;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem; margin-bottom: 4rem;">
            <!-- Left Column: Heading -->
            <div style="flex: 1; min-width: 300px;">
              <span style="font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; color: #64748b; text-transform: uppercase; display: block; margin-bottom: 1rem;">Introducción</span>
              <h2 class="font-serif" style="font-size: clamp(2rem, 3vw, 2.5rem); font-weight: 700; line-height: 1.3;">
                Xprinta acompaña sus productos con una garantía de dos años por escrito y trabaja con materiales seleccionados por su adecuación y vida útil en cada proyecto.
              </h2>
            </div>
            
            <!-- Right Column: Paragraphs -->
            <div class="font-body" style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 1.5rem; color: #475569; font-size: 1.125rem; line-height: 1.7;">
              <p>La Garantía Xprinta significa que todos los productos suministrados cuentan con una garantía de dos años por escrito.</p>
              <p>Además, Xprinta se compromete a utilizar los materiales más adecuados para cada necesidad, priorizando aquellos que ofrezcan mayor durabilidad, buen comportamiento técnico y una correcta adaptación al lugar donde van a instalarse.</p>
              <p>No se trata solo de cubrir posibles incidencias, sino de fabricar e instalar con criterio desde el inicio para reducir riesgos y proteger la imagen de marca en el tiempo.</p>
            </div>
          </div>

          <!-- 3. VISION CARD (DARK ON LIGHT) -->
          <div style="background-color: black; color: white; border-radius: 2rem; padding: 4rem; margin-top: 2rem;">
            <span style="font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; color: #64748b; text-transform: uppercase; display: block; margin-bottom: 1rem;">Por qué es importante</span>
            <p class="font-serif" style="font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 700; line-height: 1.4; max-width: 900px; margin-bottom: 2rem;">
              En proyectos de rotulación, señalética o implantación de imagen, una mala elección de materiales puede generar deterioro prematuro, pérdida de color, fallos de adherencia, problemas de iluminación o deformaciones.
            </p>
            <p class="font-body" style="font-size: 1.125rem; color: #94a3b8; max-width: 800px; line-height: 1.6;">
              Esto es especialmente relevante en empresas con varios puntos de venta, donde cualquier incidencia puede afectar a la percepción global de la marca. Contar con una garantía por escrito aporta seguridad, claridad y confianza. Y trabajar con materiales adecuados desde el principio ayuda a evitar sustituciones innecesarias, mantenimientos prematuros y costes imprevistos.
            </p>
          </div>

        </div>
      </section>

      <!-- 4. TEAM GRID STYLE (LIGHT BACKGROUND) -->
      <section style="background-color: #F3F4F6; padding-bottom: 6rem;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
          
          <span style="font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; color: #64748b; text-transform: uppercase; display: block; margin-bottom: 2rem;">Qué aporta al cliente</span>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 6rem;">
            
            <div style="display: flex; flex-direction: column; gap: 0.5rem; background-color: white; padding: 2rem; border-radius: 1rem; border: 1px solid #e2e8f0;">
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #0f172a;">Garantía de 2 años</h3>
              <p style="font-size: 0.875rem; color: #64748b; line-height: 1.5;">Garantía por escrito en todos los productos suministrados e instalados.</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; background-color: white; padding: 2rem; border-radius: 1rem; border: 1px solid #e2e8f0;">
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #0f172a;">Mayor Seguridad</h3>
              <p style="font-size: 0.875rem; color: #64748b; line-height: 1.5;">Tranquilidad absoluta sobre la inversión económica realizada.</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; background-color: white; padding: 2rem; border-radius: 1rem; border: 1px solid #e2e8f0;">
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #0f172a;">Materiales Adecuados</h3>
              <p style="font-size: 0.875rem; color: #64748b; line-height: 1.5;">Selección específica y técnica adaptada a las necesidades de cada proyecto.</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; background-color: white; padding: 2rem; border-radius: 1rem; border: 1px solid #e2e8f0;">
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #0f172a;">Vida Útil Extendida</h3>
              <p style="font-size: 0.875rem; color: #64748b; line-height: 1.5;">Priorización de soluciones orientadas a ofrecer una mayor durabilidad.</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; background-color: white; padding: 2rem; border-radius: 1rem; border: 1px solid #e2e8f0;">
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #0f172a;">Reducción de Riesgos</h3>
              <p style="font-size: 0.875rem; color: #64748b; line-height: 1.5;">Prevención activa de problemas por deterioro prematuro o desgastes anormales.</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; background-color: white; padding: 2rem; border-radius: 1rem; border: 1px solid #e2e8f0;">
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #0f172a;">Confianza Total</h3>
              <p style="font-size: 0.875rem; color: #64748b; line-height: 1.5;">Garantías en proyectos críticos de apertura, renovación o rebranding.</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; background-color: white; padding: 2rem; border-radius: 1rem; border: 1px solid #e2e8f0;">
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #0f172a;">Protección de Marca</h3>
              <p style="font-size: 0.875rem; color: #64748b; line-height: 1.5;">Mejor protección de la imagen visual y corporativa a lo largo del tiempo.</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; background-color: white; padding: 2rem; border-radius: 1rem; border: 1px solid #e2e8f0;">
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #0f172a;">Criterios Claros</h3>
              <p style="font-size: 0.875rem; color: #64748b; line-height: 1.5;">Reglas de juego claras para detectar y resolver posibles incidencias ágilmente.</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; background-color: white; padding: 2rem; border-radius: 1rem; border: 1px solid #e2e8f0;">
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #0f172a;">Menor Incertidumbre</h3>
              <p style="font-size: 0.875rem; color: #64748b; line-height: 1.5;">Respaldo integral para equipos de compras, operaciones o mantenimiento.</p>
            </div>

          </div>

          <!-- 5. AWARDS CARD STYLE (DARK ON LIGHT) -->
          <div style="background-color: var(--color-primary); color: white; border-radius: 2rem; padding: 4rem;">
            <span style="font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 3rem;">Aplicado a proyectos reales</span>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem;">
              
              <div style="display: flex; flex-direction: column; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2rem;">
                <h3 style="font-size: 1.25rem; font-weight: 700; color: white;">Rótulos exteriores</h3>
                <p style="font-size: 0.875rem; color: #cbd5e1; line-height: 1.6;">La Garantía Xprinta aporta seguridad sobre elementos expuestos a condiciones ambientales adversas, uso continuado y necesidades de visibilidad diaria.</p>
              </div>

              <div style="display: flex; flex-direction: column; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2rem;">
                <h3 style="font-size: 1.25rem; font-weight: 700; color: white;">Vinilos y Señalética</h3>
                <p style="font-size: 0.875rem; color: #cbd5e1; line-height: 1.6;">La correcta elección de materiales ayuda a mantener acabados, colores y adherencia en función del soporte, ubicación y uso previsto en interiores y exteriores.</p>
              </div>

              <div style="display: flex; flex-direction: column; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2rem;">
                <h3 style="font-size: 1.25rem; font-weight: 700; color: white;">Elementos luminosos</h3>
                <p style="font-size: 0.875rem; color: #cbd5e1; line-height: 1.6;">Permite trabajar con una visión más orientada a la durabilidad de los componentes LED o neón, su vida útil y el mantenimiento futuro.</p>
              </div>

              <div style="display: flex; flex-direction: column; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2rem;">
                <h3 style="font-size: 1.25rem; font-weight: 700; color: white;">Proyectos Nacionales</h3>
                <p style="font-size: 0.875rem; color: #cbd5e1; line-height: 1.6;">Contar con una garantía por escrito facilita que la marca tenga un criterio común de calidad y respuesta ante posibles incidencias en diferentes puntos de España.</p>
              </div>

              <!-- Image Card (Span 2) -->
              <style>
                .img-span-2 { grid-column: span 1; }
                @media (min-width: 640px) { .img-span-2 { grid-column: span 2; } }
              </style>
              <div class="img-span-2" style="border-radius: 1rem; overflow: hidden; min-height: 250px; display: flex;">
                <img src="/por-que-xprinta/Garantía%20Xprinta/pexels-fauxels-3184660.jpg" alt="Proyectos reales" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>

            </div>
          </div>

        </div>
      </section>

      <!-- 6. FOOTER CTA (DARK) -->
      <section style="background-color: #F3F4F6; padding-bottom: 6rem;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
          <div style="background-color: black; border-radius: 2rem; padding: 4rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 2rem;">
            
            <h2 class="font-serif" style="flex: 1 1 50%; min-width: 300px; font-size: clamp(2rem, 4vw, 2.5rem); font-weight: 700; color: white; line-height: 1.2; margin: 0;">
              Con la Garantía Xprinta, tu empresa trabaja con la tranquilidad de contar con productos respaldados por escrito.
            </h2>
            
            <div style="flex: 0 0 auto; display: flex; flex-direction: column; align-items: center;">
              <a href="/contacto" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; border-radius: 9999px; background-color: white; color: black; font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; border: 2px solid white; transition: all 0.3s ease;" 
                 onmouseover="this.style.backgroundColor='transparent'; this.style.color='white';" 
                 onmouseout="this.style.backgroundColor='white'; this.style.color='black';">
                Contactar Ahora
                <span>→</span>
              </a>
              <span style="margin-top: 1rem; font-size: 0.75rem; font-style: italic; color: #9ca3af;">Protege tu imagen hoy.</span>
            </div>

          </div>
        </div>
      </section>

    </main>
  `;

  return await createLayout({ content, pageClass: 'page-garantia', hideHeader: false });
};
