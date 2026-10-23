import { Calendar, CheckCircle2, Receipt } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import useHistory from "../hooks/useHistory";


const isArabic = () => i18n.resolvedLanguage === "ar";

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString(
    isArabic() ? "ar-EG-u-nu-latn" : "en-GB",
    { day: "numeric", month: "short", year: "numeric" }
  );
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat(isArabic() ? "ar-EG-u-nu-latn" : "en-EG", {
    style: "currency",
    currency: "EGP",
  }).format(amount);
}

export default function MapingOrders() {
  const { t } = useTranslation();
  const { data: pastOrders, isLoading, error, refetch } = useHistory();
  const Orders = pastOrders?.data?.items ?? [];
  if (Orders.length === 0) return <p className="text-2xl mt-6">{t("history.empty")}</p>;
  if (isLoading) return <p>{t("history.loading")}</p>;
  if (error) {
  return (
    <div>
      <p className="text-destructive">{error.message}</p>
      <button onClick={() => refetch()}>{t("history.retry")}</button>
    </div>
  );
}
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
      {pastOrders?.data?.items?.map((i: any) => {
        return (
          <div
            key={i.orderId}
            className="w-full rounded-3xl border border-border bg-card p-6 flex flex-col gap-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-card-foreground">{i.restaurantName}</h3>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(i.startedAt)} • {t("history.host")}:{" "}
                  {i.isHost ? t("history.you") : <bdi>{i.ownerName}</bdi>}
                </p>
              </div>

              <span className="flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold whitespace-nowrap">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="rounded-xl border border-border bg-surface-raised p-4 flex flex-col gap-2">
              {i.items.map((item: any) => (
                <div key={item.menuItemId} className="flex justify-between text-sm">
                  <span className="text-info">
                    {item.quantity}× {item.menuItemName}
                  </span>
                  <span className="font-semibold text-card-foreground">
                    {formatMoney(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">
                {t("history.inclDelivery", { amount: formatMoney(i.deliveryShare) })}
              </span>
              <span className="text-lg font-bold text-success">
                {/* {formatMoney(i.total)} */}
              </span>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-control py-3 text-sm font-semibold text-foreground hover:bg-surface-raised transition"
            >
              <Receipt className="w-4 h-4" />
              {t("history.viewReceipt")}
            </button>
          </div>
        );
      })}
    </div>
  );
}