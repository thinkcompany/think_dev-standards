---
title: Customizing the Theme
date: "2020-06-08"
area: Contributing
section: 4. Advanced
description: ""
---

### Changing the Site Meta Data

In `gatsby-config.js`, update the `siteMetaData` block with your project information. The `title` property changes the title in the `HeaderBar`.

```shell
siteMetadata: {
	title: `Design Systems Guide`,
	author: `Think Company`,
	description: `An internal resource to learn, sell, scope, and deliver Design Systems for Think Company and our clients.`,
	siteUrl: `https://designsystems.thinkcompany.com`,
	social: {
	  twitter: `thinkcompany`,
	},
  },
```

### Updating the Theme

All theme customizations can be made from the `_theme.scss` file in `src/styles/`. You can customize the colors, typography, and styles for the base HTML elements.
