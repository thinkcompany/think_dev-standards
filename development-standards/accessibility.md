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

#### Initial Markup

##### Language and Localization

##### Page Titles

##### Meta Tags

#### Semantics

#### Headings

#### Paragraphs

#### Lists

#### Skip Navigation

## Actionable Elements

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

- Avoid starting with "Image of..." or equivalent phrases. Redundancy like this can cause confusion for users relying on screen readers.

- Don't use line breaks in alt attributes, it can interfere with the proper functioning of screen readers.

## Forms

### Labels

### Radio Buttons and Checkboxes

### Select

### Instructional Form Text

### Required Fields

### Disabled Form Elements

### Validation

### Error Handling

## Tables

## iFrames

## Flexbox