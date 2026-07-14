# Contour Coffeeworks

A front-end e-commerce product page for a small pour-over coffee equipment shop, built with plain HTML, CSS, and JavaScript — no frameworks, no build step, no backend.

**[View a live demo →](#)** *(replace with your GitHub Pages link once deployed — see below)*

## Features

- **Catalog page** — grid of five brewing instruments, each with a name, price, and short description
- **Product detail page** — variant pickers (material, size, finish), quantity stepper, full spec sheet
- **Grind guide dial** — a custom interactive SVG dial (drag, click, or use arrow keys) that shows the recommended grind range for the featured dripper
- **Shopping bag** — add, update quantity, remove, and a demo checkout flow, all persisted with `localStorage`
- **Responsive layout** — down to mobile, with visible keyboard focus states and support for reduced motion
- **No dependencies** — the only external resource is a Google Fonts stylesheet; everything else is hand-written

## Project structure
contour-coffeeworks/
├── index.html          # Catalog / homepage
├── product.html         # Product detail page (reads ?id= to switch products)
├── cart.html            # Shopping bag page
├── css/
│   └── styles.css       # Full design system: tokens, layout, components
├── js/
│   ├── store.js         # Product data + cart logic (localStorage)
│   ├── icons.js          # Inline SVG line-art icon library
│   ├── product.js        # Product page behavior (variants, dial, add to cart)
│   └── cart-page.js      # Cart rendering, quantity updates, demo checkout
└── assets/               # Place additional images/screenshots here



## Running it locally

No build tools or package installs are required. Any static file server works:

```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node
npx serve .
```

Then open `http://localhost:8000` in your browser. Opening `index.html` directly by double-clicking also works, since there's no bundler or server-side code.

## Deploying to GitHub Pages

1. In the repo, go to **Settings → Pages**.
2. Under **Source**, select the `main` branch and `/ (root)` folder, then save.
3. GitHub will publish the site at `https://<madhurajoshi0704>.github.io/<contour-coffeeworks2.0>/` within a minute or two.

## Notes on the demo

This is a front-end-only project meant as a portfolio piece:

- There is no backend, database, or real payment processing.
- The "Checkout" button on the bag page simulates a successful order and clears the cart — it does not charge anyone or send data anywhere.
- The cart persists only in the current browser via `localStorage`, so it won't sync across devices.

## Ideas for extending it

- Wire up a real backend (Node/Express, or a serverless function) and a payment provider like Stripe
- Add product images instead of the hand-drawn SVG line art
- Add search/filtering to the catalog grid
- Persist the cart to a database instead of `localStorage` for logged-in users

## License

MIT — see [LICENSE](LICENSE).
