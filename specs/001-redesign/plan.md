# Plan de Implementación: Rediseño de Página de Inicio

## Arquitectura de Solución
El proyecto utilizará Vite para el empaquetado de assets y recarga en caliente (HMR). El frontend usará HTML/JS semántico y CSS Vanilla, aplicando metodologías de utilidades/componentes limitados según la Constitución.

### Fase 1: Limpieza Estricta de Hardcoding
- **Objetivo**: Asegurar el cumplimiento del Artículo II de la Constitución.
- **Acción**: Examinar `src/main.js` y `index.html` para mover absolutamente todo el CSS hardcodeado (`style="..."`) hacia clases dentro de `src/style.css`.
- **Nuevas Clases**: Crear utilidades como `.text-center`, `.py-4`, `.mb-1`, `.flex`, `.gap-1`, `.max-w-1200` y `.mx-auto`.

### Fase 2: Hero Section y Componentes
- Convertir la Hero section actual en un componente semántico `<section class="hero-section">`.
- Incluir soporte para la cuadrícula de "Sectores" (ej. `.grid`, `.grid-cols-4`).

## Manejo de Riesgos
- **Riesgo**: Acumulación de clases CSS sin control.
- **Mitigación**: Agrupar estilos bajo el bloque de diseño correspondiente en `style.css` y documentar nuevas utilidades.
