// ==========================================================================
// Terminal Data — Configuration
// Brand palette, animation timings, content strings.
// Edit these values to customize without touching logic.
// ==========================================================================

const SVG_NS = "http://www.w3.org/2000/svg";

export const PALETTE = {
  light: {
    slate: "#39495E",
    charcoal: "#071907",
    tan: "#F5CB61",
    magenta: "#DB1F47"
  },
  dark: {
    slate: "#6B7B8D",
    charcoal: "#E8E4DF",
    tan: "#B8A070",
    magenta: "#C45A6A"
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
  ambientColors: ["#F5CB61", "#DB1F47", "#39495E"]
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

// ===========================================================================
// Audience Mode Toggle (B2B / B2C)
// ===========================================================================

let currentMode = "b2c"; // default to consumer/family mode

export function getMode() {
  return currentMode;
}

export function setMode(mode) {
  if (mode !== "b2b" && mode !== "b2c") return;
  currentMode = mode;
  // Persist preference in URL hash (no page reload needed)
  if (window.location.hash !== `#${mode}`) {
    history.replaceState(null, "", `#${mode}`);
  }
  // Persist in sessionStorage for same-session recall
  sessionStorage.setItem("terminal-audience", mode);
}

export function loadSavedMode() {
  // Priority: URL hash > sessionStorage > default
  const hash = window.location.hash.replace("#", "");
  if (hash === "b2b" || hash === "b2c") {
    currentMode = hash;
    return;
  }
  const stored = sessionStorage.getItem("terminal-audience");
  if (stored === "b2b" || stored === "b2c") {
    currentMode = stored;
  }
}

// ===========================================================================
// Copy Dictionary — B2B (business/technical) vs B2C (consumer/family)
// Keys match data-i18n attributes in index.html
// ===========================================================================

export const COPY = {
  eyebrow: {
    b2b: "BOISE, IDAHO // AIR-GAPPED SYSTEMS",
    b2c: "BOISE, IDAHO // PRIVATE PERSONAL ARCHIVES"
  },
  headline: {
    b2b: "Your files, consolidated and under your control—without touching the cloud.",
    b2c: "Rescue your scattered photos, videos, and files—and keep them off the cloud."
  },
  lead: {
    b2b: "Terminal Data builds deterministic, local-first storage and archive systems for businesses, photographers, and families drowning in scattered drives and unindexed files.",
    b2c: "We gather decades of family memories and personal documents from old hard drives, phones, and laptops into one clean, private digital vault you actually own."
  },
  heroBtn: {
    b2b: "Book Free Data Triage",
    b2c: "Book Free Drive Checkup"
  },
  sectionLabel: {
    b2b: "01 // ARCHITECTURE & TRIAGE",
    b2c: "01 // HOW WE HELP"
  },
  sectionTitle: {
    b2b: "Deterministic Local Workflows",
    b2c: "Simple, Private File Organization"
  },
  card1Title: {
    b2b: "Drive Consolidation",
    b2c: "Old Drive Rescue"
  },
  card1Body: {
    b2b: "Merge years of loose external drives, SD cards, and legacy workstations into a single, deduplicated, human-readable directory hierarchy.",
    b2c: "Gather years of loose hard drives, thumb drives, and memory cards into one clean, easy-to-browse folder system—with all duplicate files removed."
  },
  card2Title: {
    b2b: "Media & Record Indexing",
    b2c: "Photo & Document Sorting"
  },
  card2Body: {
    b2b: "Automated EXIF chronological sorting for RAW/photo libraries, paired with local OCR extraction for legacy PDFs and business archives.",
    b2c: "Automatically organize tens of thousands of family photos and videos by date, and make scanned paperwork and PDFs easy to search."
  },
  card3Title: {
    b2b: "Sovereign Backups",
    b2c: "Private Home Backups"
  },
  card3Body: {
    b2b: "On-premise, air-gapped backup architectures engineered for multi-decade durability—zero recurring cloud fees or third-party exposure.",
    b2c: "Set up a reliable, physical backup system right in your home that lasts for decades—with zero monthly cloud subscriptions or privacy leaks."
  },
  ctaEyebrow: {
    b2b: "INITIAL DIAGNOSTIC // NO OBLIGATION",
    b2c: "FREE CONSULTATION // NO PRESSURE"
  },
  ctaTitle: {
    b2b: "Start with a Free 30-Minute Data & Storage Triage",
    b2c: "Start with a Free 30-Minute Photo & File Checkup"
  },
  ctaBody: {
    b2b: "Not sure what is sitting on your old drives or how to structure a growing archive? We will map out your current storage footprint, identify silent data-rot risks, and hand you a plain-English action plan.",
    b2c: "Not sure what is trapped on a drawer full of old hard drives or laptops? We will review what you have, flag any failing drives before memories are lost, and give you a simple plan to get everything organized."
  },
  mailtoSubject: {
    b2b: "Terminal Data - Free Business Triage",
    b2c: "Terminal Data - Free Personal Checkup"
  }
};

export default SVG_NS;
