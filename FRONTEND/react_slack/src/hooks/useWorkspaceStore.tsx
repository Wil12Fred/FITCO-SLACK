import { useState } from "react";
import { useDispatch } from "react-redux";
import { AdminService } from "src/config/dataService/adminService";
import { ApiRoutes } from "src/utility/apiRoutes";

export const useWorkspaceStore = () => {
  const [workspace, setWorkspace] = useState<any>({name: 'WORKSPACE'});

  const get_workspace = async (workspaceId?: number) => {
    if (!workspaceId) {
      return null;
    }
    try {
      const data = (await AdminService.get<any>(
        ApiRoutes.createAPIRouteDetail(ApiRoutes.admin.workspace, workspaceId.toString()),
      )).data;
      setWorkspace(data);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return { workspace, get_workspace };
};
