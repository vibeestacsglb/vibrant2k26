# VIBRANT 2K26 — Website

A modern, production-ready event website built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion for VIBRANT 2K26, presented by Vibeesta Creative Society × Shrinik Club.

The website features a cinematic visual experience, responsive design, animated interactions, event information, schedule, gallery, sponsors, FAQs, and registration-focused sections.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000. The gallery lives at
http://localhost:3000/gallery.

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Editing content

Everything you'll need to update routinely lives in three places —
you should never need to touch `/components` for content changes.

| What | File |
|---|---|
| Registration link, dates, venue, contact, socials | `config/siteConfig.ts` |
| Events (Tech + Creative) | `data/events.ts` |
| Schedule | `data/schedule.ts` |
| Sponsors | `data/sponsors.ts` |
| FAQ | `data/faq.ts` |
| Gallery photos | `data/gallery.ts` |

### Turning on registration

`config/siteConfig.ts` → set `registrationUrl` to your external
registration link:

```ts
registrationUrl: "https://forms.gle/your-real-link",
```

Every "Register Now" button across the site (navbar, hero, event
sheets, final CTA, mobile sticky CTA) reads from this single value.
Until it's set, those buttons render a disabled-looking "Registration
Opening Soon" pill instead of a dead link.

### Adding a sponsor

`data/sponsors.ts`:

```ts
export const sponsors: Sponsor[] = [
  { id: "acme", name: "Acme Corp", tier: "Title Sponsor", logo: "/sponsors/acme.png" },
];
```

Drop the logo file in `public/sponsors/`.

### Adding gallery photos

`data/gallery.ts`:

```ts
export const galleryImages: GalleryImage[] = [
  {
    id: "hackathon-01",
    src: "/gallery/hackathon-01.jpg",
    alt: "Team presenting at the 36-Hour Hackathon",
    category: "tech",
    caption: "36-Hour Hackathon — Day 1",
    aspectRatio: "landscape",
  },
];
```

Drop the image file in `public/gallery/`. Aspect ratio can be
`"portrait"`, `"landscape"`, `"square"`, or `"wide"` — the masonry
grid uses this to lay images out without letterboxing.

### Filling in schedule times

`data/schedule.ts` — each day's `items` array is `null` until real
timings are confirmed (the UI shows "Schedule Coming Soon" in the
meantime):

```ts
{
  day: 1,
  dateLabel: "16 October",
  items: [
    { time: "10:00", title: "Registration & Check-in" },
    { time: "11:00", title: "Inauguration Ceremony" },
  ],
},
```

### Event details

`data/events.ts` — any field left as `null` renders "Coming Soon" in
that event's full-screen details sheet instead of a blank or
fabricated value.

## What's real vs. placeholder right now

Nothing in this build is fabricated. Where the organizing committee
hasn't confirmed information yet, the site honestly says so:

- No sponsors are listed (empty array, section shows "Sponsor
  announcements coming soon")
- No gallery photos exist yet (event hasn't happened — shows "Gallery
  Coming Soon")
- No schedule times are set (shows "Schedule Coming Soon" per day)
- Event fees, prizes, rules, coordinators, and contact info show
  "Coming Soon" until you fill them in
- Registration is disabled until `registrationUrl` is set

The only confirmed facts already wired in are: event name, tagline,
dates (16–17 Oct 2026), venue, the ₹4,00,000+ prize pool total, the
four Tech events and six Creative events named in the brief, and the
Vibeesta/Shrinik brand identities (using your actual uploaded logos).

## Design system notes (read this before changing colors/gradients)

This build went through a deliberate restraint pass. A few rules are
encoded in the code on purpose — please keep them if you extend the
site, or the "premium editorial" feel breaks down fast:

- **Gradient text (`.fusion-text`) is reserved for exactly two
  places:** the VIBRANT wordmark in the intro and hero, and the
  "IS LIVE" / "thank you" countdown states. Every other heading that
  needs an accent uses `.accent-rule` — a short two-color underline
  under a single word — instead of filling the whole heading with a
  gradient. Don't add `.fusion-text` to more headings; it's what
  makes AI-generated templates recognizable.
- **`.fusion-gradient` (solid gradient fill) is reserved for the
  primary Register CTA only.** Secondary actions ("Explore Events",
  the arena toggle) use underlines or borders, not a second pill.
- **`OrbitRing`** (`components/OrbitRing.tsx`) is the thin-line
  "orbit" motif — used once or twice per section (Hero, About, Prize
  Pool, final CTA), always off-center, never as a background filler.
- **`EventMotif`** (`components/EventMotif.tsx`) gives each event a
  bespoke thin-line icon instead of a generic icon-library glyph —
  add a new `case` here when you add a new event so it doesn't fall
  back to the plain circle.
- **`GrainOverlay`** (`components/GrainOverlay.tsx`) is a single
  fixed, ~3.5%-opacity SVG noise layer mounted once in
  `app/layout.tsx`. It should stay barely perceptible — if you can
  consciously see grain, turn `.grain-overlay`'s opacity down in
  `app/globals.css`, don't remove it outright.
- **Asymmetry is intentional**, not a bug: About and the Events
  header are laid out in uneven columns on desktop (heading on one
  side, visual on the other, offset vertically) rather than centered
  stacks. The first event card in each Tech/Creative view spans two
  grid columns as a "featured" poster. Resist the urge to re-center
  everything.
- Gold (`#C9A24B`, from Shrinik's logo) appears in exactly one place
  — a thin rule under the prize pool number. It is not a website
  color; don't extend it elsewhere.

## Known gap

No `vibrant.png` logo was ever uploaded — only the Vibeesta and
Shrinik marks were provided. The VIBRANT identity is typographic
(the `.fusion-text` wordmark) rather than a supplied logo file. If
the organizing committee has an actual VIBRANT lockup, drop it in
`public/logos/vibrant.png` and swap it in for the wordmark in
`components/Hero.tsx` and `components/IntroExperience.tsx`.

## Project structure

```
app/            Routes: / (home) and /gallery
components/     UI components — no hardcoded content
config/         siteConfig.ts — the one place for site-wide settings
data/           Events, schedule, sponsors, FAQ, gallery — all editable
lib/            Shared TypeScript types
public/logos/   Vibeesta + Shrinik brand marks (as provided, untouched)
public/events/  Drop event photos here if you add an `image` per event
public/gallery/ Drop gallery photos here
public/sponsors/Drop sponsor logos here
```

## Notes on the brand system

- Colors follow the brief's exact palette: Vibeesta violets
  (`#6D28D9`–`#C084FC`), Shrinik crimson (`#5A0018`–`#B91C3D`, with
  gold used only as a rare accent, never a base color), and an almost-
  black environment (`#07070B`–`#14121C`) for ~70–75% of the UI.
- The `.fusion-text` / `.fusion-gradient` utility classes (in
  `app/globals.css`) are the *only* gradient used anywhere on the
  site — reserved for the VIBRANT wordmark and the primary CTA, on
  purpose, so it stays meaningful instead of decorative.
- Motion is split into three intentional categories matching the
  brief: brand motion (intro, reveal), interaction motion (buttons,
  cards, toggle, event sheet), and scroll motion (section reveals,
  counters) — implemented with Framer Motion's `whileInView` and a
  handful of CSS transitions, nothing heavier.
- `prefers-reduced-motion` is respected in both the intro
  (`components/IntroExperience.tsx`) and globally in
  `app/globals.css`.
