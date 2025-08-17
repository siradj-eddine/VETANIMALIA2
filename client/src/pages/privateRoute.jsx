import { Navigate } from "react-router-dom";
import { useUser } from "../Context/userContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/not-authenticated" />;
}