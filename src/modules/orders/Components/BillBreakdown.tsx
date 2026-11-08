import { useTranslation } from "react-i18next";
import CalculatorIcon from "../../../assets/svgs/CalculatorIcon";
import type { OrderSession } from "../types";
import { getOrderTotals } from "../utils/orderTotals";

export default function BillBreakdown({ order }: { order: OrderSession }) {
  const { t } = useTranslation();
  const { subtotal, delivery, total } = getOrderTotals(order);
  const currency = t("common.currency");

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-4 text-card-foreground">
      <header className="mb-4 flex items-center justify-between gap-2 text-card-foreground">
        <p className="flex items-center gap-2">
          <CalculatorIcon className="size-5 text-brand" />
          {t("billBreakdown.title")}
        </p>
        <p className="truncate text-muted-foreground">{order.restaurantName}</p>
      </header>

      <div className="my-3 flex items-center justify-between">
        <p className="text-muted-foreground">{t("billBreakdown.itemsSubtotal")}</p>
        <p>
          {subtotal.toFixed(2)} {currency}
        </p>
      </div>

      <div className="my-3 flex items-center justify-between gap-2">
        <p className="text-muted-foreground">
          {t("billBreakdown.deliveryShare", { count: order.participantCount })}
        </p>
        <p className={delivery === null ? "text-sm text-muted-foreground" : ""}>
          {delivery === null ? t("billBreakdown.deliveryPending") : `${delivery.toFixed(2)} ${currency}`}
        </p>
      </div>

      <div className="h-px bg-border" />

      <div className="my-3 flex items-center justify-between font-bold">
        <p>{t("billBreakdown.totalAmount")}</p>
        <p className="text-success">
          {total.toFixed(2)} {currency}
        </p>
      </div>
    </div>
  );
}
