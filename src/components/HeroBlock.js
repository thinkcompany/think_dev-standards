import React from "react";
import styles from "../styles/HeroBlock.module.scss";

const HeroBlock = ({ title, body, overlayOpacity, backgroundImage }) => (
  <div
    className={styles.heroContainer}
    style={{
      background: `linear-gradient(to right, rgba(0, 0, 0, ${overlayOpacity}), rgba(0, 0, 0, ${overlayOpacity})) ,url(${backgroundImage})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "500px",
    }}
  >
    <div className={styles.heroContainerContent}>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  </div>
);

export default HeroBlock;
