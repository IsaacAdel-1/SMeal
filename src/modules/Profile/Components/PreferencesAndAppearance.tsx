import { Globe, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/ThemeContext";
import useChangeLanguage from "@/shared/hooks/useChangeLanguage";

export function PreferencesCard() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const { language, changeLanguage } = useChangeLanguage();

  const languageButton = (value: "en" | "ar", label: string) => (
    <button
      type="button"
      aria-pressed={language === value}
      onClick={() => changeLanguage(value)}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
        language === value ? "bg-brand text-white" : "text-foreground hover:bg-surface-raised"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h3 className="mb-4 text-sm font-bold text-muted-foreground">{t("preferences.title")}</h3>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="dark-mode"
          className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-border bg-surface-raised px-6 py-4"
        >
          <span className="flex items-center gap-4">
            <Moon className="size-5 fill-brand text-brand" />
            <span className="text-[15px] font-bold text-card-foreground">{t("preferences.darkMode")}</span>
          </span>
          <Switch id="dark-mode" checked={theme === "dark"} onCheckedChange={toggleTheme} />
        </label>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface-raised px-6 py-4">
          <span className="flex items-center gap-4">
            <Globe className="size-5 text-brand" />
            <span className="text-[15px] font-bold text-card-foreground">{t("preferences.appLanguage")}</span>
          </span>

          <div role="group" aria-label={t("preferences.appLanguage")} className="flex rounded-xl border border-border bg-surface-control p-1">
            {languageButton("en", "English")}
            {languageButton("ar", "العربية")}
          </div>
        </div>
      </div>
    </div>
  );
}
