# CSS Development Standards

## Introduction

At Think Company we've standardized around modular CSS with [Sass (Syntactically Awesome Style Sheets)](http://sass-lang.com/), focused on the approaches outlined in [Scalable and Modular Architecture for CSS (herein SMACSS)](https://smacss.com/), and peppered with some [Block, Element, Modifier (herein BEM)](http://bem.info/
) methodology.

### Sass vs. LESS

You may be wondering why we've chosen Sass at Think Company. Sass provides the same functionality of LESS, but adds more advanced features. Along with that, The [development community around Sass](https://github.com/sass/sass) is more active than [that of Less](https://github.com/less/less.js).

Here's [a great article](http://css-tricks.com/sass-vs-less/) from Chris Coyier about the nuances of Sass vs. LESS.

### SMACSS

SMACSS is mostly a styleguide for how to best organize styles. We break CSS down into five categories:

1. Base
2. Layout
3. Module
4. State
5. Theme

This helps us avoid complexity and easily move between style rules in a logically ordered way. We can also use this structure to better plan the `sass-template` partials that make up our compiled CSS.

### BEM

BEM is a front-end naming methodology that spans an entire project's lifecycle. Designers, Front-End Developers, and Back-End Developers are all working on the same codebase, and are always aware of how design decisions inform architecture decisions. These are the origins of the BEM methodology:

* Standard projects should be developed fast and the results last long: a product created in a short time, built on an architecture that ensures its maintainability and longevity for years.
* A project involves many people. The ability to efficiently organize people’s work in a team is important, whether it’s a team of two or dozens of developers.
* Scalable teams. Adding more people to a team should improve the team’s performance. A process must be in place that ensures that new developers are brought up to speed quickly and are duly allocated their specific areas of responsibility. Code must be carefully structured to ensure its maintainability over time and through team changes.
* Code reuse. Each new project or interface element should not be started from scratch. Code reuse between similar tasks should be maximized within the company. Code should not be context-dependent but be easily transferable to different contexts.

[This Treehouse course](http://teamtreehouse.com/library/modular-css-with-sass) is a great place to start if you're new to these concepts.

## SMACSS and BEM together

@todo Describe how BEM can work in harmony with the base, layout, module, state, theme categories of the SMACSS methodology.

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
$grey          		: #797e83

$fountain-blue 		: #52bab3;
$emerald        	: #5ece7f;
$sunglo         	: #e67478;
$coral          	: #ff784f;
$purple-majesty 	: #9279c3;
$scooter        	: #39add1;
```

We also build out the shades and variations we use across the project:

```
// Color Usage

$color-primary 		: $fountain-blue;
$color-secondary  	: $scooter;
$color-accent     	: $emerald;
$color-shadow     	: rgba($black, .2);
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

This function uses math to automatically create `em` values out of `px` values. It can be used anytime we know pixel value and want it to be `em`.

```
// Calculate em values

@function em($target, $context: $base__font-size) {
  @return ($target / $context) * 1em;
}
```

Using the above function in our Sass is as easy as `h1 { font-size: em(42px); }`, which will take 42 pixels, divide that by our `$base__font-size` and output

### Sass Maps and Mixins

Sass maps allow you to specify groups of styles that contextually make sense together. These can then be used to generate contextual rulesets. For example:

```
// Descriptive Base Colors

$white    : #fff;
$black    : #0b0b0b;
$grey     : #797e83;

$fountain-blue  : #52bab3;
$emerald        : #5ece7f;
$sunglo         : #e67478;
$coral          : #ff784f;
$purple-majesty : #9279c3;
$scooter        : #39add1;

// UI Colors Map

$ui-colors: (
  default : $fountain-blue,
  success : $emerald,
  error   : $sunglo,
  warning : $coral,
  info    : $purple-majesty
);
```

The `$ui-colors` map now contains all of our UI colors, which could then easily be updated, and generate new CSS from our Sass files. Check it out:

```
// Mixins

@mixin bg-colors($map){
  @each $theme, $color in $map {
    &--#{$theme} {
      background-color: $color;
    }
  }
}
```

This mixin loops through the key, value pairs in `$ui-colors` to generate CSS selectors that are named after the relevant theme class, or ui-color. Check it:

```
.btn,
.progbar,
.tooltip{
  @include bg-colors($ui-colors);
}
```

We have now used a mixin on the `btn`, `progbar`, and `tooltip` classes, and passed the mixin our desired Sass map, `$ui-colors`. This will automagically generate the following:

```
.btn--default,
.progbar--default,
.tooltip--default {
  background-color: #52bab3; }
.btn--success,
.progbar--success,
.tooltip--success {
  background-color: #5ece7f; }
.btn--error,
.progbar--error,
.tooltip--error {
  background-color: #e67478; }
.btn--warning,
.progbar--warning,
.tooltip--warning {
  background-color: #ff784f; }
.btn--info,
.progbar--info,
.tooltip--info {
  background-color: #9279c3; }
```

So now, any time we want, we can change the hex value of our Sass color variables, or even declare new colors and replace old ones within the `$ui-colors` Sass map!

### Nested Sass Maps

http://teamtreehouse.com/library/modular-css-with-sass/getting-modular-with-mixins-and-functions/nested-sass-maps

### Background Image Mixin

http://teamtreehouse.com/library/modular-css-with-sass/getting-modular-with-mixins-and-functions/background-image-mixin

### Notes

## Related Reading Material

* [Dropbox Design Cabin](https://medium.com/@_dte/building-the-dropbox-design-cabin-9fdec4356671)
* [The Sass Way](http://thesassway.com/)
* [Sassy Starter](https://github.com/minamarkham/sassy-starter)