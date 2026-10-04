# THRIFTVERSE — Resume Prompt

> Copy everything below this line and paste it as your **first message** in a new Antigravity / AI session opened in the `thriftstore/` project folder.

---

You are continuing an existing project called **THRIFTVERSE** — a Marvel-inspired "Modern Comic Brutalism" thrift-store e-commerce app (React 18 + Vite + TypeScript + Tailwind 3 + React Router 6 + Zustand + lucide-react).

**Before writing any code, complete these steps in order:**

1. Read `PROJECT_HANDOFF.md` fully (all 12 sections).
2. Read the top 5 entries of `CHANGELOG.md`.
3. Run `npm install && npm run typecheck` — skip if `package.json` does not exist yet.
4. Summarize back in **under 150 words**: what exists, what's broken, and the first next step.
5. **WAIT for my go-ahead before writing any code.**

Follow the **AGENT RULES** in section 0 of `PROJECT_HANDOFF.md` for every task you perform.

> **Do not rebuild or restyle anything marked DONE.**

---

## CURRENT TOP 3 NEXT STEPS

> _(Refresh this block whenever `PROJECT_HANDOFF.md` section 10 changes.)_

1. **[IMMEDIATE]** Paste Prompt 1 — scaffold the app **in this folder** (current directory `.`) with `npm create vite@latest . -- --template react-ts`, then build out Architecture, Marvel Design Tokens & Global Layout.
2. Paste Prompt 2 — Header & Mega-Menu (announcement marquee, sticky header, desktop nav, mega menu, cart badge, search overlay, mobile drawer).
3. Paste Prompt 3 — Homepage Category Grids (hero, budget strip, gender tabs, category sections, bento grid, scroll reveal, sticky jump nav, skeletons).

---

## CURRENT KNOWN ISSUES

> _(Refresh this block whenever `PROJECT_HANDOFF.md` section 9 changes.)_

_None yet — no code has been written._

---

## CONTEXT NOTES FOR THE NEW SESSION

- **Project root:** The folder you opened Antigravity in (`thriftstore/`).
- **Handoff files live at root:** `PROJECT_HANDOFF.md`, `CHANGELOG.md`, `RESUME_PROMPT.md`, `scripts/` — do **not** delete or move them.
- **Vite scaffold note:** When running Prompt 1, scaffold into the current directory using `.` not a subfolder, so handoff files are preserved.
- **`@/` alias** maps to `src/` (configure in `vite.config.ts` + `tsconfig.json`).
- **No Marvel IP:** All branding is original — THRIFTVERSE only.
- **Items are 1-of-1:** No quantity controls anywhere.
- **Images:** Use `https://picsum.photos/seed/<slug>/400/500` for deterministic images.
- **Reduced-motion:** All animations must respect `prefers-reduced-motion`.
