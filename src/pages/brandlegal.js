import { createLayout } from '../layout.js'

export const getBrandLegalHTML = async () => {
  const layoutHTML = `
    <style>
      /* Layout Strategic Approach */
      .sa-bg-light { background-color: var(--bc-light); }
      .sa-bg-dark { background-color: var(--bc-dark); color: var(--bc-white); }
      
      .sa-pill {
        display: inline-block;
        border: 1px solid rgba(0, 0, 0, 0.15);
        padding: 8px 12px;
        border-radius: 24px;
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--bc-dark);
        margin-bottom: 1rem;
      }
      .sa-bg-dark .sa-pill {
        border-color: rgba(255, 255, 255, 0.32);
        color: var(--bc-white);
      }

      .sa-h2 {
        font-family: var(--font-family-serif, serif);
        font-size: 48px;
        font-weight: 500;
        line-height: 1.1;
        color: var(--bc-dark);
        margin-bottom: 1.5rem;
      }
      .sa-bg-dark .sa-h2 { color: var(--bc-white); }
      
      .sa-desc {
        font-family: var(--font-family-base, sans-serif);
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        color: var(--bc-text-muted);
      }
      .sa-bg-dark .sa-desc { color: rgba(255,255,255,0.7); }

      /* Split Layout (Sticky Left) */
      .sa-split-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
        padding: 6rem 0;
      }
      @media (min-width: 992px) {
        .sa-split-grid {
          grid-template-columns: 4fr 6fr;
          gap: 6rem;
          padding: 8rem 0;
        }
      }

      .sa-sticky-col {
        position: relative;
      }
      @media (min-width: 992px) {
        .sa-sticky-col {
          position: sticky;
          top: 120px;
        }
      }

      /* Horizontal Image Grid */
      .sa-image-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        margin-top: 3rem;
      }
      @media (min-width: 768px) {
        .sa-image-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      
      .sa-image-card {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .sa-image-wrapper {
        aspect-ratio: 3/4;
        border-radius: 8px;
        overflow: hidden;
        background-color: rgba(255,255,255,0.1);
      }
      .sa-image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .sa-image-card h4 {
        font-family: var(--font-family-serif, serif);
        font-size: 20px;
        color: var(--bc-white);
        margin: 0;
      }

      /* Simple White Cards Grid */
      .sa-white-card {
        background: var(--bc-white);
        border-radius: 8px;
        padding: 2.5rem;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .sa-card-icon {
        width: 48px;
        height: 48px;
        background-color: #f0c39a; /* Color naranja Regius */
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
        color: var(--bc-dark);
      }
      .sa-card-icon svg { width: 24px; height: 24px; }
      
      .sa-white-card h3 {
        font-family: var(--font-family-serif, serif);
        font-size: 20px;
        color: var(--bc-dark);
        margin-bottom: 1rem;
      }
      .sa-white-card p {
        font-family: var(--font-family-base, sans-serif);
        font-size: 15px;
        line-height: 1.5;
        color: var(--bc-text-muted);
        margin: 0;
      }

      .sa-3col-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin-top: 3rem;
      }
      @media (min-width: 992px) {
        .sa-3col-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      /* Vertical List Cards */
      .sa-list-card {
        background: var(--bc-white);
        border-radius: 8px;
        padding: 2.5rem;
        margin-bottom: 1.5rem;
      }
      .sa-list-card-icon {
        width: 48px;
        height: 48px;
        background-color: var(--bc-light);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
        color: var(--bc-dark);
        opacity: 0.5;
      }
      .sa-list-card-icon svg { width: 24px; height: 24px; }

      /* Institutional Bullet List */
      .sa-bullet-list {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      .sa-bullet-item h4 {
        font-family: var(--font-family-serif, serif);
        font-size: 18px;
        color: var(--bc-dark);
        margin-bottom: 0.5rem;
      }
      .sa-bullet-item p {
        font-family: var(--font-family-base, sans-serif);
        font-size: 15px;
        line-height: 1.5;
        color: var(--bc-text-muted);
      }
    </style>

    <main class="bc-main">
      <!-- HERO -->
      <section class="bc-hero">
        <div class="bc-hero-bg">
          <img src="https://pikaso.cdnpk.net/private/production/4691549374/render.jpg?token=exp=1782518400~hmac=dbd15804bfcd7d4d8db6dbb79c3ed76d990cca8d6e3128af6bb528cffdfc95b8" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6);" alt="Legalización de rótulos" />
        </div>
        <div class="bc-hero-bg-overlay"></div>
        <div class="bc-hero-content gsap-reveal">
          <div class="bc-label">Línea de Servicio</div>
          <h1>BrandLegal</h1>
          <p>Legalización de rótulos y proyectos de instalación con seguridad técnica y documental.</p>
        </div>
      </section>

      <!-- SECTION 1: Evaluación (Dark Background, Images) -->
      <section class="sa-bg-dark" style="padding: 6rem 0;">
        <div class="bc-container">
          <div class="gsap-reveal" style="max-width: 800px;">
            <div class="sa-pill">ACCIÓN INICIAL</div>
            <h2 class="sa-h2">Evaluación y Control Documental</h2>
            <p class="sa-desc">BrandLegal es el servicio especializado en la gestión técnica necesaria para legalizar proyectos de rotulación e identificación. Acompañamos al cliente desde el asesoramiento inicial hasta la preparación del expediente, facilitando que la instalación cumente con toda la documentación exigida.</p>
          </div>
          
          <div class="sa-image-grid gsap-reveal">
            <div class="sa-image-card">
              <div class="sa-image-wrapper">
                <img src="https://pikaso.cdnpk.net/private/production/4691549890/render.jpg?token=exp=1782518400~hmac=4f34ee960522031814c088d03c60a0258a8142d2adab86b40929b63fb0db610b" alt="Revisión documental" />
              </div>
              <h4>Asesoramiento y Expedientes</h4>
            </div>
            <div class="sa-image-card">
              <div class="sa-image-wrapper">
                <img src="https://pikaso.cdnpk.net/private/production/4691551299/render.jpg?token=exp=1782518400~hmac=9461b36104ae43ca0e2015f4374a78f3eee7633a5b18d75702609c1b19f3a939" alt="Análisis técnico en tablet" />
              </div>
              <h4>Proyectos Técnicos</h4>
            </div>
            <div class="sa-image-card">
              <div class="sa-image-wrapper">
                <img src="https://pikaso.cdnpk.net/private/production/4691551138/render.jpg?token=exp=1782518400~hmac=e79bedad0cf0c13d10d769ad7ca06ef8f5913a8bdc2898a127ee2f212c781fca" alt="Coordinación de expansión" />
              </div>
              <h4>Coordinación con Fabricación</h4>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: Qué Incluye (Light Background, 3 White Cards) -->
      <section class="sa-bg-light" style="padding: 6rem 0;">
        <div class="bc-container">
          <div class="gsap-reveal">
            <div class="sa-pill">ALCANCE Y TRAMITACIÓN</div>
            <h2 class="sa-h2" style="max-width: 800px;">Definición del Proyecto Técnico</h2>
            <p class="sa-desc" style="max-width: 800px;">Una vez analizada la instalación prevista o existente, definimos y preparamos la documentación más adecuada para lograr la legalización ante los organismos pertinentes. Esto incluye:</p>
          </div>

          <div class="sa-3col-grid gsap-reveal">
            <div class="sa-white-card">
              <div class="sa-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <h3>Memoria y Planos</h3>
              <p>Elaboración de la memoria técnica y descriptiva, junto con la documentación gráfica de la solución de rotulación propuesta para el local corporativo.</p>
            </div>
            <div class="sa-white-card">
              <div class="sa-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3>Gestión de Visados</h3>
              <p>Gestión de proyectos visados por el Colegio Oficial de Arquitectos de Madrid (COAM) cuando las exigencias municipales lo requieran.</p>
            </div>
            <div class="sa-white-card">
              <div class="sa-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3>Presupuestos y Certificados</h3>
              <p>Cálculo y preparación de presupuestos necesarios para la tramitación del ICIO y certificados específicos como el cálculo de luminancia.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 3: A Quién Va Dirigido (Sticky Left, Vertical List Right) -->
      <section class="sa-bg-light">
        <div class="bc-container">
          <div class="sa-split-grid">
            <div class="sa-sticky-col gsap-reveal">
              <div class="sa-pill">ARTICULACIÓN DEL PROCESO</div>
              <h2 class="sa-h2">A quién va dirigido</h2>
              <p class="sa-desc">Alineamos los intereses técnicos y normativos en implantaciones complejas. BrandLegal aporta valor a todos los actores involucrados en el proceso de expansión corporativa.</p>
            </div>
            <div class="gsap-reveal">
              
              <div class="sa-list-card">
                <div class="sa-list-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div>
                <h3 class="sa-white-card h3" style="font-family: var(--font-family-serif); font-size: 20px; margin-bottom: 1rem; color: var(--bc-dark);">Cadenas de Retail y Franquicias</h3>
                <p class="sa-white-card p" style="color: var(--bc-text-muted); line-height: 1.5;">Organizamos el proceso de legalización para marcas con implantación en diferentes municipios que exigen un criterio normativo unificado para sus fachadas comerciales.</p>
              </div>

              <div class="sa-list-card">
                <div class="sa-list-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
                <h3 class="sa-white-card h3" style="font-family: var(--font-family-serif); font-size: 20px; margin-bottom: 1rem; color: var(--bc-dark);">Departamentos de Expansión y Obras</h3>
                <p class="sa-white-card p" style="color: var(--bc-text-muted); line-height: 1.5;">Facilitamos el trabajo a los gestores de apertura, aportando seguridad en que la instalación cuenta con la justificación técnica y licencias adecuadas antes de la ejecución.</p>
              </div>

              <div class="sa-list-card">
                <div class="sa-list-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
                <h3 class="sa-white-card h3" style="font-family: var(--font-family-serif); font-size: 20px; margin-bottom: 1rem; color: var(--bc-dark);">Regularización de Rótulos Existentes</h3>
                <p class="sa-white-card p" style="color: var(--bc-text-muted); line-height: 1.5;">Damos soporte a oficinas corporativas y locales comerciales que necesitan poner al día o resolver requerimientos administrativos sobre luminosos e identificaciones ya instaladas.</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 4: Beneficios (Sticky Left, Bullet List Right) -->
      <section class="sa-bg-light" style="padding-top: 0;">
        <div class="bc-container">
          <div class="sa-split-grid" style="border-top: 1px solid rgba(0,0,0,0.1); padding-top: 6rem;">
            <div class="sa-sticky-col gsap-reveal">
              <div class="sa-pill">ESTÁNDAR DE ACTUACIÓN</div>
              <h2 class="sa-h2">Beneficios Estructurales</h2>
              <p class="sa-desc">Al integrar la legalización de rótulos con su diseño y fabricación, BrandLegal reduce los riesgos operativos garantizando coherencia institucional.</p>
            </div>
            <div class="gsap-reveal">
              <div class="sa-bullet-list">
                <div class="sa-bullet-item">
                  <h4>Mayor seguridad documental</h4>
                  <p>Aseguramos que el proyecto cuente siempre con la documentación técnica necesaria, elaborada por profesionales cualificados.</p>
                </div>
                <div class="sa-bullet-item">
                  <h4>Agilidad en la tramitación</h4>
                  <p>La información se prepara de forma organizada y coherente, previniendo requerimientos municipales innecesarios y retrasos.</p>
                </div>
                <div class="sa-bullet-item">
                  <h4>Mejor coordinación integral</h4>
                  <p>La legalización avanza en paralelo a la fabricación e instalación del rótulo, optimizando tiempos de apertura.</p>
                </div>
                <div class="sa-bullet-item">
                  <h4>Control absoluto del proyecto</h4>
                  <p>El cliente dispone en todo momento de memorias, propuestas gráficas, presupuestos (ICIO) y certificados de luminancia centralizados.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="bc-about sa-bg-light" style="text-align: center; border-top: 1px solid rgba(0,0,0,0.05); padding: 6rem 0;">
        <div class="gsap-reveal" style="max-width: 800px; margin: 0 auto; padding: 0 1rem;">
          <div class="sa-pill" style="margin-bottom: 2rem;">Siguientes Pasos</div>
          <h2 class="sa-h2" style="font-size: 56px; line-height: 1.1; margin-bottom: 3rem;">¿Consideras oportuno iniciar una conversación?</h2>
          <a href="/servicios.html" class="btn btn-primary" style="display: inline-block; padding: 14px 32px; border-radius: 40px; font-weight: 600; text-decoration: none; font-size: 16px; transition: opacity 0.3s;">Contacta con Nosotros</a>
        </div>
      </section>
    </main>
  `;

  return await createLayout({ content: layoutHTML, pageClass: 'page-brandlegal' });
}

export const initBrandLegalDirectory = () => {};
