import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import styles from "../styles/HeaderBar.module.scss";
import icon from "../../content/assets/nav-logo.jpg";

function HeaderBar() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  return (
    <div className={styles.headerBarContainer}>
      <div className={styles.headerTitleContent}>
        <div className={styles.headerIcon}>
          <img src={icon} alt={icon} />
        </div>
        <h1 className={styles.header}>
          <Link to="/" className={styles.mainHeaderLink}>
            {site.siteMetadata.title}
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default HeaderBar;
