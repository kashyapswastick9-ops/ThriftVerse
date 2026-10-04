# THRIFTVERSE — Master Project Handoff

> **⚠️ IMPORTANT FOR PROMPT 1:**  
> Scaffold the entire React app **in this same folder** (`thriftstore/`).  
> `npm create vite@latest . -- --template react-ts` (note the `.` — current directory).  
> These handoff files (`PROJECT_HANDOFF.md`, `CHANGELOG.md`, `RESUME_PROMPT.md`, `scripts/`) must **survive** the scaffold — Vite will not overwrite them.

---

## 0. AGENT RULES

> These rules apply to **every future task** in this project. Follow them without exception.

1. After EVERY task that changes files, update `CHANGELOG.md` (new top entry) and the affected sections of `PROJECT_HANDOFF.md` (progress checklist, file tree, routes, stores, issues, next steps, last-updated timestamp) **BEFORE** reporting completion.
2. Never mark a feature DONE unless it compiles (`npm run typecheck`) and its acceptance criteria were checked; otherwise mark **NEEDS FIX** and log it in KNOWN ISSUES.
3. Never delete or rewrite old CHANGELOG entries; only append.
4. Keep NEXT STEPS accurate: the first item is always the immediate next task.
5. Record every architectural decision or deviation from the original prompts in section 8.
6. End every reply with one line: `"Handoff updated: <files touched>"`.
7. When `package.json` first exists (Prompt 1), add the scripts:
   - `"handoff:tree": "node scripts/tree.mjs"`
   - `"handoff:check": "node scripts/handoff-check.mjs"`
   - `"typecheck": "tsc --noEmit"`

---

## 1. PROJECT SNAPSHOT

| Field           | Value                                                                                     |
|-----------------|-------------------------------------------------------------------------------------------|
| **Name**        | THRIFTVERSE                                                                               |
| **Concept**     | Marvel-inspired "Modern Comic Brutalism" thrift-store e-commerce app                     |
| **Stack**       | React 18 · Vite · TypeScript · Tailwind 3 · React Router 6 · Zustand · lucide-react      |
| **Last Updated**| 2026-10-01T20:55:00+05:30                                                                |
| **Status**      | 85% — Core shopping experience built (P1-P5 done)                                      |
| **Repo Root**   | `/Users/swastickkashyap/Downloads/thriftstore`                                            |

---

## 2. BUILD PROGRESS CHECKLIST

| Prompt # | Name                                           | Status        | Notes                              |
|----------|------------------------------------------------|---------------|------------------------------------|
| P0       | Handoff System                                 | ✅ DONE        | This file + CHANGELOG + RESUME + scripts |
| P1       | Architecture, Marvel Design Tokens & Global Layout | ✅ DONE        | App scaffolded, Tailwind config, routing, store setups   |
| P2       | Header & Mega-Menu                             | ✅ DONE        | Sticky header, mega-menu, search, cart drawer, mobile nav |
| P3       | Homepage Category Grids                        | ✅ DONE        | Hero, budget strip, gender tabs, bento grid, jump nav |
| P4       | Curators Dossier                               | ✅ DONE        | 6 curators, dossier panel, power grid, vault cards, follow store |
| P5       | Product Grid, Filter Sidebar & Cards           | ✅ DONE        | URL state filters, seeded catalog, comic cards, quick-add |

### P1 — Architecture, Design Tokens & Global Layout
- [x] `tailwind.config.ts` with full design token set
- [x] `src/index.css` utilities: `.halftone`, `.comic-card`, `.btn-comic*`, `.chip`, `.badge`, `.speech-bubble`, `.burst`, `.section-divider`
- [x] TypeScript types (`src/types/`)
- [x] Catalog data (`src/data/catalog.ts`)
- [x] `RootLayout` + `Footer` components
- [x] UI primitives (Button, Badge, Chip, etc.)
- [x] React Router 6 router setup
- [x] Zustand stores (uiStore, cartStore, followStore, wishlistStore, toast)
- [x] Kitchen-sink route (`/kitchen-sink`) — visual smoke test

### P2 — Header & Mega-Menu
- [x] Announcement marquee
- [x] Sticky header
- [x] Logo
- [x] Desktop nav
- [x] Hover-intent delay (120ms timer, clearTimeout on re-enter)
- [x] Mega menu (5 columns + counts + budget chips + ALL link + promo block)
- [x] DROPS button
- [x] Cart badge with count
- [x] Search overlay (keyboard dismiss, Escape)
- [x] Mobile drawer accordion (gender expand/collapse)
- [x] Keyboard & a11y support (aria-expanded, aria-haspopup, aria-label)

### P3 — Homepage Category Grids
- [x] Hero section
- [x] Budget strip
- [x] Gender tabs
- [x] Category sections
- [x] Bento card grid
- [x] Scroll reveal
- [x] Sticky jump nav
- [x] Skeleton loaders

