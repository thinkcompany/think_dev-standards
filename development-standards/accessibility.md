# Accessibility Development Standards

This document defines the best practices for producing websites that are accessible to the widest possible audience of web users.

## Introduction

This document draws its recommendations from a combination of practical experience, current industry best practices and published guidelines, including:

### Web Content Accessibility Guidelines

The Web Content Accessibility Guidelines (WCAG) are part of a series of standards developed by the W3C's Web Accessibility Initiative. The US Department of Justice and the FCC are establishing new laws that will require most sites to comply with WCAG 2 Level AA.

http://www.w3.org/TR/WCAG20/

### ARIA

Whereas WCAG efforts focus on the content found on pages, ARIA (Accessible Rich Internet Application Markup) is an effort to add accessibility to the navigation/use of dynamic or advanced user interfaces sometimes used on web pages.  

http://www.w3.org/WAI/intro/aria.php

### Section 508

Section 508 is an amendment to the Rehabilitation Act of 1973 that requires federal agencies to make electronic information accessible to people with disabilities.

http://www.section508.gov

## Audience

Estimates vary, but most studies find that about one fifth or 20% of the population is affected by some kind of disability. Not all disabilities make it difficult for people to access the web, but those affected are still a significant enough amount of the population.

It'd be unwise to purposely exclude up to 20% of users from web experiences. In the cases of educational institutions and government entities, it would be a violation of the law.

 This document will discuss development practices intended to aid users with particular disabilities. No website or application can be 100% accessible to all groups, so we will focus on the following users:

