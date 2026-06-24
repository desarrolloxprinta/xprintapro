# Sistema Dinámico de Proyectos

✅ **Estado:** Implementado y funcionando

## 📊 Resumen de la Implementación

El sistema de proyectos ahora es completamente dinámico, cargando datos desde Supabase en lugar de archivos JSON hardcoded. Esto permite gestionar **docenas de proyectos** sin modificar código.

### Componentes Modificados

1. **Header (Mega-menu)** - Carga los 3 proyectos más recientes
2. **Home (Sección de proyectos)** - Carga los 6 proyectos más recientes
3. **Sistema async completo** - Toda la cadena de renderizado es asíncrona

## 🔧 Arquitectura de la Solución

### Cadena de Async/Await

```
main.js → loadPage() [async]
  ↓
  await getHomeHTML() [async]
    ↓
    await renderProyectos() [async] → loadHomeProjects(6)
    ↓
    await createLayout() [async]
      ↓
      await renderHeader() [async] → loadHeaderProjects(3)
```

### Sistema de Caché

Cada función de carga implementa un **caché en memoria** para evitar consultas repetidas a Supabase:

```javascript
// Cache de proyectos para el header
let headerProjectsCache = null;

// Cache de proyectos para el home
let homeProjectsCache = null;
```

El caché se mantiene durante toda la sesión de navegación. Si se necesita refrescar:
- Recargar la página (F5)
- El caché se limpia automáticamente

## 📋 Archivos Modificados

### 1. `/src/layout.js`

**Cambios principales:**
- ✅ Import de `getRecentProjects` desde Supabase
- ✅ Función `loadHeaderProjects()` con caché y fallback
- ✅ `renderHeader()` convertido a `async`
- ✅ `createLayout()` convertido a `async`

**Función de carga:**
```javascript
async function loadHeaderProjects() {
  if (headerProjectsCache) return headerProjectsCache;

  try {
    const projects = await getRecentProjects(3);
    headerProjectsCache = projects.map(p => ({
      title: p.title,
      description: p.short_description || p.client_description,
      image: p.hero_image || p.hero_video,
      url: `/proyecto.html?slug=${p.slug}`
    }));
    return headerProjectsCache;
  } catch (error) {
    console.error('Error cargando proyectos para header:', error);
    // Fallback a content.json si falla
    return content.proyectos.slice(0, 3);
  }
}
```

### 2. `/src/pages/home.js`

**Cambios principales:**
- ✅ Import de `getRecentProjects` desde Supabase
- ✅ Función `loadHomeProjects(limit)` con caché y fallback
- ✅ `renderProyectos()` convertido a `async`
- ✅ `getHomeHTML()` convertido a `async` y **aguarda** `createLayout()`

**Función de carga:**
```javascript
async function loadHomeProjects(limit = 6) {
  if (homeProjectsCache) return homeProjectsCache;

  try {
    const projects = await getRecentProjects(limit);
    homeProjectsCache = projects.map(p => ({
      title: p.client_name || p.title.split(' ').slice(0, 2).join(' '),
      category: p.category || p.sector,
      description: p.short_description || p.client_description,
      image: p.hero_image || p.hero_video,
      url: `/proyecto.html?slug=${p.slug}`
    }));
    return homeProjectsCache;
  } catch (error) {
    console.error('Error cargando proyectos para home:', error);
    // Fallback a content.json si falla
    return content.proyectos;
  }
}
```

### 3. `/src/main.js`

**Cambios principales:**
- ✅ Router envuelto en función `async loadPage()`
- ✅ Home page ahora **aguarda** `getHomeHTML()`
- ✅ `initAnimations()` movido dentro de `loadPage()` para ejecutar después de cargar contenido async

**Router async:**
```javascript
async function loadPage() {
  const app = document.querySelector('#app');

  if (pageType === 'proyecto-redeia') {
    app.innerHTML = getRedeiaHTML();
  } else if (pageType === 'proyecto-arval') {
    app.innerHTML = getArvalHTML();
  } else {
    // Home usando plantilla universal - CARGA DINÁMICA DESDE SUPABASE
    app.innerHTML = await getHomeHTML();
  }

  // Inicializar animaciones después de cargar el DOM
  initAnimations();
}

// Cargar la página
loadPage().catch(error => {
  console.error('Error cargando página:', error);
});
```

