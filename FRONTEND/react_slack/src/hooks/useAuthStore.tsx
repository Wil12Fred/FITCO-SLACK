import { useDispatch } from "react-redux";
import { AuthService } from "src/config/dataService/authService";
import { ApiRoutes } from "src/utility/apiRoutes";
import { removeItem, setItem } from "src/utility/localStorageControl";
import { on_user_data_begin, on_user_data_success } from "src/slices/userData/actionCreator";
import {
  on_login_begin,
  on_login_err,
  on_login_success,
  on_logout_success,
  on_logout_begin,
} from "src/slices/authentication/actionCreator";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const register = async(data: any) => {
    const optional_header = {
      account: process.env.REACT_APP_ACCOUNT,
    };
    try {
      await AuthService.post<any>(
        ApiRoutes.createAPIRoute(ApiRoutes.auth.user),
        data,
        optional_header
      );
      start_login({
        grant_type: "password",
        username: data.username,
        password: data.password,
      })
    } catch (error) {
      console.log("Ha surgido un error. Porfavor intentelo de nuevo");
    }
  };

  const start_login = async (data: any) => {
    dispatch(on_login_begin());
    dispatch(on_user_data_begin());

    const optional_header = {
      account: process.env.REACT_APP_ACCOUNT,
    };

    try {
      const response = await AuthService.post<any>(
        ApiRoutes.createAPIRoute(ApiRoutes.auth.authLogin),
        data,
        optional_header
      );
      const { token, user } = response.data;
      if (!token) {
        return dispatch(on_login_err("No son las credenciales"));
      }
      setItem("access_token", token.accessToken);
      setItem("userId", user.userId);
      dispatch(on_user_data_success(response.data.user));
      dispatch(on_login_success());
    } catch (error) {
      console.log("Ha surgido un error. Porfavor intentelo de nuevo");
      return dispatch(on_login_err("Ha surgido un error. Porfavor intentelo de nuevo"));
    }
  };

  const start_logout = () => {
    dispatch(on_logout_begin());
    try {
      removeItem("access_token");
      dispatch(
        on_user_data_success({
          name: "User",
          lastname: "",
        })
      );
      dispatch(on_logout_success());
    } catch (error) {
      console.log("Ha surgido un error. Porfavor intentelo de nuevo");
    }
  };

  return { start_login, start_logout, register };
};
