import { createLayout } from '../layout.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const renderEcosign = async () => {
  const content = `
    <!-- MAIN CONTAINER matching Elixir Studio structure -->
    <main class="w-full bg-white flex-1" style="min-height: 100vh;">

      <!-- A. HERO SECTION (DARK) -->
      <div style="background-color: var(--color-primary); padding: 10rem 0 6rem 0; margin-bottom: 4rem;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">

          <!-- Título Principal -->
          <h1 class="font-serif text-large" style="color: white; max-width: 900px; line-height: 1.1; margin-bottom: 2.5rem;">
            Una forma propia de identificar productos y procesos con criterios de sostenibilidad.
          </h1>

          <!-- Descripción -->
          <div class="font-body" style="color: #9ca3af; font-size: 1.125rem; max-width: 600px; line-height: 1.7;">
            <p>La sostenibilidad también forma parte de la imagen física de una marca. Cada rótulo, vinilo, impresión, soporte o elemento instalado en un punto de venta implica decisiones sobre materiales, procesos, durabilidad, mantenimiento y reposición.</p>
          </div>
        </div>
      </div>

      <!-- ESPACIADOR -->
      <div style="height: 4rem;"></div>

      <!-- B. INTRODUCCIÓN (LIGHT) -->
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 1rem;">Nuestra Visión</p>
          <p class="font-serif" style="font-size: clamp(1.5rem, 3vw, 2.5rem); line-height: 1.4; color: #0f172a; max-width: 1000px;">
            ECOSIGN es el compromiso propio de Xprinta para ayudar a identificar aquellos elementos fabricados bajo criterios internos de sostenibilidad y responsabilidad medioambiental, aportando una forma más consciente de desarrollar la imagen visual en espacios físicos.
          </p>
        </div>
      </div>

      <!-- ESPACIADOR -->
      <div style="height: 6rem;"></div>

      <!-- C. QUÉ SIGNIFICA (DARK CARD IN LIGHT THEME) -->
      <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <div style="background-color: var(--color-primary); border-radius: 1.5rem; padding: 4rem 3rem;">
          <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 2.5rem;">Qué significa</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem;">
            <div>
              <p style="font-size: 3rem; font-weight: 700; color: #4b5563; line-height: 1; margin-bottom: 1rem;">01</p>
              <h3 style="font-size: 1rem; font-weight: 700; color: white; margin-bottom: 0.5rem;">Indicador Propio</h3>
              <p style="font-size: 0.875rem; color: #9ca3af; line-height: 1.6;">ECOSIGN no es una certificación oficial ni debe entenderse como un sello externo homologado. Es un indicador propio de Xprinta.</p>
            </div>
            <div>
              <p style="font-size: 3rem; font-weight: 700; color: #4b5563; line-height: 1; margin-bottom: 1rem;">02</p>
              <h3 style="font-size: 1rem; font-weight: 700; color: white; margin-bottom: 0.5rem;">Buenas Prácticas</h3>
              <p style="font-size: 0.875rem; color: #9ca3af; line-height: 1.6;">Creado para señalar productos y procesos que se han desarrollado siguiendo buenas prácticas internas y una selección técnica cuidadosa.</p>
            </div>
            <div>
              <p style="font-size: 3rem; font-weight: 700; color: #4b5563; line-height: 1; margin-bottom: 1rem;">03</p>
              <h3 style="font-size: 1rem; font-weight: 700; color: white; margin-bottom: 0.5rem;">Decisiones Conscientes</h3>
              <p style="font-size: 0.875rem; color: #9ca3af; line-height: 1.6;">Permite incorporar criterios de sostenibilidad sin perder visibilidad, resistencia, durabilidad y coherencia con la marca.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ESPACIADOR -->
      <div style="height: 6rem;"></div>

      <!-- D. QUÉ APORTA AL CLIENTE (HOVER LIST LIGHT THEME) -->
      <div style="width: 100%;">
        <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; padding-bottom: 6rem;">
          
          <div style="display: flex; align-items: flex-end; justify-content: space-between; gap: 1.5rem; margin-bottom: 2.5rem;">
            <h2 class="font-serif" style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; color: #111827; max-width: 800px; line-height: 1.1;">Qué aporta al cliente</h2>
          </div>

          <!-- Componente estilo Hover-Group de Elixir (Usando CSS en línea para simular el comportamiento o clases personalizadas) -->
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
              <div style="min-width: 0; flex: 1;"><h3>Selección Técnica</h3></div>
              <p>Materiales más cuidados y responsables con el entorno.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Alineación Visual</h3></div>
              <p>Equilibrio entre la imagen corporativa y el compromiso medioambiental.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Decisiones Conscientes</h3></div>
              <p>En proyectos de rotulación, señalética e impresión.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Menos Improvisación</h3></div>
              <p>Reducción de soluciones poco eficientes.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Mayor Durabilidad</h3></div>
              <p>Atención al ciclo de vida de los elementos instalados.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Criterios Nacionales</h3></div>
              <p>Posibilidad de integrar criterios sostenibles en proyectos multiubicación.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Responsabilidad</h3></div>
              <p>Una forma más ordenada de trasladarla a la imagen física de marca.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Apoyo Operativo</h3></div>
              <p>Ayuda a equipos de marketing, compras y expansión.</p>
              <span class="elixir-list-icon">→</span>
            </a>
            <a href="#" class="elixir-list-item">
              <div style="min-width: 0; flex: 1;"><h3>Coherencia</h3></div>
              <p>Entre presencia comercial, calidad visual y buenas prácticas.</p>
              <span class="elixir-list-icon">→</span>
            </a>
          </div>

        </div>
      </div>

      <!-- ESPACIADOR -->
      <div style="height: 2rem;"></div>

      <!-- E. SPLIT SCREEN (LIGHT THEME) -->
      <section class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 3rem;">
          
          <!-- Columna Izquierda (Texto Grande) -->
          <div style="flex: 1 1 45%; min-width: 300px;">
            <p class="font-serif" style="font-size: clamp(1.5rem, 3vw, 2.5rem); line-height: 1.4; color: #0f172a; margin-bottom: 1.25rem;">
              Por qué es importante
            </p>
            <p style="color: var(--color-highlight); font-weight: 600; font-size: 1.125rem;">
              Las grandes marcas necesitan cuidar su presencia visual, prestando atención al impacto en sus locales.
            </p>
          </div>

          <!-- Columna Derecha (Párrafos Descriptivos) -->
          <div class="font-body" style="flex: 1 1 45%; min-width: 300px; color: #475569; line-height: 1.6; display: flex; flex-direction: column; gap: 1.5rem;">
            <p style="font-size: 1rem;">
              <strong style="color: #111827;">La sostenibilidad no es solo el material</strong><br>
              En proyectos de rotulación, influye la durabilidad, la planificación, la optimización de recursos y la capacidad de mantener elementos en buen estado durante más tiempo.
            </p>
            <p style="font-size: 1rem;">
              <strong style="color: #111827;">Una referencia clara</strong><br>
              ECOSIGN ayuda a introducir ese criterio, ofreciendo al cliente una forma de identificar soluciones desarrolladas con mayor responsabilidad dentro del ecosistema Xprinta.
            </p>
            <p style="font-size: 1rem;">
              <strong style="color: #111827;">Implantación Nacional</strong><br>
              Ayuda a mantener una línea de trabajo coherente entre diferentes ubicaciones, incorporando materiales y procesos seleccionados con mayor responsabilidad.
            </p>
            <p style="font-size: 1rem;">
              <strong style="color: #111827;">Renovación Consciente</strong><br>
              En procesos de rebranding, ECOSIGN sirve como referencia para replantear la imagen física sin perder control técnico ni consistencia visual.
            </p>
          </div>

        </div>
      </section>

      <!-- ESPACIADOR -->
      <div style="height: 6rem;"></div>

      <!-- F. CTA BANNER (BLACK CARD) -->
      <section class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; margin-bottom: 6rem;">
        <div style="background-color: black; border-radius: 1.5rem; padding: 3rem 4rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 2rem;">
          
          <h2 class="font-serif" style="flex: 1 1 50%; min-width: 300px; font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 700; color: white; line-height: 1.2; margin: 0;">
            Con ECOSIGN, Xprinta incorpora la sostenibilidad desde una perspectiva práctica.
          </h2>
          
          <div style="flex: 0 0 auto; display: flex; flex-direction: column; align-items: center;">
            <a href="/contacto" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border-radius: 9999px; background-color: white; color: black; font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; border: 2px solid white; transition: all 0.3s ease;" 
               onmouseover="this.style.backgroundColor='transparent'; this.style.color='white';" 
               onmouseout="this.style.backgroundColor='white'; this.style.color='black';">
              Implementar Ecosign
              <span>→</span>
            </a>
            <span style="margin-top: 0.75rem; font-size: 0.75rem; font-style: italic; color: #9ca3af;">Adaptado a tus necesidades</span>
          </div>

        </div>
      </section>

    </main>
  `;

  return await createLayout({ content, pageClass: 'page-ecosign', hideHeader: false });
};
