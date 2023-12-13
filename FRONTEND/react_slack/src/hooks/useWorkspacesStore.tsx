import { useState } from "react";
import { useDispatch } from "react-redux";
import { AdminService } from "src/config/dataService/adminService";
import { on_user_set_workspace } from "src/slices/userData/actionCreator";
import { ApiRoutes } from "src/utility/apiRoutes";

export const useWorkspacesStore = () => {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const dispatch = useDispatch();

  const get_workspace = async (workspaceId: number) => {
    try {
      const data = (await AdminService.get<any>(
        ApiRoutes.createAPIRouteDetail(ApiRoutes.admin.workspace, workspaceId.toString()),
      )).data;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const get_workspaces = async () => {
    try {
      const data = (await AdminService.get<any[]>(
        ApiRoutes.createAPIRoute(ApiRoutes.admin.workspace),
      )).data;
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const set_workspace = async (currentState: any, workspace: any) => {
    dispatch(on_user_set_workspace(currentState, workspace));
  }

  return { get_workspace, get_workspaces, set_workspace, workspaces };
};
