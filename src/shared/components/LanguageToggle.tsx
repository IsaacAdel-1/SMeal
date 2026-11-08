import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import useChangeLanguage from "../hooks/useChangeLanguage";

export default function LanguageToggle({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useChangeLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t("preferences.switchLanguage")}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-foreground hover:bg-surface-raised",
        className,
      )}
    >
      <Globe className="size-4 text-brand" />
      {language === "ar" ? "English" : "العربية"}
    </button>
  );
}
