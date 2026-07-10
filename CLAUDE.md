# Misesha — Next.js Storefront

Production-track rebuild of the Misesha static prototype (`../misesha-site/`) as a real, working Next.js e-commerce app. The static site proved the design; this project proves the purchase flow — a shopper can browse, add to bag, and pay with a Stripe **test-mode** card end to end.

## Scope for this phase

Build exactly this path, no further: **Home → Shop (PLP) → Product (PDP) → Cart → Checkout → Order confirmation.** Every screen must work on mobile first — this is where most Misesha traffic will land, and it's the thing the static prototype got visibly wrong once (an off-center header) before being fixed. Don't build past this list until it's solid:

- [ ] Home — hero, "New In" grid, one campaign section. Lighter than the static site; it exists to lead into Shop, not to re-litigate every marketing section.
- [ ] Shop (PLP) — search, category filter, colour filter, sort. Port the logic from `misesha-site/shop.js`, don't redesign it.
- [ ] Product (PDP) — gallery, size selector, **Add to Bag**.
- [ ] Cart — line items, quantity change, remove, subtotal. Persists across reloads (localStorage is fine, no login required).
- [ ] Checkout — shipping details form + order summary + an embedded Stripe **card element** (not a redirect to Stripe Checkout — the brief specifically wants the test-card field living on this page).
- [ ] Order confirmation — confirms the PaymentIntent succeeded, shows an order summary. No email, no persistence beyond the session.

### Explicitly out of scope (don't build these yet)

Accounts/login, order history, a database, an admin/inventory panel, real shipping-rate calculation, email receipts, live (non-test) payments. If a task pulls toward any of these, stop and flag it rather than quietly expanding scope.

## Stack

- **Next.js** (App Router, TypeScript). Server components by default; `"use client"` only where interactivity requires it (cart, checkout form, filters).
- **Tailwind CSS** for all styling. No CSS-in-JS, no separate `.css` files per component — the static site already proved the visual language works as plain CSS; Tailwind utility classes are the port target.
- **Stripe** in **test mode only**. `@stripe/stripe-js` + `@stripe/react-stripe-js` on the client, `stripe` (Node SDK) in a server-side API route. Never let the secret key reach the client bundle.
- No database for this phase. Product data is a local TypeScript module (see below); cart state is a React context backed by localStorage.

## Design system (ported from `misesha-site`, do not reinvent)

**Colors** — each one is a real product's name, not a generic swatch:

| Token | Hex | Used for |
|---|---|---|
| `cipria` | `#F1D6D2` | Wrap Top & Skirt |
| `panna` | `#EFE6D8` | Ribbed Gown |
| `burro` | `#F5EAD6` | Corset Top & Tiered Skirt |
| `adriatico` | `#AECBDD` | Slip Dress |
| `moka` | `#4A2E23` | Cut-Out Gown |
| `rosewood` | `#A8505F` | Accent — buttons, links, sold-out badges. Used sparingly. |
| `marble` | `#FBF7F2` | Page background |
| `espresso` | `#2A2320` | Body text, dark surfaces (footer, closing states) |

Wire these into `tailwind.config.ts` under `theme.extend.colors` using the same names — `bg-cipria`, `text-rosewood`, etc. — so class names stay legible as brand vocabulary, not `bg-pink-200`.

**Type** — two faces, two jobs, no third:
- **Fraunces** (italic swashes) — headlines, taglines, the one line per screen that gets to feel handwritten. Load via `next/font/google`.
- **Instrument Sans** — everything else: nav, prices, form labels, buttons. Also `next/font/google`.

**Signature motifs** — carry both over exactly:
1. **Arch crop.** Hero/campaign images get a top-rounded arch (`border-radius: 12% 12% 0 0 / 22% 22% 0 0` — a CSS trick, not an SVG mask). Nod to Bodrum tiled doorways. Express as a Tailwind arbitrary-value utility or a small `arch` class in `globals.css`.
2. **The bow.** A hand-abstracted ribbon/bow SVG (`<symbol id="icon-bow">`, reused via `<use>`) marks every section eyebrow. One shape, reused everywhere — that repetition *is* the brand mark. Don't introduce a second icon style.

