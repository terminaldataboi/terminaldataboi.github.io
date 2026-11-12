// ==========================================================================
// Terminal Data — SVG Builder
// Pure functions for building pixel-art SVG logo layers.
// No DOM coupling — receives parent element as argument.
// ==========================================================================

import SVG_NS from "./config.js";
import { PALETTE, GLYPHS, MINI_GLYPHS, FONT_5X5, CHEVRON_MAP, LOGO_TEXT, SVG_CONFIG } from "./config.js";

export function addPixelRect(parent, x, y, w, h, colorKey, extraClass = "") {
  const rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("width", w);
  rect.setAttribute("height", h);
  rect.setAttribute("data-color-key", colorKey);
  rect.setAttribute("fill", PALETTE[colorKey]);
  if (extraClass) rect.setAttribute("class", extraClass);
  parent.appendChild(rect);
  return rect;
}

export function renderBitmap(parent, bitmap, startX, startY, pixelW, pixelH, colorKey, extraClass = "") {
  const rects = [];
  for (let r = 0; r < bitmap.length; r++) {
    const row = bitmap[r];
    for (let c = 0; c < row.length; c++) {
      if (row[c] === "#") {
        rects.push(
          addPixelRect(parent, startX + c * pixelW, startY + r * pixelH, pixelW, pixelH, colorKey, extraClass)
        );
      }
    }
  }
  return rects;
}

export function buildMonitor(parent) {
  parent.innerHTML = "";
  const parts = [
    // Top bezel
    [13, 15, 102, 2], [11, 17, 106, 2], [10, 19, 108, 2],
    [21, 22, 86, 2], [19, 24, 90, 2], [18, 26, 92, 2],
    // Left side
    [8, 21, 3, 24], [16, 20, 2, 2], [15, 22, 2, 23], [18, 28, 3, 17],
    // Right side
    [107, 28, 3, 17], [117, 21, 3, 24],
    // Bottom bezel sides
    [8, 70, 3, 33], [15, 70, 2, 29], [18, 70, 3, 27],
    [107, 70, 3, 27], [117, 70, 3, 33],
    // Bottom bezel
    [19, 97, 90, 2], [21, 99, 86, 2], [23, 101, 82, 2],
    [10, 103, 108, 2], [11, 105, 106, 2], [13, 107, 102, 2], [15, 109, 98, 2],
    // Feet
    [37, 111, 5, 3], [45, 111, 5, 3], [79, 111, 5, 3]
  ];
  parts.forEach(([x, y, w, h]) => addPixelRect(parent, x, y, w, h, "slate", "mon-part"));
}

export function buildPrompt(parentChevron, parentCursor) {
  parentChevron.innerHTML = "";
  parentCursor.innerHTML = "";
  renderBitmap(parentChevron, CHEVRON_MAP, 26, 32, 1.6, 1.9, "tan", "prompt-part");
  addPixelRect(parentCursor, 32.5, 40, 8, 3.2, "tan", "cursor-block");
}

export function buildTerminalWordmark(parent) {
  parent.innerHTML = "";
  const { pxW, pxH, letterGap, startX, startY } = SVG_CONFIG.wordmark;
  let curX = startX;

  for (let i = 0; i < LOGO_TEXT.wordmark.length; i++) {
    const map = GLYPHS[LOGO_TEXT.wordmark[i]];
    const letterGroup = document.createElementNS(SVG_NS, "g");
    letterGroup.setAttribute("class", "term-letter");
    parent.appendChild(letterGroup);
    renderBitmap(letterGroup, map, curX, startY, pxW, pxH, "charcoal");
    curX += map[0].length * pxW + letterGap;
  }
}

export function buildTanBox(parent) {
  parent.innerHTML = "";
  const segments = [
    [26, 72.5, 25.5, 1.8], [72.5, 72.5, 27, 1.8],
    [26, 72.5, 1.8, 20.5], [97.7, 72.5, 1.8, 20.5],
    [26, 91.2, 73.5, 1.8]
  ];
  segments.forEach(([x, y, w, h]) => addPixelRect(parent, x, y, w, h, "tan", "tan-box-seg"));
}

export function buildDataHeader(parent) {
  parent.innerHTML = "";
  let x = SVG_CONFIG.dataHeader.startX;
  LOGO_TEXT.dataHeader.forEach((ch) => {
    renderBitmap(parent, MINI_GLYPHS[ch], x, SVG_CONFIG.dataHeader.startY,
      SVG_CONFIG.dataHeader.pxW, SVG_CONFIG.dataHeader.pxH, "charcoal", "data-px");
    x += 4.6;
  });
}

export function buildMagentaIcon(parent) {
  parent.innerHTML = "";
  const parts = [
    [32.5, 76.2, 1.8, 7.6],
    [34.3, 79.1, 7.6, 1.8],
    [32.5, 85.4, 1.8, 2.8],
    [32.5, 86.4, 9.4, 1.8]
  ];
  parts.forEach(([x, y, w, h]) => addPixelRect(parent, x, y, w, h, "magenta", "mag-part"));
}

export function buildSubText(parentArch, parentMgmt) {
  parentArch.innerHTML = "";
  parentMgmt.innerHTML = "";

  function renderLine(container, text, startX, startY, className) {
    let cx = startX;
    for (let i = 0; i < text.length; i++) {
      const map = FONT_5X5[text[i]];
      const charG = document.createElementNS(SVG_NS, "g");
      charG.setAttribute("class", className);
      container.appendChild(charG);
      renderBitmap(charG, map, cx, startY, 0.85, 0.92, "charcoal");
      cx += map[0].length * 0.85 + 0.85;
    }
  }

  renderLine(parentArch, LOGO_TEXT.subtextArch, SVG_CONFIG.subtext.startX, SVG_CONFIG.subtext.startYArch, "arch-char");
  renderLine(parentMgmt, LOGO_TEXT.subtextMgmt, SVG_CONFIG.subtext.startX, SVG_CONFIG.subtext.startYMgmt, "mgmt-char");
}
