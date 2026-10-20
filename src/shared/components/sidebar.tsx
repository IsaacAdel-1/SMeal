import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/images/sm_logo.png";
import { sidebarItems } from "../../constants/sidebarItems";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/modules/auth/context/AuthContext";
import Cookies from "js-cookie";
export type User = {
  id: number;
  fullName: string;
  role: "customer" | "admin" | "chef";
};

export const mockUser: User = {
  id: 1,
  fullName: "Ahmed Hassan",
  role: "customer",
};

export default function Sidebar() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const raw = Cookies.get("user");
  const user = raw ? JSON.parse(raw) : null;
  const navigate = useNavigate();

  const initialLetters = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase();
  const [activeItem, setActiveItem] = useState(sidebarItems[0].key);

  return (
    <div className="bg-surface w-75 min-h-screen p-4 flex flex-col justify-between sticky top-0 bottom-0">
      <div>
        <header className="flex gap-2">
          <img src={Logo} alt="sMeal" className="w-12 h-12" />
          <div>
            <p className="text-foreground text-xl font-semibold">sMeal</p>
            <p className="text-muted-foreground text-[12px]">
              {t("sidebar.workspace")}
            </p>
          </div>
        </header>

        <div className="w-full bg-surface-raised h-px my-7" />

        <ul className="flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <li
              key={item.key}
              onClick={() => setActiveItem(item.key)}
              className={`text-muted-foreground font-semibold p-2 rounded-2xl ${
                activeItem === item.key
                  ? "bg-linear-to-r rtl:bg-linear-to-l from-brand to-brand-strong text-white"
                  : "hover:bg-surface-raised hover:text-foreground"
              }`}
            >
              <Link to={item.path} className="flex items-center gap-2">
                <item.icon size={27} />
                <p>{t(`sidebar.items.${item.key}`)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex text-foreground gap-2 items-center">
        <p className="bg-brand w-12 h-12 flex items-center justify-center text-2xl font-semibold rounded-2xl text-white">
          {initialLetters}
        </p>

        <div>
          <p className="font-semibold">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-info text-[12px]">
            {t(`sidebar.roles.${mockUser.role}`)}
          </p>
        </div>

        <LogOut
          aria-label={t("sidebar.logout")}
          className="size-6 text-brand cursor-pointer ms-8 rtl:-scale-x-100"
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
          }}
        />
      </div>
    </div>
  );
}