# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Reference fidelity feedback

- User explicitly authorizes custom SVG for the hero background to match the supplied design. Use `public/assets/hero-pattern.svg`; do not restore the mismatched raster background.
- Homepage service icons must remain fully visible inside separate white circular containers. Match the reference desktop circle size (180px) and inner artwork size (126px); scale down proportionally for mobile. Never apply a circular crop to the supplied icon images.

- Latest user feedback: the hero is too large. Use a compact desktop hero capped at 560px, tablet 480px, mobile 590px; scale the heading and doctor image with it. This supersedes the earlier fixed reference aspect ratio. Keep the whole SVG visible without `object-fit: cover`. Background base: #5073bc.

- Hero SVG must scale uniformly: use `preserveAspectRatio="xMidYMid meet"` and `object-fit: contain`. Never use `preserveAspectRatio="none"` or `object-fit: fill`; circles must remain circular. Remaining space uses the matching hero background color, without increasing hero height.

## Latest homepage reference

- The latest user image (1366 × 4027) is the homepage source of truth. Keep the previously requested compact hero, and keep all decorative circles circular.
- Homepage ends at the three-row blue contact strip. The existing medical team is accessible through `/?page=team`, not appended to the homepage.
- Use Montserrat headings, Lato body text, Thai/UK flag controls, reference partner marks, a full-bleed left video with right story text, and a carousel with visible neighboring letters.
- Red text in the mock is instructional annotation; never render it as page copy.
- Hero motifs are separate SVG corner assets with proportional dimensions, maintaining positions on a shorter hero without stretching.

## Partnership logos

- The "Our Partnership" band uses the supplied partner logos, alpha-trimmed into
  `public/assets/partners/{airamb,ezy-airlines,vipjets,siam-seaplane,siam-ambulance}.png`. They came from the
  `fileforvibe/Logo partnership` drop folder, which the user has since deleted; recover it from commit
  ee34a1b if an original is ever needed.
  This is a deliberate departure from the reference image, which shows placeholder marks (Uber, Airbnb and
  similar). Do not restore the reference crops.
- The supplied logos are full colour on transparent backgrounds. Render them the way the reference renders its
  marks — translucent white on the blue band, via `filter: brightness(0) invert(1); opacity: .68` — rather than
  in their brand colours, which have too little contrast against `--blue`.

## Header / hero height balance

- Supersedes the earlier "desktop hero capped at 560px, tablet 480px" note. The user asked for a shorter
  header so the hero gains height, then later asked for the header (and footer) to be smaller again.
- Current values: `header { height: clamp(76px, 7.9vw, 108px) }` — 108px at 1366px, down from 186px
  originally. `.hero-inner { height: clamp(496px, 44.4vw, 606px) }` — 606px at 1366px; the hero was not
  grown to absorb the second reduction, the page simply got shorter. Tablet (701–1150px) hero 526px.
- The header scales continuously with no jump at any breakpoint: 108px at 1366, 91px at 1150, 79px at 1000,
  then a flat 76px from 900px down, which matches the mobile bar. The 701–900px hamburger range and the
  mobile dropdown both offset from that same 76px.
- Mobile header (76px, sticky) and mobile hero (590px) are unchanged throughout.

## Header and footer weight

- Both were deliberately reduced after the homepage was signed off, because they read heavier than the
  content between them. Footer: 261px tall at 1366px with 36px text and 42px icons, now 188px with 24px text
  and 32px icons. Header: 140px, now 108px, with the wordmark, nav and flag buttons scaled to match.
- Mobile values for both were left alone — they already had their own compact media-query values (76px
  header, 174px footer) and shrinking them further would hurt tap targets.
