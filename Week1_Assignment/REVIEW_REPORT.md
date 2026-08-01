# Review Report — Week 1 Assignment

**Reviewer scope:** Full pass over all 7 task folders (HTML, CSS, JS, and the two React
mini-apps) plus the top-level README. Nothing was regenerated — every change below is a
targeted edit to an existing file. No features, content, or assignment requirements were
removed; personal information (name, college, CGPA, projects, email, phone) was preserved
exactly, and the corrected GitHub/LinkedIn URLs supplied were applied.

---

## 1. Executive Summary

The project was already in solid shape structurally — clean folder layout, valid HTML
(all tags balanced, verified with a scripted parser check), no JavaScript syntax errors,
and zero console errors across the five static pages when tested headlessly. The review
surfaced **12 real issues**, split across three themes:

1. **Two outdated contact links** (Task 1) — the GitHub and LinkedIn URLs no longer matched
   the corrected profile links.
2. **A critical cross-browser reliability bug** in both React tasks — opening `index.html`
   directly (double-click) renders a blank page in Chrome/Edge due to a CORS restriction on
   local file fetches, which the original README didn't warn about.
3. **A cluster of accessibility gaps** — missing `aria-expanded`/`aria-live`/`aria-invalid`
   states, a missing form-field label, no visible keyboard-focus outline on 6 of 7 CSS
   files, and a couple of "jump to top of page" link bugs on placeholder navigation.

No duplicate or unused CSS was found on audit (checked via selector-frequency scan). No
broken internal anchors were found. All fixes below are applied in the delivered files.

---

## 2. Issues Found & Fixed

| # | Severity | File(s) | Issue | Root Cause | Fix Applied |
|---|----------|---------|-------|-------------|--------------|
| 1 | **Critical** | `Task6_React_Components/index.html`, `Task7_React_Blog/index.html` | Opening the file directly (`file://…/index.html`) renders a blank page with a console CORS error in Chrome/Edge | Babel Standalone fetches `<script type="text/babel" src="...">` files via `XMLHttpRequest`; browsers block XHR to local files under the `file://` protocol | Added an inline protocol check that detects `file://` and shows an on-screen instruction to run a local static server, instead of failing silently. README updated with the exact commands (`python -m http.server 8000` / `npx serve .`) |
| 2 | **Major** | `Task1_Portfolio/index.html` | GitHub link pointed to `github.com/Premsai-JS`, LinkedIn to the old short-form URL | Stale contact info left over from the first draft | Updated both occurrences (hero socials + contact grid) to `github.com/premsaijs` and the corrected LinkedIn URL; updated visible handle text to match |
| 3 | **Major** | `Task2_Responsive_Navbar/index.html`, `.../script.js` | Dropdown toggle buttons never exposed `aria-expanded` on desktop (only set on mobile tap) | State was only tracked in the mobile-click handler; desktop relies on CSS `:hover`/`:focus-within`, which doesn't update ARIA state | Added `aria-expanded="false"` + `aria-haspopup="true"` in HTML, and `mouseenter`/`mouseleave`/`focusin`/`focusout` listeners in JS that keep `aria-expanded` accurate on desktop too |
| 4 | **Critical** | `Task4_Ecommerce/index.html` | Mobile hamburger button had no `aria-expanded` attribute at all, in HTML or JS | Attribute was simply omitted when the button was built | Added `aria-controls`/`aria-expanded="false"` in HTML and set it dynamically in `script.js` on toggle |
| 5 | **Major** | `Task3_Form_Validation/index.html`, `.../script.js` | Real-time validation errors and the success banner were not announced to screen reader users; inputs never exposed `aria-invalid` | Error `<span>`s and the success banner had no `aria-live` region; `setState()` never touched `aria-invalid` | Added `aria-live="polite"` to every error span and the hint span, `role="status"` + `aria-live="polite"` on the success banner, `aria-describedby` linking each input to its error text, and `aria-invalid` toggling in `setState()` |
| 6 | **Major** | `Task7_React_Blog/components/Hero.jsx` | Search input had no associated `<label>` — relied on placeholder text only, a known accessibility anti-pattern | Placeholder was used as a stand-in for a label | Added a visually-hidden `<label htmlFor="blog-search">` tied to the input's new `id` |
| 7 | Minor | `Task1_Portfolio/index.html`, `.../css/style.css` | No skip-to-content link; page sections weren't wrapped in a `<main>` landmark | Not implemented in the first draft | Added a standard "Skip to main content" link (visible on keyboard focus) and wrapped all sections in `<main id="main-content">` |
| 8 | Minor | `Task1_Portfolio/index.html` | Decorative canvas background and social SVG icons were exposed to screen readers as unlabeled graphics, duplicating the parent link's `aria-label` | Missing `aria-hidden` | Added `aria-hidden="true"` (and `focusable="false"` on SVGs) to all purely decorative graphics |
| 9 | Minor | `Task1_Portfolio/js/script.js` | With `prefers-reduced-motion` enabled, resizing the window left the network background canvas stretched/stale, since the animation loop (which normally redraws on resize) never restarts | `resize()` recomputed node positions but nothing redrew the canvas when the rAF loop was intentionally not running | Resize handler now calls `step()` once manually when reduced motion is active |
| 10 | Minor | `Task2_Responsive_Navbar/script.js`, `Task4_Ecommerce/script.js` | Clicking a placeholder nav/footer link (`href="#"`) jumped the page to the top unexpectedly | `href="#"` was used for demo links with no `preventDefault()` | Added a listener that calls `e.preventDefault()` specifically for bare `href="#"` links, leaving real in-page anchors (e.g. `#components`) untouched |
| 11 | Minor | `Task3_Form_Validation/*`, `Task4_Ecommerce/index.html` | Password-visibility toggle button and cart button didn't update their accessible name/state | `aria-label` was static ("Show password" regardless of state); cart button's count wasn't marked decorative | Toggle button now flips between "Show password"/"Hide password" with `aria-pressed`; cart button's accessible name now reads "Cart, 3 items" with the visual badge marked `aria-hidden` |
| 12 | Minor | `Task2/3/4/5/6/7` CSS files | No visible keyboard-focus outline defined outside of Task 1 (relying on browser default only, which is inconsistent across browsers and easy to lose under custom `outline: none` rules elsewhere) | Global `:focus-visible` rule existed only in Task 1's stylesheet | Added the same `:focus-visible` outline rule (teal outline, consistent with the design system) to all remaining task stylesheets |

