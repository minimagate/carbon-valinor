# Carbon Valinor

Single-page site for Carbon Valinor, built with [Astro](https://astro.build).
Live at **https://minimagate.github.io/carbon-valinor/**.

## Develop

Requires Node 22.23.4 or newer (`.nvmrc` pins 26).

```sh
npm install
npm run dev       # http://localhost:4321/carbon-valinor/
npm run build     # static output in dist/
npm run preview
```

## Structure

```
src/
  pages/index.astro       page copy and charts
  pages/404.astro         not-found page
  layouts/Base.astro      <head>: meta, icons, social preview; loads styles and reveal script
  components/Chart.astro  two-series line chart rendered to static SVG
  data/series.ts          chart data (illustrative, replace with real figures)
  scripts/reveal.ts       word-by-word reveal, chart-in-view trigger, live tonnes counter
  styles/global.css       type, colours, layout, motion
  lib/paths.ts            asset paths under the Pages base
public/
  logo.svg                logo, built on a single circle
  favicon.svg / .ico, apple-touch-icon.png, icon-*.png, site.webmanifest, og.png
```

## Deploy

Every push to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.
The site is served under `/carbon-valinor`; `site` and `base` are set in `astro.config.mjs`.

## Placeholders

Chart data, the counter's starting figure and rate (`src/scripts/reveal.ts`) and the
contact address are illustrative.
