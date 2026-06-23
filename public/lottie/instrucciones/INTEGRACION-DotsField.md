# Integración de `DotsField` — campo de partículas con formación por scroll

> Brief de integración para el agente de código. Es **autocontenido**: el código completo del componente está en el **Apéndice A**.

---

## 1. Objetivo y comportamiento

`DotsField` es un componente React que renderiza un **campo de partículas** (puntos negros) sobre un `<canvas>`.

Contrato de comportamiento (importante: **no alterar esta intención**):

1. **Los puntos están vivos siempre.** Se mueven e interactúan entre ellos (deriva orgánica + repulsión de corto alcance) mediante un bucle propio `requestAnimationFrame`, **independientemente del scroll**. Si el usuario no hace scroll, los puntos siguen bailando.
2. **El scroll gobierna solo "la formación".** Un valor `progress` (0 → 1) hace que las partículas converjan, de **centro hacia afuera**, hasta empaquetarse en un **rectángulo negro sólido** (~440 × 126 px por defecto). `progress = 0` ⇒ nube viva; `progress = 1` ⇒ rectángulo sólido.
3. Es reversible: si `progress` baja, el rectángulo se "deshace" de vuelta a nube.

Dos modos de operación:

- **No controlado (por defecto):** el componente escucha el scroll de la ventana y calcula `progress` según la posición de la sección en el viewport. No requiere configuración.
- **Controlado:** si se pasa la prop `progress` (0..1), el componente la usa y **desactiva su scroll interno**. Sirve para fijar un rango exacto con GSAP ScrollTrigger, Framer Motion, etc.

---

## 2. Archivo y requisitos

- **Archivo:** `DotsField.jsx` (código completo en el Apéndice A). Sugerencia de ubicación: `src/components/DotsField.jsx`.
- **Dependencias:** ninguna salvo **React ≥ 16.8** (usa hooks). No instala nada extra.
- **APIs de navegador usadas** (todas dentro de `useEffect`, es decir, solo en cliente): `canvas 2D`, `requestAnimationFrame`, `ResizeObserver`, `window.matchMedia`. Soportadas por todos los navegadores modernos.
- **TypeScript:** el archivo es `.jsx`. Si el proyecto es TS, se puede renombrar a `.tsx` y tipar las props (ver nota en §7); funciona igual con `allowJs`.

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
| `height` | `number` | `400` | Alto del lienzo en px. Mantenlo por encima del alto del rectángulo para que la nube tenga sitio. |
| `barWidth` | `number` | `440` | Ancho objetivo del rectángulo final (px). |
| `barHeight` | `number` | `126` | Alto objetivo del rectángulo final (px). |
| `dotColor` | `string` | `"#000000"` | Color de los puntos. |
| `dotRadius` | `number` | `3.05` | Radio base de cada punto (varía ±10% por punto). |
| `alpha` | `number` | `0.95` | Opacidad de los puntos; los solapes generan el negro sólido. |
| `endLife` | `number` | `0.45` | Micro-temblor que mantiene el rectángulo "vivo" al final. `0` = totalmente quieto. |
| `progress` | `number \| undefined` | `undefined` | Si se pasa (0..1) controla la formación y **desactiva el scroll interno**. |
| `className` | `string` | — | Clase CSS del contenedor `<div>`. |
| `style` | `object` | — | Estilos inline extra del contenedor (se fusionan con los del componente). |

El número de partículas se **deriva solo** del tamaño del rectángulo para rellenarlo por completo (~2.900 con los valores por defecto). No es una prop.

---

## 4. Integración paso a paso

1. **Copia** `DotsField.jsx` a `src/components/` (o donde vivan los componentes).
2. **Decide el modo:**
   - Si te vale que la formación avance mientras la sección cruza el viewport → usa el **modo por defecto** (sin props de scroll). Es el de mejor rendimiento (sin estado de React por frame).
   - Si necesitas un **rango de scroll específico** (sección fijada/pinned, scroll dentro de un contenedor propio, sincronía con otros elementos) → usa el **modo controlado** con la prop `progress`.
