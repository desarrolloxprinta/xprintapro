# Spec 009: Premium Studio Layout

## Meta y Resumen
El objetivo de este spec es deshacerse por completo de la herencia estructural clásica y del experimento Dark Mode, pivotando hacia un **Layout Asimétrico Premium Studio** caracterizado por una estética muy luminosa (Off-White), cajas Bento, tipografía masiva y Scroll de tipo Sticky Sidebar, emulando referentes como `noteworthy.studio` y `handhold.io`.

## Historias de Usuario
1. Como usuario visitante, quiero una experiencia de lujo asimétrica que evite las cuadrículas aburridas de siempre, dándome la sensación de estar ante un estudio creativo y tecnológico.
2. Como cliente potencial, quiero que el proceso (los 14 pasos) sea fácil de leer y se mantenga estático mientras leo, evitando el scroll monótono.

## Criterios de Aceptación
- La paleta debe volver a tonos Off-White (`#F4F4F5`) con texto muy oscuro y contrastado.
- El módulo de sectores usará una clase `.bento-grid` donde las tarjetas tienen grosores y tamaños distintos (`.bento-wide`, `.bento-tall`), pareciendo un puzzle orgánico.
- La sección de Proceso de Trabajo usará una estructura `.sticky-layout`. A la izquierda el título se quedará fijo al hacer scroll (`position: sticky`), y a la derecha la lista irá fluyendo suavemente.
- Las animaciones GSAP deben ser delicadas ("buttery smooth"), enfocadas en revelar elementos desde abajo sin tirones agresivos.
