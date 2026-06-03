# Think Company — AI Agent Coding Instructions

These instructions apply to all AI-assisted coding at Think Company. They encode our front-end development standards and are the authoritative source for the per-tool files (`CLAUDE.md`, `.cursor/rules/`, `.github/copilot-instructions.md`).

---

## Core Principles

- Write code that is readable, modular, and accessible by default.
- Prefer explicit over clever. Prioritize the next developer's ability to understand and change the code.
- Follow the conventions already in use in the project. When in doubt, match the surrounding code.
- Do not add features, abstractions, or error handling beyond what the task requires.
- Validate at system boundaries (user input, external APIs). Trust internal code.

---

## TypeScript

- All new code must be TypeScript. Do not introduce plain `.js` files.
- Enable `strict: true` in `tsconfig.json`. Never disable strict mode to work around a type error — fix the type.
- Never use `any`. Prefer `unknown` when the type is genuinely unknown and narrow it explicitly.
- Prefer `interface` for object shapes that may be extended; use `type` for unions, intersections, and aliases.
- Use built-in utility types (`Partial`, `Required`, `Pick`, `Omit`, `Readonly`, `ReturnType`, etc.) rather than re-implementing them.
- Keep type definitions co-located with the code that uses them. Only promote to a shared `types/` directory when truly shared.
- Avoid type assertions (`as Foo`) except at verified system boundaries. Never use non-null assertions (`!`) without a comment explaining why the value cannot be null.
- Prefer `satisfies` over `as` when you need to validate a value against a type without widening it.
- Use `as const` to lock object and tuple literals to their narrowest types (e.g. to derive a union from an array of values).
- Model mutually-exclusive states as discriminated unions (a shared literal `kind`/`status` tag), not a bag of optional fields. Narrow them with `switch`.
- For data crossing a system boundary (API responses, form input, `localStorage`), type it as `unknown` and validate at runtime with a schema validator (Zod or Valibot) before use. Do not trust a hand-written `as` cast on external data.
- Enable `noUncheckedIndexedAccess` so indexed access (`arr[i]`, `record[key]`) is typed as possibly `undefined`. Consider `exactOptionalPropertyTypes` per project — it is stricter and can fight library interop.

---

## JavaScript

- Use `const` by default. Use `let` only when the value will be reassigned. Never use `var`.
- Declare variables close to where they are first used, not in a block at the top of the scope.
- Use `===` and `!==`. Never `==` or `!=`.
- Be explicit in conditions when the type is ambiguous. Truthy shortcuts hide bugs around `0`, `''`, and `null` — prefer `if (count > 0)` over `if (count)` and `if (name != null)` over `if (name)`.
- Use template literals for string interpolation. No string concatenation.
- Arrow functions for callbacks and closures. Named function declarations for top-level functions (better stack traces).
- Use ES modules (`import`/`export`). Prefer named exports over default exports for non-component modules.
- Use the modern operators: optional chaining (`?.`), nullish coalescing (`??`), and logical assignment (`??=`, `||=`, `&&=`). Use `??` (not `||`) for defaults so `0` and `''` are preserved.
- Use `async`/`await` over hand-rolled promise chains. Run independent async work concurrently with `Promise.all`; use `Promise.allSettled` when failures should not short-circuit. Sequential `await`s on independent calls are a performance bug.
- Iterate with `for...of` and array methods. Never use `for...in`; use `Object.keys`/`Object.values`/`Object.entries` for objects.
- Bind events with `addEventListener` — never inline `on*` attributes. Use `IntersectionObserver`/`ResizeObserver` instead of polling `scroll`/`resize`; debounce or throttle high-frequency handlers.
- Use trailing commas in multi-line objects, arrays, and parameter lists.
- When converting strings to numbers, use `Number()` or `Number.parseInt(value, 10)` with an explicit radix.
- Never use `eval` or the `Function` constructor.
- Avoid assignments inside conditionals.

---

## React

- Use functional components exclusively. Do not write new class components.
- Use hooks for all state and side effects. Do not use `componentWillMount`, `componentWillReceiveProps`, or other deprecated lifecycle methods.
- One component per file. Filename and component name must match. Use PascalCase (e.g., `UserCard.tsx`).
- Always use `.tsx` for files containing JSX.
- Use double quotes for JSX attributes; single quotes for all other JS/TS strings.
- Do not use array index as `key` prop. Use a stable, unique ID.
- Do not spread props onto DOM elements without filtering (`{...rest}` onto a `<div>` leaks unknown attributes).
- State management — match the tool to the *kind* of state:
  - Local component state: `useState` (or `useReducer` for complex transitions).
  - Shared across a small subtree: React Context. Do not reach for a global store just to avoid prop drilling.
  - Server state (API data, caching, revalidation): TanStack Query or SWR. Do not put server data in Redux.
  - URL state (filters, pagination): keep it in query params via the router.
  - Global client state: Zustand or Jotai for lighter needs; Redux Toolkit (RTK) on larger projects.
