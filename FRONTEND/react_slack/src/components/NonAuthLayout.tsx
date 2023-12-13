import React from "react";
import { withRouter } from "react-router-dom";

const NonAuthLayout = ({ children }: any) => {
  document.body.setAttribute("data-layout-mode", "light");
  return <React.Fragment>{children}</React.Fragment>;
};

export default withRouter(NonAuthLayout);