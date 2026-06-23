# Plan de Implementación: Diseño Editorial

## Arquitectura de Solución
Reescribir el archivo `style.css` completo para eliminar todas las propiedades de estilo SaaS (border-radius, box-shadow, backdrops) e implementar un sistema de cuadrícula (grid) y bordes de 1px (Swiss Grid Style).

### Modificaciones en CSS (`style.css`)
- Establecer `border-radius: 0` a nivel global.
- Crear clase `.editorial-border` para asignar bordes divisorios de 1px.
- Actualizar `.text-huge` para ser verdaderamente masiva (`clamp(4rem, 10vw, 8rem)`) con `letter-spacing: -0.04em`.
- Establecer estilos para tablas de servicios/grid donde las celdas compartan bordes.
- Añadir micro-animaciones (hovers) de alto contraste (inversión de colores) en lugar de traslaciones o escalados.

### Modificaciones en JS (`main.js`)
- Adaptar las clases del HTML a las nuevas utilidades editoriales.
- El Navbar será una barra limpia con un borde inferior de 1px.
- La sección de Servicios será una lista o cuadrícula con bordes compartidos.
- La galería de Proyectos mostrará imágenes a pantalla completa o en formato de recorte fotográfico limpio.
