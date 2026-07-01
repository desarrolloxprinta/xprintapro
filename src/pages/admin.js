/**
 * CMS Admin Dashboard Page - Xprinta Pro
 * @module pages/admin
 */

import { createClient } from '@supabase/supabase-js'
import content from '../data/content.json'
import redeiaData from '../data/projects/redeia.json'
import arvalData from '../data/projects/arval.json'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const cleanUrl = supabaseUrl?.trim().replace(/\s+/g, '')
const cleanKey = supabaseAnonKey?.trim().replace(/\s+/g, '').replace(/[\r\n]/g, '')

let adminSupabase = null
if (cleanUrl && cleanKey) {
  try {
    adminSupabase = createClient(cleanUrl, cleanKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  } catch (err) {
    console.error('Error inicializando cliente Supabase Admin:', err)
  }
}

// Datos iniciales para semillar la tabla de FAQs
const defaultFaqData = [
  {
    category: 'servicios',
    question: '¿Qué tipo de proyectos realiza Xprinta?',
    answer: 'En Xprinta hacemos proyectos de <strong>rotulación, señalética, rótulos luminosos, vinilos, letras corpóreas, decoración gráfica, rotulación de vehículos</strong> y soluciones para <strong>puntos de venta</strong>.<br><br>Trabajamos con empresas que necesitan cuidar su imagen en locales, oficinas, franquicias, tiendas, fachadas o espacios de atención al público.',
    icon: '43x4NXx9Aa.svg'
  },
  {
    category: 'metodologia',
    question: '¿Trabajáis solo proyectos grandes o también trabajos puntuales?',
    answer: 'Podemos hacer <strong>trabajos puntuales</strong>, pero donde más valor aportamos es en <strong>proyectos que necesitan coordinación</strong>.<br><br>Por ejemplo, cuando una marca tiene varios locales, varias sedes o necesita que todos sus puntos de venta mantengan la misma imagen. Ahí Xprinta ayuda a ordenar el trabajo y a evitar errores.',
    icon: '8vY8DmgIrU.svg'
  },
  {
    category: 'gestion',
    question: '¿Podéis ayudar a reducir costes sin perder calidad?',
    answer: 'Sí. Buscamos soluciones que funcionen bien y que tengan sentido a <strong>nivel técnico y económico</strong>.<br><br>A veces se puede ahorrar eligiendo mejor los materiales, simplificando sistemas, agrupando trabajos o usando soluciones que se puedan repetir en varios locales.<br><br>La clave no es hacer algo más barato sin más, sino <strong>evitar costes innecesarios</strong>.',
    icon: 'EqeE4pmuuO.svg'
  },
  {
    category: 'metodologia',
    question: '¿Qué es el Sistema Xprinta?',
    answer: 'El <strong>Sistema Xprinta</strong> es nuestra forma de trabajar. Nos ayuda a organizar cada proyecto desde el principio hasta el final: revisar la marca, tomar medidas, estudiar la normativa, preparar el presupuesto, fabricar, instalar y dejar todo documentado.<br><br>Así el cliente sabe <strong>qué se va a hacer, cómo se va a hacer y en qué punto está cada trabajo</strong>.',
    icon: 'EqeEaaAuuO.svg'
  },
  {
    category: 'metodologia',
    question: '¿Qué significa trabajar con una línea phygital?',
    answer: 'Significa unir el <strong>trabajo físico con herramientas digitales</strong>.<br><br>El trabajo físico es el rótulo, la señalética, el vinilo, la instalación o el punto de venta. La parte digital es el seguimiento del proyecto, contenido audiovisual, la documentación, los estados de cada trabajo y la información organizada en una plataforma.<br><br>De esta forma, el cliente puede tener <strong>más control sin tener que estar pendiente de cada detalle</strong>.',
    icon: 'IaW8dActvE.svg'
  },
  {
    category: 'gestion',
    question: '¿Revisáis la normativa antes de fabricar un rótulo?',
    answer: 'Sí. Cuando el proyecto lo necesita, revisamos qué se puede instalar y qué límites puede tener la <strong>normativa</strong>.<br><br>Esto puede afectar al tamaño del rótulo, la iluminación, la ubicación, el tipo de fachada o los permisos necesarios.<br><br>Revisarlo antes ayuda a <strong>evitar problemas después</strong>.',
    icon: 'IaWI2ILtvE.svg'
  },
  {
    category: 'metodologia',
    question: '¿Podéis gestionar proyectos en diferentes ubicaciones?',
    answer: 'Sí. Podemos trabajar en <strong>diferentes ciudades y zonas de España y Portugal</strong>.<br><br>La idea es que una marca pueda tener un mismo criterio de imagen en todos sus puntos de venta, aunque estén en ubicaciones distintas.<br><br>Esto ayuda a que todos los locales se vean <strong>coherentes y bien alineados con la marca</strong>.',
    icon: 'NZLNl276D9.svg'
  },
  {
    category: 'servicios',
    question: '¿Os encargáis de la medición, fabricación e instalación?',
    answer: 'Sí. Podemos encargarnos de <strong>todo el proceso</strong>.<br><br>Primero tomamos datos y medidas. Después preparamos la propuesta, fabricamos los elementos y coordinamos la instalación.<br><br>Esto evita que el cliente tenga que hablar con varios proveedores y reduce muchos <strong>errores habituales</strong>.',
    icon: 'Pix99VX42C.svg'
  },
  {
    category: 'gestion',
    question: '¿Qué ocurre después de terminar un proyecto?',
    answer: 'Cuando el trabajo está terminado, <strong>documentamos el resultado con fotos</strong> y dejamos constancia de la instalación.<br><br>Además, podemos ayudar con mantenimiento, revisiones, incidencias o futuras actualizaciones de la imagen.<br><br>El proyecto <strong>no tiene por qué acabar el día de la instalación</strong>.',
    icon: 'cD9WRxH0eP.svg'
  },
  {
    category: 'servicios',
    question: '¿También ayudáis con contenidos digitales o audiovisuales del punto de venta?',
    answer: 'Sí. Algunos proyectos se pueden documentar con <strong>fotos, vídeo o contenido para redes sociales</strong>.<br><br>Esto permite aprovechar el trabajo realizado no solo en el espacio físico, sino también en la <strong>comunicación digital de la marca</strong>.<br><br>Por ejemplo, para mostrar una nueva apertura, una renovación de imagen o una instalación especial.',
    icon: 'e82esLDdqL.svg'
  }
]

// Mapeador de datos de proyectos estáticos JSON a esquema Supabase
const mapJsonToDbProject = (jsonData) => {
  const planos = []
  const blueprintsList = jsonData.blueprints || []
  const steps = jsonData.blueprintSteps || []
  for (let i = 0; i < Math.max(blueprintsList.length, steps.length); i++) {
    planos.push({
      title: steps[i]?.title || 'Boceto Técnico',
      description: steps[i]?.description || '',
      url: blueprintsList[i] || ''
    })
  }

  const gallery = (jsonData.gallery || []).map(item => {
    return typeof item === 'string' ? item : (item.image || item.video || '')
  }).filter(Boolean)

  const testi = jsonData.testimonial ? {
    text: jsonData.testimonial.quote || null,
    photo: jsonData.testimonial.photo || null,
    author: jsonData.testimonial.author || null,
    role: jsonData.testimonial.role || null,
    company: jsonData.testimonial.company || null
  } : {}

  return {
    title: jsonData.title || '',
    slug: jsonData.id || '',
    client_name: jsonData.client?.name || '',
    client_info: jsonData.client?.description || null,
    service_type: jsonData.service?.title || 'Rotulación Luminosa',
    address: jsonData.location?.description || null,
    sector: jsonData.sector || '',
    thumbnail: jsonData.thumbnail || (jsonData.hero?.image || null),
    hero_image: jsonData.hero?.image || null,
    hero_video: jsonData.hero?.video || null,
    short_description: jsonData.short_description || null,
    challenge_wysiwyg: jsonData.story?.challenge || null,
    solution_wysiwyg: jsonData.story?.solution || null,
    planos_tecnicos: planos,
    model_3d_render: jsonData.render3d?.model || null,
    gallery: gallery,
    testimonial: testi
  }
}

// Estados globales de la aplicación del panel
let currentUser = null
let currentTab = 'proyectos' // 'proyectos', 'blog', 'faqs', 'proyecto-editor'
let projectsList = []
let blogList = []
let faqsList = []
let editingProjectId = null // ID del proyecto en edición (vacío para nuevo)

// SPA Router
export async function navigateTo(tab) {
  currentTab = tab
  const app = document.getElementById('app')
  if (app) {
    app.innerHTML = await renderDashboardView()
    await initAdminCMS()
  }
}

// Plantilla base HTML del panel
export async function renderAdmin() {
  // Comprobar si hay sesión maestra de desarrollo local
  const isMasterLocal = localStorage.getItem('admin_master_session') === 'true'
  if (isMasterLocal) {
    currentUser = { email: 'desarrollo@xprinta.com' }
  } else if (adminSupabase) {
    try {
      const { data: { user } } = await adminSupabase.auth.getUser()
      currentUser = user
    } catch (e) {
      console.warn('Error obteniendo usuario:', e)
    }
  }

  if (!currentUser) {
    return renderLoginView()
  }

  return renderDashboardView()
}

/**
 * Vista de Login
 */
function renderLoginView() {
  return `
    <main class="page-admin">
      <div class="admin-login-container">
        <div class="admin-login-card">
          <div class="admin-logo-container" style="text-align: center; margin-bottom: 1.5rem;">
            <img src="/logo-xprina-azul.svg" alt="Xprinta Pro" style="height: 35px; width: auto;" />
          </div>
          
          <div id="login-error-msg" class="admin-error-message"></div>

          <form id="admin-login-form">
            <div class="admin-form-group">
              <label for="admin-email">Correo Electrónico</label>
              <input type="email" id="admin-email" class="admin-input" placeholder="admin@xprintapro.com" required autocomplete="username">
            </div>
            
            <div class="admin-form-group">
              <label for="admin-password">Contraseña</label>
              <input type="password" id="admin-password" class="admin-input" placeholder="••••••••" required autocomplete="current-password">
            </div>

            <button type="submit" class="admin-btn">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </main>
  `
}

/**
 * Vista del Dashboard
 */
function renderDashboardView() {
  const isEditingProject = currentTab === 'proyecto-editor'

  return `
    <main class="page-admin">
      <div class="admin-dashboard">
        
        <!-- Header -->
        <header class="admin-header">
          <div class="admin-logo-container" style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="/logo-xprina-azul.svg" alt="Xprinta Pro" style="height: 28px; width: auto;" />
          </div>
          <div class="admin-header-right">
            <span class="admin-user-info">${currentUser?.email}</span>
            <button id="admin-logout-btn" class="admin-action-btn" style="text-decoration: underline;">Cerrar Sesión</button>
          </div>
        </header>

        <!-- Navegación (Se oculta al editar proyectos) -->
        <nav class="admin-nav-tabs" style="${isEditingProject ? 'display: none;' : ''}">
          <button class="admin-tab-btn ${currentTab === 'proyectos' ? 'active' : ''}" data-tab="proyectos">Proyectos</button>
          <button class="admin-tab-btn ${currentTab === 'blog' ? 'active' : ''}" data-tab="blog">Área Técnica</button>
          <button class="admin-tab-btn ${currentTab === 'faqs' ? 'active' : ''}" data-tab="faqs">FAQs</button>
        </nav>

        <!-- Contenido principal -->
        <div class="admin-content-area" style="${isEditingProject ? 'padding: 4rem 15vw 8rem 15vw;' : 'padding: 3rem 5vw;'}">
          
          <!-- TAB PROYECTOS -->
          <section id="tab-proyectos" class="admin-tab-content ${currentTab === 'proyectos' ? 'active' : ''}">
            <div class="admin-section-header">
              <h2 class="admin-section-title">Listado de Proyectos</h2>
              <button class="admin-btn" style="width: auto; margin-top: 0; padding: 0.6rem 1.5rem;" id="btn-new-proyecto">+ Nuevo Proyecto</button>
            </div>
            <div class="admin-table-container">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Cliente / Proyecto</th>
                    <th>Slug</th>
                    <th>Sector</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="projects-table-body">
                  <tr>
                    <td colspan="4" style="text-align: center; color: #71717a;">Cargando proyectos...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- TAB ÁREA TÉCNICA -->
          <section id="tab-blog" class="admin-tab-content ${currentTab === 'blog' ? 'active' : ''}">
            <div class="admin-section-header">
              <h2 class="admin-section-title">Artículos de Área Técnica</h2>
              <button class="admin-btn" style="width: auto; margin-top: 0; padding: 0.6rem 1.5rem;" id="btn-new-article">+ Nuevo Artículo</button>
            </div>
            <div class="admin-table-container">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Slug</th>
                    <th>Publicado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="blog-table-body">
                  <tr>
                    <td colspan="5" style="text-align: center; color: #71717a;">Cargando artículos...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- TAB FAQs -->
          <section id="tab-faqs" class="admin-tab-content ${currentTab === 'faqs' ? 'active' : ''}">
            <div class="admin-section-header">
              <h2 class="admin-section-title">Preguntas Frecuentes</h2>
              <button class="admin-btn" style="width: auto; margin-top: 0; padding: 0.6rem 1.5rem;" id="btn-new-faq">+ Nueva FAQ</button>
            </div>
            <div class="admin-table-container">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Pregunta</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="faqs-table-body">
                  <tr>
                    <td colspan="3" style="text-align: center; color: #71717a;">Cargando FAQs...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- VISTA EDITOR DE PROYECTO (PÁGINA COMPLETA) -->
          <section id="tab-proyecto-editor" class="admin-tab-content ${currentTab === 'proyecto-editor' ? 'active' : ''}">
            <div class="admin-section-header" style="margin-bottom: 3rem;">
              <h2 id="editor-proyecto-title" class="admin-section-title" style="font-size: 2.2rem; font-weight: 700; color: #111827;">Nuevo Proyecto</h2>
              <button type="button" class="admin-btn admin-btn-secondary" style="width: auto; margin-top: 0; padding: 0.6rem 1.5rem;" id="btn-editor-cancel">Volver al Listado</button>
            </div>

            <form id="form-proyecto">
              <input type="hidden" id="proj-id">
              
              <!-- CARD 1: Información General -->
              <div class="admin-table-container" style="padding: 2.5rem; margin-bottom: 2.5rem; background: #ffffff;">
                <h3 style="margin: 0 0 1.5rem 0; font-size: 1.25rem; font-weight: 700; color: #111827; border-bottom: 1px solid #e4e4e7; padding-bottom: 0.75rem;">1. Información General</h3>
                <div class="admin-form-row">
                  <div class="admin-form-group">
                    <label for="proj-title">Título del Proyecto</label>
                    <input type="text" id="proj-title" class="admin-input" required>
                  </div>
                  <div class="admin-form-group">
                    <label for="proj-slug">Slug (ej: foster-hollywood)</label>
                    <input type="text" id="proj-slug" class="admin-input" required>
                  </div>
                </div>
                <div class="admin-form-row">
                  <div class="admin-form-group">
                    <label for="proj-client">Nombre del Cliente</label>
                    <input type="text" id="proj-client" class="admin-input" required>
                  </div>
                  <div class="admin-form-group">
                    <label for="proj-client-info">Información del Cliente (Subtítulo)</label>
                    <input type="text" id="proj-client-info" class="admin-input" placeholder="Ej: Cadena internacional de restauración comercial">
                  </div>
                </div>
                <div class="admin-form-row">
                  <div class="admin-form-group">
                    <label for="proj-service-type">Tipo de Servicio (Clasificación)</label>
                    <select id="proj-service-type" class="admin-input" style="background: #ffffff;" required>
                      <option value="Rotulación Luminosa">Rotulación Luminosa</option>
                      <option value="Señalética Corpórea">Señalética Corpórea</option>
                      <option value="Letras Corpóreas">Letras Corpóreas</option>
                      <option value="Vinilos Decorativos">Vinilos Decorativos</option>
                      <option value="Rotulación de Vehículos">Rotulación de Vehículos</option>
                      <option value="Decoración Gráfica">Decoración Gráfica</option>
                      <option value="Escaparates y Puntos de Venta">Escaparates y Puntos de Venta</option>
                    </select>
                  </div>
                  <div class="admin-form-group">
                    <label for="proj-address">Dirección (Ubicación física)</label>
                    <input type="text" id="proj-address" class="admin-input" placeholder="C. de Anabel Segura, 14, Alcobendas, Madrid, España">
                  </div>
                </div>
                <div class="admin-form-row">
                  <div class="admin-form-group">
                    <label for="proj-sector">Sector (Categoría secundaria)</label>
                    <input type="text" id="proj-sector" class="admin-input" placeholder="Ej: retail, restauracion" required>
                  </div>
                  <div class="admin-form-group">
                    <label for="proj-thumbnail">Miniatura / Thumbnail (URL)</label>
                    <input type="text" id="proj-thumbnail" class="admin-input" placeholder="/proyectos/thumb-fosters.jpg">
                  </div>
                </div>
                <div class="admin-form-row">
                  <div class="admin-form-group">
                    <label for="proj-image">Imagen Hero Principal (URL)</label>
                    <input type="text" id="proj-image" class="admin-input">
                  </div>
                  <div class="admin-form-group">
                    <label for="proj-video">Video Hero Principal (URL - Opcional)</label>
                    <input type="text" id="proj-video" class="admin-input">
                  </div>
                </div>
                <div class="admin-form-group">
                  <label for="proj-desc">Descripción Corta</label>
                  <textarea id="proj-desc" class="admin-input" style="height: 60px; resize: vertical;"></textarea>
                </div>
              </div>

              <!-- CARD 2: Desafío y Solución -->
              <div class="admin-table-container" style="padding: 2.5rem; margin-bottom: 2.5rem; background: #ffffff;">
                <h3 style="margin: 0 0 1.5rem 0; font-size: 1.25rem; font-weight: 700; color: #111827; border-bottom: 1px solid #e4e4e7; padding-bottom: 0.75rem;">2. Desafío y Solución</h3>
                <div class="admin-form-group" style="margin-bottom: 2rem;">
                  <label for="proj-challenge">El Desafío (Editor de texto / HTML)</label>
                  <textarea id="proj-challenge" class="admin-input" style="height: 120px; resize: vertical;" placeholder="Detalla los retos técnicos y de marca..."></textarea>
                </div>
                <div class="admin-form-group">
                  <label for="proj-solution">La Solución (Editor de texto / HTML)</label>
                  <textarea id="proj-solution" class="admin-input" style="height: 120px; resize: vertical;" placeholder="Explica la solución, materiales y técnicas empleadas..."></textarea>
                </div>
              </div>

              <!-- CARD 3: Planos Técnicos (Repeatable) -->
              <div class="admin-table-container" style="padding: 2.5rem; margin-bottom: 2.5rem; background: #ffffff;">
                <h3 style="margin: 0 0 1.5rem 0; font-size: 1.25rem; font-weight: 700; color: #111827; border-bottom: 1px solid #e4e4e7; padding-bottom: 0.75rem;">3. Planos Técnicos y Bocetos</h3>
                <div id="planos-container" style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
                  <!-- Se inyectan filas dinámicamente -->
                </div>
                <button type="button" class="admin-btn admin-btn-secondary" style="width: auto; margin-top: 0; padding: 0.6rem 1.5rem;" id="btn-add-plano">+ Añadir Plano Técnico</button>
              </div>

              <!-- CARD 4: Render 3D y Galería -->
              <div class="admin-table-container" style="padding: 2.5rem; margin-bottom: 2.5rem; background: #ffffff;">
                <h3 style="margin: 0 0 1.5rem 0; font-size: 1.25rem; font-weight: 700; color: #111827; border-bottom: 1px solid #e4e4e7; padding-bottom: 0.75rem;">4. Renderizado 3D y Galería</h3>
                <div class="admin-form-group" style="margin-bottom: 2rem;">
                  <label for="proj-model-3d">Modelo 3D Renderizado (URL - Opcional)</label>
                  <input type="text" id="proj-model-3d" class="admin-input" placeholder="/modelos3d/fosters-coronacion.glb o .gltf">
                </div>
                <label style="display: block; font-size: 0.75rem; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; font-weight: 600;">Galería de Fotos/Videos del Trabajo Final</label>
                <div id="gallery-urls-container" style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem;">
                  <!-- Se inyectan urls dinámicamente -->
                </div>
                <button type="button" class="admin-btn admin-btn-secondary" style="width: auto; margin-top: 0; padding: 0.6rem 1.5rem;" id="btn-add-gallery-item">+ Añadir Recurso a Galería</button>
              </div>

              <!-- CARD 5: Testimonio -->
              <div class="admin-table-container" style="padding: 2.5rem; margin-bottom: 2.5rem; background: #ffffff;">
                <h3 style="margin: 0 0 1.5rem 0; font-size: 1.25rem; font-weight: 700; color: #111827; border-bottom: 1px solid #e4e4e7; padding-bottom: 0.75rem;">5. Testimonio del Cliente</h3>
                <div class="admin-form-group">
                  <label for="testi-text">Testimonio (Cita textual)</label>
                  <textarea id="testi-text" class="admin-input" style="height: 80px; resize: vertical;" placeholder="El servicio de Xprinta ha sido excelente..."></textarea>
                </div>
                <div class="admin-form-row">
                  <div class="admin-form-group">
                    <label for="testi-photo">Foto del Autor (URL)</label>
                    <input type="text" id="testi-photo" class="admin-input" placeholder="/testimonios/autor.jpg">
                  </div>
                  <div class="admin-form-group">
                    <label for="testi-author">Autor (Nombre completo)</label>
                    <input type="text" id="testi-author" class="admin-input" placeholder="Juan Pérez">
                  </div>
                </div>
                <div class="admin-form-row">
                  <div class="admin-form-group">
                    <label for="testi-role">Cargo / Puesto</label>
                    <input type="text" id="testi-role" class="admin-input" placeholder="Director de Expansión">
                  </div>
                  <div class="admin-form-group">
                    <label for="testi-company">Empresa / Marca</label>
                    <input type="text" id="testi-company" class="admin-input" placeholder="Foster's Hollywood">
                  </div>
                </div>
              </div>

              <!-- Botones de Acción inferior -->
              <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button type="button" class="admin-btn admin-btn-secondary" style="width: auto; margin: 0; padding: 0.8rem 2rem;" id="btn-editor-cancel-bottom">Cancelar</button>
                <button type="submit" class="admin-btn" style="width: auto; margin: 0; padding: 0.8rem 2.5rem;">Guardar Cambios de Proyecto</button>
              </div>

            </form>
          </section>

        </div>
      </div>

      <!-- MODALES DE CREACIÓN Y EDICIÓN -->

      <!-- Modal Artículo -->
      <div id="modal-articulo" class="admin-modal">
        <div class="admin-modal-content">
          <div class="admin-modal-header">
            <h3 id="modal-articulo-title" class="admin-modal-title">Nuevo Artículo</h3>
            <button class="admin-modal-close" id="modal-articulo-close">&times;</button>
          </div>
          <form id="form-articulo">
            <input type="hidden" id="art-id">
            <div class="admin-form-row">
              <div class="admin-form-group">
                <label for="art-title">Título del Artículo</label>
                <input type="text" id="art-title" class="admin-input" required>
              </div>
              <div class="admin-form-group">
                <label for="art-slug">Slug (ej: rotulacion-digital)</label>
                <input type="text" id="art-slug" class="admin-input" required>
              </div>
            </div>
            <div class="admin-form-row">
              <div class="admin-form-group">
                <label for="art-thumbnail">Miniatura (URL)</label>
                <input type="text" id="art-thumbnail" class="admin-input">
              </div>
              <div class="admin-form-group">
                <label for="art-published" style="display: flex; align-items: center; gap: 0.5rem; margin-top: 1.8rem; cursor: pointer;">
                  <input type="checkbox" id="art-published" style="width: 18px; height: 18px; cursor: pointer;">
                  Publicado inmediatamente
                </label>
              </div>
            </div>
            <div class="admin-form-group">
              <label for="art-intro">Introducción Corta</label>
              <textarea id="art-intro" class="admin-input" style="height: 60px; resize: vertical;" required></textarea>
            </div>
            <div class="admin-form-group">
              <label for="art-content">Contenido Completo (HTML / Texto)</label>
              <textarea id="art-content" class="admin-input" style="height: 180px; resize: vertical;" required></textarea>
            </div>
            <div class="admin-modal-footer">
              <button type="button" class="admin-btn admin-btn-secondary" style="width: auto; margin: 0;" id="modal-articulo-cancel">Cancelar</button>
              <button type="submit" class="admin-btn" style="width: auto; margin: 0;">Guardar</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal FAQ -->
      <div id="modal-faq" class="admin-modal">
        <div class="admin-modal-content">
          <div class="admin-modal-header">
            <h3 id="modal-faq-title" class="admin-modal-title">Nueva Pregunta Frecuente</h3>
            <button class="admin-modal-close" id="modal-faq-close">&times;</button>
          </div>
          <form id="form-faq">
            <input type="hidden" id="faq-id">
            <div class="admin-form-group">
              <label for="faq-question">Pregunta</label>
              <input type="text" id="faq-question" class="admin-input" required>
            </div>
            <div class="admin-form-row">
              <div class="admin-form-group">
                <label for="faq-category">Categoría</label>
                <select id="faq-category" class="admin-input" style="background: #27272a;" required>
                  <option value="servicios">Servicios</option>
                  <option value="metodologia">Metodología</option>
                  <option value="gestion">Gestión y Costes</option>
                </select>
              </div>
              <div class="admin-form-group">
                <label for="faq-icon">Icono (Nombre de archivo SVG - Opcional)</label>
                <input type="text" id="faq-icon" class="admin-input" placeholder="icono.svg">
              </div>
            </div>
            <div class="admin-form-group">
              <label for="faq-answer">Respuesta (HTML/Texto)</label>
              <textarea id="faq-answer" class="admin-input" style="height: 120px; resize: vertical;" required></textarea>
            </div>
            <div class="admin-modal-footer">
              <button type="button" class="admin-btn admin-btn-secondary" style="width: auto; margin: 0;" id="modal-faq-cancel">Cancelar</button>
              <button type="submit" class="admin-btn" style="width: auto; margin: 0;">Guardar</button>
            </div>
          </form>
        </div>
      </div>

    </main>
  `
}

function createPlanoRowHTML(title = '', desc = '', url = '') {
  return `
    <div class="plano-row" style="display: flex; gap: 0.75rem; align-items: center; background: #fafafa; padding: 0.75rem; border-radius: 8px; border: 1px solid #e4e4e7; margin-bottom: 0.5rem;">
      <input type="text" class="admin-input plano-title" placeholder="Título (ej: Alzado frontal)" value="${title}" style="flex: 2;">
      <input type="text" class="admin-input plano-desc" placeholder="Descripción" value="${desc}" style="flex: 3;">
      <input type="text" class="admin-input plano-url" placeholder="URL Boceto/Plano (JPG, PNG, PDF)" value="${url}" style="flex: 3;">
      <button type="button" class="admin-btn admin-btn-danger btn-remove-plano" style="width: auto; margin: 0; padding: 0.5rem 0.75rem;">&times;</button>
    </div>
  `
}

function createGalleryRowHTML(url = '') {
  return `
    <div class="gallery-row" style="display: flex; gap: 0.75rem; align-items: center; background: #fafafa; padding: 0.75rem; border-radius: 8px; border: 1px solid #e4e4e7; margin-bottom: 0.5rem;">
      <input type="text" class="admin-input gallery-url" placeholder="URL Foto/Video del Trabajo Final" value="${url}" style="flex: 1;">
      <button type="button" class="admin-btn admin-btn-danger btn-remove-gallery" style="width: auto; margin: 0; padding: 0.5rem 0.75rem;">&times;</button>
    </div>
  `
}

/**
 * Inicializador del panel CMS y lógica interactiva
 */
export async function initAdminCMS() {
  // Manejador del Login
  const loginForm = document.getElementById('admin-login-form')
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      const email = document.getElementById('admin-email').value.trim()
      const password = document.getElementById('admin-password').value.trim()
      const errorMsg = document.getElementById('login-error-msg')

      if (email === 'desarrollo@xprinta.com' && password === 'genesis2023G+') {
        localStorage.setItem('admin_master_session', 'true')
        currentUser = { email: 'desarrollo@xprinta.com' }
        window.location.reload()
        return
      }

      if (!adminSupabase) {
        errorMsg.textContent = 'Error: Cliente de Supabase no configurado y credenciales maestras incorrectas.'
        errorMsg.style.display = 'block'
        return
      }

      try {
        const { data, error } = await adminSupabase.auth.signInWithPassword({ email, password })
        if (error) throw error

        currentUser = data.user
        window.location.reload()
      } catch (err) {
        errorMsg.textContent = err.message || 'Error de credenciales.'
        errorMsg.style.display = 'block'
      }
    })
  }

  // Manejador del Logout
  const logoutBtn = document.getElementById('admin-logout-btn')
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      localStorage.removeItem('admin_master_session')
      if (adminSupabase) {
        await adminSupabase.auth.signOut()
      }
      currentUser = null
      window.location.reload()
    })
  }

  // Escuchadores del listado de proyectos
  document.getElementById('btn-new-proyecto')?.addEventListener('click', () => {
    editingProjectId = null
    navigateTo('proyecto-editor')
  })

  // Escuchadores de botones del editor
  const goBack = () => navigateTo('proyectos')
  document.getElementById('btn-editor-cancel')?.addEventListener('click', goBack)
  document.getElementById('btn-editor-cancel-bottom')?.addEventListener('click', goBack)

  document.getElementById('btn-add-plano')?.addEventListener('click', () => {
    document.getElementById('planos-container')?.insertAdjacentHTML('beforeend', createPlanoRowHTML())
  })
  document.getElementById('btn-add-gallery-item')?.addEventListener('click', () => {
    document.getElementById('gallery-urls-container')?.insertAdjacentHTML('beforeend', createGalleryRowHTML())
  })

  document.getElementById('planos-container')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove-plano')) {
      e.target.closest('.plano-row').remove()
    }
  })
  document.getElementById('gallery-urls-container')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove-gallery')) {
      e.target.closest('.gallery-row').remove()
    }
  })

  // Modales Artículos y FAQs
  const modalArt = document.getElementById('modal-articulo')
  const modalFaq = document.getElementById('modal-faq')

  document.getElementById('btn-new-article')?.addEventListener('click', () => {
    document.getElementById('form-articulo').reset()
    document.getElementById('art-id').value = ''
    document.getElementById('modal-articulo-title').textContent = 'Nuevo Artículo'
    modalArt.classList.add('active')
  })

  document.getElementById('btn-new-faq')?.addEventListener('click', () => {
    document.getElementById('form-faq').reset()
    document.getElementById('faq-id').value = ''
    document.getElementById('modal-faq-title').textContent = 'Nueva Pregunta Frecuente'
    modalFaq.classList.add('active')
  })

  const closes = ['modal-articulo-close', 'modal-articulo-cancel', 'modal-faq-close', 'modal-faq-cancel']
  closes.forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      modalArt.classList.remove('active')
      modalFaq.classList.remove('active')
    })
  })

  // Enrutador de pestañas
  const tabBtns = document.querySelectorAll('.admin-tab-btn')
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = e.currentTarget.getAttribute('data-tab')
      navigateTo(targetTab)
    })
  })

  // Eventos submit de formularios
  document.getElementById('form-proyecto')?.addEventListener('submit', submitProyecto)
  document.getElementById('form-articulo')?.addEventListener('submit', submitArticulo)
  document.getElementById('form-faq')?.addEventListener('submit', submitFaq)

  // Carga inicial de datos de la pestaña activa
  if (currentUser) {
    // Si estamos editando un proyecto en particular, mapear sus campos
    if (currentTab === 'proyecto-editor') {
      await loadEditingProjectFields()
    } else {
      loadTabData(currentTab)
    }
  }
}

