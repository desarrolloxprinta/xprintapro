# Sistema de Header Dinámico - Documentación Técnica

## 📋 Descripción General

El header de Xprinta Pro utiliza un sistema dinámico de altura que se ajusta automáticamente según el contenido de cada mega menu. Esta solución evita:

- ❌ Alturas fijas que dejan espacios vacíos
- ❌ Contenido cortado en secciones grandes
- ❌ Hardcoding de valores por sección

## 🏗️ Arquitectura

### Estructura HTML

```html
<header class="site-header">
  <div class="navbar">...</div>

  <div class="nav-item-dropdown">
    <a class="nav-link">Proyectos</a>
    <div class="mega-menu">
      <!-- Contenido variable por sección -->
    </div>
  </div>
</header>
```

### CSS Crítico

**`/src/style.css`**

```css
.site-header {
  height: 80px; /* Base - JavaScript lo modifica dinámicamente */
  overflow: hidden; /* CRÍTICO: Mantiene mega menu dentro */
  transition: height 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.mega-menu {
  position: absolute;
  top: 70px; /* ⚠️ NO 80px - Debe ser < 80 para ser visible con overflow:hidden */
  padding: 10px 0 60px 0; /* Padding-top compensa el top: 70px */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.nav-item-dropdown:hover .mega-menu {
  opacity: 1;
  visibility: visible;
}
```

### JavaScript Dinámico

**`/src/main.js` - Función `initDynamicHeader()`**

```javascript
function initDynamicHeader() {
  const HEADER_BASE_HEIGHT = 80;
  const SAFETY_MARGIN = 10;

  navItems.forEach(navItem => {
    const megaMenu = navItem.querySelector('.mega-menu');

    navItem.addEventListener('mouseenter', () => {
      // Calcular altura real del contenido
      const megaMenuHeight = megaMenu.scrollHeight;
      const totalHeight = HEADER_BASE_HEIGHT + megaMenuHeight + SAFETY_MARGIN;

      // Aplicar altura calculada
      header.style.height = `${totalHeight}px`;
    });

    navItem.addEventListener('mouseleave', () => {
      header.style.height = `${HEADER_BASE_HEIGHT}px`;
    });
  });
}
```

## 🔍 Valores Clave

| Constante | Valor | Propósito |
|-----------|-------|-----------|
| `HEADER_BASE_HEIGHT` | 80px | Altura de la barra superior |
| `MEGA_MENU_TOP` | 70px | Posición del mega menu (< 80px) |
| `MEGA_MENU_PADDING_TOP` | 10px | Compensación por top: 70px |
| `MEGA_MENU_PADDING_BOTTOM` | 60px | Espacio para botones inferiores |
| `SAFETY_MARGIN` | 10px | Margen adicional anti-corte |
| `TRANSITION_DURATION` | 0.4s | Duración animación |
| `BG_OPACITY` | 0.85 | Opacidad del fondo (legibilidad) |

## 📐 Alturas por Sección (Aprox.)

Estas son alturas **calculadas dinámicamente**, no hardcoded:

| Sección | Contenido | Altura Aprox. |
|---------|-----------|---------------|
| **Proyectos** | 3 cards + botón "Ver todos" | ~600px |
| **Servicios** | 2 columnas + card derecho | ~460px |
| **Por Qué Xprinta** | 2 columnas + card derecho | ~460px |
| **Nosotros** | 1 columna + card derecho | ~420px |

## ⚠️ Reglas Críticas - NO MODIFICAR

### 1. Posición del Mega Menu

```css
/* ❌ MAL - Se corta con overflow:hidden */
.mega-menu {
  top: 80px;
}

/* ✅ BIEN - Visible dentro del header */
.mega-menu {
  top: 70px;
  padding-top: 10px; /* Compensación visual */
}
```

**Por qué:** Con `overflow: hidden` en el header, todo lo que empiece en `top: 80px` (exactamente donde termina el header) se corta. Usar `top: 70px` asegura que el mega menu esté visible.

### 2. Overflow del Header

```css
/* ✅ SIEMPRE overflow: hidden */
.site-header {
  overflow: hidden;
}
```

**Por qué:** El mega menu es parte del header (una sola pieza). `overflow: hidden` mantiene el mega menu dentro del glassmorphism y evita que se salga de los bordes redondeados.

### 3. Height vs Min-Height

```css
/* ✅ BIEN - JavaScript lo modifica */
.site-header {
  height: 80px;
}

/* ❌ MAL - No funciona con contenido absoluto */
.site-header {
  min-height: 80px;
  height: auto;
}
```

