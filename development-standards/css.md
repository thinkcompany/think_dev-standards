# CSS Development Standards

## Introduction

At Think Brownstone we've standardized around modular CSS with [Sass (Syntactically Awesome Style Sheets)](http://sass-lang.com/), focused on the approaches outlined in [Scalable and Modular Architecture for CSS (herein SMACSS)](https://smacss.com/), and peppered with some [Block, Element, Modifier (herein BEM)](http://bem.info/
) methodology.

### SMACSS

We break CSS down into five types of categories:

1. Base
2. Layout
3. Module
4. State
5. Theme

This helps us avoid complexity and easily move between style rules in a logically ordered way. 

### BEM

BEM is a front-end naming methodology that spans an entire project's lifecycle. Designers, Front-End Developers, and Back-End Developers are all working on the same codebase, and are always aware of how design decisions inform architecture decisions. These are the origins of the BEM methodology:

* Standard projects should be developed fast and the results last long: a product created in a short time, built on an architecture that ensures its maintainability and longevity for years.
* A project involves many people. The ability to efficiently organize people’s work in a team is important, whether it’s a team of two or dozens of developers.
* Scalable teams. Adding more people to a team should improve the team’s performance. A process must be in place that ensures that new developers are brought up to speed quickly and are duly allocated their specific areas of responsibility. Code must be carefully structured to ensure its maintainability over time and through team changes.
* Code reuse. Each new project or interface element should not be started from scratch. Code reuse between similar tasks should be maximized within the company. Code should not be context-dependent but be easily transferable to different contexts. 

[This Treehouse course](http://teamtreehouse.com/library/modular-css-with-sass) is a great place to start if you're new to these concepts.

## Sass and Project Setup

All new projects begin with a `_config.scss` file, which contains variables for the project. We're going to set some standard variables for use across other `.scss` files.

### Fonts

```
// ==========================================================================
// Global Config
// ==========================================================================

// Font Stacks

$font-url--google       		: ;

$font-family--primary   		: ;
$font-family--secondary       	: ;

// Font Weights

$font-weight--thin            	: 100;
$font-weight--light           	: 300;
$font-weight--medium          	: 400;
$font-weight--bold            	: 700;
$font-weight--ultra-bold      	: 900;

// Font Weights

// Descriptive Base Colors

// Color Usage

// Text

```

The format for font variable declarations is simple, and allows us to quickly see what style rules belong to what part of our project:

`$property-name--value-keyword`

`property-name` should be the CSS property name we're applying a style to, and `value-keyword` should be a fairly obvious indicator as to what the value will be for the property we're styling. The doulbe dash helps visually break up similar styles.

This closely follows the BEM naming convention, which will help down the line.

### Colors

It's important to define some custom color names, which will prevent us from needing to memorize hex or rgba values.

```
// Descriptive Base Colors

$white          	: #fff;
$black          	: #0b0b0b;
$grey          	: #797e83

$fountain-blue 	: #52bab3;
$emerald        	: #5ece7f;
$sunglo         	: #e67478;
$coral          	: #ff784f;
$purple-majesty 	: #9279c3;
$scooter        	: #39add1;
```

We also build out the shades and variations we use across the project:

```
// Color Usage

$color-primary 	: $fountain-blue;
$color-secondary  : $scooter;
$color-accent     : $emerald;
$color-shadow     : rgba($black, .2);
```

### Utilities

This is a collection of useful Sass mixins, functions, and directives that we use throughout our projects.

```
// ==========================================================================
// Utilities
// ==========================================================================

// Import if Google Fonts URL is defined

@if variable-exists(font-url--google) {
   @import url($font-url--google);
}

// Functions and Directives


// Mixins
```

This `@if variable-exists()` control declaration is an introspective Sass function determins if we've declared a variable. In this case, the variable exists, so we `@import` it into the compiled application.css file. This allows us to build a boilerplate Sass template, which will only make use of certain features if we're actually using them.

### Pixels to Em Function



### Notes

## Related Reading Material

[Dropbox Design Cabin](https://medium.com/@_dte/building-the-dropbox-design-cabin-9fdec4356671)