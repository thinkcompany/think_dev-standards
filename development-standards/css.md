# CSS Authoring Guidelines

## Programming Principles

"Styles change but style doesn't." Leverage the cascade and inheritance, write efficient selectors, remain in normal flow as often as possible, and hack for older browsers as little as possible.

### Versions, Validation, & Linting

All style sheets must be authored according to the CSS Level 2, Revision 1 specification (CSS 2.1) or the latest CSS Level 3 module in candidate recommendation status.

http://www.w3.org/TR/CSS2/

http://www.w3.org/Style/CSS/current-work#roadmap

Use the W3C validator and CSS Lint to check your style sheets.

http://jigsaw.w3.org/css-validator/

http://csslint.net/

### Errors & Warnings

Style sheets may not validate due to unsupported properties, such as:

* CSS3 selectors and rules (i.e. text-shadow or border-radius)
* vendor-specific prefixes for new CSS features (i.e. –moz, -webkit, or -ms)

Syntax or parsing errors are not acceptable and must be fixed. Lint warnings should be reviewed to ensure poor programming practices are avoided.

### Approved Properties

All properties defined in CSS 2.1 may be used. Additionally, well-supported properties from CSS 3 specifications that are in candidate recommendation status may be used; consult http://caniuse.com/ and the front-end development team leads if unsure.

If vendor-specific prefixes (-moz, -webkit, and -ms) must be used to provide better styling coverage, be sure to specify the prefixed property before the standard property.

Example:

```css
.example {
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	border-radius: 5px;
}
```

Since CSS 3 properties are not well supported in older versions of Internet Explorer, use CSS 3 properties only for non-essential design details. Work with the designer to determine if fallback support is necessary, and document decisions for the client.

### Disallowed Properties & Values

Do not use IE-proprietary styling (such as filters or expressions).

Refrain from using !important. The !important declaration is a hint that other CSS is overly specific. Rewrite any CSS where you think that !important is necessary, unless there are extenuating circumstances such as unmodifiable, third-party code.

In cases where legacy browser support is required, work with the design team to determine acceptable defaults for properties that are not supported (e.g. use a border rather than a drop shadow in IE7/8).

## Tools & Libraries

### Preprocessors

Think Brownstone will be incorporating Sass as a common CSS development tool. Build Kit deliverables will optionally include Sass if requested by the client.

