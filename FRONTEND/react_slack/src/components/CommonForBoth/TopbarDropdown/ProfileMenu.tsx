import React, { useState, useEffect } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, Button, DropdownItem } from "reactstrap";
import { withRouter } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useAuthStore } from "src/hooks/useAuthStore";
import Icon from "@ailibs/feather-react-ts";

const ProfileMenu = ({ userData, props }: any) => {
  // class ProfileMenu extends React.Component{
  const { start_logout } = useAuthStore();
  const [menu, setMenu] = useState<boolean>(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const SignOut = (e: any) => {
    e.preventDefault();
    start_logout();
  };

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-none d-lg-flex">
        <div className="header-item user text-start d-flex align-items-center">
          <span className="me-3 d-none d-sm-block user-item-desc">
            <span className="user-name">{userData.data.name} {userData.data.lastname}</span>
          </span>
        </div>
        <DropdownToggle
          className="btn header-item user text-start d-flex align-items-center"
          id="page-header-user-dropdown"
          tag="div"
        >
          <div className="dropdown d-inline-block">
            <button type="button" className="btn header-item noti-icon right-bar-toggle p-0">
              <Icon name="chevron-down" className="icon-sm" />
            </button>
          </div>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end pt-0" dir="left">
          <DropdownItem tag="a" className="d-flex align-items-center" onClick={SignOut}>
            <i className="mdi mdi-cog-outline text-muted font-size-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withRouter(ProfileMenu);
