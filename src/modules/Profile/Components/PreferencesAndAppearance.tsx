
import { Globe, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

export function PreferencesCard() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h4 className="mb-4 text-sm font-bold text-muted-foreground">
        {t("preferences.title")}
      </h4>

      <div className="flex flex-col gap-3">
        {/* Dark Mode */}
        <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-raised px-6 py-4">
          <div className="flex items-center gap-4">
            <Moon className="size-5 fill-brand text-brand" />
            <span className="text-[15px] font-bold text-card-foreground">
              {t("preferences.darkMode")}
            </span>
          </div>

          <Switch
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
            className={`h-8 w-14 data-[state=checked]:bg-success data-[state=unchecked]:bg-surface-control [&>span]:size-7 ${i18n.language == "ar" ? "[&>span]:data-[state=checked]:-translate-x-7" :"[&>span]:data-[state=checked]:translate-x-6"}`}
          />
        </div>

        {/* App Language */}
        <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-raised px-6 py-4" 
          onClick={()=> i18n.changeLanguage(i18n.language === "ar" ? "en" :"ar")}
        >
          <div className="flex items-center gap-4">
            <Globe className="size-5 text-brand" />
            <span className="text-[15px] font-bold text-card-foreground">
              {t("preferences.appLanguage")}
            </span>
          </div>

          <span className="rounded-lg border border-border bg-surface-control px-4 py-2 text-foreground">
            {t("preferences.languageValue")}
          </span>
        </div>
      </div>
    </div>
  );
}
