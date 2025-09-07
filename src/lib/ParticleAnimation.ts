export interface ParticleOptions {
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: [number, number];   // min, max particle size
  colors?: string[];         // list of colors
}

export default class ParticleAnimation {
  canvas: HTMLCanvasElement;
  canvasContainer: HTMLElement | null;
  context: CanvasRenderingContext2D;
  dpr: number;
  settings: Required<ParticleOptions>;
  circles: any[];
  mouse: { x: number; y: number };
  canvasSize: { w: number; h: number };

  constructor(
    el: HTMLCanvasElement,
    { quantity = 30, staticity = 50, ease = 50, size = [1, 3], colors = ["#ffffff"] }: ParticleOptions = {}
  ) {
    this.canvas = el;
    this.canvasContainer = this.canvas?.parentElement || null;
    this.context = this.canvas.getContext("2d")!;
    this.dpr = window.devicePixelRatio || 1;
    this.settings = { quantity, staticity, ease, size, colors };
    this.circles = [];
    this.mouse = { x: 0, y: 0 };
    this.canvasSize = { w: 0, h: 0 };

    this.onMouseMove = this.onMouseMove.bind(this);
    this.initCanvas = this.initCanvas.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.drawCircle = this.drawCircle.bind(this);
    this.drawParticles = this.drawParticles.bind(this);
    this.remapValue = this.remapValue.bind(this);
    this.animate = this.animate.bind(this);

    this.init();
  }

  init() {
    this.initCanvas();
    this.animate();
    window.addEventListener("resize", this.initCanvas);
    window.addEventListener("mousemove", this.onMouseMove);
  }

  initCanvas() {
    this.resizeCanvas();
    this.drawParticles();
  }

  onMouseMove(event: MouseEvent) {
    const { clientX, clientY } = event;
    const rect = this.canvas.getBoundingClientRect();
    const { w, h } = this.canvasSize;
    const x = clientX - rect.left - w / 2;
    const y = clientY - rect.top - h / 2;
    const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
    if (inside) {
      this.mouse.x = x;
      this.mouse.y = y;
    }
  }

  resizeCanvas() {
    this.circles.length = 0;
    this.canvasSize.w = this.canvasContainer?.offsetWidth || 0;
    this.canvasSize.h = this.canvasContainer?.offsetHeight || 0;
    this.canvas.width = this.canvasSize.w * this.dpr;
    this.canvas.height = this.canvasSize.h * this.dpr;
    this.canvas.style.width = this.canvasSize.w + "px";
    this.canvas.style.height = this.canvasSize.h + "px";
    this.context.scale(this.dpr, this.dpr);
  }

  circleParams() {
    const [minSize, maxSize] = this.settings.size;
    const size = Math.random() * (maxSize - minSize) + minSize;

    const colors = this.settings.colors;
    const color = colors[Math.floor(Math.random() * colors.length)];

    return {
      x: Math.floor(Math.random() * this.canvasSize.w),
      y: Math.floor(Math.random() * this.canvasSize.h),
      translateX: 0,
      translateY: 0,
      size,
      alpha: 0,
      targetAlpha: Number((Math.random() * 0.6 + 0.1).toFixed(2)),
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      magnetism: 0.1 + Math.random() * 4,
      color,
    };
  }

  drawCircle(circle: any, update = false) {
    const { x, y, translateX, translateY, size, alpha, color } = circle;
    this.context.translate(translateX, translateY);
    this.context.beginPath();
    this.context.arc(x, y, size, 0, 2 * Math.PI);
    this.context.fillStyle = this.hexToRgba(color, alpha);
    this.context.fill();
    this.context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (!update) {
      this.circles.push(circle);
    }
  }

  hexToRgba(hex: string, alpha: number) {
    // Support both #RGB and #RRGGBB
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    }
    return `rgba(${r},${g},${b},${alpha})`;
  }

  clearContext() {
    this.context.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
  }

  drawParticles() {
    this.clearContext();
    for (let i = 0; i < this.settings.quantity; i++) {
      const circle = this.circleParams();
      this.drawCircle(circle);
    }
  }

  remapValue(value: number, start1: number, end1: number, start2: number, end2: number) {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  }

  animate() {
    this.clearContext();
    this.circles.forEach((circle, i) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        this.canvasSize.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        this.canvasSize.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = Number(
        this.remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      );

      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }

      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX +=
        ((this.mouse.x / (this.settings.staticity / circle.magnetism)) - circle.translateX) /
        this.settings.ease;
      circle.translateY +=
        ((this.mouse.y / (this.settings.staticity / circle.magnetism)) - circle.translateY) /
        this.settings.ease;

      if (
        circle.x < -circle.size ||
        circle.x > this.canvasSize.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > this.canvasSize.h + circle.size
      ) {
        this.circles.splice(i, 1);
        const c = this.circleParams();
        this.drawCircle(c);
      } else {
        this.drawCircle({ ...circle }, true);
      }
    });
    window.requestAnimationFrame(this.animate);
  }
}
