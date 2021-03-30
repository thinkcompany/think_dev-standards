const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
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
        accessibility: allMdx(
          filter: { frontmatter: { area: { eq: "Accessibility" } } }
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
        automatedtesting: allMdx(
          filter: { frontmatter: { area: { eq: "Automated Testing" } } }
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

  //This section loops through all the markdown data for Community, UI Library, and Get Started content.
  //It creates pages for that content using the landing.js template
  const getStartedPosts = result.data.getstarted.edges;
  const accessibilityPosts = result.data.accessibility.edges;
  const automatedTestingPosts = result.data.automatedtesting.edges;
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

  //Accessibility content
  accessibilityPosts.forEach((post) => {
    createPage({
      path: post.node.fields.slug,
      component: landingPage,
      context: {
        slug: post.node.fields.slug,
        area: "Accessibility",
        title: "Accessibility",
      },
    });
  });

  //Automated Testing content
  automatedTestingPosts.forEach((post) => {
    createPage({
      path: post.node.fields.slug,
      component: landingPage,
      context: {
        slug: post.node.fields.slug,
        area: "Automated Testing",
        title: "Automated Testing",
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
