import { Navigate, Outlet, useLocation } from "react-router-dom";
import ClocheIcon from "../../../assets/svgs/ClocheIcon";
import AuthBranding from "../Components/AuthBranding";
import { useAuth } from "../context/AuthContext";
import LanguageToggle from "@/shared/components/LanguageToggle";

/** Pages a signed-in user has no reason to see. */
const GUEST_ONLY = ["/", "/login", "/signup"];

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  if (isAuthenticated && GUEST_ONLY.includes(pathname)) return <Navigate to="/home" replace />;

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      <div className="flex w-full max-w-260 overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
        <div className="hidden w-1/2 max-w-130 min-[800px]:flex">
          <AuthBranding />
        </div>

        <div className="relative w-full overflow-hidden px-6 text-foreground sm:px-10 min-[800px]:w-1/2">
          <div aria-hidden="true" className="absolute -end-5 -top-5 rounded-full bg-surface-raised p-5">
            <ClocheIcon className="h-25 w-25" />
          </div>

          <LanguageToggle className="relative z-10 mt-6" />

          <Outlet />
        </div>
      </div>
    </div>
  );
}
