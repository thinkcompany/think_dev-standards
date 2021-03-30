import React from "react";
// import { Link } from "gatsby";
import HeaderBar from "./HeaderBar";
import Footer from "./Footer";

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <HeaderBar></HeaderBar>
        <main className="contentContainer">{children}</main>

        <Footer />
      </div>
    );
  }
}

export default Layout;
