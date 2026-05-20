// =========================================================
// Taste the World — shared site chrome (nav + footer)
// Edit nav/footer text ONCE here; every page picks it up.
// =========================================================

const SITE_NAME = "Let's Taste the World";
const SITE_EMOJI = "🌍";
const YOUTUBE_URL = "https://www.youtube.com/@Letstastetheworld-w2u";
const GITHUB_URL = "https://github.com/StarSpeaker2013/taste_the_world";

const NAV_LINKS = [
  { href: "index.html",       label: "Home" },
  { href: "about.html",       label: "About" },
  { href: "events.html",      label: "Events" },
  { href: "past-events.html", label: "Past Events" },
  { href: "teams.html",       label: "Teams" },
  { href: "videos.html",      label: "Videos" },
];

// ---- Build nav HTML ----
function renderNav() {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const links = NAV_LINKS.map((l) => {
    const isActive =
      l.href.toLowerCase() === path ||
      (l.href === "index.html" && (path === "" || path === "/"));
    return `<li><a href="${l.href}"${isActive ? ' class="active"' : ""}>${l.label}</a></li>`;
  }).join("");

  return `
    <header class="nav">
      <div class="container nav-inner">
        <a class="logo" href="index.html">
          <span class="logo-emoji">${SITE_EMOJI}</span>
          ${SITE_NAME}
        </a>
        <button class="nav-toggle" aria-label="Menu">☰ Menu</button>
        <nav>
          <ul>${links}</ul>
        </nav>
      </div>
    </header>
  `;
}

// ---- Build footer HTML ----
function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer>
      <div class="foot-emoji">🌍🍜🥟🌮🥖🍵</div>
      <p>© ${year} ${SITE_NAME} — Every table is a world.</p>
      <p>
        <a href="${YOUTUBE_URL}" target="_blank" rel="noopener">YouTube</a>
        &nbsp;•&nbsp;
        <a href="${GITHUB_URL}" target="_blank" rel="noopener">GitHub</a>
      </p>
    </footer>
  `;
}

// ---- Inject into placeholders ----
function injectChrome() {
  const navMount = document.getElementById("site-nav");
  if (navMount) navMount.outerHTML = renderNav();

  const footerMount = document.getElementById("site-footer");
  if (footerMount) footerMount.outerHTML = renderFooter();
}

// ---- Mobile nav toggle (delegated, works after injection) ----
document.addEventListener("click", (e) => {
  const toggle = e.target.closest(".nav-toggle");
  if (toggle) {
    const nav = toggle.closest(".nav");
    nav?.classList.toggle("open");
  }
});

// ---- Reveal-on-scroll for any .dyk-card / .reveal ----
function setupReveal() {
  const items = document.querySelectorAll(".dyk-card, .reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => io.observe(el));
}

// ---- Boot ----
function init() {
  injectChrome();
  setupReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}