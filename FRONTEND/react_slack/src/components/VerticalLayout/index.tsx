import React, { useEffect } from "react";
import {
  changeSidebarType,
} from "src/slices/thunks";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";

interface LayoutProps {
  children: any;
}

const Layout = (props: LayoutProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeSidebarType("md"));
  }, []);

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
