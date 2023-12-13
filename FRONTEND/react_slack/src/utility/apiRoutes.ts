export interface IApiRoute {
  route: string;
}

export class ApiRoutes {

  public static auth = {
    authLogin: "auth/login",
    authLogout: "auth/logout",
    user: "users", 
    authMe: "users/me",
    getUsers: "users",
  };

  static createAPIRoute(endpoint: string): IApiRoute {
    return {
      route: `${endpoint}`,
    };
  }

  static createAPIRouteDetail(endpoint: string, id: string): IApiRoute {
    return {
      route: `${endpoint}/${id}`,
    };
  }

  static createAPIRouteAction(endpoint: string, id: string, action = ''): IApiRoute {
    return {
      route: `${endpoint}/${id}/${action}`,
    };
  }
}
