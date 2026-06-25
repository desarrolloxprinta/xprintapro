import { createLayout } from '../layout.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const renderTrazabilidadProducto = async () => {
  const content = `
    <!-- MAIN CONTAINER matching Elixir Studio Brand Creation structure -->
    <main class="w-full bg-white flex-1" style="min-height: 100vh;">

      <!-- 1. HERO SECTION (DARK) -->
      <div style="background-color: var(--color-primary); padding: 10rem 0 6rem 0; margin-bottom: 4rem;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
          
          <!-- Título Principal -->
          <h1 class="font-serif text-large" style="color: white; max-width: 900px; line-height: 1.1; margin-bottom: 2.5rem;">
            Cada elemento de imagen queda identificado, controlado y preparado para futuras necesidades.
          </h1>

          <!-- Descripción -->
          <div class="font-body" style="color: #9ca3af; font-size: 1.125rem; max-width: 600px; line-height: 1.7;">
            <p>Xprinta trabaja con una fabricación online coordinada en toda su red para mantener el control sobre cada rótulo, vinilo e impresión, facilitando tanto la calidad inicial del proyecto como su mantenimiento futuro.</p>
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
            En proyectos de rotulación, señalética e implantación de marca, la trazabilidad no es un detalle técnico: es una herramienta de control.
          </p>
        </div>

        <!-- 3-Column Grid "Qué significa" -->
        <div>
          <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 2.5rem;">Qué significa</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 3rem;">
            <div>
              <p style="font-size: 3.5rem; font-weight: 700; color: #e5e7eb; line-height: 1; margin-bottom: 1.25rem;">01</p>
              <h3 style="font-size: 1rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">Control Documentado</h3>
              <p style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">Cada elemento fabricado queda asociado a un proyecto, ubicación o necesidad concreta.</p>
            </div>
            <div>
              <p style="font-size: 3.5rem; font-weight: 700; color: #e5e7eb; line-height: 1; margin-bottom: 1.25rem;">02</p>
              <h3 style="font-size: 1rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">Registro de Especificaciones</h3>
              <p style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">Se controlan aspectos clave como colores, medidas, materiales, garantías y vida útil de la iluminación.</p>
            </div>
            <div>
              <p style="font-size: 3.5rem; font-weight: 700; color: #e5e7eb; line-height: 1; margin-bottom: 1.25rem;">03</p>
              <h3 style="font-size: 1rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">Archivo y Recuperación</h3>
              <p style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">Los proyectos quedan archivados para reposiciones, ampliaciones, mantenimientos o rebranding sin empezar de cero.</p>
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
            Trabajar sobre datos ya validados, no sobre suposiciones.
          </h2>
          <div style="margin-bottom: 3rem; color: #9ca3af; font-size: 1.125rem; max-width: 700px;">
            Cualquier variación en color, medida, material o iluminación puede generar una imagen poco consistente. La trazabilidad reduce estos riesgos drásticamente.
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem;">
            <div>
              <h3 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 1rem;">Coherencia Visual</h3>
              <p style="font-size: 0.875rem; color: #9ca3af; line-height: 1.6;">Asegura que tu marca se perciba de forma uniforme y estable a lo largo del tiempo.</p>
            </div>
            <div>
              <h3 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 1rem;">Resolución Ágil</h3>
              <p style="font-size: 0.875rem; color: #9ca3af; line-height: 1.6;">Localiza incidencias, revisa históricos y repite elementos con total confianza y agilidad.</p>
            </div>
            <div>
              <h3 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 1rem;">No Empezar de Cero</h3>
              <p style="font-size: 0.875rem; color: #9ca3af; line-height: 1.6;">Gana control y continuidad, evitando el esfuerzo de tener que validar todo nuevamente ante una ampliación.</p>
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
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Expansión</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Redes de Tiendas</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Reproducir elementos manteniendo estrictamente los mismos criterios en distintas ubicaciones.</p>
            </div>

            <!-- Card 2 -->
            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Incidencias</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Mantenimiento Rápido</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Identificar qué se instaló y con qué características para sustituir o reparar sin errores.</p>
            </div>

            <!-- Card 3 -->
            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Sistemas</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Control de Iluminación</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Seguimiento sobre garantías, componentes y vida útil para facilitar el mantenimiento preventivo.</p>
            </div>

            <!-- Card 4 -->
            <div style="background-color: #111827; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; min-height: 200px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1f2937'" onmouseout="this.style.backgroundColor='#111827'">
              <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1.5rem;">Estratégico</p>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: white; line-height: 1.4;">Rebranding Planificado</h3>
              <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.875rem;">Analizar históricos para actualizar la imagen con más orden, rapidez y menos margen de error.</p>
            </div>

            <!-- Image Card (Span 2) -->
            <style>
              .img-span-2 { grid-column: span 1; }
              @media (min-width: 640px) { .img-span-2 { grid-column: span 2; } }
            </style>
            <div class="img-span-2" style="border-radius: 1rem; overflow: hidden; min-height: 200px; display: flex;">
              <img src="/por-que-xprinta/Trazabilidad%20de%20producto/trazabilidad-producto.jpg" alt="Trazabilidad y control logístico" style="width: 100%; height: 100%; object-fit: cover; object-position: center 20%;" />
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
              <div style="min-width: 0; flex: 1;"><h3>Control Documentado</h3></div>
              <p>De todos los rótulos, vinilos e impresiones realizados.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Registro de Materiales</h3></div>
              <p>Datos precisos de colores, medidas y compuestos utilizados.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Coherencia Asegurada</h3></div>
              <p>Uniformidad visual entre diferentes ubicaciones de la marca.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Recuperación Inmediata</h3></div>
              <p>De proyectos anteriores sin burocracia ni rediseños innecesarios.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Expansión Simplificada</h3></div>
              <p>Facilidad para abordar reposiciones y nuevas aperturas.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Garantías bajo control</h3></div>
              <p>Gestión proactiva de la vida útil en iluminación LED y estructuras.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Reducción de Errores</h3></div>
              <p>Eliminación de la incertidumbre en nuevas fabricaciones.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Agilidad de Rebranding</h3></div>
              <p>Transiciones más limpias, ordenadas y rápidas en toda la red.</p>
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
            Mantén tu imagen impecable hoy y preparada para cualquier necesidad en el futuro.
          </h2>
          
          <div style="flex: 0 0 auto; display: flex; flex-direction: column; align-items: center;">
            <a href="/contacto" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border-radius: 9999px; background-color: white; color: black; font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; border: 2px solid white; transition: all 0.3s ease;" 
               onmouseover="this.style.backgroundColor='transparent'; this.style.color='white';" 
               onmouseout="this.style.backgroundColor='white'; this.style.color='black';">
              Empezar Proyecto
              <span>→</span>
            </a>
            <span style="margin-top: 0.75rem; font-size: 0.75rem; font-style: italic; color: #9ca3af;">Máximo control técnico</span>
          </div>

        </div>
      </section>

    </main>
  `;

  return await createLayout({ content, pageClass: 'page-trazabilidad-producto', hideHeader: false });
};
