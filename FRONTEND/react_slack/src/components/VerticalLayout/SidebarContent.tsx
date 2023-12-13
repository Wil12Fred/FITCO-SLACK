import React, { useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import useModal from "src/hooks/useModal";
import { useWorkspacesStore } from "src/hooks/useWorkspacesStore";
import { WorkspaceModal } from "./WorkspaceModal";

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
  const handle_get_workspaces = async () => {
    const data = await get_workspaces();
    if (!userData?.workspace && data.length) {
      set_workspace(userData, data[0]);
    }
    setWorkspaces(data);
  };
  return (
    <React.Fragment>
      <WorkspaceModal
        closeModalAddPerfil={closeModalAddWorkspace}
        isOpenModalAddPerfil={isOpenModalAddWorkspace}
        handle_get_workspaces={handle_get_workspaces}
      />
    </React.Fragment>
  );
};

export default withRouter(SidebarContent);
