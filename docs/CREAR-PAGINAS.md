# Guía: Crear Nuevas Páginas - Sistema de Layout Universal

## 📦 Sistema de Componentes

El proyecto usa un sistema de layout universal que incluye automáticamente:

- ✅ **Header dinámico** con mega menu
- ✅ **Footer** con información de contacto y legal
- ✅ **Inicialización** automática de animaciones

**NO** es necesario escribir el header y footer en cada página nueva.

## 🚀 Inicio Rápido

### 1. Crear una nueva página

**Archivo:** `src/pages/mi-nueva-pagina.js`

```javascript
import { createLayout } from '../layout.js'

/**
 * Renderiza el contenido de Mi Nueva Página
 * @returns {string} HTML del contenido
 */
export const renderMiNuevaPagina = () => `
  <section class="hero-section">
    <div class="container">
      <h1>Mi Nueva Página</h1>
      <p>Contenido aquí</p>
    </div>
  </section>

  <section class="features-section">
    <div class="container">
      <!-- Más contenido -->
    </div>
  </section>
`

/**
 * Retorna el HTML completo con layout
 * @returns {string} HTML completo
 */
export const getMiNuevaPaginaHTML = () => createLayout({
  content: renderMiNuevaPagina(),
  pageClass: 'page-mi-nueva-pagina'
})
```

### 2. Registrar la página en el router

**Archivo:** `src/main.js` (o `src/router.js` si existe)

```javascript
import { getMiNuevaPaginaHTML } from './pages/mi-nueva-pagina.js'

// Detectar tipo de página
const pageType = document.body.dataset.page; // Leer del HTML

if (pageType === 'mi-nueva-pagina') {
  document.querySelector('#app').innerHTML = getMiNuevaPaginaHTML()
} else if (pageType === 'home') {
  // ... home page
}

// Inicializar después de renderizar
window.addEventListener('DOMContentLoaded', () => {
  initDynamicHeader(); // ← IMPORTANTE: Inicializar header dinámico
  initAnimations();
});
```

### 3. Crear el archivo HTML

**Archivo:** `mi-nueva-pagina.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Nueva Página - Xprinta Pro</title>
  <link rel="stylesheet" href="/src/style.css">
</head>
<body data-page="mi-nueva-pagina">
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

## 📚 API del Layout

### `createLayout(options)`

Crea un HTML completo con header, contenido y footer.

**Parámetros:**

| Nombre | Tipo | Descripción | Requerido |
|--------|------|-------------|-----------|
| `content` | `string` | HTML del contenido de la página | ✅ Sí |
| `pageClass` | `string` | Clase CSS adicional para `<main>` | ❌ No (default: '') |

**Retorna:** `string` - HTML completo

**Ejemplo:**

```javascript
const html = createLayout({
  content: '<h1>Hola Mundo</h1>',
  pageClass: 'page-home'
})
```

**Output:**

```html
<header class="site-header">...</header>
<main class="page-home">
  <h1>Hola Mundo</h1>
</main>
<footer class="footer-component">...</footer>
```

### `renderHeader()`

Retorna solo el HTML del header.

**Uso directo (poco común):**

```javascript
import { renderHeader } from './layout.js'

const headerHTML = renderHeader()
```

### `renderFooter()`

Retorna solo el HTML del footer.

**Uso directo (poco común):**

```javascript
import { renderFooter } from './layout.js'

const footerHTML = renderFooter()
```

### `initDynamicHeader()`

Inicializa el sistema de altura dinámica del header.

**⚠️ IMPORTANTE:** Debe llamarse DESPUÉS de que el HTML esté renderizado.

```javascript
import { initDynamicHeader } from './layout.js'

window.addEventListener('DOMContentLoaded', () => {
  initDynamicHeader(); // ← OBLIGATORIO
});
```

## 🎨 Estructura de una Página Típica

```
src/
├── layout.js              ← Sistema de layout universal
├── main.js                ← Router y lógica principal
└── pages/
    ├── home.js            ← Página de inicio
    ├── proyectos.js       ← Página de proyectos
    └── mi-pagina.js       ← Tu nueva página
```

### Anatomía de un archivo de página

```javascript
/**
 * ARCHIVO: src/pages/servicios.js
 */

import { createLayout } from '../layout.js'
import content from '../data/content.json' // Si necesitas datos

/**
 * Renderiza el hero de la página
 */
const renderHero = () => `
  <section class="services-hero">
    <h1>Nuestros Servicios</h1>
  </section>
`

/**
 * Renderiza la sección de features
 */
const renderFeatures = () => `
  <section class="services-features">
    <!-- Features aquí -->
  </section>
`

/**
 * Combina todas las secciones
 */
export const renderServiciosPage = () => `
  ${renderHero()}
  ${renderFeatures()}
`

/**
 * Retorna el HTML completo con layout
 */
export const getServiciosHTML = () => createLayout({
  content: renderServiciosPage(),
  pageClass: 'page-servicios'
})
```

## 🔄 Flujo Completo

```
1. Usuario visita servicios.html
   ↓
