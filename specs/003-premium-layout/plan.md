# Plan de Implementación: Diagramación Premium

## Arquitectura de Solución
La estructura de `main.js` se enriquecerá con las nuevas secciones (Proyectos y CTA). El archivo `content.json` se actualizará para proporcionar la data mock necesaria.
Se aprovecharán variables CSS ya existentes y se crearán nuevas utilidades avanzadas de CSS Grid.

### Extensiones al Data Layer
Se deben agregar a `content.json`:
- `proyectos`: Array de objetos `{ name, category, image }`.
- `ctaFinal`: Objeto `{ title, buttonText }`.

### Modificaciones en CSS (`style.css`)
- **Bento Grid**: Crear `.bento-grid`, que utilizará `grid-template-columns` y `.bento-span-2` para crear asimetría visual.
- **Tipografía Gigante**: Clase `.text-huge` o actualización de `.hero-title` para lograr tamaños de fuente de 4rem a 5.5rem.
- **Layout de Sección Oscura**: Clase `.bg-primary` y `.text-inverse` para la banda de CTA inferior.

### Modificaciones en JS (`main.js`)
Refactorizar el template literal para inyectar el HTML de las nuevas secciones respetando el sistema de componentes.
