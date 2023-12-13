import React from 'react';
import { Switch, BrowserRouter as Router } from "react-router-dom";
import NonAuthLayout from "./components/NonAuthLayout";
import { auth_routes } from './routes/allRoutes';
import Authmiddleware from './routes/middleware/Authmiddleware';

function App() {

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
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
