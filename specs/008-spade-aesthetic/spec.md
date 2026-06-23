# Spec 008: Spade.com Aesthetic (Dark Tech SaaS)

## Meta y Resumen
Abandonar el concepto de "Editorial Blanco/Brutalismo" y abrazar una estética "Dark Tech SaaS" imitando a Spade.com. El objetivo es transmitir máxima tecnología, procesamiento de datos y un entorno premium agresivo usando fondos negros, glows de neón, y tarjetas superpuestas.

## Historias de Usuario
1. Como gerente B2B corporativo, al entrar en la web quiero sentir que estoy contratando una plataforma tecnológica de vanguardia, no una agencia tradicional.
2. Como usuario, quiero que la experiencia de scroll sea inmersiva, con paneles que se apilan unos encima de otros (`Sticky Stacking`).

## Criterios de Aceptación
- El color de fondo principal debe ser Negro Puro (`#000000`).
- Los acentos visuales deben tener un efecto de "Luz de Neón" (Glows radiales y sombras) utilizando el naranja corporativo y grises.
- Los iconos y lotties deben estar invertidos (`filter: invert(1)`) para que brillen sobre el fondo oscuro.
- Las secciones principales (Hero, Sectores, Mapa, Proceso, Contacto) deben usar `position: sticky` y `min-height: 100vh` para que al hacer scroll se deslicen unas sobre las otras, tapándose de forma elegante.
- Las celdas de cuadrícula deben evolucionar a "Glass Cards" (tarjetas translúcidas con bordes muy finos y efectos de luz al hacer hover).
