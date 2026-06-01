# AGENTS.md

## Project Overview

This is a Next.js / TypeScript / Tailwind CSS / Framer Motion personal brand website for 王俞蘅 / Rory syhran.

The site should feel like a quiet personal brand magazine, not a resume, portfolio, company website, or developer landing page. Its purpose is to express temperament, taste, lifestyle, and worldview through editorial typography, imagery, whitespace, and restrained motion.

Core aesthetic references:

- Apple
- Aesop
- Kinfolk
- Monocle
- High fashion editorial
- Independent film
- Modern art gallery

Keywords:

- Minimalism
- Editorial design
- Quiet luxury
- Artistic
- Intellectual
- Timeless
- Elegant
- Cinematic
- Sophisticated

## Non-Negotiable Design Rules

Do not add:

- Skill progress bars
- Percentages
- Resume-style sections
- Programmer portfolio tropes
- Corporate homepage patterns
- Marketing hero copy
- Neon, cyberpunk, game-like, or flashy tech visuals
- Dense cards, badges, dashboard UI, or template-like layouts

Prefer:

- Large whitespace
- Magazine-like typography
- Slow and subtle animation
- Real or generated editorial imagery
- Thin rules, quiet captions, and refined spacing
- Image-led storytelling instead of feature lists
- Personal brand, creator, builder, and storyteller language

## Content Ownership

All replaceable personal content should stay centralized in:

```text
src/lib/profile.ts
```

Use this file for:

- Display names
- Site title, description, and URL placeholder
- Hero copy and main image
- Manifesto lines
- Selected work
- Photography images
- Notes
- Life fragments
- Now page content
- Contact links
- Image captions and alt text

Most public-facing copy should be bilingual and use this shape:

```ts
{ en: 'English copy', zh: '中文文案' }
```

The language toggle persists in `localStorage`. When adding new visible copy, wire both languages rather than leaving hard-coded English or Chinese.

Do not hard-code personal content deep inside components unless there is a strong reason.

Most visible copy should be bilingual. Prefer `{ en: '...', zh: '...' }` objects in `src/lib/profile.ts` and render them through the language helper in `src/components/language-toggle.tsx`.

## Image Assets

Project images live in:

```text
public/
```

Current generated magazine images:

- `public/magazine-cover.jpg`
- `public/travel-light.jpg`
- `public/still-life.jpg`
- `public/light-texture.jpg`

When adding or replacing images:

- Put final web-ready files in `public/`
- Reference them from `src/lib/profile.ts` using paths like `/image-name.jpg`
- Prefer compressed JPEG/WebP for photos
- Keep original generated images outside the repo unless the user asks to preserve them
- Avoid logos, readable fake text, watermarks, stock-photo feeling, neon, and corporate visuals

## Code Structure

Important files:

- `src/app/page.tsx`: homepage route
- `src/app/now/page.tsx`: Now page route
- `src/components/home-page.tsx`: primary homepage layout
- `src/components/site-shell.tsx`: header, frame, and shared section label
- `src/components/theme-toggle.tsx`: dark mode toggle
- `src/lib/profile.ts`: editable content and asset references
- `src/app/globals.css`: Tailwind base and global behavior
- `next.config.mjs`: static export config
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow

Keep changes coherent and image-led. This project should remain refined, quiet, and compact.

## Development Commands

Use standard npm commands:

```bash
npm install
npm run dev
npm run build
```

The dev server is configured for `http://localhost:5173`.

The local environment used during setup had `node` available but not a global `npm` binary. If needed, use an available npm runner or install npm locally, but do not commit temporary tooling.

The npm scripts intentionally force Next.js to use Webpack and the WASM SWC package because this local macOS environment rejects some native binaries by code signature. Do not remove that without verifying local builds still work.

## Verification

Before finishing visual or layout changes:

- Run `npm run build`
- Check desktop and mobile widths
- Confirm no horizontal overflow
- Confirm images load successfully
- Confirm text does not overlap or feel cramped
- Confirm dark mode still works
- Use the in-app browser for local visual QA when available

For design changes, screenshots matter more than terminal output.

## Deployment

The project is configured for GitHub Pages:

- Next.js uses static export
- GitHub Actions deploys the `out` output from `main`

Do not change deployment assumptions unless the user asks.
