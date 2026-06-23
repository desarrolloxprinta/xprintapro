# Integración de `DotsField` — partículas que forman una esfera (con viraje de color por scroll)

> Brief de integración para el agente de código. Es **autocontenido**: el código completo y actual del componente está en el **Apéndice A**.

---

## 1. Objetivo y comportamiento

`DotsField` es un componente React que renderiza un **campo de partículas** (puntos) sobre un `<canvas>`.

Contrato de comportamiento (importante: **no alterar esta intención**):

1. **Los puntos están vivos siempre.** Se mueven e interactúan entre ellos (deriva orgánica + repulsión de corto alcance) con un bucle propio `requestAnimationFrame`, **independientemente del scroll**. En reposo se mueven a **media velocidad** (`idleSpeed = 0.5`).
2. **El scroll gobierna solo "la formación".** Un valor `progress` (0 → 1) hace que las partículas converjan, de **centro hacia afuera**, hasta formar una **esfera de puntos**: un globo 3D (distribución Fibonacci) que **gira lentamente** y tiene **profundidad** (los puntos del frente se dibujan más grandes y opacos; los del fondo, más pequeños y tenues; se pintan de atrás hacia delante para dar volumen real).
3. **Viraje de color ligado a la formación.** En reposo hay una **mezcla** de dos colores: una fracción nace ya en el color de acento `#F18108` (`accentRatio`) y el resto en negro. Conforme cada partícula converge, **vira de negro a `#F18108`**. Al completarse la esfera (`progress = 1`) **todas son `#F18108`: no queda ninguna negra**.
4. Es **reversible**: si `progress` baja, la esfera se deshace de vuelta a nube y el color vuelve a la mezcla.

Dos modos de operación:

- **No controlado (por defecto):** el componente escucha el scroll de la ventana y calcula `progress` según la posición de la sección en el viewport. No requiere configuración.
- **Controlado:** si se pasa la prop `progress` (0..1), el componente la usa y **desactiva su scroll interno**. Sirve para fijar un rango exacto con GSAP ScrollTrigger, Framer Motion, etc.

> La esfera **sigue viva al final** gracias a su rotación, así que nunca queda un fotograma estático.

---

## 2. Archivo y requisitos

- **Archivo:** `DotsField.jsx` (código completo en el Apéndice A). Sugerencia de ubicación: `src/components/DotsField.jsx`.
- **Dependencias:** ninguna salvo **React ≥ 16.8** (usa hooks). No instala nada extra.
- **APIs de navegador usadas** (todas dentro de `useEffect`, es decir, solo en cliente): `canvas 2D`, `requestAnimationFrame`, `ResizeObserver`, `window.matchMedia`. Soportadas por todos los navegadores modernos.
- **TypeScript:** el archivo es `.jsx`. Si el proyecto es TS, se puede renombrar a `.tsx` y tipar las props (ver §7); funciona igual con `allowJs`.

### Next.js
El componente accede a `window`/`canvas` **solo dentro de efectos** (no en render), por lo que es seguro en SSR. Aun así:

- **App Router:** añade `"use client"` como primera línea del archivo (o del archivo que lo importa).
- **Pages Router:** funciona directamente. Si prefieres no renderizarlo en servidor, impórtalo dinámicamente:
  ```jsx
  import dynamic from "next/dynamic";
  const DotsField = dynamic(() => import("../components/DotsField"), { ssr: false });
  ```

---

## 3. API de props

