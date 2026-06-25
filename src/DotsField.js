export default class DotsField {
  constructor(container, options = {}) {
    this.container = container;
    
    this.options = {
      height: 460,
      sphereRadius: 130,
      count: 4000,
      startFraction: 0.2,
      dotColor: "#000000",
      accentColor: "#F18108",
      accentRatio: 0.4,
      dotRadius: 0.5,
      alpha: 0.95,
      idleSpeed: 0.5,
      rotationSpeed: 0.25,
      scatter: 1,
      endLife: 0,
      core: false,
      coreColor: "#F18108",
      corePulseSpeed: 3.0,
      coreSize: 0.18,
      ...options
    };

    this.progress = 0;
    this.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    this.container.style.position = this.container.style.position || "relative";
    this.container.style.width = this.container.style.width || "100%";
    this.container.style.height = this.container.style.height || `${this.options.height}px`;
    this.container.style.overflow = "hidden";
    this.container.style.background = this.container.style.background || "transparent";

    this.canvas = document.createElement('canvas');
    this.canvas.style.display = "block";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.W = 0;
    this.H = 0;
    this.DPR = 1;
    this.particles = [];
    this.order = [];
    this.grid = null;
    this.cell = 14;
    this.cx = 0;
    this.cy = 0;
    this.R = 130;
    this.colBase = this.options.dotColor;
    this.colAccent = this.options.accentColor;
    this.palette = [];
    this.coreRGB = { r: 241, g: 129, b: 8 };
    this.coreHot = { r: 255, g: 214, b: 170 };
    this.raf = 0;
    this.t0 = performance.now();

    this.TILT = 0.4;
    this.PAL_STEPS = 24;
    this.APP_WIN = 0.15;

    this.step = this.step.bind(this);
    this.layout = this.layout.bind(this);
    this.relayout = this.relayout.bind(this);

    this.layout();
    this.raf = requestAnimationFrame(this.step);

    this.rt = null;
    this.ro = new ResizeObserver(this.relayout);
    this.ro.observe(this.container);
    window.addEventListener("resize", this.relayout);
  }

  setProgress(p) {
    this.progress = Math.min(1, Math.max(0, p));
  }

  smooth(a, b, x) { 
    if (b <= a) return x < a ? 0 : 1; 
    const t = Math.min(1, Math.max(0, (x - a) / (b - a))); 
    return t * t * (3 - 2 * t); 
  }
  
  lerp(a, b, t) { return a + (b - a) * t; }
  
  rand(a, b) { return a + Math.random() * (b - a); }

  hexToRgb(h) { 
    const s = ("" + h).replace("#", ""); 
    const f = s.length === 3 ? s.split("").map((c) => c + c).join("") : s; 
    const n = parseInt(f, 16) || 0; 
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }; 
  }

  layout() {
    const r = this.container.getBoundingClientRect();
    this.W = r.width; 
    this.H = r.height;
    this.DPR = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(this.W * this.DPR); 
    this.canvas.height = Math.round(this.H * this.DPR);
    this.ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
    this.colBase = this.options.dotColor; 
    this.colAccent = this.options.accentColor;
    
    const a = this.hexToRgb(this.colBase);
    const b = this.hexToRgb(this.colAccent);
    this.palette = [];
    for (let k = 0; k < this.PAL_STEPS; k++) { 
      const m = k / (this.PAL_STEPS - 1);
      this.palette.push("rgb(" + ((this.lerp(a.r, b.r, m)) | 0) + "," + ((this.lerp(a.g, b.g, m)) | 0) + "," + ((this.lerp(a.b, b.b, m)) | 0) + ")"); 
    }

    this.R = Math.min(this.options.sphereRadius, this.H * 0.42, this.W * 0.42);
    this.cx = this.W / 2; 
    this.cy = this.H / 2;
    
    this.coreRGB = this.hexToRgb(this.options.coreColor);
    this.coreHot = { r: (this.coreRGB.r + (255 - this.coreRGB.r) * 0.6) | 0, g: (this.coreRGB.g + (255 - this.coreRGB.g) * 0.6) | 0, b: (this.coreRGB.b + (255 - this.coreRGB.b) * 0.6) | 0 };

    this.buildParticles();
  }

  buildParticles() {
    const N = Math.max(50, this.options.count | 0);
    const startFrac = Math.min(1, Math.max(0, this.options.startFraction));
    const GA = Math.PI * (3 - Math.sqrt(5)); 
    const ct = Math.cos(this.TILT), st = Math.sin(this.TILT);

    this.particles = new Array(N);
    for (let i = 0; i < N; i++) {
      const uy = 1 - (i / (N - 1)) * 2;
      const rr = Math.sqrt(Math.max(0, 1 - uy * uy));
      const th = i * GA;
      const ux = Math.cos(th) * rr;
      const uz = Math.sin(th) * rr;

      const ix = this.cx + this.R * ux;
      const iy = this.cy + this.R * (uy * ct - uz * st);

      const alwaysOn = Math.random() < startFrac;
      const spawn = alwaysOn ? -1 : this.rand(0, 1 - this.APP_WIN);
      const accent0 = Math.random() < this.options.accentRatio;
      const fs = this.rand(0.15, 0.8);
      const fe = Math.min(1, fs + this.rand(0.15, 0.3));

      this.particles[i] = {
        x: ix, y: iy, vx: 0, vy: 0,
        ux, uy, uz, sxp: ix, syp: iy, depth: 0, app: alwaysOn ? 1 : 0,
        spawn, accent0, fs, fe,
        ax: this.rand(8, 18), ay: this.rand(8, 16),
        f1: this.rand(0.5, 0.9), f2: this.rand(1.4, 2.0), f3: this.rand(0.22, 0.38),
        p1: this.rand(0, 6.28), p2: this.rand(0, 6.28), p3: this.rand(0, 6.28),
        r: this.options.dotRadius * this.rand(0.9, 1.12),
      };
    }
    this.order = Array.from({ length: N }, (_, i) => i);
  }

  buildGrid() {
    this.cell = 14;
    const cols = Math.max(1, Math.ceil(this.W / this.cell));
    const rows = Math.max(1, Math.ceil(this.H / this.cell));
    this.grid = { cols, rows, buckets: new Array(cols * rows) };
    for (let i = 0; i < this.grid.buckets.length; i++) this.grid.buckets[i] = [];
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (p.app <= 0.5) continue;
      const gx = Math.min(cols - 1, Math.max(0, (p.x / this.cell) | 0));
      const gy = Math.min(rows - 1, Math.max(0, (p.y / this.cell) | 0));
      this.grid.buckets[gy * cols + gx].push(i);
    }
  }

  step(now) {
    const t = (now - this.t0) / 1000;
    const prog = this.progress;
    const it = t * this.options.idleSpeed;                       
    const ang = t * this.options.rotationSpeed * (this.reduce ? 0.3 : 1);
    const ca = Math.cos(ang), sa = Math.sin(ang);
    const ct = Math.cos(this.TILT), st = Math.sin(this.TILT);
    const jit = (this.reduce ? 0.4 : 1) * this.options.scatter * this.lerp(1.0, 0.12, prog); 

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.app = p.spawn < 0 ? 1 : this.smooth(p.spawn, p.spawn + this.APP_WIN, prog);
      const x1 = p.ux * ca + p.uz * sa;
      const z1 = -p.ux * sa + p.uz * ca;
      const y2 = p.uy * ct - z1 * st;
      const z2 = p.uy * st + z1 * ct;               
      p.sxp = this.cx + this.R * x1;
      p.syp = this.cy + this.R * y2;
      p.depth = z2;
    }

    const needRepel = false; 
    if (needRepel) this.buildGrid(); 

    const Rrep = 11, R2 = Rrep * Rrep;
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const ox = p.ax * (Math.sin(it * p.f1 + p.p1) + 0.55 * Math.sin(it * p.f2 + p.p2) + 0.32 * Math.sin(it * p.f3 + p.p3));
      const oy = p.ay * (Math.sin(it * p.f1 * 0.9 + p.p2) + 0.55 * Math.sin(it * p.f2 * 1.05 + p.p3) + 0.32 * Math.sin(it * p.f3 * 1.1 + p.p1));
      let dx = p.sxp + ox * jit;
      let dy = p.syp + oy * jit;
      if (this.options.endLife > 0) { dx += Math.sin(it * 1.7 + p.p1) * this.options.endLife; dy += Math.cos(it * 1.9 + p.p2) * this.options.endLife; }

      const k = this.lerp(0.06, 0.16, prog);             
      p.vx += (dx - p.x) * k; p.vy += (dy - p.y) * k;

      const repel = this.options.idleSpeed * (1 - prog);          
      if (needRepel && repel > 0.02 && p.app > 0.5 && this.grid) {
        const gx = Math.min(this.grid.cols - 1, Math.max(0, (p.x / this.cell) | 0));
        const gy = Math.min(this.grid.rows - 1, Math.max(0, (p.y / this.cell) | 0));
        for (let ny = gy - 1; ny <= gy + 1; ny++) {
          if (ny < 0 || ny >= this.grid.rows) continue;
          for (let nx = gx - 1; nx <= gx + 1; nx++) {
            if (nx < 0 || nx >= this.grid.cols) continue;
            const b = this.grid.buckets[ny * this.grid.cols + nx];
            for (let k2 = 0; k2 < b.length; k2++) {
              const j = b[k2]; if (j === i) continue;
              const q = this.particles[j];
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

    this.order.sort((a, b) => this.particles[a].depth - this.particles[b].depth);
    this.ctx.clearRect(0, 0, this.W, this.H);

    const coreF = this.options.core ? this.smooth(0.8, 1.0, prog) : 0;
    let coreR = 0, coreA = 0;
    if (coreF > 0.001) {
      const ps = this.options.corePulseSpeed * (this.reduce ? 0.5 : 1);
      const beat = Math.pow(0.5 + 0.5 * Math.sin(t * ps), 1.8); 
      coreR = this.R * this.options.coreSize * (0.85 + 0.22 * beat);
      coreA = coreF * (0.5 + 0.5 * beat) * (this.reduce ? 0.7 : 1);
    }
    const drawCore = () => {
      const cc = this.coreRGB, hot = this.coreHot, rr = Math.max(1, coreR);
      const g = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, rr);
      g.addColorStop(0, "rgba(" + hot.r + "," + hot.g + "," + hot.b + "," + Math.min(1, coreA + 0.15) + ")");
      g.addColorStop(0.25, "rgba(" + cc.r + "," + cc.g + "," + cc.b + "," + coreA + ")");
      g.addColorStop(0.6, "rgba(" + cc.r + "," + cc.g + "," + cc.b + "," + (coreA * 0.5) + ")");
      g.addColorStop(1, "rgba(" + cc.r + "," + cc.g + "," + cc.b + ",0)");
      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = g;
      this.ctx.beginPath(); this.ctx.arc(this.cx, this.cy, rr, 0, 6.2832); this.ctx.fill();
    };

    let coreDrawn = false;
    for (let o = 0; o < this.order.length; o++) {
      const p = this.particles[this.order[o]];
      if (!coreDrawn && coreF > 0.001 && p.depth >= 0) { drawCore(); coreDrawn = true; } 
      if (p.app <= 0.001) continue;                 
      const dn = (p.depth + 1) / 2;                 
      const sizeF = 0.55 + 0.65 * dn;
      const alphaF = 0.40 + 0.60 * dn;
      const appScale = 0.45 + 0.55 * p.app;         
      const drawnR = p.r * sizeF * appScale;
      const drawnA = this.options.alpha * alphaF * p.app;        
      const m = p.accent0 ? 1 : this.smooth(p.fs, p.fe, prog);
      this.ctx.fillStyle = this.palette[(m * (this.PAL_STEPS - 1) + 0.5) | 0];
      this.ctx.globalAlpha = Math.max(0, Math.min(1, drawnA));
      const s = Math.max(0.6, drawnR * 2);
      this.ctx.fillRect(p.x - s/2, p.y - s/2, s, s);
    }
    if (!coreDrawn && coreF > 0.001) drawCore();
    this.ctx.globalAlpha = 1;

    this.raf = requestAnimationFrame(this.step);
  }

  relayout() {
    clearTimeout(this.rt);
    this.rt = setTimeout(this.layout, 150);
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    clearTimeout(this.rt);
    this.ro.disconnect();
    window.removeEventListener("resize", this.relayout);
  }
}
