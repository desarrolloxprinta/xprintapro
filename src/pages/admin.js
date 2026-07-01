/**
 * CMS Admin Dashboard Page - Xprinta Pro
 * @module pages/admin
 */

import { createClient } from '@supabase/supabase-js'
import content from '../data/content.json'
import redeiaData from '../data/projects/redeia.json'
import arvalData from '../data/projects/arval.json'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

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
let currentTab = 'proyectos' // 'proyectos', 'blog', 'faqs', 'proyecto-editor', 'article-editor'
let currentEditingArticle = null // Article being edited
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
  const isEditingArticle = currentTab === 'article-editor'
  const isEditing = isEditingProject || isEditingArticle

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

        <!-- Navegación (Se oculta al editar) -->
        <nav class="admin-nav-tabs" style="${isEditing ? 'display: none;' : ''}">
          <button class="admin-tab-btn ${currentTab === 'proyectos' ? 'active' : ''}" data-tab="proyectos">Proyectos</button>
          <button class="admin-tab-btn ${currentTab === 'blog' ? 'active' : ''}" data-tab="blog">Área Técnica</button>
          <button class="admin-tab-btn ${currentTab === 'faqs' ? 'active' : ''}" data-tab="faqs">FAQs</button>
        </nav>

        <!-- Hero del editor de proyectos -->
        ${isEditingProject ? `
        <div class="admin-editor-hero">
          <div class="admin-editor-hero__label">Editor de Proyectos</div>
          <h1 id="editor-proyecto-title" class="admin-editor-hero__title">Nuevo Proyecto</h1>
          <p class="admin-editor-hero__description">Completa todos los campos para crear o editar un proyecto</p>
          <div class="admin-editor-hero__actions">
            <button type="button" class="admin-hero-btn admin-hero-btn--secondary" id="btn-editor-cancel">
              ← Volver
            </button>
            <button type="button" class="admin-hero-btn admin-hero-btn--primary" id="btn-project-preview">
              Previsualizar
            </button>
          </div>
        </div>
        ` : ''}

        <!-- Hero del editor de artículos -->
        ${isEditingArticle ? `
        <div class="admin-editor-hero">
          <div class="admin-editor-hero__label">Editor de Área Técnica</div>
          <h1 id="editor-article-title" class="admin-editor-hero__title">Nuevo Artículo Técnico</h1>
          <p class="admin-editor-hero__description">Crea artículos técnicos con bloques de contenido y FAQs relacionadas</p>
          <div class="admin-editor-hero__actions">
            <button type="button" class="admin-hero-btn admin-hero-btn--secondary" id="btn-article-editor-cancel">
              ← Volver
            </button>
            <button type="button" class="admin-hero-btn admin-hero-btn--primary" id="btn-article-preview">
              Previsualizar
            </button>
          </div>
        </div>
        ` : ''}

        <!-- Contenido principal -->
        <div class="admin-content-area" style="${isEditing ? 'padding: 4rem 15vw 8rem 15vw;' : 'padding: 3rem 5vw;'}">

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
            <form id="form-proyecto">
              <input type="hidden" id="proj-id">
              
              <!-- CARD 1: Información General -->
              <div class="admin-table-container">
                <h3 class="admin-card-section-title">1. Información General</h3>
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
                </div>

                <!-- Thumbnail Upload -->
                <div class="admin-form-group">
                  <label for="proj-thumbnail">Miniatura / Thumbnail</label>
                  <div class="file-upload-container" style="display: flex; gap: var(--spacing-3); align-items: flex-start;">
                    <div style="flex: 1;">
                      <input
                        type="file"
                        id="proj-thumbnail-file"
                        accept="image/*"
                        class="admin-input"
                        style="padding: var(--spacing-2);"
                      >
                      <input
                        type="text"
                        id="proj-thumbnail"
                        class="admin-input"
                        placeholder="URL del archivo"
                        style="margin-top: var(--spacing-2);"
                        readonly
                      >
                    </div>
                    <div id="proj-thumbnail-preview" class="file-preview" style="width: 80px; height: 80px; border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); overflow: hidden; display: none;">
                    </div>
                  </div>
                  <small style="color: var(--color-text-muted); font-size: var(--font-size-xs); margin-top: var(--spacing-1); display: block;">
                    Sube una imagen o la URL se mantendrá vacía
                  </small>
                </div>

                <!-- Image Hero Upload -->
                <div class="admin-form-group">
                  <label for="proj-image">Imagen Hero Principal</label>
                  <div class="file-upload-container" style="display: flex; gap: var(--spacing-3); align-items: flex-start;">
                    <div style="flex: 1;">
                      <input
                        type="file"
                        id="proj-image-file"
                        accept="image/*"
                        class="admin-input"
                        style="padding: var(--spacing-2);"
                      >
                      <input
                        type="text"
                        id="proj-image"
                        class="admin-input"
                        placeholder="URL del archivo"
                        style="margin-top: var(--spacing-2);"
                        readonly
                      >
                    </div>
                    <div id="proj-image-preview" class="file-preview" style="width: 80px; height: 80px; border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); overflow: hidden; display: none;">
                    </div>
                  </div>
                  <small style="color: var(--color-text-muted); font-size: var(--font-size-xs); margin-top: var(--spacing-1); display: block;">
                    Sube una imagen o la URL se mantendrá vacía
                  </small>
                </div>

                <!-- Video Hero Upload -->
                <div class="admin-form-group">
                  <label for="proj-video">Video Hero Principal (Opcional)</label>
                  <div class="file-upload-container" style="display: flex; gap: var(--spacing-3); align-items: flex-start;">
                    <div style="flex: 1;">
                      <input
                        type="file"
                        id="proj-video-file"
                        accept="video/*"
                        class="admin-input"
                        style="padding: var(--spacing-2);"
                      >
                      <input
                        type="text"
                        id="proj-video"
                        class="admin-input"
                        placeholder="URL del archivo"
                        style="margin-top: var(--spacing-2);"
                        readonly
                      >
                    </div>
                    <div id="proj-video-preview" class="file-preview" style="width: 80px; height: 80px; border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); overflow: hidden; display: none;">
                    </div>
                  </div>
                  <small style="color: var(--color-text-muted); font-size: var(--font-size-xs); margin-top: var(--spacing-1); display: block;">
                    Sube un video o la URL se mantendrá vacía
                  </small>
                </div>
                <div class="admin-form-group">
                  <label for="proj-desc">Descripción Corta</label>
                  <textarea id="proj-desc" class="admin-input" style="height: 60px; resize: vertical;"></textarea>
                </div>
              </div>

              <!-- CARD 2: Desafío y Solución -->
              <div class="admin-table-container">
                <h3 class="admin-card-section-title">2. Desafío y Solución</h3>
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
              <div class="admin-table-container">
                <h3 class="admin-card-section-title">3. Planos Técnicos y Bocetos</h3>
                <div id="planos-container" style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
                  <!-- Se inyectan filas dinámicamente -->
                </div>
                <button type="button" class="admin-btn admin-btn-secondary" style="width: auto; margin-top: 0; padding: 0.6rem 1.5rem;" id="btn-add-plano">+ Añadir Plano Técnico</button>
              </div>

              <!-- CARD 4: Render 3D y Galería -->
              <div class="admin-table-container">
                <h3 class="admin-card-section-title">4. Renderizado 3D y Galería</h3>

                <!-- 3D Model Upload -->
                <div class="admin-form-group" style="margin-bottom: 2rem;">
                  <label for="proj-model-3d">Modelo 3D Renderizado (Opcional)</label>
                  <div class="file-upload-container" style="display: flex; gap: var(--spacing-3); align-items: flex-start;">
                    <div style="flex: 1;">
                      <input
                        type="file"
                        id="proj-model-3d-file"
                        accept=".glb,.gltf"
                        class="admin-input"
                        style="padding: var(--spacing-2);"
                      >
                      <input
                        type="text"
                        id="proj-model-3d"
                        class="admin-input"
                        placeholder="URL del archivo GLB/GLTF"
                        style="margin-top: var(--spacing-2);"
                        readonly
                      >
                    </div>
                    <div id="proj-model-3d-preview" class="file-preview" style="width: 80px; height: 80px; border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); overflow: hidden; display: none;">
                    </div>
                  </div>
                  <small style="color: var(--color-text-muted); font-size: var(--font-size-xs); margin-top: var(--spacing-1); display: block;">
                    Sube un modelo 3D (.glb o .gltf) o la URL se mantendrá vacía
                  </small>
                </div>
                <label style="display: block; font-size: 0.75rem; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; font-weight: 600;">Galería de Fotos/Videos del Trabajo Final</label>
                <div id="gallery-urls-container" style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem;">
                  <!-- Se inyectan urls dinámicamente -->
                </div>
                <button type="button" class="admin-btn admin-btn-secondary" style="width: auto; margin-top: 0; padding: 0.6rem 1.5rem;" id="btn-add-gallery-item">+ Añadir Recurso a Galería</button>
              </div>

              <!-- CARD 5: Testimonio -->
              <div class="admin-table-container">
                <h3 class="admin-card-section-title">5. Testimonio del Cliente</h3>
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

          <!-- TAB ARTICLE EDITOR (INLINE - SIN MODAL) -->
          <section id="tab-article-editor" class="admin-tab-content ${currentTab === 'article-editor' ? 'active' : ''}">
            <form id="form-article">
              <input type="hidden" id="article-id">

              <!-- CARD 1: Información Básica -->
              <div class="admin-table-container">
                <h3 class="admin-card-section-title">1. Información Básica del Artículo</h3>
                <div class="admin-form-row">
                  <div class="admin-form-group">
                    <label for="article-title">Título del Artículo</label>
                    <input type="text" id="article-title" class="admin-input" required>
                  </div>
                  <div class="admin-form-group">
                    <label for="article-slug">Slug (ej: senalizacion-parkings)</label>
                    <input type="text" id="article-slug" class="admin-input" required>
                  </div>
                </div>
                <div class="admin-form-row">
                  <div class="admin-form-group">
                    <label for="article-subtitle">Subtítulo (Opcional)</label>
                    <input type="text" id="article-subtitle" class="admin-input" placeholder="Complementa el título principal">
                  </div>
                  <div class="admin-form-group">
                    <label for="article-category">Categoría</label>
                    <input type="text" id="article-category" class="admin-input" placeholder="Ej: Wayfinding, Rotulación, Iluminación" required>
                  </div>
                </div>
                <div class="admin-form-row">
                  <div class="admin-form-group">
                    <label for="article-author">Autor</label>
                    <input type="text" id="article-author" class="admin-input" value="Equipo Xprinta" required>
                  </div>
                  <div class="admin-form-group">
                    <label for="article-published-date">Fecha de Publicación</label>
                    <input type="date" id="article-published-date" class="admin-input" required>
                  </div>
                </div>
                <div class="admin-form-group">
                  <label for="article-summary">Resumen / Introducción</label>
                  <textarea id="article-summary" class="admin-input" style="height: 80px; resize: vertical;" placeholder="Resumen breve que aparecerá en listados y previsualizaciones" required></textarea>
                </div>
                <div class="admin-form-group">
                  <label for="article-published" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: var(--font-size-sm);">
                    <input type="checkbox" id="article-published" style="width: 18px; height: 18px; cursor: pointer;">
                    Publicar inmediatamente
                  </label>
                </div>
              </div>

              <!-- CARD 2: Media Principal -->
              <div class="admin-table-container">
                <h3 class="admin-card-section-title">2. Media Principal</h3>

                <!-- Thumbnail -->
                <div class="admin-form-group" style="margin-bottom: 2rem;">
                  <label for="article-thumbnail">Miniatura / Thumbnail</label>
                  <div class="file-upload-container" style="display: flex; gap: var(--spacing-3); align-items: flex-start;">
                    <div style="flex: 1;">
                      <input
                        type="file"
                        id="article-thumbnail-file"
                        accept="image/*"
                        class="admin-input"
                        style="padding: var(--spacing-2);"
                      >
                      <input
                        type="text"
                        id="article-thumbnail"
                        class="admin-input"
                        placeholder="URL de la miniatura"
                        style="margin-top: var(--spacing-2);"
                        readonly
                      >
                    </div>
                    <div id="article-thumbnail-preview" class="file-preview" style="width: 80px; height: 80px; border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); overflow: hidden; display: none;">
                    </div>
                  </div>
                  <small style="color: var(--color-text-muted); font-size: var(--font-size-xs); margin-top: var(--spacing-1); display: block;">
                    Imagen que aparecerá en listados (recomendado: 400x300px)
                  </small>
                </div>

                <!-- Media Intro (Video o Imagen) -->
                <div class="admin-form-group">
                  <label>Media de Introducción (Video o Imagen Hero)</label>
                  <div style="margin-bottom: var(--spacing-4);">
                    <label style="display: flex; align-items: center; gap: var(--spacing-2); cursor: pointer; font-size: var(--font-size-sm);">
                      <input type="radio" name="intro-media-type" value="video" id="intro-type-video" style="width: 18px; height: 18px; cursor: pointer;">
                      Video de introducción
                    </label>
                    <label style="display: flex; align-items: center; gap: var(--spacing-2); cursor: pointer; font-size: var(--font-size-sm); margin-top: var(--spacing-2);">
                      <input type="radio" name="intro-media-type" value="image" id="intro-type-image" style="width: 18px; height: 18px; cursor: pointer;" checked>
                      Imagen hero
                    </label>
                  </div>

                  <div class="file-upload-container" style="display: flex; gap: var(--spacing-3); align-items: flex-start;">
                    <div style="flex: 1;">
                      <input
                        type="file"
                        id="article-intro-media-file"
                        accept="image/*,video/*"
                        class="admin-input"
                        style="padding: var(--spacing-2);"
                      >
                      <input
                        type="text"
                        id="article-intro-media-url"
                        class="admin-input"
                        placeholder="URL del archivo"
                        style="margin-top: var(--spacing-2);"
                        readonly
                      >
                    </div>
                    <div id="article-intro-media-preview" class="file-preview" style="width: 80px; height: 80px; border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); overflow: hidden; display: none;">
                    </div>
                  </div>
                  <small style="color: var(--color-text-muted); font-size: var(--font-size-xs); margin-top: var(--spacing-1); display: block;">
                    Video o imagen principal del artículo (aparecerá al inicio)
                  </small>
                </div>

                <!-- Audio Resumen -->
                <div class="admin-form-group" style="margin-top: 2rem;">
                  <label for="article-audio-url">Audio Resumen (Opcional)</label>
                  <div class="file-upload-container" style="display: flex; gap: var(--spacing-3); align-items: flex-start;">
                    <div style="flex: 1;">
                      <input
                        type="file"
                        id="article-audio-file"
                        accept="audio/*"
                        class="admin-input"
                        style="padding: var(--spacing-2);"
                      >
                      <input
                        type="text"
                        id="article-audio-url"
                        class="admin-input"
                        placeholder="URL del archivo de audio"
                        style="margin-top: var(--spacing-2);"
                        readonly
                      >
                    </div>
                    <div id="article-audio-preview" class="file-preview" style="width: 80px; height: 80px; border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); overflow: hidden; display: none; align-items: center; justify-content: center;">
                      <svg viewBox="0 0 24 24" fill="currentColor" style="width: 32px; height: 32px; color: var(--color-primary);"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                    </div>
                  </div>
                  <small style="color: var(--color-text-muted); font-size: var(--font-size-xs); margin-top: var(--spacing-1); display: block;">
                    Audio resumen del artículo. Aparecerá como "¿Poco tiempo? Escucha el resumen" (formato MP3, WAV, etc.)
                  </small>
                </div>
              </div>

              <!-- CARD 3: Bloques de Contenido (Repeatable con WYSIWYG) -->
              <div class="admin-table-container">
                <h3 class="admin-card-section-title">3. Bloques de Contenido</h3>
                <p style="color: var(--color-text-muted); font-size: var(--font-size-sm); margin-bottom: var(--spacing-6);">
                  Divide el artículo en bloques temáticos. Cada bloque puede tener su propio título y contenido rico.
                </p>
                <div id="article-blocks-container" style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 1.5rem;">
                  <!-- Se inyectan bloques dinámicamente -->
                </div>
                <button type="button" class="admin-btn admin-btn-secondary" style="width: auto; margin-top: 0; padding: 0.6rem 1.5rem;" id="btn-add-article-block">+ Añadir Bloque de Contenido</button>
              </div>

              <!-- CARD 4: FAQs Relacionadas -->
              <div class="admin-table-container">
                <h3 class="admin-card-section-title">4. Preguntas Frecuentes Relacionadas</h3>
                <p style="color: var(--color-text-muted); font-size: var(--font-size-sm); margin-bottom: var(--spacing-6);">
                  Selecciona las FAQs que estén relacionadas con este artículo técnico.
                </p>
                <div id="article-faqs-container" style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem;">
                  <div id="article-faqs-list" style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <!-- Se cargan FAQs disponibles -->
                  </div>
                </div>
                <small style="color: var(--color-text-muted); font-size: var(--font-size-xs);">
                  Las FAQs seleccionadas aparecerán al final del artículo
                </small>
              </div>

              <!-- CARD 5: Formulario Paperform (Lead Magnet) -->
              <div class="admin-table-container">
                <h3 class="admin-card-section-title">5. Formulario de Descarga (Lead Magnet)</h3>
                <p style="color: var(--color-text-muted); font-size: var(--font-size-sm); margin-bottom: var(--spacing-6);">
                  Código embed de Paperform para descargar el informe técnico en PDF. Este formulario aparecerá al final del artículo como lead magnet.
                </p>

                <div class="admin-form-group">
                  <label for="article-paperform-embed">Código Embed de Paperform</label>
                  <textarea
                    id="article-paperform-embed"
                    class="admin-input"
                    style="height: 120px; resize: vertical; font-family: 'Courier New', monospace; font-size: 12px;"
                    placeholder='<div data-paperform-id="tu-form-id"></div><script src="https://paperform.co/__embed.min.js"></script>'
                  ></textarea>
                  <small style="color: var(--color-text-muted); font-size: var(--font-size-xs); margin-top: var(--spacing-2); display: block;">
                    Pega aquí el código embed completo de Paperform. Ejemplo:<br>
                    <code style="background: var(--color-neutral-100); padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 11px;">&lt;div data-paperform-id="..."&gt;&lt;/div&gt;&lt;script src="..."&gt;&lt;/script&gt;</code>
                  </small>
                </div>
              </div>

              <!-- Botón de Submit -->
              <div class="admin-table-container" style="display: flex; justify-content: flex-end; gap: var(--spacing-4); border: none; padding: 0; background: transparent; box-shadow: none;">
                <button type="button" class="admin-btn admin-btn-secondary" style="width: auto; margin: 0;" id="btn-article-cancel">
                  Cancelar
                </button>
                <button type="submit" class="admin-btn" style="width: auto; margin: 0;">
                  Guardar Artículo
                </button>
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
  const uniqueId = 'plano-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  return `
    <div class="plano-row" style="display: flex; flex-direction: column; gap: 0.75rem; background: #fafafa; padding: 0.75rem; border-radius: 8px; border: 1px solid #e4e4e7; margin-bottom: 0.5rem;">
      <div style="display: flex; gap: 0.75rem; align-items: center;">
        <input type="text" class="admin-input plano-title" placeholder="Título (ej: Alzado frontal)" value="${title}" style="flex: 2;">
        <input type="text" class="admin-input plano-desc" placeholder="Descripción" value="${desc}" style="flex: 3;">
        <button type="button" class="admin-btn admin-btn-danger btn-remove-plano" style="width: auto; margin: 0; padding: 0.5rem 0.75rem;">&times;</button>
      </div>
      <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
        <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
          <input type="file" class="admin-input plano-file" data-url-target="${uniqueId}" accept="image/*,video/*,application/pdf" style="padding: 0.5rem; font-size: 0.875rem;">
          <input type="text" class="admin-input plano-url" id="${uniqueId}" placeholder="URL del archivo" value="${url}" readonly style="font-size: 0.875rem;">
          <small style="color: var(--color-text-muted); font-size: 0.75rem;">Sube imagen, video o PDF</small>
        </div>
        <div class="plano-preview" style="width: 60px; height: 60px; border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); overflow: hidden; display: ${url ? 'block' : 'none'};">
          ${url && url.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? `<img src="${url}" style="width: 100%; height: 100%; object-fit: cover;">` : ''}
          ${url && url.match(/\.(mp4|webm|mov)$/i) ? `<video src="${url}" style="width: 100%; height: 100%; object-fit: cover;"></video>` : ''}
          ${url && url.match(/\.pdf$/i) ? `<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--color-neutral-50); font-size: 0.75rem;">PDF</div>` : ''}
        </div>
      </div>
    </div>
  `
}

function createGalleryRowHTML(url = '') {
  const uniqueId = 'gallery-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  return `
    <div class="gallery-row" style="display: flex; gap: 0.75rem; align-items: flex-start; background: #fafafa; padding: 0.75rem; border-radius: 8px; border: 1px solid #e4e4e7; margin-bottom: 0.5rem;">
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
        <input type="file" class="admin-input gallery-file" data-url-target="${uniqueId}" accept="image/*,video/*" style="padding: 0.5rem; font-size: 0.875rem;">
        <input type="text" class="admin-input gallery-url" id="${uniqueId}" placeholder="URL del archivo" value="${url}" readonly style="font-size: 0.875rem;">
        <small style="color: var(--color-text-muted); font-size: 0.75rem;">Sube imagen o video</small>
      </div>
      <div class="gallery-preview" style="width: 60px; height: 60px; border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); overflow: hidden; display: ${url ? 'block' : 'none'};">
        ${url && url.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? `<img src="${url}" style="width: 100%; height: 100%; object-fit: cover;">` : ''}
        ${url && url.match(/\.(mp4|webm|mov)$/i) ? `<video src="${url}" style="width: 100%; height: 100%; object-fit: cover;"></video>` : ''}
      </div>
      <button type="button" class="admin-btn admin-btn-danger btn-remove-gallery" style="width: auto; margin: 0; padding: 0.5rem 0.75rem; height: fit-content;">&times;</button>
    </div>
  `
}

/**
 * Helper: Crear HTML de un bloque de contenido del artículo
 */
function createArticleBlockHTML(blockId = '', blockTitle = '', blockContent = '') {
  const uniqueId = blockId || ('block-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9))

  return `
    <div class="article-block" data-block-id="${uniqueId}" style="background: #fafafa; padding: 1.5rem; border-radius: 8px; border: 1px solid #e4e4e7;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <input
          type="text"
          class="admin-input block-title"
          placeholder="Título del bloque (ej: Normativa aplicable, Materiales utilizados)"
          value="${blockTitle}"
          style="flex: 1; margin-right: 1rem;"
        >
        <button type="button" class="admin-btn admin-btn-danger btn-remove-block" style="width: auto; margin: 0; padding: 0.5rem 0.75rem;">&times;</button>
      </div>

      <!-- Hidden textarea for Quill content -->
      <textarea class="block-content-textarea" data-block-id="${uniqueId}" style="display: none;">${blockContent}</textarea>

      <!-- Quill editor container -->
      <div class="block-content-editor" id="block-editor-${uniqueId}" style="background: white; min-height: 200px;">
      </div>
    </div>
  `
}

/**
 * Helper: Inicializar editor Quill para un bloque
 */
function initBlockEditor(blockId, initialContent = '') {
  const editorContainer = document.getElementById(`block-editor-${blockId}`)
  if (!editorContainer) {
    console.warn(`⚠️ Block editor container not found for block: ${blockId}`)
    return null
  }

  const editor = new Quill(`#block-editor-${blockId}`, {
    theme: 'snow',
    modules: {
      toolbar: {
        container: [
          [{ 'header': [2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['link', 'image'],
          ['clean']
        ],
        handlers: {
          image: function() {
            // Custom image upload handler
            const input = document.createElement('input')
            input.setAttribute('type', 'file')
            input.setAttribute('accept', 'image/*')
            input.click()

            input.onchange = async () => {
              const file = input.files[0]
              if (!file) return

              // Get the current cursor position
              const range = this.quill.getSelection(true)

              // Insert a temporary placeholder
              this.quill.insertEmbed(range.index, 'image', '/assets/img/loading.gif')
              this.quill.setSelection(range.index + 1)

              try {
                // Upload file to Supabase
                const publicUrl = await uploadFileToSupabase(file, 'articles/gallery')

                if (publicUrl) {
                  // Replace placeholder with actual image
                  this.quill.deleteText(range.index, 1)
                  this.quill.insertEmbed(range.index, 'image', publicUrl)
                  this.quill.setSelection(range.index + 1)
                  console.log(`✅ Image uploaded and inserted: ${publicUrl}`)
                } else {
                  // Remove placeholder if upload failed
                  this.quill.deleteText(range.index, 1)
                  alert('Error al subir la imagen. Por favor, intenta de nuevo.')
                }
              } catch (err) {
                console.error('❌ Error uploading image:', err)
                this.quill.deleteText(range.index, 1)
                alert('Error al subir la imagen: ' + err.message)
              }
            }
          }
        }
      }
    },
    placeholder: 'Escribe el contenido de este bloque...'
  })

  // Set initial content
  if (initialContent) {
    editor.root.innerHTML = initialContent
  }

  // Sync content back to hidden textarea
  const textarea = document.querySelector(`textarea[data-block-id="${blockId}"]`)
  if (textarea) {
    editor.on('text-change', () => {
      textarea.value = editor.root.innerHTML
    })
  }

  console.log(`✅ Block editor initialized: ${blockId}`)
  return editor
}

