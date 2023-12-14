import { useDispatch } from "react-redux";
import { AdminService } from "src/config/dataService/adminService";
import { AuthService } from "src/config/dataService/authService"
import { ApiRoutes } from "src/utility/apiRoutes";

export const useAdminStore = () => {
  const dispatch = useDispatch();

  const register = async(data: any) => {
    const optional_header = {
      account: process.env.REACT_APP_ACCOUNT,
    };
    try {
      const response = await AdminService.post<any>(
        ApiRoutes.createAPIRoute(ApiRoutes.admin.workspace),
        data,
        optional_header
      );
    } catch (error) {
      console.log("Ha surgido un error. Porfavor intentelo de nuevo");
    }
  };

  const registerChannel = async(data: any) => {
    const optional_header = {
      account: process.env.REACT_APP_ACCOUNT,
    };
    try {
      const response = await AdminService.post<any>(
        ApiRoutes.createAPIRoute(ApiRoutes.admin.channel),
        data,
        optional_header
      );
    } catch (error) {
      console.log("Ha surgido un error. Porfavor intentelo de nuevo");
    }
  };

  const sendMessage = async(channelId: number, data: any) => {
    const optional_header = {
      account: process.env.REACT_APP_ACCOUNT,
    };
    try {
      const response = await AdminService.post<any>(
        ApiRoutes.createAPIRouteAction(
          ApiRoutes.admin.channel,
          channelId.toString(),
          ApiRoutes.admin.message
        ),
        data,
        optional_header
      );
    } catch (error) {
      console.log("Ha surgido un error. Porfavor intentelo de nuevo");
      console.log(error);
    }
  };
  const registerUserToWorkspace = async(workspaceId: number, username: string) => {
    const optional_header = {
      account: process.env.REACT_APP_ACCOUNT,
    };
    try {
      const usersByUsername: any[] = (await AuthService.get<any>(
        ApiRoutes.createAPIRoute(
          ApiRoutes.auth.getUsers + `?username=${username}`,
        ),
        optional_header
      )).data;
      if (!usersByUsername.length) {
        throw new Error('user not foundd');
      }
      return (await AdminService.post<any>(
        ApiRoutes.createAPIRouteAction(
          ApiRoutes.admin.workspace,
          workspaceId.toString(),
          ApiRoutes.admin.user,
        ),
        {
          invitedUserId: usersByUsername[0].userId,
        },
        optional_header
      )).data;
    } catch (error) {
      console.log("Ha surgido un error. Porfavor intentelo de nuevo");
    }
  };
  return { register, registerChannel, sendMessage, registerUserToWorkspace };
};