See [Sass Authoring Guidelines](https://bitbucket.org/thinkbrownstone/tbi_dev-standards/src/687d257a91c14e161c96d999a89f07a1672b1d52/development-standards/sass.md?at=master) for more information about those standards.

### Browser Resets (Normalize)

Use the latest copy of normalize.css as the starter CSS for any project. Do not use reset.css unless a client requests it.

http://necolas.github.io/normalize.css/

Use other open source libraries at the client's request, or after discussion with the Think Brownstone UI Development team.

## Format & Style

### Formatting for Readability

Each rule in a CSS file will occupy multiple lines, unless the rule contains a single declaration. For readability, place each property on its own line and indent to standard spacing (one tab space).

Spaces should be used between:

* a rule's final selector and the opening curly brace of the declaration
* each value in a declaration
* a declaration's colon and value
* after a comma, in comma-separated property values

There should be no space between a declaration's value and the closing semicolon.

Examples:

```css
.module {
	margin: 0 0 15em 0;
	padding: 0;
	background-image: url("img1.png"), url("img2.png");
}

.error { color: #f00; }
```

Do not indent rules; all rules should be flush with the left margin of the editor.

### Quotes

Always use double quotes for property values.

Examples:

```css
.module {
	background-image: url("img1.png");
}
.module:before {
	content: "";
}
```

### Comments

Add comments to any rule that might not be readily understood by another developer. Also comment any vendor prefixed declarations to indicate targeted browsers, in order to make future removal easy.

Always retain comments related to licensing of open source code. Comments may never contain alarming or negative language (i.e. "hack to fix broken IE") nor individual programmer names, handles, URLs, etc.

Use a #SECTION comment at the top of every partial or module file, and to delineate major sections of larger CSS files.

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

### Selectors

Aside from a base style sheet, which will specify default styles for HTML element types, most selectors should be composed by referencing class names. Attribute selectors may also be used, especially with form controls. Using IDs in selectors is highly discouraged.

Class names should follow the HTML coding practices: Assign names to objects based on the function they fulfill rather than what they look like. Names should be a single lowercase word. In cases where a longer description is needed, separate words using hyphens.

Refrain from over-qualifying selectors (e.g. body.class) and chaining classes (i.e. .module.variant). Avoid using the universal selector (*), the exception being setting box-sizing universally. Keep in mind that selectors are parsed from right to left – not left to right – so only be as specific as you need to be in composing a selector.

Use quotes in your attribute selectors, even though they are not always required.

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
.navigation {...}
.navigation a {...}
input[type="text"] {...}
```

### Properties

#### Declaration Order

Always specify CSS properties in the following order. This enhances readability and helps compression algorithms.

This order also helps troubleshooting efforts by placing the most commonly problematic properties at the beginning.

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

Tools such as CSScomb can be used to assist with checking/automating this rule.

#### Shorthand

Always use the shorthand version of a property. When using the cascade to overwrite a rule with a more specific one, use the shorthand version on the main rule and the expanded version in the superseding rule.

Example:
```css
.example {
	margin: 5em 2em 10em 2em;
}

.example--alt {
	margin-bottom: 20em;
}
```

If multiple values of the shorthand property need to be overridden, then simply re-write the entire set of shorthand values.

#### Line-height

Don't use a unit on the line-height property. line-height: 1.5 is the same as line-height: 150% and doesn't affect child elements when used without a unit.

#### Vendor Prefixes

Avoid using vendor prefixes in authored style sheets when possible.

Instead use Autoprefixer, https://github.com/postcss/autoprefixer, in your build script to add these automatically.

If Autoprefixer cannot be used, refer to caniuse.com for the prefixes required for the browsers you support.

#### Box Model & Layout Dimensions

We'll use box-sizing: border-box as a general rule in our base CSS file, set up as below. This approach allows the box model to be easily overridden for a specific module when needed.

```css
html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}
```

* Relative units should be used whenever possible to maintain a flexible layout. 
* In responsive and fluid layouts, use % for container widths.
* Use em units for margin and padding values.

#### Flow, Floats, & Positioning

Allow markup to be rendered by the browser as often as possible in normal flow. When creating layouts, choose carefully between the use of floats and positioning.

When floats are used for layout, ensure the parent container is assigned the overflow property, so that its height takes the floated elements into consideration. This approach is preferred to "clearfix" hacks.

When positioning is used for layout in a module-based system, ensure that the container wrapper has position: relative set, in order to set the appropriate parent for positioned children.

#### Fonts

In older CSS, use font size measurements that are common to the existing code. For example, if pixel sizes have
been used on a page, continue using pixel sizes.

In newer CSS, where the base CSS sets the body font size 16px, use relative units (em, rem) to specify font sizes.

When using rems for font-size, provide a px fallback for browsers that do not support rem.

Example:

```css
	.module {
		font-size: 12px;
		font-size: .75rem;
	}
