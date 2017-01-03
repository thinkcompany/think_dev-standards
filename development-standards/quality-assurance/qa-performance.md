#Performance QA

No one likes a slow website, in fact a slow website can cost a company a lot of money. Performance tuning is important, and there are a lot of ways you can achieve (or hinder) it. 

[ ] **Verify that all images/graphics are optimized**

Media assets can contain a lot of extra metadata and file information that isn't necessary. Use the proper tools to remove that data and compress the file down as much as possible. Raster images may require creative direction to meet visual needs and performance budgets.

[ ] **Verify appropriate image formats, according to browser support**

Not all image formats, e.g. WebP, work in all browsers. Make sure that format you are choosing works across the browsers you need to support.

[ ] **Implement CDN (if applicable)**

If applicable, use a CDN for loading a website's assets. Typically this will be necessary on larger high traffic websites.

[ ] **Remove unused font weights/character sets from web fonts to conserve bandwidth and eliminate FOUT**

Large webfont payloads, especially Google Font API calls, can cause flashing of unstyled text. Remove any unused font weights and character sets from their source. 

Also consider [font loading tools](https://github.com/typekit/webfontloader) that provide more control over how webfonts are loaded on the page. 

[ ] **Minimize additional / unused HTTP requests**

Browsers can only handle so many requests at a time, the more requests a website has to make, the longer it can take to load. Make sure you aren't requesting unused resources when not necessary. For example, if you are using a WordPress plugin like Gravity Forms, dequeue the scripts it uses except for the page it is called on. 

[ ] **Concatenate and minify text-based assets (JavaScript, CSS, etc.)**

To help reduce HTTP calls, use a build tool to concatenate and minify your code. This can be further improved by using a server side compression algorithm like GZIP.

Use build tools like gulp-sass, Browserify, and Webpack. 

[ ] **Run automated performance tests (gulp-louis)**

Automating performance testing will help identify changes that affect performance during development.

[ ] **Manually test key pages with WebPageTest/Chrome Dev Tools film strip, document before & after results**

Testing pages using tools that show key metrics such as Time To First Byte along a visual representation of the page load process and speed, can help identify areas that need further optimization.

These tools can also point out code that causes poor performance by triggering excessive CPU/painting cycles that can have a negative impact on performance.

[ ] **Choose the most efficient SVG/Icon System approach**

Consider the most appropriate approach for SVG/Icon systems (inline, background, sprites). Project requirements and browser support will influence the approach, but some [SVG Best Practices](https://thinkbrownstone.atlassian.net/wiki/display/DEV/SVG+Best+Practices) are available on our Wiki.