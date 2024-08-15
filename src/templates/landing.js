import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import HeroBlockLanding from "../components/HeroBlockLanding";
import Layout from "../components/layout";
import SEO from "../components/seo";
import SideNav from "../components/SideNav";
import { htmlSanitizeParse } from "../utils";
import fooHeroImage from "../../content/assets/hero-01.jpg";
import barHeroImage from "../../content/assets/hero-02.jpg";
import styles from "../styles/LandingPage.module.scss";

const LandingPage = ({ data, pageContext }) => {
  const pageTitle = data.mdx.frontmatter.title;
  const sideMenuData = data.allMdx.edges;
  const post = data.mdx;
  let heroImage;

  switch (pageContext.title) {
    case "foo":
      heroImage = fooHeroImage;
      break;
    case "bar":
      heroImage = barHeroImage;
      break;
    default:
      break;
  }

  return (
    <Layout>
      <SEO title={pageTitle} />
      <HeroBlockLanding
        overlayOpacity="0.3"
        backgroundImage={heroImage}
        title={pageContext.title}
      ></HeroBlockLanding>
      <div className={styles.contentWrapper}>
        <div className={styles.TwoColumnGrid}>
          <SideNav menuData={sideMenuData} className={styles.SideNav}></SideNav>
          <div className={styles.PageContent}>
            <h1>{htmlSanitizeParse(post.frontmatter.title)}</h1>
            <MDXRenderer>{post.body}</MDXRenderer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;

export const pageQuery = graphql`
  query($slug: String!, $area: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    allMdx(
      filter: { frontmatter: { area: { eq: $area } } }
      sort: {
        order: [ASC, ASC]
        fields: [frontmatter___section, frontmatter___title]
      }
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
`;
