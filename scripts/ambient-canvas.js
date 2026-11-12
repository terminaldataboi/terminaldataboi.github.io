// ==========================================================================
// Terminal Data — Ambient Particle Canvas
// Self-contained particle system behind the logo card.
// ==========================================================================

import { BOOT_TIMING } from "./config.js";

export function initAmbientParticles() {
  const canvas = document.getElementById("ambient-canvas");
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  const particles = [];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  window.addEventListener("resize", resize);

  // Initialize particles
  for (let i = 0; i < BOOT_TIMING.particleCount; i++) {
    particles.push({
      x: Math.random() * 400,
      y: Math.random() * 400,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -BOOT_TIMING.particleSpeedMin - Math.random() * (BOOT_TIMING.particleSpeedMax - BOOT_TIMING.particleSpeedMin),
      size: Math.random() > BOOT_TIMING.largeParticleThreshold ? BOOT_TIMING.particleSizeLarge : BOOT_TIMING.particleSizeSmall,
      color: BOOT_TIMING.ambientColors[i % BOOT_TIMING.ambientColors.length],
      alpha: 0.14 + Math.random() * 0.24
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const centerDist = Math.abs(p.y - height * 0.48);
      const fade = centerDist < height * 0.16 ? 0.2 : 1;

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha * fade;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  animate();
}
