import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/modules/auth/context/AuthContext";

export function LogoutBtn() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      onClick={() => {
        logout();
        navigate("/login", { replace: true });
      }}
      className="h-12 w-full rounded-2xl border-brand/30 bg-brand/10 text-base font-bold text-brand hover:bg-brand/20 hover:text-brand dark:border-brand/30 dark:bg-brand/10 dark:hover:bg-brand/20"
    >
      <LogOut className="size-4 rtl:-scale-x-100" />
      {t("logout.button")}
    </Button>
  );
}