**Copy voice** — plain verbs, concrete detail over adjectives, dry wit allowed ("Somebody's rabbits got into the shoot. We kept them in every frame after that."). Buttons say exactly what happens: **Add to Bag**, not "Submit." A toast/confirmation echoes the same verb: adding produces "Added," not "Success."

## Mobile-first layout rules

The static site shipped a real bug worth learning from: the header used `grid-template-columns: 1fr auto 1fr` to center the nav between the logo and icons on desktop, but on mobile a different set of children (hamburger + logo + icons) landed in that same grid without checking whether the two outer tracks' *content* was actually equal width — one side needed more room than the other, and content clipped off-screen.

The fix, and the rule going forward: **when centering something between two asymmetric side elements, use `grid-template-columns: 1fr auto 1fr` with the fixed/auto content in the middle track** — the two `1fr` tracks absorb the imbalance instead of forcing both sides to the same width. Verify at 375px (iPhone SE) — the narrowest width that has to work — not just 390 or 414.

General mobile rules for this build:
- Design and build mobile layouts first; expand to desktop with `md:`/`lg:` prefixes, not the reverse.
- Minimum 44×44px tap targets on every interactive element (size buttons, quantity steppers, remove-from-cart).
- No horizontal scroll, ever. After any header/nav/toolbar change, check `document.documentElement.scrollWidth === document.documentElement.clientWidth` at 375px before calling it done.
- Symmetry is a real requirement, not a nice-to-have: if a row has an element on the left and an element on the right, the thing between them (logo, title, step indicator) should be visually centered in the *viewport*, not just centered in whatever space happens to be left over.

## Data model

Port `misesha-site/products.js` as `lib/products.ts` — same fields, typed:

```ts
type Product = {
  slug: string;
  name: string;
  category: "Tops" | "Skirts" | "Dresses";
  color: string;
  colorHex: string;
  price: number; // TRY, integer
  image: string;
  alt: string;
  tagline: string;
  description: string;
  details: string[];
  gallery: string[];
};
```

Copy the 8 products and their real asset paths over from `misesha-site/assets/images/`. `money(n)` formatting (₺ + `tr-TR` locale) also ports as-is.

## Stripe integration

1. Test-mode keys only, from environment variables — never hardcoded:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (`pk_test_...`)
   - `STRIPE_SECRET_KEY` (`sk_test_...`, server-only, referenced only inside `app/api/**` route handlers)
2. Checkout page creates a PaymentIntent server-side (`app/api/create-payment-intent/route.ts`) for the cart's current total, returns the `client_secret` to the client.
3. Client renders Stripe's `<CardElement>` (or `<PaymentElement>`) inside the checkout form, confirms the PaymentIntent with `stripe.confirmCardPayment`.
4. Surface Stripe's [documented test cards](https://stripe.com/docs/testing) directly in the UI as a small helper note near the card field — e.g. "Testing? Use `4242 4242 4242 4242`, any future expiry, any CVC." This is a test environment; make that obvious rather than pretending it's live.
5. On success, route to the order confirmation screen with the PaymentIntent id; on failure, show Stripe's own decline message in the interface's voice (state what happened, not "oops").

## Folder structure (starting point)

```
misesha-nextjs/
├── CLAUDE.md
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    ← Home
│   ├── shop/page.tsx                ← PLP
│   ├── product/[slug]/page.tsx      ← PDP
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── order-confirmation/page.tsx
│   └── api/create-payment-intent/route.ts
├── components/
│   ├── Header.tsx                  ← the 1fr-auto-1fr pattern lives here
│   ├── ProductCard.tsx
│   ├── SizeSelector.tsx
│   ├── CartDrawer.tsx
│   └── ...
├── lib/
│   ├── products.ts
│   └── cart-context.tsx
├── public/images/                  ← copied from misesha-site/assets/images/
├── tailwind.config.ts
└── .env.local                      ← Stripe test keys, gitignored
```

## Definition of done for this phase

A shopper can land on Home, filter to a dress in Shop, open its PDP, pick a size, add it to the bag, adjust quantity in Cart, fill in checkout details, pay with `4242 4242 4242 4242` in test mode, and land on a confirmation screen — all without a horizontal scrollbar or a misaligned header at 375px width.
