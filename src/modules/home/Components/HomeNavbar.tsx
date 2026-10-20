import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/context/AuthContext";

export type User = {
  id: number;
  fullName: string;
  role: "customer" | "admin" | "Organizer";
  isHost: boolean;
};

export const mockUser: User = {
  id: 1,
  fullName: "Ahmed Hassan",
  role: "Organizer",
  isHost: true,
};

export default function HomeNavbar() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const initialLetters = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="bg-surface px-7 py-4.5 text-foreground">
      <div className="flex gap-2">
        <p className="bg-brand h-12 w-12 flex justify-center items-center text-2xl font-semibold rounded-2xl">
          {initialLetters}
        </p>

        <div>
          <p>
            {user?.firstName} {user?.lastName}
          </p>
          <div className="flex gap-4">
            <p
              className={`px-4 rounded-2xl flex justify-center font-bold text-[12px] ${
                mockUser.role === "Organizer" ? "bg-brand text-white" : ""
              }`}
            >
              {t(`homeNavbar.roles.${mockUser.role}`)}
            </p>
            {mockUser.isHost && (
              <p className="text-muted-foreground text-sm">{t("homeNavbar.sessionHost")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}