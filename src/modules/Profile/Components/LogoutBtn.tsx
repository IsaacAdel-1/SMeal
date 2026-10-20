
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function LogoutBtn() {
 const { t } = useTranslation();

  return (
    <Button
      variant="outline"
      className="h-12 w-full rounded-2xl bg-brand/10 border-brand/30 text-base font-bold text-brand hover:bg-brand/20 hover:text-brand"
    >
      <LogOut className="size-4" />
      {t("logout.button")}
    </Button>
  );
}
