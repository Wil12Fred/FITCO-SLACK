import React from 'react';
import { Switch, BrowserRouter as Router } from "react-router-dom";
import NonAuthLayout from "./components/NonAuthLayout";
import { auth_routes, user_routes } from './routes/allRoutes';
import Authmiddleware from './routes/middleware/Authmiddleware';
import VerticalLayout from "./components/VerticalLayout/";
import "./assets/scss/theme.scss";
import "./index.css";
import "./tailwind.css";

function App() {
  const layout = VerticalLayout;
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {auth_routes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {user_routes.map((route: any, idx: number) => (
            <Authmiddleware
              path={route.path}
              layout={layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
