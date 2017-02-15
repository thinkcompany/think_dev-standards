# Accessibility Development Standards [DRAFT]

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
- Users with **motor impairment**. These users are unable to use a mouse, have slower response times and limited fine motor control. Their actions are usually performed using keyboard-only input or a variety of switch devices including joysticks, sip-and-puff devices and eye-tracking devices. Some users perform actions through the exclusive use of speech recognition software such as Dragon NaturallySpeaking.
- Users with **cognitive impairment**. Learning disabilities, distractibility, inability to remember or focus on large amounts of information can affect users. While there is a great deal of web content that cannot be made easily accessible to individuals with profound cognitive disabilities, there is much designers and developers can do to increase the ease of use of web content to people with less severe cognitive disabilities.

This list covers a great deal of users with disabilities, but there are those who are still not covered. For example, it is difficult to determine the amount of users affected by multiple disabilities such as low motor control *and* blindness.

## Web Accessibility

### Document Structure & Semantics

Good, semantic structure of your document can be a great asset to accessibility. Page structure informs screen readers of the order through which to present the information on the page, and thus proper semantic page structure will guide the user easily and intuitively through the site.

#### Initial Markup

##### Language and Localization

##### Page Titles

##### Meta Tags

#### Semantics

#### Headings

Proper heading hierarchies are crucial to highly accessible document structure & semantics. HTML5 allows using ```<h1...6>``` tags anywhere on the page, but semantically it's important to adhere to principles of consistency and clarity to direct accessibility tools on the page.

An ```<h1>``` tags should appear no more than once per page, typically containing a kind of page title. ```<h2>``` tags appear often as the title of a section of the page, like a hero or sidebar.

It's important to address font-size choices with CSS. Do not use an ```<h5>``` for you page title just because it should be smaller.

**Bad**:

**Good**:

    <h1>What People Eat</h1>
    <p>Information about the food people eat.</p>
    <h2>Fruit</h2>
    <p>Sweet and often juicy food that grows on plants</p>
    <h3>Apple</h3>
    <p>A round fruit that grows on trees. Often red or green outside with a crisp and pale colored inside.</p>

#### Paragraphs

#### Lists

When creating a list on your page, know that screen-readers benefit from well-formatted semantically structured lists using ```ol```, ```ul```, ```dl```, and ```li``` tags. These semantics create the assistive relationships between elements on the page that accessibility tools depend on to present information coherently.

#### Skip Navigation

Keyboard and screen-reader users start at the beginning of the page and wade through the content sequentially. Sometimes, this means wading through numerous menus, navigation links or other sections before arriving at the main content. For some users, this is a major inconvenience. A "Skip Navigation" link provides the opportunity to bypass all of that and relocate the focus of the assistive technology to the main content of the page.

In content, it might look like:

    <body>
        <a href="#maincontent">Skip to main content</a>
        ... 3 Menus, a search bar, etc.
        <main id="maincontent>
            <h1>Heading</h1>
            <p>This is the first paragraph</p>

In order to hide this element from regular users while maintaining it's functionality, it is common to make the link at the very top of the page, but hidden by default with CSS. Then when a user first engages with keyboard navigation, it is the first link to receive focus and can be revealed with CSS.

## Actionable Elements

Any element on the page that you can interact with using the mouse should obviously also support keyboard interactions as well. Buttons, links, inputs, etc. Typically, these elements will be designed with mouse users in mind, with on-hover styles, bright colors or box shadows or blinking cursors to indicate potential actionable elements. Keep in mind that keyboard users need to know where their current focus is. That normally means using the same styles for the focus state and the hover state.

It's also important to make the state of toggle-action elements clear to non-visual users. Our friend ARIA comes in handy here, offering attributes such as ```aria-haspopup```, ```aria-expanded```, and ```aria-hidden``` that inform the screen-reader about the state of actionable elements on the page. These are boolean attributes, that should be updated as the user interacts with them. For example, alongside toggling classes on my UI, I would also call these helper functions for a dropdown menu:

    var ariaExpand = function ($trigger, $menu) {
        $trigger.attr('aria-expanded', 'true');
        $menu.attr('aria-hidden', 'false');
    };

    var ariaContract = function ($trigger, $menu) {
        $trigger.attr('aria-expanded', 'false');
        $menu.attr('aria-hidden', 'true');
    };

### Events

### Buttons

### Links

## Imagery

### Color and Shape

### Images

### Alt Attribute

The "alt" attribute on image content is an important part of meeting WCAG 2.0 compliance for providing text alternatives for non-text information. This is necessary because most tools used to translate web content into other consumable forms rely on text-based information.

