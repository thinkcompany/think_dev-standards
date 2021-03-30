---
title: 2. Frontmatter for Markdown Files
date: "2020-06-08"
area: Contributing
section: 3. Content Management
description: ""
---

When you create a Markdown file, you can include metadata that describes where the content should live. This data is called frontmatter and is denoted by triple dashes at the start and end of the block at the top of the document. This data determines where this content goes in the UI of the storefront.

Here's what the frontmatter looks like for this page:

```md
---
title: 2. Frontmatter for Markdown Files
date: "2020-06-08"
area: Contributing
section: 3. Editing Content
description: ""
---
```

- `title` is used for the page title and any links pointing to that page
- `date` is only used for blog posts
- `area` is the "area" of the site the content lives in. See below for all the areas.
- `section` is used to organize the content in the side navigation panel. These sections can be whatever you want. For the UI Library, we use "Primitives", "Controls", and "Forms".
- `description` is where you can add a short snippet describing the content of the document. This is only used for blog posts.

Blog posts have an additional field called `author`. This allows you to specify a name for whoever wrote the blog post. If `author` is left empty, it will default to "The Team".

### Areas

Areas are the main locations of the site that content lives. When writing markdown content, add the appropriate frontmatter area from the table below.

| Frontmatter Area | Content Folder  |
| ---------------- | --------------- |
| Blog             | `/blog`         |
| Community        | `/community`    |
| Contributing     | `/contributing` |
| Get Started      | `/get-started`  |
| UI Library       | `/ui-library`   |

---
