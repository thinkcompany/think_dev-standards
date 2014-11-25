# CSS Authoring Guidelines

## Programming Principles

"Styles change but style doesn't." Leverage the cascade and inheritance, write efficient selectors, remain in normal
flow as often as possible, and hack for older browsers as little as possible.

## Versions, Validation, & Linting

All style sheets must be authored according to the CSS Level 2, Revision 1 specification (CSS 2.1) or the latest CSS
Level 3 module in candidate recommendation status.

http://www.w3.org/TR/CSS2/

http://www.w3.org/Style/CSS/current-work#roadmap

Use the W3C validator and CSS Lint to check your style sheets.

http://jigsaw.w3.org/css-validator/

http://csslint.net/

### Errors & Warnings

Style sheets may not validate due to unsupported properties, such as:

* CSS3 selectors and rules (i.e. text-shadow or border-radius)
* vendor-specific prefixes for new CSS features (i.e. –moz, -webkit, or -ms)

Syntax or parsing errors are not acceptable and must be fixed. Lint warnings should be reviewed to ensure poor
programming practices are avoided.

### Approved Properties

All properties defined in CSS 2.1 may be used. Additionally, well-supported properties from CSS 3 specifications
that are in candidate recommendation status may be used; consult http://caniuse.com/ and the front-end
development team leads if unsure.

If vendor-specific prefixes (-moz, -webkit, and -ms) must be used to provide better styling coverage, be sure to
specify the prefixed property before the standard property.

Example:

```css
.example {
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	border-radius: 5px;
}
```

Since CSS 3 properties are not well supported in older versions of Internet Explorer, use CSS 3 properties only for
non-essential design details. Work with the designer to determine if fallback support is necessary, and document
decisions for the client.

### Disallowed Properties & Values

Do not use IE-proprietary styling (such as filters or expressions).

Refrain from using !important. The !important declaration is a hint that other CSS is overly specific. Rewrite any
CSS where you think that !important is necessary, unless there are extenuating circumstances such as unmodifiable,
third-party code.

## Tools & Libraries

### Preprocessors [GG: edited/updated from Sass section]

TBI will be incorporating Sass as a common CSS development tool. Build Kit deliverables will not include SCSS files
unless requested by the client.

We will use the SCSS syntax for Sass files, along with the .scss file extension.

http://sass-lang.com/

We won't use vendor mixin libraries (Compass, Bourbon, etc). It's an unnecessary dependency and we would likely only need a small subset of what they provide. Instead we will write our own mixins or extract the best of what's useful from a library and include it in our own stylesheets.

### Browser Resets (Normalize)

Use the latest copy of normalize.css as the starter CSS for any project. Do not use reset.css unless a client requests
it.

http://necolas.github.io/normalize.css/

Use other open source libraries at the client's request, or after discussion with the TBI UI Dev team.

## Format & Style

### Formatting for Readability

Each rule in a CSS file will occupy multiple lines, unless the rule contains a single declaration. For readability, place
each property on its own line and indent to standard spacing (one tab space).

Spaces should be used between:

* a rule's final selector and the opening curly brace of the declaration
* each value in a declaration
* a declaration's colon and value

There should be no space between a declaration's value and the closing semicolon.

Examples:

```css
.component {
	margin: 0 0 15px 0;
	padding: 0;
}

.error { color: #f00; }
```

Do not indent rules; all rules should be flush with the left margin of the editor.

### Comments

Add comments to any rule that might not be readily understood by another developer. Also comment any vendor prefixed
declarations to indicate targeted browsers, in order to make future removal easy.

Always retain comments related to licensing of open source code. Comments may never contain alarming or
negative language (i.e. "hack to fix broken IE") nor individual programmer names, handles, URLs, etc.

Examples: [GG: Added]

```css
/**
 * Use this format for long comments spanning multiple lines,
 * e.g. to describe a component
 */

/* Use this format for short comments, e.g. a note on a property */

/*----------------------------------------------*\
    #SECTION-NAME
\*----------------------------------------------*/

// Preprocessor comment, when you do not want it in the generated source
```

### Selectors

Aside from a base style sheet, which will specify default styles for HTML element types, most selectors should be
composed by referencing class names. Attribute selectors may also be used, especially with form controls. Using
IDs in selectors is highly discouraged.

Class names should follow the HTML coding practices: Assign names to objects based on the function they fulfill
rather than what they look like. Names should be a single lowercase word. In cases where a longer description is
needed, separate words using hyphens.

