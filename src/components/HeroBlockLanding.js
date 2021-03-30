import React from "react";
import styles from "../styles/HeroBlock.module.scss";

export class HeroBlockLanding extends React.Component {
  render() {
    return (
      <div
        className={styles.heroContainer}
        style={{
          background: `linear-gradient(to right, rgba(0, 0, 0, ${this.props.overlayOpacity}), rgba(0, 0, 0, ${this.props.overlayOpacity})) ,url(${this.props.backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "300px",
        }}
      >
        <div className={styles.heroContainerContent}>
          <h1>{this.props.title}</h1>
          <p>{this.props.body}</p>
        </div>
      </div>
    );
  }
}

export default HeroBlockLanding;
