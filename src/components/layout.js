import React from "react";
import HeaderBar from "./HeaderBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <HeaderBar></HeaderBar>
      <main className="contentContainer">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
