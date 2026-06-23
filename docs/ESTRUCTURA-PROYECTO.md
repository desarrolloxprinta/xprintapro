# Estructura de Datos de Proyecto - Plantilla Universal

## 📋 Descripción

Todos los proyectos en Xprinta Pro deben seguir esta estructura de datos para usar la plantilla universal de proyecto.

La plantilla renderiza automáticamente **8 secciones** en el siguiente orden:

1. **Hero** (obligatorio)
2. **Meta Bento** (obligatorio)
3. **Location** (opcional)
4. **Storytelling** (obligatorio)
5. **Blueprints** (opcional)
6. **3D Render** (opcional)
7. **Gallery** (opcional)
8. **Testimonial** (opcional)

## 🏗️ Estructura Completa del JSON

```json
{
  "slug": "nombre-proyecto",
  "title": "Título del Proyecto",

  "hero": {
    "video": "/videos/proyecto.mp4",
    "image": "/images/proyecto-hero.jpg"
  },

  "client": {
    "name": "Nombre del Cliente",
    "description": "Descripción del cliente y su industria"
  },

  "sector": "Sector Industrial",

  "service": {
    "title": "Servicio Prestado",
    "logo": "/logos/servicio.png"
  },

  "location": {
    "title": "Madrid, España",
    "description": "Descripción de la ubicación y su relevancia",
    "markers": [
      { "lat": 40.4168, "lng": -3.7038, "title": "Madrid" }
    ]
  },

  "story": {
    "challengeTitle": "El Desafío",
    "challenge": "Descripción del problema o desafío del proyecto",
    "challengeImage": "/images/challenge.jpg",

    "solutionTitle": "La Solución",
    "solution": "Descripción de cómo se resolvió el desafío",
    "solutionImage": "/images/solution.jpg"
  },

  "blueprints": [
    "/images/plano1.jpg",
    "/images/plano2.jpg",
    "/images/plano3.jpg"
  ],

  "blueprintSteps": [
    {
      "title": "Fase 1: Diseño",
      "description": "Descripción de la fase de diseño"
    },
    {
      "title": "Fase 2: Producción",
      "description": "Descripción de la fase de producción"
    }
  ],

  "render3d": {
    "title": "Previsualización 3D",
    "description": "Modelo interactivo del proyecto",
    "model": "/models/proyecto.glb"
  },

  "gallery": [
    {
      "image": "/images/foto1.jpg",
      "alt": "Descripción de la foto",
      "gridCols": 8,
      "height": "80vh"
    },
    {
      "image": "/images/foto2.jpg",
      "alt": "Otra foto",
      "gridCols": 4,
      "height": "60vh"
    }
  ],

  "testimonial": {
    "quote": "Cita del cliente sobre el proyecto",
    "author": "Nombre del Autor",
    "role": "Cargo en la Empresa"
  }
}
```

## 📝 Campos Obligatorios

### Mínimo requerido para que la plantilla funcione:

```json
{
  "slug": "proyecto-ejemplo",
  "title": "Proyecto Ejemplo",

  "hero": {
    "image": "/images/hero.jpg"
  },

  "client": {
    "name": "Cliente",
    "description": "Descripción"
  },

  "sector": "Sector",

  "service": {
    "title": "Servicio"
  },

  "story": {
    "challengeTitle": "Desafío",
    "challenge": "Texto del desafío",
    "challengeImage": "/images/challenge.jpg",
    "solutionTitle": "Solución",
    "solution": "Texto de la solución",
    "solutionImage": "/images/solution.jpg"
  }
}
```

## 🎯 Detalles por Sección

### 1. Hero

**Obligatorio:** Sí

```json
"hero": {
  "video": "/videos/proyecto.mp4",  // OPCIONAL: video en lugar de imagen
  "image": "/images/hero.jpg"        // OBLIGATORIO si no hay video
}
```

**Comportamiento:**
- Si existe `video`, se muestra el video en loop
- Si no hay `video`, se muestra la `image`
- El título del proyecto (`title`) se muestra sobre el media

---

### 2. Meta Bento

**Obligatorio:** Sí

```json
"client": {
  "name": "Redeia",                    // OBLIGATORIO
  "description": "Líder en energía"    // OBLIGATORIO
},

"sector": "Energía",                   // OBLIGATORIO

"service": {
  "title": "Señalización Industrial", // OBLIGATORIO
  "logo": "/logos/servicio.png"       // OPCIONAL
}
```

**Renderiza:** Grid de 3 columnas con:
- Cliente (nombre + descripción)
- Sector
- Servicio (+ logo si existe)

---

### 3. Location

**Obligatorio:** No

