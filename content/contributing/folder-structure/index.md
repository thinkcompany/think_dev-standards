---
title: 1. Folder Structure
date: "2020-06-08"
area: Contributing
section: 3. Content Management
description: ""
---

All content for the site is drive by [Markdown](https://www.markdownguide.org) & [MDX](https://mdxjs.com/getting-started) files in the `/content` folder. The folder structure looks like this:

    ./content
    ├── assets
    ├── blog
    ├── community
    ├── contributing
    ├── get-started
    ├── ui-library

---

## Folder Structure

The folder structure within the `/content` folder determines the url for each page. For example, here's the folder and URL path for the current page:

#### Folder Path

`/content/contributing/folder-structure.md`

#### URL Path

`http://designsystems.thinkcompany.com/contributing/folder-structure/`

#### Some Notes

- Since the naming of the url is based on the folder structure, the markdown file inside is named `index.md`.
- Any images you want to use for that page can be placed in the same folder as `index.md`. This makes them really easy to reference in the markdown file. For example, here's how you would reference an image in the markdown file `![Buttons Hero Image](StorefrontButtonsHero.jpg)`
