import React from "react";
import styles from "../styles/404.module.scss";
import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not Found" />
    <div className={styles.contentWrapper}>
      <h1>Uh oh...we can't find that page</h1>
      <p>Let's get you back to the home page</p>
    </div>
  </Layout>
);

export default NotFoundPage;
