/**
 * CMS Admin Dashboard Page - Xprinta Pro
 * @module pages/admin
 */

import { createClient } from '@supabase/supabase-js'
import content from '../data/content.json'

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

// Estados globales de la aplicación del panel
let currentUser = null
let currentTab = 'proyectos' // 'proyectos', 'blog', 'faqs'
let projectsList = []
let blogList = []
let faqsList = []

// Plantilla base HTML del panel
export async function renderAdmin() {
  // Comprobar si hay sesión maestra de desarrollo local
  const isMasterLocal = localStorage.getItem('admin_master_session') === 'true'
  if (isMasterLocal) {
    currentUser = { email: 'desarrollo@xprinta.com' }
  } else if (adminSupabase) {
    // Comprobar la sesión actual antes del render
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
  return `
    <main class="page-admin">
      <div class="admin-dashboard">
        
        <!-- Header -->
        <header class="admin-header">
          <div class="admin-logo-container" style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="/logo-xprina-azul.svg" alt="Xprinta Pro" style="height: 28px; width: auto;" />
            <span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: #a1a1aa; font-weight: 600; margin-top: 2px;">CMS</span>
          </div>
          <div class="admin-header-right">
            <span class="admin-user-info">${currentUser?.email}</span>
            <button id="admin-logout-btn" class="admin-action-btn" style="text-decoration: underline;">Cerrar Sesión</button>
          </div>
        </header>

        <!-- Navegación -->
        <nav class="admin-nav-tabs">
          <button class="admin-tab-btn ${currentTab === 'proyectos' ? 'active' : ''}" data-tab="proyectos">Proyectos</button>
          <button class="admin-tab-btn ${currentTab === 'blog' ? 'active' : ''}" data-tab="blog">Área Técnica</button>
          <button class="admin-tab-btn ${currentTab === 'faqs' ? 'active' : ''}" data-tab="faqs">FAQs</button>
        </nav>

        <!-- Contenido principal -->
        <div class="admin-content-area">
          
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

        </div>
      </div>

      <!-- MODALES DE CREACIÓN Y EDICIÓN -->
      
      <!-- Modal Proyecto -->
      <div id="modal-proyecto" class="admin-modal">
        <div class="admin-modal-content">
          <div class="admin-modal-header">
            <h3 id="modal-proyecto-title" class="admin-modal-title">Nuevo Proyecto</h3>
            <button class="admin-modal-close" id="modal-proyecto-close">&times;</button>
          </div>
          <form id="form-proyecto">
            <input type="hidden" id="proj-id">
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
                <label for="proj-sector">Sector</label>
                <input type="text" id="proj-sector" class="admin-input" placeholder="retail, restauracion, etc" required>
              </div>
            </div>
            <div class="admin-form-row">
              <div class="admin-form-group">
                <label for="proj-image">Imagen Hero (URL)</label>
                <input type="text" id="proj-image" class="admin-input">
              </div>
              <div class="admin-form-group">
                <label for="proj-video">Video Hero (URL - Opcional)</label>
                <input type="text" id="proj-video" class="admin-input">
              </div>
            </div>
            <div class="admin-form-group">
              <label for="proj-desc">Descripción Corta</label>
              <textarea id="proj-desc" class="admin-input" style="height: 80px; resize: vertical;"></textarea>
            </div>
            <div class="admin-modal-footer">
              <button type="button" class="admin-btn admin-btn-secondary" style="width: auto; margin: 0;" id="modal-proyecto-cancel">Cancelar</button>
              <button type="submit" class="admin-btn" style="width: auto; margin: 0;">Guardar</button>
            </div>
          </form>
        </div>
      </div>

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

/**
 * Inicializador del panel CMS y lógica interactiva
 */
export function initAdminCMS() {
  // Manejador del Login
  const loginForm = document.getElementById('admin-login-form')
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      const email = document.getElementById('admin-email').value.trim()
      const password = document.getElementById('admin-password').value.trim()
      const errorMsg = document.getElementById('login-error-msg')

      // 1. Validar usuario maestro de desarrollo local
      if (email === 'desarrollo@xprinta.com' && password === 'genesis2023G+') {
        localStorage.setItem('admin_master_session', 'true')
        currentUser = { email: 'desarrollo@xprinta.com' }
        window.location.reload()
        return
      }

      // 2. Validar con Supabase Auth
      if (!adminSupabase) {
        errorMsg.textContent = 'Error: Cliente de Supabase no configurado y credenciales maestras incorrectas.'
        errorMsg.style.display = 'block'
        return
      }

      try {
        const { data, error } = await adminSupabase.auth.signInWithPassword({ email, password })
        if (error) throw error

        currentUser = data.user
        // Recargar la vista completa
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

  // Lógica de Tabs / Pestanas
  const tabBtns = document.querySelectorAll('.admin-tab-btn')
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = e.currentTarget.getAttribute('data-tab')
      currentTab = targetTab

      tabBtns.forEach(b => b.classList.remove('active'))
      e.currentTarget.classList.add('active')

      document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.remove('active')
      })
      document.getElementById(`tab-${targetTab}`).classList.add('active')
      
      // Cargar datos del tab correspondiente
      loadTabData(targetTab)
    })
  })

  // Carga inicial de datos de la pestaña activa
  if (currentUser) {
    loadTabData(currentTab)
  }

  // Configuración de modales de creación
  setupModals()
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

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir lectura publica" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Permitir todo a usuarios autenticados" ON public.faqs FOR ALL USING (auth.role() = 'authenticated');
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
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #71717a;">No hay proyectos registrados.</td></tr>`
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
    btn.addEventListener('click', (e) => editProyecto(e.currentTarget.getAttribute('data-id')))
  })
  document.querySelectorAll('.btn-delete-proj').forEach(btn => {
    btn.addEventListener('click', (e) => deleteProyecto(e.currentTarget.getAttribute('data-id')))
  })
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
    tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: #71717a;">No hay FAQs registradas.</td></tr>`
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
 * Configuración de botones y eventos de modales
 */
