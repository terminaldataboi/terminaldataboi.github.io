(function () {
  const SVG_NS = "http://www.w3.org/2000/svg";

  // Brand 5-Color Matte Palette Tokens
  const PALETTE = {
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

  let isDarkMode = false;
  let scanlinesEnabled = true;
  let bootTimers = [];
  let isBooting = false;

  function addPixelRect(parent, x, y, w, h, colorKey, extraClass = "") {
    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", w);
    rect.setAttribute("height", h);
    rect.setAttribute("data-color-key", colorKey);
    rect.setAttribute("fill", (isDarkMode ? PALETTE.dark : PALETTE.light)[colorKey]);
    if (extraClass) rect.setAttribute("class", extraClass);
    parent.appendChild(rect);
    return rect;
  }

  function renderBitmap(parent, bitmap, startX, startY, pixelW, pixelH, colorKey, extraClass = "") {
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

  function buildMonitor() {
    const g = document.getElementById("layer-monitor");
    g.innerHTML = "";
    addPixelRect(g, 13, 15, 102, 2, "slate", "mon-part");
    addPixelRect(g, 11, 17, 106, 2, "slate", "mon-part");
    addPixelRect(g, 10, 19, 108, 2, "slate", "mon-part");
    addPixelRect(g, 21, 22, 86, 2, "slate", "mon-part");
    addPixelRect(g, 19, 24, 90, 2, "slate", "mon-part");
    addPixelRect(g, 18, 26, 92, 2, "slate", "mon-part");

    addPixelRect(g, 8, 21, 3, 24, "slate", "mon-part");
    addPixelRect(g, 16, 20, 2, 2, "slate", "mon-part");
    addPixelRect(g, 15, 22, 2, 23, "slate", "mon-part");
    addPixelRect(g, 18, 28, 3, 17, "slate", "mon-part");
    addPixelRect(g, 107, 28, 3, 17, "slate", "mon-part");
    addPixelRect(g, 117, 21, 3, 24, "slate", "mon-part");

    addPixelRect(g, 8, 70, 3, 33, "slate", "mon-part");
    addPixelRect(g, 15, 70, 2, 29, "slate", "mon-part");
    addPixelRect(g, 18, 70, 3, 27, "slate", "mon-part");
    addPixelRect(g, 107, 70, 3, 27, "slate", "mon-part");
    addPixelRect(g, 117, 70, 3, 33, "slate", "mon-part");

    addPixelRect(g, 19, 97, 90, 2, "slate", "mon-part");
    addPixelRect(g, 21, 99, 86, 2, "slate", "mon-part");
    addPixelRect(g, 23, 101, 82, 2, "slate", "mon-part");

    addPixelRect(g, 10, 103, 108, 2, "slate", "mon-part");
    addPixelRect(g, 11, 105, 106, 2, "slate", "mon-part");
    addPixelRect(g, 13, 107, 102, 2, "slate", "mon-part");
    addPixelRect(g, 15, 109, 98, 2, "slate", "mon-part");

    addPixelRect(g, 37, 111, 5, 3, "slate", "mon-part");
    addPixelRect(g, 45, 111, 5, 3, "slate", "mon-part");
    addPixelRect(g, 79, 111, 5, 3, "slate", "mon-part");
  }

  function buildPrompt() {
    const gChev = document.getElementById("layer-prompt-chevron");
    const gCurs = document.getElementById("layer-prompt-cursor");
    gChev.innerHTML = "";
    gCurs.innerHTML = "";
    const chevronMap = ["##...", ".##..", "..##.", ".##..", "##..."];
    renderBitmap(gChev, chevronMap, 26, 32, 1.6, 1.9, "tan", "prompt-part");
    addPixelRect(gCurs, 32.5, 40, 8, 3.2, "tan", "cursor-block");
  }

  function buildTerminalWordmark() {
    const g = document.getElementById("layer-terminal-text");
    g.innerHTML = "";
    const GLYPHS = {
      T: ["#######", "#######", "...#...", "...#...", "...#...", "...#...", "...#...", "...#...", "...#..."],
      E: ["######", "######", "##....", "##....", "#####.", "#####.", "##....", "######", "######"],
      R: ["######.", "#######", "##...##", "##...##", "######.", "#####..", "##..##.", "##...##", "##...##"],
      M: ["##.....##", "###...###", "####.####", "##.###.##", "##..#..##", "##.....##", "##.....##", "##.....##", "##.....##"],
      I: ["######", "######", "..##..", "..##..", "..##..", "..##..", "..##..", "######", "######"],
      N: ["##....##", "###...##", "####..##", "##.##.##", "##..####", "##...###", "##....##", "##....##", "##....##"],
      A: ["..####..", ".######.", "##....##", "##....##", "########", "########", "##....##", "##....##", "##....##"],
      L: ["##....", "##....", "##....", "##....", "##....", "##....", "##....", "######", "######"]
    };

    const word = "TERMINAL";
    const pxW = 1.95;
    const pxH = 2.05;
    const letterGap = 2.2;
    let curX = 2.2;
    const startY = 49.2;

    for (let i = 0; i < word.length; i++) {
      const map = GLYPHS[word[i]];
      const letterGroup = document.createElementNS(SVG_NS, "g");
      letterGroup.setAttribute("class", "term-letter");
      g.appendChild(letterGroup);
      renderBitmap(letterGroup, map, curX, startY, pxW, pxH, "charcoal");
      curX += map[0].length * pxW + letterGap;
    }
  }

  function buildTanBox() {
    const g = document.getElementById("layer-tan-box");
    g.innerHTML = "";
    addPixelRect(g, 26, 72.5, 25.5, 1.8, "tan", "tan-box-seg");
    addPixelRect(g, 72.5, 72.5, 27, 1.8, "tan", "tan-box-seg");
    addPixelRect(g, 26, 72.5, 1.8, 20.5, "tan", "tan-box-seg");
    addPixelRect(g, 97.7, 72.5, 1.8, 20.5, "tan", "tan-box-seg");
    addPixelRect(g, 26, 91.2, 73.5, 1.8, "tan", "tan-box-seg");
  }

  function buildDataHeader() {
    const g = document.getElementById("layer-data-text");
    g.innerHTML = "";
    const MINI = {
      D: ["###.", "#..#", "#..#", "#..#", "###."],
      A: [".##.", "#..#", "####", "#..#", "#..#"],
      T: ["####", ".##.", ".##.", ".##.", ".##."]
    };
    let x = 53.5;
    ["D", "A", "T", "A"].forEach((ch) => {
      renderBitmap(g, MINI[ch], x, 70.4, 0.95, 1.0, "charcoal", "data-px");
      x += 4.6;
    });
  }

  function buildMagentaIcon() {
    const g = document.getElementById("layer-magenta-icon");
    g.innerHTML = "";
    addPixelRect(g, 32.5, 76.2, 1.8, 7.6, "magenta", "mag-part");
    addPixelRect(g, 34.3, 79.1, 7.6, 1.8, "magenta", "mag-part");
    addPixelRect(g, 32.5, 85.4, 1.8, 2.8, "magenta", "mag-part");
    addPixelRect(g, 32.5, 86.4, 9.4, 1.8, "magenta", "mag-part");
  }

  function buildSubText() {
    const gArch = document.getElementById("layer-subtext-arch");
    const gMgmt = document.getElementById("layer-subtext-mgmt");
    gArch.innerHTML = "";
    gMgmt.innerHTML = "";

    const FONT_5X5 = {
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

    function renderLine(container, text, startX, startY, cls) {
      let cx = startX;
      for (let i = 0; i < text.length; i++) {
        const map = FONT_5X5[text[i]];
        const charG = document.createElementNS(SVG_NS, "g");
        charG.setAttribute("class", cls);
        container.appendChild(charG);
        renderBitmap(charG, map, cx, startY, 0.85, 0.92, "charcoal");
        cx += map[0].length * 0.85 + 0.85;
      }
    }

    renderLine(gArch, "ARCHITECTURE", 43.8, 77.6, "arch-char");
    renderLine(gMgmt, "MANAGEMENT", 43.8, 84.2, "mgmt-char");
  }

  function applyThemeColors() {
    const active = isDarkMode ? PALETTE.dark : PALETTE.light;
    document.querySelectorAll("#terminal-svg rect[data-color-key]").forEach((el) => {
      const key = el.getAttribute("data-color-key");
      if (active[key]) el.setAttribute("fill", active[key]);
    });
  }

  function clearBootTimers() {
    bootTimers.forEach((id) => clearTimeout(id));
    bootTimers = [];
  }

  function schedule(fn, delay) {
    const id = setTimeout(fn, delay);
    bootTimers.push(id);
    return id;
  }

  function triggerGlitch(duration = 260) {
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

  function playBootSequence() {
    clearBootTimers();
    isBooting = true;

    const telemetry = document.getElementById("telemetry-text");
    const statusDot = document.getElementById("status-dot");
    const ambientCanvas = document.getElementById("ambient-canvas");
    const beam = document.getElementById("crt-beam");

    statusDot.classList.remove("ready");
    ambientCanvas.classList.remove("active");
    telemetry.textContent = "SYS.BOOT // CRT_BEAM_IGNITION...";

    const monParts = Array.from(document.querySelectorAll(".mon-part"));
    const promptParts = Array.from(document.querySelectorAll(".prompt-part"));
    const cursorBlock = document.querySelector(".cursor-block");
    const termLetters = Array.from(document.querySelectorAll(".term-letter"));
    const tanSegs = Array.from(document.querySelectorAll(".tan-box-seg"));
    const dataPxs = Array.from(document.querySelectorAll(".data-px"));
    const magParts = Array.from(document.querySelectorAll(".mag-part"));
    const archChars = Array.from(document.querySelectorAll(".arch-char"));
    const mgmtChars = Array.from(document.querySelectorAll(".mgmt-char"));

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

    beam.classList.remove("animate-beam");
    void beam.offsetWidth;
    beam.classList.add("animate-beam");

    schedule(() => {
      telemetry.textContent = "SYS.BOOT // MOUNTING_CHASSIS_GRID...";
      const sortedMon = [...monParts].sort((a, b) => {
        return Math.abs(parseFloat(a.getAttribute("y")) - 64) - Math.abs(parseFloat(b.getAttribute("y")) - 64);
      });
      sortedMon.forEach((el, idx) => schedule(() => (el.style.opacity = "1"), idx * 14));
    }, 220);

    schedule(() => {
      telemetry.textContent = "SYS.BOOT // EXEC >_ TERMINAL.SYS";
      promptParts.forEach((el, idx) => schedule(() => (el.style.opacity = "1"), idx * 24));
      schedule(() => {
        if (cursorBlock) {
          cursorBlock.style.opacity = "1";
          cursorBlock.classList.add("cursor-blink");
        }
      }, 220);
    }, 720);

    schedule(() => {
      telemetry.textContent = "SYS.BOOT // LOADING_CORE_KERNEL...";
      termLetters.forEach((letter, idx) => {
        schedule(() => {
          letter.style.opacity = "1";
          letter.style.transform = "translateY(0)";
          if (idx === termLetters.length - 1) triggerGlitch(240);
        }, idx * 55);
      });
    }, 1080);

    schedule(() => {
      telemetry.textContent = "SYS.BOOT // DATA_ARCHITECTURE_SYNC...";
      tanSegs.forEach((seg, idx) => schedule(() => (seg.style.opacity = "1"), idx * 50));
      schedule(() => {
        dataPxs.forEach((px, idx) => schedule(() => (px.style.opacity = "1"), idx * 6));
      }, 140);
      schedule(() => {
        magParts.forEach((part, idx) => {
          schedule(() => {
            part.style.opacity = "1";
            part.style.transform = "translateX(0)";
          }, idx * 45);
        });
      }, 260);
      schedule(() => {
        archChars.forEach((ch, idx) => schedule(() => (ch.style.opacity = "1"), idx * 28));
      }, 340);
      schedule(() => {
        mgmtChars.forEach((ch, idx) => schedule(() => (ch.style.opacity = "1"), idx * 28));
      }, 520);
    }, 1680);

    schedule(() => {
      isBooting = false;
      statusDot.classList.add("ready");
      ambientCanvas.classList.add("active");
      telemetry.textContent = "TERMINAL.OS // ONLINE — BOISE, ID";
    }, 2550);
  }

  function initAmbientParticles() {
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

    const colors = ["#C88A58", "#C71D45", "#2D3748"];
    for (let i = 0; i < 22; i++) {
      particles.push({
        x: Math.random() * 400,
        y: Math.random() * 400,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.15 - Math.random() * 0.22,
        size: Math.random() > 0.65 ? 3 : 2,
        color: colors[i % colors.length],
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

  let toastTimer;
  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
  }

  function initInteractions() {
    const card = document.getElementById("logo-card");
    const btnReplay = document.getElementById("btn-replay");
    const btnTheme = document.getElementById("btn-theme");
    const btnScanlines = document.getElementById("btn-scanlines");
    const scanlineOverlay = document.getElementById("scanline-overlay");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${nx * 8}deg) rotateX(${-ny * 8}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateY(0deg) rotateX(0deg)";
    });

    card.addEventListener("click", () => {
      if (!isBooting) {
        triggerGlitch(280);
        showToast("CRT Sync Pulse Executed");
      }
    });

    card.addEventListener("dblclick", () => {
      playBootSequence();
      showToast("Rebooting TERMINAL sequence...");
    });

    btnReplay.addEventListener("click", () => {
      playBootSequence();
      showToast("Rebooting TERMINAL sequence...");
    });

    btnTheme.addEventListener("click", () => {
      isDarkMode = !isDarkMode;
      document.body.classList.toggle("dark-mode", isDarkMode);
      btnTheme.textContent = isDarkMode ? "Light Studio" : "Dark CRT";
      applyThemeColors();
      triggerGlitch(200);
      showToast(isDarkMode ? "Dark CRT Phosphor Active" : "Light Studio Canvas Active");
    });

    btnScanlines.addEventListener("click", () => {
      scanlinesEnabled = !scanlinesEnabled;
      scanlineOverlay.classList.toggle("hidden-scanlines", !scanlinesEnabled);
      btnScanlines.textContent = scanlinesEnabled ? "Scanlines: On" : "Scanlines: Off";
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    buildMonitor();
    buildPrompt();
    buildTerminalWordmark();
    buildTanBox();
    buildDataHeader();
    buildMagentaIcon();
    buildSubText();
    initAmbientParticles();
    initInteractions();
    playBootSequence();
  });
})();