/**
 * Helper: Cargar lista de FAQs disponibles como checkboxes
 */
async function loadAvailableFAQs(selectedFaqIds = []) {
  const container = document.getElementById('article-faqs-list')
  if (!container) return

  try {
    const { data: faqs, error } = await adminSupabase
      .from('faqs')
      .select('id, question, category')
      .order('category', { ascending: true })

    if (error) throw error

    if (!faqs || faqs.length === 0) {
      container.innerHTML = '<p style="color: var(--color-text-muted); font-size: var(--font-size-sm);">No hay FAQs disponibles</p>'
      return
    }

    // Group by category
    const grouped = faqs.reduce((acc, faq) => {
      if (!acc[faq.category]) acc[faq.category] = []
      acc[faq.category].push(faq)
      return acc
    }, {})

    let html = ''
    for (const [category, categoryFaqs] of Object.entries(grouped)) {
      html += `
        <div style="margin-bottom: 1rem;">
          <h4 style="font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
            ${category}
          </h4>
          ${categoryFaqs.map(faq => `
            <label style="display: flex; align-items: flex-start; gap: 0.5rem; padding: 0.5rem; cursor: pointer; font-size: var(--font-size-sm); hover:background: var(--color-neutral-50);">
              <input
                type="checkbox"
                class="faq-checkbox"
                value="${faq.id}"
                ${selectedFaqIds.includes(faq.id) ? 'checked' : ''}
                style="margin-top: 0.25rem; width: 16px; height: 16px; cursor: pointer;"
              >
              <span>${faq.question}</span>
            </label>
          `).join('')}
        </div>
      `
    }

    container.innerHTML = html
    console.log(`✅ Loaded ${faqs.length} FAQs`)
  } catch (err) {
    console.error('Error loading FAQs:', err)
    container.innerHTML = '<p style="color: #ef4444; font-size: var(--font-size-sm);">Error cargando FAQs</p>'
  }
}

