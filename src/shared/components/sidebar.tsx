import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LogOut } from "lucide-react";
import Logo from "../../assets/images/sm_logo.png";
import { sidebarItems } from "../../constants/sidebarItems";
import { useAuth } from "@/modules/auth/context/AuthContext";
import { getInitials } from "@/modules/auth/utils/user";

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-72 flex-col justify-between overflow-y-auto border-e border-border bg-surface p-4 lg:w-75">
      <div>
        <header className="flex gap-2">
          <img src={Logo} alt="" className="h-12 w-12" />
          <div>
            <p className="text-xl font-semibold text-foreground">sMeal</p>
            <p className="text-[12px] text-muted-foreground">{t("sidebar.workspace")}</p>
          </div>
        </header>

        <div className="my-7 h-px w-full bg-surface-raised" />

        <nav>
          <ul className="flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.path}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-2xl p-2 font-semibold ${
                      isActive
                        ? "bg-linear-to-r from-brand to-brand-strong text-white rtl:bg-linear-to-l"
                        : "text-muted-foreground hover:bg-surface-raised hover:text-foreground"
                    }`
                  }
                >
                  <item.icon size={27} />
                  <span>{t(`sidebar.items.${item.key}`)}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-6 flex items-center gap-2 text-foreground">
        <p className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-2xl font-semibold text-white">
          {getInitials(user)}
        </p>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="truncate text-[12px] text-info">{user?.email}</p>
        </div>

        <button
          type="button"
          aria-label={t("sidebar.logout")}
          title={t("sidebar.logout")}
          className="rounded-lg p-1 text-brand hover:bg-brand/10"
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
          }}
        >
          <LogOut className="size-6 rtl:-scale-x-100" />
        </button>
      </div>
    </div>
  );
}