- `useEffect` is for synchronizing with external systems, not for deriving data. Compute derived values during render — do not mirror props into state via an effect. Declare every reactive dependency (do not disable `react-hooks/exhaustive-deps`), and return a cleanup function for subscriptions, timers, and connections.
- Extract reusable stateful logic into custom hooks (`use`-prefixed), not HOCs or render props.
- Wrap failure-prone subtrees (data fetching, third-party widgets, route components) in an error boundary.
- In React 19 / Next.js App Router, components are Server Components by default. Mark components that use state, effects, or browser APIs with `'use client'`, and push client components as far down the tree as possible.
- Do not use `isMounted`. It is deprecated and unavailable in functional components.
- Conditional rendering: avoid nested ternaries. Break complex conditionals into separate components.
- PropTypes are not required in TypeScript projects — use TypeScript types instead.

---

## CSS

- Author **vanilla CSS** on all projects. Use **Tailwind CSS** as a utility layer where the project and client permit. Sass/SCSS is no longer the default — projects already on Sass may continue, but do not start new work in it.
- Use CSS custom properties for all design tokens (colors, spacing, type scale, z-index, breakpoints). Define them on `:root`.
- Do not use vendor mixin libraries. Avoid manual vendor prefixes — use Autoprefixer in the build pipeline.
- Architecture follows SMACSS: Settings → Base → Layout → Modules → Helpers.
  - State classes: prefix with `is-` or `has-`.
  - Subcomponents: `[module]-[subcomponent]`.
  - Modifiers: `[module]--[modifier]`.
- Name selectors based on function, not appearance. Lowercase, hyphen-separated.
- Do not use IDs as styling hooks. Use class names.
- Keep specificity low. Author from general to specific.
- Nest no more than 3 levels deep (including pseudo-classes and pseudo-elements).
- Do not use `!important` except to override unmodifiable third-party styles (add a comment explaining why).
- Use `box-sizing: border-box` globally via the inherit pattern.
- Use relative units (`em`, `rem`, `%`) over `px` wherever possible.
- Do not use `line-height` with a unit. Use a unitless ratio (e.g., `line-height: 1.5`).
- Declaration order within a rule: custom properties → layout → box model → typography → visual → interaction → animation.
- Name and place media queries alongside their base ruleset, smallest to largest (mobile-first).

### File naming convention

`[category].[partial-name].css`

Examples: `settings.tokens.css`, `layout.grid.css`, `module.card.css`, `helpers.spacing.css`

### Tailwind

- Use Tailwind only where the team has agreed and no conflicting CSS architecture exists.
- Order utility classes layout → box model → typography → visual → interaction → animation; enforce with the Prettier Tailwind plugin.
- Prefer extracting a reusable component over `@apply`. Use `@apply` only where JSX components aren't available (e.g. CMS templates).
- Map tokens in config to custom properties; don't use arbitrary values (`w-[347px]`) for things that should be tokens.

### Modern CSS features

These have reached broad/Baseline support — treat them as first-class tools, not experimental:

- **Cascade layers (`@layer`)** to manage specificity across resets, third-party styles, and your own code without `!important`.
- **Container queries** when a component's layout depends on its container's size rather than the viewport.
- **`:has()`** to style a parent based on its descendants — replaces many JS class-toggling patterns.
- **Logical properties** (`margin-inline`, `padding-block`, `border-inline-start`) over physical ones for RTL-friendly layouts.
- **Modern color** — `oklch()` for perceptually-uniform colors, `color-mix()` to derive related colors from a token.
- **Custom properties** for all design tokens (colors, spacing, type scale, z-index).

---

## HTML

- All HTML must conform to the HTML5 spec. Validate with the W3C validator.
- Write semantic markup. Use the correct element for the meaning, not for the appearance.
- Use HTML5 sectioning elements (`<header>`, `<main>`, `<article>`, `<aside>`, `<nav>`, `<footer>`).
- All elements and attribute names must be lowercase. Attribute values in double quotes. Void elements (`<img>`, `<input>`, `<br>`, etc.) do not need a trailing slash — that's an XHTML convention.
- Attribute order: `class` → `id`/`name` → `data-*` → `src`/`for`/`type`/`href`/`value` → `title`/`alt` → `aria-*`/`role`.
- Use `<button>` for actions, `<a>` for navigation. Use `type="button"` on `<button>` elements outside of forms.
- Never use inline styles or inline event handlers. Hook JavaScript behavior via `data-*` attributes.
- Use `<label>` for every form field, explicitly associated via `for`/`id`.
- Do not use presentational elements (`<font>`, `<center>`, etc.) or attributes (`align`, `valign`).
- Do not set `maximum-scale` or `user-scalable=no` in the viewport meta tag.

---

## Accessibility

Target WCAG 2.2 Level AA compliance on all projects.