/**
 * Rellena los campos si estamos editando un proyecto
 */
async function loadEditingProjectFields() {
  if (!editingProjectId) {
    // Nuevo proyecto
    document.getElementById('editor-proyecto-title').textContent = 'Nuevo Proyecto'
    document.getElementById('form-proyecto').reset()
    document.getElementById('proj-id').value = ''
    document.getElementById('planos-container').innerHTML = ''
    document.getElementById('gallery-urls-container').innerHTML = ''
    return
  }

  // Si projectsList está vacío, cargar proyectos primero
  if (!projectsList || projectsList.length === 0) {
    console.log('🔍 [Admin] Cargando proyectos desde Supabase para edición...')
    try {
      const { data, error } = await adminSupabase.from('projects').select('*').order('created_at', { ascending: false })
      if (error) throw error
      projectsList = data || []
    } catch (err) {
      console.error('❌ [Admin] Error cargando proyectos:', err)
      alert('Error cargando datos del proyecto: ' + err.message)
      return
    }
  }

  // Buscar el proyecto en la lista
  let proj = projectsList.find(p => String(p.id) === String(editingProjectId))

  // Si no se encontró en la lista, consultar directamente por ID
  if (!proj && adminSupabase) {
    console.log('🔍 [Admin] Proyecto no encontrado en lista, consultando directamente por ID:', editingProjectId)
    try {
      const { data, error } = await adminSupabase.from('projects').select('*').eq('id', editingProjectId).single()
      if (error) throw error
      proj = data
      console.log('✅ [Admin] Proyecto cargado:', proj)
    } catch (err) {
      console.error('❌ [Admin] Error cargando proyecto por ID:', err)
      alert('Error: No se pudo cargar el proyecto. ' + err.message)
      return
    }
  }

  if (!proj) {
    alert('Error: Proyecto no encontrado.')
    return
  }

  console.log('📝 [Admin] Rellenando formulario con datos del proyecto:', proj)

  document.getElementById('editor-proyecto-title').textContent = 'Editar Proyecto: ' + proj.title
  document.getElementById('proj-id').value = proj.id
  document.getElementById('proj-title').value = proj.title || ''
  document.getElementById('proj-slug').value = proj.slug || ''
  document.getElementById('proj-client').value = proj.client_name || ''
  document.getElementById('proj-client-info').value = proj.client_info || ''
  document.getElementById('proj-service-type').value = proj.service_type || 'Rotulación Luminosa'
  document.getElementById('proj-address').value = proj.address || ''
  document.getElementById('proj-sector').value = proj.sector || ''
  document.getElementById('proj-thumbnail').value = proj.thumbnail || ''
  document.getElementById('proj-image').value = proj.hero_image || ''
  document.getElementById('proj-video').value = proj.hero_video || ''
  document.getElementById('proj-desc').value = proj.short_description || ''
  document.getElementById('proj-challenge').value = proj.challenge_wysiwyg || ''
  document.getElementById('proj-solution').value = proj.solution_wysiwyg || ''
  document.getElementById('proj-model-3d').value = proj.model_3d_render || ''

  // Planos Técnicos
  const planosContainer = document.getElementById('planos-container')
  planosContainer.innerHTML = ''
  const planos = Array.isArray(proj.planos_tecnicos) ? proj.planos_tecnicos : []
  console.log('📋 [Admin] Planos técnicos:', planos.length, 'planos')
  planos.forEach(p => {
    planosContainer.insertAdjacentHTML('beforeend', createPlanoRowHTML(p.title, p.description, p.url))
  })

  // Galería
  const galleryContainer = document.getElementById('gallery-urls-container')
  galleryContainer.innerHTML = ''
  const gallery = Array.isArray(proj.gallery) ? proj.gallery : []
  console.log('🖼️ [Admin] Galería:', gallery.length, 'items')
  gallery.forEach(url => {
    galleryContainer.insertAdjacentHTML('beforeend', createGalleryRowHTML(url))
  })

  // Testimonio
  const testi = proj.testimonial || {}
  console.log('💬 [Admin] Testimonio:', testi)
  document.getElementById('testi-text').value = testi.text || ''
  document.getElementById('testi-photo').value = testi.photo || ''
  document.getElementById('testi-author').value = testi.author || ''
  document.getElementById('testi-role').value = testi.role || ''
  document.getElementById('testi-company').value = testi.company || ''

  console.log('✅ [Admin] Formulario completado')
}

