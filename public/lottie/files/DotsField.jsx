import { useEffect, useRef } from "react";

/**
 * DotsField — partículas que SIEMPRE forman una esfera.
 *
 * - Los puntos viven e interactúan siempre (bucle propio requestAnimationFrame) y la
 *   esfera gira lentamente. En reposo se mueven a media velocidad (idleSpeed = 0.5).
 * - En `progress = 0` solo se ve una fracción (startFraction = 0.2) de los puntos: una
 *   esfera DISPERSA y suelta. Conforme `progress` sube, se van AÑADIENDO más puntos
 *   (aparecen con fundido) y la esfera se INTEGRA hasta quedar completa y compacta.
 * - Color: en reposo hay mezcla (negro + acento); conforme avanza, las negras viran a
 *   `accentColor`. Al completarse (`progress = 1`) toda la esfera es `#F18108`.
 *
 * Uso básico (scroll de serie): <section style={{ padding: "40vh 0" }}><DotsField /></section>
 * Control externo (GSAP / Framer): <DotsField progress={miProgreso0a1} />
 */
export default function DotsField({
  height = 460,            // alto del lienzo (debe superar el diámetro de la esfera)
  sphereRadius = 130,      // radio de la esfera (px); se reduce solo si no cabe
  count = 4000,            // nº total de partículas (más, para una esfera de granos de arena)
  startFraction = 0.2,     // fracción visible en progress=0 (0.2 = 20%); el resto se añade
  dotColor = "#000000",    // color base (puntos que aún no han virado)
  accentColor = "#F18108", // color de acento y color final de toda la esfera
  accentRatio = 0.4,       // proporción de puntos que ya nacen en el acento, en reposo
  dotRadius = 0.5,         // radio base del punto (polvo muy fino)
  alpha = 0.95,            // opacidad base
  idleSpeed = 0.5,         // velocidad de interacción en reposo (1 = original)
  rotationSpeed = 0.25,    // velocidad de giro de la esfera (rad/s)
  scatter = 1,             // cuánto se dispersan los puntos al inicio (1 = normal)
  endLife = 0,             // micro-temblor extra (0 = limpio; la rotación ya da vida)
  core = false,            // núcleo de plasma (desactivado)
  coreColor = "#F18108",   // color del núcleo de plasma
  corePulseSpeed = 3.0,    // velocidad del latido del núcleo (rad/s)
  coreSize = 0.18,         // tamaño del núcleo respecto al radio de la esfera (0..1)
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

    const TILT = 0.4;        // inclinación fija de la esfera (vista 3/4)
    const PAL_STEPS = 24;    // pasos de la paleta de viraje de color
    const APP_WIN = 0.15;    // ancho de la ventana de aparición de cada punto
    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, particles = [], order = [], grid = null, cell = 14;
    let cx = 0, cy = 0, R = 130;
    let colBase = dotColor, colAccent = accentColor, palette = [];
    let coreRGB = { r: 241, g: 129, b: 8 }, coreHot = { r: 255, g: 214, b: 170 };

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
      // paleta negro -> acento, para el viraje progresivo a #F18108
      { const a = hexToRgb(colBase), b = hexToRgb(colAccent); palette = [];
        for (let k = 0; k < PAL_STEPS; k++) { const m = k / (PAL_STEPS - 1);
          palette.push("rgb(" + ((lerp(a.r, b.r, m)) | 0) + "," + ((lerp(a.g, b.g, m)) | 0) + "," + ((lerp(a.b, b.b, m)) | 0) + ")"); } }

      R = Math.min(sphereRadius, H * 0.42, W * 0.42);
      cx = W / 2; cy = H / 2;
      // colores del núcleo de plasma (centro caliente = acento aclarado hacia blanco)
      coreRGB = hexToRgb(coreColor);
      coreHot = { r: (coreRGB.r + (255 - coreRGB.r) * 0.6) | 0, g: (coreRGB.g + (255 - coreRGB.g) * 0.6) | 0, b: (coreRGB.b + (255 - coreRGB.b) * 0.6) | 0 };
      buildParticles();
    }

    function buildParticles() {
      const N = Math.max(50, count | 0);
      const startFrac = Math.min(1, Math.max(0, startFraction));
      const GA = Math.PI * (3 - Math.sqrt(5)); // ángulo áureo
      const ct = Math.cos(TILT), st = Math.sin(TILT);

      particles = new Array(N);
      for (let i = 0; i < N; i++) {
        // punto repartido uniformemente sobre la esfera unidad (Fibonacci)
        const uy = 1 - (i / (N - 1)) * 2;
        const rr = Math.sqrt(Math.max(0, 1 - uy * uy));
        const th = i * GA;
        const ux = Math.cos(th) * rr;
        const uz = Math.sin(th) * rr;

        // posición inicial = su sitio en la esfera (rotación 0), para que no haya saltos
        const ix = cx + R * ux;
        const iy = cy + R * (uy * ct - uz * st);

        // aparición: una fracción siempre visible (spawn=-1); el resto aparece al subir progress
        const alwaysOn = Math.random() < startFrac;
        const spawn = alwaysOn ? -1 : rand(0, 1 - APP_WIN);
        // viraje de color (ligado a progress): negras -> acento; al final (1) todas acento
        const accent0 = Math.random() < accentRatio;
        const fs = rand(0.15, 0.8);
        const fe = Math.min(1, fs + rand(0.15, 0.3));

        particles[i] = {
          x: ix, y: iy, vx: 0, vy: 0,
          ux, uy, uz, sxp: ix, syp: iy, depth: 0, app: alwaysOn ? 1 : 0,
          spawn, accent0, fs, fe,
          ax: rand(8, 18), ay: rand(8, 16),
          f1: rand(0.5, 0.9), f2: rand(1.4, 2.0), f3: rand(0.22, 0.38),
          p1: rand(0, 6.28), p2: rand(0, 6.28), p3: rand(0, 6.28),
          r: dotRadius * rand(0.9, 1.12),
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
        if (p.app <= 0.5) continue; // solo los ya aparecidos interactúan
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
      const ang = t * rotationSpeed * (reduce ? 0.3 : 1);
      const ca = Math.cos(ang), sa = Math.sin(ang);
      const ct = Math.cos(TILT), st = Math.sin(TILT);
      const jit = (reduce ? 0.4 : 1) * scatter * lerp(1.0, 0.12, prog); // dispersión: alta al inicio, baja al final

      // pass A: aparición + sitio proyectado en la esfera (con rotación)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.app = p.spawn < 0 ? 1 : smooth(p.spawn, p.spawn + APP_WIN, prog);
        const x1 = p.ux * ca + p.uz * sa;
        const z1 = -p.ux * sa + p.uz * ca;
        const y2 = p.uy * ct - z1 * st;
        const z2 = p.uy * st + z1 * ct;               // profundidad (-1..1)
        p.sxp = cx + R * x1;
        p.syp = cy + R * y2;
        p.depth = z2;
      }

      const needRepel = false; // repulsión desactivada: evita el "rebote" de mitad (inflado+recogida)
      if (needRepel) buildGrid(); // solo aparecidos

      // pass B: física (deriva alrededor del sitio + muelle + repulsión que se apaga al integrarse)
      const Rrep = 11, R2 = Rrep * Rrep;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const ox = p.ax * (Math.sin(it * p.f1 + p.p1) + 0.55 * Math.sin(it * p.f2 + p.p2) + 0.32 * Math.sin(it * p.f3 + p.p3));
        const oy = p.ay * (Math.sin(it * p.f1 * 0.9 + p.p2) + 0.55 * Math.sin(it * p.f2 * 1.05 + p.p3) + 0.32 * Math.sin(it * p.f3 * 1.1 + p.p1));
        let dx = p.sxp + ox * jit;
        let dy = p.syp + oy * jit;
        if (endLife > 0) { dx += Math.sin(it * 1.7 + p.p1) * endLife; dy += Math.cos(it * 1.9 + p.p2) * endLife; }

        const k = lerp(0.06, 0.16, prog);             // muelle más rígido conforme se integra
        p.vx += (dx - p.x) * k; p.vy += (dy - p.y) * k;

        const repel = idleSpeed * (1 - prog);          // se apaga al completarse la esfera
        if (needRepel && repel > 0.02 && p.app > 0.5 && grid) {
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

        p.vx *= 0.80; p.vy *= 0.80;
        p.x += p.vx; p.y += p.vy;
      }

      // dibujar de atrás hacia delante (volumen de esfera) con fundido de aparición y viraje de color
      order.sort((a, b) => particles[a].depth - particles[b].depth);
      ctx.clearRect(0, 0, W, H);

      // núcleo de plasma: solo cuando la esfera está (casi) completa; late con el tiempo
      const coreF = core ? smooth(0.8, 1.0, prog) : 0;
      let coreR = 0, coreA = 0;
      if (coreF > 0.001) {
        const ps = corePulseSpeed * (reduce ? 0.5 : 1);
        const beat = Math.pow(0.5 + 0.5 * Math.sin(t * ps), 1.8); // latido
        coreR = R * coreSize * (0.85 + 0.22 * beat);
        coreA = coreF * (0.5 + 0.5 * beat) * (reduce ? 0.7 : 1);
      }
      const drawCore = () => {
        const cc = coreRGB, hot = coreHot, rr = Math.max(1, coreR);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        g.addColorStop(0, "rgba(" + hot.r + "," + hot.g + "," + hot.b + "," + Math.min(1, coreA + 0.15) + ")");
        g.addColorStop(0.25, "rgba(" + cc.r + "," + cc.g + "," + cc.b + "," + coreA + ")");
        g.addColorStop(0.6, "rgba(" + cc.r + "," + cc.g + "," + cc.b + "," + (coreA * 0.5) + ")");
        g.addColorStop(1, "rgba(" + cc.r + "," + cc.g + "," + cc.b + ",0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 6.2832); ctx.fill();
      };

      let coreDrawn = false;
      for (let o = 0; o < order.length; o++) {
        const p = particles[order[o]];
        if (!coreDrawn && coreF > 0.001 && p.depth >= 0) { drawCore(); coreDrawn = true; } // entre fondo y frente
        if (p.app <= 0.001) continue;                 // aún no ha aparecido
        const dn = (p.depth + 1) / 2;                 // 0 (fondo) .. 1 (frente)
        const sizeF = 0.55 + 0.65 * dn;
        const alphaF = 0.40 + 0.60 * dn;
        const appScale = 0.45 + 0.55 * p.app;         // aparece creciendo
        const drawnR = p.r * sizeF * appScale;
        const drawnA = alpha * alphaF * p.app;        // aparece con fundido
        const m = p.accent0 ? 1 : smooth(p.fs, p.fe, prog);
        ctx.fillStyle = palette[(m * (PAL_STEPS - 1) + 0.5) | 0];
        ctx.globalAlpha = Math.max(0, Math.min(1, drawnA));
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.3, drawnR), 0, 6.2832);
        ctx.fill();
      }
      if (!coreDrawn && coreF > 0.001) drawCore();
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
  }, [height, sphereRadius, count, startFraction, dotColor, accentColor, accentRatio, dotRadius, alpha, idleSpeed, rotationSpeed, scatter, endLife, core, coreColor, corePulseSpeed, coreSize]);

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
