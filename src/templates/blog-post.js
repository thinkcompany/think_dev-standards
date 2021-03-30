import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styles from "../styles/BlogPost.module.scss";
import { MDXRenderer } from "gatsby-plugin-mdx";

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;
    let author = post.frontmatter.author;

    //If the author field is left blank in the frontmatter it defaults to "The Team"
    if (author === null) {
      author = "The Team";
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article className={styles.blogPostContainer}>
          <header>
            <h1>{post.frontmatter.title}</h1>
            <p className="blogPostDate">
              {author} | {post.frontmatter.date}
            </p>
            <hr />
          </header>
          <MDXRenderer>{post.body}</MDXRenderer>
          <hr />
        </article>

        <nav className={styles.nextPrevSection}>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link to={next.fields.slug} rel="next" className={styles.nextLink}>
              {next.frontmatter.title} →
            </Link>
          )}
        </nav>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        description
      }
    }
  }
`;
