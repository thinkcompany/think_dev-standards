import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import getStartedHeroImage from "../../content/assets/get-started-hero.jpg";
import uiLibraryHeroImage from "../../content/assets/ui-library-hero.jpg";
import communityHeroImage from "../../content/assets/community-hero.jpg";
import contributingHeroImage from "../../content/assets/contributing-hero.jpg";
import styles from "../styles/LandingPage.module.scss";
import SideNav from "../components/SideNav";
import HeroBlockLanding from "../components/HeroBlockLanding";
import { MDXRenderer } from "gatsby-plugin-mdx";

class LandingPage extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const sideMenuData = data.allMdx.edges;
    const post = data.mdx;
    let heroImage;

    if (this.props.pageContext.title === "Get Started") {
      heroImage = getStartedHeroImage;
    } else if (this.props.pageContext.title === "UI Library") {
      heroImage = uiLibraryHeroImage;
    } else if (this.props.pageContext.title === "Community") {
      heroImage = communityHeroImage;
    } else if (this.props.pageContext.title === "Contributing Guide") {
      heroImage = contributingHeroImage;
    }

    return (
      <Layout title={siteTitle}>
        <HeroBlockLanding
          overlayOpacity="0.3"
          backgroundImage={heroImage}
          title={this.props.pageContext.title}
        ></HeroBlockLanding>
        <div className={styles.contentWrapper}>
          <div className={styles.TwoColumnGrid}>
            <SideNav
              menuData={sideMenuData}
              className={styles.SideNav}
            ></SideNav>
            <div className={styles.PageContent}>
              <h1
                dangerouslySetInnerHTML={{ __html: post.frontmatter.title }}
              />
              <MDXRenderer>{post.body}</MDXRenderer>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

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
