# SPEC v2: Directorio de Proyectos - Xprinta Pro

**Fecha:** 2026-06-24
**Objetivo:** Copiar EXACTAMENTE la estructura de https://igniteagency.com/work
**Basado en:** Código HTML real de Ignite Agency

---

## 🎯 Estructura Real de Ignite Agency

### Layout Principal

```
┌─────────────────────────────────────────────────────────┐
│ Header: Título + Filtros horizontales (radio buttons)  │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  Sidebar     │  Proyecto #1 (ancho completo)           │
│  (lista      │  ┌──────────────────────────────────┐   │
│   de         │  │ Video Vimeo (hover autoplay)     │   │
│   proyectos) │  └──────────────────────────────────┘   │
│              │  Pills + Botones                         │
│              │  Título + Descripción                    │
│              │                                          │
│              │  Proyecto #2 (ancho completo)           │
│              │  ┌──────────────────────────────────┐   │
│              │  │ Video Vimeo                      │   │
│              │  └──────────────────────────────────┘   │
│              │  Pills + Botones                         │
│              │  Título + Descripción                    │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

**NO es un grid de 3 columnas**, es una lista vertical donde cada proyecto ocupa el 100% del ancho.

---

## 📐 Componentes

### 1. Header con Filtros

**HTML Real:**
```html
<header class="section_header">
  <h1 class="text-style-subtitle">Web Design & Digital Marketing Projects</h1>
  <h2>projects</h2>
</header>

<div class="filter-form">
  <div class="filter-button">
    <label class="filter-radio text-size-xxlarge">
      <input type="radio" name="Filters" value="All" checked/>
      <span>All</span>
      <div class="text-size-regular">12</div> <!-- Contador -->
    </label>
  </div>
  <div class="filter-button">
    <label class="filter-radio text-size-xxlarge">
      <input type="radio" name="Filters" value="Education"/>
      <span>Education</span>
      <div class="text-size-regular">13</div>
    </label>
  </div>
  <!-- Más filtros... -->
</div>
```

**CSS:**
- Filtros horizontales en `display: flex`
- Radio buttons personalizados (ocultos con `opacity: 0`)
- Texto grande (`text-size-xxlarge`)
- Contador a la derecha del label

---

### 2. Sidebar con Navegación

**HTML Real:**
```html
<details class="work_project-nav" open>
  <summary class="work_project-nav_toggle">
    <p>Projects</p>
    <div class="work_project-nav_icon">
      <svg><!-- Chevron icon --></svg>
    </div>
  </summary>

  <div class="work_project-nav_items">
    <div class="work_item_toggle text-style-subtitle">
      <div class="work_item_divider"></div>
      <p class="work_item_title">Wesley College Website</p>
      <a href="#wesley-college-website" class="work_item_link"></a>
      <div class="work_item-background"></div>
    </div>
    <!-- Más proyectos... -->
  </div>
</details>
```

**Características:**
- `<details>` nativo de HTML (desplegable)
- Anchor links con `#id` para scroll a cada proyecto
- Divider entre cada item
- Background animado en hover

---

### 3. Proyecto Individual (Ancho Completo)

**HTML Real:**
```html
<div id="wesley-college-website" class="work_item_content">

  <!-- Video a ancho completo -->
  <div class="work_item_video">
    <div class="vimeo_pointer-overlay"></div>
    <div class="vimeo_component">
      <iframe
        src="https://player.vimeo.com/video/1192152929?background=1&quality=480p&autoplay=0"
        data-vimeo-hover="true"
        muted
        tabindex="-1"
        loading="lazy">
      </iframe>
    </div>
  </div>

  <!-- Pills de categoría + Botones CTA -->
  <div class="work_content-top">
    <div class="pill-tag-wrapper">
      <div class="pill-tag">
        <p>Education</p>
      </div>
      <div class="pill-tag">
        <p>Residential college</p>
      </div>
    </div>

    <div class="button_group is-work-content">
      <a href="/projects/wesley-college-website" class="button_component">
        <p>View Case Study</p>
      </a>
      <a href="https://www.wesleycollege-usyd.edu.au/" class="button_component is-link">
        <p>Visit Site</p>
      </a>
    </div>
  </div>

  <!-- Título + Descripción DEBAJO del video -->
  <div class="work_content-bottom">
    <div class="work_content-bottom_left">
      <p class="text-size-large text-weight-medium">Wesley College</p>
    </div>
    <div class="work_content-bottom_right">
      <p>Wesley College at the University of Sydney partnered with IGNITE...</p>
    </div>
  </div>

</div>
```

**Layout:**
- Video: 100% width, aspect ratio preservado
- Pills + Botones: `display: flex` entre ellos
- Bottom: Grid de 2 columnas (título | descripción)

---

## 🎨 Estilos Clave

### Variables CSS de Ignite

Del código HTML extraído:

```css
:root {
  /* Grid system */
  --grid--column-count: 12;
  --grid--column-gap: var(--spacing--1-5);
  --grid--row-gap: var(--spacing--2);

  /* Spacing */
  --spacing--10: 10rem;
  --spacing--8: 8rem;
  --spacing--6: 6rem;
  --spacing--5: 5rem;
  --spacing--4: 4rem;
  --spacing--3: 3rem;
  --spacing--2: 2rem;
  --spacing--1-5: 1.5rem;
  --spacing--1: 1rem;

  /* Typography */
  --fluid-min-font-size: 14;
  --fluid-max-font-size: 18;
  --fluid-min-scale-ratio: 1.25;
  --fluid-max-scale-ratio: 1.33;
}
```

