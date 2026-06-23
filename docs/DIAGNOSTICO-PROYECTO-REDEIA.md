# Diagnóstico de Problemas - proyecto-redeia.html

## 🔍 Problemas Reportados

1. ❌ **No funciona el puntero** (cursor personalizado)
2. ❌ **No se ven los textos**
3. ❌ **No funciona el simulador 3D**
4. ❌ **No funciona la galería del trabajo terminado**

---

## 📋 Análisis de Arquitectura

### Estructura Actual

```
proyecto-redeia.html
  ├─ <body data-page="proyecto">
  ├─ <script src="/src/main.js">
  └─ <div id="app"></div>

main.js
  ├─ Detecta: isProyectoPage = document.body.dataset.page === 'proyecto'
  ├─ Si isProyectoPage:
  │   ├─ renderNavbar()
  │   ├─ renderProyectoTemplate(redeiaData) ← template-proyecto.js
  │   ├─ renderContacto(true)
  │   └─ renderFooter()
  └─ Inicializa: initProyectoAnimations() ← template-proyecto.js

template-proyecto.js
  ├─ renderProyectoTemplate(data)
  │   ├─ Hero con video/imagen
  │   ├─ Meta Bento (cliente, sector, servicio)
  │   ├─ Location (mapa Google)
  │   ├─ Storytelling (challenge + solution)
  │   ├─ Blueprints (planos técnicos)
  │   ├─ 3D Render (model-viewer) ← PROBLEMA #3
  │   └─ Gallery (masonry grid) ← PROBLEMA #4
  └─ initProyectoAnimations()
      ├─ Hero animations
      ├─ Parallax images
      ├─ GSAP reveals
      └─ Lightbox interactions
```

### ⚠️ Problema de Arquitectura

**El home y los proyectos comparten:**
- ✅ `main.js` (mismo archivo)
- ✅ `style.css` (mismo archivo)
- ✅ Navbar, Footer, Cursor (mismos componentes)

**Esto significa:**
- ❌ Cambios en CSS afectan a AMBAS páginas
- ❌ Cambios en JS afectan a AMBAS páginas
- ❌ No hay blindaje entre home y proyectos

---

## 🐛 Diagnóstico de Problemas Específicos

### Problema #1: Cursor No Funciona

**Código del Cursor (main.js:972-1132):**
```javascript
const cursorDot = document.querySelector('.custom-cursor__dot');
const cursorRing = document.querySelector('.custom-cursor__ring');
const cursorText = document.querySelector('.custom-cursor__text');

if (cursorDot && cursorRing) {
  // ... animaciones
}
```

**Renderizado del Cursor:**
```javascript
// main.js:625-626 (página proyecto)
<div class="custom-cursor__dot"></div>
<div class="custom-cursor__ring"><span class="custom-cursor__text"></span></div>

// main.js:641-642 (página home)
<div class="custom-cursor__dot"></div>
<div class="custom-cursor__ring"><span class="custom-cursor__text"></span></div>
```

**CSS del Cursor (style.css:171-212):**
```css
.custom-cursor__dot {
  position: fixed;
  width: 20px;
  height: 20px;
  background-color: var(--color-background);
  border: 2px solid var(--color-primary);
  border-radius: 20px;
  pointer-events: none;
  z-index: 9998;
  mix-blend-mode: exclusion;
}

.custom-cursor__ring {
  position: fixed;
  width: 0px;
  height: 0px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9997;
  opacity: 0;
}
```

**Posible Causa:**
- El cursor se renderiza pero podría estar oculto por variables CSS incorrectas
- `mix-blend-mode: exclusion` podría no funcionar con ciertos fondos
- El código de inicialización está en `initAnimations()` que solo se ejecuta para el HOME

**Solución:**
```javascript
// main.js:1135-1141
window.addEventListener('DOMContentLoaded', () => {
  if (isProyectoPage) {
    initProyectoAnimations(); // ← Solo ejecuta esto
  } else {
    initAnimations(); // ← El cursor se inicializa AQUÍ (línea 972)
  }
});
```

**🔴 PROBLEMA ENCONTRADO:** El cursor solo se inicializa en `initAnimations()` (home), pero NO en `initProyectoAnimations()` (proyecto).

---

### Problema #2: No Se Ven Textos

**Posibles causas:**
1. Variables CSS con valores incorrectos
2. Color de texto igual al color de fondo
3. `opacity: 0` no revertido por animaciones GSAP
4. `z-index` incorrecto (textos detrás de otros elementos)

**Variables CSS críticas:**
```css
--color-primary: /* Negro o color oscuro para textos */
--color-background: /* Color de fondo */
--color-text: /* Color de texto base */
--color-text-muted: /* Color de texto secundario */
```

**Necesito revisar:**
- ¿Las variables están definidas?
- ¿Los colores tienen contraste suficiente?
- ¿Las animaciones GSAP están revirtiéndose correctamente?