Todas son opcionales.

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `height` | `number` | `460` | Alto del lienzo en px. **Debe superar el diámetro** de la esfera (≈ `2 × sphereRadius`) para que la nube tenga sitio. |
| `sphereRadius` | `number` | `130` | Radio de la esfera final (px). Se reduce solo si no cabe (tope ≈ `0.42 × min(ancho, alto)`). |
| `count` | `number` | `1700` | Nº de partículas = densidad del globo. |
| `dotColor` | `string` | `"#000000"` | Color base (puntos que **aún no han virado**). |
| `accentColor` | `string` | `"#F18108"` | Color de acento y color **final** de toda la esfera. |
| `accentRatio` | `number` | `0.4` | Proporción de puntos que **ya nacen** en el color de acento en reposo (0..1). |
| `dotRadius` | `number` | `3.66` | Radio base de cada punto (+20% respecto al valor anterior de 3.05). |
| `alpha` | `number` | `0.95` | Opacidad base de los puntos. |
| `idleSpeed` | `number` | `0.5` | Velocidad de interacción **en reposo**. `1` = original; `0.5` = mitad. |
| `rotationSpeed` | `number` | `0.25` | Velocidad de giro de la esfera (rad/s). |
| `endLife` | `number` | `0` | Micro-temblor extra al final. `0` = la esfera solo gira (limpia). |
| `progress` | `number \| undefined` | `undefined` | Si se pasa (0..1) controla la formación y **desactiva el scroll interno**. |
| `className` | `string` | — | Clase CSS del contenedor `<div>`. |
| `style` | `object` | — | Estilos inline extra del contenedor (se fusionan con los del componente). |

El nº de partículas no se calcula solo: es `count`. La transición de color de cada punto se reparte por una ventana interna (`fs`/`fe` en `buildParticles`) ligada a su convergencia; está construida para **completar el viraje en `progress = 1`** (la esfera acaba 100% en `accentColor`).

---

## 4. Integración paso a paso

1. **Copia** `DotsField.jsx` a `src/components/` (o donde vivan los componentes).
2. **Decide el modo:**
   - Si te vale que la formación avance mientras la sección cruza el viewport → usa el **modo por defecto** (sin props de scroll). Es el de mejor rendimiento (sin estado de React por frame).
   - Si necesitas un **rango de scroll específico** (sección fijada/pinned, scroll dentro de un contenedor propio, sincronía con otros elementos) → usa el **modo controlado** con la prop `progress`.
3. **Coloca el componente** en la sección destino (ejemplos en §5).
4. **Maqueta** el contenedor: dale a la sección alto suficiente para que haya recorrido de scroll, y asegúrate de que `height` supera el diámetro de la esfera (§6).
5. **Verifica** contra los criterios de aceptación (§8).

---

## 5. Ejemplos de uso

### 5.1 Básico — scroll de serie (recomendado por defecto)
```jsx
import DotsField from "./components/DotsField";

export default function Hero() {
  return (
    <section style={{ padding: "40vh 0" }}>
      <DotsField />
    </section>
  );
}
```
La formación (y el viraje a naranja) va de 0 (sección entrando por abajo) a 1 (sección saliendo por arriba). El bucle de los puntos corre siempre.

### 5.2 Controlado con Framer Motion
```jsx
"use client";
import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import DotsField from "./components/DotsField";

export default function Section() {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // 0 al entrar, 1 al salir
  });
  useMotionValueEvent(scrollYProgress, "change", setP);

  return (
    <section ref={ref} style={{ minHeight: "120vh" }}>
      <DotsField progress={p} />
    </section>
  );
}
```

### 5.3 Controlado con GSAP ScrollTrigger
```jsx
"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Section() {
  const ref = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      end: "bottom 30%",
      scrub: true,
      onUpdate: (self) => setP(self.progress),
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={ref}>
      <DotsField progress={p} />
    </section>
  );
}
```
Nota de rendimiento: en modo controlado, `setP` re-renderiza un componente pequeño en cada tick de scroll. El motor de `DotsField` **no se reconstruye** por eso (su trabajo pesado vive en refs/efectos cuyas dependencias no incluyen `progress`). Si no necesitas un rango propio, el **modo por defecto** evita todo estado por frame.

### 5.4 Personalización (ejemplo)
```jsx
<DotsField
  sphereRadius={150}     // esfera más grande
  count={2200}           // globo más denso
  accentColor="#F18108"  // color final
  accentRatio={0.35}     // cuántas nacen ya naranjas en reposo
  idleSpeed={0.5}        // velocidad en reposo (mitad)
  rotationSpeed={0.25}   // giro de la esfera
  height={520}           // > diámetro
/>
```

---

## 6. Estilo y maquetación

