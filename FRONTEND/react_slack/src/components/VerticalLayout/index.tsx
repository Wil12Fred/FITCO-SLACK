import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: any;
}

const Layout = (props: LayoutProps) => {
  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header />
        <Sidebar
        />
        <div className="main-content">
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
