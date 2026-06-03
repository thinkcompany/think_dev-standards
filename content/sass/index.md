---
title: CSS Authoring Guidelines
date: "2026-05-22T00:00:00.000Z"
area: CSS
section: 1. Overview
description: ""
---

# CSS Authoring Guidelines

This document contains Think Company's standards for writing CSS. We author vanilla CSS on all projects and use [Tailwind CSS](https://tailwindcss.com/) (v4 where greenfield) as a utility layer where the project and client permit.

> **Note:** Sass/SCSS is no longer our default CSS tooling. Projects that already use Sass may continue to do so; refer to the git history for the previous Sass standards.

## Table of Contents

- [Core Principles](#core-principles)
- [Vanilla CSS Standards](#vanilla-css-standards)
  - [Custom Properties](#custom-properties)
  - [Selectors & Specificity](#selectors--specificity)
  - [Format & Style](#format--style)
  - [Architecture (SMACSS)](#architecture-smacss)
  - [Media Queries](#media-queries)
- [Modern CSS Features](#modern-css-features)
- [Tailwind CSS Standards](#tailwind-css-standards)
  - [When to Use Tailwind](#when-to-use-tailwind)
  - [Class Ordering](#class-ordering)
  - [Extracting Components](#extracting-components)
  - [Configuration](#configuration)
- [What Not to Do](#what-not-to-do)

---

## Core Principles

- Write CSS that is readable and maintainable first. Clever optimizations come second.
- Prefer the cascade and inheritance. Work with the browser, not against it.
- Author from general to specific. Keep specificity as low as possible.
- Name things by function, not appearance.
- Stay in normal flow as much as possible.

---

## Vanilla CSS Standards

### Custom Properties

Use CSS custom properties (variables) for all design tokens — colors, spacing, type scales, z-index values, breakpoints.

```css
:root {
    --color-primary: #336699;
    --color-text: #1a1a1a;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 2rem;
    --font-base: 1rem;
    --z-modal: 500;
}
```

- Define all tokens on `:root` unless scoped overrides are intentional.
- Use a consistent naming convention: `--[category]-[variant]`.
- Prefer custom properties over hardcoded values everywhere.

### Selectors & Specificity

- Use class selectors as the primary styling hook. Avoid ID selectors.
- Name classes based on function, not appearance. Use lowercase, hyphen-separated words.
- Do not over-qualify selectors (e.g. `div.card` → `.card`).
- Do not chain more selectors than necessary.
- Nest no more than 3 levels deep using native CSS nesting (Baseline 2023) or a preprocessor.
- Do not use `!important` except to override unmodifiable third-party styles — add a comment explaining why.

```css
/* bad */
div#main-header .nav ul li a { color: red; }

/* good */
.nav-link { color: var(--color-primary); }
```

#### BEM / SMACSS module naming

- Subcomponents: `.module-subcomponent`
- Modifiers: `.module--modifier`
- State classes: `.is-active`, `.has-error`

### Format & Style

- Use double quotes for property values.
- One rule per line; one declaration per line.
- Place a space between the selector and the opening brace.
- Place a space after the colon in declarations.
- End every declaration with a semicolon.
- Use `box-sizing: border-box` globally via the inherit pattern:

```css
html { box-sizing: border-box; }
*, *::before, *::after { box-sizing: inherit; }
```

- Use relative units (`rem`, `em`, `%`) over `px` wherever possible.
- Do not add a unit to `line-height`. Use a unitless ratio: `line-height: 1.5`.
- Avoid vendor prefixes in authored CSS — use Autoprefixer in the build pipeline.

#### Declaration order (within a rule)

1. Custom property declarations (`--token: value`)
2. Layout (`display`, `position`, `grid-*`, `flex-*`, `float`, `top`, `right`, etc.)
3. Box model (`width`, `height`, `margin`, `padding`, `border`)
4. Typography (`font-*`, `line-height`, `text-*`, `color`)
5. Visual (`background`, `box-shadow`, `opacity`, `transform`)
6. Interaction (`cursor`, `pointer-events`, `user-select`)
7. Animation (`transition`, `animation`)

### Architecture (SMACSS)

Organize styles into the following layers:

- **Settings** — custom properties and design tokens
- **Base** — normalize/reset, type selectors, universal rules
- **Layout** — page structure: header, footer, main content, grids
- **Modules** — reusable UI components (the majority of CSS)
- **Helpers** — global utility and state rules

File naming convention: `[category].[partial-name].css`

```
settings.tokens.css
base.normalize.css
base.elements.css
layout.grid.css
layout.containers.css
module.card.css
module.button.css
helpers.spacing.css
helpers.states.css
```

### Media Queries

- Mobile-first. Write base styles for the smallest viewport; add breakpoints upward.
- Place media queries alongside the rules they modify, not in a separate file.
- Use custom properties or a defined set of breakpoint values for consistency.

```css
.card {
    padding: var(--space-sm);

    @media (min-width: 48rem) {
        padding: var(--space-md);
    }

    @media (min-width: 64rem) {
        padding: var(--space-lg);
    }
}
```

---

## Modern CSS Features

The following features have reached Baseline or near-universal support and should be considered first-class tools, not experimental:

### Cascade Layers (`@layer`)

Use cascade layers to manage specificity across third-party styles, framework defaults, and your own code without relying on `!important` or selector hacks. Layers declared later win.

```css
@layer reset, tokens, base, layout, components, utilities;

@layer components {
    .card { /* component styles */ }
}
```

### Container Queries

Prefer container queries over media queries when a component's layout depends on the size of its parent rather than the viewport.

```css
.card-container {
    container-type: inline-size;
}

@container (min-width: 30rem) {
    .card {
        grid-template-columns: 1fr 2fr;
    }
}
```

### `:has()` Selector

Use `:has()` to style a parent based on its children — eliminates many of the JavaScript class-toggling patterns that were previously required.

```css
.card:has(img) {
    padding-top: 0;
}

.form-field:has(:invalid) {
    border-color: var(--color-error);
}
```

### Subgrid

Use `subgrid` when nested grids must align to a parent grid's tracks. This replaces the workaround of duplicating column definitions.

### Logical Properties

Prefer logical properties (`margin-inline`, `padding-block`, `border-inline-start`) over physical properties (`margin-left`, `padding-top`) when authoring layouts that may localize to RTL languages.

### Modern Color

Use `oklch()` for color definitions when fine control over perceived brightness matters. Use `color-mix()` to derive related colors from tokens without defining new variables.

```css
:root {
    --color-primary: oklch(60% 0.18 250);
    --color-primary-hover: color-mix(in oklch, var(--color-primary), black 10%);
}
```

### View Transitions

Use the View Transitions API for cross-document or in-page state animations that would otherwise require coordinated JS animation libraries.

### Other Worth Knowing

- `accent-color` — themes native form controls without restyling them.
- `aspect-ratio` — reserves space for media and prevents CLS.
- `text-wrap: balance` and `text-wrap: pretty` — typographic refinements that don't need JS.
- `scrollbar-gutter` — eliminates layout shift when scrollbars appear.

---

## Tailwind CSS Standards

### When to Use Tailwind

Use Tailwind on projects where:

- The project team has agreed to use it.
- The client codebase does not already have a conflicting CSS architecture.
- You are building component-driven UIs in React/JSX where utility classes stay co-located with markup.

Do not introduce Tailwind into a project that already has a custom CSS architecture without team agreement.

### Class Ordering

Follow a consistent utility class order within elements. The recommended order mirrors the vanilla CSS declaration order above: layout → box model → typography → visual → interaction → animation.

Use the [Prettier Tailwind plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) to enforce order automatically.

```tsx
// good — layout → spacing → typography → visual
<div className="flex items-center gap-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
```

### Extracting Components

Do not extract a utility group into a custom class just to reduce repetition. Prefer component abstraction (a reusable JSX component) over CSS abstraction (`@apply`).

Use `@apply` only when:
- You are working in a context where JSX components are not available (e.g. a CMS template).
- The class combination is used in more than three places and cannot be abstracted as a component.

```css
/* only if a JSX component is not an option */
.btn-primary {
    @apply px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700;
}
```

### Configuration

- Define all design tokens in `tailwind.config.js` under `theme.extend` — do not override the default theme wholesale unless intentional.
- Map brand colors, type scales, and spacing to custom properties so they are available both in Tailwind utilities and vanilla CSS rules.

```js
// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                text: 'var(--color-text)',
            },
            spacing: {
                sm: 'var(--space-sm)',
                md: 'var(--space-md)',
                lg: 'var(--space-lg)',
            },
        },
    },
};
```

---

## What Not to Do

- Do not use `!important` without a comment.
- Do not use ID selectors for styling.
- Do not write vendor prefixes manually — use Autoprefixer.
- Do not use `@import` in vanilla CSS for performance-critical paths — use a build tool to bundle CSS files.
- Do not mix Tailwind utilities and custom class names arbitrarily — agree on a boundary with your team (e.g. layout via custom classes, typography via Tailwind).
- Do not use Tailwind's `arbitrary values` (`w-[347px]`) for values that should be design tokens.
