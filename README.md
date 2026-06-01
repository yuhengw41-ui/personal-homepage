# Rory syhran Personal Brand Website

A Next.js personal brand website for 王俞蘅 / Rory syhran. The site is designed as a quiet, image-led digital magazine: editorial, cinematic, minimal, and timeless.

## Replace Your Content

Most personal content lives in `src/lib/profile.ts`:

- `profile.site`: browser title, meta description, and canonical URL placeholder
- `profile.name`: Chinese and English display names
- `profile.hero`: hero subtitle, line, and cover image
- `profile.manifesto`: personal values
- `profile.selectedWork`: selected projects
- `profile.photography`: photography layout images
- `profile.notes`: writing/thought prompts
- `profile.life`: lifestyle fragments
- `profile.now`: Now page content
- `profile.contact`: contact line and links

Most public-facing copy is bilingual. Use this shape when adding new text:

```ts
{ en: 'English copy', zh: '中文文案' }
```

The language switch is saved in the browser with `localStorage`.

Most visible copy is bilingual. Use `{ en: '...', zh: '...' }` entries in `src/lib/profile.ts`; the header language switch stores the selected language locally in the browser.

## Replace Photos

The current generated images are:

- `public/magazine-cover.jpg`
- `public/travel-light.jpg`
- `public/still-life.jpg`
- `public/light-texture.jpg`

To use your own image:

1. Put the image in `public/`, for example `public/cover.jpg`.
2. Change the corresponding image path in `src/lib/profile.ts`, for example `/cover.jpg`.

Any future images can follow the same pattern: put the file in `public/`, then reference it from `src/lib/profile.ts`.

## Run Locally

```bash
npm install
npm run dev
```

The dev server is configured for `http://localhost:5173`.

## Build

```bash
npm run build
```

The site uses Next.js static export and writes the production site to `out/`.
