// =========================================================
// Taste the World — shared site chrome (nav + footer)
// Edit nav/footer text ONCE here; every page picks it up.
// =========================================================

const SITE_NAME = "Taste the World";
const SITE_LOGO = "logo.png";   // shown in nav, replaces emoji if present
const SITE_EMOJI = "🌍";        // fallback if no logo image
const YOUTUBE_URL = "https://www.youtube.com/@Letstastetheworld-w2u";
const GITHUB_URL = "https://github.com/StarSpeaker2013/taste_the_world";
const CONTACT_EMAIL = "tastetheworldclub@gmail.com";

// ---- Join-Us options shown in the modal (edit here site-wide) ----
const JOIN_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdL-Aq02keZZsdgJH57eDbtHjSxjwm_f60ij9ETdrwIEyZvjA/viewform?usp=dialog";
const JOIN_DISCORD_URL = "#"; // optional: paste your Discord invite URL here

// Kick-Off (June 14) dedicated RSVP form — includes waiver, allergy, etc.
const KICKOFF_RSVP_URL = "https://docs.google.com/forms/d/e/1FAIpQLScYoGW7gK5VGsl7YRMzsSXBXELZYWC3IPuo9j2V59iEnRg8FA/viewform";
const JOIN_OPTIONS = [
  {
    key: "discord",
    icon: "🎮",
    title: "Discord Server",
    desc: "Scan or tap to hop into our Discord community.",
    qr: "pic/discord-qr.png",
    url: JOIN_DISCORD_URL,
  },
  {
    key: "wechat",
    icon: "💬",
    title: "WeChat Group",
    desc: "Scan with WeChat to join our parents' chat group.",
    qr: "pic/wechat-qr.png",
  },
  {
    key: "form",
    icon: "📝",
    title: "Sign Up Form",
    desc: "Fill out a quick form so we can keep you in the loop.",
    cta: "Open Form ↗",
    url: JOIN_FORM_URL,
  },
];

// ---- Partners / Sponsors (edit here to update site-wide) ----
const PARTNERS = {
  parent: {
    label: "A club of",
    name: "CAST-LA",
    logo: "pic/castla-logo.png",
    url:  "#",
  },
  sponsors: [
    {
      label: "Venue sponsor",
      name: "Triple I",
      logo: "pic/triple-i-logo.png",
      url:  "#",
    },
  ],
};