/**
 * WYSIWYG Editors with Quill.js
 */
let challengeEditor = null
let solutionEditor = null
let articleBlockEditors = [] // Array de editores Quill para bloques de contenido del artículo

function initWysiwygEditors() {
  console.log('🔧 Initializing WYSIWYG editors...')

  // Reset editors if they already exist
  challengeEditor = null
  solutionEditor = null

  // Initialize Challenge editor
  const challengeTextarea = document.getElementById('proj-challenge')
  if (challengeTextarea) {
    const challengeValue = challengeTextarea.value

    // Remove any existing Quill editor
    const existingChallengeEditor = document.getElementById('proj-challenge-editor')
    if (existingChallengeEditor) {
      existingChallengeEditor.remove()
    }

    // Create Quill container
    const challengeEditorDiv = document.createElement('div')
    challengeEditorDiv.id = 'proj-challenge-editor'
    challengeEditorDiv.style.height = '200px'
    challengeEditorDiv.style.background = 'white'

    // Replace textarea with Quill editor
    challengeTextarea.style.display = 'none'
    challengeTextarea.parentNode.insertBefore(challengeEditorDiv, challengeTextarea.nextSibling)

    challengeEditor = new Quill('#proj-challenge-editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': [2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['link'],
          ['clean']
        ]
      },
      placeholder: 'Detalla los retos técnicos y de marca...'
    })

    // Set initial content
    if (challengeValue) {
      challengeEditor.root.innerHTML = challengeValue
    }

    // Sync Quill content back to textarea on change
    challengeEditor.on('text-change', () => {
      challengeTextarea.value = challengeEditor.root.innerHTML
    })

    console.log('✅ Challenge editor initialized')
  } else {
    console.warn('⚠️ Challenge textarea not found')
  }

  // Initialize Solution editor
  const solutionTextarea = document.getElementById('proj-solution')
  if (solutionTextarea) {
    const solutionValue = solutionTextarea.value

    // Remove any existing Quill editor
    const existingSolutionEditor = document.getElementById('proj-solution-editor')
    if (existingSolutionEditor) {
      existingSolutionEditor.remove()
    }

    // Create Quill container
    const solutionEditorDiv = document.createElement('div')
    solutionEditorDiv.id = 'proj-solution-editor'
    solutionEditorDiv.style.height = '200px'
    solutionEditorDiv.style.background = 'white'

    // Replace textarea with Quill editor
    solutionTextarea.style.display = 'none'
    solutionTextarea.parentNode.insertBefore(solutionEditorDiv, solutionTextarea.nextSibling)

    solutionEditor = new Quill('#proj-solution-editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': [2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['link'],
          ['clean']
        ]
      },
      placeholder: 'Explica la solución, materiales y técnicas empleadas...'
    })

    // Set initial content
    if (solutionValue) {
      solutionEditor.root.innerHTML = solutionValue
    }

    // Sync Quill content back to textarea on change
    solutionEditor.on('text-change', () => {
      solutionTextarea.value = solutionEditor.root.innerHTML
    })

    console.log('✅ Solution editor initialized')
  } else {
    console.warn('⚠️ Solution textarea not found')
  }

  console.log('✅ WYSIWYG editors initialization complete')
}

