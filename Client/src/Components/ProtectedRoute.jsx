import { Navigate } from "react-router-dom";
import { isLoggedIn, clearToken } from "../Services/auth";

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    clearToken();
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