/**
 * Carga de datos según la pestaña activa
 */
async function loadTabData(tab) {
  if (!adminSupabase) return

  if (tab === 'proyectos') {
    const tbody = document.getElementById('projects-table-body')
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #71717a;">Cargando proyectos...</td></tr>`
    try {
      const { data, error } = await adminSupabase.from('projects').select('*').order('created_at', { ascending: false })
      if (error) throw error
      projectsList = data || []
      renderProjectsTable()
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #ef4444;">Error cargando proyectos: ${err.message}</td></tr>`
    }
  } else if (tab === 'blog') {
    const tbody = document.getElementById('blog-table-body')
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #71717a;">Cargando artículos...</td></tr>`
    try {
      const { data, error } = await adminSupabase.from('area_tecnica_posts').select('*').order('published_date', { ascending: false })
      if (error) throw error
      blogList = data || []
      renderBlogTable()
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #ef4444;">Error cargando artículos: ${err.message}</td></tr>`
    }
  } else if (tab === 'faqs') {
    const tbody = document.getElementById('faqs-table-body')
    tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: #71717a;">Cargando FAQs...</td></tr>`
    try {
      const { data, error } = await adminSupabase.from('faqs').select('*')
      if (error) throw error
      faqsList = data || []
      renderFaqsTable()
    } catch (err) {
      if (err.message && err.message.includes("public.faqs")) {
        tbody.innerHTML = `
          <tr>
            <td colspan="3" style="padding: 2rem;">
              <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 1.5rem; color: #92400e; font-size: 0.9rem;">
                <strong style="display:block; margin-bottom: 0.5rem; font-size: 1rem; color: #78350f;">⚠️ La tabla 'faqs' no existe en Supabase</strong>
                Copia y ejecuta este script en el <strong>SQL Editor</strong> de tu panel de Supabase para crearla:
                <pre style="background: #18181b; color: #f4f4f5; padding: 1rem; border-radius: 6px; margin: 1rem 0; overflow-x: auto; font-family: monospace; font-size: 0.85rem; user-select: all;">
CREATE TABLE public.faqs (
    id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    question text NOT NULL,
    answer text NOT NULL,
    category text NOT NULL,
    icon text NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Deshabilitar RLS para desarrollo local (permite insertar y editar sin restricciones)
ALTER TABLE public.faqs DISABLE ROW LEVEL SECURITY;
                </pre>
                Una vez ejecutado en Supabase, recarga esta página.
              </div>
            </td>
          </tr>
        `
      } else {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: #ef4444;">Error cargando FAQs: ${err.message}</td></tr>`
      }
    }
  }
}

