import React from "react";
import { Link, graphql } from "gatsby";
import styles from "../styles/Blog.module.scss";
import heroImage from "../../content/assets/blog-hero.jpg";
import HeroBlockLanding from "../components/HeroBlockLanding";
import Layout from "../components/layout";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMdx.edges;

    return (
      <Layout title={siteTitle}>
        <HeroBlockLanding
          overlayOpacity="0.3"
          backgroundImage={heroImage}
          title={"Blog"}
        ></HeroBlockLanding>
        <div className={styles.contentWrapper}>
          <div className={styles.CardsGrid}>
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <article key={node.fields.slug} className="articleContainer">
                  <header>
                    <h3>
                      <Link to={node.fields.slug}>{title}</Link>
                    </h3>
                    <small>{node.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </section>
                  <hr />
                </article>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { area: { eq: "Blog" } } }
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
            description
          }
        }
      }
    }
  }
`;
