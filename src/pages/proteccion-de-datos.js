import { createLayout } from '../layout.js'

export const getProteccionDeDatosHTML = async () => {
  const layoutHTML = `
    <main class="legal-page-main" style="padding: 120px 5vw 8rem 5vw; max-width: 900px; margin: 0 auto; line-height: 1.7; color: var(--color-text);">
      <h1 style="font-family: var(--font-family-serif); font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 500; margin-bottom: 2rem; color: var(--color-primary);">Protección de Datos</h1>
      <p style="font-size: 1.1rem; color: var(--color-text-muted); margin-bottom: 3rem;">Xprinta Signs Spain, S.L. se compromete a garantizar la confidencialidad y la protección de los datos de carácter personal que recoja y trate a través de este sitio web, de conformidad con el Reglamento General de Protección de Datos (RGPD UE 2016/679) y la Ley Orgánica 3-2018 (LOPDGDD).</p>
      
      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">1. Responsable del Tratamiento</h2>
        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
          <li><strong>Identidad:</strong> Xprinta Signs Spain, S.L. (NIF B-87220556)</li>
          <li><strong>Dirección:</strong> Calle Laguna del Marquesado, 10, Nave 1, 28041 Madrid (España)</li>
          <li><strong>Email:</strong> presupuesto@xprinta.com</li>
        </ul>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">2. Finalidad del Tratamiento de Datos</h2>
        <p>Los datos que nos facilite a través de formularios de contacto, correos electrónicos o de su registro serán tratados únicamente con las siguientes finalidades:</p>
        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
          <li>Responder a sus consultas, solicitudes de presupuesto o información sobre nuestros servicios de rotulación.</li>
          <li>Prestarle los servicios de fabricación, diseño, instalación y gestión técnica contratados.</li>
          <li>Gestionar su registro y control de accesos en el área técnica o panel de administración si correspondiese.</li>
        </ul>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">3. Legitimación del Tratamiento</h2>
        <p>La base jurídica que legitima el tratamiento de sus datos es el <strong>consentimiento expreso</strong> otorgado por usted al enviar su consulta a través del formulario o al registrarse en el portal. Para la ejecución de presupuestos y contratos, la legitimación reside en la relación precontractual o contractual establecida.</p>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">4. Plazo de Conservación de Datos</h2>
        <p>Sus datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recabados, o mientras no solicite su supresión u oposición, y en cualquier caso durante los plazos legales requeridos por la normativa fiscal y de consumo aplicable.</p>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">5. Destinatarios de sus Datos</h2>
        <p>Xprinta Signs Spain, S.L. no cederá sus datos personales a terceros, salvo en los casos en que exista una obligación legal o sea estrictamente necesario para la prestación del servicio (por ejemplo, empresas logísticas de transporte o instaladores autorizados bajo contratos de confidencialidad).</p>
      </section>

      <section>
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">6. Derechos del Usuario</h2>
        <p>Usted tiene derecho a obtener confirmación sobre si estamos tratando sus datos. Asimismo, de conformidad con el RGPD, puede ejercer los derechos de:</p>
        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
          <li>Acceso, rectificación, portabilidad y supresión de sus datos.</li>
          <li>Limitación u oposición a su tratamiento.</li>
        </ul>
        <p style="margin-top: 1rem;">Para ejercer estos derechos, puede enviar una solicitud por escrito adjuntando fotocopia de su DNI o documento equivalente a Xprinta Signs Spain, S.L., Calle Laguna del Marquesado 10, Nave 1, 28041 Madrid, o a través del correo electrónico <a href="mailto:presupuesto@xprinta.com" style="color: var(--color-highlight); text-decoration: none;">presupuesto@xprinta.com</a>.</p>
      </section>
    </main>
  `;

  return await createLayout({ content: layoutHTML, pageClass: 'page-proteccion-de-datos' });
}
