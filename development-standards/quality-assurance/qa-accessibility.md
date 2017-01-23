#Accessibility QA

Accessibility allows users with disabilites to use a website by providing better context for the content they are interacting with. That could mean adding alt text to an image so that a screen reader can describe the image to a user or providing closed captioning on a video. 

[ ] **Verify basic keyboard accessibility**

A user should be able to use their keyboard to navigate through content in a logical order as well as interact with UI elements. The active focused element should be clearly indicated at all times when navigating the site with the keyboard.

For more information, see [WebAIM's Keyboard Accessibility recommendations](http://webaim.org/techniques/keyboard/)

[ ] **Manual and automated accessibility testing on compiled HTML**

The [aXe browser extension](https://www.deque.com/products/axe/#aXeExtensions) for Chrome or Firefox is a good choice for this testing. It is also available as a library that integrates with automated testing scripts.

[ ] **Manual and automated color accessibility testing**

Certain combinations of colors are difficult to see for people with various visual disabilites.

Again, the [aXe browser extension](https://www.deque.com/products/axe/#aXeExtensions) for Chrome or Firefox is a good choice of tool for color contrast testing.

[ ] **Manually test with screen readers**

Ensure that the site's content is announced correctly and can be navigated using screen readers. Use NVDA (with Firefox) and/or JAWS (with Internet Explorer) on Windows as the primary tools for this testing. 

VoiceOver should be used when doing screen reader testing on a Mac, though NVDA and JAWS on Windows are preferred.

[ ] **Ensure appropriate use of ARIA attributes**

ARIA attributes should be used as needed to support, but not replace, semantic HTML. ARIA is particularly helpful in support of dynamic content and advanced UI controls. See [Using WAI-ARIA in HTML](https://rawgit.com/w3c/aria-in-html/master/index.html) for more information.