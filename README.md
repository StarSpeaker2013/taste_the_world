# 🌍 Let's Taste the World

A playful, kid-friendly website for **Taste the World** — a weekly video series
and monthly hands-on event exploring food, history, and cultures around the
globe.

> Every dish is a story. Every table is a world.

---

## ✨ What's inside

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Hero video + "Did you know…" + manifesto + CTAs |
| About | `about.html` | The story and mission behind the project |
| Events | `events.html` | Upcoming monthly events and culture days |
| Past Events | `past-events.html` | Archive (empty state to start) |
| Teams & Missions | `teams.html` | How kid-led teams and missions work |
| Videos | `videos.html` | Weekly YouTube episodes (7 videos embedded from the channel) |

Plus:

- `assets/css/styles.css` — playful & colorful theme
- `assets/js/main.js` — mobile nav, scroll reveal, active link
- `.nojekyll` — tells GitHub Pages to serve the site as-is

No build step, no frameworks — just HTML, CSS, and a tiny bit of JavaScript.

---

## 🚀 Run locally

Just open `index.html` in your browser, or serve the folder:

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then visit <http://localhost:8000>.

---

## 🌐 Publish on GitHub Pages

This repo is already set up for GitHub Pages.

1. Push to GitHub:

   ```bash
   git add .
   git commit -m "Initial Taste the World site"
   git push origin main
   ```

2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - **Source**: *Deploy from a branch*
   - **Branch**: `main` / `/ (root)`
4. Save. After a minute your site will be live at:

   ```
   https://starspeaker2013.github.io/taste_the_world/
   ```

---

## ✏️ Customize

- **Hero video** — replace the YouTube ID `teLaFd6qhcY` in `index.html` with
  your new hero video ID once it's ready.
- **Add a video** — in `videos.html`, copy an existing `.video-card` block,
  change the YouTube `embed/VIDEO_ID`, and update the title/description.
- **Events** — edit `data/events.json`; the home-page preview and upcoming
  event cards are rendered automatically. Include confirmed dates, locations,
  registration links, and any special pricing or donation instructions in the
  event details. The December 6, 2026 Christmas special is free, sponsored by
  CAST-LA, and collects wish-list gifts for Children's Hospital of Orange County
  (CHOC).
- **Past Events** — events move to `past-events.html` automatically after
  their date. Update their entry in `data/events.json` with photos or recap links.
- **Event photos** — keep event-day photos in `pic/Event/<Month>/` (for example,
  `pic/Event/October/`), separate from country-specific dish previews and flyers.
  Update the event's `eventPhotos` paths and any recap or carousel references.
  For carousel folders, update `FOLDERS` in `scripts/build-manifest.js` and run
  `node scripts/build-manifest.js` to generate their image lists.
- **Colors** — tweak CSS variables in `assets/css/styles.css` under `:root`.

**YouTube channel:** <https://www.youtube.com/@Letstastetheworld-w2u>

---

## 🎨 Theme

Playful & colorful — warm food-inspired palette:

- Terracotta `#e8593c`
- Mustard `#f5b800`
- Teal `#2bb7a8`
- Plum `#6b3fa0`
- Cream background

Fonts: **Fredoka** (display) + **Nunito** (body), loaded from Google Fonts.

---

🌎🍜🥟🌮🥖🍵 *Let's taste the world.*