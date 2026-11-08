import { useTranslation } from "react-i18next";
import { useAuth } from "@/modules/auth/context/AuthContext";
import { getFullName, getInitials } from "@/modules/auth/utils/user";

export default function HomeNavbar({ isHost }: { isHost: boolean }) {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="border-b border-border bg-surface px-7 py-4.5 pe-16 text-foreground md:pe-7">
      <div className="flex items-center gap-3">
        <p className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-2xl font-semibold text-white">
          {getInitials(user)}
        </p>

        <div className="min-w-0">
          <p className="truncate font-semibold">
            {t("homeNavbar.greeting", { name: getFullName(user) })}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
            {isHost && (
              <span className="rounded-2xl bg-brand px-3 py-0.5 text-[12px] font-bold text-white">
                {t("homeNavbar.sessionHost")}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