**Por qué:** CSS no puede calcular `height: auto` cuando el contenido está posicionado `absolute`. JavaScript debe establecer `height` explícitamente.

### 4. Fondo Compartido

```css
/* ✅ BIEN - Fondo en header */
.site-header {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px) saturate(180%);
}

/* ❌ MAL - Fondo separado en mega menu */
.mega-menu {
  background: rgba(255, 255, 255, 0.85);
}
```

**Por qué:** El header y mega menu son una sola pieza visual. El fondo debe estar solo en `.site-header`.

## 🐛 Debugging

### Ver altura calculada en consola

```javascript
navItem.addEventListener('mouseenter', () => {
  const megaMenuHeight = megaMenu.scrollHeight;
  console.log('Mega menu height:', megaMenuHeight);
  console.log('Total header height:', 80 + megaMenuHeight + 10);
});
```

### Verificar overflow visual

Agregar temporalmente:

```css
.site-header {
  outline: 2px solid red !important;
}

.mega-menu {
  outline: 2px solid blue !important;
}
```

### Comprobar transiciones

```css
.site-header {
  /* Añadir transición lenta para debugging */
  transition: height 2s ease !important;
}
```

## 🔧 Mantenimiento

### Agregar nueva sección con mega menu

1. **HTML** - Crear estructura:
   ```html
   <div class="nav-item-dropdown">
     <a href="#nueva-seccion" class="nav-link">
       Nueva Sección
       <svg class="dropdown-icon">...</svg>
     </a>
     <div class="mega-menu">
       <!-- Contenido aquí -->
     </div>
   </div>
   ```

2. **No se requiere CSS** - El sistema dinámico lo maneja automáticamente

3. **No se requiere JS** - `initDynamicHeader()` detecta todos los `.nav-item-dropdown`

### Modificar contenido del mega menu

1. Editar HTML en `/src/main.js` dentro de `renderNavbar()`
2. El sistema recalculará la altura automáticamente
3. No tocar constantes `HEADER_BASE_HEIGHT` o `SAFETY_MARGIN`

### Cambiar timing de animación

Editar en `/src/style.css`:

```css
.site-header {
  transition: height 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  /*               ^^^^ duración       ^^^^^^^^^^^^^^^^ easing */
}
```

## 📊 Validaciones Automáticas

El código JavaScript incluye:

- ✅ Verificación de existencia de header
- ✅ Verificación de nav items
- ✅ Advertencia si mega menu no existe
- ✅ Validación de alturas anómalas (< 100px o > 2000px)
- ✅ Prevención de múltiples expansiones simultáneas
- ✅ Logs de inicialización

## 🎯 Checklist de Pruebas

Antes de hacer push, verificar:

- [ ] Hover sobre "Proyectos" - Altura ~600px, botón visible
- [ ] Hover sobre "Servicios" - Altura ~460px, card derecho visible
- [ ] Hover sobre "Por Qué Xprinta" - Altura ~460px, sin espacios extra
- [ ] Hover sobre "Nosotros" - Altura ~420px, compacto
- [ ] Transición suave (0.4s)
- [ ] Fondo glassmorphism uniforme
- [ ] No hay espacios en blanco excesivos
- [ ] Console sin errores
- [ ] Mobile responsive (si aplica)

## 🚨 Errores Comunes

### Error: Mega menu no se muestra

**Causa:** `top: 80px` con `overflow: hidden`

**Solución:**
```css
.mega-menu {
  top: 70px; /* ← Cambiar de 80px */
  padding-top: 10px;
}
```

### Error: Espacios blancos enormes

**Causa:** `height` fijo en CSS en lugar de dinámico

**Solución:**
```css
/* Remover esto */
.site-header:has(.nav-item-dropdown:hover) {
  height: 600px; /* ← NO */
}

/* JavaScript lo maneja */
```

### Error: Contenido cortado

**Causa:** `SAFETY_MARGIN` insuficiente

**Solución:**
```javascript
const SAFETY_MARGIN = 20; // Aumentar de 10 a 20
```

## 📚 Referencias

- **Implementación:** `/src/main.js` líneas ~1122-1170
- **Estilos:** `/src/style.css` líneas ~584-700
- **Commit:** `cab8f08` - feat: Header dinámico con mega menu ajustable
- **Referencia visual:** https://www.regiusgroup.com/en/associates/economic-engagement

---

**Última actualización:** 2026-06-23
**Versión:** 1.0
**Autor:** Xprinta Pro Team + Claude Code
