# 📋 PLANTILLA UNIVERSAL DE PROYECTO - Guía Completa

**Versión:** 2.0
**Última actualización:** 2026-06-23
**Autor:** Xprinta Pro Team

---

## 🎯 Propósito

Esta plantilla permite crear páginas de proyecto completas, profesionales y consistentes de forma rápida y certera. Todos los proyectos siguen la misma estructura visual y de datos.

---

## 📂 Estructura de Archivos

```
src/
├── data/
│   └── projects/
│       ├── redeia.json          ← Datos del proyecto Redeia (REFERENCIA)
│       ├── arval.json           ← Datos del proyecto Arval (REFERENCIA)
│       └── tu-proyecto.json     ← Tu nuevo proyecto
├── pages/
│   └── proyectos/
│       ├── redeia.js            ← Página de Redeia (REFERENCIA)
│       ├── arval.js             ← Página de Arval (REFERENCIA)
│       └── tu-proyecto.js       ← Tu nueva página
└── templates/
    └── project-template.js      ← PLANTILLA UNIVERSAL (NO MODIFICAR)
```

---

## 🧩 Estructura de Datos JSON

### Campos Obligatorios

```json
{
  "id": "slug-del-proyecto",                    // OBLIGATORIO - Único, lowercase, guiones
  "title": "Título completo del proyecto",      // OBLIGATORIO
  "createdDate": "2024-06-20",                  // OBLIGATORIO - Formato ISO
  "category": "Sector / Tipo",                  // OBLIGATORIO
  "shortDescription": "Descripción breve",      // OBLIGATORIO

  "hero": {                                     // OBLIGATORIO
    "video": "/proyectos/tu-proyecto/hero.mp4" // video O image (uno obligatorio)
  },

  "client": {                                   // OBLIGATORIO
    "name": "Nombre del Cliente",               // OBLIGATORIO
    "description": "Descripción del cliente"    // OBLIGATORIO
  },

  "sector": "Sector Industrial",                // OBLIGATORIO

  "service": {                                  // OBLIGATORIO
    "title": "Servicio Prestado",               // OBLIGATORIO
    "logo": "/proyectos/tu-proyecto/logo.webp"  // OPCIONAL
  }
}
```

### Secciones Opcionales (Pero Recomendadas)

#### 1. Location (Mapa de Google Maps)

```json
"location": {
  "title": "Ubicación Principal",
  "description": "Descripción de la ubicación",
  "type": "single",              // "single" o "national"
  "markers": [
    { "lat": 40.4168, "lng": -3.7038 }
  ]
}
```

**Notas:**
- `type: "single"` → Un solo marcador (se centra con zoom 11)
- `type: "national"` → Múltiples marcadores (auto-fit bounds)
- El mapa automáticamente se desplaza para compensar el gradiente negro

#### 2. Story (Desafío y Solución)

```json
"story": {
  "challengeTitle": "Título del <span style=\"font-style: italic; color: var(--color-highlight);\">desafío</span>",
  "challenge": "Descripción completa del desafío...",
  "challengeImage": "/proyectos/tu-proyecto/challenge.jpg",

  "solutionTitle": "Título de la <span style=\"font-style: italic; color: var(--color-highlight);\">solución</span>",
  "solution": "Descripción completa de la solución...",
  "solutionImage": "/proyectos/tu-proyecto/solution.jpg"
}
```

**Tip de Estilo:** Usa `<span>` con color highlight para palabras clave

#### 3. Blueprints (Planos Técnicos)

```json
"blueprints": [
  "/proyectos/tu-proyecto/plano1.jpg",
  "/proyectos/tu-proyecto/plano2.jpg",
  "/proyectos/tu-proyecto/plano3.jpg"
],
"blueprintSteps": [
  {
    "title": "Paso 1: Cotas Generales",
    "description": "Descripción técnica del paso..."
  },
  {
    "title": "Paso 2: Sistema Eléctrico",
    "description": "Descripción técnica del paso..."
  }
]
```

**Requisitos:**
- `blueprints` y `blueprintSteps` deben tener **la misma cantidad** de elementos
- Se sincronizan automáticamente: scroll del texto cambia la imagen

