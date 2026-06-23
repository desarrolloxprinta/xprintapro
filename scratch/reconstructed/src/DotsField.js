"export default class DotsField {
  constructor(container, options = {}) {
    this.container = container;
    
    // Default options
    this.options = {
      height: 460,
      sphereRadius: 130,
      count: 1700,
      startFraction: 0.2,
      dotColor: "#000000",
      accentColor: "#F18108",
      accentRatio: 0.4,
      dotRadius: 3.66,
      alpha: 0.95,
      idleSpeed: 0.5,
      rotationSpeed: 0.25,
      scatter: 1,
      endLife: 0,
      ...options
    };

    this.progress = 0;
    this.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Setup DOM
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

    // State
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
    this.raf = 0;
    this.t0 = performance.now();

    // Bindings
    this.step = this.step.bind(this);
    this.layout = this.layout.bind(this);
    this.relayout = this.relayout.bind(this);

    // Init
    this.layout();
    this.raf = requestAnimationFrame(this.step);

    // Resize handling
    this.rt = null;
    this.ro = new ResizeObserver(this.relayout);
    this.ro.observe(this.conta
<truncated 8243 bytes>