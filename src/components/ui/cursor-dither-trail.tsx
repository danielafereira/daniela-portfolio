"use client";

import { useRef, useEffect } from "react";

interface CursorDitherTrailProps {
  trailColor?: string;
  /** Cycle through multiple colors over time. Overrides trailColor when provided. */
  colors?: string[];
  /** Duration of one full color cycle in ms. Default: 4000 */
  cycleDuration?: number;
  dotSize?: number;
  fadeDuration?: number;
  className?: string;
  /** Listen on window instead of canvas so the canvas can be pointer-events:none */
  global?: boolean;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

function lerpColor(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

export function CursorDitherTrail({
  trailColor = "#FFFBAF",
  colors,
  cycleDuration = 4000,
  dotSize = 4,
  fadeDuration = 900,
  className = "",
  global = false,
}: CursorDitherTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sync = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    sync();

    const onResize = () => sync();
    window.addEventListener("resize", onResize);

    // Pre-parse all colors
    const palette = colors && colors.length > 1
      ? colors.map(hexToRgb)
      : [hexToRgb(trailColor)];

    const getCurrentColor = (): [number, number, number] => {
      if (palette.length === 1) return palette[0];
      const cycle = (performance.now() / cycleDuration) % palette.length;
      const fromIdx = Math.floor(cycle) % palette.length;
      const toIdx = (fromIdx + 1) % palette.length;
      const t = cycle - Math.floor(cycle);
      // ease in-out
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      return lerpColor(palette[fromIdx], palette[toIdx], eased);
    };

    const paintGlow = (x: number, y: number) => {
      const [r, g, b] = getCurrentColor();
      const roll = Math.random();
      const size = roll < 0.3
        ? dotSize * (0.4 + Math.random() * 0.6)
        : dotSize * (1.5 + Math.random() * 2.5);

      const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
      grad.addColorStop(0,    `rgba(255,255,255,0.95)`);
      grad.addColorStop(0.2,  `rgba(${r},${g},${b},0.85)`);
      grad.addColorStop(0.55, `rgba(${r},${g},${b},0.35)`);
      grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    };

    let lastX = -999;
    let lastY = -999;
    const minDist = 1;
    let lastTime = performance.now();
    let rafId: number;

    const fadeStep = () => {
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${delta / fadeDuration})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      rafId = requestAnimationFrame(fadeStep);
    };
    rafId = requestAnimationFrame(fadeStep);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (global && (x < 0 || y < 0 || x > canvas.width || y > canvas.height)) return;
      if (Math.hypot(x - lastX, y - lastY) >= minDist) {
        paintGlow(x, y);
        lastX = x;
        lastY = y;
      }
    };

    const target = global ? window : canvas;
    target.addEventListener("mousemove", onMove as EventListener);

    return () => {
      target.removeEventListener("mousemove", onMove as EventListener);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, [trailColor, colors, cycleDuration, dotSize, fadeDuration]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={global ? { pointerEvents: "none" } : { cursor: "none" }}
    />
  );
}

export default CursorDitherTrail;