Class names should be constructed from generic to specific (e.g. list-vertical, list-inline vs vertical-list, inline-list; .nav, .nav-primary, .nav-secondary) [GG: Added]

Refrain from over-qualifying selectors (i.e. body.class) and using adjoining classes (i.e. .component.variant). Never
use the universal selector (*). Keep in mind that selectors are parsed from right to left – not left to right – so only
be as specific as you need to be in composing a selector.

Use quotes in your attribute selectors, even though they are not always required. [GG: Added]

Poor examples:

```css
#topHeader {...}
#topHeader div.xpBar {...}
#topHeader * {...}
input[type=text] {...}
```

Good examples:

```css
.header {...}
.header .navigation {...}
.header a {...}
.header-alt {...}
input[type="text"] {...}
```

Modifier classes are applied to components when there are slight variants in visual display that do not necessitate
an entirely new component. Both the base class name and the modifier class name are applied to the markup, but
selectors are composed using only the modified class name. To create a modifier class, repeat the base class name,
followed by a hyphen, then the modifier name.

```css
.base {...}
.base-modifier {...}
```

Example:

```html
<button class="btn btn-primary" type="submit">Button Text</button>
```

### Properties

#### Declaration Order

Always specify CSS properties in the following order. This enhances readability and helps compression algorithms.

This order also helps troubleshooting efforts by placing the most commonly problematic properties at the
beginning.

* z-index
* position (and top, bottom, left, right)
* float / clear
* display
* overflow
* width / height
* margin
* border
* padding
* background
* color
* font
* list
* line
* text
* letter

#### Shorthand

Always use the shorthand version of a property. When using the cascade to overwrite a rule with a more specific
one, use the shorthand version on the main rule and the expanded version in the superseding rule.

Example:
```css
.example {
	margin: 5px 2px 10px 2px;
}

.example-alt {
	margin-bottom: 20px;
}
```

If multiple values of the shorthand property need to be overridden, then simply re-write the entire set of shorthand
values.

#### Line-height

Don't use a unit on the line-height property. line-height: 1.5 is the same as line-height: 150% and doesn't affect child elements when used without a unit.

#### Vendor Prefixes [GG: added]

Avoid using vendor prefixes in authored stylesheets when possible.

Instead use Autoprefixer, https://github.com/postcss/autoprefixer in your build script to add these automatically.

If Autoprefixer cannot be used, refer to caniuse.com for the prefixes required for the browsers you support.


#### Box Model & Layout Dimensions

Existing code largely uses the traditional box model (content-box). New code (templates based on HTML5 doctype)
may make use of border-box sizing instead, depending on browser compatibility requirements. Discuss with the
lead front-end developers when there are questions concerning box model sizing.

Existing code largely uses pixels to define all box-model dimensions, however, responsive design techniques are
increasingly practiced, relative values (percents or ems) may be used. Care must be taken to ensure that sizing
values do not complicate content requirements and agree with the UX team's intended vision for the design.

#### Flow, Floats, & Positioning

Allow markup to be rendered by the browser as often as possible in normal flow. When creating layouts, choose
carefully between the use of floats and positioning.

When floats are used for layout, ensure the parent container is assigned the overflow property, so that its height
takes the floated elements into consideration. Do not use ugly "clearfix" hacks.

When positioning is used for layout in a component-based system, ensure that the container wrapper has
position:relative set, in order to set the appropriate parent for positioned children.

#### Fonts

In older CSS, use font size measurements that are common to the existing code. For example, if pixel sizes have
been used on a page, continue using pixel sizes.

In newer CSS, where the base CSS sets the body font size 16px, use relative units (em, rem) to specify font sizes.

[GG: Added an example] When using rems for font-size, provide a px fallback for browsers that do not support rem.

Example:

```css
	.component {
		font-size: 12px;
		font-size: .75rem;
	}
```

When developing a style sheet based on a Photoshop document, translate points directly into pixels. For example,
if the Photoshop document displays a heading at 24 points, use 24 pixels in the CSS rule.

Always end font-family declarations with a generic font family (i.e. serif, sans-serif).

#### Colors

Use hexadecimal notation (lowercase) to define colors without alpha-transparency. Reduce six-character values to three character
values whenever possible. Developers may use RGBA color as long as a hex fallback is also provided for
browsers that do not support RGBA.

Example:

```css
.button {
	color: #f00;
	color: rgba(255,0,0,.2);
}
```

#### Images

