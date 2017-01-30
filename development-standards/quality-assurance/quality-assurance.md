# Quality Assurance

This set of documents contain the standards for quality assurance at Think Brownstone. There are six primary areas of focus to ensure quality on projects: Standards Compliance, Accessibility, Performance, Security, Browser Compatibility, and Codebase Integrity. It is every developer's responsibilty to execute each step outlined below. In certain cases, a step will require collaboration between the developer and the dev lead on the project.

## Standards Compliance QA

This section ensures that the project adheres to our internal coding standards and code management processes.

[ ] **Verify all code follows the DRY principle**

All code written should comply with the DRY ([don't repeat yourself](https://en.wikipedia.org/wiki/Don't_repeat_yourself)) principle.

[ ] **Follow the conventions of the frameworks and libraries included in the project**

When you are using a framework or library, it is a good practice to follow its accepted standards and conventions. 

[ ] **Adhere to the client's desired directory structure and file naming conventions**

Clients may have their own standards for code quality, naming conventions, and directory structure. We need to work within those standards when required.

[ ] **Write HTML/CSS/JavaScript according to our team standards**

Follow our established coding standards documented in this repository. 

[ ] **Document custom functions**

Someone will eventually work with the code you write, so make sure you provide adequate commenting. Function comment blocks, inline comments explaining gotchas, or choices for a solution make everyone's life much easier.

[ ] **Validate HTML/CSS/JavaScript**

