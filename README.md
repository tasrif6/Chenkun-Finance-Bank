# Chenkun — React + GSAP homepage

React 19, Vite 7, GSAP 3 (ScrollTrigger, ScrollSmoother, SplitText, `@gsap/react`).
Tailwind 4 is used only for the navbar and the dark-mode variant; all other styling is plain CSS in `src/index.css`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
```

## Image fields (currently EMPTY, placeholders show instead)
Open `src/constants/content.js`:

| Where it shows | Field | Example value |
|---|---|---|
| Page 1, hero photo (right side) | `hero.image` (+ `hero.alt`) | `"/images/hero.jpg"` |
| Page 2, About team photo (left side) | `about.photo` (+ `about.photoAlt`) | `"/images/team.jpg"` |

Put the files in `public/images/`. Nothing else needs changing: the slide-in, drift and light-sweep animations attach automatically.
Tip: the hero is cropped square and shifted slightly right (`object-position: 60% 50%` in `.hero-art img.art`); adjust that if your photo's subject sits elsewhere.

## Page order (src/App.jsx)
Navbar → Hero → About → Services ("What we do", pinned horizontal slide) → Banks (auto slider) → Metrics → Process (pinned timeline) → Contact footer.

## Where things live
| Need | File |
|---|---|
| All copy, numbers, bank names, services | `src/constants/content.js` |
| Colours, fonts, light/dark tokens | top of `src/index.css` (`:root` and `html.dark`) |
| Navbar, search, theme toggle | `src/components/Navbar.jsx` |
| Image slot / placeholder | `src/components/ImageSlot.jsx` |
| One page = one file | `src/sections/*.jsx` |

## Notes
- Copy, figures and bank names are placeholders; confirm real partners before publishing.
- Dark mode: the navbar toggle sets `class="dark"` on `<html>` and remembers the choice.
- ScrollSmoother runs on desktop pointers only (touch devices scroll natively); animations respect reduced-motion.
- Mobile hamburger menu is commented out in `Navbar.jsx`. The contact form has a TODO to connect your backend.
