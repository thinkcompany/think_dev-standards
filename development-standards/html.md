#HTML Development Standards

##HTML CODING GUIDELINES

###PROGRAMMING PRINCIPLES
A building is only as strong as its foundation; the same is true for a web site or web application. Our foundation is plain-old semantic HTML (POSH), which is broken down into discrete, reusable components. Markup is progressively enhanced with CSS and JavaScript. Usability and accessibility are core concerns, and are often realized by leveraging default browser functionality.

###VERSIONS AND VALIDATION
All HTML documents must be authored according to the W3C HTML 5 specification, keeping in mind the tenants of the XHTML 1.0 Strict specification.

[HTML5 Spec](http://www.w3.org/TR/html5/)

[XHTML 1.0 Spec](http://www.w3.org/TR/xhtml1/)

Use the W3C validator to check your markup. Limited errors may be ignored, read on for details.

[W3C Validator](http://validator.w3.org/)

####ALLOWED ELEMENTS AND ATTRIBUTES

Developers should use only those elements and attributes that have semantic value, or are commonly used to structure markup for styling or interaction. This includes the following elements:

- `html`, `head`, `title`, `meta`, `body`
- `script`, `style`, `link`
- `header`, `footer`, `main`, `section`, `article`, `aside`
- `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`
- `ul`, `ol`, `li`
- `dl`, `dt`, `dd`
- `a`
- `em`, `strong`, `ins`, `del`
- `img`
- `blockquote`, `cite`, `abbr`
- `table`, `thead`, `tbody`, `tfoot`, `th`, `tr`, `td`
- `form`, `fieldset`, `legend`, `label`, `input`, `textarea`, `select`, `button`
- `div`, `span`

And the following attributes:

- `id`, `class`
- `href`, `src`
- `alt`, `title`
- `role`, `tabindex`, `accesskey`
- `target` (validation errors in XHTML may be ignored)
- `action`, `method`, `type`, `maxsize`, and other form-specific attributes
- `rowspan`, `colspan`, `scope`
- `placeholder` and other HTML5 form attributes/attribute values 
- custom data attributes (`data-*`) 

Do not use presentational elements (`font`, `b`, `small`, etc.) or attributes (`align`, `valign`, `style`, event handlers etc.) that mix presentation or interaction with markup. Use only the allowed elements/attributes, [CSS](css.md), or [JavaScript](javascript.md) to achieve the desired result.

###FORMAT AND STYLE

Markup must be written as XHTML: all elements and attributes must be written in lowercase characters; attribute values must be contained in double quotes; and all tags must be closed. Insert a single space between the last attribute and the trailing slash in a self-closing tag.

Example:
```html
<img src="logo.png" alt="Client Name" />
```

####FORMATTING FOR READABILITY

For code readability, insert a line break after any opening block-level tag that contains additional block-level tags (e.g. `<div>`) and indent nested elements to standard spacing (one tab space). For each additional level of nested tags, indent another tab space. Do not use spaces.

Inline elements may appear on the same line as their block-level containers when it makes sense. For instance, anchors may appear on the same line as their containing `<li>` tags, if they are the only content.

Example:
```html
<div class="header-global">
    <h1>Site Name</h1>
    <p>Tagline</p>
    <ul class="header-global-nav">
        <li><a href="/about/">About</a></li>
        <li><a href="/contact/">Contact</a></li>
    </ul>
</div>
```

####COMPONENT-BASED MARKUP

Although wireframes and visual designs may approach the user experience from a page or flow perspective, a web site is actually constructed from many smaller pieces of code. Sometimes referred to as LEGO blocks or modules, we refer to them as components (to avoid potentially confusing toy references and overloading other terms). 

A component is a block of HTML that has been coded such that it can be reused anywhere in a web site or application. A component may vary to a limited degree, based on the data available to populate the markup. 

Example component:
```html
<div class="component">
    <h1>Headline</h1>
    <p>Line of copy to give context</p>
    <ul>
        <li><a href="#">Link</a></li>
        <li><a href="#">Link</a></li>
    </ul>
    <img src="/path/image.jpg" alt="Alternate text" />
</div>
```

Components are generally wrapped in DIV tags, to give the overall object a class name that can be referenced by CSS and JavaScript. CSS and JavaScript deliverables are often paired with a component and should be equally reusable.

To support the goal of maximum reusability of components, refrain from using IDs on any piece of markup in a component. One exception to this is form controls, where an ID must be used on the form field in order to explicitly pair a label to it. 


####CLASSES, IDS, AND CUSTOM-DATA ATTRIBUTES

Class names are the preferred method for linking styles and interaction to markup. Custom data (data-*) attributes may also be used. Only use IDs on objects which are unique within the entire site or when commonly prescribed (in-page anchors). Avoid the use of IDs on component elements (i.e. buttons, links, list items), since these objects are likely to appear multiple times in a single page and can cause both validation and back-end issues. 

Assign names to objects based on the function they fulfill rather than what they look like. For example, a navbar will always provide a menu of links regardless of whether it is horizontal or vertical, or whether it is placed at the top or bottom of a page. 
Names should be a single lowercase word. In cases where a longer description is needed, separate words using hyphens. Do not use camel case and do not use underscores.

Example:
```html
<div class="header-sitewide">
    <div class="component-brand"> ... </div>
    <div class="component-search"> ... </div>
</div>
```
####PAGE LAYOUTS

Use the HTML5 sectioning elements to create structure in an HTML page. When there is no appropriate sectioning element, use `<div>`. Give structural elements unique class names that describe their purpose, not their location. 

When appropriate, use structural elements to create a grid of "columns" that contain the core content of the page. Classes should be used so that these grids can be used multiple times per page if necessary.

###CODING PRACTICES

This section outlines TBI's standard practices for composing HTML documents.

####HTML
Always specify the lang attribute on the opening `<html>` tag.

Example:

```html
<html lang="en">
```

Use the appropriate language code for the page. For instance, use "es" for Spanish language pages. Nearly all pages use "en" (English).

####HEAD

The `<head>` element is always required and should immediately follow the opening <html> tag.

####META 

One or more `<meta>` elements may be nested in the document head. 

####CHARSET META TAG

Character set should always be specified and must appear first. (This prevents IE from re-parsing the page, if it appears too late.) The current standard for character encoding is UTF-8. The HTML5 meta charset tag may be used in XHTML documents (validation errors may be ignored) as all browsers support this.

Example:

```html
<meta charset="utf-8" />
```

####VIEWPORT META TAG

When implementing responsive web design or a dedicated mobile site, use the following as the default viewport tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Do not set maximum-scale=1 or user-scalable=no, as these attributes prevent users from zooming the page.
In addition, use the corresponding `@viewport` rule in your base CSS file for browsers/rendering modes that do not support the viewport meta tag:

```css
@-ms-viewport {width:device-width;}
@viewport {width:device-width;}
```

####IMPORTING CSS

Style sheets must always be included in the `<head>` of an HTML document. Never import a style sheet in the `<body>` of a page. Always use the `<link>` element to include external style sheets. Specify the media attribute value (i.e. all, screen, print) to scope the style sheet appropriately for browser application and download.

Example:

```html
<link href="/css/global.css" type="text/css" media="screen" />
```

####CONDITIONAL COMMENTS

Use conditional comments in the `<head>` to include IE browser version specific content, such as CSS.

Example:

```html
<!--[if lte IE 8]>
    <link href="/css/ie8.css" media="all" />
<![endif]-->
```

####IMPORTING JAVASCRIPT

JavaScript files may be included in the `<head>` of an HTML document but for optimal performance developers should place scripts at the bottom of a page, just inside the closing `</body>` tag. 

Example:

```html
<script src="/js/lib/jquery.js"></script>
```

####HEADINGS

Use headings to denote important passages of text and to build a semantic content outline. Do not use a <div> or a <p> where a heading would be more appropriate.

Headings must appear in logical order, beginning with `<h1>`. For instance, an `<h4>` cannot appear in the document before an `<h3>`.

Headings should never be used for subtitles or subheadlines. The `hgroup` concept that was once part of the HTML5 specification is invalid, in part because it is detrimental to accessibility.

Example:

```html
<h2>Getting Started</h2>
<p> ... </p>
```

Headings should be used consistently on a page and throughout a site. Here are some guidelines for proper heading use:

- `<h1>`: used for the page title or top-most heading for the main content within a page (may be shifted off-screen if visual display is not necessary)
- `<h2>`: used for top-level headings, typically section or module titles
- `<h3>` through `<h6>`: used as appropriate in a hierarchical manner

####TEXT CONTENT

Non-heading text content should be marked up using the appropriate semantic element. 

Most non-heading, non-list, prose content should be marked up using `<p>`. Do not use the `<br>` tag to create the appearance of paragraphs. Always format text using CSS: do not write content in all capital or lowercase letters (unless a brand name or trademark), do not use special characters such as `&nbsp;` to add whitespace, etc.

Some words or passages may need additional formatting. The following elements should be used in these cases:
- `<strong>`: use to add emphasis to words; typically renders as bold text (inline)
- `<em>`: use to add emphasis to words; typically renders as italic text (inline)
- `<q>`: use to specify a quotation; typically renders as italic text (inline)
- `<blockquote>`: use to specify a long quotation passage; typically renders as italic text (block)

####LISTS

Use the appropriate list tag to mark up a list of elements. It is common to format navigation using a `<ul>` tag.

- `<ul>`: used for navigation and bulleted lists
- `<ol>`: used for numbered lists
- `<dl>`: used for definitions and name-value pairs

####LINKS
Use anchors `<a>` for all actionable elements in a module or page. Do not use the JavaScript pseudo-protocol in the href attribute; do not use the onclick attribute. If you need to attach a JavaScript event to an anchor, apply a descriptive class name and add a handler in your JavaScript instead.

Bad Example:
```html
<a href="javascript:window.open('http://www.google.com/')">Google</a>
```
Bad Example:
```html
<a href="http://www.google.com/" onclick="window.open(this.href)">Google </a>
```
Good Example:
```html
<a href="http://www.google.com/" class="external-link">Google</a>
```

####ANCHOR TARGETS (AKA IN-PAGE ANCHORS)
Do not use the name attribute on `<a>` tags. Create an in-page anchor by linking to an ID value on the appropriate target. In-page anchor IDs should use a camelCase representation of the heading or name for the content section.

Bad Example:
```html
<a href="#nav">Jump to Navigation</a>

<a name="nav"></a>
<ul> ... </ul>
```

Good Example:
```html
<a href="#navigation">Jump to Navigation</a>

<ul id="navigation"> ... </ul>
```

Good Example:
```html
<a href="#responsiveDesign">Learn more about Responsive Design</a>

<h2 id="responsiveDesign">Responsive Design</h2>
```

####LINK TITLES

Use a title attribute to confer additional information about an `<a>` that may not be clear.

Example:
```html
<a href="/webmail" title="Email: View your email inbox">Email</a>
```

This will produce a visible tooltip in most browsers. Make sure you repeat the linked text, as screen readers may only read the title attribute and not the actual link text.

####IMAGES

Use the `<img>` tag to include a content image. Do not use `<img>` to include design ("chrome") graphics; load and apply those images via CSS instead.

Unless coding a responsive design, the dimensions of an image should be specified using the width and height attributes. This will aid the browser in calculating page layout. 

Always specify an alt attribute that describes the image. If a design element is loaded via HTML, use a blank alt attribute value rather than no alt attribute.

Example:
```html
<img src="logo.png" alt="Client Name" width="320" height="240" />
```

If there is descriptive text directly adjacent to the image, then you may leave the alt attribute blank.

Example:

```html
<img src="photo.jpg" alt="" width="640" height="480" />
<p class="caption">A yellow flower in a grassy meadow.</p>
```

A title attribute may be added to confer additional meaning, but it is not recommended to use both title and alt on an `<img>` tag.

####TABLES

Use tables to provide structure for tabular data. Do not use tables to produce side-by-side content rendering or any other visual effect. Use CSS instead.

Provide content in the summary attribute that describes the data in the table. This will not render on-screen but can be read by search engines and screen readers. Also provide a `<caption>` element that provides a shorter description of the table. This will render on-screen but can be shifted off-screen if necessary.

- Use `<thead>` to specify the heading row of a table. Use `<th>` tags to render each heading cell.
- Use `<tbody>` to specify the body of the table. Use `<th>` tags to specify row headers. Use `<td>` to render all other body cells.
- Use `scope="col"` on all cells in the header to explicitly specify a column
- Use `scope="row"` on the first cell in a row to explicitly specify a row
- Use `<tfoot>` as appropriate.

Example:

```html
<table summary="This table describes the Unicode entity codes used to render special characters in an HTML document">
    <caption>Unicode Entities for Common Special Characters</caption>
    <thead>
        <tr>
            <th scope="col">Character</th>
            <th scope="col">Entity Code</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td scope="row">Em Dash</td>
            <td>&#8212;</td>
        </tr>
        <tr>
            <td scope="row">Registered Trademark</td>
            <td>&#8482;</td>
        </tr>
    </tbody>
</table>
```




