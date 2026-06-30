# Estructura de Metadatos SEO - Área Técnica

## 📋 Índice

1. [Introducción](#introducción)
2. [Estructura de Datos del Post](#estructura-de-datos-del-post)
3. [Campos de Metadatos SEO](#campos-de-metadatos-seo)
4. [Schema.org JSON-LD](#schemaorg-json-ld)
5. [Validación de Metadatos](#validación-de-metadatos)
6. [Ejemplos Completos](#ejemplos-completos)

---

## Introducción

Este documento define la estructura completa de metadatos SEO para los artículos del Área Técnica de Xprinta Pro. Todos los artículos futuros deben seguir esta estructura para garantizar:

- ✅ **SEO optimizado**: Meta tags completos para buscadores
- ✅ **Rich snippets**: Schema.org JSON-LD para resultados enriquecidos
- ✅ **Social sharing**: Open Graph y Twitter Cards para compartir en redes
- ✅ **Accesibilidad**: Metadata semántica correcta
- ✅ **Consistencia**: Estructura uniforme en todos los artículos

---

## Estructura de Datos del Post

### Campos Públicos (Visibles en el artículo)

```json
{
  "slug": "facility-management-y-senaletica",
  "title": "Facility management y señalética: cómo mejorar la gestión visual de edificios",
  "category": "Facility Management",
  "date": "2024-03-20",
  "author": "Equipo Xprinta",
  "thumbnail": "/area tecnica/facility-management-y-senaletica.jpg",
  "heroVideo": "",
  "audioUrl": "/area tecnica/audio-resumen.m4a",
  "pdfUrl": "/area tecnica/informe-tecnico.pdf",
  "paperformEmbedCode": "<div data-paperform-id=\"xprinta-pro\"></div>...",
  "intro": "Un buen proyecto de señalización combina diferentes capas...",
  "sections": [...]
}
```

### Campos Internos (Metadatos SEO - NO visibles públicamente)

Los metadatos SEO se almacenan en una sección especial con ID `bloque-t-cnico-seo` o `bloque-tecnico-seo`:

```json
{
  "id": "bloque-t-cnico-seo",
  "title": "Metadatos SEO",
  "content": "
    Keyword principal: señalética facility management

    Keywords secundarias: señalética interior, señalética exterior, señalética para edificios, rótulos exteriores para empresas

    Keywords long tail: señalética interior y exterior para facility management, cómo mejorar la señalética de un edificio corporativo

    Meta title: Señalética y facility management para edificios | Xprinta Pro

    Meta description: Descubre cómo la señalética interior y exterior mejora la gestión, seguridad, orientación e imagen de edificios corporativos.

    Slug recomendado: facility-management-y-senaletica
  "
}
```

---

## Campos de Metadatos SEO

### 1. Meta Title

**Campo**: `Meta title:`
**Formato**: Título optimizado para SEO (50-60 caracteres)
**Ejemplo**: `Señalética y facility management para edificios | Xprinta Pro`

**Buenas prácticas**:
- ✅ Incluir keyword principal
- ✅ Agregar " | Xprinta Pro" al final
- ✅ Máximo 60 caracteres (Google trunca más allá)
- ✅ Que sea descriptivo y atractivo para clics

### 2. Meta Description

**Campo**: `Meta description:`
**Formato**: Descripción concisa (150-160 caracteres)
**Ejemplo**: `Descubre cómo la señalética interior y exterior mejora la gestión, seguridad, orientación e imagen de edificios corporativos.`

**Buenas prácticas**:
- ✅ Incluir keyword principal
- ✅ Call-to-action implícito (Descubre, Aprende, Conoce)
- ✅ Entre 150-160 caracteres
- ✅ Responder "¿Por qué debería leer esto?"

### 3. Keywords

#### Keyword Principal
**Campo**: `Keyword principal:`
**Formato**: 1-3 palabras clave
**Ejemplo**: `señalética facility management`

#### Keywords Secundarias
**Campo**: `Keywords secundarias:`
**Formato**: Lista separada por comas (4-6 keywords)
**Ejemplo**: `señalética interior, señalética exterior, señalética para edificios, rótulos exteriores para empresas`

#### Keywords Long Tail
**Campo**: `Keywords long tail:`
**Formato**: Frases más largas (3-7 palabras) con intención de búsqueda específica
**Ejemplo**: `señalética interior y exterior para facility management, cómo mejorar la señalética de un edificio corporativo`

**Buenas prácticas**:
- ✅ Keywords relacionadas con el tema del artículo
- ✅ Mix de volumen alto (competitivas) y long tail (específicas)
- ✅ Incluir sinónimos y variaciones
- ✅ Pensar en la intención de búsqueda del usuario

---

## Schema.org JSON-LD

### 1. Article Schema

El sistema genera automáticamente este schema usando los campos del post:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Señalética y facility management para edificios",
  "description": "Descubre cómo la señalética mejora la gestión...",
  "image": "/area tecnica/facility-management-y-senaletica.jpg",
  "datePublished": "2024-03-20T00:00:00Z",
  "dateModified": "2024-03-20T00:00:00Z",
  "author": {
    "@type": "Organization",
    "name": "Xprinta Pro",
    "url": "https://xprintapro.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://xprintapro.com/images/logo-xprinta.png"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "Xprinta Pro",
    "url": "https://xprintapro.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://xprintapro.com/images/logo-xprinta.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://xprintapro.com/area-tecnica?slug=facility-management-y-senaletica"
  }
}
```

### 2. BreadcrumbList Schema

El sistema genera automáticamente la navegación breadcrumb:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://xprintapro.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Área Técnica",
      "item": "https://xprintapro.com/area-tecnica"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Facility management y señalética",
      "item": "https://xprintapro.com/area-tecnica?slug=facility-management-y-senaletica"
    }
  ]
}
```

---

## Validación de Metadatos

### Checklist Pre-Publicación

Antes de publicar un artículo, verificar:

#### ✅ Campos Obligatorios
- [ ] `slug` (único, formato kebab-case)
- [ ] `title` (clara y descriptiva)
- [ ] `thumbnail` (imagen destacada de alta calidad)
- [ ] `date` (formato ISO: YYYY-MM-DD)
- [ ] `intro` (resumen del artículo, 2-3 líneas)
- [ ] `sections` (al menos 3 secciones con contenido)

#### ✅ Metadatos SEO (sección `bloque-t-cnico-seo`)
- [ ] `Meta title` (50-60 caracteres)
- [ ] `Meta description` (150-160 caracteres)
- [ ] `Keyword principal` (1-3 palabras)
- [ ] `Keywords secundarias` (4-6 keywords)
- [ ] `Keywords long tail` (2-4 frases)

#### ✅ Calidad de Contenido
- [ ] Hero image o video presente
- [ ] Secciones con IDs únicos
- [ ] Contenido HTML válido (sin tags mal cerrados)
- [ ] Imágenes optimizadas (formato WebP preferible)
- [ ] URLs de assets válidas

#### ✅ SEO Técnico
- [ ] Slug sin espacios ni caracteres especiales
- [ ] Keywords en el título
- [ ] Keywords en el intro
- [ ] Meta description atractiva
- [ ] Thumbnail en formato optimizado

### Herramientas de Validación

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Pegar URL del artículo
   - Verificar que Article y BreadcrumbList aparezcan sin errores

2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
   - Pegar URL del artículo
   - Verificar que og:image, og:title, og:description aparezcan correctamente

3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
   - Pegar URL del artículo
   - Verificar que la tarjeta se muestre correctamente

---

## Ejemplos Completos

### Ejemplo 1: Artículo Completo con Metadatos

```json
{
  "slug": "senalizacion-de-parkings",
  "title": "Señalización de parkings: cómo diseñar un sistema efectivo",
  "category": "Señalética Interior",
  "date": "2024-01-15",
  "author": "Equipo Xprinta",
  "thumbnail": "/area tecnica/senalizacion-parkings.jpg",
  "heroVideo": "",
  "audioUrl": "/area tecnica/audio-parking.m4a",
  "pdfUrl": "/area tecnica/guia-senalizacion-parkings.pdf",
  "paperformEmbedCode": "",
  "intro": "La señalización de parkings debe combinar funcionalidad, seguridad y orientación. Descubre cómo diseñar un sistema efectivo.",
  "sections": [
    {
      "id": "introduccion",
      "title": "Introducción a la señalización de parkings",
      "content": "<p>Un parking bien señalizado...</p>"
    },
    {
      "id": "tipos-senales",
      "title": "Tipos de señales para parkings",
      "content": "<p>Existen varios tipos...</p>"
    },
    {
      "id": "bloque-t-cnico-seo",
      "title": "Metadatos SEO",
      "content": "Keyword principal: señalización de parkings\n\nKeywords secundarias: señales para parkings, señalización interior parkings, rótulos parkings, diseño señalización garajes\n\nKeywords long tail: cómo señalizar un parking correctamente, señalización de parkings subterráneos, diseño de señalética para garajes corporativos\n\nMeta title: Señalización de parkings: guía completa de diseño | Xprinta Pro\n\nMeta description: Aprende a diseñar un sistema de señalización efectivo para parkings que mejore la orientación, seguridad y experiencia de usuario.\n\nSlug recomendado: senalizacion-de-parkings"
    }
  ]
}
```

### Ejemplo 2: Sección de Metadatos SEO (Template)

Para crear un nuevo artículo, copiar esta plantilla en la última sección:

```json
{
  "id": "bloque-t-cnico-seo",
  "title": "Metadatos SEO",
  "content": "Keyword principal: [KEYWORD 1-3 PALABRAS]\n\nKeywords secundarias: [keyword 1, keyword 2, keyword 3, keyword 4]\n\nKeywords long tail: [frase larga 1, frase larga 2, frase larga 3]\n\nMeta title: [Título optimizado 50-60 chars] | Xprinta Pro\n\nMeta description: [Descripción atractiva 150-160 caracteres que incluya keyword principal y call-to-action]\n\nSlug recomendado: [slug-en-formato-kebab-case]"
}
```

---

## Flujo de Trabajo para Nuevos Artículos

### 1. Investigación de Keywords

Antes de escribir, investigar:
1. Keyword principal (herramientas: Ahrefs, SEMrush, Google Keyword Planner)
2. Keywords secundarias relacionadas
3. Keywords long tail con intención de búsqueda específica
4. Competencia (analizar qué posiciona en Google)

### 2. Estructura del Artículo

Crear esquema con:
1. Título principal (H1) con keyword
2. Intro (2-3 líneas con keyword principal)
3. Secciones principales (H2) con keywords secundarias
4. Subsecciones (H3) si es necesario
5. Conclusión con call-to-action

### 3. Redacción

Escribir artículo siguiendo:
- ✅ Usar keywords de forma natural (densidad 1-2%)
- ✅ Párrafos cortos (3-4 líneas)
- ✅ Listas y bullet points
- ✅ Imágenes descriptivas cada 300-400 palabras
- ✅ Enlaces internos a otros artículos/servicios

### 4. Metadatos

Completar sección `bloque-t-cnico-seo`:
1. Meta title (incluir keyword, max 60 chars)
2. Meta description (atractiva, 150-160 chars)
3. Keywords (principal + secundarias + long tail)
4. Slug (formato kebab-case)

### 5. Medios

Preparar:
1. **Thumbnail** (1200x630px, formato WebP preferible)
2. **Hero image/video** (opcional, pero recomendado)
3. **Audio resumen** (opcional, generado con TTS)
4. **PDF descargable** (opcional, lead magnet)

### 6. Publicación

1. Subir todos los assets a `/area tecnica/`
2. Agregar artículo a `area-tecnica.json`
3. Subir a Supabase con SQL:
   ```sql
   INSERT INTO area_tecnica_posts (slug, title, category, date, thumbnail, ...)
   VALUES ('slug-del-articulo', 'Título del Artículo', ...);
   ```
4. Validar con Google Rich Results Test
5. Validar compartir en redes sociales
6. Publicar y monitorear en Search Console

---

## Mantenimiento y Actualización

### Actualización de Artículos

Cuando se actualice un artículo existente:
1. Actualizar campo `modifiedTime` o `updatedAt`
2. Revisar keywords (pueden cambiar tendencias)
3. Actualizar contenido obsoleto
4. Re-validar metadatos SEO

### Monitoreo SEO

Cada 3 meses, revisar:
- **Search Console**: Impresiones, CTR, posición promedio
- **Keywords**: Posicionamiento en Google
- **Competencia**: Nuevos artículos que compiten
- **User behavior**: Tiempo en página, bounce rate

---

## Recursos Adicionales

### Documentación Externa

- [Schema.org Article](https://schema.org/Article)
- [Google Search Central - Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

### Herramientas Recomendadas

- **SEO**: Ahrefs, SEMrush, Google Keyword Planner
- **Validación**: Google Rich Results Test, Facebook Debugger
- **Auditoría**: Lighthouse, PageSpeed Insights
- **Schema**: Schema Markup Validator

---

## Contacto y Soporte

Para dudas sobre la estructura de metadatos SEO:

- **Equipo Técnico**: dev@xprinta.com
- **Documentación**: `/docs/AREA_TECNICA_SCHEMA.md`
- **Ejemplos**: Ver artículos existentes en `src/data/area-tecnica.json`

---

**Última actualización**: 2026-06-30
**Versión**: 1.0.0
