import { createLayout } from '../layout.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const renderRedProfesional = async () => {
  const content = `
    <!-- MAIN CONTAINER matching Elixir Studio Brand Creation structure -->
    <main class="w-full bg-white flex-1" style="min-height: 100vh;">

      <!-- 1. HERO SECTION (DARK) -->
      <div style="background-color: var(--color-primary); padding: 10rem 0 6rem 0; margin-bottom: 4rem;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
          
          <!-- Título Principal -->
          <h1 class="font-serif text-large" style="color: white; max-width: 900px; line-height: 1.1; margin-bottom: 2.5rem;">
            Una red nacional con capacidad productiva propia y cercanía operativa en cada zona.
          </h1>

          <!-- Descripción -->
          <div class="font-body" style="color: #9ca3af; font-size: 1.125rem; max-width: 600px; line-height: 1.7;">
            <p>Gestionar la imagen de una marca en toda España no consiste simplemente en enviar trabajos a distintos instaladores. Requiere una red profesional coordinada, con presencia local, experiencia real y capacidad para fabricar, instalar y mantener con criterios comunes.</p>
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
            Xprinta trabaja con una red nacional de Puntos y Equipos Xprinta que permite combinar control centralizado y agilidad local en proyectos de rotulación, señalética e implantación de marca.
          </p>
        </div>

        <!-- 3-Column Grid "Qué significa" -->
        <div>
          <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 2.5rem;">Qué significa</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 3rem;">
            <div>
              <p style="font-size: 3.5rem; font-weight: 700; color: #e5e7eb; line-height: 1; margin-bottom: 1.25rem;">01</p>
              <h3 style="font-size: 1rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">Puntos Especializados</h3>
              <p style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">Fabricamos la mayor parte de lo que se instala. Nuestros puntos cuentan con más de 10 años de experiencia al incorporarse.</p>
            </div>
            <div>
              <p style="font-size: 3.5rem; font-weight: 700; color: #e5e7eb; line-height: 1; margin-bottom: 1.25rem;">02</p>
              <h3 style="font-size: 1rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">Estructura Homologada</h3>
              <p style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">Sin depender de una subcontratación dispersa. Trabajamos bajo criterios unificados en diseño técnico, fabricación y mantenimiento.</p>
            </div>
            <div>
              <p style="font-size: 3.5rem; font-weight: 700; color: #e5e7eb; line-height: 1; margin-bottom: 1.25rem;">03</p>
              <h3 style="font-size: 1rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">Respuesta Cercana</h3>
              <p style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">El resultado es una forma de operar sólida: producción controlada, capacidad repartida y proximidad a cada punto de venta.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ESPACIADOR -->
      <div style="height: 6rem;"></div>

      <!-- 3. MAPA (NUEVA SECCIÓN MAPA PROXI) -->
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <div style="background-color: #f8fafc; border-radius: 1.5rem; padding: 4rem 3rem; text-align: center; border: 1px solid #e2e8f0;">
          <h2 class="font-serif" style="font-size: clamp(2rem, 3vw, 2.5rem); font-weight: 700; color: #0f172a; margin-bottom: 1rem;">Nuestra Presencia en el Territorio</h2>
          <p style="font-size: 1.125rem; color: #6b7280; max-width: 700px; margin: 0 auto 3rem auto;">Una red nacional capacitada para responder a las necesidades de tu marca, estés donde estés.</p>
          
          <div style="border-radius: 1rem; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); background: white;">
            <iframe src="https://map.proxi.co/r/jLBSkfHi2qIx9LcBccHT" allow="geolocation; clipboard-write" width="100%" height="600px" style="border-width: 0px; display: block;" allowfullscreen></iframe>
            <div style="font-family: Sans-Serif; font-size:12px;color:#000000;opacity:0.5; padding: 10px; text-align: right; background: #fff;">
              powered by <a href="https://www.proxi.co/?utm_source=poweredbyproxi" style="color:#000000" target="_blank">Proxi</a>
            </div>
          </div>
        </div>
      </div>

      <!-- ESPACIADOR -->
      <div style="height: 6rem;"></div>

      <!-- 4. BENEFITS SECTION (DARK CARD ON LIGHT) -->
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <div style="background-color: black; border-radius: 1.5rem; padding: 4rem 3rem;">
          <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1rem;">Por qué es importante</p>
          <h2 class="font-serif" style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: white; margin-bottom: 2.5rem; max-width: 800px; line-height: 1.2;">
            Mantén la calidad visual con capacidad productiva repartida y respuesta local.
          </h2>
          <div style="margin-bottom: 3rem; color: #9ca3af; font-size: 1.125rem; max-width: 700px;">
            Cuando una empresa tiene tiendas o franquicias en distintas ciudades, cada ubicación exige actuación local: mediciones, accesos, horarios, instalación, revisión de soportes o incidencias.
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem;">
            <div>
              <h3 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 1rem;">Mismos Criterios</h3>
              <p style="font-size: 0.875rem; color: #9ca3af; line-height: 1.6;">Evita las diferencias de acabado o la falta de coordinación cuando gestionas proyectos con proveedores aislados.</p>
            </div>
            <div>
              <h3 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 1rem;">Ahorro en Desplazamientos</h3>
              <p style="font-size: 0.875rem; color: #9ca3af; line-height: 1.6;">Evita retrasos y desplazamientos innecesarios para las intervenciones y actuaciones operativas locales.</p>
            </div>
            <div>
              <h3 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 1rem;">Visión Global</h3>
              <p style="font-size: 0.875rem; color: #9ca3af; line-height: 1.6;">Una red unificada permite actuar cerca del punto de venta sin renunciar a un control y visión global del proyecto.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ESPACIADOR -->
      <div style="height: 6rem;"></div>

      <!-- 5. IN PRACTICE / WORKS SHOWCASE (DARK WRAPPER ON LIGHT) -->
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <div style="background-color: var(--color-primary); border-radius: 1.5rem; padding: 4rem 3rem;">
          <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 2.5rem;">Aplicado a proyectos reales</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            
            <!-- Card 1 -->
            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Implantación</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Despliegues Nacionales</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Permite fabricar de forma coordinada los elementos y distribuir la ejecución según la ubicación.</p>
            </div>

            <!-- Card 2 -->
            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Operativa</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Rotulación y Señalética</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Los Puntos Xprinta intervienen con conocimiento local para realizar mediciones e instalar.</p>
            </div>

            <!-- Card 3 -->
            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Mantenimiento</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Correctivo y Preventivo</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">La cercanía operativa permite actuar desde el punto más próximo, mejorando la respuesta ante incidencias.</p>
            </div>

            <!-- Card 4 -->
            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Rebranding</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Renovaciones Consistentes</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Fabricación homologada y unificada para mantener una imagen coherente en distintas ciudades.</p>
            </div>

            <!-- Image Card (Span 2) -->
            <style>
              .img-span-2 { grid-column: span 1; }
              @media (min-width: 640px) { .img-span-2 { grid-column: span 2; } }
            </style>
            <div class="img-span-2" style="border-radius: 1rem; overflow: hidden; min-height: 200px; display: flex;">
              <img src="/por-que-xprinta/Red%20profesional/12741.jpg" alt="Proyectos reales red" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>

          </div>
        </div>
      </div>

      <!-- ESPACIADOR -->
      <div style="height: 6rem;"></div>

      <!-- 6. PROGRAMS LIST (INTERACTIVE ROW LIST ON LIGHT) -->
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
              <div style="min-width: 0; flex: 1;"><h3>Cobertura Nacional</h3></div>
              <p>Con presencia operativa local para una rápida capacidad de acción.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Experiencia Homologada</h3></div>
              <p>Puntos Xprinta con más de 10 años de experiencia al entrar en la red.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Fabricación Propia</h3></div>
              <p>Producimos el 90% de los elementos instalados dentro de nuestra red.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Ejecución Coordinada</h3></div>
              <p>Diseño técnico, fabricación, instalación y mantenimiento bajo control global.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Menor Dependencia</h3></div>
              <p>Se minimizan los riesgos derivados de usar proveedores externos dispersos.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Agilidad Extrema</h3></div>
              <p>Mayor respuesta en mediciones, instalaciones e incidencias locales.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Gestión Centralizada</h3></div>
              <p>Un único modelo de gestión para proyectos nacionales o multiubicación.</p>
              <span class="elixir-list-icon">→</span>
            </a>
          </div>

        </div>
      </div>

      <!-- ESPACIADOR -->
      <div style="height: 2rem;"></div>

      <!-- 7. CTA BANNER (BLACK CARD) -->
      <section class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; margin-bottom: 6rem;">
        <div style="background-color: black; border-radius: 1.5rem; padding: 3rem 4rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 2rem;">
          
          <h2 class="font-serif" style="flex: 1 1 50%; min-width: 300px; font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 700; color: white; line-height: 1.2; margin: 0;">
            Capacidad productiva propia, experiencia local y coordinación centralizada.
          </h2>
          
          <div style="flex: 0 0 auto; display: flex; flex-direction: column; align-items: center;">
            <a href="/contacto" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border-radius: 9999px; background-color: white; color: black; font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; border: 2px solid white; transition: all 0.3s ease;" 
               onmouseover="this.style.backgroundColor='transparent'; this.style.color='white';" 
               onmouseout="this.style.backgroundColor='white'; this.style.color='black';">
              Trabajar con Xprinta
              <span>→</span>
            </a>
            <span style="margin-top: 0.75rem; font-size: 0.75rem; font-style: italic; color: #9ca3af;">Tu proyecto en buenas manos</span>
          </div>

        </div>
      </section>

    </main>
  `;

  return await createLayout({ content, pageClass: 'page-red-profesional', hideHeader: false });
};
