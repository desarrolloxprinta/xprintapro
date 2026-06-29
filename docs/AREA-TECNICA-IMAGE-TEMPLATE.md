# Plantilla de Imágenes para Área Técnica

## Patrón Establecido

Todos los artículos del Área Técnica deben seguir este patrón de imágenes para mantener consistencia visual.

## Estructura de Secciones con Imágenes

### 1. Sección Principal de Contexto (3-4 párrafos)
**Ubicación:** Después del segundo párrafo, antes del párrafo final
**Tipo:** Imagen contextual del tema principal

```html
<p>Primer párrafo introductorio...</p>
<p>Segundo párrafo explicativo...</p>
<img src="URL_IMAGEN" alt="Descripción relevante" class="blog-content-image" />
<p>Párrafo final o conclusión de la sección...</p>
```

**Ejemplo real (Facility Management):**
```html
<p>El facility management integra personas, espacios...</p>
<p>Una buena señalética permite que una persona sepa...</p>
<img src="https://pikaso.cdnpk.net/..." alt="Entrada corporativa con señalética profesional" class="blog-content-image" />
<p>Para un facility manager, esto tiene una lectura práctica...</p>
```

### 2. Secciones de Desarrollo Técnico (2-3 párrafos)
**Ubicación:** Entre párrafos, después de explicar un concepto, antes de detalles técnicos
**Tipo:** Imagen técnica o de detalle

```html
<p>Explicación del concepto...</p>
<img src="URL_IMAGEN" alt="Detalle técnico específico" class="blog-content-image" />
<p>Aplicación práctica o detalles...</p>
```

**Ejemplo real (Orientación y Wayfinding):**
```html
<p>El wayfinding no consiste solo en colocar flechas...</p>
<img src="https://pikaso.cdnpk.net/..." alt="Pasillo corporativo con señalética direccional" class="blog-content-image" />
<p>Una señalética interior bien planteada...</p>
```

### 3. Secciones de Seguridad/Normativa (2 párrafos)
**Ubicación:** Entre párrafos, después de describir el problema, antes de la solución
**Tipo:** Imagen de sistemas de seguridad o normativa

```html
<p>Descripción del aspecto normativo...</p>
<img src="URL_IMAGEN" alt="Sistema de seguridad o normativa" class="blog-content-image" />
<p>Aplicación práctica de la normativa...</p>
```

### 4. Secciones de Aplicación Exterior (2-3 párrafos largos)
**Ubicación:** Después del segundo párrafo, intercalando con listados si los hay
**Tipo:** Imagen de aplicación externa o visible

```html
<p>Primer párrafo sobre aplicación...</p>
<p>Segundo párrafo descriptivo...</p>
<img src="URL_IMAGEN" alt="Aplicación exterior visible" class="blog-content-image" />
<p>Listado de elementos o detalles adicionales...</p>
```

## Reglas de Oro

### ✅ HACER:

1. **Posicionamiento estratégico:**
   - Colocar imágenes ENTRE párrafos, nunca al inicio o final de sección
   - Usar como separador visual entre concepto teórico y aplicación práctica
   - Intercalar entre 2-3 párrafos de texto

2. **Cantidad por artículo:**
   - Mínimo: 3 imágenes
   - Óptimo: 4-5 imágenes
   - Máximo: 6 imágenes
   - Distribuidas uniformemente a lo largo del artículo

3. **Tipos de contenido visual:**
   - Imágenes estáticas (`.jpg`, `.png`) para conceptos y ejemplos
   - Videos (`.mp4`) para demostraciones dinámicas o procesos
   - Ambos usan la clase `blog-content-image`

4. **Atributos obligatorios:**
   ```html
   <img
     src="URL_COMPLETA"
     alt="Descripción clara y específica"
     class="blog-content-image"
   />
   ```

5. **Texto alternativo (alt):**
   - Descripción concisa (5-10 palabras)
   - Relacionada directamente con el contenido visual
   - Sin palabras genéricas como "imagen de"
   - Ejemplos:
     - ✅ "Entrada corporativa con señalética profesional"
     - ✅ "Pasillo corporativo con señalética direccional"
     - ❌ "Imagen de un edificio"
     - ❌ "Foto de señales"

### ❌ NO HACER:

