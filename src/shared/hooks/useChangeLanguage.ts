import { useTranslation } from "react-i18next";
import { useAuth } from "@/modules/auth/context/AuthContext";
import { updateLanguage } from "@/modules/Profile/Services/profile.service";

export type AppLanguage = "en" | "ar";

/** Switches the UI language and saves the preference on the server when signed in. */
export default function useChangeLanguage() {
  const { i18n } = useTranslation();
  const { isAuthenticated } = useAuth();
  const language: AppLanguage = (i18n.resolvedLanguage ?? i18n.language)?.startsWith("ar") ? "ar" : "en";

  const changeLanguage = (next: AppLanguage) => {
    if (next === language) return;
    void i18n.changeLanguage(next);
    // The preference only affects server messages/notifications; a failure is not worth an error toast.
    if (isAuthenticated) updateLanguage(next).catch(() => undefined);
  };

  const toggleLanguage = () => changeLanguage(language === "ar" ? "en" : "ar");

  return { language, changeLanguage, toggleLanguage };
}
