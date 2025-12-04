import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
import { useAuth } from "../AuthContext/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // <-- THIS FIXES YOUR ERROR

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