---

### Problema #3: Simulador 3D No Funciona

**Código del Simulador (template-proyecto.js:166-175):**
```html
<model-viewer
  src="${data.render3d.model}"
  camera-controls
  auto-rotate
  rotation-per-second="30deg"
  environment-image="neutral"
  shadow-intensity="1"
  style="width: 100%; height: 100%; outline: none;"
  interaction-prompt="auto">
</model-viewer>
```

**Datos del modelo (redeia.json:65):**
```json
"model": "https://modelviewer.dev/shared-assets/models/Astronaut.glb"
```

**HTML Head (proyecto-redeia.html:10):**
```html
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>
```

**Posible Causa:**
- El script de `model-viewer` no se está cargando
- El elemento no se está renderizando porque la condición `${data.render3d ? ... : ''}` falla
- Hay errores de JavaScript que impiden la inicialización

**Verificación necesaria:**
1. ¿Se está cargando el script de model-viewer?
2. ¿Aparece el elemento `<model-viewer>` en el DOM?
3. ¿Hay errores en la consola?

---

### Problema #4: Galería No Funciona

**Código de la Galería (template-proyecto.js:181-199):**
```html
<div class="masonry-grid" style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 2vw;">
  ${data.gallery.map((img, i) => `
  <div class="masonry-item gsap-reveal" style="grid-column: span ${img.gridCols}; height: ${img.height};">
    <img src="${img.image}" alt="${img.alt}" class="parallax-img" />
  </div>
  `).join('')}
</div>
```

**Animaciones de la Galería (template-proyecto.js:335-348):**
```javascript
const items = document.querySelectorAll('.masonry-item');
if (items.length) {
  gsap.fromTo(items, { y: 100, opacity: 0 }, {
    y: 0,
    opacity: 1,
    stagger: 0.15,
    duration: 1.5,
    scrollTrigger: {
      trigger: ".project-gallery",
      start: "top 70%"
    }
  });
}
```

**Lightbox (template-proyecto.js:350-390):**
```javascript
if (!document.getElementById('nw-lightbox')) {
  const lb = document.createElement('div');
  lb.id = 'nw-lightbox';
  lb.innerHTML = '<img src="" alt="Zoomed view" />';
  document.body.appendChild(lb);
}

document.querySelectorAll('.masonry-item img, .project-render img').forEach(img => {
  img.addEventListener('click', function() {
    const fullSrc = this.src;
    document.querySelector('#nw-lightbox img').src = fullSrc;
    document.getElementById('nw-lightbox').classList.add('active');
  });
});
```

**Posible Causa:**
- Las imágenes no se están mostrando (problema de rutas)
- Las animaciones GSAP no se ejecutan (ScrollTrigger no inicializado)
- El lightbox no se está creando
- Problema de CSS (grid no funciona, imágenes ocultas)

---

## 🛠️ Plan de Reparación

### 1. Arreglar Cursor (CRÍTICO)
```javascript
// En template-proyecto.js, agregar al final de initProyectoAnimations():

// Custom Premium Cursor
const cursorDot = document.querySelector('.custom-cursor__dot');
const cursorRing = document.querySelector('.custom-cursor__ring');
const cursorText = document.querySelector('.custom-cursor__text');

if (cursorDot && cursorRing) {
  // Copiar todo el código del cursor desde main.js:973-1132
}
```

### 2. Revisar Variables CSS
```javascript
// Crear script de diagnóstico que verifique:
const root = document.documentElement;
const primary = getComputedStyle(root).getPropertyValue('--color-primary');
const background = getComputedStyle(root).getPropertyValue('--color-background');
console.log({ primary, background });
```

### 3. Verificar Model Viewer
```javascript
// Agregar event listeners para depuración:
document.querySelector('model-viewer')?.addEventListener('load', () => {
  console.log('✅ Model loaded');
});

document.querySelector('model-viewer')?.addEventListener('error', (e) => {
  console.error('❌ Model error:', e);
});
```

### 4. Verificar Galería
```javascript
// Verificar que las imágenes existen:
document.querySelectorAll('.masonry-item img').forEach(img => {
  img.addEventListener('error', function() {
    console.error('❌ Image failed:', this.src);
  });
  img.addEventListener('load', function() {
    console.log('✅ Image loaded:', this.src);
  });
});
```

---

## 🎯 Próximos Pasos

1. ✅ Revisar arquitectura (COMPLETADO)
2. ⏳ Crear archivo de CSS específico para proyectos
3. ⏳ Copiar código del cursor a `initProyectoAnimations()`
4. ⏳ Verificar variables CSS en página de proyecto
5. ⏳ Probar model-viewer con consola abierta
6. ⏳ Verificar que imágenes de galería cargan
7. ⏳ Blindar home vs proyectos con arquitectura modular

---

**Fecha:** 2026-06-23
**Estado:** Diagnóstico completado, esperando correcciones
