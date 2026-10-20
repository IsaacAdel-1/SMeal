import { useTranslation } from "react-i18next";
import { formatMoney } from "./MapingOrders";

export default function TotalPastSpent() {
  const { t } = useTranslation();
  const totalPastSpent = 445;
  const completedOrders = 4;

  return (
    <div className="bg-linear-135 rtl:bg-linear-225 from-success/10 to-transparent border border-success/30 py-5 px-6 flex justify-between text-foreground rounded-2xl font-bold">
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground">{t("history.totalPastSpent")}</p>
        <p className="text-2xl text-success">{formatMoney(totalPastSpent)}</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">{t("history.completedOrders")}</p>
        <p className="text-2xl">{t("history.sessions", { count: completedOrders })}</p>
      </div>
    </div>
  );
}