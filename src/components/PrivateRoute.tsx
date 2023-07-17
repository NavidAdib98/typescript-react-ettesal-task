import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}
const PrivateRoute = ({ path, element }: PrivateRouteProps) => {
  const { keycloak } = useKeycloak();
  const isAuth = keycloak.authenticated;
  // console.log(isAuth);
  return isAuth ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