- El contenedor es `width: 100%`, `height = {height}` (460 px por defecto), `overflow: hidden`, **fondo transparente** (se superpone a lo que haya detrás). Cambia el fondo desde el padre o con `style`.
- La esfera queda **centrada** en el lienzo, con diámetro ≈ `2 × sphereRadius`. Mantén `height` por encima de ese diámetro; si necesitas más aire para la nube, súbelo.
- En pantallas estrechas, `sphereRadius` se reduce solo para caber (tope ≈ `0.42 × min(ancho, alto)`).
- Los colores se controlan con `dotColor` (base) y `accentColor` (final/acento), no por CSS del canvas.

---

## 7. Restricciones (no romper)

- **No detener el bucle de animación.** Los puntos deben seguir vivos aunque el scroll esté quieto. No envuelvas el componente en algo que pause su `requestAnimationFrame`.
- **No reescribir la lógica del motor** (deriva, repulsión, convergencia, proyección de la esfera, orden de dibujo por profundidad, viraje de color). Está validada. Ajusta solo vía props.
- **El viraje termina en `progress = 1`** por diseño (la ventana `fe` está acotada a ≤ 1). Si el requisito "esfera 100% naranja al final" debe mantenerse, no cambies esa cota.
- **Controlado vs no controlado:** usa el componente de forma consistente. Si pasas `progress`, pásalo siempre (no alternes entre `number` y `undefined` en caliente).
- **Sin `localStorage`/`sessionStorage`.**
- **Accesibilidad:** ya respeta `prefers-reduced-motion` (atenúa deriva y giro). No lo anules.
- **Limpieza:** ya cancela el `requestAnimationFrame` y desconecta listeners/`ResizeObserver` al desmontar. Mantenlo.
- **Scroll personalizado:** el modo por defecto escucha el **scroll de la ventana**. Si tu sección scrollea dentro de un contenedor propio (no la ventana), usa el **modo controlado** con la fuente de scroll adecuada.

### Tipos (si migras a `.tsx`)
```ts
type DotsFieldProps = {
  height?: number;
  sphereRadius?: number;
  count?: number;
  dotColor?: string;
  accentColor?: string;
  accentRatio?: number;
  dotRadius?: number;
  alpha?: number;
  idleSpeed?: number;
  rotationSpeed?: number;
  endLife?: number;
  progress?: number;
  className?: string;
  style?: React.CSSProperties;
};
```

---

## 8. Criterios de aceptación (QA)

- [ ] **En reposo (sin scroll), los puntos se mueven** (a media velocidad) y se ve una **mezcla** de negros y `#F18108`.
- [ ] Al **hacer scroll** por la sección, las partículas **convergen hacia una esfera**; al subir, **se deshace**.
- [ ] Conforme avanza la formación, **las negras viran a `#F18108`** (cada vez más naranjas).
- [ ] Al final del rango: **esfera 3D que gira**, con profundidad, y **100% `#F18108` (ninguna partícula negra)**.
- [ ] **Responsive:** al cambiar el tamaño de ventana/contenedor, se recalcula sin romperse.
- [ ] **Sin errores ni warnings** en consola (incluidos warnings de React).
- [ ] Al **desmontar** el componente (cambio de ruta), no quedan listeners ni rAF activos (sin fugas).
- [ ] Con `prefers-reduced-motion` activo, el movimiento y el giro se atenúan.

---

## 9. Solución de problemas

- **Se congela cuando dejo de scrollear.** Señal de que se está pasando un `progress` fijo o de que algo pausa el rAF. En modo por defecto no pases `progress`; en modo controlado actualízalo. El bucle nunca debe pararse (además, la esfera gira sola).
- **Al final no queda 100% naranja.** Asegúrate de que `progress` llega a `1` y de no haber tocado la cota `fe ≤ 1` en `buildParticles`.
- **Quiero que el viraje ocurra más al final.** En `buildParticles`, sube el rango de `fs` (p. ej. `rand(0.5, 0.9)`): la esfera se mantiene mezclada casi hasta el cierre y "se enciende" en naranja justo al completarse.
- **La esfera parece un disco plano.** El volumen lo dan la rotación + el sombreado por profundidad; si `prefers-reduced-motion` está activo, el giro baja. Sube `count` para más densidad si hace falta.
- **Tamaño / densidad.** Tamaño con `sphereRadius` (y `height` acorde); densidad con `count`; tamaño del punto con `dotRadius`.
- **No baila en cliente (Next.js).** Falta `"use client"` o un import dinámico con `ssr: false`.
- **Rendimiento en móviles antiguos.** Baja `count` o `dotRadius`. Es un único `<canvas>`, así que escala bien en general.

