# HTML Development Standards

## Programming Principles
A building is only as strong as its foundation; the same is true for a web site or web application. Our foundation is plain-old semantic HTML (POSH), which is broken down into discrete, reusable components. Markup is progressively enhanced with CSS and JavaScript. Usability and accessibility are core concerns, and are often realized by leveraging default browser functionality.

### Versions & Validation
All HTML documents must be authored according to the W3C HTML 5 specification, keeping in mind the tenets of the XHTML 1.0 Strict specification.

[HTML5 Spec](http://www.w3.org/TR/html5/)

[XHTML 1.0 Spec](http://www.w3.org/TR/xhtml1/)

Use the W3C validator to check your markup. Limited errors may be ignored, read on for details.

[W3C Validator](http://validator.w3.org/)

### Allowed Elements & Attributes
Developers should use only those elements and attributes that have semantic value, or are commonly used to structure markup for styling or interaction. This includes the following elements:

#### Elements
- `html`, `head`, `title`, `meta`, `body`
- `script`, `style`, `link`
- `header`, `footer`, `main`, `section`, `article`, `aside`, `nav`
- `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`
- `ul`, `ol`, `li`
- `dl`, `dt`, `dd`
- `a`
- `em`, `strong`, `ins`, `del`
- `img`, `figure`, `figcaption`
- `blockquote`, `cite`, `abbr`
- `table`, `thead`, `tbody`, `tfoot`, `th`, `tr`, `td`
- `form`, `fieldset`, `legend`, `label`, `input`, `textarea`, `select`, `button`
- `div`, `span`

#### Attributes
- `id`, `class`
- `href`, `src`
- `alt`, `title`
- `role`, `tabindex`, `accesskey`, `aria-*` (refer to the HTML5 spec for appropriate use of ARIA attributes)
- `target` (validation errors in XHTML may be ignored)
- `action`, `method`, `type`, `maxsize`, and other form-specific attributes
- `rowspan`, `colspan`, `scope`
- `placeholder` and other HTML5 form attributes/attribute values 
- custom data attributes (`data-*`)

Do not use presentational elements (`font`, `b`, `small`, etc.) or attributes (`align`, `valign`, `style`, event handlers etc.) that mix presentation or interaction with markup. Use only the allowed elements/attributes, [CSS](css.md), or [JavaScript](javascript) to achieve the desired result.

*NOTE:* The following elements do not work on older browsers: `header`, `footer`, `main`, `section`, `article`, `aside`, `nav`, `figure`, `figcaption`. Use an all-markup solution to support these elements in these browsers (`<main><div role="main"></div></main>`), unless the client explicitly requests a JS solution like htmlshiv or modernizr. 

## Format & Style

Markup must be written as XHTML: all elements and attributes must be written in lowercase characters; attribute values must be contained in double quotes; and all tags must be closed. Insert a single space between the last attribute and the trailing slash in a self-closing tag.

```html
<img src="logo.png" alt="Client Name" />
```

### Formatting for Readability

For code readability, insert a line break after any opening block-level tag that contains additional block-level tags (e.g. `<div>`) and indent nested elements to standard spacing (one tab space). For each additional level of nested tags, indent another tab space. Do not use spaces.

Inline elements may appear on the same line as their block-level containers when it makes sense. For instance, anchors may appear on the same line as their containing `<li>` tags, if they are the only content.

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

### Module-based Markup

Although wireframes and visual designs may approach the user experience from a page or flow perspective, a web site is actually constructed from many smaller pieces of code. Sometimes referred to as LEGO blocks or modules, we refer to them as modules.

A module is a block of HTML that has been coded such that it can be reused anywhere in a web site or application. A module may vary to a limited degree, based on the data available to populate the markup. 

Example module:
```html
<div class="module">
    <h1>Headline</h1>
    <p>Line of copy to give context</p>
    <ul>
        <li><a href="#">Link</a></li>
        <li><a href="#">Link</a></li>
    </ul>
    <img src="/path/image.jpg" alt="Alternate text" />
</div>
```

Modules are generally wrapped in DIV tags, to give the overall object a class name that can be referenced by CSS. CSS and JavaScript deliverables are often paired with a module and should be equally reusable.

To support the goal of maximum reusability of modules, refrain from using IDs on any piece of markup in a module. One exception to this is form controls, where an ID must be used on the form field in order to explicitly pair a label to it. 

### Classes, IDs, & Custom Data Attributes

Class names are the preferred method for linking styles to markup. Custom data (data-*) attributes are the preferred hooks for behavior (JavaScript). Only use IDs on objects which are unique within the entire site or when commonly prescribed (in-page anchors). Avoid the use of IDs on module elements (i.e. buttons, links, list items), since these objects are likely to appear multiple times in a single page and can cause both validation and back-end issues. 

Assign names to objects based on the function they fulfill rather than what they look like. For example, a navbar will always provide a menu of links regardless of whether it is horizontal or vertical, or whether it is placed at the top or bottom of a page. 
Names should be a single lowercase word. In cases where a longer description is needed, separate words using hyphens. Do not use camel case and do not use underscores.

```html
<div class="header-sitewide">
    <div class="module-brand"> ... </div>
    <div class="module-search"> ... </div>
</div>
```

### Attribute Order
Add attributes to HTML elements in the following order: 

* `class`
* `id`/`name`
* `data-*`
* `src`, `for`, `type`, `href`, `value`
* `title`, `alt`
* `aria-*`, `role`

Example:
```html
<a class="classes" id="id" data-hook="expand" href="href" title="link title">link text</a>
```  

### Page Layouts

Use the HTML5 sectioning elements to create structure in an HTML page. When there is no appropriate sectioning element, use `<div>`. Give structural elements unique class names that describe their purpose, not their location. 

When appropriate, use structural elements to create a grid of "columns" that contain the core content of the page. Classes should be used so that these grids can be used multiple times per page if necessary.

## Coding Practices

This section outlines Think Brownstone's standard practices for composing HTML documents.

### Doctype

Use the HTML5 doctype on the first line of the HTML file.

```html
<!DOCTYPE html>
```

### HTML
Always specify the lang attribute on the opening `<html>` tag.

```html
<html lang="en">
```

Use the appropriate language code for the page. For instance, use "es" for Spanish language pages. Nearly all pages use "en" (English).

### Head

The `<head>` element is always required and should immediately follow the opening <html> tag.

#### Meta 

One or more `<meta>` elements may be nested in the document head. 

#### Charset Meta Tag

Character set should always be specified and must appear first. (This prevents IE from re-parsing the page, if it appears too late.) The current standard for character encoding is UTF-8. The HTML5 meta charset tag may be used in XHTML documents (validation errors may be ignored) as all browsers support this.

```html
<meta charset="utf-8" />
```

#### Http-equiv Meta Tag

Ensure that Internet Explorer uses the latest supported rendering mode.

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
```

#### Viewport Meta Tag

When implementing responsive web design or a dedicated mobile site, use the following as the default viewport tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Do not set maximum-scale=1 or user-scalable=no, as these attributes prevent users from zooming the page.
In addition, use the corresponding `@viewport` rule in your base CSS file for browsers/rendering modes that do not support the viewport meta tag:

```css
@-ms-viewport {width:device-width;}
@viewport {width:device-width;}
```

#### Importing CSS

Style sheets must always be included in the `<head>` of an HTML document. Never import a style sheet in the `<body>` of a page. Always use the `<link>` element to include external style sheets. Specify the media attribute value (i.e. all, screen, print) to scope the style sheet appropriately for browser application and download.

```html
<link href="/css/global.css" type="text/css" media="screen" />
```

#### Conditional Comments

Use conditional comments in the `<head>` to include IE browser version specific content, such as CSS.

```html
<!--[if lte IE 8]>
    <link href="/css/ie8.css" media="all" />
<![endif]-->
```

#### Importing JavaScript

JavaScript files may be included in the `<head>` of an HTML document but for optimal performance developers should place scripts at the bottom of a page, just inside the closing `</body>` tag. 

```html
<script src="/js/lib/jquery.js"></script>
```

### Content Markup

#### Headings

Use headings to denote important passages of text and to build a semantic content outline. Do not use a <div> or a <p> where a heading would be more appropriate.

Headings must appear in logical order, beginning with `<h1>`. For instance, an `<h4>` cannot appear in the document before an `<h3>`.

Headings should never be used for subtitles or subheadlines. The `hgroup` concept that was once part of the HTML5 specification is invalid, in part because it is detrimental to accessibility.

```html
<h2>Getting Started</h2>
<p> ... </p>
```

Headings should be used consistently on a page and throughout a site. Here are some guidelines for proper heading use:

- `<h1>`: used for the page title or top-most heading for the main content within a page (may be shifted off-screen if visual display is not necessary)
- `<h2>`: used for top-level headings, typically section or module titles
- `<h3>` through `<h6>`: used as appropriate in a hierarchical manner

#### Text Content

Non-heading text content should be marked up using the appropriate semantic element. 

Most non-heading, non-list, prose content should be marked up using `<p>`. Do not use the `<br>` tag to create the appearance of paragraphs. Always format text using CSS: do not write content in all capital or lowercase letters (unless a brand name or trademark), do not use special characters such as `&nbsp;` to add whitespace, etc.

Some words or passages may need additional formatting. The following elements should be used in these cases:
- `<strong>`: use to add emphasis to words; typically renders as bold text (inline)
- `<em>`: use to add emphasis to words; typically renders as italic text (inline)
- `<q>`: use to specify a quotation; typically renders as italic text (inline)
- `<blockquote>`: use to specify a long quotation passage; typically renders as italic text (block)

#### Lists

Use the appropriate list tag to mark up a list of elements. It is common to format navigation using a `<ul>` tag.

- `<ul>`: used for navigation and bulleted lists
- `<ol>`: used for numbered lists
- `<dl>`: used for definitions and name-value pairs

#### Links
Use anchors `<a>` for most(*) actionable elements in a module or page. Do not use the JavaScript pseudo-protocol in the href attribute; do not use the onclick attribute. If you need to attach a JavaScript event to an anchor, apply a descriptive data attribute and add a handler in your JavaScript instead.

Poor Example:
```html
<a href="javascript:window.open('http://www.google.com/')">Google</a>
```
Poor Example:
```html
<a href="http://www.google.com/" onclick="window.open(this.href)">Google </a>
```
Good Example:
```html
<a href="http://www.google.com/" data-hook="external-link">Google</a>
```

(*) As a general rule, for actionable elements that link to or reveal additional content (new page, in-page anchor, overlay, popover, tabs), an `<a>` is the appropriate choice. If you are submitting a form, or tying additional UI behavior to an element (zooming a photo, opening a popup menu, sorting a table, etc) use a `<button>`.

Note that a `<button>`'s default type is "submit". When using a `<button>` outside of a form, include the attribute type="button", e.g. `<button type="button">Action</button>`

#### Anchor Targets (aka In-page Anchors)
Do not use the name attribute on `<a>` tags. Create an in-page anchor by linking to an ID value on the appropriate target. In-page anchor IDs should use a camelCase representation of the heading or name for the content section.

Poor Example:
```html
<a href="#nav">Jump to Navigation</a>

<a name="nav"></a>
<ul> ... </ul>
```

Poor Example:
```html
<a href="#navigation">Jump to Navigation</a>

<ul id="navigation"> ... </ul>
```

Good Example:
```html
<a href="#responsiveDesign">Learn more about Responsive Design</a>

<h2 id="responsiveDesign">Responsive Design</h2>
```

#### Link Titles

Use a title attribute to confer additional information about an `<a>` that may not be clear.

```html
<a href="/webmail" title="Email: View your email inbox">Email</a>
```

This will produce a visible tooltip in most browsers. Make sure you repeat the linked text, as screen readers may only read the title attribute and not the actual link text.

#### Images

Use the `<img>` tag to include a content image. Do not use `<img>` to include design ("chrome") graphics; load and apply those images via CSS instead.

Unless coding a responsive design, the dimensions of an image should be specified using the width and height attributes. This will aid the browser in calculating page layout. 

Always specify an alt attribute that describes the image. If a design element is loaded via HTML, use a blank alt attribute value rather than no alt attribute.

```html
<img src="logo.png" alt="Client Name" width="320" height="240" />
```

If there is descriptive text directly adjacent to the image, then you may leave the alt attribute blank.

```html
<img src="photo.jpg" alt="" width="640" height="480" />
<p class="caption">A yellow flower in a grassy meadow.</p>
```

A title attribute may be added to confer additional meaning, but it is not recommended to use both title and alt on an `<img>` tag.

#### Tables

Use tables to provide structure for tabular data. Do not use tables to produce side-by-side content rendering or any other visual effect. Use CSS instead.

Refer to the latest W3C recommendations for marking up tabular data: http://www.w3.org/TR/html5/tabular-data.html#tabular-data.

Provide a `<caption>` element that describes the table. This will render on-screen but can be shifted off-screen if necessary.

- Use `<thead>` to specify the heading row of a table. Use `<th>` tags to render each heading cell.
- Use `<tbody>` to specify the body of the table. Use `<th>` tags to specify row headers. Use `<td>` to render all other body cells.
- Use `scope="col"` on all cells in the header to explicitly specify a column
- Use `scope="row"` on any `<th>` cells in the `<tbody>` to explicitly specify a row
- Use `<tfoot>` as appropriate.

```html
<table>
    <caption>HTML & Unicode Entities for Common Special Characters</caption>
    <thead>
        <tr>
            <th scope="col">Character</th>
            <th scope="col">HTMl Entity</th>
            <th scope="col">Entity Code</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Em Dash</th>
            <td>&mdash;</td>
            <td>&#8212;</td>
        </tr>
        <tr>
            <th scope="row">Trademark</th>
            <td>&trade;</td>
            <td>&#8482;</td>
        </tr>
    </tbody>
</table>
```

#### Forms
The `<form>` element must include action and method attributes. When choosing the form submission method, consider the user experience:
- GET: form data is encoded by the browser and appended to the URL; typically used for retrieving data
- POST: form data appears in a message body which in encrypted over HTTPS; typically used for sending or storing data

Code form fields in their natural (i.e. visual) navigation order, to aid in keyboard navigation. There are some exceptions to this, such as "OK/Cancel" button combinations, where the default action (OK) should always come first, regardless of visual order. 


#### Fieldset
Structure complex forms with fieldset elements in order to provide context to groups of form fields. For example, in a form where both a billing address and a shipping address are collected, wrap each set of address form fields in a fieldset. Use the legend element to title the section of the form; hide the content off-screen if it does not visually appear on screen.

```html
<fieldset>
    <legend><span>Contact Information</span></legend>
    <p>
        <label for="contact-name">Your Name</label>
        <input type="text" id="contact-name" />
    </p>
    ...
</fieldset>
```

#### Label
All form fields (`input`, `textarea`, `select`) must have a corresponding label that describes the purpose of the field. Associate a label explicitly, matching the for attribute value on the `<label>` element with the ID attribute value from the related form field.

```html
<p>
    <label for="newsletter-zip">Zip Code</label>
    <input type="text" id="newsletter-zip" maxlength="10" />
</p>
```

Labels must always be present. If a design does not contain visible labels, use CSS to shift them off screen. Do not ever omit them.

#### Form Fields
Wrapping form fields and their corresponding labels in `<p>` tags is considered good practice, but a `<div>` with an appropriate class is fine as well. Instructional or help text related to a form field (i.e. optional, required, etc.) should be included as part of the label; to style this text separately from the label, wrap it in a `span`. If form fields require positioning, wrap the field in a `span` as well.

```html
<p>
    <label for="name-first">First Name <span class="help">(required)</span></label>
    <span class="field"><input type="text" id="name-first" required="required" /></span>
</p>
```

Refrain from complicated CSS styling of form inputs so as not to override default cues of the browser or operating system. When styling inputs, ensure selectors are specific to type=text so as not to affect other types. Hidden input fields should be grouped at the top or bottom of a `<form>`, to ensure that they do not interfere with any visual rendering.

#### Checkboxes & Radio Buttons
Group sets of checkboxes and radio buttons using the `<fieldset>` element. The `<legend>` provides a text label for the group, since the `<label>` is required for each individual input.
 
```html
<fieldset>
    <legend>What is your favorite ice cream flavor?</legend>
    <p>
        <input type="radio" name="radio-icecream" value="vanilla" id="radio-icecream-vanilla" />
        <label for="radio-icecream-vanilla">Vanilla</label>
    </p>
    <p>
        <input type="radio" name="radio-icecream" value="chocolate" id="radio-icecream-chocolate" />
        <label for="radio-icecream-chocolate">Chocolate</label>
    </p>
</fieldset>
```

For groups of radio buttons, ensure that the *name* attribute value matches, so that checking one radio button unchecks all others in the group.

#### Buttons

Use the `<button>` element to render actionable buttons in forms instead of inputs. Use type="submit" to generate a submit button. Use CSS to style buttons according to designs. Do not use the image input type.

Poor Example:

```html
<image type="submit" src="button.png" alt="Submit" />
```

Good Example:

```html
<button type="submit">Submit</button>
```

*NOTE:* Certain browsers may require the use of `<input type="submit">` in order to properly submit all form fields. Use this only when the <button> element is not supported.