## 🚀 Cómo Funciona

### 1. Usuario accede a la página Home

1. `main.js` ejecuta `loadPage()`
2. `loadPage()` llama a `await getHomeHTML()`
3. `getHomeHTML()` llama a `await renderProyectos()`
4. `renderProyectos()` llama a `loadHomeProjects(6)` que consulta Supabase
5. `getHomeHTML()` llama a `await createLayout()`
6. `createLayout()` llama a `await renderHeader()`
7. `renderHeader()` llama a `loadHeaderProjects()` que consulta Supabase
8. Todo el HTML se renderiza con datos dinámicos de Supabase

### 2. Sistema de Fallback

Si Supabase no está disponible:
- ✅ Se captura el error en `try/catch`
- ✅ Se retornan datos de `content.json` (fallback)
- ✅ La página funciona sin interrupciones

### 3. Caché de Proyectos

Primera carga:
- Consulta Supabase
- Guarda en caché (`headerProjectsCache`, `homeProjectsCache`)
- Retorna datos

Cargas subsecuentes:
- Retorna datos del caché (sin consultar Supabase)
- Mucho más rápido

## 🔄 Agregar Nuevos Proyectos

### Opción 1: Usar el Script de Migración

```bash
# 1. Crear archivo JSON del proyecto en src/data/projects/
# Ej: src/data/projects/nuevo-proyecto.json

# 2. Ejecutar script de migración
node scripts/migrate-to-supabase.js

# 3. Verificar en Supabase Dashboard
# https://app.supabase.com/project/bdotuurxrdksolhywapd/editor
```

### Opción 2: Insertar Directamente en Supabase

```bash
# Usando Supabase CLI
supabase db query --linked "
  INSERT INTO projects (
    slug, title, short_description, category, sector,
    hero_image, client_name, published, featured
  ) VALUES (
    'nuevo-proyecto',
    'Proyecto Nuevo',
    'Descripción del proyecto',
    'Retail',
    'automocion',
    '/images/nuevo-proyecto.jpg',
    'Cliente S.A.',
    true,
    true
  );
"
```

### Opción 3: Desde la Interfaz de Supabase

