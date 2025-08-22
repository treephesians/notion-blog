"use client";

import { useEffect, useRef } from "react";

interface AnimatedCanvasProps {
  height?: number;
  className?: string;
}

export default function AnimatedCanvas({
  height = 360,
  className = "",
}: AnimatedCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const _canvas = canvasRef.current;
    if (!_canvas) return;
    const _ctx = _canvas.getContext("2d");
    if (!_ctx) return;

    const canvas: HTMLCanvasElement = _canvas;
    const ctx: CanvasRenderingContext2D = _ctx;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    let width = 0;
    let heightPx = 0;

    // Physics constants
    const gravity = 0.05;
    const friction = 0.985;

    type Rocket = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      hue: number;
      life: number;
      fuse: number;
      exploded: boolean;
    };

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      hue: number;
      size: number;
      life: number;
      maxLife: number;
      alpha: number;
    };

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];

    let frameCount = 0;
    let spawnTimer = 0;

    function resize() {
      width = canvas.clientWidth;
      heightPx = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(heightPx * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function clearWithTrail() {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(20, 20, 20, 0.25)";
      ctx.fillRect(0, 0, width, heightPx);
      if ((frameCount & 255) === 0) {
        ctx.fillStyle = "#141414";
        ctx.fillRect(0, 0, width, heightPx);
      }
    }

    function spawnRocket() {
      const x = width * (0.1 + Math.random() * 0.8);
      const y = heightPx + 10;
      const vx = (Math.random() - 0.5) * 0.8;
      const vy = -(6.5 + Math.random() * 3.5);
      const hue = 0 + Math.floor(Math.random() * 360);
      const fuse = 60 + Math.floor(Math.random() * 40);
      rockets.push({ x, y, vx, vy, hue, life: 0, fuse, exploded: false });
    }

    function explode(x: number, y: number, baseHue: number) {
      const count = 80 + Math.floor(Math.random() * 80);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 4.5;
        const hue = (baseHue + (Math.random() * 60 - 30) + 360) % 360;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          hue,
          size: 1 + Math.random() * 2.2,
          life: 0,
          maxLife: 70 + Math.floor(Math.random() * 90),
          alpha: 1,
        });
      }
      if (Math.random() < 0.35) {
        const crackles = 20 + Math.floor(Math.random() * 20);
        for (let i = 0; i < crackles; i++) {
          const a = Math.random() * Math.PI * 2;
          const s = 0.8 + Math.random() * 2.0;
          const hue = (baseHue + (Math.random() * 40 - 20) + 360) % 360;
          particles.push({
            x,
            y,
            vx: Math.cos(a) * s,
            vy: Math.sin(a) * s,
            hue,
            size: 0.8 + Math.random() * 1.2,
            life: 0,
            maxLife: 30 + Math.floor(Math.random() * 40),
            alpha: 1,
          });
        }
      }
    }

    function updateRockets() {
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.life += 1;
        r.x += r.vx;
        r.y += r.vy;
        r.vy += gravity * 0.4;

        ctx.globalCompositeOperation = "lighter";
        const grad = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, 16);
        grad.addColorStop(0, `hsla(${r.hue}, 100%, 80%, 0.9)`);
        grad.addColorStop(1, "hsla(0,0%,0%,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `hsla(${r.hue}, 100%, 70%, 0.6)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(r.x, r.y + 2);
        ctx.lineTo(r.x - r.vx * 2, r.y - r.vy * 2 + 8);
        ctx.stroke();

        const shouldExplode =
          r.life > r.fuse ||
          r.vy >= 0 ||
          r.y < heightPx * (0.25 + Math.random() * 0.2);
        if (shouldExplode && !r.exploded) {
          r.exploded = true;
          explode(r.x, r.y, r.hue);
          rockets.splice(i, 1);
        } else if (r.y > heightPx + 20) {
          rockets.splice(i, 1);
        }
      }
    }

    function updateParticles() {
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 1;
        p.vx *= friction;
        p.vy *= friction;
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        const lifeRatio = 1 - p.life / p.maxLife;
        p.alpha = Math.max(0, lifeRatio);

        const r = Math.max(1.2, p.size * (0.8 + lifeRatio));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 6);
        g.addColorStop(0, `hsla(${p.hue}, 100%, 60%, ${0.55 * p.alpha})`);
        g.addColorStop(1, "hsla(0,0%,0%,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${0.9 * p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife || p.alpha <= 0 || p.y > heightPx + 20) {
          particles.splice(i, 1);
        }
      }
    }

    function vignette() {
      ctx.globalCompositeOperation = "source-over";
      const vg = ctx.createRadialGradient(
        width * 0.5,
        heightPx * 0.55,
        Math.min(width, heightPx) * 0.35,
        width * 0.5,
        heightPx * 0.55,
        Math.max(width, heightPx) * 0.8
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.35)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, heightPx);
    }

    function draw() {
      clearWithTrail();

      if (spawnTimer <= 0 && rockets.length < 5) {
        spawnRocket();
        spawnTimer = 40 + Math.floor(Math.random() * 60);
      } else {
        spawnTimer -= 1;
      }

      updateRockets();
      updateParticles();
      vignette();

      frameRef.current = requestAnimationFrame(draw);
      frameCount++;
    }

    const ro = new ResizeObserver(() => {
      resize();
      rockets.length = 0;
      particles.length = 0;
    });
    ro.observe(canvas);

    resize();
    ctx.fillStyle = "#141414";
    ctx.fillRect(0, 0, width, heightPx);
    draw();

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl mb-8 ${className}`}
      style={{ height }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1D1D1D]/40" />
    </div>
  );
}
