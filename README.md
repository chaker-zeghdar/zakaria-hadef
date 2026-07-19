# Physical Food — Portfolio

A React + Vite recreation of the "Physical Food" Framer portfolio (Zakaria Abd Eldjalil Hadef — Video Editor & Photographer).

This was rebuilt from the live Framer design (not exported code — Framer doesn't support that), so it's a close visual match you can now edit freely as real code.

## Run it

Open this folder in VS Code, then in a terminal:

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:5173).

## Structure

```
src/
  App.jsx              page layout
  index.css            global styles / theme variables
  components/
    Navbar.jsx          floating pill nav (About / Work / Services / Contact)
    Hero.jsx             About section
    Work.jsx             Selected work grid (10 project placeholders)
    Services.jsx         4 service cards
    Contact.jsx           email / phone / socials
    Footer.jsx            copyright line
```

## Notes / TODO

- The 10 "Selected work" thumbnails are placeholder gradients — swap in your real video thumbnails/clips (drop images in a new `src/assets/` folder and reference them, or embed real YouTube/MP4 players).
- Social links (Instagram / Behance / YouTube) are placeholder `#` hrefs — add the real profile URLs in `src/components/Contact.jsx`.
- Colors/spacing are a close approximation of the Framer design, tweak `src/index.css` (`:root` variables) to fine-tune.