2. HTML carga con data-page="servicios"
   ↓
3. main.js detecta pageType = "servicios"
   ↓
4. main.js importa getServiciosHTML()
   ↓
5. getServiciosHTML() llama createLayout({...})
   ↓
6. createLayout() ensambla: header + contenido + footer
   ↓
7. Se inyecta en document.querySelector('#app')
   ↓
8. DOMContentLoaded → initDynamicHeader() se ejecuta
   ↓
9. Página lista ✅
```

## ✅ Checklist para Nueva Página

Antes de considerar terminada una página, verificar:

- [ ] Archivo de página creado en `src/pages/`
- [ ] Función `render[Nombre]Page()` implementada
- [ ] Función `get[Nombre]HTML()` usando `createLayout()`
- [ ] Archivo `.html` con `data-page="nombre"`
- [ ] Ruta registrada en `main.js` (router)
- [ ] `initDynamicHeader()` llamado en DOMContentLoaded
- [ ] Clase `page-[nombre]` agregada para estilos específicos
- [ ] Probado en navegador - header y footer visibles
- [ ] Mega menu funciona correctamente

## 🎯 Ejemplo Completo: Página de Equipo

### 1. Crear `src/pages/equipo.js`

```javascript
import { createLayout } from '../layout.js'

const renderTeamHero = () => `
  <section class="team-hero gsap-reveal">
    <div class="container">
      <h1>Nuestro Equipo</h1>
      <p>Conoce a las personas detrás de Xprinta Pro</p>
    </div>
  </section>
`

const renderTeamGrid = () => `
  <section class="team-grid">
    <div class="container">
      <div class="team-member">
        <img src="/team/member-1.jpg" alt="Juan Pérez">
        <h3>Juan Pérez</h3>
        <p>CEO</p>
      </div>
      <!-- Más miembros -->
    </div>
  </section>
`

export const renderEquipoPage = () => `
  ${renderTeamHero()}
  ${renderTeamGrid()}
`

export const getEquipoHTML = () => createLayout({
  content: renderEquipoPage(),
  pageClass: 'page-equipo'
})
```

### 2. Actualizar `src/main.js`

```javascript
import { getEquipoHTML } from './pages/equipo.js'
import { initDynamicHeader } from './layout.js'

const pageType = document.body.dataset.page;

if (pageType === 'equipo') {
  document.querySelector('#app').innerHTML = getEquipoHTML()
} else if (pageType === 'home') {
  // ... home
}

window.addEventListener('DOMContentLoaded', () => {
  initDynamicHeader(); // ← CRÍTICO
  initAnimations();
});
```

### 3. Crear `equipo.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Equipo - Xprinta Pro</title>
  <link rel="stylesheet" href="/src/style.css">
</head>
<body data-page="equipo">
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

### 4. Agregar estilos (opcional)

```css
/* src/style.css */

.page-equipo {
  /* Estilos específicos para la página de equipo */
}

.team-hero {
  padding: 120px 0 80px;
  text-align: center;
}

.team-grid {
  padding: 80px 0;
}
```

### 5. Probar

```bash
npm run dev
# Visitar http://localhost:5173/equipo.html
```

Verificar:
- ✅ Header visible con mega menu funcionando
- ✅ Contenido del equipo visible
- ✅ Footer visible con información de contacto
- ✅ Transiciones GSAP funcionando
- ✅ No hay errores en console

## 🚨 Errores Comunes

### Error: Header no aparece

**Causa:** No se llamó `createLayout()`

**Solución:**
```javascript
// ❌ MAL
export const getMiPaginaHTML = () => renderMiPagina()

// ✅ BIEN
export const getMiPaginaHTML = () => createLayout({
  content: renderMiPagina(),
  pageClass: 'page-mi-pagina'
})
```

### Error: Mega menu no funciona

**Causa:** `initDynamicHeader()` no se ejecutó

**Solución:**
```javascript
window.addEventListener('DOMContentLoaded', () => {
  initDynamicHeader(); // ← Agregar esto
});
```

### Error: Footer con datos incorrectos

**Causa:** `content.json` no está importado

**Solución:**
```javascript
import content from '../data/content.json'

// Ahora se puede usar content.footer.contact.email
```

### Error: Estilos no se aplican

**Causa:** Clase `page-[nombre]` no agregada

**Solución:**
```javascript
createLayout({
  content: renderMiPagina(),
  pageClass: 'page-mi-pagina' // ← Agregar esto
})
```

## 📖 Referencias

- **Layout source:** `/src/layout.js`
- **Documentación header:** `/docs/HEADER-SISTEMA.md`
- **Design system:** `/docs/DESIGN-SYSTEM.md`
- **Ejemplo completo:** `/src/template-proyecto.js`

## 🔗 Links Relacionados

- [Sistema de Header Dinámico](./HEADER-SISTEMA.md)
- [Design System Rules](./DESIGN-SYSTEM.md)
- [Content Data](../src/data/content.json)

---

**Última actualización:** 2026-06-23
**Versión:** 1.0
**Autor:** Xprinta Pro Team + Claude Code
