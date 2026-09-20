# AeroLife Thailand

Responsive React/Vite site matching the supplied AeroLife homepage reference, with GSAP motion.

## Development

```sh
cd site
npm install
npm run dev -- --host 0.0.0.0 --port 4173
```

## Build

```sh
cd site
npm run build
```

The homepage follows the latest supplied design and ends at the contact strip. The Team navigation opens the preserved medical-team content at `/?page=team`.

Features: Thai/English translation, flag language controls, mobile menu, proportional SVG hero artwork, local video poster with on-demand YouTube player, neighboring-letter carousel with pause and full-letter dialog, reduced-motion support, phone/email links.

Code: `site/src/App.jsx`, `site/src/styles.css`.

Assets: doctor, service icons and letters from `fileforvibe`. Reference partner marks extracted from the supplied design. Original supplied logos remain available. Hero SVG artwork follows the user's authorization. Source annotations are not website copy. The existing team uses the supplied doctor and role cards because individual staff photos/names were not provided.

`site/design-qa.md` records changes, checks and remaining browser verification. Production build passes; visual/interaction verification awaits browser access.