```json
"location": {
  "title": "Madrid, España",                     // OBLIGATORIO
  "description": "Ubicación estratégica...",     // OBLIGATORIO
  "markers": [                                    // OPCIONAL
    {
      "lat": 40.4168,
      "lng": -3.7038,
      "title": "Sede Central"
    }
  ]
}
```

**Comportamiento:**
- Si `location` existe, se renderiza el mapa de Google
- Si no existe, esta sección se omite completamente
- Los `markers` añaden pins al mapa

---

### 4. Storytelling

**Obligatorio:** Sí

```json
"story": {
  "challengeTitle": "El Reto",                  // OBLIGATORIO
  "challenge": "Texto largo del desafío...",    // OBLIGATORIO
  "challengeImage": "/images/challenge.jpg",    // OBLIGATORIO

  "solutionTitle": "Nuestra Solución",         // OBLIGATORIO
  "solution": "Texto largo de la solución...", // OBLIGATORIO
  "solutionImage": "/images/solution.jpg"      // OBLIGATORIO
}
```

**Renderiza:** 2 bloques:
1. **Desafío** - Texto izquierda, imagen derecha
2. **Solución** - Imagen izquierda, texto derecha

---

### 5. Blueprints (Planos Técnicos)

**Obligatorio:** No

```json
"blueprints": [
  "/images/plano1.jpg",
  "/images/plano2.jpg",
  "/images/plano3.jpg"
],

"blueprintSteps": [       // OPCIONAL: personaliza el texto de cada plano
  {
    "title": "Fase 1: Medición",
    "description": "Se tomaron medidas del sitio..."
  },
  {
    "title": "Fase 2: Diseño",
    "description": "Se crearon los planos técnicos..."
  }
]
```

**Comportamiento:**
- Si `blueprints` no existe o está vacío, se omite la sección
- Usa scroll-triggered pinning: imagen fija a la izquierda, texto scrollable a la derecha
- Si `blueprintSteps` existe, usa esos textos; si no, genera textos genéricos

---

### 6. 3D Render

**Obligatorio:** No

```json
"render3d": {
  "title": "Modelo 3D Interactivo",           // OBLIGATORIO
  "description": "Explora el diseño...",       // OBLIGATORIO
  "model": "/models/proyecto.glb"              // OBLIGATORIO (archivo .glb)
}
```

**Comportamiento:**
- Si `render3d` no existe, se omite la sección
- Usa `<model-viewer>` de Google para renderizar el modelo 3D
- El modelo es interactivo (drag, zoom, auto-rotate)

**Formatos soportados:** `.glb`, `.gltf`

---

### 7. Gallery

**Obligatorio:** No

```json
"gallery": [
  {
    "image": "/images/foto1.jpg",    // OBLIGATORIO
    "alt": "Instalación final",      // OPCIONAL
    "gridCols": 8,                   // OPCIONAL (default: 8 para primera, 4 para resto)
    "height": "80vh"                 // OPCIONAL (default: 80vh primeras 2, 60vh resto)
  },
  "/images/foto2.jpg",               // Formato simplificado
  "/images/foto3.jpg"
]
```

**Comportamiento:**
- Si `gallery` no existe o está vacío, se omite la sección
- Usa masonry grid de 12 columnas
- Acepta objetos completos o solo strings de imagen

**Grid Layout:**
- Primera imagen: 8 columnas (66%)
- Resto: 4 columnas (33%)

---

### 8. Testimonial

**Obligatorio:** No

```json
"testimonial": {
  "quote": "El equipo de Xprinta superó nuestras expectativas",  // OBLIGATORIO
  "author": "María García",                                       // OBLIGATORIO
  "role": "Directora de Marketing"                               // OBLIGATORIO
}
```

**Comportamiento:**
- Si `testimonial` no existe, se omite la sección
- Renderiza quote centrada con comillas decorativas
- Muestra autor y rol debajo

---

## 🚀 Crear un Proyecto Nuevo

### Paso 1: Crear JSON de datos

**Archivo:** `src/data/projects/mi-proyecto.json`

```json
{
  "slug": "mi-proyecto",
  "title": "Mi Proyecto Increíble",

  "hero": {
    "image": "/images/mi-proyecto-hero.jpg"
  },

  "client": {
    "name": "Cliente ABC",
    "description": "Líder en su sector"
  },

  "sector": "Retail",

  "service": {
    "title": "Rotulación Comercial"
  },

  "story": {
    "challengeTitle": "El Desafío",
    "challenge": "Necesitaban renovar su imagen...",
    "challengeImage": "/images/mi-proyecto-challenge.jpg",

    "solutionTitle": "La Solución",
    "solution": "Diseñamos una identidad corporativa...",
    "solutionImage": "/images/mi-proyecto-solution.jpg"
  }
}
```

### Paso 2: Crear página del proyecto