3. **Coloca el componente** en la sección destino (ejemplos en §5).
4. **Maqueta** el contenedor: dale a la sección alto suficiente para que haya recorrido de scroll, y sitúa el texto/encabezado donde corresponda (§6).
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
      <p style={{ maxWidth: 400, margin: "24px auto", textAlign: "center" }}>
        Tu texto bajo el rectángulo…
      </p>
    </section>
  );
}
```
La formación va de 0 (sección entrando por abajo) a 1 (sección saliendo por arriba). El bucle de los puntos corre siempre.

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
Nota de rendimiento: en modo controlado, `setP` re-renderiza un componente pequeño en cada tick de scroll. El motor de `DotsField` **no se reconstruye** por eso (su trabajo pesado vive en refs/efectos cuyas dependencias no incluyen `progress`), así que el coste es bajo. Si no necesitas un rango propio, el **modo por defecto** evita todo estado por frame.

---

## 6. Estilo y maquetación

- El contenedor es `width: 100%`, `height = {height}` (400 px por defecto), `overflow: hidden`, **fondo transparente** (se superpone a lo que haya detrás). Cambia el fondo desde el padre o con `style`.
- El rectángulo final queda **centrado** en el lienzo (horizontal y vertical), ~`barWidth` × `barHeight`. Si necesitas que la nube tenga más aire, sube `height`.
- En pantallas estrechas, `barWidth` se reduce solo para caber (mínimo 240 px); `barHeight` se respeta.
- Para el caso "rectángulo bajo un párrafo", coloca el `<p>` (ancho ~400 px) justo debajo del componente, como en §5.1.
- El color de los puntos se controla con `dotColor` (no por CSS del canvas).

---

## 7. Restricciones (no romper)

- **No detener el bucle de animación.** Los puntos deben seguir vivos aunque el scroll esté quieto. No envuelvas el componente en algo que pause su `requestAnimationFrame`.
- **No reescribir la lógica del motor** (deriva, repulsión, convergencia, empaquetado). Está validada. Ajusta solo vía props.
- **Controlado vs no controlado:** usa el componente de forma consistente. Si pasas `progress`, pásalo siempre (no alternes entre `number` y `undefined` en caliente).
- **Sin `localStorage`/`sessionStorage`.**
- **Accesibilidad:** ya respeta `prefers-reduced-motion` (atenúa el movimiento). No lo anules.
- **Limpieza:** ya cancela el `requestAnimationFrame` y desconecta listeners/`ResizeObserver` al desmontar. Mantenlo.
- **Scroll personalizado:** el modo por defecto escucha el **scroll de la ventana**. Si tu sección scrollea dentro de un contenedor propio (no la ventana), usa el **modo controlado** con la fuente de scroll adecuada.

### Tipos (si migras a `.tsx`)
```ts
type DotsFieldProps = {
  height?: number;
  barWidth?: number;
  barHeight?: number;
  dotColor?: string;
  dotRadius?: number;
  alpha?: number;
  endLife?: number;
  progress?: number;
  className?: string;
  style?: React.CSSProperties;
};
```

---

## 8. Criterios de aceptación (QA)

- [ ] **En reposo (sin hacer scroll), los puntos se mueven** continuamente y se "empujan" entre ellos.
- [ ] Al **hacer scroll** por la sección, la formación **avanza**; al subir, **retrocede**.
- [ ] Al final del rango, queda un **rectángulo negro sólido** (~440 × 126 px) centrado.
- [ ] **Responsive:** al cambiar el tamaño de ventana/contenedor, se recalcula sin romperse.
- [ ] **Sin errores ni warnings** en consola (incluidos warnings de React).
- [ ] Al **desmontar** el componente (cambio de ruta), no quedan listeners ni rAF activos (sin fugas).
- [ ] Con `prefers-reduced-motion` activo, el movimiento se atenúa.

---

## 9. Solución de problemas

- **Se congela cuando dejo de scrollear.** Señal de que se está pasando un `progress` fijo o de que algo pausa el rAF. En modo por defecto no pases `progress`; en modo controlado asegúrate de actualizarlo. El bucle de animación nunca debe pararse.
- **El rectángulo no se ve totalmente sólido.** Sube `alpha` (p. ej. 1.0), reduce un poco el espaciado bajando `barHeight`/`barWidth` de forma proporcional, o sube `dotRadius`.
- **La formación termina demasiado pronto/tarde.** Usa el modo controlado y define tu rango: en Framer con `offset`, en GSAP con `start`/`end`.
- **No baila en cliente (Next.js).** Falta `"use client"` o un import dinámico con `ssr: false`.
- **Rendimiento en móviles antiguos.** Baja el tamaño del rectángulo (menos partículas) o `dotRadius`. Es un único `<canvas>`, así que escala bien en general.

---

## Apéndice A — Código completo de `DotsField.jsx`

Crea el archivo `src/components/DotsField.jsx` con exactamente este contenido (si es Next.js App Router, añade `"use client";` como primera línea):

```jsx
import { useEffect, useRef } from "react";

/**
 * DotsField — campo de partículas vivas que se compactan en un rectángulo.
 *
 * - Los puntos se mueven e interactúan SIEMPRE (bucle propio con requestAnimationFrame),
 *   independientemente del scroll.
 * - El SCROLL gobierna solo "la formación": a medida que la sección cruza el viewport,
 *   las partículas convergen hacia un rectángulo sólido (de centro hacia afuera).
 *
 * Uso básico (scroll de serie, sin configurar nada):
 *   <section style={{ padding: "40vh 0" }}>
 *     <DotsField />
 *     <p style={{ maxWidth: 400, margin: "24px auto" }}>Tu texto…</p>
 *   </section>
 *
 * Control externo (p. ej. GSAP ScrollTrigger / Framer useScroll):
 *   <DotsField progress={miProgreso0a1} />   // si pasas `progress`, ignora el scroll interno
 */
