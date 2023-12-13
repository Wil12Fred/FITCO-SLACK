import { useState } from "react";
import { useDispatch } from "react-redux";
import { AdminService } from "src/config/dataService/adminService";
import { ApiRoutes } from "src/utility/apiRoutes";
import { on_user_set_channel } from "src/slices/userData/actionCreator";

export const useWorkspaceStore = () => {
  const [workspace, setWorkspace] = useState<any>({ name: 'WORKSPACE' });
  const [channel, setChannel] = useState<any>({ name: 'CHANNEL' });
  const dispatch = useDispatch();

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
  const set_channel = async (currentState: any, channel: any) => {
    console.log(currentState, channel);
    dispatch(on_user_set_channel(currentState, channel));
    setChannel(channel);
  }
  return { workspace, get_workspace, set_channel, channel };
};