**Archivo:** `src/pages/proyectos/mi-proyecto.js`

```javascript
import { createProjectPage } from '../../templates/project-template.js'
import projectData from '../../data/projects/mi-proyecto.json'

/**
 * Página del proyecto Mi Proyecto
 */
export const getMiProyectoHTML = () => createProjectPage(projectData)
```

### Paso 3: Registrar en el router

**Archivo:** `src/main.js`

```javascript
import { getMiProyectoHTML } from './pages/proyectos/mi-proyecto.js'
import { initDynamicHeader } from './layout.js'

const pageType = document.body.dataset.page;

if (pageType === 'proyecto-mi-proyecto') {
  document.querySelector('#app').innerHTML = getMiProyectoHTML()
}

window.addEventListener('DOMContentLoaded', () => {
  initDynamicHeader();
  initProyectoAnimations(); // Animaciones GSAP
});
```

### Paso 4: Crear HTML

**Archivo:** `mi-proyecto.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Proyecto - Xprinta Pro</title>
  <link rel="stylesheet" href="/src/style.css">
</head>
<body data-page="proyecto-mi-proyecto">
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
  <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js"></script>
</body>
</html>
```

## ✅ Checklist de Proyecto

Antes de publicar un proyecto, verificar:

- [ ] JSON de datos creado en `src/data/projects/`
- [ ] Campos obligatorios completos (title, hero, client, sector, service, story)
- [ ] Imágenes optimizadas y subidas
- [ ] Videos comprimidos (si se usan)
- [ ] Modelos 3D en formato `.glb` (si se usan)
- [ ] Página creada en `src/pages/proyectos/`
- [ ] Ruta registrada en `main.js`
- [ ] HTML creado con `data-page` correcto
- [ ] Probado en navegador - todas las secciones visibles
- [ ] Header y footer funcionando
- [ ] Animaciones GSAP ejecutándose

## 📐 Dimensiones Recomendadas

### Imágenes

| Sección | Dimensión | Ratio | Peso |
|---------|-----------|-------|------|
| Hero | 2560 x 1440px | 16:9 | < 500KB |
| Challenge/Solution | 1920 x 1080px | 16:9 | < 300KB |
| Gallery principal | 2048 x 1536px | 4:3 | < 400KB |
| Gallery secundaria | 1024 x 768px | 4:3 | < 200KB |
| Blueprints | 2048 x 2048px | 1:1 | < 300KB |

### Videos

| Tipo | Resolución | FPS | Codec | Peso |
|------|------------|-----|-------|------|
| Hero | 1920 x 1080px | 30 | H.264 | < 5MB |

### Modelos 3D

| Formato | Polígonos | Texturas | Peso |
|---------|-----------|----------|------|
| .glb | < 100K | 2K max | < 10MB |

## 🔧 Personalización Avanzada

### Modificar orden de secciones

Si necesitas un orden diferente, importa las secciones individuales:

```javascript
import {
  renderHero,
  renderMetaBento,
  renderStorytelling,
  renderGallery
} from '../../templates/project-template.js'

const customOrder = (data) => `
  ${renderHero(data)}
  ${renderGallery(data)}      // Gallery antes de Storytelling
  ${renderStorytelling(data)}
  ${renderMetaBento(data)}    // Meta al final
`
```

### Agregar sección custom

```javascript
const renderCustomSection = (data) => `
  <section class="custom-section">
    <!-- Tu contenido custom -->
  </section>
`

const customProject = (data) => `
  ${renderHero(data)}
  ${renderCustomSection(data)}  // ← Custom
  ${renderMetaBento(data)}
  ${renderStorytelling(data)}
`
```

## 🚨 Errores Comunes

### Error: Sección no se muestra

**Causa:** Campo opcional no definido en JSON

**Solución:** Verificar que el campo existe:
```javascript
// ❌ MAL - gallery no existe
"testimonial": {...}

// ✅ BIEN - gallery vacía si no se usa
"gallery": [],
"testimonial": {...}
```

### Error: Imágenes rotas

**Causa:** Rutas incorrectas

**Solución:** Usar rutas absolutas desde `/public/`:
```json
// ❌ MAL
"image": "images/hero.jpg"

// ✅ BIEN
"image": "/images/hero.jpg"
```

### Error: Modelo 3D no carga

**Causa:** Falta importar `model-viewer`

**Solución:** Agregar script en HTML:
```html
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js"></script>
```

## 📚 Ejemplos de Referencia

- **Proyecto completo:** `src/data/projects/redeia.json`
- **Proyecto mínimo:** Ver sección "Campos Obligatorios"
- **Plantilla source:** `src/templates/project-template.js`

---

**Última actualización:** 2026-06-23
**Versión:** 1.0
**Autor:** Xprinta Pro Team + Claude Code
