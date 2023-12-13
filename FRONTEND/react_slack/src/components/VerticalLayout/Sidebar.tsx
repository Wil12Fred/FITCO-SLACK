import React from "react";
import { Link } from "react-router-dom";
import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/inicio" className="logo logo-dark">
            <span className="logo-lg">
            </span>
          </Link>
        </div>

        <div className="h-100">
          <SidebarContent />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
