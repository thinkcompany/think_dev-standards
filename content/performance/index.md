---
title: Performance
date: "2026-05-22T00:00:00.000Z"
area: Performance
section: 1. Overview
description: ""
---

This document contains Think Company's standards for addressing performance.

## Table of contents

- [JavaScript](#javascript)
- [HTML](#html)
- [Fonts](#fonts)
- [Third Party Code](#third-party-code)
- [Images](#images)
- [Testing Performance](#testing-performance)

Performance is measured against the **Core Web Vitals**: Largest Contentful Paint (LCP), Interaction to Next Paint (INP — which replaced First Input Delay in March 2024), and Cumulative Layout Shift (CLS). Optimization is about removing time and bytes from the path between a user's request and a usable page.

### Serve assets from a CDN over HTTP/2 or HTTP/3
Always serve JavaScript, CSS, images, and fonts from a CDN, which distributes the content across a wide geographic area and reduces round-trip time. The advice to use a separate cookieless domain is obsolete — it was a workaround for HTTP/1.1's 6-connection-per-host limit. With HTTP/2 multiplexing (and even more so with HTTP/3/QUIC), serving everything from a single origin is faster and simpler.

### Set far-future cache headers on immutable assets
Build pipelines should include a content hash in every static asset filename (e.g. `main.a1b2c3.js`). Cache those assets with `Cache-Control: public, max-age=31536000, immutable` (one year). When the asset changes, the filename changes, so cache invalidation is automatic.

For HTML and other resources that can't be hashed, use shorter cache lifetimes with revalidation (`Cache-Control: no-cache` or short `max-age` with `stale-while-revalidate`).

### Compress assets with Brotli (or GZIP)
Compress all text assets — JavaScript, CSS, HTML, SVG, JSON — with **Brotli** (preferred) or **GZIP**. Brotli typically compresses 15–25% better than GZIP and is supported by every browser that matters. Configure your CDN/server to negotiate Brotli with clients that send `Accept-Encoding: br`, with GZIP as a fallback.

### Use resource hints
Place these in the `<head>` to give the browser a head start:

- `<link rel="preconnect" href="https://cdn.example.com">` — open the TCP/TLS connection early to a known third-party origin.
- `<link rel="dns-prefetch" href="https://cdn.example.com">` — cheaper than preconnect; resolves DNS only.
- `<link rel="preload" href="/fonts/brand.woff2" as="font" type="font/woff2" crossorigin>` — fetch a critical asset early; use for fonts, hero images, and any LCP candidate.
- `<link rel="modulepreload" href="/js/app.js">` — preloads an ES module and its imported dependencies.

Use `fetchpriority="high"` on the LCP `<img>` and `fetchpriority="low"` on below-the-fold or non-critical assets.

### Avoid redirects
Redirects add a full round-trip before the actual response. While 301s *are* cached by modern browsers (often aggressively), each one still costs latency on the first hit and can interfere with cache-control headers.

An often-overlooked redirect occurs when a user requests a URL without a trailing slash, such as `domain.com/about`, which usually redirects to `domain.com/about/`. Serve both URLs directly when possible.

## JavaScript

### Bundle and code-split
Modern bundlers (Vite, esbuild, Rollup, Turbopack) split and tree-shake JavaScript automatically. Favor route- and component-level code splitting over serving one monolithic bundle. Configure your build so the initial bundle contains only what's needed for first paint and interaction; lazy-load the rest with dynamic `import()`.

Set a bundle-size budget in your CI (e.g. via `bundlesize`, Lighthouse CI, or `size-limit`) so regressions get caught before they ship.

### Minify
Bundlers minify JavaScript by default in production builds via terser, esbuild, or SWC. Verify your production build is producing minified output and source maps separately. Do not ship source maps publicly unless you intend to.

### Load scripts in `<head>` with the right attribute
The "scripts at the bottom of the body" pattern is obsolete. Place scripts in `<head>` and let modern script-loading attributes handle blocking behavior:

- `defer` — downloads in parallel with HTML parsing, executes after parsing, preserves source order. Correct default for most application code.
- `async` — downloads in parallel and executes as soon as ready; order not guaranteed. Use for independent third-party scripts (analytics, isolated widgets).
- `type="module"` — ES modules are deferred by default; no `defer` needed.

```html
<head>
    <script src="/js/main.js" defer></script>
    <script src="https://analytics.example.com/tracker.js" async></script>
    <script type="module" src="/js/app.js"></script>
</head>
```

### Lazy-load content below the fold
Use `loading="lazy"` on `<img>` and `<iframe>` elements that appear below the fold — it is native, requires no JavaScript, and is widely supported. For more granular control (component-level lazy hydration in a framework), use the framework's primitives (`React.lazy`, `next/dynamic`, etc.).

### Make Requests Cacheable
Ensure that HTTP requests loaded via JavaScript are subject to appropriate caching headers. Use `Cache-Control` directives like `stale-while-revalidate` to serve a stale response while refreshing in the background. For client-side data caching, libraries like TanStack Query (React) handle this layer.

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
Do not use too many fonts on your site, and do not import more font variants than you need. If the designs call for only 400 and 700 weights, do not import the entire family. Consider a **variable font** when multiple weights/widths are needed — a single variable font file can replace several static variant files at a lower combined cost.

### Self-host fonts when possible
Self-hosting from your own origin (or CDN) avoids a third-party connection and the latency of `fonts.googleapis.com`. The Google Fonts UI provides files you can download and serve yourself. When using a third-party font service, add `<link rel="preconnect">` to its CDN.

### Use WOFF2
**WOFF2 is the only format you need.** It has universal support in every browser still receiving updates (Baseline since 2020), uses Brotli-equivalent compression, and is roughly 30% smaller than WOFF. Drop WOFF, TTF, and EOT fallbacks unless you have a specific reason to keep them — they add bytes without serving real users.

### Use `font-display` and preload critical fonts
Use `font-display: swap` (or `optional` for the smallest CLS impact) to prevent invisible text during font load. Preload fonts used for above-the-fold text:

```html
<link rel="preload" href="/fonts/brand.woff2" as="font" type="font/woff2" crossorigin>
```

```css
@font-face {
    font-family: 'Brand Sans';
    font-style: normal;
    font-weight: 400 700; /* variable font range */
    font-display: swap;
    src: url('/fonts/brand.woff2') format('woff2-variations');
}
```

Use `size-adjust`, `ascent-override`, and `descent-override` to tune fallback fonts to the metrics of your custom font and minimize layout shift when the web font swaps in.

## Third Party Code

Every third-party script is a performance liability you do not control. Audit them ruthlessly: each one runs JavaScript on your users' devices, may make additional network requests, and can block rendering.

### Load third-party scripts asynchronously
Use `async` (not `defer`) for scripts whose execution order doesn't matter — analytics, error reporting, marketing tags. See the [JavaScript loading section](#load-scripts-in-head-with-the-right-attribute) for full guidance.

```html
<script src="https://analytics.example.com/tracker.js" async></script>
```

For tags that need to run after the page is interactive, consider deferring their initialization with `requestIdleCallback` so they don't compete with critical work.

### Third Party Ads and Embeds
Third-party ads, social embeds, and chat widgets are routinely the single biggest performance drain on the page. Each request to an ad server often returns 10+ subresources — tracking beacons, scripts, images — distributed across additional origins.

Mitigations:

- Sandbox each ad/embed in an `<iframe>` so it cannot block the parent document. Use the `loading="lazy"` attribute to defer offscreen iframes.
- Use **facade patterns** for heavy embeds (YouTube, Twitter, chat widgets): render a lightweight placeholder that loads the real embed only when the user interacts with it. See [Lighthouse's "third-party-facades" audit](https://developer.chrome.com/docs/lighthouse/performance/third-party-facades).
- Set a performance budget for third-party JS in your CI; reject changes that exceed it.

## Images

### Optimization

All images in the project should be compressed. This will be one of the biggest performance enhancing things you can do for a website as images can easily be some of the largest files the browser has to load. A page with excess image weight will load slower.

[ImageOptim](https://imageoptim.com/ "ImageOptim") will work for PNG, JPEG formats.

[Optimage](http://getoptimage.com/ "Optimage") works for PNG, JPEG, SVG and GIF formats.

[SVGO](https://github.com/svg/svgo "SVGO") or [SVG OMG](https://jakearchibald.github.io/svgomg/ "SVG OMG") work for SVGs.

[ImageMin](https://www.npmjs.com/package/imagemin "ImageMin") is an NPM package that can be configured to optimize your projects images programmatically.

### Image Type

Different images perform better depending on what type of graphic you are using. Vector images (.svg) perform better for images composed of geometric shapes. Raster images (.jpeg) perform better for photos.

PNG files are not as compressible as JPEG images. You should choose the best format based on an individual use-case. For example, the PNG format can be used if you need transparency, but should not be used for photographic images.

#### Image Sprites

Combining SVG assets into one reduces the number of assets loaded. Using a tool like [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader 'svg-sprite-loader'), your set of SVGs can be combined into one.

#### Use Modern Formats: AVIF and WebP
**AVIF** offers the best compression for raster images today (typically 30–50% smaller than equivalent JPEG, 20% smaller than WebP) and is supported by all major browsers. **WebP** is universally supported and is a strong default. Use both with a JPEG fallback via `<picture>`:

```html
<picture>
    <source srcset="hero.avif" type="image/avif">
    <source srcset="hero.webp" type="image/webp">
    <img src="hero.jpg" alt="Sunrise over the Schuylkill" width="1600" height="900">
</picture>
```

Use a build pipeline (Sharp via [sharp-cli](https://github.com/vseventer/sharp-cli), [`imagemin`](https://www.npmjs.com/package/imagemin), or a CDN that does on-the-fly conversion like Cloudinary or imgix) to generate all three formats automatically.

#### Progressive JPEG (legacy)
For any remaining JPEG fallbacks, save them as progressive — the image renders coarsely first and refines as more bytes arrive, perceptually faster than a top-to-bottom render. Native browser support means the JS "blurhash" workarounds Medium and Facebook used years ago are no longer necessary.

### Specify Image Dimensions, Always

**Every `<img>` must have `width` and `height` attributes set to the intrinsic dimensions of the image**, even in responsive layouts. The browser uses them to compute an aspect ratio and reserve space before the image loads, which prevents Cumulative Layout Shift (CLS) — one of the three Core Web Vitals. Pair the attributes with responsive CSS so the image still scales:

```html
<img src="hero.jpg" alt="..." width="1600" height="900">
```

```css
img {
    max-width: 100%;
    height: auto;
}
```

For background images and other cases where intrinsic dimensions can't be expressed in HTML, use the `aspect-ratio` CSS property on the container.

### Lazy loading

Use the native `loading="lazy"` attribute on offscreen `<img>` and `<iframe>` elements. It is supported by every current browser and requires no JavaScript:

```html
<img src="below-fold.jpg" alt="..." width="800" height="600" loading="lazy">
```

For the LCP image (typically the hero), do *not* lazy-load it. Instead, set `fetchpriority="high"` so the browser prioritizes its download.

### Responsive Images

Use `srcset` and `sizes` to let the browser pick the right asset for the user's viewport and device pixel ratio. This avoids shipping a desktop-sized image to a phone:

```html
<img
    src="hero-800.jpg"
    srcset="hero-400.jpg 400w, hero-800.jpg 800w, hero-1600.jpg 1600w"
    sizes="(min-width: 64rem) 800px, 100vw"
    alt="..."
    width="800"
    height="450"
>
```

For background images that change at breakpoints, use vanilla CSS with `image-set()` or media queries:

```css
.hero {
    background-image: url("./hero-400.jpg");
}

@media (min-width: 600px) {
    .hero {
        background-image: url("./hero-800.jpg");
    }
}

@media (min-width: 1000px) {
    .hero {
        background-image: url("./hero-1600.jpg");
    }
}
```

## Testing Performance

Measure against the **Core Web Vitals**, which are Google's primary user-experience signals and a ranking factor in Search:

- **LCP (Largest Contentful Paint)** — when the largest element above the fold paints. Target: under 2.5s.
- **INP (Interaction to Next Paint)** — replaced FID in March 2024. Measures responsiveness across the user's full session. Target: under 200ms.
- **CLS (Cumulative Layout Shift)** — visual stability. Target: under 0.1.

### Lighthouse
[Lighthouse](https://developer.chrome.com/docs/lighthouse/) is built into Chrome DevTools (Lighthouse panel) and is the primary tool for local performance audits. It runs the same audits Google uses for PageSpeed Insights. Run it in "Mobile" emulation against a clean profile (incognito/guest) to get representative numbers.

### Chrome DevTools Performance panel
The **Performance** panel (formerly "Timeline") records every event in a page's load and runtime. Use it to find long tasks, layout shifts, render-blocking resources, and main-thread bottlenecks. The newer **Performance Insights** panel provides a guided LCP/CLS analysis.

### PageSpeed Insights and Web Vitals
[PageSpeed Insights](https://pagespeed.web.dev/) runs Lighthouse on Google's servers and also surfaces **field data** (real-user metrics from the Chrome User Experience Report). Lab data measures what *can* happen; field data measures what *is* happening to your users. Track both.

The [Web Vitals Chrome extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibgt) overlays LCP / INP / CLS readings while you browse — a fast feedback loop during development.

### WebPageTest
[WebPageTest](https://www.webpagetest.org/) is the most thorough free synthetic testing tool. It can run from multiple geographic locations, on real mobile devices, with throttled network conditions, and produces filmstrips and waterfall charts that DevTools can't match.

### CI integration: Lighthouse CI and size budgets
Catch regressions before they ship:

- [**Lighthouse CI**](https://github.com/GoogleChrome/lighthouse-ci) runs Lighthouse on every PR and fails the build if scores drop below configured thresholds.
- [**`size-limit`**](https://github.com/ai/size-limit) or [**`bundlesize`**](https://github.com/siddharthkp/bundlesize) enforce JS/CSS budgets per route.
- [**Calibre**](https://calibreapp.com/) and **SpeedCurve** are paid services that track field and synthetic data over time with alerting.

### Real-user monitoring (RUM)
For production-running apps, install a RUM script that reports the Web Vitals back to your analytics. The [`web-vitals` library](https://github.com/GoogleChrome/web-vitals) is the canonical implementation; it's a few KB and emits LCP, INP, CLS, FCP, and TTFB events.
