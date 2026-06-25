import { createLayout } from '../layout.js';

export const renderLegalizacion = async () => {
  const content = `
    <!-- MAIN CONTAINER -->
    <main class="w-full bg-white flex-1" style="min-height: 100vh;">

      <!-- 1. HERO SECTION (DARK) -->
      <div style="background-color: var(--color-primary); padding: 10rem 0 6rem 0; margin-bottom: 4rem;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">

          <span style="font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; color: #9ca3af; text-transform: uppercase; display: block; margin-bottom: 1.5rem;">Legalización de proyectos</span>

          <!-- Título Principal -->
          <h1 class="font-serif text-large" style="color: white; max-width: 900px; line-height: 1.1; margin-bottom: 2.5rem;">
            Rotulación preparada para cumplir con la normativa municipal en cualquier ciudad de España.
          </h1>

          <!-- Descripción -->
          <div class="font-body" style="color: #9ca3af; font-size: 1.125rem; max-width: 600px; line-height: 1.7;">
            <p>La imagen exterior de un punto de venta no depende solo del diseño, la fabricación o la instalación. Cada vez con más frecuencia, la rotulación debe adaptarse a ordenanzas municipales, criterios técnicos y requisitos administrativos específicos de cada ayuntamiento.</p>

          </div>
        </div>
      </div>

      <!-- 2. QUÉ SIGNIFICA (2-COLUMN LIGHT TEXT) -->
      <section style="background-color: white; padding: 4rem 0 2rem 0;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
          
          <div style="display: flex; flex-wrap: wrap; gap: 4rem; margin-bottom: 4rem;">
            <!-- Left Column: Title -->
            <div style="flex: 1; min-width: 300px;">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 1.5rem;">Orígenes</p>
              <h2 class="font-serif" style="font-size: clamp(2rem, 3vw, 2.5rem); font-weight: 600; color: #111827; line-height: 1.2;">
                Qué significa la legalización en nuestro sector
              </h2>
            </div>
            
            <!-- Right Column: Paragraphs -->
            <div class="font-body" style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 1.5rem; color: #475569; font-size: 1.125rem; line-height: 1.7;">
              <p>La legalización de proyectos significa gestionar la parte técnica y administrativa necesaria para que una instalación de rotulación pueda cumplir con las exigencias municipales aplicables.</p>
              <p>Xprinta cuenta con capacidad para realizar proyectos técnicos de legalización en cualquier ciudad de España, incluyendo visado profesional cuando sea requerido, pago de tasas si procede y preparación de la documentación necesaria para ajustarse a las ordenanzas de publicidad exterior municipales.</p>
              <p>Esto permite integrar la legalización dentro del propio proceso de implantación de marca, sin que el cliente tenga que coordinar por separado a distintos agentes técnicos o administrativos.</p>
            </div>
          </div>

          <!-- Hero / Break Image -->
          <div style="border-radius: 1.5rem; overflow: hidden; width: 100%; height: 500px; margin-bottom: 6rem;">
            <img src="/por-que-xprinta/Legalización%20de%20proyectos/architectural-plans.jpg" alt="Planos y Permisos" style="width: 100%; height: 100%; object-fit: cover;" />
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
              <h3 style="font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">Diversidad Normativa</h3>
              <p style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">Cada municipio puede establecer condiciones distintas sobre dimensiones, ubicación, iluminación, materiales, salientes, soportes, horarios, estética urbana o documentación exigida para la instalación de elementos publicitarios exteriores.</p>
            </div>
            <div>
              <p style="font-size: 3.5rem; font-weight: 700; color: #e5e7eb; line-height: 1; margin-bottom: 1.25rem;">02</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">Riesgos de Retrasos</h3>
              <p style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">Para empresas con varios puntos de venta, esta diversidad normativa puede convertirse en una fuente de retrasos, incidencias o costes imprevistos si no se gestiona correctamente desde el inicio.</p>
            </div>
            <div>
              <p style="font-size: 3.5rem; font-weight: 700; color: #e5e7eb; line-height: 1; margin-bottom: 1.25rem;">03</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">Coordinación Eficaz</h3>
              <p style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">Contar con un partner que pueda coordinar la legalización evita improvisaciones, reduce riesgos administrativos y facilita que el proyecto avance con una base técnica más sólida.</p>
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
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Retail</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Apertura de Locales</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Xprinta integra la legalización exterior revisando los requisitos municipales antes de fabricar o instalar los elementos.</p>
            </div>

            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Nacional</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Red de Puntos de Venta</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Permite gestionar cada ubicación según la ordenanza aplicable en su municipio manteniendo una coordinación centralizada.</p>
            </div>

            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Gran Formato</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Luminosos y Lonas</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">La legalización ayuda a validar aspectos técnicos y administrativos que pueden ser determinantes para la aprobación municipal.</p>
            </div>

            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Corporativo</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Procesos de Rebranding</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Facilita la sustitución de la imagen exterior evitando que cada local tenga que resolver el trámite por su cuenta.</p>
            </div>

            <!-- Image Card (Span 2) -->
            <style>
              .img-span-2 { grid-column: span 1; }
              @media (min-width: 640px) { .img-span-2 { grid-column: span 2; } }
            </style>
            <div class="img-span-2" style="border-radius: 1rem; overflow: hidden; min-height: 250px; display: flex;">
              <img src="/por-que-xprinta/Legalización%20de%20proyectos/meeting-team.jpg" alt="Equipo Legal" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>

          </div>
        </div>
      </div>

      <div style="height: 6rem;"></div>

      <!-- 5. QUÉ APORTA AL CLIENTE (INTERACTIVE ROW LIST) -->
      <div style="width: 100%;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; padding-bottom: 6rem;">
          
          <div style="display: flex; align-items: flex-end; justify-content: space-between; gap: 1.5rem; margin-bottom: 2.5rem;">
            <h2 class="font-serif" style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; color: #111827; max-width: 800px; line-height: 1.1;">Qué aporta al cliente</h2>
          </div>

          <style>
            .elixir-list-group:hover .elixir-list-item { opacity: 0.3; }
            .elixir-list-group .elixir-list-item:hover { opacity: 1 !important; }
            .elixir-list-item { transition: all 0.3s ease; border-bottom: 1px solid #e5e7eb; padding: 1.5rem 0; display: flex; align-items: center; gap: 1.5rem; text-decoration: none; }
            .elixir-list-item h3 { font-size: 1.5rem; font-weight: 700; color: #111827; margin: 0; }
            .elixir-list-item p { font-size: 1rem; color: #6b7280; margin: 0; max-width: 400px; }
            .elixir-list-icon { color: #111827; font-size: 1.5rem; }
          </style>

          <div class="elixir-list-group">
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Gestión técnica integral</h3></div>
              <p>Legalización para proyectos en cualquier ciudad de España.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Documentación y visados</h3></div>
              <p>Preparación técnica e inclusión de visado profesional cuando sea necesario.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Gestión de tasas</h3></div>
              <p>Tramitación del pago de tasas municipales cuando proceda.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Reducción de riesgos</h3></div>
              <p>Evitar incumplimientos normativos y mejorar el control de plazos.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Menor carga interna</h3></div>
              <p>Liberar a los equipos del cliente de trámites administrativos municipales.</p>
              <span class="elixir-list-icon">→</span>
            </a>
          </div>

        </div>
      </div>

      <!-- 6. CTA BANNER (BLACK CARD) -->
      <section class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; margin-bottom: 6rem;">
        <div style="background-color: black; border-radius: 1.5rem; padding: 3rem 4rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 2rem;">
          
          <h2 class="font-serif" style="flex: 1 1 50%; min-width: 300px; font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 700; color: white; line-height: 1.2; margin: 0;">
            Con Xprinta, la legalización forma parte de una gestión completa.
          </h2>
          
          <div style="flex: 0 0 auto; display: flex; flex-direction: column; align-items: center;">
            <a href="/contacto" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border-radius: 9999px; background-color: white; color: black; font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; border: 2px solid white; transition: all 0.3s ease;" 
               onmouseover="this.style.backgroundColor='transparent'; this.style.color='white';" 
               onmouseout="this.style.backgroundColor='white'; this.style.color='black';">
              Solicitar Presupuesto
              <span>→</span>
            </a>
            <p style="margin-top: 0.75rem; color: #9ca3af; font-size: 0.75rem;">Diseño, fabricación y normativas en un solo lugar</p>
          </div>
          
        </div>
      </section>

    </main>
  `;

  return await createLayout({ content, pageClass: 'page-legalizacion', hideHeader: false });
}
