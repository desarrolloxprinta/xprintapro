# Spec 007: Densidad Comercial y Arquitectura de Confianza (Home)

## Meta y Resumen
Transformar el minimalismo extremo del Home inicial en un entorno denso, corporativo y comercial, llenándolo de "pruebas sociales" (Trust Logos), mapas de alcance y un cronograma detallado que eduque al usuario sobre la metodología de trabajo.

## Historias de Usuario
1. Como prospecto (Lead), quiero ver inmediatamente qué empresas confían en Xprinta para sentir seguridad en mi decisión.
2. Como cliente corporativo, necesito entender visualmente la red logística ("220 Puntos") y la ventaja en ahorro de costes.
3. Como usuario técnico, quiero saber el proceso lineal (desde Brandcenter hasta Fabricación y RRSS) para comprender cómo estructuran los proyectos grandes.

## Criterios de Aceptación
- La Marquesina (Marquee) debe ser una franja continua animada por CSS y usar los logos de `/public/logo empresas`.
- Los logos deben tener un filtro `grayscale` para no romper la paleta de color corporativa.
- El Proceso (Timeline) debe tener 14 pasos listados en vertical.
- Al hacer scroll sobre el Timeline, una línea debe "llenarse" y los pasos deben iluminarse usando GSAP ScrollTrigger (`.active`).
- El final de la página debe incluir un Formulario oscuro corporativo con inputs estéticos B2B.
