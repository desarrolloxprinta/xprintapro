import { createLayout } from '../layout.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const renderFinanciacion = async () => {
  const content = `
    <!-- MAIN CONTAINER matching Elixir Studio Brand Creation structure -->
    <main class="w-full bg-white flex-1" style="min-height: 100vh;">

      <!-- 1. HERO SECTION (DARK) -->
      <div style="background-color: var(--color-primary); padding: 10rem 0 6rem 0; margin-bottom: 4rem;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
          
          <!-- Título Principal -->
          <h1 class="font-serif text-large" style="color: white; max-width: 900px; line-height: 1.1; margin-bottom: 2.5rem;">
            Facilitamos la inversión en imagen visual adaptándonos a la tesorería de cada empresa.
          </h1>

          <!-- Descripción -->
          <div class="font-body" style="color: #9ca3af; font-size: 1.125rem; max-width: 600px; line-height: 1.7;">
            <p>La implantación, renovación o mantenimiento de la imagen corporativa puede implicar inversiones relevantes, especialmente cuando afecta a varias oficinas, tiendas, locales o puntos de venta.</p>
          </div>
        </div>
      </div>

      <!-- ESPACIADOR -->
      <div style="height: 4rem;"></div>

      <!-- 2. INTRODUCCIÓN (LIGHT) -->
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <div style="max-width: 1200px; margin: 0 auto; margin-bottom: 4rem;">
          <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 2rem;">Introducción</p>
          <p class="font-serif" style="font-size: clamp(1.5rem, 3vw, 2.5rem); line-height: 1.4; color: #0f172a; max-width: 1000px;">
            En Xprinta no solo gestionamos el proyecto técnico y operativo: también buscamos facilitar la forma de pago para que cada empresa pueda avanzar sin tensionar innecesariamente su tesorería.
          </p>
        </div>

        <!-- 3-Column Grid "Qué significa" -->
        <div>
          <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 2.5rem;">Qué significa</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 3rem;">
            <div>
              <p style="font-size: 3.5rem; font-weight: 700; color: #e5e7eb; line-height: 1; margin-bottom: 1.25rem;">01</p>
              <h3 style="font-size: 1rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">Adaptación al cliente</h3>
              <p style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">Xprinta se adapta, siempre que sea posible, a la forma de pago habitual de cada marca para facilitar la inversión.</p>
            </div>
            <div>
              <p style="font-size: 3.5rem; font-weight: 700; color: #e5e7eb; line-height: 1; margin-bottom: 1.25rem;">02</p>
              <h3 style="font-size: 1rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">FlexiPay y eRenting</h3>
              <p style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">Opciones de financiar hasta en 4 plazos sin intereses mediante FlexiPay, o hasta en 60 meses mediante renting tecnológico eRenting.</p>
            </div>
            <div>
              <p style="font-size: 3.5rem; font-weight: 700; color: #e5e7eb; line-height: 1; margin-bottom: 1.25rem;">03</p>
              <h3 style="font-size: 1rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">Trámites Rápidos</h3>
              <p style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">Procesos con solicitud y autorización online, de forma rápida y sin trámites complejos ni papeleos innecesarios.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ESPACIADOR -->
      <div style="height: 6rem;"></div>

      <!-- 3. BENEFITS SECTION (DARK CARD ON LIGHT) -->
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <div style="background-color: black; border-radius: 1.5rem; padding: 4rem 3rem;">
          <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1rem;">Por qué es importante</p>
          <h2 class="font-serif" style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: white; margin-bottom: 2.5rem; max-width: 800px; line-height: 1.2;">
            El coste no siempre coincide con el momento ideal de tesorería.
          </h2>
          <div style="margin-bottom: 3rem; color: #9ca3af; font-size: 1.125rem; max-width: 700px;">
            Una apertura, un rebranding, una renovación de fachada o una actuación nacional pueden concentrar inversión en un periodo muy concreto.
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem;">
            <div>
              <h3 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 1rem;">Mejor Planificación</h3>
              <p style="font-size: 0.875rem; color: #9ca3af; line-height: 1.6;">Contar con opciones de financiación ayuda a planificar mejor, evitar retrasos por motivos presupuestarios y ejecutar la imagen de marca cuando el negocio lo necesita.</p>
            </div>
            <div>
              <h3 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 1rem;">Flexibilidad Departamental</h3>
              <p style="font-size: 0.875rem; color: #9ca3af; line-height: 1.6;">Aporta flexibilidad a departamentos de compras, marketing, expansión, operaciones o dirección financiera.</p>
            </div>
            <div>
              <h3 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 1rem;">Fórmulas a Medida</h3>
              <p style="font-size: 0.875rem; color: #9ca3af; line-height: 1.6;">Posibilidad de valorar distintas fórmulas de pago según el alcance, número de ubicaciones y calendario del proyecto.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ESPACIADOR -->
      <div style="height: 6rem;"></div>

      <!-- 4. IN PRACTICE / WORKS SHOWCASE (DARK WRAPPER ON LIGHT) -->
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <div style="background-color: var(--color-primary); border-radius: 1.5rem; padding: 4rem 3rem;">
          <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 2.5rem;">Aplicado a proyectos reales</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            
            <!-- Card 1 -->
            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Retail</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Aperturas de tienda</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Distribuye el coste de rótulos, vinilos y señalética, facilitando que la imagen esté lista en el momento previsto.</p>
            </div>

            <!-- Card 2 -->
            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Corporativo</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Proyectos de Rebranding</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Ayuda a abordar la renovación de varios espacios simultáneamente sin concentrar toda la inversión al inicio.</p>
            </div>

            <!-- Card 3 -->
            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Expansión</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Actuaciones Nacionales</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Permite planificar la implantación por fases y ajustar los grandes pagos al calendario de flujo de caja del proyecto.</p>
            </div>

            <!-- Card 4 -->
            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Operaciones</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Mantenimiento y Renovación</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Ofrece una vía rápida para actuar a tiempo sin posponer intervenciones urgentes que afectan a la presencia visual.</p>
            </div>

            <!-- Image Card (Span 2) -->
            <style>
              .img-span-2 { grid-column: span 1; }
              @media (min-width: 640px) { .img-span-2 { grid-column: span 2; } }
            </style>
            <div class="img-span-2" style="border-radius: 1rem; overflow: hidden; min-height: 200px; display: flex;">
              <img src="/por-que-xprinta/Financiación%20de%20clientes/18156.jpg" alt="Proyectos reales" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>

          </div>
        </div>
      </div>

      <!-- ESPACIADOR -->
      <div style="height: 6rem;"></div>

      <!-- 5. PROGRAMS LIST (INTERACTIVE ROW LIST ON LIGHT) -->
      <div style="width: 100%;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; padding-bottom: 6rem;">
          
          <div style="display: flex; align-items: flex-end; justify-content: space-between; gap: 1.5rem; margin-bottom: 2.5rem;">
            <h2 class="font-serif" style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; color: #111827; max-width: 800px; line-height: 1.1;">Qué aporta al cliente</h2>
          </div>

          <!-- Componente estilo Hover-Group de Elixir -->
          <style>
            .elixir-list-group:hover .elixir-list-item { opacity: 0.3; }
            .elixir-list-group .elixir-list-item:hover { opacity: 1 !important; }
            .elixir-list-item { transition: all 0.3s ease; border-bottom: 1px solid #e5e7eb; padding: 1.5rem 0; display: flex; align-items: center; gap: 1.5rem; text-decoration: none; }
            .elixir-list-item h3 { font-size: clamp(1.25rem, 2vw, 1.875rem); font-weight: 700; color: #111827; margin: 0; transition: transform 0.3s ease; }
            .elixir-list-item p { color: #9ca3af; flex: 1; margin: 0; transition: color 0.3s ease; }
            .elixir-list-item:hover h3 { transform: translateX(8px); }
            .elixir-list-item:hover p { color: #1f2937; }
            .elixir-list-icon { color: #9ca3af; transition: all 0.3s ease; }
            .elixir-list-item:hover .elixir-list-icon { color: #000; transform: translateX(4px); }
            @media (max-width: 640px) { .elixir-list-item p { display: none; } }
          </style>

          <div class="elixir-list-group">
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Mayor flexibilidad</h3></div>
              <p>Para afrontar proyectos ambiciosos de imagen visual.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Adaptación al pago</h3></div>
              <p>Nos ajustamos a la forma de pago habitual de tu marca.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>FlexiPay sin intereses</h3></div>
              <p>Posibilidad de financiar hasta en cuatro plazos sin costes extra.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Renting Tecnológico</h3></div>
              <p>Alternativa de financiación eRenting de hasta 60 meses.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>100% Online</h3></div>
              <p>Solicitud y autorización rápida, sin papeleos innecesarios.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Planificación segura</h3></div>
              <p>Mejora la gestión y previsión de la tesorería de tu empresa.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Menor impacto inicial</h3></div>
              <p>Protege la caja en aperturas, grandes renovaciones o rebranding.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Facilidad multipunto</h3></div>
              <p>Aborda actuaciones simultáneas en varios puntos de venta.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Apoyo de equipos</h3></div>
              <p>Respaldo a compras, marketing, expansión, operaciones y finanzas.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Ejecución garantizada</h3></div>
              <p>No bloquees decisiones importantes por concentración de inversión.</p>
              <span class="elixir-list-icon">→</span>
            </a>
          </div>

        </div>
      </div>

      <!-- ESPACIADOR -->
      <div style="height: 2rem;"></div>

      <!-- 6. CTA BANNER (BLACK CARD) -->
      <section class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; margin-bottom: 6rem;">
        <div style="background-color: black; border-radius: 1.5rem; padding: 3rem 4rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 2rem;">
          
          <h2 class="font-serif" style="flex: 1 1 50%; min-width: 300px; font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 700; color: white; line-height: 1.2; margin: 0;">
            La financiación se convierte en una herramienta más para facilitar la implantación de tu imagen.
          </h2>
          
          <div style="flex: 0 0 auto; display: flex; flex-direction: column; align-items: center;">
            <a href="/contacto" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border-radius: 9999px; background-color: white; color: black; font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; border: 2px solid white; transition: all 0.3s ease;" 
               onmouseover="this.style.backgroundColor='transparent'; this.style.color='white';" 
               onmouseout="this.style.backgroundColor='white'; this.style.color='black';">
              Solicitar Financiación
              <span>→</span>
            </a>
            <span style="margin-top: 0.75rem; font-size: 0.75rem; font-style: italic; color: #9ca3af;">Protege tu tesorería</span>
          </div>

        </div>
      </section>

    </main>
  `;

  return await createLayout({ content, pageClass: 'page-financiacion', hideHeader: false });
};