/**
 * File Upload System with Supabase Storage
 */
async function uploadFileToSupabase(file, folder = 'projects') {
  if (!adminSupabase) {
    console.error('Supabase client not configured')
    return null
  }

  try {
    // Generate unique filename
    const timestamp = Date.now()
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filePath = `${folder}/${timestamp}-${cleanFileName}`

    // Upload to Supabase Storage
    const { data, error } = await adminSupabase.storage
      .from('project-media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    // Get public URL
    const { data: urlData } = adminSupabase.storage
      .from('project-media')
      .getPublicUrl(filePath)

    return urlData.publicUrl
  } catch (err) {
    console.error('Error uploading file:', err)
    alert('Error al subir el archivo: ' + err.message)
    return null
  }
}

/**
 * Create file upload input with preview
 */
function createFileUploadInput(inputId, label, accept = 'image/*', currentUrl = '') {
  return `
    <div class="admin-form-group">
      <label for="${inputId}">${label}</label>
      <div class="file-upload-container" style="display: flex; gap: var(--spacing-3); align-items: flex-start;">
        <div style="flex: 1;">
          <input
            type="file"
            id="${inputId}-file"
            accept="${accept}"
            class="admin-input"
            style="padding: var(--spacing-2);"
          >
          <input
            type="text"
            id="${inputId}"
            class="admin-input"
            placeholder="URL del archivo"
            value="${currentUrl}"
            style="margin-top: var(--spacing-2);"
            readonly
          >
        </div>
        ${currentUrl ? `
          <div class="file-preview" style="width: 80px; height: 80px; border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); overflow: hidden;">
            <img src="${currentUrl}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        ` : ''}
      </div>
      <small style="color: var(--color-text-muted); font-size: var(--font-size-xs); margin-top: var(--spacing-1); display: block;">
        Sube un archivo o la URL se mantendrá vacía
      </small>
    </div>
  `
}

/**
 * Initialize file upload handlers for all file inputs
 */
function initFileUploadHandlers() {
  const fileInputIds = [
    'proj-thumbnail',
    'proj-image',
    'proj-video',
    'proj-model-3d'
  ]

  fileInputIds.forEach(inputId => {
    const fileInput = document.getElementById(`${inputId}-file`)
    const urlInput = document.getElementById(inputId)

    if (fileInput && urlInput) {
      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Show loading state
        urlInput.value = 'Subiendo archivo...'
        urlInput.style.color = 'var(--color-text-muted)'

        // Determine folder based on input type
        let folder = 'projects'
        if (inputId.includes('thumbnail')) folder = 'projects/thumbnails'
        else if (inputId.includes('image')) folder = 'projects/images'
        else if (inputId.includes('video')) folder = 'projects/videos'
        else if (inputId.includes('model')) folder = 'projects/models'

        // Upload file
        const publicUrl = await uploadFileToSupabase(file, folder)

        if (publicUrl) {
          urlInput.value = publicUrl
          urlInput.style.color = 'var(--color-text)'

          // Update preview if it exists
          const previewId = `${inputId}-preview`
          const preview = document.getElementById(previewId)

          if (preview) {
            preview.style.display = 'block'

            if (file.type.startsWith('image/')) {
              preview.innerHTML = `<img src="${publicUrl}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;">`
            } else if (file.type.startsWith('video/')) {
              preview.innerHTML = `<video src="${publicUrl}" style="width: 100%; height: 100%; object-fit: cover;"></video>`
            } else {
              preview.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--color-neutral-50); font-size: var(--font-size-xs); color: var(--color-success);">✓</div>`
            }
          }
        } else {
          urlInput.value = ''
          urlInput.style.color = 'var(--color-text)'
        }
      })
    }
  })
}

