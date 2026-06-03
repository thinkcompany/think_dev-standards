# Think Company — GitHub Copilot Instructions

Follow the standards in `AGENTS.md` at the repo root. The rules below are a summary for Copilot's inline suggestion context.

## TypeScript
- Strict mode. No `any`. Use `unknown` and narrow explicitly.
- `interface` for extendable object shapes; `type` for unions and aliases.
- Use utility types (`Partial`, `Pick`, `Omit`, `ReturnType`, etc.) — do not reimplement them.
- Avoid `as` assertions and `!` non-null assertions without an explanatory comment.
- Use `as const` and discriminated unions for state. Validate external data (API, form, storage) at runtime with Zod/Valibot, not an `as` cast.

## JavaScript
- `const` by default, never `var`. Declare variables near first use.
- Be explicit in conditions: `if (count > 0)` over `if (count)` — truthy shortcuts hide `0`/`''`/`null` bugs.
- Modern operators: `?.`, `??` (not `||`) for defaults, logical assignment.
- `async`/`await` over promise chains; `Promise.all` for independent work.
- `for...of` and `Object.entries` — never `for...in`. Trailing commas in multiline.
- `addEventListener` only; `IntersectionObserver`/`ResizeObserver` over scroll/resize polling.

## React
- Functional components only. Hooks for state and effects.
- One component per `.tsx` file. Filename = component name (PascalCase).
- No array index as `key`. No spreading unknown props onto DOM elements.
- `useEffect` synchronizes with external systems — don't derive state in it; declare all deps; return cleanup.
- Server state → TanStack Query/SWR (not Redux). URL state → query params. Reusable logic → custom hooks.
- Wrap failure-prone subtrees in an error boundary. Conditional rendering: no nested ternaries.

## CSS
- Vanilla CSS is the default; Tailwind as a utility layer where agreed. Sass is grandfathered, not for new work.
- Custom properties for all design tokens. No vendor prefixes in source — use Autoprefixer.
- No `!important`. No ID selectors for styling. Max 3 nesting levels.
- Mobile-first media queries. Unitless `line-height`.
- Modern CSS: cascade layers, container queries, `:has()`, logical properties, `oklch`/`color-mix`.

## Accessibility
- WCAG 2.2 AA. Keyboard-accessible. Visible focus states via `:focus-visible`.
- Interactive targets ≥ 24×24px. Respect `prefers-reduced-motion`.
- Semantic HTML. Logical heading hierarchy. `alt` on every `<img>`.
- Native `required` is the source of truth for required fields; `aria-required` only on custom widgets.
- ARIA only when native HTML is insufficient.

## Git
- Conventional Commits: `feat(scope): message` / `fix(scope): message`.
- One logical change per commit.

## General
- No inline styles or inline event handlers.
- No secrets or credentials in code; run a secret-scanning hook.
- Validate input at system boundaries. Follow OWASP Top 10.
- Set a CSP; add SRI to third-party scripts; enforce HTTPS/HSTS; automate dependency scanning.
