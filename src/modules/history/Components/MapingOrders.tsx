import { Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OrderSession } from "@/modules/orders/types";
import { getOrderTotals } from "@/modules/orders/utils/orderTotals";
import { useAuth } from "@/modules/auth/context/AuthContext";
import SessionStatusBadge from "@/shared/session/SessionStatusBadge";
import { formatDate, formatMoney } from "@/lib/format";
import { sameId } from "@/lib/utils";
import ReceiptDialog from "./ReceiptDialog";

export default function MapingOrders({ orders }: { orders: OrderSession[] }) {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
      {orders.map((order) => {
        const { total, delivery } = getOrderTotals(order);
        const isHost = sameId(order.ownerId, user?.userId);

        return (
          <div key={order.orderId} className="flex w-full flex-col gap-5 rounded-3xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold text-card-foreground">{order.restaurantName}</h3>
                <p className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(order.startedAt)} • {t("history.host")}:{" "}
                  {isHost ? t("history.you") : <bdi>{order.ownerName}</bdi>}
                </p>
              </div>
              <SessionStatusBadge status={order.status} />
            </div>

            <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface-raised p-4">
              {(order.items ?? []).map((item) => (
                <div key={item.menuItemId} className="flex justify-between gap-2 text-sm">
                  <span className="text-info">
                    {item.quantity}× {item.menuItemName}
                  </span>
                  <span className="font-semibold text-card-foreground">{formatMoney(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">
                {delivery === null
                  ? t("billBreakdown.deliveryPending")
                  : t("history.inclDelivery", { amount: formatMoney(delivery) })}
              </span>
              <span className="text-lg font-bold text-success">{formatMoney(total)}</span>
            </div>

            <ReceiptDialog sessionId={order.sessionId} restaurantName={order.restaurantName} />
          </div>
        );
      })}
    </div>
  );
}
