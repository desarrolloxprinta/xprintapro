# Constitución de Desarrollo de Xprinta Pro

## Preámbulo
El propósito de esta constitución es establecer los principios inmutables y reglas de oro para el desarrollo del ecosistema web de Xprinta Pro. Se adopta la metodología **Specification-Driven Development (SDD)** para garantizar escalabilidad, trazabilidad y reducción sistemática de errores.

---

## Artículo I: El Principio de la Especificación Primero
**Ninguna línea de código de una nueva funcionalidad será escrita sin una especificación previa.**
- Todas las características deben documentarse primero en un archivo `spec.md`.
- El flujo obligatorio es: `spec.md` -> `plan.md` -> `tasks.md` -> Implementación.
- Cualquier bug debe ser tratado primero arreglando el `spec.md` y los tests/contratos correspondientes, y solo después implementando el arreglo en el código.

---

## Artículo II: Centralización y Prohibición de Estilos en Línea (Hardcoding)
**Todo estilo visual debe estar centralizado y derivar del Sistema de Diseño.**
- **Prohibición Total**: Queda estrictamente prohibido el uso de estilos CSS inline (ej. `style="color: red;"`) o la declaración de valores arbitrarios y directos en el código.
- Los estilos deben definirse en variables CSS (`:root` o tokens de diseño) centralizados en `style.css`.
- Las actualizaciones de diseño deben hacerse editando las variables o las clases globales, nunca inyectando CSS específico en la lógica de negocio o componentes (JavaScript).

---

## Artículo III: El Sistema de Diseño Corporativo
Todo desarrollo debe someterse a la siguiente paleta corporativa y sistema tipográfico base.

### Tipografía
- **Fuente Principal**: `Inter` (Google Fonts).
- **Pesos Permitidos**: Todos los pesos disponibles y necesarios (300, 400, 500, 600, 700, 800) para crear jerarquía visual clara sin mezclar familias tipográficas.

### Paleta de Colores
- **Color Principal**: `#023446` (Azul corporativo). Utilizado para fondos oscuros de header/footer, headings o botones primarios.
- **Color Secundario**: `#F4F4F4` (Gris claro). Utilizado para fondos alternativos o resaltes sutiles.
- **Color de Texto Base**: `#1D1D1D` (Casi negro). Utilizado para la legibilidad máxima del cuerpo de texto.
- **Color de Resalte (Highlight)**: `#FF7A00` (Naranja logo). Elemento vibrante utilizado con parsimonia para CTAs (Call to Action), links hover o acentos visuales.
- **Color de Bordes y Separadores**: `#9EABB2` (Gris azulado). Utilizado para delinear tarjetas, paneles o líneas de separación.

---

## Artículo IV: Calidad Premium y Glassmorphism
El aspecto general de las interfaces debe ser moderno y premium. 
- Deben aprovecharse utilidades como *Glassmorphism* (cristal translúcido) cuando sea adecuado (ej. paneles superiores de navegación), cuidando siempre el rendimiento y la accesibilidad.
- Las transiciones y micro-animaciones (hovers) deben ser fluidas y definidas globalmente (ej. `var(--transition-speed)`).

---

## Artículo V: Enmiendas a la Constitución
Esta constitución es un documento vivo. Las modificaciones a estas reglas (ej. adición de una nueva fuente secundaria) deben ser aprobadas explícitamente y documentadas, cambiando la versión del sistema de diseño.
