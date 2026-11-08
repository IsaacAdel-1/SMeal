import { useTranslation } from "react-i18next";
import Navbar from "@/shared/components/Navbar";
import { AccountSettings } from "../Components/AccountSettings";
import { Details } from "../Components/Details";
import { LogoutBtn } from "../Components/LogoutBtn";
import { PreferencesCard } from "../Components/PreferencesAndAppearance";

export default function Profile() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <Navbar header={t("profile.header")} />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 sm:p-6">
        <Details />
        <AccountSettings />
        <PreferencesCard />
        <LogoutBtn />
      </div>
    </div>
  );
}
