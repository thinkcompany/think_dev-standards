---
title: Accessibility
date: "2020-06-08T23:46:37.121Z"
area: UI Library
section: 1. Overview
description: ""
---

## **Overview**

This document draws its recommendations from a combination of practical experience, current industry best practices, and published guidelines, including:

### Web Content Accessibility Guidelines

The Web Content Accessibility Guidelines (WCAG) are part of a series of standards developed by the W3C's Web Accessibility Initiative. The US Department of Justice and the FCC are establishing new laws that will require most sites to comply with WCAG 2 Level AA.

[W3 Guidelines](http://www.w3.org/TR/WCAG20/)

### ARIA

Whereas WCAG efforts focus on the content found on pages, ARIA (Accessible Rich Internet Application Markup) is an effort to add accessibility to the navigation/use of dynamic or advanced user interfaces sometimes used on web pages. Developers should not employ ARIA by default. ARIA attributes should be applied only when proper HTML, CSS, and JS do not meet a screen reader user's needs. Developers must be judicious when deciding to apply ARIA, and implement it correctly. Using an ARIA attribute in a manner not intended by the specification will cause problems for screen readers.

[ARIA](http://www.w3.org/WAI/intro/aria.php)

### Section 508

Section 508 is an amendment to the Rehabilitation Act of 1973 that requires federal agencies to make electronic information accessible to people with disabilities.

[Section 508](http://www.section508.gov)

---

## **Scope of Impact**

Estimates vary, but most studies find that about one-fifth or 20% of the population is affected by some kind of disability. Not all disabilities make it difficult for people to access the web, but those affected are still a significant enough amount of the population. It would be unwise to purposely exclude up to 20% of users from web experiences. In the cases of some educational institutions and government entities, doing so would be a violation of the law. This document will introduce development practices that aid users with particular disabilities. No web site or application can be 100% accessible to all groups, so we will focus on the following users:

- Users with **visual impairment** such as blindness, low vision, or color blindness. Depending on the impairment, these users might not be able to distinguish between red/green, blue/yellow. Designs must use other visual cues to convey information.
- Users with **hearing impairment** such as deafness or hard-of-hearing. These users can typically navigate web pages with relative ease, but they need subtitles and captions in order to use video content.
- Users with **motor impairment**. These users are unable to use a mouse, have slower response times and limited fine motor control. Their actions are usually performed using keyboard-only input or a variety of switch devices including joysticks, [sip-and-puff](https://www.spectronics.com.au/catalogue/sip-and-puff-switch-solutions-by-origin-instruments) devices and [eye-tracking](http://usabilitygeek.com/what-is-eye-tracking-when-to-use-it/) devices. Some users perform actions through the exclusive use of speech recognition software such as Dragon NaturallySpeaking.
- Users with **cognitive impairment**. Learning disabilities, distractibility, inability to remember or focus on large amounts of information can affect users. While there is a great deal of web content that cannot be made easily accessible to individuals with profound cognitive disabilities, there is much designers and developers can do to increase the ease of use of web content to people with less severe cognitive disabilities.

---

## **Assistive Technology Support**

Historically, the Windows platform has led in support of assistive technologies (AT). Because it’s often difficult for AT users to upgrade software, many still use older versions of operating systems and web browsers. Meanwhile, when it comes to mobile computing, Apple iOS devices are preferred, because of their ease of use and the additional work Apple invested in making the platform accessible.

Our current list of expected supported assistive tools and browsers.

- JAWS with IE 11 on Windows
- NVDA with Firefox on Windows
- VoiceOver (iOS)
- TalkBack (Android)

Google Chrome supports many tools which help automate accessibility testing, however the browser itself does not meet all accessibility standards and is not recommended for use with assistive technologies.

---

## **Core Web Accessibility Concerns**

### Screen Readers

Screen readers are software programs that help visually impaired users understand the content displayed on a computer screen. A screen reader identifies the text shown on a web page and, using a voice synthesizer, reads the content to the user. This software also makes it possible to use specialized keyboard or voice commands to perform certain actions that are normally limited to mouse or touch interactions.

Examples of screen reader programs include JAWS and NVDA for Windows, VoiceOver for iOS, and TalkBack for Android.

Most techniques for improving the screen reader experience for users involve ensuring that content is coded correctly so that the screen reader will read the content correctly. Keyboard accessibility is also crucial for users of screen readers.

### Keyboard Accessibility

Ensuring that a website is accessible with only a keyboard input device is crucial, as some disabilities do not allow users to use a mouse or other pointer device.

A typical keyboard user uses the Tab key to navigate through actionable elements, like links and form fields, on the page. The Enter key and the space bar are used to activate links, form fields, and buttons. It is crucial for the user to know what element has focus at all points in time, so they are able to determine what element they’re interacting with.

When reading a large block of text, keyboard users may scroll the page using the arrow keys or the page up/page down keys.

Any action or information that is conveyed to a user via mouse or touch control must also be accessible to keyboard-only users.

### Color Contrast

WCAG requires sufficient contrast between the foreground text color and the color of the background on which it displays. This helps users with low visual acuity more easily read a web page.

The WebAIM Color Contrast Checker can tell you if there is enough contrast between the foreground and background colors to pass WCAG rules. See [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
