import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

interface AuthLayoutProps {
  component: any;
  layout: any;
  isAuthProtected: any;
  path?: string;
  exact?: boolean;
  key?: number;
  socket?: any;
}

const Authmiddleware = ({
  component,
  layout,
  isAuthProtected,
  path,
  exact,
  key,
  socket,
  ...rest
}: AuthLayoutProps) => {
  const { isLoggedIn } = useSelector((state: any) => {
    return {
      isLoggedIn: state.auth.login,
    };
  });
  const Layout = layout;
  const Component = component;

  return (
    <Route
      render={(props: any) => {
        if (isAuthProtected && !isLoggedIn) {
          return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
        }
        if (!isAuthProtected && isLoggedIn) {
          return <Redirect to={{ pathname: "/inicio", state: { from: props.location } }} />;
        }
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default Authmiddleware;