const NAV_LINKS = [
  { href: "index.html",       label: "Home" },
  { href: "about.html",       label: "About" },
  { href: "events.html",      label: "Events" },
  { href: "past-events.html", label: "Past Events" },
  { href: "teams.html",       label: "Teams" },
  { href: "videos.html",      label: "Videos" },
  { href: "mascot.html",      label: "Mascot" },
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
function partnerCardHtml(p) {
  if (!p) return "";
  const inner = `
    <span class="partner-label">${p.label}</span>
    <div class="partner-logo-wrap">
      <img src="${p.logo}" alt="${p.name} logo" class="partner-logo" loading="lazy"
           onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'partner-name-fallback',textContent:'${p.name.replace(/'/g,"\\'")}'}))">
    </div>
    <span class="partner-name">${p.name}</span>
  `;
  return p.url && p.url !== "#"
    ? `<a class="partner-card" href="${p.url}" target="_blank" rel="noopener">${inner}</a>`
    : `<div class="partner-card">${inner}</div>`;
}

function renderFooter() {
  const year = new Date().getFullYear();
  const parentHtml = partnerCardHtml(PARTNERS.parent);
  const sponsorsHtml = (PARTNERS.sponsors || []).map(partnerCardHtml).join("");

  return `
    <footer>
      <div class="partners">
        ${parentHtml ? `<div class="partners-group">${parentHtml}</div>` : ""}
        ${sponsorsHtml ? `<div class="partners-group">${sponsorsHtml}</div>` : ""}
      </div>

      <div class="foot-emoji">🌍🍜🥟🌮🥖🍵</div>
      <p>© ${year} ${SITE_NAME} — Every table is a world.</p>
      <p>
        <a href="mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Hello from ' + SITE_NAME + ' website')}">📮 Contact Us</a>
        &nbsp;•&nbsp;
        <a href="${YOUTUBE_URL}" target="_blank" rel="noopener">YouTube</a>
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

  injectJoinModal();
}

// =========================================================
// Join-Us modal (Form / WeChat QR / Discord QR)
// =========================================================
function joinOptionHtml(o) {
  const media = o.qr
    ? `<div class="join-qr-wrap">
         <img src="${o.qr}" alt="${o.title} QR code" class="join-qr" loading="lazy"
              onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'join-qr-fallback',innerHTML:'QR coming soon<br><small>(${o.qr})</small>'}))">
       </div>`
    : `<div class="join-icon">${o.icon}</div>`;

  const action = o.url && o.url !== "#"
    ? `<a class="btn primary" href="${o.url}" target="_blank" rel="noopener">${o.cta || "Open ↗"}</a>`
    : (o.qr ? `<span class="join-hint">📱 Scan the QR code</span>` : "");

  return `
    <div class="join-option">
      <div class="join-option-head">
        <span class="join-option-icon">${o.icon}</span>
        <h3>${o.title}</h3>
      </div>
      ${media}
      <p class="join-option-desc">${o.desc}</p>
      ${action}
    </div>
  `;
}

function injectJoinModal() {
  if (document.getElementById("join-modal")) return;
  const modal = document.createElement("div");
  modal.id = "join-modal";
  modal.className = "join-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="join-backdrop" data-join-close></div>
    <div class="join-dialog" role="dialog" aria-modal="true" aria-labelledby="join-title">
      <button class="join-close" aria-label="Close" data-join-close>×</button>
      <h2 id="join-title">🍜 Join the Taste the World fam!</h2>
      <p class="join-sub">Pick whichever works best for you — we'll see you soon.</p>
      <div class="join-options">
        ${JOIN_OPTIONS.map(joinOptionHtml).join("")}
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function openJoinModal() {
  const m = document.getElementById("join-modal");
  if (!m) return;
  m.classList.add("open");
  m.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeJoinModal() {
  const m = document.getElementById("join-modal");
  if (!m) return;
  m.classList.remove("open");
  m.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Open modal for any link/button with data-join, OR an <a href> ending with #join
document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-join], a[href$='#join']");
  if (trigger) {
    e.preventDefault();
    openJoinModal();
    return;
  }
  if (e.target.closest("[data-join-close]")) {
    closeJoinModal();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeJoinModal();
});

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

  const highlights = (e.highlights && e.highlights.length)
    ? `<ul class="event-highlights">
         ${e.highlights.map(h => `<li>${h}</li>`).join("")}
       </ul>`
    : "";

  const notice = e.notice
    ? `<p class="event-notice">${e.notice}</p>`
    : "";

  const flyer = e.flyer
    ? `<a class="event-flyer" href="${e.flyer}" target="_blank" rel="noopener" title="Click to view full flyer">
         <img src="${e.flyer}" alt="${e.title} flyer" loading="lazy">
       </a>`
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
    : (e.walkIn
        ? "" // no RSVP button for walk-in events
        : (e.joinUrl && e.joinUrl !== "#"
            ? `<a class="btn primary" href="${e.joinUrl}" target="_blank" rel="noopener">RSVP →</a>`
            : `<a class="btn primary" href="#join" data-join>Request to Join →</a>`));

  const rsvpBadge = (!past && e.rsvpCountUrl)
    ? `<span class="rsvp-badge" data-rsvp-url="${e.rsvpCountUrl}" data-event-id="${e.id}">
         <span class="rsvp-dot"></span>👥 <span class="rsvp-count">…</span> going
       </span>`
    : "";

  return `
    <div class="event reveal" id="${e.id}">
      <div class="event-date">
        <span class="m">${monthLabel}</span>
        <span class="d">${e.emoji || "🍽️"}</span>
      </div>
      <div>
        <h3>${e.title}</h3>
        ${flyer}
        <p>${e.description || ""}</p>
        <small>📅 ${dateLine} &nbsp;•&nbsp; 📍 ${e.location || "Location TBA"} &nbsp;•&nbsp; ${e.audience || ""}</small>
        ${notice}
        ${rsvpBadge}
        ${highlights}
        ${ingredients}
        ${video}
      </div>
      ${action}
    </div>
  `;
}

// Fetch RSVP counts for any element with .rsvp-badge and update.
// Source of truth for the URL is each event's `rsvpCountUrl` in events.json.
// If a badge has data-event-id, we look up the URL from events.json automatically.
async function loadRsvpCounts(root = document) {
  const badges = root.querySelectorAll(".rsvp-badge");
  if (!badges.length) return;

  // Build event-id -> url map from events.json once
  let urlMap = {};
  try {
    const events = await loadEvents();
    events.forEach(e => { if (e.rsvpCountUrl) urlMap[e.id] = e.rsvpCountUrl; });
  } catch { /* ignore — direct data-rsvp-url still works */ }

  badges.forEach(async (badge) => {
    let url = badge.getAttribute("data-rsvp-url");
    const eid = badge.getAttribute("data-event-id");
    if (!url && eid && urlMap[eid]) url = urlMap[eid];
    if (!url) { badge.style.display = "none"; return; }
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      const n = (data.people != null) ? data.people
              : (data.families != null) ? data.families
              : null;
      const countEl = badge.querySelector(".rsvp-count");
      if (n != null && countEl) {
        countEl.textContent = String(n);
        if (data.people != null && data.families != null) {
          badge.title = `${data.families} families`;
        }
        badge.style.display = ""; // un-hide if it was hidden
      } else if (countEl) {
        countEl.textContent = "—";
        badge.style.display = "";
      }
    } catch (err) {
      console.warn("RSVP count fetch failed:", err);
      badge.style.display = "none"; // silently hide on failure
    }
  });
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
  loadRsvpCounts(mount);
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
  loadRsvpCounts(document); // also pick up any hard-coded badges (e.g. home banner)
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}