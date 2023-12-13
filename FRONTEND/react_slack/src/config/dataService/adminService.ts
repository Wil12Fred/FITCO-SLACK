import axios from "axios";
import { IApiRoute } from "src/utility/apiRoutes";
import { adminHeader, admin_endpoint } from "./dataService";

export const admin_service = axios.create({
  baseURL: admin_endpoint,
  headers: {
    "Content-Type": "application/json",
    "account": process.env.REACT_APP_ACCOUNT,
  },
});

class AdminService {
  static get<T>(APIRoute: IApiRoute, optionalHeader = {}) {
    return admin_service.get<T>(APIRoute.route, {
      headers: { ...adminHeader(), ...optionalHeader },
    });
  }

  static post<T>(APIRoute: IApiRoute, data = {}, optionalHeader = {}) {
    const headers = { ...adminHeader(), ...optionalHeader };
    return admin_service.post<T>(APIRoute.route, data, {
      headers,
    });
  }

  static postFormData<T>(APIRoute: IApiRoute, data = {}, optionalHeader = {}) {
    return admin_service.post<T>(APIRoute.route, data, {
      headers: { ...adminHeader(), ...optionalHeader },
    });
  }

  static patch<T>(APIRoute: IApiRoute, data = {}) {
    return admin_service.patch<T>(APIRoute.route, JSON.stringify(data), {
      headers: { ...adminHeader() },
    });
  }

  static put<T>(APIRoute: IApiRoute, data = {}, optionalHeader = {}) {
    return admin_service.put<T>(APIRoute.route, JSON.stringify(data), {
      headers: { ...adminHeader(), ...optionalHeader },
    });
  }

  static normalPut<T>(APIRoute: IApiRoute, data = {}) {
    return admin_service.put<T>(APIRoute.route, data, {
      headers: { ...adminHeader() },
    });
  }

  static headersPut<T>(APIRoute: IApiRoute, data = {}, optionalHeader = {}) {
    return admin_service.put<T>(APIRoute.route, data, {
      headers: { ...adminHeader(), ...optionalHeader },
    });
  }

  static delete<T>(APIRoute: IApiRoute) {
    return admin_service.delete<T>(APIRoute.route, {
      headers: { ...adminHeader() },
    });
  }
}

admin_service.interceptors.response.use(
  response => response,
  error => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status === 500) {
        // do something here
      } else {
        return originalRequest;
      }
    }
    return Promise.reject(error);
  }
);

export { AdminService };