Rather than a description of the image itself, the alt attribute provides a description of the *purpose* of the image; what *information* it provides provide to a user who can see it, hover over it with the mouse, etc. For example, an image used as a navigation link should provide an alt attribute value that describes the destination of the link.

**Bad**:

    <a href="#home">
        <img src="ThinkCompanyLogo.png" alt="Image of thought bubble company logo" />
    </a>

**Good**:

    <a href="#home">
        <img src="ThinkCompanyLogo.png" alt="thinkcompany.com homepage" />
    </a>

Some specific things to make note of when using the alt attribute.

- Describe the purpose of the image, rather than the image itself.

- Text included in the image should be included in the alt attribute text.

- A complex graphic, such as a flow chart or graph, will sometimes be accompanied by a real-text description nearby in the HTML markup. If that is the case, make sure the entirety of the information in the picture is provided in the accompanying text and provide an empty string for the alt value ```alt=""```. Otherwise, included supplemental or summarization information in the alt text attribute.

- Include the alt attribute with an empty string value for images that are included more as "chrome" or decoration and don't provide information.

- Avoid starting with "Image of..." or equivalent phrases. Redundancy like this can cause confusion for users relying on screen-readers.

- Don't use line breaks in alt attributes, it can interfere with the proper functioning of screen-readers.

## Forms

Forms are composed of controls (input, select, textarea), and descriptions/labels of the controls. An accessible form provides a logical, easy to follow user flow which requires grouping of thematically related controls, and associated labels for every individual control or group.

### Labels

As stated in the overview, labels are important to guiding users through a form. Each form control should accompanied by a descriptive ```<label>```, and each ```<fieldset>``` should include a description of the grouping in a ```<legend>``` tag. Placeholder attributes are not sufficient substitutes for labels. screen-readers depend on an explicit label in nearly all cases.

**Bad**:

    <input type="text" placeholder="First Name">
    <input type="text" placeholder="Last Name">

**Good**:

    <label for="first-name">First Name</label>
    <input id="first-name" type="text" placeholder="Tom...">
    <label for="last-name">Last Name</label>
    <input id="last-name" type="text" placeholder="Brady...">

### Radio Buttons and Checkboxes

Radio buttons and checkboxes are typically thematically grouped, and as such should be nested within a fieldset group. The group should have a descriptive legend.

**Bad**:

    <label for="fav-food">Favorite Food</label>
    <label for="avocado"> Avocado Ice Cream </labeL>
    <input id="avocado" type="radio">
    <label for="nightshades">Nightshades </labeL>
    <input id="nightshades" type="radio">


**Good**:

    <fieldset>
        <legend>Favorite Foods</legend>
        <label for="avocado-ice-cream">Avocado Ice Cream</label>
        <input id="avocado-ice-cream" type="radio">
        <label for="nightshades">Nightshades</label>
        <input id="nightshades" type="radio">
    </fieldset>

### Select

Select menus should be accompanied by a ```label``` tag, like a simple input should. ```<optgroup>``` tags can be used *like* fieldsets to organize and group thematically related ```<option>```s, which will help improve the overall simplicity of form-flow.

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

### Instructional Form Text

There are additional ways that the details/restrictions of a form can be indicated to the user.

A list of rules about input format, password requirements, required inputs and other rules might be made explicit in a list preceding the entire form.

Alternatively, the label might include information for a specific form control:

    <label for="pw">Password (min. 8 characters)</label><input type="password" id="pw">

A third method that can be use to include instructional information from outside of the label. When using this method, we need the aria-describedby attribute to make explicit the relationship between the instructions and the control.

    <label for="birthday">Expiration date:</label>
    <input type="text" id="birthday" aria-describedby="date-format">
    <span id="date-format">MM/YYYY</span>

### Required Fields

Like Instructional Text, making certain form fields "required" is an important way to control user behavior within a form. We add the ```required``` (with no value) attribute to the form control. This is enough in most cases, but occasionally browsers also require ```aria-required="true"``` on the form control. If possible, make it explicit that the field is required with instructional text.

### Disabled Form Elements

A disabled element needs to be clearly indicated to all users, else it will confuse both a screen reader and/or the user.

### Validation

The first step to accessible validation is to utilize labels and additional instructional text to the extent that the user is clear on expected requirements/formats, etc. Beyond that with HTML5, input types typicaly have builit in validation methods,

// TODO

### Error Handling

## Tables

## iFrames

## Flexbox
