// ==========================================================================
// Terminal Data — Configuration
// Brand palette, animation timings, content strings.
// Edit these values to customize without touching logic.
// ==========================================================================

const SVG_NS = "http://www.w3.org/2000/svg";

export const PALETTE = {
  light: {
    slate: "#2D3748",
    charcoal: "#121316",
    tan: "#C88A58",
    magenta: "#C71D45"
  },
  dark: {
    slate: "#64748B",
    charcoal: "#F4F5F7",
    tan: "#D49B6A",
    magenta: "#E12D56"
  }
};

export const BOOT_TIMING = {
  beamStart: 220,
  monItemDelay: 14,
  promptStart: 720,
  promptItemDelay: 24,
  cursorDelay: 220,
  textStart: 1080,
  textItemDelay: 55,
  glitchDuration: 240,
  dataStart: 1680,
  tanItemDelay: 50,
  dataItemDelay: 6,
  magItemDelay: 45,
  archCharDelay: 28,
  mgmtCharDelay: 28,
  archStartOffset: 140,
  magStartOffset: 260,
  archCharStartOffset: 340,
  mgmtCharStartOffset: 520,
  readyDelay: 2550,
  particleCount: 22,
  particleSpeedMin: 0.15,
  particleSpeedMax: 0.37,
  particleSizeLarge: 3,
  particleSizeSmall: 2,
  largeParticleThreshold: 0.65,
  ambientColors: ["#C88A58", "#C71D45", "#2D3748"]
};

export const GLYPHS = {
  T: ["#######", "#######", "...#...", "...#...", "...#...", "...#...", "...#...", "...#...", "...#..."],
  E: ["######", "######", "##....", "##....", "#####.", "#####.", "##....", "######", "######"],
  R: ["######.", "#######", "##...##", "##...##", "######.", "#####..", "##..##.", "##...##", "##...##"],
  M: ["##.....##", "###...###", "####.####", "##.###.##", "##..#..##", "##.....##", "##.....##", "##.....##", "##.....##"],
  I: ["######", "######", "..##..", "..##..", "..##..", "..##..", "..##..", "######", "######"],
  N: ["##....##", "###...##", "####..##", "##.##.##", "##..####", "##...###", "##....##", "##....##", "##....##"],
  A: ["..####..", ".######.", "##....##", "##....##", "########", "########", "##....##", "##....##", "##....##"],
  L: ["##....", "##....", "##....", "##....", "##....", "##....", "##....", "######", "######"]
};

export const MINI_GLYPHS = {
  D: ["###.", "#..#", "#..#", "#..#", "###."],
  A: [".##.", "#..#", "####", "#..#", "#..#"],
  T: ["####", ".##.", ".##.", ".##.", ".##."]
};

export const FONT_5X5 = {
  A: [".##.", "#..#", "####", "#..#", "#..#"],
  R: ["###.", "#..#", "###.", "#.#.", "#..#"],
  C: [".###", "#...", "#...", "#...", ".###"],
  H: ["#..#", "#..#", "####", "#..#", "#..#"],
  I: ["###", ".#.", ".#.", ".#.", "###"],
  T: ["####", ".##.", ".##.", ".##.", ".##."],
  E: ["####", "#...", "###.", "#...", "####"],
  U: ["#..#", "#..#", "#..#", "#..#", ".##."],
  M: ["#...#", "##.##", "#.#.#", "#...#", "#...#"],
  N: ["#..#", "##.#", "#.##", "#..#", "#..#"],
  G: [".###", "#...", "#.##", "#..#", ".###"]
};

export const CHEVRON_MAP = ["##...", ".##..", "..##.", ".##..", "##..."];

export const LOGO_TEXT = {
  wordmark: "TERMINAL",
  dataHeader: ["D", "A", "T", "A"],
  subtextArch: "ARCHITECTURE",
  subtextMgmt: "MANAGEMENT"
};

export const TELEMETRY = {
  initializing: "SYS.BOOT // INITIALIZING...",
  beamIgnition: "SYS.BOOT // CRT_BEAM_IGNITION...",
  mountingChassis: "SYS.BOOT // MOUNTING_CHASSIS_GRID...",
  executeTerminal: "SYS.BOOT // EXEC >_ TERMINAL.SYS",
  loadingKernel: "SYS.BOOT // LOADING_CORE_KERNEL...",
  dataSync: "SYS.BOOT // DATA_ARCHITECTURE_SYNC...",
  ready: "TERMINAL.OS // ONLINE — BOISE, ID"
};

export const TOAST_MESSAGES = {
  glitch: "CRT Sync Pulse Executed",
  reboot: "Rebooting TERMINAL sequence...",
  darkMode: "Dark CRT Phosphor Active",
  lightMode: "Light Studio Canvas Active"
};

export const SVG_CONFIG = {
  wordmark: { pxW: 1.95, pxH: 2.05, letterGap: 2.2, startX: 2.2, startY: 49.2 },
  dataHeader: { startX: 53.5, startY: 70.4, pxW: 0.95, pxH: 1.0 },
  subtext: { startX: 43.8, startYArch: 77.6, startYMgmt: 84.2, pxW: 0.85, pxH: 0.92 },
  magentaIcon: { x: 32.5, y: 76.2 },
  tanBox: { y: 72.5 }
};

export default SVG_NS;