export default function DotsField({
  height = 400,          // alto del lienzo (mantener por encima del alto del rectángulo)
  barWidth = 440,        // ancho objetivo del rectángulo final (px)
  barHeight = 126,       // alto objetivo del rectángulo final (px)
  dotColor = "#000000",  // color de los puntos
  dotRadius = 3.05,      // radio base del punto
  alpha = 0.95,          // opacidad (los solapes crean el negro sólido)
  endLife = 0.45,        // micro-temblor que mantiene el rectángulo "vivo" (0 = quieto)
  progress,              // opcional 0..1: si se pasa, controla la formación y desactiva el scroll
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
      return; // controlado: sin listener de scroll
    }
    const root = wrapRef.current;
    if (!root) return;
    const compute = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // 0 cuando la sección entra por abajo -> 1 cuando sale por arriba
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

    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, particles = [], grid = null, cell = 14;
    let dotCol = dotColor;
    const bar = { w: barWidth, h: barHeight, cx: 0, cy: 0, cols: 100, rows: 29, sx: 4.4, sy: 4.4 };

    const smooth = (a, b, x) => { if (b <= a) return x < a ? 0 : 1; const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    const lerp = (a, b, t) => a + (b - a) * t;
    const rand = (a, b) => a + Math.random() * (b - a);

    function layout() {
      const r = root.getBoundingClientRect();
      W = r.width; H = r.height;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      dotCol = dotColor;

      bar.sx = 4.4; bar.sy = 4.4;
      bar.w = Math.min(W - 32, Math.max(240, barWidth));
      bar.cols = Math.max(40, Math.round(bar.w / bar.sx));
      bar.rows = Math.max(3, Math.round(barHeight / bar.sy));
      bar.w = bar.cols * bar.sx;
      bar.h = bar.rows * bar.sy;
      bar.cx = W / 2; bar.cy = H / 2;
      buildParticles();
    }

    function buildParticles() {
      const N = bar.cols * bar.rows; // tantos puntos como celdas => rectángulo lleno
      const slots = [];
      const x0 = bar.cx - bar.w / 2 + bar.sx / 2;
      const y0 = bar.cy - ((bar.rows - 1) * bar.sy) / 2;
      for (let r = 0; r < bar.rows; r++)
        for (let c = 0; c < bar.cols; c++)
          slots.push({ x: x0 + c * bar.sx, y: y0 + r * bar.sy, col: c });

      const bandW = W * 0.92, bandH = Math.min(H * 0.82, 310);
      const homes = [];
      for (let i = 0; i < N; i++) homes.push({ x: bar.cx + rand(-bandW / 2, bandW / 2), y: bar.cy + rand(-bandH / 2, bandH / 2) });

      const byXY = (a, b) => (a.x - b.x) || (a.y - b.y);
      homes.sort(byXY); slots.sort(byXY);

      particles = new Array(N);
      for (let i = 0; i < N; i++) {
        const s = slots[i], h = homes[i];
        const centeredness = Math.abs(s.col - (bar.cols - 1) / 2) / ((bar.cols - 1) / 2 || 1);
        particles[i] = {
          x: h.x, y: h.y, vx: 0, vy: 0, hx: h.x, hy: h.y, sx: s.x, sy: s.y, order: centeredness,
          ax: rand(14, 26), ay: rand(12, 22),
          f1: rand(0.5, 0.9), f2: rand(1.4, 2.0), f3: rand(0.22, 0.38),
          p1: rand(0, 6.28), p2: rand(0, 6.28), p3: rand(0, 6.28),
          r: dotRadius * rand(0.9, 1.12),
        };
      }
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
      buildGrid();
      const R = 11, R2 = R * R;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const conv = smooth((1 - 0.55) * p.order, (1 - 0.55) * p.order + 0.55, prog);
        const wander = (1 - conv), repel = (1 - conv);

        const ox = p.ax * (Math.sin(t * p.f1 + p.p1) + 0.55 * Math.sin(t * p.f2 + p.p2) + 0.32 * Math.sin(t * p.f3 + p.p3));
        const oy = p.ay * (Math.sin(t * p.f1 * 0.9 + p.p2) + 0.55 * Math.sin(t * p.f2 * 1.05 + p.p3) + 0.32 * Math.sin(t * p.f3 * 1.1 + p.p1));
        let dx = (p.hx + ox * (reduce ? 0.25 : 1)) * wander + p.sx * conv;
        let dy = (p.hy + oy * (reduce ? 0.25 : 1)) * wander + p.sy * conv;

        if (conv > 0.001) {
          dx += Math.sin(t * 1.7 + p.p1) * endLife * conv * (reduce ? 0.3 : 1);
          dy += Math.cos(t * 1.9 + p.p2) * endLife * conv * (reduce ? 0.3 : 1);
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
                  const d = Math.sqrt(d2), force = (1 - d / R) * 0.55 * repel;
                  p.vx += (ex / d) * force; p.vy += (ey / d) * force;
                }
              }
            }
          }
        }

        p.vx *= 0.86; p.vy *= 0.86;
        p.x += p.vx; p.y += p.vy;
      }

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = dotCol;
      ctx.globalAlpha = alpha;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(step);
    }

    layout();
    raf = requestAnimationFrame(step);

    // relayout robusto ante cambios de tamaño del contenedor (responsive)
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
  }, [barWidth, barHeight, dotColor, dotRadius, alpha, endLife, height]);

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
