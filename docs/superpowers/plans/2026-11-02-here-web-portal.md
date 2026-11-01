# Here! Public Showcase & Download Portal (`here-web`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the official static Astro + Tailwind CSS public showcase and APK download portal for Here! (`here-web`), matching the Flutter app's warm cream aesthetic (`lib/theme.dart`) and 1:1 legal documents (`lib/screens/legal_doc_page.dart`).

**Architecture:** Static Astro 5 application styled with Tailwind CSS, using build-time data fetching (`src/data/release.ts`) plus lightweight progressive enhancement on the client to resolve the latest GitHub release APK from `https://api.github.com/repos/Meowtys/here-next/releases` with an immediate static fallback to `v2.1.0-beta.6`. Shared layout, header, and footer components wrap the landing page (`/`), Privacy Policy (`/privacy`), and Terms of Use (`/terms`).

**Tech Stack:** Astro 5, Tailwind CSS, TypeScript, Node.js test runner (`node --test`), Vercel static output.

## Global Constraints

- **Framework:** Astro + Tailwind CSS (static output, 100 Lighthouse score target, zero bloated JS bundles).
- **Git & GitHub CLI Workflow:** Never commit directly to `main`. Use feature branches (`feat/scaffold`, `feat/landing-page`, `feat/legal-pages`) and merge into `main`. Never add `Co-authored-by:` or AI attribution trailers.
- **Visual Palette (`lib/theme.dart`):**
  - Primary Brand Blue: `#1F5F80`
  - Warm Cream Canvas Background: `#F7F5EE`
  - Card Surface: `#FFFFFF` with `1px solid #E6E2D6` border, `12px`–`14px` radius, zero drop-shadow bloat
  - Primary Text: `#14313F`
  - Muted Text: `#5B6B73`
  - Soft Blue Tint: `#E3EEF3`
  - Status Pills: Success (`#DDF1E4` bg / `#1D6B3A` fg), Warning (`#F6EBD0` bg / `#7A5A12` fg), Danger (`#FBE4E1` bg / `#9A2A1E` fg)
- **Legal Copy Fidelity:** 1:1 match with `C:\Users\Westen\Documents\GitHub\here-next\lib\screens\legal_doc_page.dart`.

## Review Focus

1. **GitHub API rate limit / offline failure / empty array:** `parseReleasePayload` and `fetchLatestRelease` must gracefully return the `FALLBACK_RELEASE` (`v2.1.0-beta.6`, Build 14, `129.6 MB`, `https://github.com/Meowtys/here-next/releases/download/v2.1.0-beta.6/here-v2.1.0-beta.6.apk`) when the GitHub API fails, times out, or returns no `.apk` asset.
2. **Pre-release selection:** Because `/releases/latest` skips pre-releases like `v2.1.0-beta.6`, the fetcher must query `/releases` and pick the first release containing an `.apk` asset.
3. **1:1 Legal Document Copy:** Both `/privacy` and `/terms` must render every heading, bullet point, and "Last updated: October 2026" badge identically to `legal_doc_page.dart`.
4. **Accessibility & Contrast:** Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`), descriptive link text, visible focus rings, and explicit image dimensions (`width`/`height`) to prevent CLS.
5. **Vercel Static Routing:** Clean URLs (`/privacy`, `/terms`) and static asset caching configured cleanly for Vercel deployment.

---

### Task 1: Scaffold Astro + Tailwind Project & Brand Assets (`feat/scaffold`)

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `tailwind.config.mjs`
- Create: `.gitignore`
- Create: `vercel.json`
- Create: `public/assets/loginlogo.png`
- Create: `public/assets/logo.png`
- Create: `public/favicon.png`
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Navbar.astro`
- Create: `src/components/Footer.astro`

- [x] **Step 1: Create `feat/scaffold` branch**
- [x] **Step 2: Copy brand assets from `here-next` (`assets/loginlogo.png` and `assets/icon/icon.png` -> `public/assets/logo.png` & `public/favicon.png`)**
- [x] **Step 3: Create `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, `.gitignore`, `vercel.json`**
- [x] **Step 4: Create `src/styles/global.css` and shared layout/navigation components (`BaseLayout.astro`, `Navbar.astro`, `Footer.astro`)**
- [x] **Step 5: Install dependencies and verify Astro config**
- [x] **Step 6: Commit on `feat/scaffold` and merge into `main`**

---

### Task 2: Release Fetcher, Legal Data Extraction & Unit Tests (`feat/landing-page` & `feat/legal-pages`)

**Files:**
- Create: `src/data/release.ts`
- Create: `src/data/legal.ts`
- Create: `tests/site-data.test.mjs`
- Create: `src/pages/index.astro`
- Create: `src/pages/privacy.astro`
- Create: `src/pages/terms.astro`
- Create: `src/components/LegalDocView.astro`

- [x] **Step 1: Write unit tests in `tests/site-data.test.mjs` verifying release parser, fallback handling, and 1:1 legal copy**
- [x] **Step 2: Implement `src/data/release.ts` with `FALLBACK_RELEASE`, `parseReleasePayload`, and `fetchLatestRelease`**
- [x] **Step 3: Implement `src/data/legal.ts` with exact sections from `legal_doc_page.dart`**
- [x] **Step 4: Build Landing Page (`src/pages/index.astro`) with Hero, Dynamic APK Download card, Feature Highlights Grid, 4-Step Quick Start Walkthrough, and 3-Step APK Installation Guide**
- [x] **Step 5: Build Legal Pages (`src/components/LegalDocView.astro`, `src/pages/privacy.astro`, `src/pages/terms.astro`)**
- [x] **Step 6: Run tests and `npm run build` to verify static output**
- [x] **Step 7: Commit and merge feature branches to `main`**
