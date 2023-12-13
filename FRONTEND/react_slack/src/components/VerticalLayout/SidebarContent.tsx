import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import useModal from "src/hooks/useModal";
import SimpleBar from "simplebar-react";
import classNames from "classnames";
import Icon from "@ailibs/feather-react-ts";
import { useWorkspacesStore } from "src/hooks/useWorkspacesStore";
import { WorkspaceModal } from "./WorkspaceModal";
import { menuItems } from "./Menu";

const NewRouteAdd = () => {
  return (
    <span className="badge rounded-pill bg-danger float-end">novidade</span>
  );
};

const MenuItem = ({ item, subitems, onClickLinkAction, props }: any) => {
  if (subitems) {
    item["subItems"] = subitems;
  }
  const hasChildren = item["subItems"] && item["subItems"].length;
  const hasExtra = item["novidade"];
  const arrowclass = item["label"] == "Authentication" ? true : false;
  return (
    <li>
      <Link
        to='/inicio'
        onClick={() => onClickLinkAction(item)}
        key={item.id}
        className={classNames(
          { "has-arrow": hasChildren && !hasExtra && !arrowclass },
          { "waves-effect": hasChildren }
        )}
      >
        {item["icon"] && <Icon name={item["icon"]} className="icon nav-icon color-primary" />}
        {hasExtra && <NewRouteAdd />}
        <span className="menu-item">{item["label"]}</span>
        {item.badge && (
          <span className={"badge rounded-pill " + item.badgecolor}>
            {item.badge}
          </span>
        )}
      </Link>
      {hasChildren && <Menu item={item} onClickLinkAction={onClickLinkAction} props={props} />}
    </li>
  );
};

const Menu = ({ item, onClickLinkAction, props }: any) => {
  const menuItems = item["subItems"] && item["subItems"];
  return (
    <ul className="sub-menu">
      {(menuItems || []).map((item: any, key: number) => (
        <MenuItem item={item} onClickLinkAction={onClickLinkAction} key={key} props={props} />
      ))}
    </ul>
  );
};

const SidebarContent = (props: any) => {
  const {
    userData,
  } = useSelector((state: any) => {
    return {
      userData: state.userData,
    }
  });
  const { get_workspaces, set_workspace } = useWorkspacesStore();
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [isOpenModalAddWorkspace, openModalAddWorkspace, closeModalAddWorkspace]: any = useModal(false);
  const ref = useRef<any>();
  const handle_get_workspaces = async () => {
    const data = await get_workspaces();
    if (!userData?.workspace && data.length) {
      set_workspace(userData, data[0]);
    }
    setWorkspaces(data);
  };
  useEffect(() => {
    handle_get_workspaces();
  }, []);
  useEffect(() => {
    ref.current.recalculate();
  }, []);
  const onClickLinkAction = (workspace: any) => {
    set_workspace(userData, { workspaceId: workspace.id, name: workspace.label });
  };
  return (
    <React.Fragment>
      <SimpleBar ref={ref} className="sidebar-menu-scroll" id="nav-scroll">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <MenuItem item={menuItems[0]} props={props} />
            <MenuItem item={menuItems[1]} onClickLinkAction={onClickLinkAction} subitems={workspaces.map((workspace: any) => (
              {
                id: workspace.workspaceId,
                label: workspace.name,
                link: `/inicio?workspace=${workspace.workspaceId}`,
                parentId: menuItems[1].id,
              }
            ))} props={props} />
            <li>
              <Button type="button" color="primary" onClick={openModalAddWorkspace}>
                <span className="menu-item">Crear Workspace</span>
              </Button>
            </li>
          </ul>
        </div>
      </SimpleBar>
      <WorkspaceModal
        closeModalAddPerfil={closeModalAddWorkspace}
        isOpenModalAddPerfil={isOpenModalAddWorkspace}
        handle_get_workspaces={handle_get_workspaces}
      />
    </React.Fragment>
  );
};

export default withRouter(SidebarContent);
