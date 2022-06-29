---
title: SASS Authoring Guidelines
date: "2021-04-01T23:46:37.121Z"
area: SASS
section: 1. Overview
description: ""
---

## Table of Contents

 - [Programming Principles](#programming-principles)
 - [Versions & References](#versions--references)
 - [Tools & Libraries](#tools--libraries)
 - [Vendor Prefixes](#vendor-prefixes)
 - [Format & Style](#format--style)
 - [Formatting for Readability](#formatting-for-readability)
 - [Declaration Order](#declaration-order)
	- [Media Queries](#media-queries)
	- [Comments](#comments)
	- [Naming](#naming)
	- [Sass Language Features](#sass-language-features)
		- [Nesting](#nesting)
		- [Variables](#variables)
		- [Mixins & Functions](#mixins--functions)
		- [Maps](#maps)
		- [Extend](#extend)
	- [Naming & Organization of Sass Partials](#naming--organization-of-sass-partials)
		- [Naming convention for partials](#naming-convention-for-partials)
		- [Partial Headers](#partial-headers)
		- [CSS File Generation](#css-file-generation)

## Programming Principles

Write Sass in the most readable and maintainable way (e.g. as close to regular CSS) as possible while taking advantage of the conveniences that the language provides. Don't introduce unnecessary, hard-to-read complexity just because Sass allows you to.

Even though we are using a preprocessor, the standards and principles written in our [CSS Authoring Guidelines](../css/index.md) still apply with regard to formatting, naming, specificity, and modularity.

View the resulting CSS frequently to ensure the quality meets our standards.

### Versions & References

The official Sass language site is http://sass-lang.com, and lists the most current version of Sass along with links to release notes and the Github repository.

The site also provides setup and learning materials to help you get started with Sass.

### Tools & Libraries

We won't use vendor mixin libraries (Compass, Bourbon, etc) unless required by a client/project. It creates an unnecessary dependency. Rather, we'll maintain a library of our own useful mixins and functions that we can pull into projects as needed.

### Vendor Prefixes

Don't write vendor prefixes directly in your Sass rules. Instead, use a build tool such as Autoprefixer to handle it automatically, or use a mixin if Autoprefixer is not an option for the project.

## Format & Style

### Formatting for Readability

We will use the SCSS syntax, which is similar to standard CSS, with the addition of nesting.

```scss
a {
	color: blue;
	&:hover,
	&:focus {
		text-decoration: underline;
	}
}
```

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

### Media Queries

Media queries should be named and added along with their base rulesets, ordered from smallest to largest (assuming a mobile-first approach).

```scss
.module {
	background: #fff;
	font-size: 1em;
	@include mq($bp-small) {
		background: #333;
		font-size: 1.5em;
	}
	@include mq($bp-medium) {
		background: #000;
		font-size: 2em;
	}
}
```

### Comments

Add comments to any rule that might not be readily understood by another developer. More is better than less, as they'll be stripped out during minification/compression and will not increase the size of the resulting CSS.

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

### Naming

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

## Sass Language Features

This sections covers some of the most commonly used features of Sass and related best practices. It is not meant to be a comprehensive review of the language.

### Nesting

A general rule of thumb is to avoid nesting more than 3 levels, including pseudo classes and elements. Ensure that the CSS output adheres to the specificity rules defined our CSS Authoring Guidelines documentation.

### Variables

Use variables for all common/reusable values such as colors, fonts, spacing and z-index values.

Examples:

```scss
$color-primary: #336699;

$z-modal: 500;

$font-stack: helvetica, arial, sans-serif;

$space-large: 2em;
```

### Mixins & Functions

The main objective of mixins and functions is keeping your code DRY. Make these as simple as possible, sticking to single purpose and avoiding unnecessary complexity.

Document all parameters for mixins and functions, as well as the return value for functions, as follows:

```scss
// Brief description/purpose for mixin or function, e.g. URL encode a string

// @param {String} $string - string to encode
// @return {String} - encoded string

@function url-encode($string) {
	// ...
	@return $string;
}
```

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

Use `@extend` cautiously, and check the CSS output carefully to ensure that you are not generating unintended selectors.

This is particularly true when a class that has nested selectors is extended, because all of the nested classes/elements will also be extended. This should be avoided.

A better way to use `@extend`, which reduces the chances of bloating your css, is to extend a placeholder rather than a selector (see http://csswizardry.com/2014/01/extending-silent-classes-in-sass), and extend only closely related rulesets such as the button example below.

When you want to share declarations with multiple, unrelated rulesets (e.g. using a particular font family on headings as well as a specific module), a `mixin` is a better choice.

```scss
.btn,
%btn { // placeholder
	display: inline-block;
	padding: 1em;
	background: gray;
	border-radius: 3px;
}

// extend the placeholder rather than the class

.btn--primary {
	@extend %btn;
	background-color: green;
}

.btn--secondary {
	@extend %btn;
	background-color: blue;
}
```

## Naming & Organization of Sass Partials

Organize and name Sass partials using the following guidelines, based on the CSS categories we defined in our CSS Authoring Guidelines. Note that partials should always begin with an underscore - this lets Sass know that the file should not generate a CSS file.

### Naming convention for partials

_[category].[partial-name].scss

Example:

```scss
_settings.variables.scss
_settings.functions.scss
_settings.mixins.scss

_base.normalize.scss
_base.universals.scss (box-sizing, etc)
_base.elements.scss (type selectors, elements without classes)

_layout.grid.scss (if needed)
_layout.justify.scss (reusable layout pattern)
_layout.containers.scss (sections, wrappers, etc)

_module.accordion.scss (specific UI module)
_module.object.media.scss ("object" indicates an OOCSS structural abstraction)

_theme.admin.scss (example theme partial)

_helpers.spacing.scss
_helpers.width.scss
_helpers.states.scss
```

### Partial Headers

It's good practice to add comments at the top of each partial with the name of the partial, along with a block comment describing the purpose of the partial.

Example:

```scss
/*----------------------------------------------*\
    #PARTIAL-NAME
\*----------------------------------------------*/

/**
 * Description of the purpose of this partial, e.g. overview of a module
 */

 .module {
 	// module styles...
 }
```

### CSS File Generation

Sass partials will be combined to generate CSS files by importing one or more partials.

Example that will generate a base.css file: 

```scss
// base.scss

@import 'base.normalize';
@import 'base.universals';
@import 'base.elements';
```  

You do not need to include the underscore or the file extension in the @import. 

All rules should reside in partials. Do not add any rules directly into files that import partials.

If you are using any 3rd party Sass libraries, those should be imported first, e.g.:

```scss
@import "compass";

@import "base.normalize";
...
```