1. **Evitar:**
   - Imágenes al inicio inmediato de sección (usar texto primero)
   - Imágenes al final de sección (cerrar con texto)
   - Dos imágenes seguidas sin párrafo intermedio
   - Imágenes en secciones de menos de 2 párrafos
   - Imágenes genéricas sin relación directa con el contenido

2. **No usar:**
   - Estilos inline (width, height, margin)
   - Clases CSS personalizadas diferentes a `blog-content-image`
   - Enlaces envolventes `<a>` alrededor de imágenes
   - Imágenes sin atributo `alt`

## Ejemplos Completos

### Artículo: Señalización de Parkings

**Sección "Por qué es un reto":**
```html
<p>Un parking suele ser un entorno repetitivo...</p>
<p>Además, el usuario cambia de rol...</p>
<h3>Doble usuario: conductor y peatón</h3>
<p>El conductor necesita mensajes rápidos...</p>
<h3>Decisiones rápidas en puntos críticos</h3>
<p>Entradas, rampas, cruces...</p>
<video
  src="https://pikaso.cdnpk.net/.../video.mp4"
  class="blog-content-image"
  autoplay loop muted playsinline>
</video>
```

**Sección "Qué debe incluir":**
```html
<h3>Señalización por colores, plantas y sectores</h3>
<p>La identificación cromática por planta...</p>
<img
  src="https://pikaso.cdnpk.net/.../render.jpg"
  alt="Señalización por columnas"
  class="blog-content-image"
/>
<h3>Señalización de seguridad y emergencia</h3>
<p>Debe contemplar salidas de emergencia...</p>
```

### Artículo: Facility Management

**Patrón aplicado (4 imágenes distribuidas):**

1. **Sección "Por qué es importante"** → Imagen de entrada corporativa
2. **Sección "Orientación y wayfinding"** → Imagen de pasillo interior
3. **Sección "Seguridad y evacuación"** → Imagen de señales de emergencia
4. **Sección "Señalética exterior"** → Imagen de rótulo exterior

## Checklist de Validación

Antes de publicar un artículo, verificar:

- [ ] ¿Tiene entre 3-5 imágenes distribuidas uniformemente?
- [ ] ¿Cada imagen está ENTRE párrafos (no al inicio/fin)?
- [ ] ¿Todas las imágenes tienen atributo `alt` descriptivo?
- [ ] ¿Todas las imágenes usan clase `blog-content-image`?
- [ ] ¿Los videos tienen `autoplay loop muted playsinline`?
- [ ] ¿Las imágenes están en secciones con al menos 2 párrafos?
- [ ] ¿No hay dos imágenes consecutivas sin texto intermedio?
- [ ] ¿Las URLs de imágenes son completas y válidas?

## Actualización en Base de Datos

Cuando se agregan imágenes a un artículo:

1. **JSON (`src/data/area-tecnica.json`):**
   - Actualizar el campo `content` de cada sección
   - Mantener estructura HTML válida
   - Escapar comillas dobles correctamente

2. **SQL (`supabase/seed_area_tecnica.sql`):**
   - Actualizar el array JSONB `sections`
   - Mantener consistencia exacta con el JSON
   - Ejecutar script en Supabase después de cambios

3. **Verificación:**
   ```bash
   # Desarrollo (usa JSON fallback)
   http://localhost:5173/area-tecnica-post.html?slug=SLUG

   # Producción (debe usar Supabase)
   # Ejecutar seed_area_tecnica.sql en Supabase Dashboard
   ```

## Generación de Imágenes con MCP

Para crear imágenes consistentes usar Magnific MCP:

```javascript
// Ejemplo de prompts efectivos
mcp__magnific__images_generate({
  prompt: "Modern corporate office building entrance with professional wayfinding signage system, glass facade with branded corporate letters, clean directional signs, people walking through entrance, professional lighting, corporate architecture, high-quality architectural photography",
  aspectRatio: "16:9",
  count: 1,
  mode: "auto"
})
```

**Características de buenos prompts:**
- Contexto específico (corporate, industrial, retail, etc.)
- Elementos técnicos visibles (signage, wayfinding, directional signs)
- Calidad profesional (high-quality, professional lighting)
- Personas en escena para escala y contexto
- Estilo fotográfico realista

---

**Última actualización:** 2026-06-29
**Artículos que siguen este patrón:**
- ✅ Señalización de parkings
- ✅ Facility management y señalética