- Users with **visual impairment** such as blindness, low vision or color blindness. Depending on the impairment, these users might not be able to distinguish between red/green, blue/yellow. Designs must use other visual cues to convey information.
- Users with **hearing impairment** such as deafness or hard-of-hearing. These users can typically navigate web pages with relative ease, but they need subtitles and captions in order to use video content.
- Users with **motor impairment**. These users are unable to use a mouse, have slower response times and limited fine motor control. Their actions are usually performed using keyboard-only input or a variety of switch devices including joysticks, [sip-and-puff](https://www.spectronics.com.au/catalogue/sip-and-puff-switch-solutions-by-origin-instruments) devices and [eye-tracking](http://usabilitygeek.com/what-is-eye-tracking-when-to-use-it/) devices. Some users perform actions through the exclusive use of speech recognition software such as Dragon NaturallySpeaking.
- Users with **cognitive impairment**. Learning disabilities, distractibility, inability to remember or focus on large amounts of information can affect users. While there is a great deal of web content that cannot be made easily accessible to individuals with profound cognitive disabilities, there is much designers and developers can do to increase the ease of use of web content to people with less severe cognitive disabilities.

This list covers a great deal of users with disabilities, but there are those who are still not covered. For example, it is difficult to determine the amount of users affected by multiple disabilities such as low motor control *and* blindness.

## Web Accessibility

### Keyboard Accessibility

A central component of making websites accessible is ensuring the site is equivalently navigable with the keyboard as with the mouse, as some of the impairments outlined above do not allow for mouse usage at all. A typical keyboard user can *tab* forward and backward in a specific sequential order through certain elements on the page. Sometimes the arrows are used for navigation.s Users can interact with elements with the enter button and spacebar. Keyboard users should receive equivalent forms of the feedback and information conveyed to mouse users. It's very easy to accidentally hinder this functionality by hiding or rearranging elements in a way that goes undetected by keyboard navigation.

#### Focus States

To arrive at an element with keyboard navigation is to give that element a *focus* state. When an element has *focus*, it is the only element that will respond to enter/spacebar keypresses. It is important that the user knows which element has focus at all times, so they know which element they are currently able to interact with, and position of their focused element on the page. Screen readers will read the information in the focused element, but if the user is not using a screen reader, they should still be able to tell where they are on the page through visual cues. A keyboard accessible page will include a detectable focus state on a component for when keyboard users arrive at the component, similar hover state for mouse users. A high contrast and/or colorful outline, a change in text size/style, a change in perceived depth of the focused element are common ways to do this. A combination of those attributes is the strongest solution.

Keyboard navigation concerns permeate many aspects of our accessibility guidelines. Other sections in this document will contain further details including the tab order, toggling element visibility, and navigation skip patterns.

### Support

Our current list of expected supported assistive tools and browsers.

- NVDA + Windows
- JAWS + Windows
- VoiceOver (iOS)
- TalkBack (Android)

### Document Structure & Semantics

Good, semantic structure of your document can be a great asset to accessibility. Page structure informs screen readers of the order through which to present the information on the page, and thus proper semantic page structure will guide the user easily and intuitively through the site.

#### Initial Markup

Creating web page that meetings our accessibility criteria starts with including important information about the document you are writing in the head.

##### Language and Localization

Ensure the language of the page is explicitly set. Always declare the default language for text in the page using attributes on the html tag. This signals to screen-readers what language to read the document content in. Do not use the meta element with `http-equiv` set to Content-Language.

```html
<html lang="en">
```

When switching languages on the page, make this explicit as well with the `<lang>` attribute.

Example:

```html
<p>This sentence is in English.</p>
<p lang="es">Esta frase es en espa&ntilde;ol.</p> (Spanish)
```

##### Page Titles

The title element is read by screen readers on every page view and ideally should be short and unique.

##### Meta Tags

There are a couple specific things to keep in mind when address meta tags and accessibility.

1. Do not include a maximum scale in the viewport meta tag. This way, you are restricting the pinch zoom functionality that is crucial for many users to see page content.

**Bad**:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
```
**Good**:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
#### Semantics

Writing good, accessible semantic HTML is akin to writing good instructions for a screen-readers and assistive technologies. Using HTML5 semantic structure tags like `<header>`, `<main>`, `<article>`, `<aside>`, `<footer>` will go a long way to formatting your document in a highly accessible manner. Their presence creates a logical, intuitive order through assistive relationships that screen-readers will recognize. Text semantic tags also should be used when appropriate, but do not register with assistive tools.

#### Headings

Proper heading hierarchies are crucial to highly accessible document structure & semantics. HTML5 allows using `<h1...6>` tags anywhere on the page, but semantically, it's important to adhere to principles of consistency and clarity to direct accessibility tools on the page.

An `<h1>` tags should appear no more than once per page, typically containing a kind of page title. `<h2>` tags appear often as the title of a section of the page, like a hero or sidebar.

It's important to address font-size choices with CSS. Do not use an `<h5>` for you page title just because it should be smaller.

Furthermore, language in the WCAG 2.0 success criterion for headings revolves around clarity. Headings that are clear and concise help users understand what the content of the page is.

Example:

```html
<h1>What People Eat</h1>
<p>Information about the food people eat.</p>
<h2>Fruit</h2>
<p>Sweet and often juicy food that grows on plants</p>
<h3>Apple</h3>
<p>A fist-sized round fruit that grows on trees. Often red or green outside with a crisp and pale colored inside.</p>
<h3>Grape/h3>
<p>A quarter-sized round fruit that grows in bunches on vines. Thin skin and very juicy.</p>
```

#### Paragraphs and Text

Visibility is the main subject of text accessiblity. If a text-color and its background do not contrast enough, many users will not be able to read it. Standard text and images of text should have a contrast ratio of 4.5:1. Large scale text (font-size of at least 18 point, or 14 with bold) need only contrast at a 3:1 ratio.

A good guide to this can be found at [Halters Web](http://haltersweb.github.io/Accessibility/font-sizing-and-contrast.html), and you can directly test your text & background colors' contrast ratio at [Web Aim Contrast Checker](http://webaim.org/resources/contrastchecker/).

#### Lists

When creating a list on your page, know that screen-readers benefit from well-formatted semantically structured lists using `ol`, `ul`, `dl`, and `li` tags. These semantics create the assistive relationships between elements on the page that accessibility tools depend on to present information coherently.

One or two navigation link lists on a page should be a guiding principal (i.e. at the top and in the foot), and these should be wrapped in a `<nav>`.

**Bad**:

```html
<div class="product-ctas">
    <a href="more.html">More Info</a>
    <a href="options.html">Other Options</a>
    <a href="sign-up.html">Sign Up Now</a>
</div>
```

**Good**:

```html
<nav>
    <ul class="main-nav">
        <li><a href="my-account.html">My Account</a></li>
        <li><a href="shop.html">Shop/Upgrade</a></li>
        <li><a href="support.html">Support</a></li>
    <ul>
</nav>
```

#### Skip Navigation

Keyboard and screen-reader users start at the beginning of the page and wade through the content sequentially. Sometimes, this means wading through numerous menus, navigation links or other sections before arriving at the main content. For some users, this is a major inconvenience. A "Skip Navigation" link provides the opportunity to bypass all of that and relocate the focus of the assistive technology to the main content of the page.

In content, it might look like:

```html
<body>
    <a href="#maincontent">Skip to main content</a>
    ... 3 Menus, a search bar, etc.
    <main id="maincontent">
        <h1>Heading</h1>
        <p>This is the first paragraph</p>
```

In order to hide this element from regular users while maintaining it's functionality, it is common to make the link at the very top of the page, but hidden by default with CSS. Then when a user first engages with keyboard navigation, it is the first link to receive focus and can be revealed with CSS.

It is *vital* the target container of your skip link has `tabindex` property set to -1. This prevent unwanted behavior on the page by setting focus to the target element.

It is also best practice to include the `role="main"` attribute and value to the target container. This attribute is read by the screen-reader to provide an extra layer of semantics to a keyboard user, indicating that they landed where they expected to on the page (at the main content).


```html
<body>
    <a href="#maincontent">Skip to main content</a>
    ... 3 Menus, a search bar, etc.
    <main id="maincontent" role="main" tabindex="-1">
        <h1>Heading</h1>
        <p>This is the first paragraph</p>
```


## Actionable Elements

Any element on the page that you can interact with using the mouse should obviously also support keyboard interactions as well. Buttons, links, inputs, etc. Typically, these elements will be designed with mouse users in mind, with on-hover styles, bright colors or box shadows or blinking cursors to indicate potential actionable elements. Keep in mind that keyboard users need to know where their current focus is. That normally means using the same styles for the focus state and the hover state.

It's also important to make the state of toggle-action elements clear to non-visual users. Aria attributes `aria-haspopup`, `aria-expanded`, and `aria-hidden` that inform the screen-reader about the state of actionable elements on the page are used in these cases. These are boolean attributes that should be updated as the user interacts with them. When the UI state is updated, so should the aria-state be updated with helper functions like these:

```javascript
var ariaExpand = function ($trigger, $menu) {
    $trigger.attr('aria-expanded', 'true');
    $menu.attr('aria-hidden', 'false');
};

var ariaContract = function ($trigger, $menu) {
    $trigger.attr('aria-expanded', 'false');
    $menu.attr('aria-hidden', 'true');
};
```

### Events

Events on the web page serve to increase dynamic behavior of web pages. Dynamic behavior does not always translate well to assistive technology because the behavior is often visual and driven by mouse activity, or events. Avoid relying only on mouse events like mouseover and click to fire JavaScript functions. Bind equivalent keyboard events to those functions, such as focus and keypress, to make JS functionality available to users without a mouse.

Most major browsers and assistive technologies bridge the potential accessibility gap caused by `onClick` event by also triggering their callback on spacebar and enter key presses. While helpful, this does not work in every single case, especially on elements like text, divs or table cells that are not typically actionable. Even when given an `tabindex` attribute or explicitly given focus by a script. This is why we expect to also need to bind keyboard and focus activity alongside mouse and hover.

The `onDblClick` event handler is associated with the double click of a mouse on a selected HTML element. There is no device independent or keyboard equivalent to `onDblClick`, so it must be avoided.

Do not use the JavaScript pseudo-protocol to trigger JavaScript events. And per our JavaScript standards, `data-*` attributes should be used as selectors.

**Bad**:

```html
<div onclick="JavaScript:myFunction()">Open Menu</div>
```

**Good**:

HTML
```html
<button class="namespace" data-component="click-me">Open Menu</button>
```

JavaScript
```javascript
$('[data-component="click-me"]').on('click.namespace keypress.namespace', cb);
```

### Buttons

Buttons should be made with the native HTML `<button>` tag, and not a clickable image, or any other workaround that causes unnecessary confusion for screen-reader users.

Buttons with `type="submit"` should be used to designate the end of a form. Developers sometimes disable these buttons until the form has been adequately filled out, but doing so removes the only indicator that screen-reader users have that the form is ending. Do not do this.

### Links

To make links accessible, they need to have text-based information that clearly describes their destination. The screen-reader does not announce the link path, so the inner text of the link element should be clear about where the link will take the user.

**Bad**:

```html
<a href="/recipes/all">More</a>
```

**Good**:

```html
<a href="/recipes/all">All Recipes</a>
```

It's important not to use redundant language like "Link to..." or "Go to..." (the screen reader already declares that it has found a navigation element), or misleading text like "Click here" (implying the user needs to click rather than keyboard navigate).

Like all other text, avoid all-capitalize text content, as the screen reader will read text like letter by letter and is more difficult to read. Text that must appear as capitalized should be styled with CSS's `text-transform` property, but typed regularly.

Avoid including the URL in the link text, as the format of web links will be read letter-by-letter and be extremely difficult to understand.

The style of link text should also include some property besides color to increase visibility for low-vision, or color blind users. An underline is typically sufficient.

## Imagery

Image-based content and information play a prominent role in the modern web. The a11y standard expectations are very clear in their expectations for how this information should always be conveyed to screen-reader users: Always provide equivalent alternative text-based sources of the information conveyed.

An important task for the developer is to *identify* all sources of visual information, and ensure that the alternative text-based information conveys all of the same information as the image.

### Color, Shape, Location

Color is major factor in meeting WCAG 2.0 compliance on web pages. Low-vision users need contrast, color blind users will be unable to access information conveyed through certain color schemes. A required form field where the requirement is conveyed through a red border is insufficient. Please read the section on required fields and error reporting for more information on this topic.

Shape and location are sometimes used to guide a visual users attention on a web page. This is an acceptable practice, so long as those same visual cues are translated in some for screen-reader users.

**Bad**:

```html
<p>Click the round button for True or the red button for False.</p>
<button class="btn-round">Button A</button>
<button class="btn-red">Button B</button>
```

**Good**:

```html
<p>Click the round button for True or the red button for False.</p>
<button class="btn-round">Round Button</button>
<button class="btn-red">Red Button</button>
```

Similarly, a reference to location or relative position is not enough information for screen-readers. A buttons order in markup does not always directly translate to it's visual position on the page. Sequential information, on the other hand, is more accessible for users.

**Bad**:

```html
<p>Click the left button for True or the right button for False.</p>
<button class="btn-round">Button A</button>
<button class="btn-red">Button B</button>
```

**Good**:

```html
<p>Click the first button for True or the second button for False.</p>
<button class="btn-round">Button A</button>
<button class="btn-red">Button B</button>
```

### Images

When using images on the web, we need to keep in mind that they cause immediate accessibility pain points for non-visual and low-visual users. All information conveyed or functionality provided through images, need to be offered in the form of Text Alternatives

### Alt Attribute

The "alt" attribute on image content is an important part of meeting WCAG 2.0 compliance for providing text alternatives for non-text information. This is necessary because most tools used to translate web content into other consumable forms rely on text-based information.

Rather than a description of the image itself, the alt attribute provides a description of the *purpose* of the image; what *information* it provides provide to a user who can see it, hover over it with the mouse, etc. For example, an image used as a navigation link should provide an alt attribute value that describes the destination of the link.

**Bad**:

```html
<a href="#home">
    <img src="ThinkCompanyLogo.png" alt="Image of thought bubble company logo" />
</a>
```

**Good**:

```html
<a href="#home">
    <img src="ThinkCompanyLogo.png" alt="thinkcompany.com homepage" />
</a>
```

Some specific things to make note of when using the alt attribute.

- Describe the purpose of the image, rather than the image itself.

- Text included in the image should be included in the alt attribute text.

- A complex graphic, such as a flow chart or graph, will sometimes be accompanied by a real-text description nearby in the HTML markup. If that is the case, make sure the entirety of the information in the picture is provided in the accompanying text and provide an empty string for the alt value `alt=""`. Otherwise, included supplemental or summarization information in the alt text attribute.

- Include the alt attribute with an empty string value for images that are included more as "chrome" or decoration and don't provide information.

- Avoid starting with "Image of..." or equivalent phrases. Redundancy like this can cause confusion for users relying on screen-readers.

- Don't use line breaks in alt attributes, it can interfere with the proper functioning of screen-readers.

## Forms

Forms are composed of controls (input, select, textarea), and descriptions/labels of the controls. An accessible form provides a logical, easy to follow user flow which requires grouping of thematically related controls, and associated labels for every individual control or group.

### Labels

As stated in the overview, labels are important to guiding users through a form. Each form control should accompanied by a descriptive `<label>`, and each `<fieldset>` should include a description of the grouping in a `<legend>` tag. Placeholder attributes are not sufficient substitutes for labels. screen-readers depend on an explicit label in nearly all cases.

**Bad**:

```html
<input type="text" placeholder="First Name">
<input type="text" placeholder="Last Name">
```

**Good**:

```html
<label for="first-name">First Name</label>
<input id="first-name" type="text" placeholder="Tom...">
<label for="last-name">Last Name</label>
<input id="last-name" type="text" placeholder="Brady...">
```

### Radio Buttons and Checkboxes

Radio buttons and checkboxes are typically thematically grouped, and as such should be nested within a fieldset group. The group should have a descriptive legend.

**Bad**:

```html
<label for="fav-food">Favorite Food</label>
<label for="avocado"> Avocado Ice Cream </labeL>
<input id="avocado" type="radio">
<label for="nightshades">Nightshades </labeL>
<input id="nightshades" type="radio">
```

**Good**:

```html
<fieldset>
    <legend>Favorite Foods</legend>
    <label for="avocado-ice-cream">Avocado Ice Cream</label>
    <input id="avocado-ice-cream" type="radio">
    <label for="nightshades">Nightshades</label>
    <input id="nightshades" type="radio">
</fieldset>
```

### Select

Select menus should be accompanied by a `label` tag, like a simple input should. `<optgroup>` tags can be used *like* fieldsets to organize and group thematically related `<option>`s, which will help improve the overall simplicity of form-flow.

```html
<label for="movies">Movies</label>
<select id="movies">
    <optgroup label="Comedy">
        <option value="1">Superbad</option>
        <option value="5">Shaun of the Dead</option>
        <option value="7">Zoolander</option>
    </optgroup>
    <optgroup label="Horror">
        <option value="3">Alien</option>
        <option value="4">Saw II</option>
        <option value="8">28 Days Later</option>
    </optgroup>
</select>
```

### Instructional Form Text

There are additional ways that the details/restrictions of a form can be indicated to the user.

A list of rules about input format, password requirements, required inputs and other rules might be made explicit in a list preceding the entire form.

Alternatively, the label might include information for a specific form control:

```html
<label for="pw">Password (min. 8 characters)</label><input type="password" id="pw">
```

A third method that can be use to include instructional information from outside of the label. When using this method, we need the aria-describedby attribute to make explicit the relationship between the instructions and the control.

```html
<label for="birthday">Expiration date:</label>
<input type="text" id="birthday" aria-describedby="date-format">
<span id="date-format">MM/YYYY</span>
```

### Required Fields

It is common to denote required fields with a different color, asterisk, other visual treatment, but this is insufficient for non-sighted users and those with color blindness. To ensure screen-reader support use the `aria-required=”true”` attribute in your form field.  When the form field has focus it will announce “required”. Do **not** use the HTML5 `required` attribute.  It is not fully supported by screen-readers and is not easily styled with css.

Note: You can inject the asterisk as a pseudo-element via CSS to keep the HTML truthful.

Examples:

HTML

```html
<label for="name" class="required-field">Your Name</label>
<input type="text" id="name" name="name" aria-required="true" />
```

CSS

```css
.required-field:after {
    content: "\*";
    color: red;
}
```

### Disabled Form Elements

Buttons and form elements that are disabled but still in view must be assigned the `disabled` attribute (this is a boolean attribute and takes no assignment).
Convention regarding disabled elements is to present them as dimmed or grayed out, or otherwise different in appearance to indicate a disabled state.  Disabled elements match the `:disabled` pseudo-class for styling purposes. Dimmed/grayed out elements don't need to satisfy color contrast requirements. Disabled elements should not be able to be: clicked, edited, focused, or tabbed onto.

Example

```html
<input type=”text” id=”shippingAddress” disabled />
```

#### Disabling Submit Buttons

It is not best practice to disable a submit button.  Since disabled form elements must be removed from the tab order and must not be focusable, disabling a submit button can lead to confusion for someone using a screen-reader: there would be no indication to them that the form was concluded.

### Validation

Validation is the process of conveying to the user interfacing with inputs that the format of their input needs to be edited in some way to be accepted. The first step to accessible validation is to utilize labels and additional instructional text to the extent that the user is clear on expected requirements/formats, etc. We want actual form validation to be the *safety net*, not the only guidelines.

There is a common web practice nowadays to implement "just-in-time" form validation.  Unfortunately this is a practice that was never vetted with the accessibility community and can cause confusion for those who cannot see. For instance someone who is blind will be unaware of errors appearing after they have left a field if validation happens on blur.
Error validation should happen only upon submit, not upon keystroke or form element blur.
Re-validation should also only happen upon submit.

#### Just-in-time Validation

In rare occurrences just-in-time validation is warranted. If validation must happen before submit please review the situation and solution with your project team.

#### Let the user browse the form before validating the fields

The user must be allowed to browse the form without generating errors. For example, if the user tabs from input field to input field, leaving the previous input field(s) should not create inline errors on blur. An empty field should be considered valid until the form is submitted and should not be considered invalid upon blur. However, if a field is not empty but has invalid entry then creating an error upon blur is OK.

### Error Handling

Error handling is a huge accessibility issue on the web.  Without careful markup a blind or visually-impaired user will be unable to figure out why (or even that) their form submission didn’t complete successfully. Avoiding the issues detailed about just-in-time validation, the following strategy should be strictly followed.

1. Let the user know that there are errors on the page.
2. Let the user know what the error is.
3. Let the user know how many errors are on the page.

Let the user know that there are errors on the page. Upon validation:

1. focus should immediately be given to the first form element that contains an error.
2. aria-invalid=”true” attribute should be assigned to each offending form field.  (Remember to reset it to “false” or remove it completely upon successful revalidation.)

Example:

```html
<input id="date" type="text" aria-invalid=”true” />
```

Let the user know what the error is. Utilize the form field’s `aria-describedby` attribute to tie the form field to the error message.  That way, when the offending form field has focus the error message will be announced. Do not use multiple labels assigned to the same input field to handle error text.

Example:

```html
<label for="name">Your Name</label>
<input type="text" id="name" aria-invalid=”true” aria-describedby="nameError" />
<p id="nameError">Please only use letters</p>
```

Let the user know how many errors are on a page. Each error message should be prefaced with its error number relative to the total number of errors.

Example (Best):

```html
<label for="date">Your Name</label>
<input type="text" id="date" aria-invalid=”true” aria-describedby="dateError" />
<p id="dateError">Error 2 of 2: please enter a valid date.</p>
```

## TABLES

Screen readers are capable of navigating data tables that are marked up using the proper accessibility attributes and tags. These include:

- Summary: an attribute that contains a text description of the data in the table. This element does not render.
- Caption: an element that contains a text description of the data in the table. This element does render, typically as left-justified text inside the boundaries of the table. Can be shifted off-screen via CSS.
- Scope: attribute that can appear on TH and TD elements to define data as a row or a column. Heading cells should use `scope="col"`. The first cell in each row should use scope="row". These do not render.

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

More complex tables will require the use of header and id attributes.

## iFrames

iFrames do not have full support from screen-readers and other assistive technologies. In general, avoid iFrames for complex content.

For simple content, they can be acceptable. They fall under the same category as other non-text content, like images, and require equivalent text alternatives. On iframes, that typically comes in the form of a `title` attribute on the `<iframe>` element.

## Flexbox

Flexbox is a relatively newer tool to the web that carries with it some unique accessibility concerns. The foremost concern at play is the re-ordering of content. The topic of content location/order were touched upon in the Color, Shapes and Location section, but to reiterate: screen-readers follow the sequence of elements the markup, and not the flow on the page. Flexbox simply makes these concerns more valid and good solutions more important to find.

A developer has total control over the order of elements in flexbox containers, making them completely independent of the order in the HTML source. Flexbox should be totally avoided as a way to structure page layout. Imagine the confusion of a screen reader that encounters a page that looks like this:

HTML

```html
<body>
    <footer>
        ...
    </footer>
    <main>
        ...
    </main>
    <header>
        ...
    </header>
</body>
```

CSS

```css
body {
    display; flexbox;
    flex-direction: column-reverse;
}
```

This is an absurd example that flies in the face of semantics and other rigid standards, but if you'll play along, this page would render totally normally to a visual user with the header appearing above the main content, and main content appearing above the footer. Whereas to a screen reader traversing the HTML sequentially, this page makes zero sense.

This is where the `tabindex` property comes into play. In some cases, it is possible to make the *tab* sequence consistent with the *visual* sequence through this property.
Example:

HTML

```html
<section class="flex-container">
    <button tab-index="3">
        ...
    </button>
    <button tab-index="2">
        ...
    </button>
    <button tab-index="1">
        ...
    </button>
</body>
```

CSS

```css
.flex-container {
    display; flexbox;
    flex-direction: column-reverse;
}
```

Also, avoid making reference to the sequence, position, or arrangement of the elements in a flexbox container if possible, or otherwise be sure avoid creating confusion for screen-reader users.