#### 4. Render 3D (Modelo 3D Interactivo)

```json
"render3d": {
  "title": "Modelo 3D Interactivo",
  "description": "Explora el modelo en detalle...",
  "model": "https://ejemplo.com/modelo.glb"
}
```

**Formatos soportados:** GLB, GLTF (recomendado: GLB)

#### 5. Gallery (Galería de Imágenes)

```json
"gallery": [
  {
    "image": "/proyectos/tu-proyecto/foto1.jpg",
    "alt": "Descripción de la imagen",
    "gridCols": 8,        // 4, 8 o 12 (ancho en grid de 12 columnas)
    "height": "80vh"      // 60vh, 80vh, 100vh
  },
  {
    "image": "/proyectos/tu-proyecto/foto2.jpg",
    "alt": "Descripción",
    "gridCols": 4,
    "height": "60vh"
  }
]
```

**Layouts Recomendados:**
- Hero principal: `gridCols: 8, height: "80vh"`
- Imágenes secundarias: `gridCols: 4, height: "60vh"`
- Fullwidth: `gridCols: 12, height: "100vh"`

#### 6. Testimonial (Testimonio del Cliente)

```json
"testimonial": {
  "quote": "Cita del cliente con <span style=\"font-style: italic; color: var(--color-highlight);\">highlights</span>",
  "author": "Nombre del Autor",
  "role": "Cargo / Empresa"
}
```

---

## 🚀 Cómo Crear un Nuevo Proyecto (5 Pasos)

### Paso 1: Crear el archivo JSON

```bash
# Crear el archivo de datos
touch src/data/projects/mi-proyecto.json
```

**Contenido mínimo:**

```json
{
  "id": "mi-proyecto",
  "title": "Mi Proyecto Increíble",
  "createdDate": "2024-06-23",
  "category": "Sector / Tipo",
  "shortDescription": "Descripción breve del proyecto",
  "hero": {
    "image": "/proyectos/mi-proyecto/hero.jpg"
  },
  "client": {
    "name": "Nombre del Cliente",
    "description": "Descripción del cliente"
  },
  "sector": "Sector",
  "service": {
    "title": "Servicio"
  }
}
```

### Paso 2: Crear la página del proyecto

```bash
touch src/pages/proyectos/mi-proyecto.js
```

**Contenido (copiar tal cual):**

```javascript
/**
 * Proyecto: Mi Proyecto Increíble
 *
 * @module pages/proyectos/mi-proyecto
 */

import { createProjectPage } from '../../templates/project-template.js'
import miProyectoData from '../../data/projects/mi-proyecto.json'

/**
 * Genera el HTML completo del proyecto usando la plantilla universal
 *
 * @returns {Promise<string>} HTML completo con header + proyecto + footer
 */
export const getMiProyectoHTML = async () => await createProjectPage(miProyectoData)
```

### Paso 3: Registrar la ruta en main.js

**Editar:** `src/main.js`

```javascript
// 1. Importar la función
import { getMiProyectoHTML } from './pages/proyectos/mi-proyecto.js'

// 2. Agregar en la función loadPage()
async function loadPage() {
  const app = document.querySelector('#app');

  if (pageType === 'proyecto-redeia') {
    app.innerHTML = await getRedeiaHTML();
  } else if (pageType === 'proyecto-arval') {
    app.innerHTML = await getArvalHTML();
  } else if (pageType === 'proyecto-mi-proyecto') {  // ← AGREGAR AQUÍ
    app.innerHTML = await getMiProyectoHTML();
  } else {
    app.innerHTML = await getHomeHTML();
  }

  // ... resto del código
}
```

### Paso 4: Agregar al índice de Supabase

**Insertar en la tabla `projects`:**

