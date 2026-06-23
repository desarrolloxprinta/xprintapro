# Spec 001: Rediseño de Página de Inicio Xprinta Pro

## Meta y Resumen
Establecer la estructura base y la arquitectura del nuevo rediseño para la web principal de Xprinta Pro. Se deben reemplazar los constructores visuales pesados por una estructura modular en Vanilla JS/CSS servida a través de Vite, siguiendo rigurosamente el Sistema de Diseño.

## Historias de Usuario
1. Como cliente que entra a la web, quiero ver un diseño moderno, profesional y limpio (tipografía Inter y diseño Glassmorphism) que transmita la autoridad de Xprinta Pro en rotulación.
2. Como usuario, quiero que la página cargue extremadamente rápido sin importar el dispositivo.
3. Como desarrollador, necesito un sistema de clases CSS predefinidas para no tener que inyectar CSS en el HTML directamente, minimizando el riesgo de bugs visuales.

## Criterios de Aceptación
- La navegación superior (Navbar) implementa el efecto Glassmorphism y contiene el logo corporativo.
- La página de inicio (Hero) incluye un titular impactante y botones primarios con el color de acento `#FF7A00`.
- El CSS centralizado contiene todas las variables de color corporativas (Artículo III de la Constitución).
- No existe ninguna declaración de estilos `style="..."` en los archivos JavaScript o HTML generados, garantizando la centralización de estilos.
- El repositorio está estructurado bajo las directrices de SDD.
