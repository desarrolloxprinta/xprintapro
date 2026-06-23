# Spec 006: Integración Lottie y Copywriting B2B

## Meta y Resumen
Elevar el nivel del diseño web hacia un target B2B de grandes corporaciones (Nestlé, Carglass, Petronas) mediante la sustitución de iconos estáticos por animaciones Lottie y la integración del contenido real (copywriting) de la marca.

## Historias de Usuario
1. Como gerente de marketing de una multinacional, quiero ver información precisa sobre servicios corporativos (Brandcommerce, Brandcheck, Trazabilidad) en un lenguaje profesional.
2. Como usuario, quiero ver animaciones vectoriales sutiles y modernas (Lottie) en lugar de iconos de stock para percibir la marca como tecnológica y vanguardista.

## Criterios de Aceptación
- La librería `@lottiefiles/lottie-player` debe estar instalada y renderizar las etiquetas `<lottie-player>`.
- El archivo `content.json` no debe contener textos "Lorem Ipsum", sino el "copy" extraído de la web original enfocado a Trade-Marketing.
- Las animaciones Lottie de la sección "Por Qué Xprinta" deben mantener el contraste adecuado (ej. invertir colores usando filtros CSS `invert(1)`) para que resalten sobre el fondo oscuro.