/**
 * Renderiza la tabla de Proyectos
 */
function renderProjectsTable() {
  const tbody = document.getElementById('projects-table-body')
  if (!projectsList.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; padding: 3rem 1.5rem; color: #71717a;">
          <p style="margin-bottom: 1rem;">No hay proyectos registrados en Supabase.</p>
          <button class="admin-btn" style="width: auto; padding: 0.6rem 1.5rem;" id="btn-seed-projects">Semillar con Proyectos Iniciales (Redeia y Arval)</button>
        </td>
      </tr>
    `
    document.getElementById('btn-seed-projects')?.addEventListener('click', seedProjectsData)
    return
  }

  tbody.innerHTML = projectsList.map(proj => `
    <tr>
      <td>
        <div style="font-weight: 600;">${proj.client_name || proj.title}</div>
        <div style="font-size: 0.8rem; color: #71717a;">${proj.title}</div>
      </td>
      <td><code>${proj.slug}</code></td>
      <td><span class="admin-badge">${proj.sector}</span></td>
      <td>
        <div class="admin-actions">
          <button class="admin-action-btn btn-edit-proj" data-id="${proj.id}">Editar</button>
          <button class="admin-action-btn admin-action-delete btn-delete-proj" data-id="${proj.id}">Eliminar</button>
        </div>
      </td>
    </tr>
  `).join('')

  // Asignar escuchadores
  document.querySelectorAll('.btn-edit-proj').forEach(btn => {
    btn.addEventListener('click', (e) => {
      editingProjectId = e.currentTarget.getAttribute('data-id')
      navigateTo('proyecto-editor')
    })
  })
  document.querySelectorAll('.btn-delete-proj').forEach(btn => {
    btn.addEventListener('click', (e) => deleteProyecto(e.currentTarget.getAttribute('data-id')))
  })
}

/**
 * Semillar proyectos
 */
async function seedProjectsData() {
  if (!adminSupabase) return
  const btn = document.getElementById('btn-seed-projects')
  if (btn) {
    btn.disabled = true
    btn.textContent = 'Semillando proyectos...'
  }
  try {
    const redeiaDb = mapJsonToDbProject(redeiaData)
    const arvalDb = mapJsonToDbProject(arvalData)

    const { error } = await adminSupabase.from('projects').insert([redeiaDb, arvalDb])
    if (error) throw error

    loadTabData('proyectos')
  } catch (err) {
    alert('Error al semillar proyectos: ' + err.message)
    if (btn) {
      btn.disabled = false
      btn.textContent = 'Semillar con Proyectos Iniciales'
    }
  }
}

/**
 * Renderiza la tabla del Área Técnica (area_tecnica_posts)
 */
function renderBlogTable() {
  const tbody = document.getElementById('blog-table-body')
  if (!blogList.length) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #71717a;">No hay artículos registrados.</td></tr>`
    return
  }

  tbody.innerHTML = blogList.map(post => `
    <tr>
      <td><div style="font-weight: 600; max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${post.title}</div></td>
      <td><code>${post.slug}</code></td>
      <td>
        <span class="admin-badge ${post.published ? 'admin-badge-success' : ''}">
          ${post.published ? 'Publicado' : 'Borrador'}
        </span>
      </td>
      <td style="font-size: 0.85rem; color: #71717a;">${post.published_date ? new Date(post.published_date).toLocaleDateString() : '-'}</td>
      <td>
        <div class="admin-actions">
          <button class="admin-action-btn btn-edit-art" data-id="${post.id}">Editar</button>
          <button class="admin-action-btn admin-action-delete btn-delete-art" data-id="${post.id}">Eliminar</button>
        </div>
      </td>
    </tr>
  `).join('')

  document.querySelectorAll('.btn-edit-art').forEach(btn => {
    btn.addEventListener('click', (e) => editArticulo(e.currentTarget.getAttribute('data-id')))
  })
  document.querySelectorAll('.btn-delete-art').forEach(btn => {
    btn.addEventListener('click', (e) => deleteArticulo(e.currentTarget.getAttribute('data-id')))
  })
}

