import React, { useEffect, useRef, useState } from 'react';

interface ParticleNetworkProps {
  isDark: boolean;
}

/**
 * Interactive particle web on a fixed background canvas.
 *
 * Same look as the original: a monochrome web of thin lines (slate in light mode,
 * sky in dark mode) between slowly drifting particles that gather around the cursor
 * and scatter on click. Improvements over the original:
 *  - Neighbour search uses a spatial hash grid (≈O(n)) instead of comparing every pair,
 *    and lines are batched into a few strokes per frame, so scrolling stays smooth.
 *  - Frame-rate independent physics, with a gentle wander so the drift feels alive.
 *  - Cursor "sweet spot": particles are pulled towards a ring around the pointer and
 *    held there by a soft repulsion core, so they cluster into a dense web that follows
 *    the mouse; links near the cursor are drawn brighter.
 *  - Theme changes cross-fade the colour in the render loop instead of re-seeding particles.
 *  - Pauses in background tabs, honours prefers-reduced-motion, sharp on HiDPI screens.
 */

type RGB = [number, number, number];

const LIGHT_RGB: RGB = [15, 23, 42]; // slate-900
const DARK_RGB: RGB = [56, 189, 248]; // primary-400

const LINK_DIST = 170;
const LINK_ALPHA = 0.16;
const HOVER_RADIUS = 380;
const SWEET_SPOT = 90; // particles settle around this distance from the cursor
const SHOCK_RADIUS = 300;
const MIN_PARTICLES = 90;
const MAX_PARTICLES = 380;
const MIN_WIDTH = 1024; // tablets and phones skip the canvas for performance
const BUCKETS = 6;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  wander: number; // slowly rotating heading offset
}