- Always declare the page language: `<html lang="en">`.
- Heading hierarchy must be logical and sequential. One `<h1>` per page. Do not choose heading levels based on visual size.
- Text contrast: 4.5:1 minimum for normal text; 3:1 for large or bold text.
- Every interactive element must be keyboard-accessible. Never remove the default focus outline without replacing it with a clearly visible alternative. Prefer `:focus-visible` over `:focus` so mouse clicks don't show a stray ring. Focus indicators need at least a 2px outline at 3:1 contrast (WCAG 2.2 SC 2.4.11/2.4.13).
- Interactive targets must be at least 24×24 CSS pixels (WCAG 2.2 SC 2.5.8); 44×44 is the AAA/design-system target.
- Wrap non-essential animation in `@media (prefers-reduced-motion: reduce)` and disable it there.
- Provide a visually-hidden "Skip to main content" link as the first focusable element on each page.
- Use ARIA attributes only when native HTML semantics are insufficient. Incorrect ARIA is worse than no ARIA.
- Use `aria-haspopup`, `aria-expanded`, and `aria-hidden` to communicate toggle state.
- Bind keyboard events (`focus`, `keydown`) alongside mouse events. Do not rely on hover-only interactions.
- All `<img>` elements must have an `alt` attribute. Decorative images use `alt=""`.
- Do not use color alone to convey information.
- Error validation fires on submit, not on keystroke or blur. On error: move focus to the first invalid field, set `aria-invalid="true"`, link to the error message via `aria-describedby`.
- Use the native HTML `required` attribute as the source of truth for required fields — it is well-supported by current screen readers and gives free browser validation. `aria-required="true"` is redundant when `required` is present; use it only on custom widgets that can't use the native attribute.
- Test with: VoiceOver (macOS/iOS), NVDA + Firefox (Windows), TalkBack (Android). Use the axe browser extension for automated checks.

---

## Git

### Branches

- Branch names: `feature/TICKET-000-short-description` or `fix/TICKET-000-short-description`.
- Use hyphens to separate words. Keep names short and descriptive.
- Delete branches after merging.

### Commits

- Each commit = one logical change. Do not combine unrelated changes.
- Commit early and often. Small, self-contained commits are easier to revert.
- Use [Conventional Commits](https://www.conventionalcommits.org/) format:
  ```
  feat(scope): add user avatar upload
  fix(auth): handle expired token on refresh
  ```
- Reference ticket IDs in the commit body when relevant.
- Do not push half-done work. Use `git stash` instead.

### Merging

- Rebase personal branches onto the target branch before merging to keep history linear.
- Use `--no-ff` when merging a branch with multiple commits.
- Never force-push to a shared branch unless the entire team is aware and coordinated.
- Never rewrite history on `main` or any production/CI branch.

### Pull Requests

Every PR must include:

- **Summary** — what changed and why
- **Testing instructions** — how to verify the change
- **Ticket link(s)**
- **Screenshots or recordings** for any UI/UX changes
- **Checklist** confirming tests pass, linting is clean, and accessibility was considered

Use CI/CD to run linting, type checks, and tests automatically on every PR. Do not merge a PR with failing checks.

---

## Security

- Never commit secrets, API keys, credentials, or `.env` files. Use environment variables and a secrets manager. Run a secret-scanning hook (e.g. gitleaks). If a secret reaches version control, rotate it first, then scrub history.
- Validate and sanitize all user input at the boundary. Do not trust client-supplied data server-side. Never build SQL or shell commands via string concatenation — use parameterized queries.
- Follow OWASP Top 10 guidance. Pay particular attention to XSS, CSRF, injection, and supply-chain attacks.
- Set a Content Security Policy (CSP) — prefer nonce/hash allowlisting over `'unsafe-inline'`. It is one of the highest-leverage XSS defenses.
- Add Subresource Integrity (`integrity="sha384-…"`) to third-party scripts loaded from a CDN you don't control.
- Serve over HTTPS and send `Strict-Transport-Security` (HSTS).
- Automate dependency scanning (Dependabot or Renovate, plus `npm audit`/Snyk in CI). Review lockfile changes carefully — pin versions.
- Set least-privilege access for all roles, service accounts, and CI tokens.
- Remove unused code, dependencies, and assets before shipping.
- Strip metadata from SVGs before committing. Any process accepting user-uploaded SVGs must sanitize embedded `<script>` and event-handler attributes.

---

## Code Review Expectations

When reviewing or generating code for PR review:

- Check for logic errors, edge cases, and unhandled states.
- Flag any use of `any`, non-null assertions, or type assertions without comments.
- Confirm accessibility requirements are met for any UI changes.
- Confirm no secrets or credentials are present.
- Confirm the PR description matches the diff.

---

## Claude-specific behavior

- Do not create planning or analysis documents unless explicitly asked. Work from conversation context.
- Do not add comments explaining what the code does. Add a comment only when the WHY is non-obvious.
- Do not summarize what you just did at the end of a response. The diff speaks for itself.
- Default to editing existing files. Only create new files when the task requires it.
- Do not add features, refactors, or abstractions beyond the stated task.
- Run the type checker and linter before reporting a task complete.