Unless coding a responsive design, set image dimensions using the width and height attributes of the IMG tag in
the HTML source. If this is not possible (i.e. you do not have access to the appropriate template file) then set the
dimensions using the CSS width and height properties.

Set image presentation attributes using CSS. Always remove the border from images nested inside anchors. By
default, this rule should be specified in the base CSS file.


Example:

```css
a img { border: 0; }
```

#### Anchors

Encourage designers to visually distinguish between visited and unvisited links, to improve usability. When using
the :hover pseudo-class for anchors, always specify a corresponding value for :focus and :active to aid keyboard
navigation. The order of these selectors matters, so always specify in LVHFA order.

Example:

```css
.nav a:link {
	color: #fff;
	background: #000;
}

.nav a:visited {
	color: #0000f6;
}

.nav a:hover,
.nav a:focus,
.nav a:active {
	color: #f60000;
}
```

#### Sprites

CSS sprites are best used to combine graphic design elements such as logos, icons, buttons and badges that will
display well when compressed in PNG format. Do not use sprites to combine content images or photographs.

When writing rules for sprites, first create a class that will be used for all of the sprites in a series (i.e. "icon").
Specify all of the relevant style data in this initial rule, including:

* display
* width
* height
* overflow
* background

For all of the different icons in the series (i.e. "video", "photo", etc.) you only need to specify a new background-position
value that corresponds to the pixel coordinates in the sprite graphic file.

Example:

```css
.icon {
	display: block;
	width: 10px;
	height: 10px;
	overflow: hidden;
	background: transparent url(/layout/images/sprites/standard/base.png) no-repeat 0 0;
}
.icon-video {
	background-position: 0 -50px;
}
.icon-photo {
	background-position: 0 -100px;
}
```

#### Hack Strategy

Minimize the use of hacks by re-writing rules that are problematic for particular browsers.

When hacks are necessary, write a browser-specific hack in the style sheet directly following the affected rule. Add
a comment detailing what the hack rule is doing and for which browser it is intended.

Example:

```css
.button {
	padding: 3px;
}
/* sets equivalent padding on button class in IE7 */
*:first-child+html .button {
	padding: 6px;
}
```

Do not link to an external stylesheet for hack rules unless there are major layout overrides needed to support IE7
or IE8. These older browser are already slow, and forcing the browser to download an additional will further
impact page performance. If an additional style sheet is necessary, however, use conditional comments to load it
only for the browsers that need it.

## Coding Practices

This section represents general coding practices that should be considered when authoring and organization stylesheets.

### Be pragmatic [GG: added]

Don't add a class to absolutely everything that needs to be styled.

Lists, for example, often won't need a class for each list item. Instead, class the ul/ol and use a child selector to keep the markup cleaner.

Example:

```css
.list-vertical {}
.list-vertical .list-item {}

/* instead use */
.list-vertical > li {}
```

### Recommended File Structure [GG: EDITED, changed section comment style]

