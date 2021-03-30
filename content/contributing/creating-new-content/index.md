---
title: 3. Creating New Content
date: "2020-06-08"
area: Contributing
section: 3. Content Management
description: ""
---

### Create a New Branch

Create a new branch in git for the content you're contributing. Be sure to give the branch a name that makes sense based on what you're contributing.

### Choose a Content Area

Choose an area for your content to live:

| Frontmatter Area | Content Folder  |
| ---------------- | --------------- |
| Blog             | `/blog`         |
| Community        | `/community`    |
| Contributing     | `/contributing` |
| Get Started      | `/get-started`  |
| UI Library       | `/ui-library`   |

### Create Folder and Files

Create a folder for the new content you'll be adding. Remember, the name of the folder determines the URL for the content. See [Folder Structure]() for more details.

### Create Markdown File

In the newly created folder, create a new file and name it `index.md`. This is the markdown file you'll be adding your content to. Any images you need can also be added to this folder.

### Add Frontmatter to Markdown File

The structure for the frontmatter looks like this:

```md
---
title: 2. Frontmatter for Markdown Files
date: "2020-06-08"
area: Contributing
section: 3. Editing Content
description: ""
---
```

Blog posts look like this:

```md
---
title: LnL - Design Systems at Think Company
date: "2020-02-21"
area: Blog
section: Blog
author: Shawn Hickman & Kathleen Mullins
description: This was an introductory lunch n’ learn that gave an overview of design systems at Think Company presented by Kathleen Mullins and Shawn Hickman.
---
```

To learn more about frontmatter, see [Frontmatter for Markdown Files](http://designsystems.thinkcompany.com/contributing/frontmatter-for-markdown-files/).

### Add the Content

Now you can add the content to the markdown file. To see your changes live in the browser, run `gatsby develop` in the terminal.

### Commit Changes

Be sure to commit your changes as frequently as needed.
