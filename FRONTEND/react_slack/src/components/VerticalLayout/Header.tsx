import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import { useSelector } from "react-redux";

const Header = ({ props }: any) => {
  const {
    userData,
  } = useSelector((state: any) => {
    return {
      userData: state.userData,
    }
  });

  console.log(userData);

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    }
    document.body.setAttribute("data-sidebar-size", "lg");
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <button
              onClick={() => {
                tToggle();
              }}
              type="button"
              className="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars"></i>
            </button>
            <div className="navbar-brand-box">
              <Link to="/inicio" className="logo logo-dark">
                <span className="logo-sm">
                </span>
                <span className="logo-lg">
                </span>
              </Link>

              <Link to="/inicio" className="logo logo-light">
                <span className="logo-sm">
                </span>
                <span className="logo-lg">
                </span>
              </Link>
            </div>
          </div>
          <div className="d-flex">
            <ProfileMenu userData={userData} />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
