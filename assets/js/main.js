// =========================================================
// Taste the World — shared site chrome (nav + footer)
// Edit nav/footer text ONCE here; every page picks it up.
// =========================================================

const SITE_NAME = "Taste the World";
const SITE_LOGO = "logo.png";   // shown in nav, replaces emoji if present
const SITE_EMOJI = "🌍";        // fallback if no logo image
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
  // Normalize: strip trailing slash, take last segment, strip ".html"
  // Handles "/events.html", "/events", "/", "/foo/", etc.
  let raw = location.pathname.replace(/\/+$/, "");        // trim trailing /
  let seg = raw.split("/").pop().toLowerCase();           // last segment
  seg = seg.replace(/\.html?$/, "");                      // drop .html
  const currentKey = seg || "index";                      // "" -> "index"

  const links = NAV_LINKS.map((l) => {
    const linkKey = l.href.toLowerCase().replace(/\.html?$/, "");
    const isActive = linkKey === currentKey;
    return `<li><a href="${l.href}"${isActive ? ' class="active"' : ""}>${l.label}</a></li>`;
  }).join("");

  return `
    <header class="nav">
      <div class="container nav-inner">
        <a class="logo" href="index.html">
          ${SITE_LOGO
            ? `<img class="logo-img" src="${SITE_LOGO}" alt="${SITE_NAME} logo">`
            : `<span class="logo-emoji">${SITE_EMOJI}</span>`}
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

// =========================================================
// Events: load JSON, auto-split upcoming vs past by today
// =========================================================
const EVENTS_JSON_URL = "data/events.json";
const MONTH_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function parseEventDate(iso) {
  // "2026-08-02" -> Date at local midnight (avoid UTC off-by-one)
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatLongDate(d) {
  if (!d) return "Date TBA";
  return d.toLocaleDateString("en-US", {
    weekday: "short", year: "numeric", month: "short", day: "numeric"
  });
}

function ytEmbedUrl(url) {
  if (!url) return "";
  // Accept full youtube.com/watch?v=ID, youtu.be/ID, or embed URL
  let id = "";
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) id = u.pathname.slice(1);
    else if (u.searchParams.get("v")) id = u.searchParams.get("v");
    else if (u.pathname.includes("/embed/")) id = u.pathname.split("/embed/")[1];
  } catch { /* not a URL — assume raw id */ id = url; }
  return id ? `https://www.youtube.com/embed/${id}` : "";
}

function eventCardHtml(e, { past = false } = {}) {
  const d = parseEventDate(e.date);
  const monthLabel = e.monthLabel
    || (d ? `${MONTH_SHORT[d.getMonth()]} ${d.getDate()}` : "TBA");
  const dateLine = e.dateLabel
    || (d ? formatLongDate(d) : "Date TBA");

  const ingredients = (e.ingredients && e.ingredients.length)
    ? `<details class="ingredients">
         <summary>🛒 Ingredients (${e.ingredients.length})</summary>
         <ul>${e.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
       </details>`
    : "";

  const embed = ytEmbedUrl(e.youtubeUrl);
  const video = past && embed
    ? `<div class="event-video">
         <iframe src="${embed}" title="${e.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
       </div>`
    : "";

  const action = past
    ? (e.youtubeUrl
        ? `<a class="btn ghost" href="${e.youtubeUrl}" target="_blank" rel="noopener">Watch recap ↗</a>`
        : `<span class="btn ghost" style="cursor:default;opacity:.7;">Recap coming</span>`)
    : `<a class="btn primary" href="${e.joinUrl || "#"}" target="_blank" rel="noopener">Request to Join →</a>`;

  return `
    <div class="event reveal" id="${e.id}">
      <div class="event-date">
        <span class="m">${monthLabel}</span>
        <span class="d">${e.emoji || "🍽️"}</span>
      </div>
      <div>
        <h3>${e.title}</h3>
        <p>${e.description || ""}</p>
        <small>📅 ${dateLine} &nbsp;•&nbsp; 📍 ${e.location || "Location TBA"} &nbsp;•&nbsp; ${e.audience || ""}</small>
        ${ingredients}
        ${video}
      </div>
      ${action}
    </div>
  `;
}

async function loadEvents() {
  try {
    const res = await fetch(EVENTS_JSON_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load events.json");
    const data = await res.json();
    return Array.isArray(data.events) ? data.events : [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

function todayMidnight() {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}

async function renderUpcomingEvents() {
  const mount = document.getElementById("upcoming-events");
  if (!mount) return;
  const events = await loadEvents();
  const today = todayMidnight();
  const upcoming = events
    .filter(e => {
      const d = parseEventDate(e.date);
      return d && d >= today;
    })
    .sort((a, b) => parseEventDate(a.date) - parseEventDate(b.date));

  if (!upcoming.length) {
    mount.innerHTML = `
      <div class="empty">
        <span class="big-emoji">📅</span>
        <h2>No upcoming events yet</h2>
        <p>New events are added regularly — check back soon!</p>
      </div>`;
    return;
  }

  mount.innerHTML = upcoming.map(e => eventCardHtml(e, { past: false })).join("");
  setupReveal();
}

async function renderPastEvents() {
  const mount = document.getElementById("past-events");
  if (!mount) return;
  const events = await loadEvents();
  const today = todayMidnight();
  const past = events
    .filter(e => {
      const d = parseEventDate(e.date);
      return d && d < today;
    })
    .sort((a, b) => parseEventDate(b.date) - parseEventDate(a.date)); // newest first

  if (!past.length) {
    mount.innerHTML = `
      <div class="empty">
        <span class="big-emoji">🍳</span>
        <h2>The kitchen is warming up…</h2>
        <p>Our very first event is just around the corner. Come back soon to see
           photos, posters, and the dishes we cooked together — or join us and
           help write the first chapter!</p>
        <a class="btn primary" href="events.html">See Upcoming Events</a>
      </div>`;
    return;
  }

  mount.innerHTML = past.map(e => eventCardHtml(e, { past: true })).join("");
  setupReveal();
}

// ---- Boot ----
function init() {
  injectChrome();
  setupReveal();
  renderUpcomingEvents();
  renderPastEvents();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}