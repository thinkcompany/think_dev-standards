import React from "react";
import { Link } from "gatsby";
import styles from "../styles/SideNav.module.scss";

const SideNav = ({ menuData }) => {
  //Creates an array of all the sections from the frontmatter
  const sections = menuData.map(({ node }) => {
    return node.frontmatter.section;
  });

  //Removes the duplicates of the sections array
  let newSections = [...new Set(sections)];
  console.log(newSections);

  return (
    <div className={styles.navContainer}>
      {newSections.map((section) => {
        return (
          <div key={section}>
            <h4>{section}</h4>
            <ul key={section} className={styles.navList}>
              {menuData
                .filter((post) => post.node.frontmatter.section === section)
                .map(({ node: post }) => {
                  return (
                    <li className={styles.navListItem} key={post.fields.slug}>
                      <Link
                        to={post.fields.slug}
                        className={styles.navListLink}
                        activeClassName={styles.isActive}
                        key={post.fields.slug}
                      >
                        <div className={styles.linkItem}>
                          {post.frontmatter.title}
                        </div>
                      </Link>
                    </li>
                  );
                })}
            </ul>
            <hr />
          </div>
        );
      })}
    </div> //end of navContainer
  ); //end of return
};

export default SideNav;
