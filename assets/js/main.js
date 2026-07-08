/* =========================================================================
   MAIN.JS — logic undangan digital
   Membaca semua teks dari CONFIG (assets/js/config.js) lalu merender ke DOM,
   menjalankan countdown, RSVP ke Google Sheets, musik latar, animasi scroll,
   dan bunga jatuh dekoratif.
   ========================================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------- GUEST NAME */
  function getGuestName() {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("to") || params.get("nama");
    if (!raw) return CONFIG.cover.defaultGuestName;
    return decodeURIComponent(raw.replace(/\+/g, " "));
  }

  /* ---------------------------------------------------------- RENDER TEXT */
  function renderContent() {
    const guestName = getGuestName();
    document.title = `The Wedding of ${CONFIG.groom.nickName} & ${CONFIG.bride.nickName}`;

    // cover
    text("cover-eyebrow", CONFIG.cover.eyebrow);
    text("cover-label", CONFIG.cover.guestLabel);
    text("cover-guest-name", guestName);
    document.getElementById("open-btn").textContent = CONFIG.cover.buttonText;

    // hero
    text("hero-eyebrow", CONFIG.cover.eyebrow);
    document.getElementById("hero-names").innerHTML =
      `${CONFIG.bride.nickName} <span class="amp">&amp;</span> ${CONFIG.groom.nickName}`;
    text("hero-date", formatLongDate(CONFIG.weddingDate));

    // opening
    text("opening-greeting", CONFIG.opening.greeting);
    text("opening-arabic", CONFIG.opening.arabicVerse);
    text("opening-translation", CONFIG.opening.verseTranslation);
    text("opening-source", CONFIG.opening.verseSource);
    text("opening-text", CONFIG.opening.openingText);

    // couple
    document.getElementById("bride-photo").src = CONFIG.images.bride;
    document.getElementById("groom-photo").src = CONFIG.images.groom;
    text("bride-nick", CONFIG.bride.nickName);
    text("bride-full", CONFIG.bride.fullName);
    text("bride-parents", CONFIG.bride.parents);
    text("bride-ig", CONFIG.bride.instagram);
    text("groom-nick", CONFIG.groom.nickName);
    text("groom-full", CONFIG.groom.fullName);
    text("groom-parents", CONFIG.groom.parents);
    text("groom-ig", CONFIG.groom.instagram);

    // events
    const list = document.getElementById("events-list");
    list.innerHTML = "";
    CONFIG.events.forEach((ev) => {
      const div = document.createElement("div");
      div.className = "event-card reveal";
      div.innerHTML = `
        <h3>${ev.name}</h3>
        <p class="meta">${ev.date}</p>
        <p class="meta">${ev.time}</p>
        <p class="meta">${ev.location}</p>
        <p class="addr">${ev.address}</p>
        <a class="btn outline" target="_blank" rel="noopener" href="${ev.mapsUrl}">Buka Google Maps</a>
      `;
      list.appendChild(div);
    });

    // closing
    text("closing-text", CONFIG.closing.text);
    text("closing-signoff", CONFIG.closing.signOff);
    text("closing-names", `${CONFIG.bride.nickName} & ${CONFIG.groom.nickName}`);
    text("footer-year", new Date().getFullYear());
  }

  function text(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value || "";
  }

  function formatLongDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString("id-ID", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
  }

  /* ---------------------------------------------------------- COVER OPEN */
  function initCover() {
    const cover = document.getElementById("cover");
    const btn = document.getElementById("open-btn");
    btn.addEventListener("click", () => {
      cover.classList.add("hide");
      document.body.style.overflow = "auto";
      playMusic();
      setTimeout(() => { cover.style.display = "none"; }, 950);
    });
  }

  /* ---------------------------------------------------------- COUNTDOWN */
  function initCountdown() {
    const target = new Date(CONFIG.weddingDate).getTime();
    function tick() {
      const now = Date.now();
      let diff = target - now;
      if (diff < 0) diff = 0;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      set("cd-days", d); set("cd-hours", h); set("cd-minutes", m); set("cd-seconds", s);
    }
    function set(id, val) {
      document.getElementById(id).textContent = String(val).padStart(2, "0");
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------------------------------------------------------- MUSIC */
  const audio = document.getElementById("bg-audio");
  const musicBtn = document.getElementById("music-toggle");

  function initMusic() {
    if (CONFIG.music && CONFIG.music.src) {
      audio.src = CONFIG.music.src;
    }
    musicBtn.addEventListener("click", () => {
      if (audio.paused) playMusic(); else pauseMusic();
    });
  }
  function playMusic() {
    if (!audio.src) return;
    audio.play().then(() => musicBtn.classList.add("spin")).catch(() => {});
  }
  function pauseMusic() {
    audio.pause();
    musicBtn.classList.remove("spin");
  }

  /* ---------------------------------------------------------- SCROLL REVEAL */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    items.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------- PETALS */
  function initPetals() {
    const layer = document.getElementById("petal-layer");
    const colors = ["#A2402F", "#D9A79A", "#C9A24B", "#6E7A3A"];
    const count = window.innerWidth < 480 ? 10 : 16;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "petal";
      const size = 6 + Math.random() * 8;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.left = Math.random() * 100 + "%";
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = 10 + Math.random() * 14 + "s";
      p.style.animationDelay = Math.random() * -20 + "s";
      layer.appendChild(p);
    }
  }

  /* ---------------------------------------------------------- RSVP */
  function initRsvp() {
    const form = document.getElementById("rsvp-form");
    const status = document.getElementById("rsvp-status");
    const submitBtn = document.getElementById("rsvp-submit");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const scriptUrl = CONFIG.rsvp.scriptUrl;
      if (!scriptUrl || scriptUrl.indexOf("PASTE_") === 0) {
        status.textContent = "RSVP belum terhubung ke Google Sheet. Lihat README.md.";
        status.className = "rsvp-status err";
        return;
      }
      const payload = {
        nama: document.getElementById("f-nama").value.trim(),
        kehadiran: document.getElementById("f-kehadiran").value,
        jumlah: document.getElementById("f-jumlah").value,
        ucapan: document.getElementById("f-ucapan").value.trim()
      };
      submitBtn.disabled = true;
      status.textContent = "Mengirim...";
      status.className = "rsvp-status";

      fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      })
        .then((r) => r.json())
        .then((res) => {
          if (res.status === "success") {
            status.textContent = "Terima kasih! Ucapan dan konfirmasi kamu sudah kami terima.";
            status.className = "rsvp-status ok";
            form.reset();
            document.getElementById("f-jumlah").value = 1;
            loadWishes();
          } else {
            throw new Error(res.message || "Gagal mengirim");
          }
        })
        .catch(() => {
          status.textContent = "Terjadi kesalahan, silakan coba lagi.";
          status.className = "rsvp-status err";
        })
        .finally(() => { submitBtn.disabled = false; });
    });

    loadWishes();
    if (CONFIG.rsvp.refreshInterval) {
      setInterval(loadWishes, CONFIG.rsvp.refreshInterval);
    }
  }

  function loadWishes() {
    const scriptUrl = CONFIG.rsvp.scriptUrl;
    const wrap = document.getElementById("wishes-list");
    if (!scriptUrl || scriptUrl.indexOf("PASTE_") === 0) {
      wrap.innerHTML = '<p class="wishes-empty">Daftar ucapan akan tampil di sini setelah Google Sheet terhubung.</p>';
      return;
    }
    fetch(scriptUrl)
      .then((r) => r.json())
      .then((res) => {
        if (res.status !== "success") return;
        const data = res.data || [];
        renderSummary(data);
        renderWishes(data);
      })
      .catch(() => {});
  }

  function renderSummary(data) {
    const hadir = data.filter((d) => d.kehadiran === "Hadir")
      .reduce((sum, d) => sum + (parseInt(d.jumlah, 10) || 1), 0);
    const tidak = data.filter((d) => d.kehadiran === "Tidak Hadir").length;
    document.getElementById("sum-hadir").textContent = hadir;
    document.getElementById("sum-tidak").textContent = tidak;
    document.getElementById("sum-total").textContent = data.length;
  }

  function renderWishes(data) {
    const wrap = document.getElementById("wishes-list");
    const withMsg = data.filter((d) => d.ucapan && d.ucapan.trim().length > 0);
    if (withMsg.length === 0) {
      wrap.innerHTML = '<p class="wishes-empty">Jadilah yang pertama mengirim ucapan &amp; doa!</p>';
      return;
    }
    wrap.innerHTML = withMsg.map((d) => `
      <div class="wish">
        <span class="who">${escapeHtml(d.nama)}</span><span class="att">${escapeHtml(d.kehadiran)}</span>
        <p class="msg">${escapeHtml(d.ucapan)}</p>
      </div>
    `).join("");
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---------------------------------------------------------- INIT */
  document.addEventListener("DOMContentLoaded", () => {
    document.body.style.overflow = "hidden";
    renderContent();
    initCover();
    initCountdown();
    initMusic();
    initReveal();
    initPetals();
    initRsvp();
  });
})();
