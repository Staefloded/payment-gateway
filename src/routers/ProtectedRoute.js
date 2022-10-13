import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ auth, redirectPath = "/login", children }) => {
  if (!auth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
