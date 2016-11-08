#Accessibility QA

Accessibility allows users with disabilites to use a website by providing better context for the content they are interacting with. That could mean adding alt text to an image so that a screen reader can describe the image to a user or providing closed captioning on a video. 

[] Verify basic keyboard accessibility

A user should be able to use their keyboard to navigate through content in a logical order as well as interact with UI elements. 

[] Run automated accessibility testing on compiled HTML

The [aXe browser extension](https://www.deque.com/products/axe/#aXeExtensions) for Chrome or Firefox is a good choice for this testing. It is also available as a library that integrates with automated testing scripts.

[] Run automated color accessibility testing

Certain combinations of colors are difficult to see for people with various visual disabilites.

Again, the [aXe browser extension](https://www.deque.com/products/axe/#aXeExtensions) for Chrome or Firefox is a good choice of tool for color contrast testing.

[] Manually test with screen reader

Ensure that the site's content is announced correctly and can be navigated using screen readers. Use NVDA (with Firefox) and/or JAWS (with Internet Explorer) on Windows as the primary tools for this testing. 

[] Ensure that decorative images are not visible to screen readers 
