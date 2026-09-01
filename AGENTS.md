# AGENTS.md

Single-page React portfolio (UI/UX designer) — Vite + React 19 + TypeScript + Tailwind v4. No tests.

## Commands
- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (typecheck + build). **This is the real compile/typecheck gate.**
- `npm run lint` — ESLint (currently **failing** — see Lint section)

## Lint status (pre-existing failure — do not treat as green)
`npm run lint` currently reports 12 `react-hooks/purity` errors in `useCursorTrail.ts` (both copies). These are known and uncommitted-noise; don't clean them up as part of unrelated work. If you do touch this file, fixes should avoid `Math.random()`/`performance.now()` calls flagged by the React compiler purity rule.

## Architecture
- Entry: `src/main.tsx` → `src/App.tsx` (react-router `BrowserRouter`, single route `/` inside `PortfolioLayout`).
- Sections live in `src/components/home/` (`Hero`, `About`, `Projects`, `Skills`, `Education`), wired together by `src/pages/LandingPage.tsx`.
- One-page vertical snap-scroll: `LandingPage` uses `lenis` for smooth scrolling plus a debounce-based snap to section `id`s (`Home`/`About`/`Projects`/`Skills`/`Education`). Navbar ("Jhoifha" pill) scrolls to these ids.
- Design tokens are CSS custom props defined in `src/App.css` (`:root`): `--hitam` #181A17, `--putih` #F4F4F4, `--biru` #0204E8. Components reference them as inline `style={{ backgroundColor: "var(--hitam)", color: "var(--putih)" }}` rather than Tailwind color utilities.
- Tailwind v4 via `@tailwindcss/vite` plugin; `@import "tailwindcss"` appears in **both** `src/index.css` and `src/App.css` (App.css also loads the Poppins webfont and the tokens).

## Conventions / gotchas
- `tsconfig.app.json` sets `allowImportingTsExtensions` — file imports keep their extension (e.g. `./App.tsx`, `../../hooks/useCursorTrail`). No path aliases; use relative imports.
- `useCursorTrail.ts` is **duplicated**: `src/hooks/useCursorTrail.ts` (the one imported by `Hero.tsx`) and `src/components/hooks/useCursorTrail.ts` (dead copy, differs only in CRLF line endings). Lint scans both, so errors are doubled. The `src/hooks/useCursorTrail.ts` copy is canonical.
- Stale artifacts to avoid editing: `src/hooks.zip` (checked-in archive of the hook), and a duplicated `src/assets/hero.png` vs `src/assets/image/hero.png`.
- Many component files contain inline Indonesian comments explaining logic; keep this style.

## Verification
Only `npm run build` (= `tsc -b` typecheck + Vite production build) is meaningful for validating changes.
