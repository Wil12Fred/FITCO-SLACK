import { Redirect } from "react-router-dom";
import * as Authentication from "src/pages/Authentication";
import * as Initial from "src/pages/Initial";

interface RouteProps {
  path: string;
  component: any;
  exact?: boolean;
}

const user_routes: Array<RouteProps> = [
  { path: "/inicio", component: Initial.Initial },
  {
    path: "/",
    exact: true,
    component: function component() {
      return <Redirect to="/inicio" />;
    },
  },
];

const auth_routes: Array<RouteProps> = [
  { path: "/login", component: Authentication.login },
];

export { user_routes, auth_routes };
