#Performance QA

**Verify that all images / graphics are optimized**

Media assets can contain a lot of extra metadata and file information that isn't necessary. Use the proper tools to remove that data and compress the file down as much as possible. Raster images may require creative direction to meet visual needs and performance budgets.

**Implement CDN (if applicable)**

If applicable, use a CDN for resources a website uses. Typically this will be necessary on larger high traffic websites.

**Verify appropriate image formats, according to browser support**

Not all images work in all browsers. Make sure that format you are choosing works across the browsers you need to support.

**Remove unused font weights / character sets from web fonts to conserve bandwidth and eliminate FOUT**

Large webfont payloads, especially Google Font API calls, can cause flashing of unwanted text. Remove any unused font weights and character sets from their source. 

**Minimize additional / unusued HTTP requests**

Browsers can only handle so many requests at a time, the more requests a website has to make, the longer it can take to load. Make sure you aren't requesting unused resourcs when not necessary. For example, if you are using a WordPress plugin like Gravity Forms, dequeue the scripts it uses except for the page it is called on. 

**Concatenate and minify text-based assets (JavaScript, CSS, etc.)**

To help reduce HTTP calls, you should use a build tool to concatenate and minify your code. This can be further improved by using a server side compression algorithm like GZIP.

**Need information about npm scripts and webpack**

**Examine code for heavy CPU / painting cycles**

**Run automated performance tests (gulp-louis)**

**Manually test key pages with WebPageTest / Chrome Dev Tools film strip, document before & after results**

**Verify best approach: SVG inline vs. SVG sprites**