To enhance readability, use comments to divide a style sheet into logical sections. Write rules for elements in the
order in which they appear in the HTML source. [GG: Is this last sentence relevant if we're organizing by object and component?]

Comment each section as follows:

```css
/*----------------------------------------------*\
    #HEADER
\*----------------------------------------------*/

.header-global {
	...
}
/*----------------------------------------------*\
    #NAV
\*----------------------------------------------*/

.nav-primary {
	...
}
/*----------------------------------------------*\
    #FOOTER
\*----------------------------------------------*/

.footer-global {
	...
}
```

### Additional Stylesheets

Each discrete component or module appearing on a page should be styled by a separate style sheet (or Sass partial). Selectors
should always be namespaced to avoid conflicts with other components.

Example:

```css
.component-body {
	margin: 0 0 20px 0;
}
```

A developer should be able to edit a component style sheet without introducing bugs into other parts of the site.

### Specificity [GG: Added]

Keep specificity low and author CSS in specificity order as much as possible - from general to specific, low specificity to high specificity, global to localized.

Guidelines:

* If a selector will work without it being nested, don't nest it. It adds specificity where it often isn't needed.
* Don't nest more than three levels, including child selectors (>) and pseudo-selectors/elements (:).
* Avoid chaining selectors when possible
* Avoid location-specific selectors
* Avoid styling IDs. If an ID must be styled, use an attribute selector: [id="identifier"]. This has the same specificity as a class/attribute selector. Note that IDs will be used in markup where appropriate (form elements, aria attribute targets), but should not be styled.

Bad example:

```css
.component {}
.component .component-subcomponent {} /* nested, unnecessarily specific */

.component.modifier {} /* avoid chaining */
.sidebar .component {} /* avoid location-specific selectors */
```

Good example:

```css
.component {}
.component-subcomponent {} /* e.g. component-body */
.component-modifier {} /* div class="component component-modifier" */
```

### Grouping Styles

Styles applying to a particular object should be grouped into a single rule. Do not specify a selector multiple times
and spread out properties across multiple rules.

Bad Example:

```css
.header {
	background-color: #fff;
	margin: 10px 0 15px 5px;
}
.header, .footer {
	color: #bada55;
}
```

Good Example:

```css
.header {
	margin: 10px 0 15px 5px;
	color: #bada55;
	background-color: #fff;
}
.footer {
	color: #bada55;
}
```

### Media Queries [GG: Added, needs additional content and examples]

When using Sass, add media queries along with their base rulesets, ordered from smallest to largest. Otherwise, media queries should be placed in separate files.

Sass example:

```scss
.component {
	background: white;
	font-size: 100%;
	@media screen and (min-width: 20em) {
		background: gray;
		font-size: 150%;
	}
	@media screen and (min-width: 40em) {
		background: black;
		font-size: 200%;
	}
}
```

## Integration

### Integrating CSS with HTML

#### CSS Location

Always link style sheets in the HEAD of an HTML document, before any JavaScript or favicon references. Never use
inline styles. Never insert a STYLE tag into the BODY of an HTML document.

#### CSS Ordering [GG: Needs review/edit - or refer to Grebb's doc]

Global files must be included first so that they may be over-written by more specific component styles. Style
sheets referenced by conditional comments (usually browser-specific files) should be included last.

1. Base (normalize, global, grid)
2. Components (1 through n)
3. Theme
4. Page-specific

[GG: Consider the following as well as SMACSS]

1. Settings (variables/config switches - only if preprocessor is used)
2. Tools (mixins/functions - only if preprocessor is used)
3. Base (normalize, box-sizing, type selectors)
4. Objects (abstracted, reusable patterns)
5. Components (discrete UI components)
6. Helpers (state, helpers)

[GG: edit - should we make this a practical limit, such as 3 - 5 max?] NOTE: Do not exceed 30 style sheets per page. Internet Explorer (any version) will stop importing style sheets after
it reaches 30, and the browser will not report an error, making debugging difficult.

### Integrating CSS with JavaScript

When visual changes must be applied using JavaScript, the script must change the class value of the element. The
rules for the visual change must be included in the appropriate style sheet.

Example Style:

```css
.tab-selected {
	background-color: #ccc;
	font-weight: bold;
}
```

Corresponding JQuery Snippet:

```javascript
$('.tab').click(function() {
	$(this).addClass('tab-selected');
});
```

Developers may use JavaScript to add inline styles to an element only when the values will not be known ahead of
time, such as when changing the position of an element during a drag-and-drop event.

When jQuery is implemented as part of a Build Kit or other deliverable, use the hide() and show() functions in
jQuery to toggle the display property of an element, which adds an inline style. All other visual changes must be
made by changing class names.

#### Binding [GG: Added]

Use "js-" prefixed classes (or data attributes such as date-js="something" for JavaScript hooks. Don't ever style these, and don't bind JavaScript other classes or IDs.


## To do [GG: Added]

- [ ] Create Sass rules for mixins, extends, placeholders (should we even use extends, placeholders, and nesting?)
- [ ] Create rules/variables for z-index scale
- [ ] Create rules for naming media queries in Sass
- [ ] Create rules for no-js styling
- [ ] Rules/process for IE<9 in responsive/mobile-first sites
- [ ] Decide about linting and which rules to apply
- [ ] Standards for self-hosted webfonts and vendor-hosted webfonts
- [ ] Rules for Sass variable naming ($type-small or $fontsize-small vs $font-small, etc, colors, ...) [property]-[value]-[varient/component] (e.g. $color-gray-light)
- [ ] Rules for modifier and subcomponent (self-contained components/modules) naming
- [ ] Think about how to bundle our styles - 1 file, multiple? Try for 3 or fewer css references per page (all, section, page)
- [ ] Consider prefixing helpers/utility with u-, and mixins with m-
- [ ] Consider whether component isolation may be a better approach than abstracting reusable objects. Maybe objects should be a very limited set of single responsibility classes/modules (e.g. pipe list)
- [ ] Consider prefixing state selectors with "is-", (e.g. .is-open)