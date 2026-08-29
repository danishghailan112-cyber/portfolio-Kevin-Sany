# SanyVisual — Photographer & Videographer Portfolio

A Next.js portfolio site for Muhammad Kevin Sany, built to match the provided
UI design (dark theme, sticky navigation, Photographer/Videographer toggle,
click-to-enlarge photo lightbox, click-to-play video lightbox with sound).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To build for production:

```bash
npm run build
npm run start
```

## Project structure

The site is a **single page** — About, Portfolio, and Contact are all
sections on `/`, and the navbar scrolls smoothly between them (with the
active link tracked as you scroll) instead of linking to separate routes.

```
app/
  page.js               → The whole site: stacks the three sections below
  layout.js              → Root layout, fonts, wraps the page with the navbar
  globals.css             → Design tokens (colors, fonts) and global styles

components/
  Navbar.js              → Sticky nav bar, anchor-scroll links, scroll-spy active state, mobile menu
  AboutSection.js         → Hero / About section (#about)
  PortfolioGallery.js     → Portfolio section (#portfolio) — tabs, grids, format toggle
  ContactSection.js       → Contact section (#contact)
  Lightbox.js             → Shared modal used for both the photo and video popups
  Reveal.js               → Scroll-in fade/slide animation wrapper

lib/
  data.js                 → All editable content: photos, videos, contact info

public/
  images/                  → Profile photo + portfolio images
  icons/                   → Contact icons (black + white versions)
  videos/                  → Portfolio video clips + auto-generated posters
```

## Editing content

Everything you're likely to want to change lives in **`lib/data.js`**:

- **`photos`** — the Photographer grid. Add a new object (with `src`,
  `title`, `caption`, `meta`) and drop the matching image into
  `public/images/portfolio/` to add another project.
- **`videos`** — the Videographer grid, filtered by `orientation`
  ("horizontal" / "vertical") to match the format toggle. Two entries use
  `type: "youtube"` (KEBLINGER and Lajur Caping Kalo, embedded from
  YouTube); the other 47 use `type: "local"` and point at the mp4 files in
  `public/videos/`. To add another local clip: drop the file in
  `public/videos/horizontal/` or `public/videos/vertical/`, add a poster
  frame to `public/videos/posters/`, and add a matching entry here.
- **`contact`** — phone, email and Instagram values shown on the Contact
  page. The phone/email currently mirror the placeholder values from your
  design file (`088xxxxxx`, `aku112@gmail.com`) — swap in your real details
  before publishing.

## About the video files

The 47 local clips were transcoded from your original raw footage (H.264,
720p/1280px max, ~2–24MB each) so the site loads reasonably fast — the
originals totalled over 2GB, the web-ready versions total about 320MB.
Poster thumbnails were auto-extracted from each clip.

**For production, consider hosting video on a dedicated service** (YouTube
unlisted, Cloudflare Stream, Mux, Bunny.net, etc.) rather than serving
~320MB of video directly from the app — it'll load faster for visitors and
most hosting platforms have deployment size limits this may bump into.
Swapping a `local` entry to `youtube` (or any hosted URL) is a small change
in `lib/data.js` and `PortfolioGallery.js`.

## Notes

- The Videographer format toggle (Horizontal/Vertical) now filters to the
  photographer's actual horizontally- and vertically-shot projects — 13
  horizontal videos, 36 vertical videos, each paginated with "see more".
- All copy on the site is in English per the brief.
- No contact form / message input was added, per the brief.
