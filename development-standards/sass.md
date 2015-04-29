# Sass Authoring Guidelines

## Programming Principles

May be distributed throughout the document, but DRY, nesting, careful with extends, etc...


### Versions

http://sass-lang.com/

Libsass vs Ruby Sass


### Errors & Warnings (if appropriate)

...

### Approved Properties (if appropriate)

...


### Disallowed Properties & Values (if appropriate)

...

## Tools & Libraries

Let's build our own library of functions and mixins that we can pull from for various projects...

We won't use vendor mixin libraries (Compass, Bourbon, etc) unless required by a client.

### Functions

Rules, standards...

### Mixins

Rules, standards...

## Format & Style

### Formatting for Readability

scss syntax

### Comments

Add comments to any rule that might not be readily understood by another developer. Also comment any vendor prefixed declarations to indicate targeted browsers, in order to make future removal easy.

Examples:

```css
/**
 * Use this format for long comments spanning multiple lines,
 * e.g. to describe a module
 */

/* Use this format for short comments, e.g. a note on a property */

/*----------------------------------------------*\
    #SECTION-NAME
\*----------------------------------------------*/

// Preprocessor comment, when you do not want it in the generated source
```

### Media Queries

Add media queries along with their base rulesets, ordered from smallest to largest.

```scss
.module {
	background: #fff;
	font-size: 1em;
	@media screen and (min-width: 20em) {
		background: #fff;
		font-size: 1.5em;
	}
	@media screen and (min-width: 40em) {
		background: #000;
		font-size: 2em;
	}
}
```

### Naming & Organization of Sass Partials

_[category].[partial-name].scss

e.g... corresponding to our categorization in css.md

_settings.variables.scss
_settings.functions.scss
_settings.mixins.scss

_base.normalize.scss
_base.universal.scss (box-sizing, etc)
_base.elements.scss (or _base.type.scss - type selectors, elements without classes)

_layout.grid.scss (if needed!)
_layout.justify.scss (reusable layout pattern)
_layout.containers.scss (sections, wrappers, etc)

_module.accordion.scss (specific UI module)
_module.object.media.scss (OOCSS structural abstraction)

_theme.admin.scss (example theme partial)

_helpers.spacing.scss
_helpers.width.scss
_helpers.states.scss