### Filtros (Radio Buttons)

```css
.filter-radio {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-radio input[type="radio"] {
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.filter-radio-button {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 2px solid currentColor;
}

.filter-radio input:checked ~ .filter-radio-button {
  background: currentColor;
}
```

### Sidebar Navigation

```css
.work_project-nav {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.work_item_toggle {
  position: relative;
  cursor: pointer;
  padding: 1rem 0;
}

.work_item_toggle:hover .work_item_title {
  transform: translateX(1rem);
}

.work_item_toggle:hover .work_item-background {
  transform: none;
}
```

### Video Container

```css
.work_item_video {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.vimeo_video-embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

---

## 🎬 Interacciones

### 1. Video Autoplay en Hover

**JavaScript del código real:**
```javascript
// data-vimeo-hover="true" activa el autoplay
const videos = document.querySelectorAll('[data-vimeo-hover="true"]');
videos.forEach(video => {
  video.addEventListener('mouseenter', () => {
    video.contentWindow.postMessage('{"method":"play"}', '*');
  });
  video.addEventListener('mouseleave', () => {
    video.contentWindow.postMessage('{"method":"pause"}', '*');
  });
});
```

### 2. Filtrado con Finsweet Attributes

Ignite usa **Finsweet CMS Filter** (librería externa), pero podemos implementar manualmente:

```javascript
const filterButtons = document.querySelectorAll('.filter-radio input');
filterButtons.forEach(btn => {
  btn.addEventListener('change', (e) => {
    const filter = e.target.value;
    const projects = document.querySelectorAll('.work_item_content');

    projects.forEach(project => {
      const sector = project.dataset.sector;
      if (filter === 'All' || sector === filter) {
        project.style.display = 'block';
      } else {
        project.style.display = 'none';
      }
    });
  });
});
```

### 3. Scroll Anchor Links

Los links del sidebar usan anchor links nativos:

```html
<a href="#wesley-college-website">Wesley College Website</a>
```

Con smooth scroll:

```css
html {
  scroll-behavior: smooth;
}
```

---

## 📱 Responsive

### Desktop (>991px)

```
┌──────────────┬─────────────────────────────────┐
│  Sidebar     │  Proyectos (100% width)         │
│  (274px)     │                                 │
│              │                                 │
└──────────────┴─────────────────────────────────┘
```

### Tablet (768-991px)

Sidebar colapsa en `<details>`:

```css
@media (max-width: 991px) {
  .work_project-nav {
    position: static;
    height: auto;
  }

  .work_project-nav[data-accordion-closed="tablet"] {
    /* Cerrado por defecto */
  }
}
```

### Mobile (<767px)

Todo stacked verticalmente, sidebar cerrado por defecto.

---

## 🗄️ Estructura de Datos

### Proyecto desde Supabase

```javascript
{
  slug: 'wesley-college-website',
  title: 'Wesley College Website',
  sector: 'Education', // Para filtrado
  category: 'Residential college', // Para pill secundaria
  short_description: 'Wesley College at the University of Sydney...',
  hero_video: '/proyectos/wesley/video.mp4', // Video local
  vimeo_id: '1192152929', // O ID de Vimeo
  case_study_url: '/proyecto/wesley-college-website',
  live_site_url: 'https://www.wesleycollege-usyd.edu.au/'
}
```

---

## ✅ Diferencias con mi implementación anterior

| Aspecto | ❌ Mi implementación | ✅ Ignite Real |
|---------|---------------------|---------------|
| Layout | Grid 3 columnas | Lista vertical, 100% width |
| Contenido multimedia | Imágenes estáticas | Videos Vimeo con autoplay |
| Texto posición | Overlay sobre imagen | Debajo del video |
| Navegación | Solo filtros | Sidebar + filtros |
| Filtros | Inline text buttons | Radio buttons con contador |
| Rotación cards | Alternada -4deg | No hay rotación |
| Sidebar | No existe | `<details>` sticky con lista |

---

## 📋 Checklist de Implementación

**Estructura:**
- [ ] Header con título + subtítulo
- [ ] Filtros como radio buttons horizontales con contador
- [ ] Sidebar `<details>` con lista de proyectos
- [ ] Layout de 2 columnas (sidebar | contenido)
- [ ] Proyectos en lista vertical (100% width)

**Contenido:**
- [ ] Video container con iframe de Vimeo
- [ ] Pills de categorías
- [ ] Botones CTA (View Case Study + Visit Site)
- [ ] Grid de 2 columnas (título | descripción)

**Funcionalidad:**
- [ ] Filtrado por sector (radio buttons)
- [ ] Scroll anchor links desde sidebar
- [ ] Video autoplay en hover (Vimeo API)
- [ ] Contador de proyectos por filtro

**Responsive:**
- [ ] Desktop: Sidebar sticky
- [ ] Tablet: Sidebar colapsable
- [ ] Mobile: Sidebar cerrado por defecto

---

## 🎯 Resultado Esperado

Una página que **se vea y funcione EXACTAMENTE** como https://igniteagency.com/work:
- Layout vertical con sidebar de navegación
- Videos de Vimeo que se reproducen en hover
- Filtros con radio buttons y contadores
- Navegación fluida con anchor links
- Adaptado al sistema de diseño Xprinta (colores, tipografía)

**URL:** `https://new.xprintapro.com/proyectos`