---

## Apéndice A — Código completo de `DotsField.jsx`

Crea el archivo `src/components/DotsField.jsx` con exactamente este contenido (si es Next.js App Router, añade `"use client";` como primera línea):

```jsx
import { useEffect, useRef } from "react";

/**
 * DotsField — campo de partículas vivas que se compactan en una ESFERA.
 *
 * - Los puntos se mueven e interactúan SIEMPRE (bucle propio requestAnimationFrame),
 *   independientemente del scroll.
 * - El SCROLL gobierna solo "la formación": a medida que `progress` va de 0 a 1,
 *   las partículas convergen (de centro hacia afuera) hasta formar una esfera de puntos
 *   (globo 3D que rota lentamente, con sombreado por profundidad).
 * - Los puntos son una mezcla de dos colores (negro + acento) repartidos al azar.
 *
 * Uso básico (scroll de serie):
 *   <section style={{ padding: "40vh 0" }}><DotsField /></section>
 *
 * Control externo (GSAP / Framer): <DotsField progress={miProgreso0a1} />
 */
export default function DotsField({
  height = 460,            // alto del lienzo (debe superar el diámetro de la esfera)
  sphereRadius = 130,      // radio de la esfera final (px); se reduce solo si no cabe
  count = 1700,            // nº de partículas (densidad del globo)
  dotColor = "#000000",    // color base de los puntos
  accentColor = "#F18108", // color de acento de los puntos
  accentRatio = 0.4,       // proporción de puntos de acento (0..1)
  dotRadius = 3.66,        // radio base del punto (+20% respecto a 3.05)
  alpha = 0.95,            // opacidad base
  idleSpeed = 0.5,         // velocidad de interacción en reposo (1 = original; 0.5 = mitad)
  rotationSpeed = 0.25,    // velocidad de giro de la esfera (rad/s)
  endLife = 0,             // micro-temblor extra al final (0 = solo gira, limpio)
  progress,                // opcional 0..1: si se pasa, controla la formación y desactiva el scroll
  className,
  style,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(0);

  // ---- fuente del progreso: scroll interno (por defecto) o prop `progress` (controlado) ----
  useEffect(() => {
    const clamp = (v) => Math.min(1, Math.max(0, v));
    if (typeof progress === "number") {
      progressRef.current = clamp(progress);
      return;
    }
    const root = wrapRef.current;
    if (!root) return;
    const compute = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      progressRef.current = clamp((vh - rect.top) / (vh + rect.height));
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [progress]);

  // ---- motor de partículas (canvas) ----
  useEffect(() => {
    const root = wrapRef.current;
    const cv = canvasRef.current;
    if (!root || !cv) return;
    const ctx = cv.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const TILT = 0.4; // inclinación fija de la esfera (vista 3/4)
    const PAL_STEPS = 24;
    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, particles = [], order = [], grid = null, cell = 14;
    let cx = 0, cy = 0, R = 130;
    let colBase = dotColor, colAccent = accentColor, palette = [];

    const smooth = (a, b, x) => { if (b <= a) return x < a ? 0 : 1; const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    const lerp = (a, b, t) => a + (b - a) * t;
    const rand = (a, b) => a + Math.random() * (b - a);
    const hexToRgb = (h) => { const s = ("" + h).replace("#", ""); const f = s.length === 3 ? s.split("").map((c) => c + c).join("") : s; const n = parseInt(f, 16) || 0; return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }; };

    function layout() {
      const r = root.getBoundingClientRect();
      W = r.width; H = r.height;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      colBase = dotColor; colAccent = accentColor;
      // paleta negro -> acento, para el viraje progresivo a #F18108 según la formación
      { const a = hexToRgb(colBase), b = hexToRgb(colAccent); palette = [];
        for (let k = 0; k < PAL_STEPS; k++) { const m = k / (PAL_STEPS - 1);
          palette.push("rgb(" + ((lerp(a.r, b.r, m)) | 0) + "," + ((lerp(a.g, b.g, m)) | 0) + "," + ((lerp(a.b, b.b, m)) | 0) + ")"); } }

      R = Math.min(sphereRadius, H * 0.42, W * 0.42);
      cx = W / 2; cy = H / 2;
      buildParticles();
    }

    function buildParticles() {
      const N = Math.max(50, count | 0);
      const GA = Math.PI * (3 - Math.sqrt(5)); // ángulo áureo
      const ct = Math.cos(TILT), st = Math.sin(TILT);
      const bandW = W * 0.92, bandH = Math.min(H * 0.82, 360);

      particles = new Array(N);
      for (let i = 0; i < N; i++) {
        // punto repartido uniformemente sobre la esfera unidad (Fibonacci)
        const uy = 1 - (i / (N - 1)) * 2;
        const rr = Math.sqrt(Math.max(0, 1 - uy * uy));
        const th = i * GA;
        const ux = Math.cos(th) * rr;
        const uz = Math.sin(th) * rr;
        // posición proyectada inicial (solo tilt) para el orden de ensamblaje centro->afuera
        const y1 = uy * ct - uz * st;
        const projR = Math.min(1, Math.sqrt(ux * ux + y1 * y1));

        const hx = cx + rand(-bandW / 2, bandW / 2);
        const hy = cy + rand(-bandH / 2, bandH / 2);
        const baseAccent = Math.random() < accentRatio;   // naranja desde el reposo
        const fs = rand(0.15, 0.8);                        // inicio del viraje a naranja (según conv)
        const fe = Math.min(1, fs + rand(0.15, 0.3));      // fin del viraje (<=1 => 100% naranja al formarse)
        particles[i] = {
          x: hx, y: hy, vx: 0, vy: 0, hx, hy,
          ux, uy, uz, order: projR, conv: 0, depth: 0,
          ax: rand(14, 26), ay: rand(12, 22),
          f1: rand(0.5, 0.9), f2: rand(1.4, 2.0), f3: rand(0.22, 0.38),
          p1: rand(0, 6.28), p2: rand(0, 6.28), p3: rand(0, 6.28),
          r: dotRadius * rand(0.9, 1.12),
          accent0: baseAccent, fs, fe,
        };
      }
      order = Array.from({ length: N }, (_, i) => i);
    }

    function buildGrid() {
      cell = 14;
      const cols = Math.max(1, Math.ceil(W / cell)), rows = Math.max(1, Math.ceil(H / cell));
      grid = { cols, rows, buckets: new Array(cols * rows) };
      for (let i = 0; i < grid.buckets.length; i++) grid.buckets[i] = [];
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const gx = Math.min(cols - 1, Math.max(0, (p.x / cell) | 0));
        const gy = Math.min(rows - 1, Math.max(0, (p.y / cell) | 0));
        grid.buckets[gy * cols + gx].push(i);
      }
    }

    let t0 = performance.now();
    let raf = 0;

    function step(now) {
      const t = (now - t0) / 1000;
      const prog = progressRef.current;
      const it = t * idleSpeed;                       // tiempo "en reposo" (más lento)
      const ay = t * rotationSpeed * (reduce ? 0.3 : 1);
      const ca = Math.cos(ay), sa = Math.sin(ay);
      const ct = Math.cos(TILT), st = Math.sin(TILT);

      buildGrid();
      const Rrep = 11, R2 = Rrep * Rrep;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const conv = smooth((1 - 0.55) * p.order, (1 - 0.55) * p.order + 0.55, prog);
        p.conv = conv;
        const wander = (1 - conv);
        const repel = (1 - conv) * idleSpeed;          // interacción más lenta en reposo

        // deriva orgánica (en reposo), a velocidad reducida
        const ox = p.ax * (Math.sin(it * p.f1 + p.p1) + 0.55 * Math.sin(it * p.f2 + p.p2) + 0.32 * Math.sin(it * p.f3 + p.p3));
        const oy = p.ay * (Math.sin(it * p.f1 * 0.9 + p.p2) + 0.55 * Math.sin(it * p.f2 * 1.05 + p.p3) + 0.32 * Math.sin(it * p.f3 * 1.1 + p.p1));

        // destino sobre la esfera (rotación en Y + tilt en X), proyectado a 2D
        const x1 = p.ux * ca + p.uz * sa;
        const z1 = -p.ux * sa + p.uz * ca;
        const y2 = p.uy * ct - z1 * st;
        const z2 = p.uy * st + z1 * ct;                // profundidad (-1..1)
        p.depth = z2;
        const sxp = cx + R * x1;
        const syp = cy + R * y2;

        let dx = (p.hx + ox * (reduce ? 0.25 : 1)) * wander + sxp * conv;
        let dy = (p.hy + oy * (reduce ? 0.25 : 1)) * wander + syp * conv;
        if (endLife > 0 && conv > 0.001) {
          dx += Math.sin(it * 1.7 + p.p1) * endLife * conv;
          dy += Math.cos(it * 1.9 + p.p2) * endLife * conv;
        }

        const k = lerp(0.045, 0.20, conv);
        p.vx += (dx - p.x) * k; p.vy += (dy - p.y) * k;

        if (repel > 0.02) {
          const gx = Math.min(grid.cols - 1, Math.max(0, (p.x / cell) | 0));
          const gy = Math.min(grid.rows - 1, Math.max(0, (p.y / cell) | 0));
          for (let ny = gy - 1; ny <= gy + 1; ny++) {
            if (ny < 0 || ny >= grid.rows) continue;
            for (let nx = gx - 1; nx <= gx + 1; nx++) {
              if (nx < 0 || nx >= grid.cols) continue;
              const b = grid.buckets[ny * grid.cols + nx];
              for (let k2 = 0; k2 < b.length; k2++) {
                const j = b[k2]; if (j === i) continue;
                const q = particles[j];
                const ex = p.x - q.x, ey = p.y - q.y, d2 = ex * ex + ey * ey;
                if (d2 > 0 && d2 < R2) {
                  const d = Math.sqrt(d2), force = (1 - d / Rrep) * 0.55 * repel;
                  p.vx += (ex / d) * force; p.vy += (ey / d) * force;
                }
              }
            }
          }
        }

        p.vx *= 0.86; p.vy *= 0.86;
        p.x += p.vx; p.y += p.vy;
      }

      // dibujar de atrás hacia delante (para que la esfera tenga volumen real)
      order.sort((a, b) => particles[a].depth - particles[b].depth);

      ctx.clearRect(0, 0, W, H);
      for (let o = 0; o < order.length; o++) {
        const p = particles[order[o]];
        const dn = (p.depth + 1) / 2;                  // 0 (fondo) .. 1 (frente)
        const sizeF = 0.55 + 0.65 * dn;                // frente más grande
        const alphaF = 0.40 + 0.60 * dn;               // frente más opaco
        const drawnR = p.r * (1 + (sizeF - 1) * p.conv);
        const drawnA = alpha * (1 + (alphaF - 1) * p.conv);
        // viraje a naranja: las negras pasan a #F18108 conforme convergen; al formarse, todas naranjas
        const m = p.accent0 ? 1 : smooth(p.fs, p.fe, p.conv);
        ctx.fillStyle = palette[(m * (PAL_STEPS - 1) + 0.5) | 0];
        ctx.globalAlpha = Math.max(0, Math.min(1, drawnA));
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.4, drawnR), 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(step);
    }

    layout();
    raf = requestAnimationFrame(step);

    let rt;
    const relayout = () => { clearTimeout(rt); rt = setTimeout(layout, 150); };
    const ro = new ResizeObserver(relayout);
    ro.observe(root);
    window.addEventListener("resize", relayout);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      ro.disconnect();
      window.removeEventListener("resize", relayout);
    };
  }, [height, sphereRadius, count, dotColor, accentColor, accentRatio, dotRadius, alpha, idleSpeed, rotationSpeed, endLife]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ position: "relative", width: "100%", height, overflow: "hidden", background: "transparent", ...style }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
```

---

*Fin del documento. Archivo del componente entregado aparte: `DotsField.jsx`.*
