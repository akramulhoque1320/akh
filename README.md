# Frontend Portfolio

Personal portfolio of **Akramul Hoque (Akram)**, a software engineer in Dhaka with 4+ years of experience. It is a single self-contained HTML page with no frameworks and no build step.

**Live site:** https://akramulhoque1320.github.io/frontend-portfolio/

## Features

- **Time-of-day hero:** the sky, tree, accent colour and greeting change to morning, afternoon, evening or night, based on the visitor's local clock
- The dusk hour adjusts to the visitor's timezone (read via `Intl`, so no location permission is needed)
- Night-only stars, fireflies and a glowing lamp; flocks of birds by day
- A time pill to preview each look, which reverts to the real time after 10 seconds
- Experience timeline, featured client work with live-site previews, filterable project cards, and contact
- Responsive layout, a skip link, keyboard focus styles and `prefers-reduced-motion` support

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

## Tech

HTML5 · CSS3 (custom properties, grid, keyframe animations) · Vanilla JavaScript