### P4 — Curators Dossier
- [x] Data: 6 fictional curators (`src/data/curators.ts`)
- [x] Homepage teaser (CuratorsTeaser replaces slot)
- [x] Curator rail (sticky left on lg, top-strip on mobile)
- [x] Dossier panel (full page `/curators/:slug`)
- [x] Power grid stat bars (animated, 10-segment mask)
- [x] Signature vault cards (GRAB THE SET → cart, PEEK accordion)
- [x] Follow button with persistence (`followStore`)
- [x] Clearance stamp visual (dashed border, mix-blend-screen)

### P5 — Product Grid, Filter Sidebar & Cards
- [x] TypeScript product types (Condition, Rarity, Size updated)
- [x] Seeded data: 96 products (`src/data/products.ts`)
- [x] URL-driven filters via `useProductFilters` (search params as truth)
- [x] Filter sidebar (desktop sticky & mobile sheet)
- [x] Active filter chips row
- [x] Product grid with 12-card skeleton loader
- [x] Product card: badges, hover-swap image, quick-add, size selector
- [x] Wishlist store integration (persisted toggle)
- [x] Cart drawer with free-shipping progress bar (updated with new CartItem type)

---

## 3. FILE TREE
> _Generated by `npm run handoff:tree`_

```
src/
├── App.tsx
├── components/
│   ├── home/
│   │   ├── BudgetStrip.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── CategoryGridSkeleton.tsx
│   │   ├── CategorySection.tsx
│   │   ├── GenderTabs.tsx
│   │   └── HeroBanner.tsx
│   ├── layout/
│   │   ├── AnnouncementBar.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── Container.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── RootLayout.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── SectionHeading.tsx
│       ├── Skeleton.tsx
│       └── ToastContainer.tsx
├── data/
│   ├── catalog.ts
│   ├── curators.ts
│   └── products.ts
├── hooks/
│   └── useInView.ts
├── main.tsx
├── pages/
│   ├── AboutPage.tsx
│   ├── CuratorDossierPage.tsx
│   ├── CuratorsPage.tsx
│   ├── HomePage.tsx
│   ├── KitchenSinkPage.tsx
│   ├── NotFoundPage.tsx
│   └── ShopPage.tsx
├── store/
│   ├── cartStore.ts
│   └── uiStore.ts
├── styles/
│   └── index.css
├── types/
│   └── index.ts
└── vite-env.d.ts
```

---

## 4. ROUTES TABLE

| Path                        | Component / Page           | Status        |
|-----------------------------|----------------------------|---------------|
| `/`                         | `HomePage`                 | ✅ DONE        |
| `/shop/:gender?/:category?` | `ShopPage`                 | 🚧 STUBBED     |
| `/curators`                 | `CuratorsPage`             | 🚧 STUBBED     |
| `/curators/:slug`           | `CuratorDossierPage`       | 🚧 STUBBED     |
| `/about`                    | `AboutPage`                | ✅ DONE        |
| `/kitchen-sink`             | `KitchenSinkPage`          | ✅ DONE        |
| `*`                         | `NotFoundPage` (404)       | ✅ DONE        |

---

## 5. DESIGN SYSTEM CHEAT-SHEET

### Color Tokens
| Token        | Hex Value | Role                                      |
|--------------|-----------|-------------------------------------------|
| `ink`        | `#0A0C10` | Primary dark / backgrounds                |
| `stark`      | `#F5F7FA` | Near-white / light surfaces               |
| `crimson`    | `#E62429` | Accent / CTA / danger                     |
| `vibranium`  | `#00E5FF` | Secondary accent / highlight              |
| `gold`       | `#FFC629` | Tertiary / badges / stars                 |

### Typography
| Role              | Font Family         | Tailwind key  | Usage                                              |
|-------------------|---------------------|---------------|----------------------------------------------------|
| Display / Hero    | **Anton**           | `font-display`| h1–h3, section titles, nav, prices                |
| Comic Accent      | **Bangers**         | `font-comic`  | `.burst` stickers, POW!, "1 OF 1", clearance stamps|
| Sub-display       | **Oswald** 500/700  | `font-cond`   | Nav items, buttons, filter headings, card subtitles|
| Body              | Inter               | `font-sans`   | Body copy, descriptions                            |
| Mono / Labels     | Space Mono          | `font-mono`   | Counts, badges, labels                             |

> **Note:** The `cond` Tailwind key name is kept for compatibility — it now maps to Oswald instead of Barlow Condensed.

### Shadow System
- Comic offset shadows: `4px 4px 0 #0A0C10` (small), `6px 6px 0 #0A0C10` (medium), `8px 8px 0 #0A0C10` (large)
- Hover state: shift `2px 2px` and increase border intensity

### Golden Rules
> ⚠️ **Only use tokens from `tailwind.config.ts`. Never build Tailwind class names dynamically; use full-string lookup objects.**

---

## 6. STATE & DATA MAP

### Zustand Stores
| Store          | Persist Key              | Purpose                                       |
|----------------|--------------------------|-----------------------------------------------|
| `uiStore`      | _(session only)_         | Drawer open/close, search overlay, active tab |
| `cartStore`    | `thriftverse-cart`       | Cart items — rejects duplicates (1-of-1 items)|
| `followStore`  | `thriftverse-following`  | Followed curator slugs                        |
| `wishlistStore`| `thriftverse-wishlist`   | Wishlisted product IDs                        |
| `toastStore`   | _(session only)_         | Toast notification queue                      |

