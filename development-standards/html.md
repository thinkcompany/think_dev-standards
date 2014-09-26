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


