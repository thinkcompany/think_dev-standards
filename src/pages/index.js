import React from "react";
import { Link, graphql } from "gatsby";
import heroImage from "../../content/assets/home-hero.jpg";
import Layout from "../components/layout";
import styles from "../styles/HomePage.module.scss";
import HeroBlock from "../components/HeroBlock";

class HomePage extends React.Component {
  render() {
    return (
      <Layout>
        <HeroBlock
          backgroundImage={heroImage}
          imageHeight="600px"
          overlayOpacity="0"
        ></HeroBlock>
        <div className={styles.NavGrid}>
        <Link to="/accessibility/" className={styles.linkCard}>
            <div className={styles.LandingPageCard}>
              <div className={styles.iconContainer}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="compass"
                  className={styles.icon}
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M225.38 233.37c-12.5 12.5-12.5 32.76 0 45.25 12.49 12.5 32.76 12.5 45.25 0 12.5-12.5 12.5-32.76 0-45.25-12.5-12.49-32.76-12.49-45.25 0zM248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm126.14 148.05L308.17 300.4a31.938 31.938 0 0 1-15.77 15.77l-144.34 65.97c-16.65 7.61-33.81-9.55-26.2-26.2l65.98-144.35a31.938 31.938 0 0 1 15.77-15.77l144.34-65.97c16.65-7.6 33.8 9.55 26.19 26.2z"
                  ></path>
                </svg>
              </div>
              <h3>Accessibility</h3>
              <p>Essential to some, useful for all</p>
            </div>
          </Link>
          <Link to="/css/" className={styles.linkCard}>
            <div className={styles.LandingPageCard}>
              <div className={styles.iconContainer}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="compass"
                  className={styles.icon}
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M225.38 233.37c-12.5 12.5-12.5 32.76 0 45.25 12.49 12.5 32.76 12.5 45.25 0 12.5-12.5 12.5-32.76 0-45.25-12.5-12.49-32.76-12.49-45.25 0zM248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm126.14 148.05L308.17 300.4a31.938 31.938 0 0 1-15.77 15.77l-144.34 65.97c-16.65 7.61-33.81-9.55-26.2-26.2l65.98-144.35a31.938 31.938 0 0 1 15.77-15.77l144.34-65.97c16.65-7.6 33.8 9.55 26.19 26.2z"
                  ></path>
                </svg>
              </div>
              <h3>CSS</h3>
              <p>Stylesheet structure and naming conventions</p>
            </div>
          </Link>
          <Link to="/automated-testing/" className={styles.linkCard}>
            <div className={styles.LandingPageCard}>
              <div className={styles.iconContainer}>
              <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="feather"
                  className={styles.icon}
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M467.14 44.84c-62.55-62.48-161.67-64.78-252.28 25.73-78.61 78.52-60.98 60.92-85.75 85.66-60.46 60.39-70.39 150.83-63.64 211.17l178.44-178.25c6.26-6.25 16.4-6.25 22.65 0s6.25 16.38 0 22.63L7.04 471.03c-9.38 9.37-9.38 24.57 0 33.94 9.38 9.37 24.6 9.37 33.98 0l66.1-66.03C159.42 454.65 279 457.11 353.95 384h-98.19l147.57-49.14c49.99-49.93 36.38-36.18 46.31-46.86h-97.78l131.54-43.8c45.44-74.46 34.31-148.84-16.26-199.36z"
                  ></path>
                </svg>
              </div>
              <h3>Automated Testing</h3>
              <p>Red, green, refactor, repeat</p>
            </div>
          </Link>
          <Link to="/get-started/overview/about/" className={styles.linkCard}>
            <div className={styles.LandingPageCard}>
              <div className={styles.iconContainer}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="compass"
                  className={styles.icon}
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M225.38 233.37c-12.5 12.5-12.5 32.76 0 45.25 12.49 12.5 32.76 12.5 45.25 0 12.5-12.5 12.5-32.76 0-45.25-12.5-12.49-32.76-12.49-45.25 0zM248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm126.14 148.05L308.17 300.4a31.938 31.938 0 0 1-15.77 15.77l-144.34 65.97c-16.65 7.61-33.81-9.55-26.2-26.2l65.98-144.35a31.938 31.938 0 0 1 15.77-15.77l144.34-65.97c16.65-7.6 33.8 9.55 26.19 26.2z"
                  ></path>
                </svg>
              </div>
              <h3>Get Started</h3>
              <p>Get up and running quickly</p>
            </div>
          </Link>
          <Link
            to="/ui-library/overview/accessibility/"
            className={styles.linkCard}
          >
            <div className={styles.LandingPageCard}>
              <div className={styles.iconContainer}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="layer-group"
                  className={styles.icon}
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M12.41 148.02l232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 0 0-21.29 0L12.41 107.98c-16.55 7.51-16.55 32.53 0 40.04zm487.18 88.28l-58.09-26.33-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 127.8l-57.87-26.23-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 337.87 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 404.1c16.55-7.5 16.55-32.5 0-40z"
                  ></path>
                </svg>
              </div>
              <h3>UI Library</h3>
              <p>Styles, components, and patterns</p>
            </div>
          </Link>
          <Link to="/community/contribute/" className={styles.linkCard}>
            <div className={styles.LandingPageCard}>
              <div className={styles.iconContainer}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="comments"
                  className={styles.icon}
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"
                  ></path>
                </svg>
              </div>
              <h3>Community</h3>
              <p>Get involved and evolve the system</p>
            </div>
          </Link>
        </div>
      </Layout>
    );
  }
}

export default HomePage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    getstarted: allMdx(
      filter: {
        frontmatter: { area: { eq: "home" }, section: { eq: "get-started" } }
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
    community: allMdx(
      filter: {
        frontmatter: { area: { eq: "home" }, section: { eq: "community" } }
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
