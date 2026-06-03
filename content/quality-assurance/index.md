---
title: Quality Assurance
date: "2026-05-22T00:00:00.000Z"
area: Quality Assurance
section: 1. Standards Compliance
description: ""
---

This document contains Think Company's standards for quality assurance when authoring code.

## Table of Contents

- [Standards Compliance](#standards-compliance)
- [Accessibility](#accessibility)
- [Browser Compatibility](#browser-compatibility)
- [Performance](#performance)
- [Security](#security)
- [Codebase Integrity](#codebase-integrity)

This set of documents contain the standards for quality assurance at Think Company. There are six primary areas of focus to ensure quality on projects: Standards Compliance, Accessibility, Browser Compatibility, Performance, Security, and Codebase Integrity. It is every developer's responsibility to execute each step outlined below. In certain cases, a step will require collaboration between the developer and the dev lead on the project.

## Standards Compliance

This section ensures that the project adheres to our internal coding standards and code management processes.

[ ] **Verify that all code follows the DRY principle**

All code written should comply with the DRY ([don't repeat yourself](https://en.wikipedia.org/wiki/Don't_repeat_yourself)) principle.

[ ] **Follow the conventions of the frameworks and libraries included in the project**

When you are using a framework or library, it is a good practice to follow its accepted standards and conventions. 

[ ] **Adhere to the client's desired directory structure and file naming conventions**

Clients may have their own standards for code quality, naming conventions, and directory structure. We need to work within those standards when required.

[ ] **Write HTML/CSS/JavaScript according to our team standards**

Follow our established coding standards documented in this repository. 

[ ] **Document custom functions**

Someone will eventually work with the code you write, so make sure you provide adequate commenting. Function comment blocks, inline comments explaining gotchas, or choices for a solution make everyone's life much easier.

[ ] **Validate and/or lint HTML, CSS, and JavaScript**

Validate [HTML](https://validator.w3.org/) and [CSS](https://jigsaw.w3.org/css-validator/) against the current specifications.

Lint JavaScript and TypeScript using our shared [`eslint-config-thinkcompany`](https://www.npmjs.com/package/eslint-config-thinkcompany) — this is the canonical configuration for both linting and formatting on Think Company projects. Where supplementary formatting is needed (e.g. for languages ESLint doesn't cover), [Prettier](https://prettier.io/) is a reasonable fallback.

Lint HTML with [HTMLHint](https://htmlhint.com/), and CSS (and SCSS/Less) with [Stylelint](https://stylelint.io/). Sass Lint and CSSLint have both been deprecated for years — do not introduce them on new projects.

Run these tools in three places:
1. **In the editor**, via the relevant extensions (ESLint, Stylelint), so feedback is immediate.
2. **In a pre-commit hook** ([Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged)) so unlinted code never enters the branch.
3. **In CI**, so a failed lint blocks the PR.

[ ] **Type-check the project (TypeScript)**

For TypeScript projects, run `tsc --noEmit` in CI on every PR. Strict mode (`"strict": true` in `tsconfig.json`) is the default — turn things off explicitly if you have to; don't start permissive.

## Accessibility

Accessibility allows people with disabilities to use a website by providing better context for the content they are interacting with. That could mean adding alt text to an image so that a screen reader can describe the image to a user or providing closed captioning on a video. 

[ ] **Verify basic keyboard accessibility**

A person will be able to use their keyboard to navigate through content in a logical order as well as interact with UI elements. The active focused element will be clearly indicated at all times when navigating the site with the keyboard.

For more information, see [WebAIM's Keyboard Accessibility recommendations](http://webaim.org/techniques/keyboard/)

[ ] **Perform manual and automated accessibility testing on compiled HTML**

The [aXe browser extension](http://www.deque.com/products/axe/) for Chrome or Firefox is a good choice for this testing. It is also available as a library that integrates with automated testing scripts.

[ ] **Perform manual and automated color accessibility testing**

Certain combinations of colors are difficult to see for people with various visual disabilities. Look for obvious instances of this and then use automated processes to find the rest.

Again, the [aXe browser extension](http://www.deque.com/products/axe/) for Chrome or Firefox is a good choice of tool for color contrast testing.

[ ] **Test manually with screen readers**

Ensure that the site's content is announced correctly and can be navigated using screen readers. Use [NVDA](http://www.nvaccess.org/) with Firefox on Windows as the primary tool. Also test with VoiceOver on macOS and iOS, and TalkBack on Android.

[ ] **Ensure appropriate use of ARIA attributes**

Use ARIA attributes as needed to support, but not replace, semantic HTML. ARIA is particularly helpful in support of dynamic content and advanced UI controls. See [Using WAI-ARIA in HTML](https://rawgit.com/w3c/aria-in-html/master/index.html) for more information.

## Browser Compatibility

Browser makers sometimes implement different standards and support for new and existing web technologies. It is important to test your application on multiple devices, operating systems, and browsers. This helps to ensure the same experience regardless of the device someone is using.

[ ] **Review the browser support requirements**

Make sure the browser/operating system requirements are clearly defined for the project, and follow them when coding and testing. Always test each browser/device/OS combination based on the requirements of the project.

[ ] **Test on native devices when possible**

When available, test on native devices with as many of the required browser/operating systems as possible. Testing on real devices is preferred and yields more accurate results than simulators. 

[ ] **Use Browserstack to test additional platforms/browsers**

When native device testing isn't possible, [Browserstack](https://www.browserstack.com) allows us to test additional device, OS, and browser combinations. 

[ ] **Run visual and functional regression testing**

Whenever you make a change on a project, it can impact the design and functionality of other parts. Visual regression testing compares before/after screenshots to ensure nothing accidentally breaks. Functional regression testing exercises real user interactions to confirm intended behavior.

For end-to-end functional tests, use [Playwright](https://playwright.dev/) (preferred) or [Cypress](https://www.cypress.io/). Both run real browsers, support modern web platform features, and integrate cleanly into CI. Playwright also handles visual snapshot diffing out of the box.

For component-level tests in JavaScript projects, use [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) (or its equivalent for your framework). Write tests against rendered output and user-visible behavior, not implementation details.

[ ] **Verify appropriate image formats, according to browser support**

Not all image formats, e.g. WebP, work in all browsers. Make sure the format you are choosing works across the browsers you need to support.

[ ] **Document how each browser/OS combination was tested**

It is important to document your testing methods. Doing so allows us to account for the changes made and be aware of any other testing that may need to be performed.

When you finish testing each combination, make a comment stating such in the JIRA test session. On every QA ticket created, include this information in the description.

## Performance

No one likes a slow website. In fact, a slow website can cost a company a lot of money. Performance tuning is important, and there are a lot of ways you can achieve (or hinder) it. 

[ ] **Verify that all images/graphics are optimized**

Media assets can contain extra metadata and file information that isn't necessary. Use the proper tools to remove that data and compress the file down as much as possible. Raster images may require creative direction to meet visual needs and performance budgets. 

Whenever possible, image compression should be part of a project's build process to ensure that all files have been optimized. Tools such as [ImageOptim](https://imageoptim.com) for compressing raster images and [SVGO](https://github.com/svg/svgo) for compressing SVG vector files can be integrated into a build process or used on their own.

[ ] **Remove unused font weights and character sets from web fonts to conserve bandwidth and eliminate FOUT**

Large webfont payloads, especially Google Font API calls, can cause flashing of unstyled text (FOUT). Remove any unused font weights and character sets from their source. 

Also consider [font loading tools](https://github.com/typekit/webfontloader) that provide more control over how webfonts are loaded on the page. 

[ ] **Minimize additional or unused HTTP requests**

Browsers can only handle so many requests at a time; the more requests a website has to make, the longer it can take to load. Make sure you are not requesting resources when they are not needed. For example, if you are using a WordPress plugin like Gravity Forms, dequeue the scripts it uses except for the page it is called on. 

[ ] **Bundle, minify, and serve compressed text-based assets**

Use a modern bundler ([Vite](https://vitejs.dev/), [esbuild](https://esbuild.github.io/), [Rollup](https://rollupjs.org/), or framework defaults like Turbopack/webpack-via-Next) to bundle, tree-shake, and minify JavaScript and CSS. Bundlers minify by default in production builds via terser, esbuild, or SWC.

Serve compressed responses with Brotli (preferred) or GZIP — configure this at the CDN or server level, not the build.

[ ] **Choose the most efficient SVG icon system approach**

Consider the most appropriate approach for SVG icon systems (inline, sprite via `<use>`, or background). For component-based UI, an SVG-as-component approach (e.g. `svgr`) is usually the best balance of performance and ergonomics.

[ ] **Run automated performance tests in CI**

Use [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) to run Lighthouse on every PR and fail the build if Core Web Vitals scores regress past configured thresholds. Pair with a bundle-size budget via [`size-limit`](https://github.com/ai/size-limit) or [`bundlesize`](https://github.com/siddharthkp/bundlesize).

[ ] **Perform manual tests on key pages with performance testing tools, document before and after results**

Use [Lighthouse](https://developer.chrome.com/docs/lighthouse/) (in Chrome DevTools), [PageSpeed Insights](https://pagespeed.web.dev/), and [WebPageTest](https://www.webpagetest.org/) to capture before/after numbers on the pages your change affects. Document the deltas in the PR description — at minimum, LCP, INP, CLS, and total transfer size.

For real-user data, the [`web-vitals`](https://github.com/GoogleChrome/web-vitals) library reports Core Web Vitals to your analytics pipeline.

[ ] **Implement CDN (if applicable)**

For production sites, use a CDN to serve static assets. With HTTP/2 multiplexing, you don't need multiple hostnames — serve everything from one origin and let the CDN handle global distribution.

## Security

Security applies across the stack. Protect against the [OWASP Top 10](https://owasp.org/Top10/) — including XSS, CSRF, injection, broken access control, and (increasingly important) software supply-chain attacks.

[ ] **Secure input and output handling**

Validate input at the system boundary and escape output at the rendering boundary. Use OWASP's [Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) and [Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html). Never construct SQL or shell commands from string concatenation — use parameterized queries and the platform's escaping primitives.

[ ] **Set a Content Security Policy (CSP)**

A well-tuned [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) is one of the highest-leverage defenses against XSS. Start with a strict default-src policy and explicitly allow only the origins you need. Prefer nonce- or hash-based script allowlisting over `'unsafe-inline'`.

[ ] **Add Subresource Integrity (SRI) for third-party scripts**

When loading scripts from a CDN you don't control, add an `integrity="sha384-..."` attribute so the browser refuses to execute a tampered file.

```html
<script src="https://cdn.example.com/lib.js" integrity="sha384-..." crossorigin="anonymous"></script>
```

[ ] **Enforce HTTPS with HSTS**

Serve every page over HTTPS and send the `Strict-Transport-Security` header to prevent protocol-downgrade attacks. Submit to the [HSTS preload list](https://hstspreload.org/) once you're confident the site can sustain HTTPS-only.

[ ] **Configure CORS and isolation headers**

Set `Access-Control-Allow-Origin` restrictively — never `*` for any origin that handles credentials. Add `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` where the app design allows; they unlock high-resolution timers and protect against Spectre-class attacks.

[ ] **Automate dependency scanning**

Enable [GitHub Dependabot](https://docs.github.com/en/code-security/dependabot) (or [Renovate](https://github.com/renovatebot/renovate)) on every repo to alert on vulnerable dependencies. Pair with a scanner like [Snyk](https://snyk.io/) or `npm audit` in CI. Pin versions in lockfiles and review lockfile changes carefully — npm supply-chain attacks are now the dominant attack vector for JS apps.

[ ] **Do not include sensitive environment information or credentials in project documents or codebase**

Keep secrets out of the repo. Use environment variables, a secret manager (1Password, AWS Secrets Manager, GitHub Actions secrets), or `.env` files that are `.gitignore`'d. Add a [secret-scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning) pre-commit hook (e.g. [`gitleaks`](https://github.com/gitleaks/gitleaks)) so leaked credentials get caught before they're pushed.

If a secret reaches version control, rotate it first, then scrub history.

[ ] **Set least privileged access**

Only people who need access to data, login information, etc. should have access to it. Apply the same principle to service accounts and CI tokens — narrow scopes, short-lived where possible.

[ ] **Set minimum folder and file permissions**

Make sure that folders and files have the lowest permissions necessary to run. This helps mitigate remote file inclusions, directory traversal, and privilege escalation.

[ ] **Remove unused code and dependencies**

Unused code is still vulnerable code. Periodically prune dead routes, feature flags, and dependencies — every dependency is a potential supply-chain entry point.

[ ] **Remove metadata from SVGs**

Image-optimization pipelines (SVGO) strip metadata by default. Any process that accepts user SVG uploads must additionally sanitize against embedded `<script>` and event-handler attributes — SVGs can execute JS.

[ ] **Have a dev lead review against OWASP**

The [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) is the canonical reference. For higher-stakes work, request a security review from a dev lead before merging.


## Codebase Integrity

Codebase integrity helps keep our repositories and code clean, easy to understand, and dead simple for anyone to pick up and start coding with.

[ ] **Remove unused assets and scripts from the project**

There are certain files that will never be in a repository. Rendered/compiled files, user generated content, and extremely large images and videos are some examples. 

[ ] **Verify that all dependencies are included, and unused dependencies are removed**

If a project cannot run correctly without certain libraries or assets, make sure they are included. Never have a dependency that exists in your local development environment but not in the repository.

Note that we do not store `node_modules` in the repo, only the package.json file that references the modules.

[ ] **Include pre-compiled source files (Sass/Less) if required**

If a project stipulates the need to include precompiled source files, include them.

[ ] **Verify that the file/directory structure is clear and consistent**

Make sure files and folders follow standard naming conventions, are consistent, and match the content inside of them.  A `js` folder will only contain JavaScript files for example, and a file called `modal.js` will only contain JavaScript for a modal.

[ ] **Verify that the project README is complete, and current**

Ensure that the project README file is always current and contains all of the information that a developer needs to get up and running. Include things like prerequisites, build/installation steps, and deployment instructions.
