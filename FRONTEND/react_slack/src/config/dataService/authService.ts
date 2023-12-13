import axios from "axios";
import { IApiRoute } from "src/utility/apiRoutes";
import { authHeader, auth_endpoint } from "./dataService";

export const auth_service = axios.create({
  baseURL: auth_endpoint,
  headers: {
    "Content-Type": "application/json",
    "account": process.env.REACT_APP_ACCOUNT,
  },
});

class AuthService {
  static get<T>(APIRoute: IApiRoute, optionalHeader = {}) {
    return auth_service.get<T>(APIRoute.route, {
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static post<T>(APIRoute: IApiRoute, data = {}, optionalHeader = {}) {
    const headers = { ...authHeader(), ...optionalHeader };
    return auth_service.post<T>(APIRoute.route, data, {
      headers,
    });
  }

  static postFormData<T>(APIRoute: IApiRoute, data = {}, optionalHeader = {}) {
    return auth_service.post<T>(APIRoute.route, data, {
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static patch<T>(APIRoute: IApiRoute, data = {}) {
    return auth_service.patch<T>(APIRoute.route, JSON.stringify(data), {
      headers: { ...authHeader() },
    });
  }

  static put<T>(APIRoute: IApiRoute, data = {}, optionalHeader = {}) {
    return auth_service.put<T>(APIRoute.route, JSON.stringify(data), {
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static normalPut<T>(APIRoute: IApiRoute, data = {}) {
    return auth_service.put<T>(APIRoute.route, data, {
      headers: { ...authHeader() },
    });
  }

  static headersPut<T>(APIRoute: IApiRoute, data = {}, optionalHeader = {}) {
    return auth_service.put<T>(APIRoute.route, data, {
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static delete<T>(APIRoute: IApiRoute) {
    return auth_service.delete<T>(APIRoute.route, {
      headers: { ...authHeader() },
    });
  }
}

auth_service.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status === 500) {
      } else {
        return originalRequest;
      }
    }
    return Promise.reject(error);
  }
);

export { AuthService };
