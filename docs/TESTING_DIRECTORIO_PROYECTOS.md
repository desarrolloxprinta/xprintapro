# Testing Checklist - Directorio de Proyectos

**Fecha:** 2026-06-24
**URL Local:** http://localhost:5173/proyectos.html
**Referencia:** https://igniteagency.com/work

---

## ✅ Pre-Testing Verification

- [x] Servidor corriendo en `http://localhost:5173/`
- [x] Archivos actualizados:
  - [x] `src/pages/proyectos.js` - Estructura corregida
  - [x] `src/styles/proyectos.css` - Estilos flat design
  - [x] `src/main.js` - Animaciones actualizadas
  - [x] `proyectos.html` - Entry point creado
- [x] Sin errores en el servidor Vite
- [x] Hot-reload aplicado correctamente

---

## 🎯 Testing Funcional

### 1. Carga Inicial de Página

**URL:** http://localhost:5173/proyectos.html

- [ ] La página carga sin errores en consola
- [ ] Se muestra el header con título "Proyectos de Rotulación & Retail"
- [ ] Se muestra el subtítulo "proyectos"
- [ ] Se muestran los 4 filtros inline: Todos, Retail, Industrial, Logística
- [ ] El filtro "Todos" está activo por defecto (color naranja + subrayado)

### 2. Grid de Proyectos

- [ ] Se muestra el grid de proyectos (si hay datos en Supabase)
- [ ] Grid tiene 3 columnas en desktop
- [ ] Las cards alternan rotación -4deg (impares rotadas, pares rectas)
- [ ] Cada card muestra:
  - [ ] Imagen hero
  - [ ] Overlay con gradiente sobre la imagen
  - [ ] Categoría en naranja sobre la imagen
  - [ ] Título del proyecto en blanco sobre la imagen
  - [ ] Descripción debajo de la imagen
  - [ ] CTA "Ver Proyecto →" debajo de la imagen

### 3. Estilos Flat Design (Ignite Agency)

- [ ] Cards tienen esquinas CUADRADAS (sin border-radius)
- [ ] Cards NO tienen sombras (flat design)
- [ ] Overlay tiene gradiente de transparente a negro 60%
- [ ] Título del proyecto en blanco sobre la imagen
- [ ] Categoría en color naranja (var(--color-highlight))

### 4. Hover Effects

**Acción:** Pasar el mouse sobre una card

- [ ] Card completa hace escala 1.02
- [ ] Imagen interna hace escala 1.1 Y rotación -4deg
- [ ] CTA "Ver Proyecto →" cambia a color highlight (naranja claro)
- [ ] Transición suave (cubic-bezier)
- [ ] Cards rotadas mantienen su rotación base en hover

### 5. Sistema de Filtrado

**Test 1: Filtro "Retail"**
- [ ] Click en "Retail"
- [ ] Filtro "Retail" se pone naranja con subrayado
- [ ] Filtro "Todos" pierde el color activo
- [ ] Solo se muestran proyectos con `sector="retail"`
- [ ] Cards ocultas desaparecen con animación (fade out + scale 0.8)
- [ ] Cards visibles aparecen con animación (fade in + translateY desde 40px)
- [ ] Animación tiene stagger (aparecen una tras otra)

**Test 2: Filtro "Industrial"**
- [ ] Click en "Industrial"
- [ ] Solo se muestran proyectos con `sector="industrial"`
- [ ] Transición animada correcta

**Test 3: Filtro "Logística"**
- [ ] Click en "Logística"
- [ ] Solo se muestran proyectos con `sector="logistica"`
- [ ] Transición animada correcta

**Test 4: Volver a "Todos"**
- [ ] Click en "Todos"
- [ ] Todos los proyectos aparecen de nuevo
- [ ] Animación de entrada con stagger

### 6. Animaciones GSAP

**Test 1: Scroll Reveal**
- [ ] Recargar página
- [ ] Hacer scroll hacia abajo
- [ ] Cards aparecen con fade in + translateY cuando entran en viewport
- [ ] Animación tiene stagger (0.15s entre cada card)
- [ ] Animación se dispara al 80% del viewport

**Test 2: Header Reveal**
- [ ] Recargar página
- [ ] Header aparece con fade in + translateY
- [ ] Delay de 0.2s después de cargar

### 7. Links de Navegación

**Test:** Click en una card

- [ ] Redirige a `/proyecto/[slug]` (aunque la página individual no exista aún)
- [ ] Link funciona correctamente
- [ ] No hay errores de navegación

### 8. Cursor Personalizado

- [ ] Cursor personalizado aparece en la página
- [ ] Cursor tiene anillo exterior
- [ ] Cursor sigue el mouse correctamente

---

## 📱 Testing Responsive

### Desktop (>1024px)

- [ ] Grid: 3 columnas
- [ ] Padding: 5vw lateral
- [ ] Título: ~4.5rem (clamp funciona)
- [ ] Cards se ven correctamente
- [ ] Hover effects funcionan

### Tablet (768px - 1023px)

**Acción:** Resize ventana a 900px

- [ ] Grid: 2 columnas
- [ ] Gap entre cards se mantiene
- [ ] Cards mantienen proporción
- [ ] Título reduce tamaño (clamp)
- [ ] Filtros inline se mantienen en una línea o wrappean correctamente

### Mobile (<767px)

**Acción:** Resize ventana a 375px

- [ ] Grid: 1 columna
- [ ] Header padding reduce a 8rem top
- [ ] Título reduce a ~2.5rem
- [ ] Filtros inline wrappean correctamente
- [ ] Cards ocupan todo el ancho disponible
- [ ] Descripción se muestra con 3 líneas max (-webkit-line-clamp: 3)
- [ ] Overlay padding reduce a 1.5rem

