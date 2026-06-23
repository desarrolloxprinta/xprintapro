# Spec 003: Diagramación Premium (Bento & Glassmorphism)

## Meta y Resumen
Elevar la calidad visual de la web al nivel de agencias de alto perfil y SaaS Premium (referencias: Spade, Halo-Lab, Regius Group). El layout será moderno, utilizando Bento Grids para agrupar servicios, tipografía inmensa y un diseño altamente inmersivo basado en alto contraste y Glassmorphism.

## Historias de Usuario
1. Como cliente potencial, quiero quedar inmediatamente impresionado por la elegancia de la web, que debe sentirse corporativa pero extremadamente moderna.
2. Como usuario, quiero navegar por los sectores y proyectos a través de tarjetas con esquinas muy redondeadas (Bento Grid) que ofrezcan información de un vistazo y transiciones suaves.

## Criterios de Aceptación
- La sección Hero cuenta con tipografía de escala superior (e.g. > 4.5rem) centrada en el impacto y una diagramación amplia.
- La sección de "Sectores" implementa una cuadrícula asimétrica moderna (Bento Grid) utilizando CSS Grid avanzado (ej. `grid-column: span 2`).
- Las tarjetas aplican un estilo Premium (espacios negativos grandes, bordes muy sutiles, fondo gris claro `#F4F4F4` sobre fondo blanco, o viceversa, dependiendo del contraste).
- Se incorpora la sección de Proyectos (galería de imágenes o casos de estudio) y un banner CTA al final.
