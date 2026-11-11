# Wisdombridge Library

A polished, responsive bookstore storefront built with Next.js, TypeScript, Tailwind CSS, Lucide icons, and Framer Motion. Product, category, and sample TZS price data live in `data/books.ts`.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Build for production with `npm run build`; run a TypeScript check with `npm run typecheck`.

## Included

- Editorial storefront with featured books, author picks, categories, recommendations, and a demo newsletter form.
- Catalog search, category filtering, and sorting by price or rating.
- Book detail pages, quantity controls, cart, and wishlist.
- Cart, wishlist, and English/Kiswahili selection persisted in local storage.
- Responsive shop, about, e-book preview, checkout, and cart pages.
- Checkout and e-book availability are clearly labeled as demo placeholders. No payments, orders, downloads, or email subscriptions are processed.

Book jacket artwork is an original typographic mock cover for this prototype. Replace it with images you have the rights to use before a commercial launch. Prices are configurable examples in Tanzanian shillings, not live prices. Google Fonts load from the Google Fonts CDN.

## GitHub

Create an empty GitHub repository, then from this project directory run:

```bash
git init
git add .
git commit -m "Build Wisdombridge Library bookstore storefront"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/wisdombridge-library.git
git push -u origin main
```

The project is not connected to a live payment provider or database. Do not add secrets to the repository.