---

## 🗄️ Testing Supabase

### Conexión a Base de Datos

- [ ] Abrir DevTools > Console
- [ ] No hay errores de conexión a Supabase
- [ ] Query ejecutado correctamente: `.from('projects').select(...)`

### Datos Renderizados

**Si hay proyectos en Supabase:**
- [ ] Cada card muestra datos reales:
  - [ ] `title` aparece en el título
  - [ ] `sector` o `category` aparece en la categoría
  - [ ] `short_description` o `client_description` aparece en descripción
  - [ ] `hero_image` carga correctamente
  - [ ] `slug` se usa en el link del card

**Si NO hay proyectos en Supabase:**
- [ ] Aparece mensaje: "No hay proyectos disponibles en este momento."
- [ ] No hay errores en consola

---

## 🎨 Testing de Sistema de Diseño

### Variables CSS Aplicadas Correctamente

- [ ] Color primario (naranja): `var(--color-primary)` #FA8029
- [ ] Color highlight: `var(--color-highlight)` #FA8029
- [ ] Color texto muted: `var(--color-text-muted)`
- [ ] Font heading: `var(--font-heading)` Inter
- [ ] Font body: `var(--font-body)` Manrope
- [ ] Spacing: `var(--spacing-md)` usado correctamente

### Tipografía

- [ ] Título principal: font-family correcto (serif/heading)
- [ ] Subtítulo: font-body
- [ ] Filtros: font-body, 1rem
- [ ] Título de card: font-serif, 1.8rem
- [ ] Categoría: font-body, 0.85rem, uppercase
- [ ] Descripción: font-body, 0.95rem

---

## 🔍 Testing de Performance

### Imágenes

- [ ] Imágenes cargan correctamente
- [ ] No hay layout shift al cargar
- [ ] Aspect ratio 16:9 se mantiene
- [ ] Object-fit: cover funciona

### Animaciones

- [ ] Animaciones son suaves (60fps)
- [ ] No hay lag en hover effects
- [ ] GSAP carga correctamente
- [ ] ScrollTrigger funciona sin errores

---

## 🐛 Testing de Casos Edge

### Sin Proyectos

**Acción:** Comentar temporalmente la query de Supabase para simular array vacío

- [ ] Aparece mensaje de "No hay proyectos disponibles"
- [ ] No hay errores en consola
- [ ] Página se ve correctamente

### Imagen Faltante

**Acción:** Proyecto sin `hero_image`

- [ ] Placeholder `/proyectos/placeholder.jpg` se usa como fallback
- [ ] Card se renderiza correctamente

### Descripción Muy Larga

**Acción:** Proyecto con descripción de >500 caracteres

- [ ] Descripción se trunca con ellipsis (...)
- [ ] `-webkit-line-clamp: 2` funciona (desktop/tablet)
- [ ] `-webkit-line-clamp: 3` funciona (mobile)

### Título Muy Largo

**Acción:** Proyecto con título de >100 caracteres

- [ ] Título se muestra completo (no se corta)
- [ ] Line-height mantiene legibilidad
- [ ] Overlay crece dinámicamente si es necesario

---

## ✅ Checklist de Comparación con Referencia

Comparar lado a lado con https://igniteagency.com/work:

- [ ] Header minimalista (NO hero grande) ✅
- [ ] Filtros inline de texto (NO pills) ✅
- [ ] Grid de 3 columnas ✅
- [ ] Cards con esquinas cuadradas ✅
- [ ] Sin sombras (flat design) ✅
- [ ] Texto sobre imagen (overlay) ✅
- [ ] Hover: escala + rotación -4deg ✅
- [ ] Alternancia de rotación en cards ✅
- [ ] Animaciones suaves con GSAP ✅

---

## 🚀 Pre-Deploy Checklist

Antes de hacer commit y deploy a producción:

- [ ] Todas las pruebas funcionales pasadas
- [ ] Todas las pruebas responsive pasadas
- [ ] No hay errores en consola
- [ ] No hay warnings críticos
- [ ] Comparación con Ignite Agency: 100% match
- [ ] Código limpio y comentado
- [ ] Variables CSS usadas (NO valores hardcoded)

---

## 📝 Resultados del Testing

**Fecha de testing:** _________
**Testeado por:** _________
**Navegadores probados:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

**Resultado general:**
- [ ] ✅ TODO PERFECTO - Listo para producción
- [ ] ⚠️ ISSUES MENORES - Corregir antes de deploy
- [ ] ❌ ISSUES CRÍTICOS - NO deployar

**Notas adicionales:**
```
(Escribir aquí cualquier bug encontrado o mejora sugerida)
```

---

## 🎯 Siguiente Paso

Una vez completado este testing y TODO esté ✅:

1. **Commit de cambios:**
   ```bash
   git add .
   git commit -m "feat: Directorio de proyectos - diseño Ignite Agency adaptado

   - Grid responsive 3/2/1 columnas
   - Cards con alternating rotation -4deg
   - Flat design (sin sombras ni borders)
   - Texto overlay sobre imágenes
   - Sistema de filtrado con animaciones GSAP
   - Integración con Supabase
   - 100% match con referencia Ignite Agency

   🤖 Generated with Claude Code"
   ```

2. **Push a repositorio:**
   ```bash
   git push origin main
   ```

3. **Deploy automático en Vercel** → Verificar en https://new.xprintapro.com/proyectos.html

---

**🎯 RECORDATORIO:** Seguir SIEMPRE el proceso: **Local → Testing → Production**
