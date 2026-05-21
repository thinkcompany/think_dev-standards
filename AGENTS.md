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

---

## JavaScript

- Use `const` by default. Use `let` only when the value will be reassigned. Never use `var`.
- Use `===` and `!==`. Never `==` or `!=`.
- Use template literals for string interpolation. No string concatenation.
- Arrow functions for callbacks and closures. Named function declarations for top-level functions (better stack traces).
- Never use `eval` or the `Function` constructor.
- Avoid assignments inside conditionals.
- Wrap immediately-invoked function expressions in parentheses.
- Do not bind to scroll or resize events without debouncing.

---

## React

- Use functional components exclusively. Do not write new class components.
- Use hooks for all state and side effects. Do not use `componentWillMount`, `componentWillReceiveProps`, or other deprecated lifecycle methods.
- One component per file. Filename and component name must match. Use PascalCase (e.g., `UserCard.tsx`).
- Always use `.tsx` for files containing JSX.
- Use double quotes for JSX attributes; single quotes for all other JS/TS strings.
- Do not use array index as `key` prop. Use a stable, unique ID.
- Do not spread props onto DOM elements without filtering (`{...rest}` onto a `<div>` leaks unknown attributes).
- State management:
  - Single component: `useState`
  - Component trees (2+ levels): React Context
  - Application-wide: Redux with Redux Toolkit (RTK)
- Do not use `isMounted`. It is deprecated and unavailable in functional components.
- Conditional rendering: avoid nested ternaries. Break complex conditionals into separate components.
- PropTypes are not required in TypeScript projects — use TypeScript types instead.

---

## CSS / Sass

- Use Sass (SCSS syntax). Write CSS as close to standard CSS as possible; use Sass features only where they add clarity.
- Do not use vendor mixin libraries (Compass, Bourbon). Use Autoprefixer in the build pipeline instead.
- Do not write vendor prefixes manually in `.scss` files.
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
- Use Sass modules (`@use`, `@forward`). Do not use the deprecated `@import`.
- Declaration order inside a rule: `@extend` → `@include` → regular properties → pseudo-classes/elements → nested selectors → media queries.
- Name and place media queries alongside their base ruleset, smallest to largest (mobile-first).

### Partial naming convention

`_[category].[partial-name].scss`

Examples: `_settings.variables.scss`, `_layout.grid.scss`, `_module.card.scss`, `_helpers.spacing.scss`

---

## HTML

- All HTML must conform to the HTML5 spec. Validate with the W3C validator.
- Write semantic markup. Use the correct element for the meaning, not for the appearance.
- Use HTML5 sectioning elements (`<header>`, `<main>`, `<article>`, `<aside>`, `<nav>`, `<footer>`).
- All elements and attribute names must be lowercase. Attribute values in double quotes. All tags closed.
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
- Every interactive element must be keyboard-accessible. Never remove the default focus outline without replacing it with a clearly visible alternative.
- Provide a visually-hidden "Skip to main content" link as the first focusable element on each page.
- Use ARIA attributes only when native HTML semantics are insufficient. Incorrect ARIA is worse than no ARIA.
- Use `aria-haspopup`, `aria-expanded`, and `aria-hidden` to communicate toggle state.
- Bind keyboard events (`focus`, `keydown`) alongside mouse events. Do not rely on hover-only interactions.
- All `<img>` elements must have an `alt` attribute. Decorative images use `alt=""`.
- Do not use color alone to convey information.
- Error validation fires on submit, not on keystroke or blur. On error: move focus to the first invalid field, set `aria-invalid="true"`, link to the error message via `aria-describedby`.
- Use `aria-required="true"` on required fields; do not rely solely on the HTML5 `required` attribute.
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

- Never commit secrets, API keys, credentials, or `.env` files. Use environment variables and a secrets manager.
- Validate and sanitize all user input at the boundary. Do not trust client-supplied data server-side.
- Follow OWASP Top 10 guidance. Pay particular attention to XSS, CSRF, and injection.
- Set least-privilege access for all roles and service accounts.
- Remove unused code, dependencies, and assets before shipping.
- Strip metadata from SVGs before committing.

---

## Code Review Expectations

When reviewing or generating code for PR review:

- Check for logic errors, edge cases, and unhandled states.
- Flag any use of `any`, non-null assertions, or type assertions without comments.
- Confirm accessibility requirements are met for any UI changes.
- Confirm no secrets or credentials are present.
- Confirm the PR description matches the diff.
