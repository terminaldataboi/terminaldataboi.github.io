// ==========================================================================
// Terminal Data — Main Orchestrator
// Wires all modules together on DOMContentLoaded.
// Entry point — nothing else should import this.
// ==========================================================================

import { buildMonitor, buildPrompt, buildTerminalWordmark, buildTanBox, buildDataHeader, buildMagentaIcon, buildSubText } from "./svg-builder.js";
import { initAmbientParticles } from "./ambient-canvas.js";
import { initInteractions } from "./interactions.js";
import { playBootSequence } from "./boot-sequence.js";

function onBootReady() {
  // Callback fired when boot sequence completes.
  // Extend here for analytics, logging, etc.
}

document.addEventListener("DOMContentLoaded", () => {
  // Build SVG logo layers
  buildMonitor(document.getElementById("layer-monitor"));
  buildPrompt(
    document.getElementById("layer-prompt-chevron"),
    document.getElementById("layer-prompt-cursor")
  );
  buildTerminalWordmark(document.getElementById("layer-terminal-text"));
  buildTanBox(document.getElementById("layer-tan-box"));
  buildDataHeader(document.getElementById("layer-data-text"));
  buildMagentaIcon(document.getElementById("layer-magenta-icon"));
  buildSubText(
    document.getElementById("layer-subtext-arch"),
    document.getElementById("layer-subtext-mgmt")
  );

  // Initialize ambient particles
  initAmbientParticles();

  // Wire up all interactions (passes playBootSequence reference)
  initInteractions(playBootSequence, onBootReady);

  // Play initial boot sequence
  playBootSequence(onBootReady);
});