1. Ir al [Table Editor](https://app.supabase.com/project/bdotuurxrdksolhywapd/editor)
2. Seleccionar tabla `projects`
3. Click en "Insert row"
4. Rellenar campos y guardar

**Importante:** Los proyectos se muestran ordenados por `created_at DESC` (más recientes primero).

## 📊 Mapeo de Datos

### JSON → Supabase

```javascript
{
  id: "arval",               → slug
  title: "Arval",            → title
  shortDescription: "...",   → short_description
  sector: "automocion",      → sector
  category: "Retail",        → category
  hero: {
    image: "/...",           → hero_image
    video: "/..."            → hero_video
  },
  client: {
    name: "Arval",           → client_name
    description: "..."       → client_description
  }
}
```

### Supabase → Frontend

```javascript
{
  title: p.title,            // "Arval"
  description: p.short_description || p.client_description,
  image: p.hero_image || p.hero_video,
  url: `/proyecto.html?slug=${p.slug}`
}
```

## 🎯 Ventajas del Sistema Dinámico

### Escalabilidad
- ✅ **Gestión de docenas de proyectos** sin modificar código
- ✅ No hay límite en el número de proyectos
- ✅ Fácil agregar/editar/eliminar proyectos

### Performance
- ✅ **Caché en memoria** evita consultas repetidas
- ✅ Carga solo los datos necesarios (3 para header, 6 para home)
- ✅ Fallback automático si Supabase no responde

### Mantenibilidad
- ✅ **Única fuente de verdad**: Supabase
- ✅ No hay datos duplicados en código
- ✅ Cambios en DB reflejan instantáneamente

### Flexibilidad
- ✅ Orden automático por fecha (más recientes primero)
- ✅ Filtros configurables (`published`, `featured`)
- ✅ Fácil agregar más campos al modelo

## 🔍 Testing y Verificación

### 1. Verificar datos en Supabase

```bash
# Listar proyectos publicados
supabase db query --linked "
  SELECT slug, title, created_at, published
  FROM projects
  ORDER BY created_at DESC;
"
```

### 2. Verificar caché en navegador

```javascript
// Abrir console del navegador (F12)

// Ver datos del header
console.log(await loadHeaderProjects());

// Ver datos del home
console.log(await loadHomeProjects());
```

### 3. Verificar fallback

```bash
# Detener Supabase (simulación)
# 1. Comentar VITE_SUPABASE_URL en .env.local
# 2. Recargar página
# 3. Debe mostrar datos de content.json (fallback)
```

### 4. Verificar orden de proyectos

Los proyectos se muestran por `created_at DESC`:
1. Proyecto más reciente primero
2. Segundo más reciente
3. Tercero más reciente (solo en home muestra hasta 6)

## 🛠️ Comandos Útiles

### Agregar proyecto de prueba

```bash
supabase db query --linked "
  INSERT INTO projects (
    slug, title, short_description, sector,
    hero_image, client_name, published, featured
  ) VALUES (
    'test-proyecto',
    'Proyecto de Prueba',
    'Este es un proyecto de testing',
    'varios',
    '/images/test.jpg',
    'Test Inc.',
    true,
    true
  );
"
```

### Listar proyectos del header (3 más recientes)

```bash
supabase db query --linked "
  SELECT slug, title, created_at
  FROM projects
  WHERE published = true
  ORDER BY created_at DESC
  LIMIT 3;
"
```

### Listar proyectos del home (6 más recientes)

```bash
supabase db query --linked "
  SELECT slug, title, created_at
  FROM projects
  WHERE published = true
  ORDER BY created_at DESC
  LIMIT 6;
"
```

## ⚠️ Consideraciones Importantes

### 1. Caché del Navegador

El caché de JavaScript se mantiene durante la sesión. Para ver cambios:
- **F5** - Recarga la página y limpia caché
- **Ctrl+Shift+R** - Recarga forzada (limpia caché del navegador)

### 2. Orden de Proyectos

El orden está determinado por `created_at DESC`. Para cambiar el orden:

```bash
# Actualizar fecha de creación de un proyecto
supabase db query --linked "
  UPDATE projects
  SET created_at = NOW()
  WHERE slug = 'arval';
"
```

### 3. Proyectos No Publicados

Solo se muestran proyectos con `published = true`:

```bash
# Publicar/despublicar proyecto
supabase db query --linked "
  UPDATE projects
  SET published = false
  WHERE slug = 'arval';
"
```

## 📚 Enlaces Útiles

- **Supabase Dashboard:** https://app.supabase.com/project/bdotuurxrdksolhywapd
- **Table Editor:** https://app.supabase.com/project/bdotuurxrdksolhywapd/editor
- **SQL Editor:** https://app.supabase.com/project/bdotuurxrdksolhywapd/sql/new
- **Documentación Supabase:** [/docs/SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

## ✅ Checklist de Verificación

- [x] Header mega-menu carga dinámicamente desde Supabase
- [x] Home sección proyectos carga dinámicamente desde Supabase
- [x] Sistema de caché implementado
- [x] Fallback a content.json funciona
- [x] Toda la cadena async/await correcta
- [x] Sin errores en consola del navegador
- [x] Proyectos se ordenan por fecha (más recientes primero)
- [x] Script de migración funciona correctamente

---

**Última actualización:** 2026-06-23
**Estado:** ✅ Completamente funcional

## 🎓 Próximos Pasos Recomendados

1. **Admin Panel** - Crear interfaz para agregar/editar proyectos sin tocar la base de datos
2. **Filtros** - Permitir filtrar proyectos por sector, categoría, etc.
3. **Paginación** - Implementar paginación para mostrar más de 6 proyectos
4. **Búsqueda** - Agregar búsqueda de proyectos por nombre/descripción
5. **Featured** - Usar el campo `featured` para destacar proyectos específicos
