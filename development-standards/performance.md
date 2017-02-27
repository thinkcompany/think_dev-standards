# Performance Development Standards
Each individual element on a web page generates an HTTP request which adds its own network latency, download time and render time. The most crucial optimization for any web site is to reduce or limit the number of total HTTP requests. There are several ways to accomplish this, the most common of which is to combine CSS, JS and images into as few files as possible.

### Serve external assets from a content delivery network (CDN) with a cookie-less domain
Always serve JavaScript, CSS and chrome images from a CDN, which distributes the content across a wide geographic area and helps reduce the roundtrip time for these assets. It is crucial that the domain for the CDN be different from the web site. A web browser will send any cookies it has stored for a domain for every HTTP request to that domain. Serving external assets from a different domain will avoid this unnecessary data transmission.

### Set a future expiration date on external assets
Most of the visits to a web site are by visitors with a "primed cache", which means that the user has visited the site before and is viewing additional content. It is crucial to ensure that these page views make use of the users local cache to retrieve JavaScript, CSS and images instead of retrieving them from the server. These assets should have an expiration date of at least one month from the request time.

### Compress assets with GZIP
Compress all text assets — JavaScript and style sheets — with GZIP. It can compress these files by 70% or more and it is universally supported.

### Reduce DNS Lookups
DNS lookups add latency to HTTP requests and are not cached for very long in the browser. On the other hand, parallel downloads from different domains can be an effective performance enhancement, so there is a balance to be found. [Yahoo!](https://developer.yahoo.com/performance/rules.html#dns_lookups) recommends between two and four unique host names per site.

### Avoid Redirects
URL redirects with status codes 301 or 302 are not cached by any browser and should be avoided.

An often overlooked redirect occurs when a user requests a URL without a trailing slash, such as domain.com/about. This URL usually redirects to domain.com/about/. This redirect adds extra latency and processing time to the request, so whenever possible both URLs should serve the actual page.

## JavaScript

### Concatenate JavaScript Files
Every web page should serve a maximum of two JavaScript files, one for a site-wide library (including jQuery) and one for page-specific scripts. Use frameworks like [webpack](http://webpack.github.io/) and [Browserify](http://browserify.org/) to handle bundling your javascript files.

These files will be served in the "exploded" view during local development, but Dev, QA, Staging and Production environments should all serve the combined JavaScript resources. 

### Minify JavaScript Files
Use a resource compressor to compress and minify the combined JavaScript files. This can save a significant amount of bandwidth by stripping whitespace and shortening variable names, thereby reducing overall JavaScript file size.

### Import JavaScript at the Bottom of the Page
Web browsers stop processing a web page while they are downloading, parsing and executing external JavaScript files. This behavior — called "blocking" — can be avoided by loading the JavaScript at the bottom of the page, just before the closing HTML element.

This method also ensures that scripts do not attempt to manipulate DOM elements before they have loaded.

BAD
```html
    <head>
        <script type="text/javascript" src="main.js"/>
    </head>
    <body>
        ...
    </body>
```


GOOD 
```html
    <body>
        ...
        <footer></footer>
        <script type="text/javascript" src="main.js"/>
    </body>
```

### Load Dynamic Content Asynchronously
Many sites with dynamic displays contain content that is not initially visible and may not be shown to some devices (like mobile phones). When it makes sense, this content should be loaded asynchronously via AJAX – either after the page has loaded or when it is needed. This helps keep the size of the HTML document small.

### Make Requests Cacheable
Ensure that HTTP requests loaded via JavaScript are subject to the same web caching rules as full web pages. For instance, if a standard document is cached for 15 minutes, then all JavaScript requests on that page should also be cached for 15 minutes.

### Use GET
Using GET instead of POST saves a small amount of bandwidth by sending one packet instead of two.

## HTML

### Valid Markup
The first priority for a web developer should be to write markup that validates. This is a best practice that crosses many aspects of web development and should be relatively straightforward to achieve (with maybe the exception of third-party code). A browser does less work when parsing valid code and can avoid "interpreting" broken code. This also ensures that validation can be used as part of the troubleshooting process: if the page doesn't validate, there's something wrong in the system that should be fixed.

You can use a tool like [W3C's Markup Validation Service](https://validator.w3.org/) to validate your markup.

### Avoid Inline Styles and Scripts
All scripts and styles should be moved to an external source. This increases code reuse and keeps the markup clean. Inline event handlers (i.e. onClick) should never be used; always attach JavaScript functions via DOM scripting methods. The exception is scripts included via conditional comments for particular browsers; these should be embedded in the markup.

BAD
```html
<div style="background-color: #000;" onclick="event"></div>
```

GOOD
```html
<div class="my-div" data-click-target></div>
```

## Fonts

### Minimize the Number of Fonts Being Used
Do not use too many fonts on your site, and do not import more font variants than you need. For instance, if the designs only call for 400 & 700 weights of a font, do not import the entire fontface. Libraries like [Google Fonts](https://fonts.google.com/) and [Adobe Typekit](https://typekit.com/) allow you to import the exact font weights and styles you need. [Web Font Loader](https://github.com/typekit/webfontloader) is a helpful tool for importing the exact font styles you want from multiple sources, including local fonts.

### Use Compressed Font File Types
The WOFF format is pre-compressed and works in all modern browsers and is the preferred format. WOFF2 comes with the best compression out of the box, but has less browser support. If you need to use TTF or EOT formats (TTF for old Android browsers, EOT for IE), be sure to compressing the font files with GZIP when delivering the fonts.

### Include local() & format() Directives in a @font-face Declaration
When you the `local()` directive in a `@font-face` declaration, the browser will first check for the font locally. If the font exists locally, it will stop and render the font from the local resource. When you use the `format()` directive, the browser will only download a resource if the browser supports that format. 

Your declaration should look something like this:

```css 
    @font-face {
        font-family: 'Font Name';
        font-weight: 400;
        src: local('Awesome Font Italic'),
        url('/fonts/awesome-i.woff2') format('woff2'), 
        url('/fonts/awesome-i.woff') format('woff'),
        url('/fonts/awesome-i.ttf') format('truetype'),
        url('/fonts/awesome-i.eot') format('embedded-opentype');
    }
```

Including these directives prevents the browser from downloading unused resources and improves page performance.

## Third Party Code

### async / loader script
A web browser will block while downloading a JavaScript file at the bottom of the page that is called via a SCRIPT element. To further speed up JS processing, load the JavaScript library asynchronously by including a small loader script at the bottom of the page that then imports the rest of the code.

### Third Party Ads
Third party display ads are the single biggest performance drain on the web today. For every 1 HTTP request a web page sends to an ad server, as many as 10 elements are returned in order to fulfill that request, including tracking beacons, JavaScript files, images and Flash. These assets are usually distributed across domain names, further increasing latency and round trip time for the entire page.

The best way to mitigate these effects is to place each display ad into an iframe. The iframe will allow the ad requests to be processed in parallel to the web page without interfering with is performance. An ad that fails to load in an iframe may delay the onLoad or onDomReady events and prevent JavaScript loading, but the HTML documents will be completely styled and interactive.

## Images

### Optimization

All images in the project should be compressed. This will be one of the biggest performance enhancing things you can do for a website as images can easily be some of the largest files the browser has to load. A page with excess image weight will load slower.

[ImageOptim](https://imageoptim.com/ "ImageOptim") will work for PNG, JPEG formats.

[Optimage](http://getoptimage.com/ "Optimage") works for PNG, JPEG, SVG and GIF formats.

[SVGO](https://github.com/svg/svgo "SVGO") or [SVG OMG](https://jakearchibald.github.io/svgomg/ "SVG OMG") work for SVGs.

[ImageMin](https://www.npmjs.com/package/imagemin "ImageMin") is an NPM package that can be configured to optimize your projects images programmatically.

### Image Type

Different images perform better depending on what type of graphic you are using. Vector images (.svg) perform better for images composed of geometric shapes. Raster images (.jpeg) perform better for photos.

PNG files are not as compress-able as JPEG images. They do not allow any *lossy* compression. They should be used judiciously, in cases where the unique features of increased image quality and support for transparent backgrounds, etc. are required.

#### Image Sprites

Combining SVG assets into one reduces the number of assets loaded. Using a tool like [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader 'svg-sprite-loader'), your set of SVGs can be combined into one.

#### Progressive JPEG
Typically, JPEG images load top-to-bottom so the full image appears slowly as it loads. With Progressive JPEG files, the whole image loads at once, starting in low quality and gradually becoming the full quality image. While this doesn't load the image any faster or decrease the file size, it gives the appearance of faster loading to the user. [Yahoo](https://yuiblog.com/blog/2008/12/05/imageopt-4/) has a blog post with more information about progressive JPEG files.

Medium and Facebook use a use a javascript technique to imitate progressive JPEG files. This technique entails loading a very small version of the image onto the page with an aesthetically pleasing blur, and then loading the full image when the page is fully loaded. We've created a [proof of concept](https://codepen.io/kamul13/pen/LxKKEv "proof of concept") to demonstrate the creation of these progressive JPEGs.

#### WebP Images
WebP is an image format that can be used as an alternative for PNG and JPEG images at a fraction of the file size. It has [minimal browser support](http://caniuse.com/#feat=webp), but where it is supported, it can significantly decrease file size. You should include WebP images on projects where a lot of the traffic comes from supported browsers. 

The best way to incorporate a WebP image in HTML is using the picture element with a fallback option.

HTML WebP image: 
```html
<picture>
    <source srcset="./image_1.webp" type="image/webp">
    <source srcset="./image_1.jpg" type="image/jpeg"> 
    <img src="./image_1.jpg" alt="Alt Text!">
</picture>
```

You can create WebP files using the [ImageMin](https://www.npmjs.com/package/imagemin "ImageMin") NPM package mentioned above to optimize images.

[CSS Tricks](https://css-tricks.com/using-webp-images/ "CSS Tricks") has more detailed information about the WebP image format.


### Specify Image Dimensions, Do Not Resize

Images are inline elements and content must flow around them. Embedding the image dimensions in the markup via the width and height attributes will help the browser do less processing to determine the layout and will eliminate the reflow drawing that can occur as content is loaded and parsed. This only works for static designs however.

BAD
`<img src="placehold.it/500x500" width="100" height="100">`

GOOD 
`<img src="placehold.it/500x500" width="500" height="500">`

When implementing a responsive design, let the CSS control the image size rather than using HTML width and height attributes.

### Lazy loading

This is a technique used to improve initial load speed by delaying the actual loading of images until they are viewable. By setting empty or invalid `src` attributes on your image tags, you can prevent any initial image asset loading. Then, you must include a script to add event listeners to the DOM, waiting for the user to navigate to parts of the page where the image comes into the window frame, *then* the image is loaded. [CSS Tricks](https://css-tricks.com/snippets/javascript/lazy-loading-images/ 'CSS Trick Lazy Loading') has a good example of one such script.

### Mobile

In some cases, responsive design will call for different size/shapes of an image at different breakpoints. To deliver this with the best performance, we should avoid always serving the same image simply redrawn at the right size. On low-bandwidth devices, loading a huge desktop sized image so that it fits on a mobile screen is a huge waste of page-weight.

For background images, use CSS media queries to serve different images at lower sizes.

```sass
.hero {
    // Smallest image loaded by default.
    background-image: url("./my_image100x200")

    // First breakpoint, load the medium sized image.
    @media (min-width: 600px) {
        background-image: url("./my_image200x400");
    }

    // Second breakpoint, load the large image.
    @media (min-width: 1000px) {
        background-image: url("./my_image400x800");
    }
}
```

## Testing Performance
When testing performance, there are some basic metrics you should measure against. The main performance benchmark is page load speed, which is important for User Experience and SEO. The slower your page loads, the more likely a user is to abandon the site. A slow page load is also penalized in Google's search ranking. If you want to find ways to improve on this benchmark or want more detailed break down of your page performance, you can use free, online tools to measure your performance. Below are a few of these resources. 

### Chrome Timeline
The Timeline tool in Chrome inspector allows you to record and analyze every event that occurs during page load. [Google Developers](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool) is a great resource for learning how to use the Timeline Tool.

### Webpagetest
[webpagetest.org](https://www.webpagetest.org/) is another tool that records and analyzes page performance. This tool also gives you a report card that grades you on individual performance measures, such as using a CDN and compressing images, and gives you detailed information about where you can improve performance. 

### Yellow Lab Tools
Similar to Webpagetest, [Yellow Lab Tools](http://yellowlab.tools/) gives you a report card with detailed information about improving page performance in specific areas. Yellow Lab Tools gives especially detailed information about bad CSS patterns that could affect performances, like 

### Louis for Gulp
[Louis](https://github.com/AvraamMavridis/gulp-louis) is gulp plugin a good tool for measuring performance during the development process. It allows you to budget performance and measure actual values against your expected values for things like HTML size, number of global variables, and total number of requests.
