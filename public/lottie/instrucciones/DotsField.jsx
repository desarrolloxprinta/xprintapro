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
  height = 620,          // alto del lienzo (mantener por encima del alto del rectángulo)
  barWidth = 440,        // ancho objetivo del rectángulo final (px)
  barHeight = 252,       // alto objetivo del rectángulo final (px)
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

      const bandW = W * 0.92, bandH = Math.min(H * 0.82, 480);
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