/**
 * Renderiza la tabla de FAQs
 */
function renderFaqsTable() {
  const tbody = document.getElementById('faqs-table-body')
  if (!faqsList.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" style="text-align: center; padding: 3rem 1.5rem; color: #71717a;">
          <p style="margin-bottom: 1rem;">No hay FAQs registradas en la base de datos de Supabase.</p>
          <button class="admin-btn" style="width: auto; padding: 0.6rem 1.5rem;" id="btn-seed-faqs">Poblar con FAQs iniciales</button>
        </td>
      </tr>
    `
    document.getElementById('btn-seed-faqs')?.addEventListener('click', seedFaqsData)
    return
  }

  tbody.innerHTML = faqsList.map(faq => `
    <tr>
      <td><div style="font-weight: 600; max-width: 440px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${faq.question}</div></td>
      <td><span class="admin-badge" style="text-transform: capitalize;">${faq.category}</span></td>
      <td>
        <div class="admin-actions">
          <button class="admin-action-btn btn-edit-faq" data-id="${faq.id}">Editar</button>
          <button class="admin-action-btn admin-action-delete btn-delete-faq" data-id="${faq.id}">Eliminar</button>
        </div>
      </td>
    </tr>
  `).join('')

  document.querySelectorAll('.btn-edit-faq').forEach(btn => {
    btn.addEventListener('click', (e) => editFaq(e.currentTarget.getAttribute('data-id')))
  })
  document.querySelectorAll('.btn-delete-faq').forEach(btn => {
    btn.addEventListener('click', (e) => deleteFaq(e.currentTarget.getAttribute('data-id')))
  })
}

/**
 * Inserta los datos estáticos de FAQs en la base de datos
 */
async function seedFaqsData() {
  if (!adminSupabase) return
  const btn = document.getElementById('btn-seed-faqs')
  if (btn) {
    btn.disabled = true
    btn.textContent = 'Guardando iniciales...'
  }
  try {
    const { error } = await adminSupabase.from('faqs').insert(defaultFaqData)
    if (error) throw error
    loadTabData('faqs')
  } catch (err) {
    alert('Error al poblar FAQs: ' + err.message)
    if (btn) {
      btn.disabled = false
      btn.textContent = 'Poblar con FAQs iniciales'
    }
  }
}

/**
 * Gestión de Formularios
 */
async function submitProyecto(e) {
  e.preventDefault()
  if (!adminSupabase) return

  const id = document.getElementById('proj-id').value

  const planos = []
  document.querySelectorAll('.plano-row').forEach(row => {
    const title = row.querySelector('.plano-title').value.trim()
    const description = row.querySelector('.plano-desc').value.trim()
    const url = row.querySelector('.plano-url').value.trim()
    if (title || url) {
      planos.push({ title, description, url })
    }
  })

  const gallery = []
  document.querySelectorAll('.gallery-row').forEach(row => {
    const url = row.querySelector('.gallery-url').value.trim()
    if (url) {
      gallery.push(url)
    }
  })

  const testimonial = {
    text: document.getElementById('testi-text').value.trim() || null,
    photo: document.getElementById('testi-photo').value.trim() || null,
    author: document.getElementById('testi-author').value.trim() || null,
    role: document.getElementById('testi-role').value.trim() || null,
    company: document.getElementById('testi-company').value.trim() || null
  }

  const payload = {
    title: document.getElementById('proj-title').value.trim(),
    slug: document.getElementById('proj-slug').value.trim(),
    client_name: document.getElementById('proj-client').value.trim(),
    client_info: document.getElementById('proj-client-info').value.trim() || null,
    service_type: document.getElementById('proj-service-type').value,
    address: document.getElementById('proj-address').value.trim() || null,
    sector: document.getElementById('proj-sector').value.trim(),
    thumbnail: document.getElementById('proj-thumbnail').value.trim() || null,
    hero_image: document.getElementById('proj-image').value.trim() || null,
    hero_video: document.getElementById('proj-video').value.trim() || null,
    short_description: document.getElementById('proj-desc').value.trim() || null,
    challenge_wysiwyg: document.getElementById('proj-challenge').value.trim() || null,
    solution_wysiwyg: document.getElementById('proj-solution').value.trim() || null,
    planos_tecnicos: planos,
    model_3d_render: document.getElementById('proj-model-3d').value.trim() || null,
    gallery: gallery,
    testimonial: testimonial
  }

  try {
    if (id) {
      const { error } = await adminSupabase.from('projects').update(payload).eq('id', id)
      if (error) throw error
    } else {
      const { error } = await adminSupabase.from('projects').insert([payload])
      if (error) throw error
    }
    navigateTo('proyectos')
  } catch (err) {
    alert('Error al guardar proyecto: ' + err.message)
  }
}

async function submitArticulo(e) {
  e.preventDefault()
  if (!adminSupabase) return

  const id = document.getElementById('art-id').value
  const payload = {
    title: document.getElementById('art-title').value.trim(),
    slug: document.getElementById('art-slug').value.trim(),
    thumbnail: document.getElementById('art-thumbnail').value.trim() || null,
    published: document.getElementById('art-published').checked,
    intro: document.getElementById('art-intro').value.trim(),
    content: document.getElementById('art-content').value.trim(),
    published_date: new Date().toISOString()
  }

  try {
    if (id) {
      const { error } = await adminSupabase.from('area_tecnica_posts').update(payload).eq('id', id)
      if (error) throw error
    } else {
      const { error } = await adminSupabase.from('area_tecnica_posts').insert([payload])
      if (error) throw error
    }
    document.getElementById('modal-articulo').classList.remove('active')
    loadTabData('blog')
  } catch (err) {
    alert('Error al guardar artículo: ' + err.message)
  }
}

async function submitFaq(e) {
  e.preventDefault()
  if (!adminSupabase) return

  const id = document.getElementById('faq-id').value
  const payload = {
    question: document.getElementById('faq-question').value.trim(),
    category: document.getElementById('faq-category').value,
    icon: document.getElementById('faq-icon').value.trim() || null,
    answer: document.getElementById('faq-answer').value.trim()
  }

  try {
    if (id) {
      const { error } = await adminSupabase.from('faqs').update(payload).eq('id', id)
      if (error) throw error
    } else {
      const { error } = await adminSupabase.from('faqs').insert([payload])
      if (error) throw error
    }
    document.getElementById('modal-faq').classList.remove('active')
    loadTabData('faqs')
  } catch (err) {
    alert('Error al guardar FAQ: ' + err.message)
  }
}

/**
 * Acciones de Edición
 */
function editArticulo(id) {
  const art = blogList.find(a => String(a.id) === String(id))
  if (!art) return

  document.getElementById('art-id').value = art.id
  document.getElementById('art-title').value = art.title || ''
  document.getElementById('art-slug').value = art.slug || ''
  document.getElementById('art-thumbnail').value = art.thumbnail || ''
  document.getElementById('art-published').checked = !!art.published
  document.getElementById('art-intro').value = art.intro || ''
  document.getElementById('art-content').value = art.content || ''

  document.getElementById('modal-articulo-title').textContent = 'Editar Artículo'
  document.getElementById('modal-articulo').classList.add('active')
}

function editFaq(id) {
  const faq = faqsList.find(f => String(f.id) === String(id))
  if (!faq) return

  document.getElementById('faq-id').value = faq.id
  document.getElementById('faq-question').value = faq.question || ''
  document.getElementById('faq-category').value = faq.category || 'servicios'
  document.getElementById('faq-icon').value = faq.icon || ''
  document.getElementById('faq-answer').value = faq.answer || ''

  document.getElementById('modal-faq-title').textContent = 'Editar FAQ'
  document.getElementById('modal-faq').classList.add('active')
}

/**
 * Acciones de Eliminación
 */
async function deleteProyecto(id) {
  if (!adminSupabase || !confirm('¿Estás seguro de que deseas eliminar este proyecto?')) return

  try {
    const { error } = await adminSupabase.from('projects').delete().eq('id', id)
    if (error) throw error
    loadTabData('proyectos')
  } catch (err) {
    alert('Error al eliminar proyecto: ' + err.message)
  }
}

async function deleteArticulo(id) {
  if (!adminSupabase || !confirm('¿Estás seguro de que deseas eliminar este artículo?')) return

  try {
    const { error } = await adminSupabase.from('area_tecnica_posts').delete().eq('id', id)
    if (error) throw error
    loadTabData('blog')
  } catch (err) {
    alert('Error al eliminar artículo: ' + err.message)
  }
}

async function deleteFaq(id) {
  if (!adminSupabase || !confirm('¿Estás seguro de que deseas eliminar esta FAQ?')) return

  try {
    const { error } = await adminSupabase.from('faqs').delete().eq('id', id)
    if (error) throw error
    loadTabData('faqs')
  } catch (err) {
    alert('Error al eliminar FAQ: ' + err.message)
  }
}
