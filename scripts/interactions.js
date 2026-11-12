// ==========================================================================
// Terminal Data — Interactions
// Theme toggle, scanlines toggle, logo tilt, glitch pulse, toast notifications.
// Receives playBootSequence as a dependency-injected callback.
// ==========================================================================

import { PALETTE, TOAST_MESSAGES } from "./config.js";
import { triggerGlitch, isCurrentlyBooting } from "./boot-sequence.js";

let isDarkMode = false;
let scanlinesEnabled = true;

export function applyThemeColors() {
  const active = isDarkMode ? PALETTE.dark : PALETTE.light;
  document.querySelectorAll("#terminal-svg rect[data-color-key]").forEach((el) => {
    const key = el.getAttribute("data-color-key");
    if (active[key]) el.setAttribute("fill", active[key]);
  });
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2000);
}

export function initInteractions(bootSequenceFn, onBootReady) {
  const card = document.getElementById("logo-card");
  const btnReplay = document.getElementById("btn-replay");
  const btnTheme = document.getElementById("btn-theme");
  const btnScanlines = document.getElementById("btn-scanlines");
  const scanlineOverlay = document.getElementById("scanline-overlay");

  // 3D tilt on mouse move
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${nx * 8}deg) rotateX(${-ny * 8}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
  });

  // Click: glitch pulse
  card.addEventListener("click", () => {
    if (!isCurrentlyBooting()) {
      triggerGlitch(280);
      showToast(TOAST_MESSAGES.glitch);
    }
  });

  // Double-click: replay boot
  card.addEventListener("dblclick", () => {
    bootSequenceFn(onBootReady);
    showToast(TOAST_MESSAGES.reboot);
  });

  // Replay button
  btnReplay.addEventListener("click", () => {
    bootSequenceFn(onBootReady);
    showToast(TOAST_MESSAGES.reboot);
  });

  // Theme toggle
  btnTheme.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
    btnTheme.textContent = isDarkMode ? "Light Studio" : "Dark CRT";
    applyThemeColors();
    triggerGlitch(200);
    showToast(isDarkMode ? TOAST_MESSAGES.darkMode : TOAST_MESSAGES.lightMode);
  });

  // Scanlines toggle
  btnScanlines.addEventListener("click", () => {
    scanlinesEnabled = !scanlinesEnabled;
    scanlineOverlay.classList.toggle("hidden-scanlines", !scanlinesEnabled);
    btnScanlines.textContent = scanlinesEnabled ? "Scanlines: On" : "Scanlines: Off";
  });
}
