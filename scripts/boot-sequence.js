// ==========================================================================
// Terminal Data — Boot Sequence
// CRT boot animation, glitch effects, telemetry text updates.
// ==========================================================================

import { BOOT_TIMING, TELEMETRY } from "./config.js";

let bootTimers = [];
let isBooting = false;

export function clearBootTimers() {
  bootTimers.forEach((id) => clearTimeout(id));
  bootTimers = [];
}

function schedule(fn, delay) {
  const id = setTimeout(fn, delay);
  bootTimers.push(id);
  return id;
}

export function triggerGlitch(duration = 260) {
  const svg = document.getElementById("terminal-svg");
  const rShift = document.getElementById("glitch-r");
  const bShift = document.getElementById("glitch-b");

  svg.classList.remove("glitch-active");
  void svg.offsetWidth;
  svg.classList.add("glitch-active");

  svg.setAttribute("filter", "url(#crt-glitch-filter)");
  rShift.setAttribute("dx", "1.4");
  bShift.setAttribute("dx", "-1.4");

  setTimeout(() => {
    rShift.setAttribute("dx", "-0.8");
    bShift.setAttribute("dx", "0.8");
  }, duration * 0.45);

  setTimeout(() => {
    svg.removeAttribute("filter");
    rShift.setAttribute("dx", "0");
    bShift.setAttribute("dx", "0");
    svg.classList.remove("glitch-active");
  }, duration);
}

export function playBootSequence(onReady) {
  clearBootTimers();
  isBooting = true;

  const telemetry = document.getElementById("telemetry-text");
  const ambientCanvas = document.getElementById("ambient-canvas");
  const beam = document.getElementById("crt-beam");

  ambientCanvas.classList.remove("active");
  telemetry.textContent = TELEMETRY.beamIgnition;

  // Gather all SVG parts
  const monParts = Array.from(document.querySelectorAll(".mon-part"));
  const promptParts = Array.from(document.querySelectorAll(".prompt-part"));
  const cursorBlock = document.querySelector(".cursor-block");
  const termLetters = Array.from(document.querySelectorAll(".term-letter"));
  const tanSegs = Array.from(document.querySelectorAll(".tan-box-seg"));
  const dataPxs = Array.from(document.querySelectorAll(".data-px"));
  const magParts = Array.from(document.querySelectorAll(".mag-part"));
  const archChars = Array.from(document.querySelectorAll(".arch-char"));
  const mgmtChars = Array.from(document.querySelectorAll(".mgmt-char"));

  // Reset all parts to hidden
  monParts.forEach((el) => {
    el.style.opacity = "0";
    el.style.transition = "opacity 0.14s steps(2)";
  });
  promptParts.forEach((el) => (el.style.opacity = "0"));
  if (cursorBlock) {
    cursorBlock.style.opacity = "0";
    cursorBlock.classList.remove("cursor-blink");
  }
  termLetters.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(-4px)";
    el.style.transition = "opacity 0.16s ease, transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)";
  });
  tanSegs.forEach((el) => {
    el.style.opacity = "0";
    el.style.transition = "opacity 0.22s ease";
  });
  dataPxs.forEach((el) => (el.style.opacity = "0"));
  magParts.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateX(-4px)";
    el.style.transition = "all 0.22s cubic-bezier(0.22, 1, 0.36, 1)";
  });
  archChars.forEach((el) => (el.style.opacity = "0"));
  mgmtChars.forEach((el) => (el.style.opacity = "0"));

  // Trigger CRT beam
  beam.classList.remove("animate-beam");
  void beam.offsetWidth;
  beam.classList.add("animate-beam");

  // Phase 1: Monitor chassis assembles
  schedule(() => {
    telemetry.textContent = TELEMETRY.mountingChassis;
    const sortedMon = [...monParts].sort((a, b) => {
      return Math.abs(parseFloat(a.getAttribute("y")) - 64) - Math.abs(parseFloat(b.getAttribute("y")) - 64);
    });
    sortedMon.forEach((el, idx) => schedule(() => (el.style.opacity = "1"), idx * BOOT_TIMING.monItemDelay));
  }, BOOT_TIMING.beamStart);

  // Phase 2: Prompt appears
  schedule(() => {
    telemetry.textContent = TELEMETRY.executeTerminal;
    promptParts.forEach((el, idx) => schedule(() => (el.style.opacity = "1"), idx * BOOT_TIMING.promptItemDelay));
    schedule(() => {
      if (cursorBlock) {
        cursorBlock.style.opacity = "1";
        cursorBlock.classList.add("cursor-blink");
      }
    }, BOOT_TIMING.cursorDelay);
  }, BOOT_TIMING.promptStart);

  // Phase 3: Wordmark loads with glitch
  schedule(() => {
    telemetry.textContent = TELEMETRY.loadingKernel;
    termLetters.forEach((letter, idx) => {
      schedule(() => {
        letter.style.opacity = "1";
        letter.style.transform = "translateY(0)";
        if (idx === termLetters.length - 1) triggerGlitch(BOOT_TIMING.glitchDuration);
      }, idx * BOOT_TIMING.textItemDelay);
    });
  }, BOOT_TIMING.textStart);

  // Phase 4: Data header, magenta icon, subtext
  schedule(() => {
    telemetry.textContent = TELEMETRY.dataSync;
    tanSegs.forEach((seg, idx) => schedule(() => (seg.style.opacity = "1"), idx * BOOT_TIMING.tanItemDelay));
    schedule(() => {
      dataPxs.forEach((px, idx) => schedule(() => (px.style.opacity = "1"), idx * BOOT_TIMING.dataItemDelay));
    }, BOOT_TIMING.archStartOffset);
    schedule(() => {
      magParts.forEach((part, idx) => {
        schedule(() => {
          part.style.opacity = "1";
          part.style.transform = "translateX(0)";
        }, idx * BOOT_TIMING.magItemDelay);
      });
    }, BOOT_TIMING.magStartOffset);
    schedule(() => {
      archChars.forEach((ch, idx) => schedule(() => (ch.style.opacity = "1"), idx * BOOT_TIMING.archCharDelay));
    }, BOOT_TIMING.archCharStartOffset);
    schedule(() => {
      mgmtChars.forEach((ch, idx) => schedule(() => (ch.style.opacity = "1"), idx * BOOT_TIMING.mgmtCharDelay));
    }, BOOT_TIMING.mgmtCharStartOffset);
  }, BOOT_TIMING.dataStart);

  // Phase 5: Boot complete
  schedule(() => {
    isBooting = false;
    ambientCanvas.classList.add("active");
    telemetry.textContent = TELEMETRY.ready;
    if (typeof onReady === "function") onReady();
  }, BOOT_TIMING.readyDelay);
}

export function isCurrentlyBooting() {
  return isBooting;
}