### Data Files
| File                    | Contents                              |
|-------------------------|---------------------------------------|
| `src/data/catalog.ts`   | Category taxonomy + counts            |
| `src/data/curators.ts`  | 6 fictional curators with metadata    |
| `src/data/products.ts`  | 96 seeded products with picsum images |

---

## 7. COMPONENT INVENTORY

| Component | File | Prompt | Status |
|-----------|------|--------|--------|
| Button    | `src/components/ui/Button.tsx` | P1 | ✅ DONE |
| Badge     | `src/components/ui/Badge.tsx` | P1 | ✅ DONE |
| SectionHeading | `src/components/ui/SectionHeading.tsx` | P1 | ✅ DONE |
| Skeleton  | `src/components/ui/Skeleton.tsx` | P1 | ✅ DONE |
| Toast     | `src/components/ui/ToastContainer.tsx` | P1 | ✅ DONE |
| RootLayout| `src/components/layout/RootLayout.tsx` | P1 | ✅ DONE |
| Container | `src/components/layout/Container.tsx` | P1 | ✅ DONE |
| Header    | `src/components/layout/Header.tsx` | P2 | 🚧 STUBBED |
| Footer    | `src/components/layout/Footer.tsx` | P1 | ✅ DONE |
| CartDrawer| `src/components/layout/CartDrawer.tsx` | P5 | 🚧 STUBBED |
| AnnouncementBar| `src/components/layout/AnnouncementBar.tsx`| P2 | 🚧 STUBBED |

---

## 8. KEY DECISIONS & CONVENTIONS

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | **IP-safe branding**: Original brand THRIFTVERSE; no Marvel logos, character names, or licensed artwork | Legal compliance |
| 2 | **`@/` alias** maps to `src/` | Clean imports, consistent across all files |
| 3 | **Mobile-first** responsive design | Thrift shoppers skew mobile-heavy |
| 4 | **Picsum image seeds** for all product/curator images | Deterministic, no API key needed |
| 5 | **Reduced-motion respected** via `prefers-reduced-motion` media query on all animations | Accessibility (WCAG 2.1 AA) |
| 6 | **Items are 1-of-1**: no quantity controls in cart or product pages | Thrift realism — each piece is unique |
| 7 | **Scaffold into current directory** (`npm create vite@latest . -- --template react-ts`) | Preserves handoff files at root |
| 8 | **Theme patch (P7): fonts changed to Anton/Bangers/Oswald; pill buttons; rounded cards** — Colors are locked and byte-for-byte identical to pre-patch. `cond` key kept for class compatibility (now Oswald). `borderRadius` tokens added: `comic-sm` 8px, `comic` 14px, `comic-lg` 22px, `comic-xl` 30px | Marvel aesthetic sharpened without color changes |

---

## 9. KNOWN ISSUES / TECH DEBT

> _None yet_

| # | Issue | Severity | Prompt | Status |
|---|-------|----------|--------|--------|
| — | —     | —        | —      | —      |

---

## 10. NEXT STEPS

1. **[IMMEDIATE]** Product detail page (`/shop/:gender/:category/:slug`)
2. Cart / Checkout flow
3. Account & order history page
4. Wishlist page (`/wishlist`)
6. Theme toggle (light/dark comic modes)
7. Unit + integration tests (Vitest + Testing Library)
8. Deployment (Vercel / Netlify CI)

---

## 11. HOW TO RUN

> _Fill in after Prompt 1 scaffolds the project._

```bash
# After Prompt 1:
npm install          # install dependencies
npm run dev          # start dev server (http://localhost:5173)
npm run build        # production build
npm run typecheck    # TypeScript check (no emit)
npm run preview      # preview production build
npm run handoff:tree    # print src/ tree
npm run handoff:check   # verify handoff doc vs disk
```

| Requirement | Version  |
|-------------|----------|
| Node.js     | ≥ 18 LTS |
| npm         | ≥ 9      |
| Port        | 5173 (Vite default) |

---

## 12. HOW TO RESUME ON ANOTHER ACCOUNT

### Transfer the Code
1. **Git (recommended):** `git clone <remote-url>` on the new machine
2. **ZIP fallback:** Compress the `thriftstore/` folder and transfer; unzip on the new machine

> ⚠️ This `.md` file does **not** contain source code — you must transfer the full folder.

### Start the Session
```bash
npm install && npm run dev
```

### Open a New Antigravity Session
1. Open Antigravity in the project folder (`thriftstore/`)
2. Copy the entire contents of `RESUME_PROMPT.md`
3. Paste it as your **first message** in the new session
4. Wait for the AI to summarize state before giving further instructions

### GIT STATUS
```
Branch:        main (not yet initialized)
Last Commit:   — (no commits yet)
Remote:        NO REMOTE CONFIGURED

# To initialize:
git init
git add .
git commit -m "chore: bootstrap handoff system (P0)"
git remote add origin <your-remote-url>
git push -u origin main
```
