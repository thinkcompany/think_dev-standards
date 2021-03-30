import React from "react";
import { graphql } from "gatsby";
import styles from "../styles/404.module.scss";
import Layout from "../components/layout";
import SEO from "../components/seo";

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <div className={styles.contentWrapper}>
          <h1>Uh oh...we can't find that page</h1>
          <p>Let's get you back to the home page</p>
        </div>
      </Layout>
    );
  }
}

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
