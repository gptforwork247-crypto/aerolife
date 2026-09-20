# Latest homepage reference review

final result: blocked

## Source and scope
- Latest user attachment: 1366 × 4027 homepage reference.
- Matching local source: first 4027px of `/Users/tada/Downloads/Aircraft Aerolife Website 1.png`.
- Source comparison copy: `/tmp/aerolife-home-reference.png`.
- Focused source crops inspected this turn: header, hero, services, partnership, story, contact.
- Implementation: http://localhost:4173/
- Implementation screenshot: unavailable; no rendered visual pass is claimed.
- Intended viewports: 1366px desktop; 900px and 768px tablet; 390px and 320px mobile.
- Density normalization: pending browser capture.

## Changes made from source evidence and implementation inspection
1. Typography: replaced Poppins with Montserrat headings/navigation branding and Lato body text; Noto Sans Thai retained. Corrected typography hierarchy, weights, service titles and statistic labels.
2. Header: round Thai/UK flag buttons, reference-sized navigation and wordmark. Mobile navigation activates before desktop links run out of space.
3. Hero: retained the user's compact height preference. Removed the extra CTA absent from the source. Trimmed transparent margins on the supplied doctor's image and positioned the subject directly. Split SVG motifs into four proportionally scaled corner assets, avoiding both distortion and centered blank margins.
4. Statistics: enlarged numerical hierarchy, restored inline labels and the rounded white overlap.
5. Services: matched desktop card width, icon circles, interior icon size, vertical spacing, typography and copy. Mobile cards retain the source's centered composition.
6. Partnership: reproduced the five reference marks using crops from the supplied reference, replacing the previously substituted partner logos. The original fileforvibe logos remain in assets.
7. Story: restored the edge-aligned video and narrower right-hand copy. Local thumbnail from the specified video; click loads the YouTube embed. The thumbnail is a different frame from the reference, and full-resolution thumbnail is unavailable. Red source annotations are excluded.
8. Patient voices: large center letter with cropped neighboring letters, animated next/previous, autoplay, pause, hover/focus pause, reduced-motion support and full-letter dialog. Removed the added subtitle and per-card captions.
9. Care statement: corrected heading/body hierarchy and surrounding whitespace.
10. Contact: homepage now ends with the reference's three blue contact rows. Both phone links and email work as protocol links. LinkedIn name is text because no confirmed profile URL was supplied.
11. Team content preserved at `/?page=team` through the header rather than appended to the homepage. Removed the extra CTA and multi-column footer absent from the latest reference.

## Verification
- Production build: passed after final edits.
- All hero SVG assets: XML parsed; uniform preserveAspectRatio checked.
- Reference PNG assets: opened and validated.
- Video thumbnail: retrieved and visually inspected; saved locally.
- Browser screenshot, console, overflow and interaction checks: pending.

## Blocker
The session does not expose the required in-app Browser Node REPL execution tool. User permission for direct Playwright was requested and is still pending. Do not claim screenshot comparison, responsive browser verification, or interaction testing has passed.

## Required next checks
- Capture desktop and mobile implementations alongside the source; inspect typography, spacing, palette, artwork and copy.
- Fix any remaining visual differences using those captures.
- Verify no horizontal overflow at 320, 390, 768, 900 and 1366px.
- Exercise mobile menu, language switch, Team navigation, video, carousel wraparound/pause, keyboard-accessible modal and reduced motion.
- Check browser console and resource loading.

---

# Revert log — wrong reference supplied, then corrected

## What happened
A second reference image (554 × 1622, a different homepage concept: logo mark, centred nav, service-card
buttons, "Trusted by", "Our Motto", 2×2 footer) was supplied and implemented. The user then identified it as
the wrong file; the authoritative reference remains the 1366 × 4027 image
(`/Users/tada/Downloads/Aircraft Aerolife Website 1.png`). `src/App.jsx` and `src/styles.css` were restored
byte-for-byte to their pre-change state.

## Assets that had to be rebuilt
The project is not under version control, so assets deleted during the wrong-reference work were regenerated
from the correct 1366 × 4027 reference rather than recovered:

- `public/assets/reference/partner-1..5.png` — re-extracted from the reference partnership band
  (y 1604–1866) as white marks with per-pixel alpha, rendered at 3× for crispness. Verified to composite
  identically to the reference.
- `public/assets/hero-top-left.svg`, `hero-top-right.svg`, `hero-bottom-left.svg`, `hero-bottom-right.svg`,
  `hero-pattern.svg` — re-authored from geometry measured off the reference hero (y 186–879). All shapes are
  true circles with `preserveAspectRatio="xMidYMid meet"`. Corner box widths reproduce the existing CSS
  percentages exactly (450/1366 = 32.94%, 466/1366 = 34.12%, 400/1366 = 29.28%, 216/1366 = 15.81%).
  Measured geometry, in reference hero coordinates (1366 × 693), tones `#50689f` (navy) and `#476bb5` (blue):
  - navy disc c(16,126) r184; striped circle c(254,90) r98, stripes "/" 19px wide, 37.5px pitch;
    navy disc c(350,235) r30
  - blue ring c(1069,40) outer 167 inner 97; navy disc c(1281,145) r50; navy disc c(1195,214) r22
  - blue ring c(95,597) outer 167 inner 95
  - striped circle c(1400,492) r112, stripes "\"; navy disc c(1420,660) r150

## Two defects found and fixed during the revert
1. `public/assets/ICON homepage/*.png` were named with U+202F (narrow no-break space) before "PM", while
   `App.jsx` builds the URL with a plain space. The three service icons 404'd and fell through to the SPA
   index. Files renamed to use a regular space; `App.jsx` untouched.
2. `public/assets/story-poster.jpg` carried baked-in letterbox bars (480 × 360 with 45px black top/bottom);
   with `aspect-ratio: 1.6` + `object-fit: cover`, ~15px of bar stayed visible. Cropped to 480 × 270, which
   matches the reference (no bars).

## Verification performed this pass
- Headless Chrome (reduced motion forced) at 1366 × 4400: full page renders at 4001px against the
  reference's 4027px.
- Section-by-section comparison against the reference for hero, stats, services, partnership, story,
  patient voices, care statement and contact strip.
- 1366 × 768: "Home" is the active nav item; header, hero and stats card composition correct.
- 390px: `documentElement.scrollWidth === 390` — no horizontal overflow. The only elements outside the
  viewport are the carousel's neighbouring slides, clipped by `.letter-window { overflow: hidden }`.
- `/?page=team` renders the preserved medical-team content.
- `npm run build` passes; `npm run test:sites` passes (4/4); `dist/client/index.html`, `dist/server/index.js`
  and `dist/.openai/hosting.json` all present.

## Partnership band now uses the supplied logos
At the user's request the band no longer uses the reference crops. `public/assets/reference/partner-*.png`
are replaced by `public/assets/partners/*.png` — the five logos from `fileforvibe/Logo partnership`, alpha
trimmed. They are rendered translucent white (`filter: brightness(0) invert(1); opacity: .68`) to match the
way the reference treats its marks; in brand colour they have too little contrast on `--blue`. Verified at
1366px (`justify-content: space-between`, 112px tall, capped at 200px wide) and at 390px (5-column grid,
54 x 47px cells, grid spans x 20-370, `scrollWidth === 390`).

## Still open
- Interaction testing (mobile menu, language switch, video click-to-play, carousel wraparound/pause,
  keyboard-accessible modal) has not been exercised.
- The video poster is still a different frame from the reference; a full-resolution thumbnail is unavailable.