```

When developing a style sheet based on a Photoshop document, translate points directly into pixels. For example, if the Photoshop document displays a heading at 24 points, use 24 pixels in the CSS rule.

Always end font-family declarations with a generic font family (i.e. serif, sans-serif).

#### Colors

Use hexadecimal notation (lowercase) to define colors without alpha-transparency. Reduce six-character values to three character values whenever possible. Developers may use RGBA color as long as a hex fallback is also provided for browsers that do not support RGBA.

```css
.button {
	color: #f00;
	color: rgba(255,0,0,.2);
}
```

#### Images

Unless coding a responsive design, set image dimensions using the width and height attributes of the IMG tag in the HTML source. If this is not possible (i.e. you do not have access to the appropriate template file) then set the dimensions using the CSS width and height properties.

Set image presentation attributes using CSS. Always remove the border from images nested inside anchors. By default, this rule should be specified in the base CSS file.


```css
a img { border: 0; }
```

#### Anchors

Encourage designers to visually distinguish between visited and unvisited links, to improve usability. When using the :hover pseudo-class for anchors, always specify a corresponding value for :focus and :active to aid keyboard navigation. The order of these selectors matters, so always specify in LVHFA order.

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

## Coding Practices

This section represents general coding practices that should be considered.

### Don't class EVERY element

You don't need to add a class to absolutely everything that needs to be styled.

Lists, for example, often won't need a class for each list item. Instead, class the ul/ol and use a child selector to keep the markup cleaner.

```css
/* instead of... */
.feature-list {}
.feature-list-item {}

/* you can use... */
.feature-list > li {}
```

### Grouping Styles

Styles applying to a particular module should be grouped into a single rule. Do not specify a selector multiple times and spread out properties across multiple rules.

Poor Example:

```css
.header {
	background-color: #fff;
	margin: 10em 0 15em 5em;
}
.header, .footer {
	color: #bada55;
}
```

Good Example:

```css
.header {
	margin: 10em 0 15em 5em;
	color: #bada55;
	background-color: #fff;
}
.footer {
	color: #bada55;
}
```

### Media Queries

When using Sass, add media queries along with their base rulesets, ordered from smallest to largest. Otherwise, media queries should be placed in separate files.

Sass example:

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

### Using Sprites

CSS sprites are best used to combine graphic design elements such as logos, icons, buttons and badges that will display well when compressed in PNG format. Do not use sprites to combine content images or photographs.

When writing rules for sprites, first create a class that will be used for all of the sprites in a series (i.e. "icon"). Specify all of the relevant style data in this initial rule, including:

* display
* width
* height
* overflow
* background

For all of the different icons in the series (i.e. "video", "photo", etc.) you only need to specify a new background-position value that corresponds to the pixel coordinates in the sprite graphic file.

```css
.icon {
	display: block;
	width: 10px;
	height: 10px;
	overflow: hidden;
	background: transparent url("/layout/images/sprites/standard/base.png") no-repeat 0 0;
}
.icon-video {
	background-position: 0 -50px;
}
.icon-photo {
	background-position: 0 -100px;
}
```

### Hack Strategy

Minimize the use of hacks by re-writing rules that are problematic for particular browsers.

When hacks are necessary, write a browser-specific hack in the style sheet directly following the affected rule. Add a comment detailing what the hack rule is doing and for which browser it is intended.

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

Do not link to an external style sheet for hack rules unless there are major layout overrides needed to support IE7 or IE8. These older browser are already slow, and forcing the browser to download an additional style sheet will further impact page performance. If an additional style sheet is necessary, however, use conditional comments to load it only for the browsers that need it.

## Integration

### Integrating CSS with HTML

Always link style sheets in the HEAD of an HTML document, before any JavaScript or favicon references. Never use inline styles. Never insert a STYLE tag into the BODY of an HTML document.

Style sheets should be concatenated and minified in production code, and aim for the fewest number of style sheets per page. NOTE: Do not exceed 30 style sheets per page. Internet Explorer (any version) will stop importing style sheets after it reaches 30, and the browser will not report an error, making debugging difficult.

Note also that Internet Explorer 9 and below are limited to 4095 selectors per style sheet. If you are hitting that limit, consider a tool such as Bless (blesscss.com) to split you selectors across multiple style sheets.

### Integrating CSS with JavaScript

When visual changes must be applied using JavaScript, the script must change the class value of the element rather than setting individual CSS properties in JavaScript. The rules for the visual change must be included in the appropriate style sheet.

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

Developers may use JavaScript to add inline styles to an element only when the values will not be known ahead of time, such as when changing the position of an element during a drag-and-drop event.

#### Binding

Use data attributes such as data-hook="something", data-component="component-name") for JavaScript hooks, rather than binding to classes or IDs. 

## Organization & Architectural Principles

### Style sheet organization

Global files must be included first so that they may be overwritten by more specific styles. Style sheets referenced by conditional comments (usually browser-specific files) should be included last.

We'll organize our CSS based on a SMACSS approach (Scalable and Modular Architecture for CSS). 

* **Settings:** Variables, conditionals, mixins, functions *[preprocessor only]*
* **Base:** normalize, type selectors (unclassed html elements - html, body, p, ul, headings, etc), and universals (e.g. setting box-sizing globally)
* **Layout:** page layout including header, footer, main content, sidebars, wrappers, generic containers, and grids
* **Modules:** modular UI components, including OOCSS structural abstractions (media object, etc) and module-specific states (.is-module-expanded). Most of the CSS for a site will be in this layer.
* **Theme:** optional layer for how modules may look in a specific context (line of business, user configurable, etc - e.g. .theme .module)
* **Helpers:** generally applicable helper and state rules - cannot be overwritten (only apply these when you absolutely want the properties, e.g. .float-left)

Note regarding state rules: general rules that are globally applicable, such as .is-visually-hidden, should be included in the helpers layer. State classes should be prefixed with "is-" or "has-".

### Modules

Modules are the discrete and/or reusable components of the UI. Each discrete module should be styled by a separate style sheet (or Sass partial), and module selectors should always be namespaced to avoid conflicts with other modules.

```css
.module
.module-body {
	margin: 0 0 20em 0;
}
```

A developer should be able to edit a module style sheet without introducing bugs into other parts of the site.

#### Module Structure

A simple module, such as a button, may require only a single element. Complex modules, e.g. a modal dialog, may be made up of one or more subcomponents.

Subcomponents should be named as follows: [module]-[subcomponent].

HTML:

```html
<div class="modal">
	<div class="modal-header">...</div>
	<div class="modal-main">...</div>
	<div class="modal-footer">...</div>
