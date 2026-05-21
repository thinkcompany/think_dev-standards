# Think Company — GitHub Copilot Instructions

Follow the standards in `AGENTS.md` at the repo root. The rules below are a summary for Copilot's inline suggestion context.

## TypeScript
- Strict mode. No `any`. Use `unknown` and narrow explicitly.
- `interface` for extendable object shapes; `type` for unions and aliases.
- Use utility types (`Partial`, `Pick`, `Omit`, `ReturnType`, etc.) — do not reimplement them.
- Avoid `as` assertions and `!` non-null assertions without an explanatory comment.

## React
- Functional components only. Hooks for state and effects.
- One component per `.tsx` file. Filename = component name (PascalCase).
- No array index as `key`. No spreading unknown props onto DOM elements.
- Conditional rendering: no nested ternaries — break into components.

## CSS / Sass
- SCSS syntax. `@use`/`@forward` only (not `@import`).
- No vendor prefixes in source — use Autoprefixer.
- No `!important`. No ID selectors for styling. Max 3 nesting levels.
- Mobile-first media queries. Unitless `line-height`.

## Accessibility
- WCAG 2.2 AA. Keyboard-accessible. Visible focus states.
- Semantic HTML. Logical heading hierarchy. `alt` on every `<img>`.
- ARIA only when native HTML is insufficient.

## Git
- Conventional Commits: `feat(scope): message` / `fix(scope): message`.
- One logical change per commit.

## General
- No inline styles or inline event handlers.
- No secrets or credentials in code.
- Validate input at system boundaries. Follow OWASP Top 10.
