# Sass Authoring Guidelines

This document contains Think Brownstone's standards for writing Sass.

## Programming Principles

Write Sass in the most readable and maintainable way (e.g. as close to regular CSS) as possible while taking advantage of the conveniences that the language provides. Don't introduce unnecessary, hard-to-read complexity just because Sass allows you to.

Even though we are using a preprocessor, the standards and principles written in our CSS Authoring Guidelines still apply with regard to formatting, naming, specificity, and modularity.

View the resulting CSS frequently to ensure the quality meets our standards.

### Versions & References

The official Sass language site is http://sass-lang.com, and lists the most current version of Sass along with links to release notes and the Github repository.

The site also provides setup and learning materials to help you get started with Sass.

### Tools & Libraries

We won't use vendor mixin libraries (Compass, Bourbon, etc) unless required by a client/project. It creates an unnecessary dependency. Rather, we'll maintain a library of our own useful mixins and functions that we can pull into projects as needed.

### Variables, Mixins, & Functions

#### Variables
Use variables for all common/reusable values such as colors, fonts, spacing and z-index values.

Examples:

```css
$color-primary: #336699;

$zModal: 500;

$font-primary: helvetica, arial, sans-serif;

$space-large: 2em;
```

#### Mixins & Functions

Document all parameters for mixins and function, and the return value for functions, as follows:

```css
// Brief purpose for the mixin or function, e.g. URL encode a string

// @param {String} $string - string to encode
// @return {String} - encoded string

@function url-encode($string) {
	// ...
	@return $string;
}
```

#### Naming

Name variables, mixins, and functions similarly to the way classes are named.

```css
$base-font-size: 1rem;
	
@mixin breakpoint($size) {
	// ...
}

@function url-encode($string) {
	// ...
}
```

## Format & Style

### Formatting for Readability

We will use the SCSS syntax, which is similar to standard CSS.

```css
a {
	color: blue;
	&:hover,
	&:focus {
		text-decoration: underline;
	}
}
```

### Strings

Quote strings in Sass unless they are intented to be CSS values.

```css
$primary-font: sans-serif;

$font-stack: ('helvetica', 'arial', sans-serif);

background-image: url('/images/photo.jpg');
```

### Numbers & Units

Numbers should always have a leading 0 before decimals (0.5, not .5), but ever a trailing 0 (e.g. 1em, not 1.0em)

To add a unit to number, multiply the value by 1 unit (25 * 1px = 25px), to remove a unit divide by 1 unit (25px / 1px = 25).

### Maps

Sass maps allow you to define a key/value structure. These are useful for defining collections of related values such as a z-index scale or list of breakpoints.

```css
// define a Sass map
$z-index: (
	'modal': 100,
	'tooltip': 150
);

// use a Sass map

.tooltip {
	z-index: map-get($z-index, 'modal');
}
```

In practice, define a function to check whether or not a key exists in the map prior to calling the map-get function, then return the value of the matching key.

### Extend & Placeholders

When using @extend, it is preferred to extend a placeholder rather than an actual selector. Extending selectors can create bloat in the form of unintended selector generation.

```css
// typical use

.btn {
	display: inline-block;
	border-radius: 3px;
}

.btn-primary {
	@extend btn;
	background: $primary-color;
}

// preferred

%btn {
	display: inline-block;
	border-radius: 3px;
}

.btn-primary {
	@extend %btn;
	background: $primary-color;
}
```

### Nesting

A general rule of thumb is to avoid nesting more than 3 levels, including pseudo classes and elements. Ensure that the CSS output aheres to the specificity rules defined our CSS Authoring Guidelines documentation.


### Comments

Add comments to any rule that might not be readily understood by another developer. More is better than less, as they'll be stripped out during minification/compression.

Examples:

```css
/**
 * Use this format for long comments spanning multiple lines,
 * e.g. to describe a module
 */

/*----------------------------------------------*\
    #SECTION-NAME
\*----------------------------------------------*/

// Preprocessor comment, when you do not want it in the generated source
```

### Media Queries

Media queries should be named and added along with their base rulesets, ordered from smallest to largest (assuming a mobile-first approach).

```scss
.module {
	background: #fff;
	font-size: 1em;
	@include bkpt($bp-small) {
		background: #fff;
		font-size: 1.5em;
	}
	@include bkpt($bp-medium) {
		background: #000;
		font-size: 2em;
	}
}
```

## Naming & Organization of Sass Partials

Organize and name Sass partials using the following guidelines, based on the styling categories we defined in our CSS Authoring Guidelines (note that partials should always begin with an underscore):

_[category].[partial-name].scss

```scss
_settings.variables.scss
_settings.functions.scss
_settings.mixins.scss

_base.normalize.scss
_base.universal.scss (box-sizing, etc)
_base.elements.scss (type selectors, elements without classes)

_layout.grid.scss (if needed!)
_layout.justify.scss (reusable layout pattern)
_layout.containers.scss (sections, wrappers, etc)

_module.accordion.scss (specific UI module)
_module.object.media.scss (OOCSS structural abstraction)

_theme.admin.scss (example theme partial)

_helpers.spacing.scss
_helpers.width.scss
_helpers.states.scss
```

### 