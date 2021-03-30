const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        blogPosts: allMdx(
          filter: { frontmatter: { area: { eq: "Blog" } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                area
                section
              }
            }
          }
        }
        getstarted: allMdx(
          filter: { frontmatter: { area: { eq: "Get Started" } } }
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
        uilibrary: allMdx(
          filter: { frontmatter: { area: { eq: "UI Library" } } }
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
        community: allMdx(
          filter: { frontmatter: { area: { eq: "Community" } } }
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
        contributing: allMdx(
          filter: { frontmatter: { area: { eq: "Contributing" } } }
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
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  //This section loops through all the markdown data for Blog content.
  //It creates pages for that content using the blog-post.js template
  const blogPosts = result.data.blogPosts.edges;
  const blogPost = path.resolve(`./src/templates/blog-post.js`);

  blogPosts.forEach((post, index) => {
    const previous =
      index === blogPosts.length - 1 ? null : blogPosts[index + 1].node;
    const next = index === 0 ? null : blogPosts[index - 1].node;
    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
        area: "Blog",
        title: "Blog",
      },
    });
  });

  //This section loops through all the markdown data for Community, UI Library, and Get Started content.
  //It creates pages for that content using the landing.js template
  const getStartedPosts = result.data.getstarted.edges;
  const communityPosts = result.data.community.edges;
  const uilibraryPosts = result.data.uilibrary.edges;
  const contributingPosts = result.data.contributing.edges;
  const landingPage = path.resolve(`./src/templates/landing.js`);

  //Get Started content
  getStartedPosts.forEach((post) => {
    createPage({
      path: post.node.fields.slug,
      component: landingPage,
      context: {
        slug: post.node.fields.slug,
        area: "Get Started",
        title: "Get Started",
      },
    });
  });

  //UI Library content
  uilibraryPosts.forEach((post) => {
    createPage({
      path: post.node.fields.slug,
      component: landingPage,
      context: {
        slug: post.node.fields.slug,
        area: "UI Library",
        title: "UI Library",
      },
    });
  });

  //Community content
  communityPosts.forEach((post) => {
    createPage({
      path: post.node.fields.slug,
      component: landingPage,
      context: {
        slug: post.node.fields.slug,
        area: "Community",
        title: "Community",
      },
    });
  });

  contributingPosts.forEach((post) => {
    createPage({
      path: post.node.fields.slug,
      component: landingPage,
      context: {
        slug: post.node.fields.slug,
        area: "Contributing",
        title: "Contributing Guide",
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