Validate [HTML](https://validator.w3.org/) and [CSS](https://jigsaw.w3.org/css-validator/) according to WC3 Specifications.

Lint JavaScript using our shared [ESLint configuration](https://www.npmjs.com/package/eslint-config-thinkcompany).

Lint HTML and CSS using tools such as [HTMLHint](http://htmlhint.com/) and [CSSLint](http://csslint.net/) along with our linter configurations.

## Accessibility QA

Accessibility allows users with disabilities to use a website by providing better context for the content they are interacting with. That could mean adding alt text to an image so that a screen reader can describe the image to a user or providing closed captioning on a video. 

[ ] **Verify basic keyboard accessibility**

A user will be able to use their keyboard to navigate through content in a logical order as well as interact with UI elements. The active focused element will be clearly indicated at all times when navigating the site with the keyboard.

For more information, see [WebAIM's Keyboard Accessibility recommendations](http://webaim.org/techniques/keyboard/)

[ ] **Perform manual and automated accessibility testing on compiled HTML**

The [aXe browser extension](http://www.deque.com/products/axe/) for Chrome or Firefox is a good choice for this testing. It is also available as a library that integrates with automated testing scripts.

[ ] **Perform manual and automated color accessibility testing**

Certain combinations of colors are difficult to see for people with various visual disabilities. Look for obvious instances of this and then use automated processes to find the rest.

Again, the [aXe browser extension](http://www.deque.com/products/axe/) for Chrome or Firefox is a good choice of tool for color contrast testing.

[ ] **Test manually with screen readers**

Ensure that the site's content is announced correctly and can be navigated using screen readers. Use [NVDA](http://www.nvaccess.org/) (with Firefox) and/or [JAWS](http://www.freedomscientific.com/Products/Blindness/JAWS) (with Internet Explorer) on Windows as the primary tools for this testing. 

Use VoiceOver for doing screen reader testing on a Mac, though NVDA and JAWS on Windows are preferred.

[ ] **Ensure appropriate use of ARIA attributes**

Use ARIA attributes as needed to support, but not replace, semantic HTML. ARIA is particularly helpful in support of dynamic content and advanced UI controls. See [Using WAI-ARIA in HTML](https://rawgit.com/w3c/aria-in-html/master/index.html) for more information.

## Performance QA

No one likes a slow website. In fact, a slow website can cost a company a lot of money. Performance tuning is important, and there are a lot of ways you can achieve (or hinder) it. 

[ ] **Verify that all images/graphics are optimized**

Media assets can contain extra metadata and file information that isn't necessary. Use the proper tools to remove that data and compress the file down as much as possible. Raster images may require creative direction to meet visual needs and performance budgets. 

Whenever possible, image compression should be part of a project's build process to ensure that all files have been optimized. Tools such as [ImageOptim](https://imageoptim.com) for compressing raster images and [SVGO](https://github.com/svg/svgo) for compressing SVG vector files can be integrated into a build process or used on their own.

[ ] **Implement CDN (if applicable)**

If applicable, use a CDN for loading a website's assets. Typically this will be necessary on larger high traffic websites.

[ ] **Remove unused font weights and character sets from web fonts to conserve bandwidth and eliminate FOUT**

Large webfont payloads, especially Google Font API calls, can cause flashing of unstyled text (FOUT). Remove any unused font weights and character sets from their source. 

Also consider [font loading tools](https://github.com/typekit/webfontloader) that provide more control over how webfonts are loaded on the page. 

[ ] **Minimize additional or unused HTTP requests**

Browsers can only handle so many requests at a time; the more requests a website has to make, the longer it can take to load. Make sure you are not requesting resources when they are not needed. For example, if you are using a WordPress plugin like Gravity Forms, dequeue the scripts it uses except for the page it is called on. 

[ ] **Concatenate and minify text-based assets (JavaScript, CSS, etc.)**

To help reduce the number and size of HTTP calls, use build tools to concatenate and minify your code. This can be further improved by using a server side compression algorithm like GZIP to reduce file size before being sent to the client.

Use build tools like Sass, Browserify, and Webpack to compile and concatenate source files, and tools like UglifyJS to minify your source code.

[ ] **Run automated performance tests**

Automating performance testing done with tools like [Louis](https://github.com/AvraamMavridis/gulp-louis) will help identify changes that affect performance during development.

[ ] **Perform manual tests on key pages with performance testing tools, document before and after results**

Performance testing tools that show key metrics such as "time to first byte" along a visual representation of the page load process (e.g. [WebPageTest](https://www.webpagetest.org/), [Google PageSpeed](https://developers.google.com/speed/pagespeed/insights/), Chrome Dev Tools film strip), can help identify areas that need further optimization.

These tools can also point out code that causes poor performance by triggering excessive CPU/painting cycles that can have a negative impact on performance. By specifically mentioning/documenting the results in the pull request or commit message for the change, the development team will be made aware of the issue, your solution, and how much performance was improved.

[ ] **Choose the most efficient SVG icon system approach**

Consider the most appropriate approach for SVG icon systems (inline, background, sprites). Project requirements and browser support will influence the approach, but some [SVG Best Practices](https://thinkbrownstone.atlassian.net/wiki/display/DEV/SVG+Best+Practices) are available on our Wiki.

## Security QA

Security is extremely important and something we take very seriously. Take steps to provide safeguards against basic hacks like SQL injections, remote file inclusion, XSS (cross-site scripting), and CSRF (cross-site request forgery).

[ ] **Have a dev lead check code against OWASP standards and best practices**

[OWASP](https://www.owasp.org/index.php/Main_Page) is a great resource for how to secure code. Have your dev lead look over your code and compare it to their standards and best practices.

[ ] **Secure input and output handling**

When handling data that is sent to or from an application, it is important to secure it. This means checking to make sure data that is going into the system is safe, secure, and valid, while also ensuring that the data sent from the system meets that criteria as well. OWASP has guides for [input validation](https://www.owasp.org/index.php/Input_Validation_Cheat_Sheet) and [data validation](https://www.owasp.org/index.php/Data_Validation).

[ ] **Do not include sensitive environment information or credentials in project documents or codebase**

Keep sensitive information like logins, user data, etc. where it can be secured. Should a password find its way into version control, remove it from the repository's history.

[ ] **Set least privileged access**

Only people who need access to data, login information, etc. should have access to it. Avoid including MySQL root passwords in company-wide "reply-all" email threads.

[ ] **Set minimum folder and file permissions**

Make sure that folders and files have the lowest permissions necessary to run. This will help mitigate remote file inclusions, directory traversal attacks, and jailbreaking.

[ ] **Remove unused code**

Unused code is still vulnerable code. This is especially true with PHP. Most WordPress, Drupal, and Joomla hacks come from plugins that are deactivated but can still be exploited.

[ ] **Remove metadata from SVGs**

Metadata will be removed during the image optimization process for SVGs that we create. Any process that allows user SVG uploads should verify that no vulnerabilities are allowed.

## Browser Compatibility QA

Browsers sometimes decide to implement different standards and support for new and existing web technologies. It is important to test your application on multiple devices, operating systems, and browsers. This helps to ensure the same experience regardless of the device someone is using.

[ ] **Review the browser support requirements**

Make sure the browser/operating system requirements are clearly defined for the project, and follow them when coding and testing. Always test each browser/device/OS combination based on the requirements of the project.

[ ] **Test on native devices when possible**

When available, test on native devices with as many of the required browser/operating systems as possible. Testing on real devices is preferred and yields more accurate results than simulators. 

[ ] **Use Browserstack to test additional platforms/browsers**

When native device testing isn't possible, [Browserstack](https://www.browserstack.com) allows us to test additional device, OS, and browser combinations. 

[ ] **Run visual and functional regression testing**

Whenever you make a change on a project, it can impact the design and functionality of other parts. Visual regression testing compares changes visually to ensure nothing accidentally breaks. Functional regression testing works similarly by testing certain interactions a user may perform and making sure the intended functionality occurs. 

Both visual and functional regression testing can be supported with automation tools to make the process more efficient and repeatable.

[ ] **Verify appropriate image formats, according to browser support**

Not all image formats, e.g. WebP, work in all browsers. Make sure the format you are choosing works across the browsers you need to support.

[ ] **Document how each browser/OS combination was tested**

It is important to document your testing methods. Doing so allows us to account for the changes made and be aware of any other testing that may need to be performed.

When you finish testing each combination, make a comment stating such in the JIRA test session. On every QA ticket created, include this information in the description.

## Codebase Integrity QA

Codebase integrity helps keep our repositories and code clean, easy to understand, and dead simple for anyone to pick up and start coding with.

[ ] **Remove unused assets and scripts from the project**

There are certain files that will never be in a repository. Rendered/compiled files, user generated content, and extremely large images and videos are some examples. 

[ ] **Verify all dependencies are included, and unused dependencies are removed**

If a project cannot run correctly without certain libraries or assets, make sure they are included. Never have a dependency that exists in your local development environment but not in the repository.

Note that we do not store `node_modules` in the repo, only the package.json file that references the modules.

[ ] **Include pre-compiled source files (Sass/Less) if required**

If a project stipulates the need to include precompiled source files, include them.

[ ] **Verify that file/directory structure is clear, FLAT, and consistent**

Make sure files and folders follow standard naming conventions, are consistent, and match the content inside of them.  A `js` folder will only contain javascript files for example, and a file called `modal.js` will only contain JavaScript for a modal. 

Use as few folders as possible to ensure that the application has a flat file structure.

[ ] **Verify that the project README is complete, and current**

Ensure that the project README file is always current and contains all of the information that a developer needs to get up and running. Include things like prerequisites, build/installation steps, and deployment instructions.