/**
 * Make project title editable inline
 */
function initEditableTitle() {
  const titleElement = document.getElementById('editor-proyecto-title')
  const titleInput = document.getElementById('proj-title')

  if (titleElement && titleInput) {
    // Make title contenteditable
    titleElement.setAttribute('contenteditable', 'true')
    titleElement.style.cursor = 'text'
    titleElement.style.outline = 'none'
    titleElement.style.transition = 'all 0.2s ease'

    // Add visual feedback on focus
    titleElement.addEventListener('focus', () => {
      titleElement.style.opacity = '0.8'
    })

    titleElement.addEventListener('blur', () => {
      titleElement.style.opacity = '1'
    })

    // Sync title with hidden input
    titleElement.addEventListener('input', () => {
      titleInput.value = titleElement.textContent.trim()
    })

    // Sync hidden input changes to title
    titleInput.addEventListener('change', () => {
      titleElement.textContent = titleInput.value
    })

    // Prevent line breaks in title
    titleElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        titleElement.blur()
      }
    })
  }
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

  // =========== EVENT LISTENERS PARA EDITOR DE ARTÍCULOS ===========

  // Botones de cancelación del editor de artículos
  const goBackToArticles = () => navigateTo('blog')
  document.getElementById('btn-article-editor-cancel')?.addEventListener('click', goBackToArticles)
  document.getElementById('btn-article-cancel')?.addEventListener('click', goBackToArticles)

  // Botón para añadir bloque de contenido
  document.getElementById('btn-add-article-block')?.addEventListener('click', () => {
    const container = document.getElementById('article-blocks-container')
    if (!container) return

    const blockHTML = createArticleBlockHTML()
    container.insertAdjacentHTML('beforeend', blockHTML)

    // Extraer el blockId del HTML recién insertado
    const newBlock = container.lastElementChild
    const blockId = newBlock.getAttribute('data-block-id')

    // Inicializar editor Quill para este bloque
    setTimeout(() => {
      const editor = initBlockEditor(blockId)
      if (editor) {
        articleBlockEditors.push({ blockId, editor })
      }
    }, 100)
  })

  // Event delegation: remover bloques
  document.getElementById('article-blocks-container')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove-block')) {
      const blockDiv = e.target.closest('.article-block')
      if (!blockDiv) return

      const blockId = blockDiv.getAttribute('data-block-id')

      // Remover editor del array
      const index = articleBlockEditors.findIndex(item => item.blockId === blockId)
      if (index !== -1) {
        articleBlockEditors.splice(index, 1)
      }

      // Remover el bloque del DOM
      blockDiv.remove()
    }
  })

  // Botón para añadir imagen a la galería
  document.getElementById('btn-add-article-image')?.addEventListener('click', () => {
    const container = document.getElementById('article-gallery-container')
    if (!container) return

    const imageHTML = createArticleImageHTML()
    container.insertAdjacentHTML('beforeend', imageHTML)
  })

  // Event delegation: remover imágenes de galería
  document.getElementById('article-gallery-container')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove-gallery-image')) {
      const imageDiv = e.target.closest('.article-gallery-item')
      if (imageDiv) imageDiv.remove()
    }
  })

  // Event delegation: upload de imágenes de galería
  document.getElementById('article-gallery-container')?.addEventListener('change', async (e) => {
    if (e.target.classList.contains('article-image-file')) {
      const file = e.target.files[0]
      if (!file) return

      const imageId = e.target.getAttribute('data-image-id')
      const urlInput = document.querySelector(`.article-image-url[data-image-id="${imageId}"]`)
      const preview = document.querySelector(`.article-image-preview[data-image-id="${imageId}"]`)

      if (!urlInput) return

      urlInput.value = 'Subiendo archivo...'
      urlInput.style.color = 'var(--color-text-muted)'

      const publicUrl = await uploadFileToSupabase(file, 'articles/gallery')

      if (publicUrl) {
        urlInput.value = publicUrl
        urlInput.style.color = 'var(--color-text)'

        if (preview) {
          preview.style.display = 'block'
          preview.innerHTML = `<img src="${publicUrl}" style="width: 100%; height: 100%; object-fit: cover;">`
        }
      } else {
        urlInput.value = ''
        urlInput.style.color = 'var(--color-text)'
      }
    }
  })

  // File upload: Article Thumbnail
  document.getElementById('article-thumbnail-file')?.addEventListener('change', async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const urlInput = document.getElementById('article-thumbnail')
    const preview = document.getElementById('article-thumbnail-preview')

    urlInput.value = 'Subiendo archivo...'
    urlInput.style.color = 'var(--color-text-muted)'

    const publicUrl = await uploadFileToSupabase(file, 'articles/thumbnails')

    if (publicUrl) {
      urlInput.value = publicUrl
      urlInput.style.color = 'var(--color-text)'

      if (preview && file.type.startsWith('image/')) {
        preview.style.display = 'block'
        preview.innerHTML = `<img src="${publicUrl}" style="width: 100%; height: 100%; object-fit: cover;">`
      }
    } else {
      urlInput.value = ''
      urlInput.style.color = 'var(--color-text)'
    }
  })

  // File upload: Article Intro Media
  document.getElementById('article-intro-media-file')?.addEventListener('change', async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const urlInput = document.getElementById('article-intro-media-url')
    const preview = document.getElementById('article-intro-media-preview')

    urlInput.value = 'Subiendo archivo...'
    urlInput.style.color = 'var(--color-text-muted)'

    const folder = file.type.startsWith('video/') ? 'articles/videos' : 'articles/images'
    const publicUrl = await uploadFileToSupabase(file, folder)

    if (publicUrl) {
      urlInput.value = publicUrl
      urlInput.style.color = 'var(--color-text)'

      if (preview) {
        preview.style.display = 'block'
        if (file.type.startsWith('image/')) {
          preview.innerHTML = `<img src="${publicUrl}" style="width: 100%; height: 100%; object-fit: cover;">`
        } else if (file.type.startsWith('video/')) {
          preview.innerHTML = `<video src="${publicUrl}" style="width: 100%; height: 100%; object-fit: cover;"></video>`
        }
      }

      // Actualizar radio buttons según tipo de archivo
      if (file.type.startsWith('video/')) {
        document.getElementById('intro-type-video').checked = true
      } else if (file.type.startsWith('image/')) {
        document.getElementById('intro-type-image').checked = true
      }
    } else {
      urlInput.value = ''
      urlInput.style.color = 'var(--color-text)'
    }
  })

  // File upload: Article Audio
  document.getElementById('article-audio-file')?.addEventListener('change', async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const urlInput = document.getElementById('article-audio-url')
    const preview = document.getElementById('article-audio-preview')

    urlInput.value = 'Subiendo archivo...'
    urlInput.style.color = 'var(--color-text-muted)'

    const publicUrl = await uploadFileToSupabase(file, 'articles/audio')

    if (publicUrl) {
      urlInput.value = publicUrl
      urlInput.style.color = 'var(--color-text)'

      if (preview) {
        preview.style.display = 'flex'
      }
    } else {
      urlInput.value = ''
      urlInput.style.color = 'var(--color-text)'
    }
  })

  // Botón de preview del artículo
  document.getElementById('btn-article-preview')?.addEventListener('click', () => {
    const slug = document.getElementById('article-slug')?.value?.trim()
    if (slug) {
      window.open(`/area-tecnica/${slug}`, '_blank')
    } else {
      alert('Por favor, ingresa un slug antes de previsualizar.')
    }
  })

  // =========== FIN EVENT LISTENERS ARTÍCULOS ===========

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

  // Event delegation for dynamic plano file uploads
  document.getElementById('planos-container')?.addEventListener('change', async (e) => {
    if (e.target.classList.contains('plano-file')) {
      const file = e.target.files[0]
      if (!file) return

      const urlTargetId = e.target.getAttribute('data-url-target')
      const urlInput = document.getElementById(urlTargetId)
      const previewDiv = e.target.closest('.plano-row').querySelector('.plano-preview')

      if (!urlInput) return

      // Show loading state
      urlInput.value = 'Subiendo archivo...'
      urlInput.style.color = 'var(--color-text-muted)'

      // Upload file
      const publicUrl = await uploadFileToSupabase(file, 'projects/planos')

      if (publicUrl) {
        urlInput.value = publicUrl
        urlInput.style.color = 'var(--color-text)'

        // Update preview
        if (previewDiv) {
          previewDiv.style.display = 'block'

          if (file.type.startsWith('image/')) {
            previewDiv.innerHTML = `<img src="${publicUrl}" style="width: 100%; height: 100%; object-fit: cover;">`
          } else if (file.type.startsWith('video/')) {
            previewDiv.innerHTML = `<video src="${publicUrl}" style="width: 100%; height: 100%; object-fit: cover;"></video>`
          } else if (file.type === 'application/pdf') {
            previewDiv.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--color-neutral-50); font-size: 0.75rem;">PDF</div>`
          }
        }
      } else {
        urlInput.value = ''
        urlInput.style.color = 'var(--color-text)'
      }
    }
  })

  // Event delegation for dynamic gallery file uploads
  document.getElementById('gallery-urls-container')?.addEventListener('change', async (e) => {
    if (e.target.classList.contains('gallery-file')) {
      const file = e.target.files[0]
      if (!file) return

      const urlTargetId = e.target.getAttribute('data-url-target')
      const urlInput = document.getElementById(urlTargetId)
      const previewDiv = e.target.closest('.gallery-row').querySelector('.gallery-preview')

      if (!urlInput) return

      // Show loading state
      urlInput.value = 'Subiendo archivo...'
      urlInput.style.color = 'var(--color-text-muted)'

      // Upload file
      const publicUrl = await uploadFileToSupabase(file, 'projects/gallery')

      if (publicUrl) {
        urlInput.value = publicUrl
        urlInput.style.color = 'var(--color-text)'

        // Update preview
        if (previewDiv) {
          previewDiv.style.display = 'block'

          if (file.type.startsWith('image/')) {
            previewDiv.innerHTML = `<img src="${publicUrl}" style="width: 100%; height: 100%; object-fit: cover;">`
          } else if (file.type.startsWith('video/')) {
            previewDiv.innerHTML = `<video src="${publicUrl}" style="width: 100%; height: 100%; object-fit: cover;"></video>`
          }
        }
      } else {
        urlInput.value = ''
        urlInput.style.color = 'var(--color-text)'
      }
    }
  })

  // Modales Artículos y FAQs
  const modalArt = document.getElementById('modal-articulo')
  const modalFaq = document.getElementById('modal-faq')

  document.getElementById('btn-new-article')?.addEventListener('click', () => {
    // Abrir editor inline de artículos (NO modal)
    currentEditingArticle = null
    navigateTo('article-editor')
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
  document.getElementById('form-article')?.addEventListener('submit', submitArticle)
  document.getElementById('form-faq')?.addEventListener('submit', submitFaq)

  // Botón de previsualización de proyecto
  document.getElementById('btn-project-preview')?.addEventListener('click', () => {
    const slug = document.getElementById('proj-slug')?.value?.trim()
    if (slug) {
      // Abrir en nueva pestaña
      window.open(`/proyectos/${slug}`, '_blank')
    } else {
      alert('Por favor, ingresa un slug antes de previsualizar.')
    }
  })

  // Initialize file upload handlers
  initFileUploadHandlers()

  // Initialize features only when in project editor
  if (currentTab === 'proyecto-editor') {
    // Wait for DOM to be ready
    setTimeout(() => {
      initWysiwygEditors()
      initEditableTitle()
    }, 100)
  }

  // Initialize features only when in article editor
  if (currentTab === 'article-editor') {
    // Wait for DOM to be ready
    setTimeout(async () => {
      await initArticleEditor()
    }, 100)
  }

  // Carga inicial de datos de la pestaña activa
  if (currentUser) {
    // Si estamos editando un proyecto en particular, mapear sus campos
    if (currentTab === 'proyecto-editor') {
      await loadEditingProjectFields()
    } else if (currentTab === 'article-editor') {
      await loadEditingArticleFields()
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
 * Inicializar editor de artículos
 */
async function initArticleEditor() {
  console.log('🔧 Initializing Article Editor...')

  // Reset editors array
  articleBlockEditors = []

  // Update hero title
  const heroTitle = document.getElementById('editor-article-title')
  if (heroTitle) {
    heroTitle.textContent = currentEditingArticle ? 'Editar Artículo' : 'Nuevo Artículo Técnico'
  }

  // Cargar FAQs disponibles (sin selección inicial)
  await loadAvailableFAQs([])

  console.log('✅ Article editor initialized')
}

/**
 * Cargar datos del artículo si estamos editando
 */
async function loadEditingArticleFields() {
  if (!currentEditingArticle) {
    // Nuevo artículo
    console.log('✨ [Admin] Nuevo artículo')

    // Set default date
    const today = new Date().toISOString().split('T')[0]
    document.getElementById('article-published-date').value = today

    return
  }

  console.log('📝 [Admin] Cargando artículo:', currentEditingArticle)

  try {
    const { data: article, error } = await adminSupabase
      .from('area_tecnica_posts')
      .select('*')
      .eq('id', currentEditingArticle)
      .single()

    if (error) throw error
    if (!article) {
      console.error('❌ Artículo no encontrado')
      return
    }

    console.log('📄 [Admin] Datos del artículo:', article)

    // Campos básicos
    document.getElementById('article-id').value = article.id || ''
    document.getElementById('article-title').value = article.title || ''
    document.getElementById('article-slug').value = article.slug || ''
    document.getElementById('article-subtitle').value = article.subtitle || ''
    document.getElementById('article-category').value = article.category || ''
    document.getElementById('article-author').value = article.author || 'Equipo Xprinta'
    document.getElementById('article-published-date').value = article.published_date || ''
    document.getElementById('article-summary').value = article.summary || ''
    document.getElementById('article-published').checked = article.published || false

    // Media
    const thumbnailInput = document.getElementById('article-thumbnail')
    const thumbnailPreview = document.getElementById('article-thumbnail-preview')
    if (article.thumbnail) {
      thumbnailInput.value = article.thumbnail
      if (thumbnailPreview) {
        thumbnailPreview.style.display = 'block'
        thumbnailPreview.innerHTML = `<img src="${article.thumbnail}" style="width: 100%; height: 100%; object-fit: cover;">`
      }
    }

    // Intro media
    const introMediaInput = document.getElementById('article-intro-media-url')
    const introMediaPreview = document.getElementById('article-intro-media-preview')
    if (article.hero_video) {
      introMediaInput.value = article.hero_video
      document.getElementById('intro-type-video').checked = true
      if (introMediaPreview) {
        introMediaPreview.style.display = 'block'
        introMediaPreview.innerHTML = `<video src="${article.hero_video}" style="width: 100%; height: 100%; object-fit: cover;"></video>`
      }
    }

    // Audio resumen
    const audioInput = document.getElementById('article-audio-url')
    const audioPreview = document.getElementById('article-audio-preview')
    if (article.audio_url) {
      audioInput.value = article.audio_url
      if (audioPreview) {
        audioPreview.style.display = 'flex'
      }
    }

    // Bloques de contenido
    const blocksContainer = document.getElementById('article-blocks-container')
    console.log('📦 [Admin] Contenedor de bloques:', blocksContainer)
    console.log('📦 [Admin] article.sections:', article.sections)
    console.log('📦 [Admin] Es array?:', Array.isArray(article.sections))
    console.log('📦 [Admin] Cantidad de bloques:', article.sections?.length || 0)

    if (blocksContainer) {
      blocksContainer.innerHTML = '' // Limpiar

      // Si hay bloques guardados, cargarlos
      if (article.sections && Array.isArray(article.sections) && article.sections.length > 0) {
        article.sections.forEach((block, index) => {
          console.log(`📝 [Admin] Creando bloque ${index + 1}:`, block)
          const blockHTML = createArticleBlockHTML(block.id, block.title, block.content)
          blocksContainer.insertAdjacentHTML('beforeend', blockHTML)

          // Inicializar editor Quill para este bloque
          setTimeout(() => {
            const editor = initBlockEditor(block.id, block.content)
            if (editor) {
              articleBlockEditors.push({ blockId: block.id, editor })
              console.log(`✅ [Admin] Editor Quill inicializado para bloque ${block.id}`)
            }
          }, 100)
        })
      } else {
        // Si no hay bloques pero hay contenido antiguo (intro o content), crear un bloque automáticamente
        const hasOldContent = article.intro || article.content
        if (hasOldContent) {
          console.log('📦 [Admin] Migrando contenido antiguo a bloques...')

          // Crear bloque con contenido antiguo
          const oldContent = `${article.intro ? '<p>' + article.intro + '</p>' : ''}${article.content || ''}`
          const blockHTML = createArticleBlockHTML('', 'Contenido Principal', oldContent)
          blocksContainer.insertAdjacentHTML('beforeend', blockHTML)

          // Obtener el blockId del bloque recién creado
          const newBlock = blocksContainer.lastElementChild
          const blockId = newBlock.getAttribute('data-block-id')

          setTimeout(() => {
            const editor = initBlockEditor(blockId, oldContent)
            if (editor) {
              articleBlockEditors.push({ blockId, editor })
              console.log(`✅ [Admin] Bloque migrado desde contenido antiguo`)
            }
          }, 100)
        } else {
          console.log('📦 [Admin] No hay bloques ni contenido antiguo - artículo vacío')
        }
      }
    } else {
      console.warn('⚠️ [Admin] Contenedor de bloques no encontrado')
    }

    // Galería de imágenes
    const galleryContainer = document.getElementById('article-gallery-container')
    if (galleryContainer && article.gallery_images && Array.isArray(article.gallery_images)) {
      galleryContainer.innerHTML = '' // Limpiar

      article.gallery_images.forEach((image) => {
        const imageHTML = createArticleImageHTML(image.id, image.url, image.alt, image.caption)
        galleryContainer.insertAdjacentHTML('beforeend', imageHTML)
      })

      console.log(`✅ [Admin] Cargadas ${article.gallery_images.length} imágenes de galería`)
    }

    // FAQs relacionadas
    const relatedFaqIds = article.related_faqs || []
    await loadAvailableFAQs(relatedFaqIds)

    // Código embed de Paperform
    const paperformEmbed = document.getElementById('article-paperform-embed')
    if (paperformEmbed && article.paperform_embed_code) {
      paperformEmbed.value = article.paperform_embed_code
    }

    console.log('✅ [Admin] Artículo cargado')
  } catch (err) {
    console.error('❌ Error cargando artículo:', err)
    alert('Error cargando el artículo: ' + err.message)
  }
}

/**
 * Submit del formulario de artículo
 */
async function submitArticle(e) {
  e.preventDefault()

  if (!adminSupabase) {
    alert('Error: Cliente de Supabase no configurado.')
    return
  }

  console.log('💾 [Admin] Guardando artículo...')

  try {
    const articleId = document.getElementById('article-id').value.trim()
    const isNew = !articleId

    // Recopilar datos básicos
    const articleData = {
      title: document.getElementById('article-title').value.trim(),
      slug: document.getElementById('article-slug').value.trim(),
      subtitle: document.getElementById('article-subtitle').value.trim() || null,
      category: document.getElementById('article-category').value.trim(),
      author: document.getElementById('article-author').value.trim(),
      published_date: document.getElementById('article-published-date').value,
      summary: document.getElementById('article-summary').value.trim(),
      published: document.getElementById('article-published').checked,
      thumbnail: document.getElementById('article-thumbnail').value.trim() || null,
      hero_video: document.getElementById('article-intro-media-url').value.trim() || null,
      audio_url: document.getElementById('article-audio-url').value.trim() || null
    }

    // Recopilar bloques de contenido
    const blocks = []
    document.querySelectorAll('.article-block').forEach(blockDiv => {
      const blockId = blockDiv.getAttribute('data-block-id')
      const blockTitle = blockDiv.querySelector('.block-title').value.trim()
      const blockContent = blockDiv.querySelector('.block-content-textarea').value.trim()

      if (blockTitle || blockContent) {
        blocks.push({
          id: blockId,
          title: blockTitle,
          content: blockContent
        })
      }
    })
    articleData.sections = blocks

    // Recopilar imágenes de galería
    const galleryImages = []
    document.querySelectorAll('.article-gallery-item').forEach(imageDiv => {
      const imageId = imageDiv.getAttribute('data-image-id')
      const imageUrl = imageDiv.querySelector('.article-image-url').value.trim()
      const imageAlt = imageDiv.querySelector('.article-image-alt').value.trim()
      const imageCaption = imageDiv.querySelector('.article-image-caption').value.trim()

      if (imageUrl) {
        galleryImages.push({
          id: imageId,
          url: imageUrl,
          alt: imageAlt,
          caption: imageCaption
        })
      }
    })
    articleData.gallery_images = galleryImages

    // Recopilar FAQs seleccionadas
    const selectedFaqs = []
    document.querySelectorAll('.faq-checkbox:checked').forEach(checkbox => {
      selectedFaqs.push(checkbox.value)
    })
    articleData.related_faqs = selectedFaqs

    // Código embed de Paperform
    const paperformEmbed = document.getElementById('article-paperform-embed').value.trim()
    articleData.paperform_embed_code = paperformEmbed || null

    console.log('📦 [Admin] Datos a guardar:', articleData)

    // Guardar en Supabase
    let result
    if (isNew) {
      result = await adminSupabase.from('area_tecnica_posts').insert([articleData]).select()
    } else {
      result = await adminSupabase
        .from('area_tecnica_posts')
        .update(articleData)
        .eq('id', articleId)
        .select()
    }

    if (result.error) throw result.error

    console.log('✅ [Admin] Artículo guardado:', result.data)
    alert(isNew ? 'Artículo creado exitosamente' : 'Artículo actualizado exitosamente')

    // Volver a la lista
    navigateTo('blog')
  } catch (err) {
    console.error('❌ Error guardando artículo:', err)
    alert('Error guardando el artículo: ' + err.message)
  }
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
  // Navegar al editor inline (igual que proyectos)
  currentEditingArticle = id
  navigateTo('article-editor')
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
