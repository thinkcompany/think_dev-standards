# Performance Development Standards

## Minimize page load time

### Reduce HTTP requests

Each individual element on a web page generates an HTTP request which adds its own network latency, download time and render time. The most crucial optimization for any web site is to reduce or limit the number of total HTTP requests. There are several ways to accomplish this, the most common of which is to combine CSS, JS and images into as few files as possible.

### Serve external assets from a content delivery network (CDN) with a cookie-less domain

Always serve JavaScript, CSS and chrome images from a CDN, which distributes the content across a wide geographic area and helps reduce the roundtrip time for these assets. It is crucial that the domain for the CDN be different from the web site. A web browser will send any cookies it has stored for a domain for every HTTP request to that domain. Serving external assets from a different domain will avoid this unnecessary data transmission.

### Set a future expiration date on external assets

Most of the visits to a web site are by visitors with a "primed cache", which means that the user has visited the site before and is viewing additional content. It is crucial to ensure that these page views make use of the users local cache to retrieve JavaScript, CSS and images instead of retrieving them from the server. These assets should have an expiration date of at least one month from the request time.

### Compress assets with GZIP

All text assets — JavaScript and style sheets — should be compressed with GZIP. It can compress these files by 70% or more and it is universally supported. There's no excuse not to do this.

### Reduce DNS Lookups

DNS lookups add latency to HTTP requests and are not cached for very long in the browser. On the other hand, parallel downloads from different domains can be an effective performance enhancement, so there is a balance to be found. Yahoo! recommends between two and four unique host names per site.

* redirect

* mobile?

* page rendered vs page interactive

* ajax
  * make requests cacheable
  * use GET

* testing

  * webpagetest.org
  * yellowlab.tools

fonts?

* async?

## Javascript

* concatenate scripts
  * is this needed in http/2?
* minify
* load at bottom of page
* js perf standards?


css

* concatenate css
* minify
* import using link element

images

* combine into sprites
  * prefer svg?
    * combine in svg sprite
  * mobile?
* larger images?
* lazy load images?

## HTML

### Valid Markup

The first priority for a web developer should be to write markup that validates. This is a best practice that crosses many aspects of web development and should be relatively straightforward to achieve (with maybe the exception of third-party code). A browser does less work when parsing valid code and can avoid "interpreting" broken code. This also ensures that validation can be used as part of the troubleshooting process: if the page doesn't validate, there's something wrong in the system that should be fixed.

* valid markup
* page-level wrapper?
* avoid inline styles / scripts
* do not resize images
* load content via ajax

## Third Party Code

### async / loader script

A web browser will block while downloading a JavaScript file at the bottom of the page that is called via a SCRIPT element. To further speed up JS processing, load the JavaScript library asynchronously by including a small loader script at the bottom of the page that then imports the rest of the code. This technique was developed by Yahoo and is a part of their YUI library. Read a description of the technique here.

### Third Party Ads

Third party display ads are the single biggest performance drain on the web today. For every 1 HTTP request a web page sends to an ad server, as many as 10 elements are returned in order to fulfill that request, including tracking beacons, JavaScript files, images and Flash. These assets are usually distributed across domain names, further increasing latency and round trip time for the entire page.

The best way to mitigate these effects is to place each display ad into an iframe. The iframe will allow the ad requests to be processed in parallel to the web page without interfering with is performance. An ad that fails to load in an iframe may delay the onLoad or onDomReady events and prevent JavaScript loading, but the HTML documents will be completely styled and interactive.