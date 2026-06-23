# Spec 005: Animaciones y Scroll Fluido

## Meta y Resumen
Dotar de vida al diseño Editorial Premium mediante animaciones de micro-interacción y un motor de scroll suavizado, llevando la web al nivel técnico de sitios premiados como Spade.com.

## Historias de Usuario
1. Como usuario, quiero que la navegación al hacer scroll sea inmensamente suave (sin tirones) para tener una experiencia inmersiva.
2. Como usuario, quiero ver elementos aparecer de forma coreografiada conforme desciendo por la página (fade-ups, revelaciones de texto).

## Criterios de Aceptación
- Lenis debe estar configurado para interceptar y suavizar el scroll del navegador.
- GSAP debe orquestar una animación de entrada (Hero Timeline) cuando la página carga.
- GSAP ScrollTrigger debe revelar las tarjetas de servicios de forma escalonada (stagger) al entrar en el viewport.
- Las imágenes de proyectos deben tener un leve efecto paralaje al hacer scroll.
