import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import { routePaths } from "../Router/Router";
import Layout from "../Layout/Layout";

const PrivateRoute = ({ children }) => {
  const { authToken } = useAuth();

  return authToken ? <Layout>{children}</Layout> : <Navigate replace to={routePaths.SIGNIN} />;
};

export default PrivateRoute;
