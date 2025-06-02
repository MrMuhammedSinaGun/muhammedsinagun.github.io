document.addEventListener("DOMContentLoaded", () => HackerUI.init());

const HackerUI = {
  init() {
    this.runSequence([
      this.checkNightWarning,
      this.restoreTheme,
      this.showTerminalMessage,
      this.startGlitchEffect,
      this.initMouseTrail,
      this.startMatrixRain,
      this.logConsoleGreeting,
      this.initScrollTopButton,
      this.setupCardHover,
      this.checkMobileWarning,
    ]);
  },

  runSequence(tasks) {
    tasks.reduce((prev, task) => {
      return prev.then(() => new Promise(res => {
        setTimeout(() => {
          task.call(this);
          res();
        }, 300);
      }));
    }, Promise.resolve());
  },

  checkNightWarning() {
    const hour = new Date().getHours();
    if (hour < 6) {
      this.showToast("⚠️ Gece çalışmak risklidir. Dinlen Komutan!", "#ff4444");
    }
  },

  showToast(message, color = "#0f0") {
    const toast = document.createElement("div");
    toast.textContent = message;
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "10%",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#111",
      color,
      padding: "16px 24px",
      fontFamily: "monospace",
      border: `1px solid ${color}`,
      borderRadius: "6px",
      boxShadow: `0 0 10px ${color}`,
      zIndex: 10000,
      animation: "fadeInOut 6s ease-in-out"
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 6000);
  },

  showTerminalMessage() {
    const box = document.createElement("div");
    box.innerHTML = `<pre style="margin:0">> Sistem başlatılıyor... Lütfen bekleyin...</pre>`;
    Object.assign(box.style, {
      position: "fixed", top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#000", color: "#0f0",
      padding: "20px 30px", fontFamily: "monospace",
      border: "1px solid lime", zIndex: 9999,
      boxShadow: "0 0 20px lime",
      animation: "fadeInOut 4s ease-in-out"
    });
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 4000);
  },

  startGlitchEffect() {
    const el = document.querySelector(".glitch-text");
    if (!el) return;
    const text = el.textContent;
    el.textContent = "";
    let i = 0;
    const cursor = document.createElement("span");
    cursor.textContent = "|";
    cursor.style.animation = "blink 1s step-end infinite";
    el.appendChild(cursor);

    const type = () => {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i]), cursor);
        this.playSound("type");
        i++;
        setTimeout(type, 40 + Math.random() * 60);
      }
    };
    type();
  },

  initMouseTrail() {
    const trail = document.createElement("div");
    Object.assign(trail.style, {
      position: "fixed", width: "12px", height: "12px",
      borderRadius: "50%", background: "#00ffff99",
      mixBlendMode: "difference", pointerEvents: "none",
      transition: "transform 0.05s ease", zIndex: 9999
    });
    document.body.appendChild(trail);

    document.addEventListener("mousemove", (e) => {
      trail.style.transform = `translate(${e.pageX - 6}px, ${e.pageY - 6}px)`;
    });
  },

  startMatrixRain() {
    const rainDrop = () => {
      const span = document.createElement("span");
      span.textContent = Math.random() > 0.5 ? "1" : "0";
      Object.assign(span.style, {
        position: "fixed",
        left: `${Math.random() * 100}vw`,
        top: "0vh",
        fontSize: `${12 + Math.random() * 8}px`,
        color: "#0f0",
        fontFamily: "monospace",
        opacity: 0.1 + Math.random() * 0.5,
        zIndex: 0,
        animation: "fall 1.2s linear forwards"
      });
      document.body.appendChild(span);
      span.addEventListener("animationend", () => span.remove());
    };
    setInterval(rainDrop, 70);
  },

  logConsoleGreeting() {
    const hour = new Date().getHours();
    const greet = hour < 12 ? "Günaydın" : hour < 18 ? "İyi günler" : "İyi akşamlar";
    console.log(`%c${greet}, Komutan.`, "color:#58a6ff; font-weight:bold; font-size:16px;");
    console.log("%cSina burada. Kodlar çalışıyor 💻", "color:lime; font-size:14px;");
  },

  initScrollTopButton() {
    const btn = document.createElement("button");
    btn.textContent = "⬆️";
    Object.assign(btn.style, {
      position: "fixed", bottom: "30px", right: "30px",
      padding: "12px", background: "#111", color: "#0f0",
      border: "1px solid #0f0", borderRadius: "6px",
      fontSize: "20px", display: "none", zIndex: 999,
      cursor: "pointer", transition: "opacity 0.3s"
    });
    btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.appendChild(btn);

    window.addEventListener("scroll", () => {
      btn.style.display = window.scrollY > 100 ? "block" : "none";
    });
  },

  setupCardHover() {
    const cards = document.querySelectorAll("section li");
    cards.forEach(card => {
      Object.assign(card.style, {
        transition: "transform 0.3s ease, box-shadow 0.3s ease"
      });
      card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.05)";
        card.style.boxShadow = "0 10px 25px #0f05";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
        card.style.boxShadow = "none";
      });
    });
  },

  playSound(type) {
    const sources = {
      type: "assets/sound/type.wav",
      open: "assets/sound/open.wav",
      close: "assets/sound/close.wav"
    };
    const audio = new Audio(sources[type] || sources.type);
    audio.volume = 0.2;
    audio.play().catch(() => {});
  },

  toggleTheme() {
    const dark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  },

  restoreTheme() {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
    }
  },

  checkMobileWarning() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      console.log("%c📱 Mobil cihazda görünüm aktif.", "color:orange;");
    }
  }
};