</div>
```
CSS (note that we're not nesting here, more on this in the Specificity section):

```css
.modal {...}
.modal-header {...}
.modal-main {...}
.modal-footer {...}
```

#### Module Modifiers

Modifier classes are applied to modules when there are slight variants in the display that do not necessitate an entirely new module. Both the base class name and the modifier class name are applied to the markup, but selectors are composed using only the modified class name. To create a modifier class, repeat the base class name, followed by two hyphens, then the modifier name: [module]--[modifier].

HTML:

```html
<button class="btn btn--primary" type="submit">Button Text</button>
```

CSS:

```css
.btn {...}
.btn--primary {...}
```

### Specificity

Keep specificity low and author CSS in specificity order as much as possible - from general to specific, low specificity to high specificity, global to localized.

Guidelines:

* If a selector will work without it being nested, don't nest it. It adds specificity where it often isn't needed.
* Don't nest more than three levels, including child selectors (>) and pseudo-selectors/elements (:).
* Avoid chaining selectors when possible
* Avoid location-specific selectors
* Avoid styling IDs. If an ID must be styled (to override a 3rd party module, legacy css, etc), use an attribute selector: [id="identifier"]. This has the same specificity as a class/attribute selector. Note that IDs will be used in markup where appropriate (form elements, aria attribute targets), but should not be styled.

Poor example:

```css
.module {}
.module .module-subcomponent {} /* nested, unnecessarily specific */
.module.modifier {} /* avoid chaining */
.sidebar .module {} /* avoid location-specific selectors */
```

Good example (CSS for our general module pattern):

```css
.module {}
.module-subcomponent {}
.module--modifier {}
.module--modifier .module-subcomponent {} /* nesting makes sense here to avoid having to create a modifier for every subcomponent of a modified module */
```

State example:

```css
.module.is-visibile {} /* chaining/higher specificity makes sense with states as they are temporary, only applied given specific conditions, and you want to ensure that the styles are applied */
```