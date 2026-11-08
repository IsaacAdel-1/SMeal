import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/modules/auth/context/AuthContext";
import { hasSession } from "@/modules/auth/utils/session";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !hasSession()) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }

  return <Outlet />;
}
