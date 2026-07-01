import { createLayout } from '../layout.js'

export const getPoliticaDeCookiesHTML = async () => {
  const layoutHTML = `
    <main class="legal-page-main" style="padding: 120px 5vw 8rem 5vw; max-width: 900px; margin: 0 auto; line-height: 1.7; color: var(--color-text);">
      <h1 style="font-family: var(--font-family-serif); font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 500; margin-bottom: 2rem; color: var(--color-primary);">Política de Cookies</h1>
      <p style="font-size: 1.1rem; color: var(--color-text-muted); margin-bottom: 3rem;">Este sitio web utiliza cookies para mejorar la experiencia de navegación de nuestros usuarios. A continuación encontrará información detallada sobre qué son las cookies, qué tipos utiliza este sitio web y cómo puede desactivarlas en su navegador.</p>
      
      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">1. ¿Qué son las Cookies?</h2>
        <p>Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.</p>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">2. ¿Qué tipos de Cookies utiliza este sitio web?</h2>
        <p>Este sitio web utiliza las siguientes cookies de acuerdo con la RGPD europea:</p>
        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
          <li style="margin-bottom: 1rem;"><strong>Cookies Técnicas (Estrictamente necesarias):</strong> Son aquellas esenciales para permitirle navegar por la web de forma segura y usar todas sus funciones. Por ejemplo: PHPSESSID (ID de sesión) o cookie_consent_preference (para guardar sus preferencias de cookies).</li>
          <li style="margin-bottom: 1rem;"><strong>Cookies de Personalización o Rendimiento:</strong> Permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios (por ejemplo, el idioma o tipo de navegador).</li>
          <li style="margin-bottom: 1rem;"><strong>Cookies de Análisis (Terceros):</strong> Son aquellas que, tratadas por nosotros o por terceros (como Google Analytics), nos permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico de la utilización que hacen los usuarios de la web con el fin de introducir mejoras.</li>
        </ul>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">3. Consentimiento y Configuración</h2>
        <p>Al entrar en nuestra web por primera vez, se le muestra un banner informativo que le permite Aceptar todas las cookies, Rechazarlas, o configurar sus preferencias. Puede cambiar esta configuración en cualquier momento borrando las cookies guardadas en su navegador.</p>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">4. Desactivación o Eliminación de Cookies</h2>
        <p>Usted puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador:</p>
        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
          <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
          <li><strong>Mozilla Firefox:</strong> Opciones &gt; Privacidad y Seguridad &gt; Cookies y datos del sitio.</li>
          <li><strong>Safari:</strong> Preferencias &gt; Privacidad &gt; Bloquear todas las cookies.</li>
          <li><strong>Microsoft Edge:</strong> Configuración &gt; Privacidad, búsqueda y servicios &gt; Cookies y permisos del sitio.</li>
        </ul>
      </section>
    </main>
  `;

  return await createLayout({ content: layoutHTML, pageClass: 'page-politica-de-cookies' });
}
