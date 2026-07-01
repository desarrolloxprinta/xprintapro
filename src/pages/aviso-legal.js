import { createLayout } from '../layout.js'

export const getAvisoLegalHTML = async () => {
  const layoutHTML = `
    <main class="legal-page-main" style="padding: 120px 5vw 8rem 5vw; max-width: 900px; margin: 0 auto; line-height: 1.7; color: var(--color-text);">
      <h1 style="font-family: var(--font-family-serif); font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 500; margin-bottom: 2rem; color: var(--color-primary);">Aviso Legal</h1>
      <p style="font-size: 1.1rem; color: var(--color-text-muted); margin-bottom: 3rem;">En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), le informamos de los siguientes datos identificativos del titular de este sitio web.</p>
      
      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">1. Datos Identificativos</h2>
        <p>El sitio web <a href="/" style="color: var(--color-highlight); text-decoration: none;">xprintapro.com</a> es propiedad de:</p>
        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
          <li><strong>Denominación Social:</strong> Xprinta Signs Spain, S.L.</li>
          <li><strong>NIF:</strong> B-87220556</li>
          <li><strong>Domicilio Social:</strong> Calle Laguna del Marquesado, 10, Nave 1, 28041 Madrid (España)</li>
          <li><strong>Teléfono:</strong> 91 505 29 27</li>
          <li><strong>Email de contacto:</strong> presupuesto@xprinta.com</li>
          <li><strong>Datos Registrales:</strong> Inscrita en el Registro Mercantil de Madrid, Tomo 33.203, Folio 15, Sección 8, Hoja M-597518.</li>
        </ul>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">2. Condiciones Generales de Uso</h2>
        <p>El acceso y uso de este sitio web atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. Las citadas Condiciones serán de aplicación independientemente de las Condiciones Generales de Contratación que en su caso resulten de obligado cumplimiento.</p>
        <p style="margin-top: 1rem;">El portal proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a Xprinta Signs Spain, S.L. o a sus licenciantes a los que el USUARIO pueda tener acceso.</p>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">3. Propiedad Intelectual e Industrial</h2>
        <p>Xprinta Signs Spain, S.L. por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.), titularidad de Xprinta Signs Spain, S.L. o bien de sus licenciantes.</p>
        <p style="margin-top: 1rem;">Todos los derechos reservados. En virtud de lo dispuesto en los artículos 8 y 32.1, párrafo segundo, de la Ley de Propiedad Intelectual, quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de Xprinta Signs Spain, S.L.</p>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">4. Exclusión de Garantías y Responsabilidad</h2>
        <p>Xprinta Signs Spain, S.L. no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.</p>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">5. Modificaciones</h2>
        <p>Xprinta Signs Spain, S.L. se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.</p>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">6. Enlaces</h2>
        <p>En el caso de que en xprintapro.com se dispusiesen enlaces o hipervínculos hacía otros sitios de Internet, Xprinta Signs Spain, S.L. no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún caso Xprinta Signs Spain, S.L. asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno.</p>
      </section>

      <section>
        <h2 style="font-family: var(--font-family-serif); font-size: 1.75rem; font-weight: 500; margin-bottom: 1rem; color: var(--color-primary);">7. Legislación Aplicable y Jurisdicción</h2>
        <p>La relación entre Xprinta Signs Spain, S.L. y el USUARIO se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y tribunales de la ciudad de Madrid.</p>
      </section>
    </main>
  `;

  return await createLayout({ content: layoutHTML, pageClass: 'page-aviso-legal' });
}