```sql
INSERT INTO projects (
  slug,
  title,
  category,
  sector,
  short_description,
  client_name,
  client_description,
  service_title,
  service_logo,
  hero_video,
  hero_image,
  created_at
) VALUES (
  'mi-proyecto',
  'Mi Proyecto Increíble',
  'Sector / Tipo',
  'Sector',
  'Descripción breve del proyecto',
  'Nombre del Cliente',
  'Descripción del cliente',
  'Servicio',
  '/proyectos/mi-proyecto/logo.webp',
  NULL,  -- o ruta del video
  '/proyectos/mi-proyecto/hero.jpg',
  '2024-06-23'
);
```

### Paso 5: Probar

**URL:** `http://localhost:5173/proyecto-mi-proyecto.html`

---

## ✅ Checklist de Calidad

Antes de publicar un proyecto, verifica:

- [ ] **ID único** (slug sin mayúsculas ni espacios)
- [ ] **Fechas válidas** (formato ISO: YYYY-MM-DD)
- [ ] **Imágenes optimizadas** (WebP si es posible, JPEG para fotos)
- [ ] **Videos comprimidos** (H.264, menos de 50MB)
- [ ] **Alt text descriptivo** en todas las imágenes de la galería
- [ ] **Mismo número de blueprints y blueprintSteps**
- [ ] **Markers con coordenadas reales** (verificar en Google Maps)
- [ ] **Highlights en testimoniales** (usar `<span>` para palabras clave)
- [ ] **Responsive testing** (verificar en móvil, tablet, desktop)
- [ ] **Prueba de animaciones** (título del hero, parallax, cursor)
- [ ] **Verificar mapas** (centrado correcto, marcadores visibles)

---

## 🎨 Guía de Estilo Visual

### Tipografía

- **Títulos hero:** `text-large font-serif` (clamp 2.5rem - 4rem)
- **Títulos de sección:** `text-large font-serif` (con highlights en cursiva)
- **Cuerpo:** `font-sans` (Manrope)
- **Etiquetas:** `text-caption text-uppercase`

### Highlights (Palabras Clave)

```html
<span style="font-style: italic; color: var(--color-highlight);">palabra clave</span>
```

### Grid de Galería

- **Hero principal:** 8 columnas (66%)
- **Secundaria grande:** 4 columnas (33%)
- **Fullwidth:** 12 columnas (100%)

### Heights

- **Impactante:** `80vh` o `100vh`
- **Estándar:** `60vh`
- **Compacto:** `40vh`

---

## 🔧 Funcionalidades Automáticas

La plantilla incluye automáticamente:

✅ **Animaciones GSAP**
- Hero title reveal (translateY 110% → 0%)
- Hero media clip-path animation
- Scroll parallax en hero
- Stagger reveal en meta bento
- Blueprint scroll-spy

✅ **Google Maps**
- Inicialización automática
- Centrado con compensación de gradiente
- Marcadores custom (naranja #F18108)
- Estilos premium

✅ **Cursor Personalizado**
- Funciona en todas las páginas
- Cambia en hover sobre enlaces/botones

✅ **Smooth Scroll** (Lenis)

✅ **Responsive** automático

---

## 📝 Ejemplo Completo de JSON

Ver archivos de referencia:
- `src/data/projects/redeia.json` ← Proyecto con múltiples marcadores
- `src/data/projects/arval.json` ← Proyecto con ubicación única

---

## 🐛 Troubleshooting

### El título del hero no se ve
- **Causa:** Falta animación GSAP de proyecto
- **Solución:** Ya está implementada en `main.js` (v2.0+)

### El mapa no se centra bien
- **Causa:** Necesita compensación del gradiente negro
- **Solución:** Ya está implementado con `panBy` y padding asimétrico

### Los blueprints no sincronizan
- **Causa:** Diferente número de elementos en `blueprints` y `blueprintSteps`
- **Solución:** Asegurar mismo número de elementos en ambos arrays

### Error [object Promise]
- **Causa:** Falta `await` en alguna función async
- **Solución:** Verificar que todas las funciones sean async/await

---

## 📞 Soporte

Para dudas o problemas:
1. Revisar proyectos de referencia (Redeia, Arval)
2. Consultar esta documentación
3. Verificar el Checklist de Calidad

---

**Última revisión:** 2026-06-23
**Mantenido por:** Xprinta Pro Team
