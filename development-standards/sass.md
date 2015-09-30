# Sass Authoring Guidelines

This document contains Think Brownstone's standards for writing Sass.

## Programming Principles

Write Sass in the most readable and maintainable way (e.g. as close to regular CSS) as possible while taking advantage of the conveniences that the language provides. Don't introduce unnecessary, hard-to-read complexity just because Sass allows you to.

Even though we are using a preprocessor, the standards and principles written in our [CSS Authoring Guidelines](https://bitbucket.org/thinkbrownstone/tbi_dev-standards/src/2f99262f5306b4f981c353d46fc9459e4f57d465/development-standards/css.md?at=master) still apply with regard to formatting, naming, specificity, and modularity.

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

```scss
$color-primary: #336699;

$z-modal: 500;

$font-stack: helvetica, arial, sans-serif;

$space-large: 2em;
```

#### Mixins & Functions

The main objective of mixins and functions is keeping your code DRY. Make these as simple as possible, sticking to single purpose and avoiding unnecessary complexity.

Document all parameters for mixins and function, and the return value for functions, as follows:

```scss
// Brief purpose for the mixin or function, e.g. URL encode a string

// @param {String} $string - string to encode
// @return {String} - encoded string

@function url-encode($string) {
	// ...
	@return $string;
}
```

#### Naming

Name variables, mixins, and functions similarly to the way classes are named - lowercase and hyphen-delimited.

```scss
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

```scss
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

```scss
$primary-font: sans-serif;

background-image: url('/images/photo.jpg');
```

### Numbers & Units

Numbers should always have a leading 0 before decimals (0.5, not .5), but ever a trailing 0 (e.g. 1em, not 1.0em)

To add a unit to number, multiply the value by 1 unit (25 * 1px = 25px), to remove a unit divide by 1 unit (25px / 1px = 25).

### Maps

Sass maps allow you to define a key/value structure. These are useful for defining collections of related values such as a z-index scale or list of breakpoints.

```scss
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

### Extend

Use @extend cautiously, and check the CSS output carefully to ensure that you are not generating unintended selectors.

This is particularly true if you extend a class that has nested selectors, because all of the nested classes/elements will also be extended. This should be avoided. (see http://oliverjash.me/2012/09/07/methods-for-modifying-objects-in-oocss.html)

A better way to use @extend, which reduces the chances of bloating your css, is to extend a placeholder `%placeholder` rather than a selector (see http://csswizardry.com/2014/01/extending-silent-classes-in-sass), and extend only closely related rulesets such as the button example below.

When you want to share declarations with multiple, unrelated rulesets, a `mixin` is a better choice.

```scss
.btn,
%btn {
	display: inline-block;
	padding: 1em;
	background: gray;
	border-radius: 3px;
}

.btn--primary {
	@extend %btn;
	background-color: green;
}

.btn--secondary {
	@extend %btn;
	background-color: blue;
}
```

### Nesting

A general rule of thumb is to avoid nesting more than 3 levels, including pseudo classes and elements. Ensure that the CSS output aheres to the specificity rules defined our CSS Authoring Guidelines documentation.

### Declaration Order

Use the following declaration order inside Sass rules:

1. @extend
2. @include
3. Regular declarations
4. Pseudo-class/elements
5. Nested selectors
6. Media queries

```scss
.module {
	@extend %module;
	@include mixin($argument);
	property: value;
	&:pseudo {
		// styles
	}
	.nested {
		// styles
	}
	@include mq($size) {
		// styles
	}
}
```

### Comments

Add comments to any rule that might not be readily understood by another developer. More is better than less, as they'll be stripped out during minification/compression.

Examples:

```scss
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

Organize and name Sass partials using the following guidelines, based on the CSS categories we defined in our CSS Authoring Guidelines. Note that partials should always begin with an underscore - this lets Sass know that the file should not generate a CSS file.

Naming convention:

_[category].[partial-name].scss

Example:

```scss
_settings.variables.scss
_settings.functions.scss
_settings.mixins.scss

_base.normalize.scss
_base.universals.scss (box-sizing, etc)
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
### CSS File Generation

Sass partials will be combined to generate CSS files by importing one or more partials.

Example that will generate a base.css file. 

```scss
// base.scss

@import 'base.normalize';
@import 'base.universals';
@import 'base.elements';
```  

Note that you do not need to include the underscore or the file extension in the @import. 

All rules should reside in partials. Do not add any rules directly into files that import partials.

If you are using any 3rd party Sass libraries, those should be imported first, e.g.:

```scss
@import "compass";

@import "base.normalize";
...
```