**Also audited, no action needed:**
- CSS duplication/unused rules — none found (selector-frequency scan came back clean).
- HTML validity — all 7 pages have fully balanced, correctly nested tags (verified with a
  scripted tag-balance parser).
- Label/input association in the signup form — already correct (`for`/`id` pairs matched).
- JavaScript syntax — all four vanilla-JS files pass `node --check` with no errors.
- React `key` props — every mapped list (`Card`, `Profile` tags, `BlogCard`, `CategoryFilter`,
  `Sidebar` recent posts) already uses a stable, unique key.

---

## 3. Code Quality Improvements

- Every JS fix includes a short comment explaining *why* (e.g. the reduced-motion resize
  fix, the `href="#"` prevention) so the reasoning survives future edits, not just the code.
- No logic was duplicated to work around the React `file://` issue — the fix is a small,
  isolated inline script rather than restructuring the component-loading approach, keeping
  the diff minimal and the existing file/folder structure intact (as requested).
- Naming, formatting, and existing patterns (e.g. how `setState()` is structured in the
  form validator) were matched rather than introducing a new style.

## 4. UI Improvements

- Cart button and password-toggle button now communicate their real state visually *and*
  programmatically — no visual redesign was needed, these were purely correctness fixes.
- Skip link uses the same accent-teal/dark-ink palette as the rest of the portfolio, so it
  doesn't look bolted-on when it appears on focus.

## 5. Performance Improvements

- Fixed the reduced-motion canvas redraw gap (issue #9) — previously a resize while motion
  was reduced could leave stale, incorrectly-scaled visuals on screen until the next
  interaction.
- No unnecessary reflows, unused CSS, or dead code were found elsewhere; the existing
  `IntersectionObserver`-based scroll reveal and IIFE-scoped canvas animation were already
  reasonably efficient and were left as-is.

## 6. Accessibility Improvements

This was the largest category of fixes (issues #3, #5, #6, #7, #8, #11, #12 above):
`aria-expanded`, `aria-live`, `aria-invalid`, `aria-describedby`, `aria-pressed`, a missing
form label, a skip link, a `<main>` landmark, decorative-element `aria-hidden`, and a
consistent keyboard-focus outline across every task. Together these address the most common
gaps a screen-reader or keyboard-only user would hit in this project.

## 7. Future Recommendations

- **Serve, don't double-click, the React tasks.** The `file://` fallback message is a good
  safety net, but for actual grading/demo purposes, running a local server (as the README
  now documents) gives the real experience.
- **Consider a real build step for Tasks 6–7** if this code evolves past a Week 1 exercise —
  Vite or Create React App would remove the CDN/Babel-Standalone dependency entirely and is
  the standard next step once components grow beyond a learning exercise.
- **Add basic form submission handling** (Task 3) — right now "Create Account" only
  validates and shows a success banner; a real backend call would be the natural next
  iteration.
- **Automated testing** — none of the tasks currently have any tests. Even a handful of
  Playwright smoke tests (page loads, no console errors, form validation states) would catch
  regressions like the ones found in this review automatically going forward.

---

*Reviewed and fixed by working directly in the existing files — no project was regenerated
from scratch. All personal information, project descriptions, and assignment requirements
were preserved unchanged except where explicitly corrected (GitHub/LinkedIn URLs).*
