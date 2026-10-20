import Navbar from "@/shared/components/Navbar";
import { AccountSettings } from "../Components/AccountSettings";
import { Details } from "../Components/Details";
import { LogoutBtn } from "../Components/LogoutBtn";
import { PreferencesCard } from "../Components/PreferencesAndAppearance";

export default function Profile() {
  return (
    <div className="flex flex-col gap-6 ">
        <Navbar header="Profile & Account Settings"/>
        <div className="p-6 flex flex-col gap-6">

            <Details/>
            <AccountSettings/>
            <PreferencesCard/>
            <LogoutBtn/>
        </div>
    </div>
  )
}
