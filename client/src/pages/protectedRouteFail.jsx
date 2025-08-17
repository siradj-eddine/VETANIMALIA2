import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

export default function ProtectedRouteFail({ children }) {
  const { isAuthenticated , loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/not-authenticated" replace />;
  }

  return children;
}
