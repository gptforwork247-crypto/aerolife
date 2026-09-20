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

- The "Our Partnership" band uses the supplied partner logos in `fileforvibe/Logo partnership`, copied and
  alpha-trimmed to `public/assets/partners/{airamb,ezy-airlines,vipjets,siam-seaplane,siam-ambulance}.png`.
  This is a deliberate departure from the reference image, which shows placeholder marks (Uber, Airbnb and
  similar). Do not restore the reference crops.
- The supplied logos are full colour on transparent backgrounds. Render them the way the reference renders its
  marks — translucent white on the blue band, via `filter: brightness(0) invert(1); opacity: .68` — rather than
  in their brand colours, which have too little contrast against `--blue`.

## Header / hero height balance

- Supersedes the earlier "desktop hero capped at 560px, tablet 480px" note. The user asked for a shorter
  header so the hero gains height. At 1366px the header is now 140px (was 186px) and the hero 606px (was
  560px) — the combined block is unchanged at ~746px, so nothing below the fold shifts.
- Values: `header { height: clamp(92px, 10.2vw, 140px) }`, `.hero-inner { height: clamp(496px, 44.4vw, 606px) }`,
  tablet (701–1150px) hero 526px. Mobile header (76px, sticky) and mobile hero (590px) are unchanged.
