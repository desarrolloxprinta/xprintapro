import { createLayout } from '../layout.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const renderGestionProyectos = async () => {
  const content = `
    <!-- MAIN CONTAINER -->
    <main class="w-full bg-white flex-1" style="min-height: 100vh;">

      <!-- 1. HERO SECTION (DARK) -->
      <div style="background-color: var(--color-primary); padding: 10rem 0 6rem 0; margin-bottom: 4rem;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">

          <span style="font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; color: #9ca3af; text-transform: uppercase; display: block; margin-bottom: 1.5rem;">Gestión de proyectos</span>

          <!-- Título Principal -->
          <h1 class="font-serif text-large" style="color: white; max-width: 900px; line-height: 1.1; margin-bottom: 2.5rem;">
            Control online y visión global de cada proyecto de implantación de marca.
          </h1>

          <!-- Descripción -->
          <div class="font-body" style="color: #9ca3af; font-size: 1.125rem; max-width: 600px; line-height: 1.7;">
            <p>Cuando una empresa implanta o mantiene su imagen en diferentes puntos de España, necesita algo más que ejecución. Necesita información clara, seguimiento constante y acceso ordenado a todo lo que ocurre en cada ubicación.</p>
          </div>
        </div>
      </div>

      <!-- 2. ORIGINS (LIGHT BACKGROUND 2-COLUMN) + IMAGE -->
      <section style="background-color: white; color: #0f172a; padding: 4rem 0;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem; margin-bottom: 4rem;">
            <!-- Left Column: Heading -->
            <div style="flex: 1; min-width: 300px;">
              <span style="font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; color: #64748b; text-transform: uppercase; display: block; margin-bottom: 1rem;">Qué significa</span>
              <h2 class="font-serif" style="font-size: clamp(2rem, 3vw, 2.5rem); font-weight: 700; line-height: 1.3;">
                Xprinta cuenta con un Brand Center de desarrollo propio para que el cliente pueda controlar sus proyectos nacionales desde un entorno online privado.
              </h2>
            </div>
            
            <!-- Right Column: Paragraphs -->
            <div class="font-body" style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 1.5rem; color: #475569; font-size: 1.125rem; line-height: 1.7;">
              <p>El Brand Center de cliente es una plataforma desarrollada por Xprinta para centralizar la gestión y el seguimiento de proyectos de imagen corporativa en espacios físicos.</p>
              <p>Desde este entorno, el cliente puede consultar la evolución de sus trabajos en todo el territorio nacional: fases de diseño y fabricación, previsión de instalación, tiempos de ejecución, presupuestos, facturas y fotografías del trabajo terminado una vez instalado.</p>
              <p>Todo se gestiona online, con permisos de acceso privado y disponibilidad cualquier día del año.</p>
            </div>
          </div>

          <!-- Hero / Break Image -->
          <div style="border-radius: 1.5rem; overflow: hidden; width: 100%; height: 500px; margin-bottom: 6rem;">
            <img src="/por-que-xprinta/Gestión%20de%20proyectos/pexels-olly-920381.jpg" alt="Equipos" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>

        </div>
      </section>

      <!-- 3. POR QUÉ ES IMPORTANTE (3-COLUMN NUMBER GRID ON LIGHT) -->
      <section style="background-color: white; padding-bottom: 6rem;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
          <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 2.5rem;">Por qué es importante</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 3rem;">
            <div>
              <p style="font-size: 3.5rem; font-weight: 700; color: #e5e7eb; line-height: 1; margin-bottom: 1.25rem;">01</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">Falta de Visibilidad</h3>
              <p style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">En proyectos con múltiples puntos de venta, oficinas, locales o franquicias, la falta de visibilidad genera incertidumbre. El cliente necesita saber qué está pendiente, qué se está fabricando y qué se ha instalado.</p>
            </div>
            <div>
              <p style="font-size: 3.5rem; font-weight: 700; color: #e5e7eb; line-height: 1; margin-bottom: 1.25rem;">02</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">Información Dispersa</h3>
              <p style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">Sin una herramienta centralizada, la información suele quedar dispersa en correos, llamadas, documentos, fotografías o conversaciones con distintos interlocutores.</p>
            </div>
            <div>
              <p style="font-size: 3.5rem; font-weight: 700; color: #e5e7eb; line-height: 1; margin-bottom: 1.25rem;">03</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">Control Centralizado</h3>
              <p style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">El Brand Center permite ordenar el proyecto, mejorar el control y facilitar la toma de decisiones. Cada actuación queda registrada y vinculada a su ubicación, evitando pérdidas de información.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. APLICADO A PROYECTOS REALES (DARK WRAPPER) WITH SPAN IMAGE -->
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <div style="background-color: black; border-radius: 1.5rem; padding: 4rem 3rem;">
          <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 2.5rem;">Aplicado a proyectos reales</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            
            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Nacional</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Implantación de Marca</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">El Brand Center permite consultar qué puntos están en fase de diseño, cuáles han pasado a fabricación y qué instalaciones están programadas.</p>
            </div>

            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Retail</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Apertura de Oficinas</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Facilita el control de presupuestos, tiempos de instalación y documentación asociada a cada nueva ubicación comercial o corporativa.</p>
            </div>

            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Operaciones</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Mantenimiento</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Permite revisar actuaciones anteriores, consultar fotografías finales y localizar información útil para futuras intervenciones técnicas.</p>
            </div>

            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Corporativo</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Rebranding</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Ofrece una visión ordenada del avance del proyecto en toda España, ayudando a coordinar decisiones en la actualización de imagen.</p>
            </div>

            <!-- Image Card (Span 2) -->
            <style>
              .img-span-2 { grid-column: span 1; }
              @media (min-width: 640px) { .img-span-2 { grid-column: span 2; } }
            </style>
            <div class="img-span-2" style="border-radius: 1rem; overflow: hidden; min-height: 250px; display: flex;">
              <video autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover;" src="/por-que-xprinta/Gestión%20de%20proyectos/extranet-mock.mp4"></video>
            </div>

          </div>
        </div>
      </div>

      <div style="height: 6rem;"></div>

      <!-- 5. PROGRAMS LIST (INTERACTIVE ROW LIST ON LIGHT) -->
      <div style="width: 100%;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; padding-bottom: 6rem;">
          
          <div style="display: flex; align-items: flex-end; justify-content: space-between; gap: 1.5rem; margin-bottom: 2.5rem;">
            <h2 class="font-serif" style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; color: #111827; max-width: 800px; line-height: 1.1;">Qué aporta al cliente</h2>
          </div>

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
              <div style="min-width: 0; flex: 1;"><h3>Seguimiento online</h3></div>
              <p>Proyectos de implantación de marca en toda España en tiempo real.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Visión global</h3></div>
              <p>Conoce el estado exacto de cada ubicación al instante.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Control de fases</h3></div>
              <p>Diseño, fabricación e instalación siempre a la vista.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Facturas y Presupuestos</h3></div>
              <p>Documentación unificada desde un entorno centralizado.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Fotografías Finales</h3></div>
              <p>Acceso a las imágenes del trabajo terminado en cada local.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Mayor trazabilidad</h3></div>
              <p>Registro histórico sobre cada actuación realizada.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Disponibilidad 24/7</h3></div>
              <p>Información disponible cualquier día del año sin esperas.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Accesos Privados</h3></div>
              <p>Permisos y roles configurados para los perfiles autorizados.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Sin dispersión</h3></div>
              <p>Menos dependencia de correos, llamadas o archivos sueltos.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Gestión documental</h3></div>
              <p>Mayor seguridad, orden y respaldo en los documentos.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Ahorro de tiempo</h3></div>
              <p>Reducción de gestiones para equipos de marketing o compras.</p>
              <span class="elixir-list-icon">→</span>
            </a>
          </div>



        </div>
      </div>

      <!-- 6. CTA BANNER (BLACK CARD) -->
      <section class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; margin-bottom: 6rem;">
        <div style="background-color: black; border-radius: 1.5rem; padding: 3rem 4rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 2rem;">
          
          <h2 class="font-serif" style="flex: 1 1 50%; min-width: 300px; font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 700; color: white; line-height: 1.2; margin: 0;">
            Con el Brand Center dispones de una herramienta propia para gestionar tu imagen visual.
          </h2>
          
          <div style="flex: 0 0 auto; display: flex; flex-direction: column; align-items: center;">
            <a href="/contacto" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border-radius: 9999px; background-color: white; color: black; font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; border: 2px solid white; transition: all 0.3s ease;" 
               onmouseover="this.style.backgroundColor='transparent'; this.style.color='white';" 
               onmouseout="this.style.backgroundColor='white'; this.style.color='black';">
              Solicitar Acceso
              <span>→</span>
            </a>
            <span style="margin-top: 0.75rem; font-size: 0.75rem; font-style: italic; color: #9ca3af;">Transparencia y control</span>
          </div>

        </div>
      </section>

    </main>
  `;

  return await createLayout({ content, pageClass: 'page-gestion-proyectos', hideHeader: false });
};
