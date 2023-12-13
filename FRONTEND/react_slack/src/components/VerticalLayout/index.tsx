import React from "react";

interface LayoutProps {
  children: any;
}
const Layout = (props: LayoutProps) => {
  return (
    <React.Fragment>
      <div id="layout-wrapper">
      </div>
    </React.Fragment>
  );
};

export default Layout;
