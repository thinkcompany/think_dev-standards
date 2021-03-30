---
title: Add New Content Areas
date: "2020-06-08"
area: Contributing
section: 4. Advanced
description: ""
---

Let's say your system has grown an you need a new content area that isn't one of the defaults provided (communituy, get started, etc). Here's how you would do that:

1. Create a new folder in `/content` for your new area
2. Define the `area` value for the frontmatter. For example, if you're adding an area for Content Strategy you could name the `area` _Content Strategy_.
3. Update `gatsby-node.js`. See below for guidance.
4. Start adding content to the new folder in `/content`

### Updating Gatsby Node

**`gatsby-node.js`** is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). This is where pages are created from the markdown files in the `/content` folder, using the template javascript files in `/src/templates`.

First, we need to add to our GraphQL query. Add to `const result = await graphql` with your new query:

```js
NAME_OF_YOUR_NEW_CONTENT_AREA: allMdx(
          filter: { frontmatter: { location: { eq: "NAME_OF_YOUR_NEW_CONTENT_AREA" } } }
        ) {
          edges {
            node {
              excerpt
              fields {
                slug
              }
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                section
                description
                area
              }
            }
          }
        }
```

Next, create a new `const` to hold the data from new new query:

```js
const NAME_OF_YOUR_NEW_CONTENT_AREA =
  result.data.NAME_OF_YOUR_NEW_CONTENT_AREA.edges;
```

Finally, we need to loop through all the data from the query and create pages for each of them. The page template used for this is `./src/templates/landing.js`, but you're free to create new template pages as desired.

```js
NAME_OF_YOUR_NEW_CONTENT_AREA.forEach((post) => {
  createPage({
    path: post.node.fields.slug,
    component: landingPage,
    context: {
      slug: post.node.fields.slug,
      location: "NAME_OF_YOUR_NEW_CONTENT_AREA",
      title: "TITLE FOR THIS NEW AREA",
    },
  });
});
```
