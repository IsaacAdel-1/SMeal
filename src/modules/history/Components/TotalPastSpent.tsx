import { useTranslation } from "react-i18next";
import { formatMoney } from "@/lib/format";

export default function TotalPastSpent({ totalSpent, count }: { totalSpent: number; count: number }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap justify-between gap-4 rounded-2xl border border-success/30 bg-linear-135 from-success/10 to-transparent px-6 py-5 font-bold text-foreground rtl:bg-linear-225">
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground">{t("history.totalPastSpent")}</p>
        <p className="text-2xl text-success">{formatMoney(totalSpent)}</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">{t("history.completedOrders")}</p>
        <p className="text-2xl">{t("history.sessions", { count })}</p>
      </div>
    </div>
  );
}