function setupModals() {
  const modalProj = document.getElementById('modal-proyecto')
  const modalArt = document.getElementById('modal-articulo')
  const modalFaq = document.getElementById('modal-faq')

  // Proyectos
  document.getElementById('btn-new-proyecto')?.addEventListener('click', () => {
    document.getElementById('form-proyecto').reset()
    document.getElementById('proj-id').value = ''
    document.getElementById('modal-proyecto-title').textContent = 'Nuevo Proyecto'
    modalProj.classList.add('active')
  })

  // Artículos
  document.getElementById('btn-new-article')?.addEventListener('click', () => {
    document.getElementById('form-articulo').reset()
    document.getElementById('art-id').value = ''
    document.getElementById('modal-articulo-title').textContent = 'Nuevo Artículo'
    modalArt.classList.add('active')
  })

  // FAQs
  document.getElementById('btn-new-faq')?.addEventListener('click', () => {
    document.getElementById('form-faq').reset()
    document.getElementById('faq-id').value = ''
    document.getElementById('modal-faq-title').textContent = 'Nueva Pregunta Frecuente'
    modalFaq.classList.add('active')
  })

  // Closes y Cancels
  const closes = ['modal-proyecto-close', 'modal-proyecto-cancel', 'modal-articulo-close', 'modal-articulo-cancel', 'modal-faq-close', 'modal-faq-cancel']
  closes.forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      modalProj.classList.remove('active')
      modalArt.classList.remove('active')
      modalFaq.classList.remove('active')
    })
  })

  // Eventos submit de formularios
  document.getElementById('form-proyecto')?.addEventListener('submit', submitProyecto)
  document.getElementById('form-articulo')?.addEventListener('submit', submitArticulo)
  document.getElementById('form-faq')?.addEventListener('submit', submitFaq)
}

/**
 * Gestión de Formularios
 */
async function submitProyecto(e) {
  e.preventDefault()
  if (!adminSupabase) return

  const id = document.getElementById('proj-id').value
  const payload = {
    title: document.getElementById('proj-title').value.trim(),
    slug: document.getElementById('proj-slug').value.trim(),
    client_name: document.getElementById('proj-client').value.trim(),
    sector: document.getElementById('proj-sector').value.trim(),
    hero_image: document.getElementById('proj-image').value.trim() || null,
    hero_video: document.getElementById('proj-video').value.trim() || null,
    short_description: document.getElementById('proj-desc').value.trim() || null
  }

  try {
    if (id) {
      const { error } = await adminSupabase.from('projects').update(payload).eq('id', id)
      if (error) throw error
    } else {
      const { error } = await adminSupabase.from('projects').insert([payload])
      if (error) throw error
    }
    document.getElementById('modal-proyecto').classList.remove('active')
    loadTabData('proyectos')
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
function editProyecto(id) {
  const proj = projectsList.find(p => String(p.id) === String(id))
  if (!proj) return

  document.getElementById('proj-id').value = proj.id
  document.getElementById('proj-title').value = proj.title || ''
  document.getElementById('proj-slug').value = proj.slug || ''
  document.getElementById('proj-client').value = proj.client_name || ''
  document.getElementById('proj-sector').value = proj.sector || ''
  document.getElementById('proj-image').value = proj.hero_image || ''
  document.getElementById('proj-video').value = proj.hero_video || ''
  document.getElementById('proj-desc').value = proj.short_description || ''

  document.getElementById('modal-proyecto-title').textContent = 'Editar Proyecto'
  document.getElementById('modal-proyecto').classList.add('active')
}

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
