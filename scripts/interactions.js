// ===========================================================================
// Terminal Data — Interactions
// Theme toggle, scanlines toggle, logo tilt, glitch pulse, toast notifications,
// and B2B/B2C audience mode toggle with copy swapping.
// Receives playBootSequence as a dependency-injected callback.
// ===========================================================================

import { PALETTE, TOAST_MESSAGES, COPY, getMode, setMode, loadSavedMode } from "./config.js";
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

// ===========================================================================
// Audience Mode Toggle — B2B / B2C Copy Swapping
// ===========================================================================

const MODE_LABELS = { b2b: "B2B", b2c: "B2C" };
const MODE_TOAST = { b2b: "Business (B2B) mode", b2c: "Personal (B2C) mode" };

function swapCopy() {
  const mode = getMode();
  const dict = COPY;

  // Text content swaps for data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] && dict[key][mode]) {
      el.textContent = dict[key][mode];
    }
  });

  // Mailto link subject line swap
  const mailtoLink = document.getElementById("mailto-link");
  if (mailtoLink && dict.mailtoSubject && dict.mailtoSubject[mode]) {
    const encoded = encodeURIComponent(dict.mailtoSubject[mode]);
    mailtoLink.href = `mailto:YOUR_EMAIL@DOMAIN.COM?subject=${encoded}`;
  }

  // Update toggle button label
  const btn = document.getElementById("btn-audience");
  if (btn) {
    btn.textContent = MODE_LABELS[mode];
    btn.title = mode === "b2c" ? "Switch to Business (B2B)" : "Switch to Personal (B2C)";
  }
}

function toggleAudienceMode() {
  const current = getMode();
  const next = current === "b2c" ? "b2b" : "b2c";
  setMode(next);
  swapCopy();
  triggerGlitch(200);
  showToast(MODE_TOAST[next]);
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

  // Audience mode toggle (B2B / B2C)
  const btnAudience = document.getElementById("btn-audience");
  if (btnAudience) {
    btnAudience.addEventListener("click", toggleAudienceMode);
  }

  // Listen for URL hash changes (e.g., direct link with #b2b)
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "b2b" || hash === "b2c") {
      setMode(hash);
      swapCopy();
    }
  });

  // On init: load saved mode and apply copy
  loadSavedMode();
  swapCopy();
}
