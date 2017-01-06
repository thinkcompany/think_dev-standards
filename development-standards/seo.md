#SEO Development Standards - DRAFT

This document defines the standard practices for optimizing web pages for search engines. Developers must first ensure that they are building web pages according to the Web Optimization Guidelines, as search engines favor sites when determining search query relevancy. SEO enhancements also aid in general website accessibility, so there is absolutely no excuse not to implement the guidelines set forth in this document, however any Accessibility Guidelines may override any guidelines set forth for SEO.

##Markup

Developers are expected to write HTML code that conforms to the HTML Coding Guidelines, but they must be extra aware of a subset of HTML elements that are intended to help web crawlers index our sites. This markup is business-critical and should be implemented with the utmost care.

###Title

The content of the title element is one of the most important factors for a search engine to determine its page rank and it will appear as the largest linked heading on the search results page. It is vital that the title contain keywords which describe the content of the page, and in the case of the home page, the keywords should describe the content of the entire site. The name of the site should also appear in the title, but its position will vary depending on which type of page it is.

####Title Length

Titles should be limited to 90 characters including spaces and separators. Google will truncate the display of page titles to 66 characters on its search results page. These should not be considered bugs in QA.

Special characters, such as a registered trademark symbol, may be used in a title element as long as they are escaped using the appropriate HTML entity code.

###Meta Elements

There are several meta elements that should be implemented to aid in search engine placement.

####Description

The description meta element should contain a 150-character blurb (including spaces and separators) that may appear on the search engine results page and may aid page rank.

####Keywords

The keywords meta should contain a comma-separated list of keywords that describe the content of the site. This element has been deemphasized by Google, but it may still be specified. The character limit is 200.

####Robots

This meta element provides guidance to a web crawler regarding which content should be indexed. The default value is "index, follow" which will ensure that all pages are indexed and all links are spidered. This value does not need to be specified. This meta tag should only contain content when some other behavior is desired.

This meta element is page-specific, so the site architecture needs to support per-page meta tags. Some of the common values you are likely to see include:
* `noindex`: prevents the page from being indexed
* `nofollow`: prevents the crawler from indexing links on the page
* `noodp`: blocks the Open Directory Project description of the page from being used in the description that appears below the page in the search results
* `noarchive`: prevents a cached copy of this page from being available in the search results
* `noydir`: prevents the page from being included in Yahoo's index

These values should be included in the content attribute and should be separated by a space. These values are case-insensitive, so follow markup standards and use all lowercase letters.

Example:
```html
<meta name="robots" content="noodp, noydir" />
```

###Canonical Link

Content management systems may serve the same content at different URLs, but only one URL is the "real" or "canonical" page. Use a link element with rel="canonical" to specify the one true page URL for Google.

Example:
```html
<link rel="canonical" href="http://www.domain.com/path/page/" />
```

###Anchors

Anchors should be marked up according to the HTML Coding Guidelines. That is usually the extent of a developer’s involvement with links, but we should all be cognizant of a few key issues surrounding the content of anchors.

####Anchor Labels

Anchors should always use a unique, descriptive label. This aids accessibility for all users — especially those using assistive-technology — as well as search engines. Labels such as "click here" and "read more" should be avoided in favor of labels that include some description of the content.

Bad Example:
```html
Products & Services <a href="url">more</a>
```

Good Example:
```html
<a href="url">More about Products & Services</a>
```

####NOFOLLOW

The rel attribute of the anchor element can be used to indicate the relationship to the linked page. For search engine purposes, rel="nofollow" should be used to prevent spidering of anchors that link to unreleated domains. 

Example:
```html
<a href="http://www.yahoo.com" rel="nofollow">Yahoo.com</a>
```

###Headings

Proper use of HTML headings is crucial to not only a well-formed and semantically-structured document, but also to the ease with which a web crawler determines the relevance of content to a search query. Headings should follow these guidelines:

* `<h1>`: should be used for the top-level heading text on a page. On article pages, this will typically be the article title. It may be more difficult to discern an <h1> on index pages. The `<h1>` should not be used as a wrapper for the site logo image. Only one `<h1>` should appear on a page.
* `<h2>`: used for top-level headings, typically section or module titles
* `<h3>` through `<h6>`: used as appropriate in a hierarchical manner

###Site Logo

The site logo which appears in the header should be marked up as standard text inside of a block-level element. The graphic should appear as a background image as part of a sprite. The element should contain descriptive text which can be shifted offscreen using various CSS methods, of which text-indent is the most reliable.

Example:
```html
<div class="logo">Brand or Company Name</div>
```

###Images

All image elements should contain the `alt` attribute with a value that describes the image. This value will typically come from a CMS or data feed. Do not specify a `title` attribute on an image.

Example:
```html
<img src="image.jpg" alt="The Liberty Bell" />
```

In many cases, an image will be displayed directly adjacent to a link or heading which describes the image. When this occurs, it is best to leave the alt attribute blank to prevent screen readers from reading the same text multiple times.

Example:
```html
<img src="blah.jpg" alt="" />
```

###Navigation

Navigation should appear in the document source/DOM in its natural place, usually just after the header. Expanded navigation (secondary/tertiary drop-downs, fly-outs, etc.) should appear at the bottom of the document and be repositioned into the nav via CSS or JavaScript. This content does not provide any SEO value and can actively hurt page rank by adding code between the top of the page and the start of its content.

####Pagination

Each page should contain navigation to all other pages. These pages should be linked by numbers presented in an unordered list element.

Example:
```html
<ul>
	<li><a href="#">1</a></li>
    <li><a href="#">2</a></li>
	<li class="selected">3</li>
	<li><a href="#">4</a></li>
	<li><a href="#">5</a></li>
	<li><a href="#">6</a></li>
</ul>
```

The currently selected page (page 3 in the above example) should not be linked. This type of navigation typically renders horizontally with dividers between the numbers.

Example: `1 | 2 | 3 | 4 | 5 | 6`

NOTE: Do not use a vertical bar character `|` to separate the numbers. Use the CSS border property to apply the divider.

##Domains and URLs

###Directory Structures

URLs should be kept as short as possible and should use as few subdirectories as possible (a maximum of four subdirectories). 

###robots.txt

This is a text file that lives in the web root of the site and instructs a web crawler about which pages that it should not index. Ensure that experimental or testing pages have an entry in robots.txt.

Example:
```html
User-agent: *
Disallow: /adtest/
Disallow: /styleguide/
```

###Redirects

It may sometimes be necessary to move a page to a new URL, in which case the old URL should redirect to the new URL. This action should be accomplished via the use of a server-side 301 redirect, which will let web crawlers know that the page has moved permanently and that it should index the destination page and not the redirecting page.

###Content Delivery Networks (CDN)

Optimization techniques require that static assets, such as JavaScript, style sheets and images be stored on a content delivery network (CDN) that is referenced via a cookie-less subdomain or alternate domain name. 

```html
<img src="http://cdn.domain.com/assets/image.jpg" alt="" />
```

##Sitemaps

Sitemaps are an important tool for both users and search engines. 

###HTML Sitemap

All sites should contain a sitemap page that links to all of the major section index pages. It is not necessary to link to every document on the site, just relevant content.

###XML Sitemap

An XML sitemap provides links to every page on a site, including articles and videos. Do not manually create XML sitemaps; most content management systems can produce these either natively or via a plugin. 

XML sitemaps are limited to 50,000 URLs or 10MB. A sufficiently large site must use a sitemap index file that links to individual sitemaps of up to 50,000 URLs each.