const ParticleNetwork: React.FC<ParticleNetworkProps> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHidden, setIsHidden] = useState(() => typeof window !== 'undefined' && window.innerWidth < MIN_WIDTH);

  // Read by the render loop every frame — toggling the theme never restarts the simulation.
  const themeTargetRef = useRef(isDark ? 1 : 0);
  const redrawRef = useRef<() => void>(() => {});

  useEffect(() => {
    themeTargetRef.current = isDark ? 1 : 0;
    redrawRef.current();
  }, [isDark]);

  useEffect(() => {
    const checkScreenSize = () => setIsHidden(window.innerWidth < MIN_WIDTH);
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (isHidden) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let particles: Particle[] = [];
    let themeMix = themeTargetRef.current;
    let rafId = 0;
    let lastTime = performance.now();
    let slowFrames = 0;

    const pointer = { x: -9999, y: -9999, active: false, clicked: false };

    const makeParticle = (): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.12 + 0.04;
      const baseVx = Math.cos(angle) * speed;
      const baseVy = Math.sin(angle) * speed;
      return { x: Math.random() * width, y: Math.random() * height, vx: baseVx, vy: baseVy, baseVx, baseVy, wander: 0 };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / LINK_DIST) + 1;
      rows = Math.ceil(height / LINK_DIST) + 1;
      const count = Math.max(MIN_PARTICLES, Math.min(Math.floor((width * height) / 4500), MAX_PARTICLES));
      particles = Array.from({ length: count }, makeParticle);
    };

    const step = (dt: number) => {
      const clicked = pointer.clicked;
      pointer.clicked = false;

      for (const p of particles) {
        // Gentle wander: rotate the resting heading a little so paths aren't dead-straight
        p.wander += (Math.random() - 0.5) * 0.02 * dt;
        p.wander *= 0.995;
        const cos = Math.cos(p.wander * 0.02);
        const sin = Math.sin(p.wander * 0.02);
        const bx = p.baseVx * cos - p.baseVy * sin;
        const by = p.baseVx * sin + p.baseVy * cos;
        p.baseVx = bx;
        p.baseVy = by;

        // Viscous return to the resting drift velocity
        const ease = 1 - Math.pow(0.985, dt);
        p.vx += (p.baseVx - p.vx) * ease;
        p.vy += (p.baseVy - p.vy) * ease;

        if (pointer.active || clicked) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          // Sweet spot: pull in from afar, push out when too close → particles ring the cursor
          if (pointer.active && dist < HOVER_RADIUS) {
            const nx = dx / dist;
            const ny = dy / dist;
            if (dist < SWEET_SPOT) {
              const force = (SWEET_SPOT - dist) / SWEET_SPOT;
              p.vx -= nx * force * 0.06 * dt;
              p.vy -= ny * force * 0.06 * dt;
            } else {
              const force = (HOVER_RADIUS - dist) / HOVER_RADIUS;
              p.vx += nx * force * 0.018 * dt;
              p.vy += ny * force * 0.018 * dt;
            }
          }

          // Click shockwave: one strong outward impulse
          if (clicked && dist < SHOCK_RADIUS) {
            const force = (SHOCK_RADIUS - dist) / SHOCK_RADIUS;
            p.vx -= (dx / dist) * force * 2.2;
            p.vy -= (dy / dist) * force * 2.2;
          }
        }

        // Keep things calm: cap speed so the web never tears apart
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 4) {
          p.vx = (p.vx / speed) * 4;
          p.vy = (p.vy / speed) * 4;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Wrap around the screen for a continuous flow
        if (p.x < 0) p.x += width;
        else if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        else if (p.y > height) p.y -= height;
      }
    };

    const draw = () => {
      const rgb: RGB = [
        lerp(LIGHT_RGB[0], DARK_RGB[0], themeMix),
        lerp(LIGHT_RGB[1], DARK_RGB[1], themeMix),
        lerp(LIGHT_RGB[2], DARK_RGB[2], themeMix),
      ];
      const colour = (alpha: number) => `rgba(${rgb[0] | 0}, ${rgb[1] | 0}, ${rgb[2] | 0}, ${alpha})`;

      ctx.clearRect(0, 0, width, height);

      // Spatial grid
      const grid: number[][] = new Array(cols * rows);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const key = Math.min(rows - 1, (p.y / LINK_DIST) | 0) * cols + Math.min(cols - 1, (p.x / LINK_DIST) | 0);
        (grid[key] ||= []).push(i);
      }

      // Links bucketed by opacity → one stroke() per bucket
      const paths = Array.from({ length: BUCKETS }, () => new Path2D());
      const linkDist2 = LINK_DIST * LINK_DIST;
      const glowR2 = (HOVER_RADIUS * 0.6) ** 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const cx = (p.x / LINK_DIST) | 0;
        const cy = (p.y / LINK_DIST) | 0;
        for (let oy = -1; oy <= 1; oy++) {
          const gy = cy + oy;
          if (gy < 0 || gy >= rows) continue;
          for (let ox = -1; ox <= 1; ox++) {
            const gx = cx + ox;
            if (gx < 0 || gx >= cols) continue;
            const cell = grid[gy * cols + gx];
            if (!cell) continue;
            for (const j of cell) {
              if (j <= i) continue;
              const q = particles[j];
              const dx = p.x - q.x;
              const dy = p.y - q.y;
              const d2 = dx * dx + dy * dy;
              if (d2 >= linkDist2) continue;

              let strength = 1 - Math.sqrt(d2) / LINK_DIST;
              // Brighten links inside the cursor cluster
              if (pointer.active) {
                const mx = (p.x + q.x) / 2 - pointer.x;
                const my = (p.y + q.y) / 2 - pointer.y;
                const m2 = mx * mx + my * my;
                if (m2 < glowR2) strength = Math.min(1, strength * (1 + 1.2 * (1 - m2 / glowR2)));
              }
              const bucket = Math.min(BUCKETS - 1, (strength * BUCKETS) | 0);
              paths[bucket].moveTo(p.x, p.y);
              paths[bucket].lineTo(q.x, q.y);
            }
          }
        }
      }

      ctx.lineWidth = 0.6;
      const maxAlpha = lerp(LINK_ALPHA, LINK_ALPHA * 1.25, themeMix);
      for (let b = 0; b < BUCKETS; b++) {
        ctx.strokeStyle = colour(maxAlpha * ((b + 1) / BUCKETS));
        ctx.stroke(paths[b]);
      }
    };

    const frame = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.667, 3); // in 60fps frames
      lastTime = time;

      // Adaptive quality: shed particles if the device can't hold ~45fps
      slowFrames = dt > 1.35 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
      if (slowFrames > 90 && particles.length > MIN_PARTICLES) {
        particles.length = Math.max(MIN_PARTICLES, Math.floor(particles.length * 0.85));
        slowFrames = 0;
      }

      themeMix += (themeTargetRef.current - themeMix) * Math.min(1, 0.08 * dt);
      step(dt);
      draw();
      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(rafId);
      lastTime = performance.now();
      rafId = requestAnimationFrame(frame);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const handlePointerLeave = () => {
      pointer.active = false;
    };
    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.clicked = true;
    };
    const handleVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else start();
    };
    const handleResize = () => {
      resize();
      if (reduceMotion) draw();
    };

    resize();
    window.addEventListener('resize', handleResize);

    if (reduceMotion) {
      // Static web: same look, no movement
      redrawRef.current = () => {
        themeMix = themeTargetRef.current;
        draw();
      };
      draw();
    } else {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerdown', handlePointerDown, { passive: true });
      document.documentElement.addEventListener('pointerleave', handlePointerLeave);
      document.addEventListener('visibilitychange', handleVisibility);
      start();
    }

    return () => {
      cancelAnimationFrame(rafId);
      redrawRef.current = () => {};
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isHidden]);

  if (isHidden) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default ParticleNetwork;
