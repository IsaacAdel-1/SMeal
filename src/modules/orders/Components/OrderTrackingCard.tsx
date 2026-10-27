import { Check, Store, Bike } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OrderSession } from "../types";
import { formatDate } from "@/modules/history/Components/MapingOrders";
import { getSessionStatusLabel } from "../utils/sessionStatus";

export default function OrderTrackingCard({
  myOrders,
}: {
  myOrders: OrderSession;
}) {
  const { t } = useTranslation();
  const status = myOrders.status;

  return (
    <div className="w-full p-6 bg-card text-card-foreground rounded-2xl border border-border mb-4">
      <header className="flex items-center justify-between mb-6 gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {myOrders.logoUrl && (
            <img src={myOrders.logoUrl} alt="" className="size-12 rounded-xl object-cover" />
          )}
          <div className="min-w-0">
            <p className="truncate font-bold">{myOrders.restaurantName}</p>
            <p className="text-sm text-muted-foreground">{t("orderTracking.title")}</p>
          </div>
        </div>
        <span className="rounded-full bg-surface-raised px-3 py-1 text-sm font-semibold">
          {t(`sessionStatus.${status}`, { defaultValue: getSessionStatusLabel(status) })}
        </span>
      </header>

      <div className="mb-5 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
        <p>
          {t("orderTracking.owner")}: <bdi className="text-card-foreground">{myOrders.ownerName}</bdi>
        </p>
        <p>
          {t("orderTracking.participants")}: <bdi className="text-card-foreground">{myOrders.participantCount}</bdi>
        </p>
        <p>
          {t("orderTracking.started")}: <bdi className="text-card-foreground">{formatDate(myOrders.startedAt)}</bdi>
        </p>
        <p>
          {t("orderTracking.expectedClose")}: <bdi className="text-card-foreground">{formatDate(myOrders.expectedClosedAt)}</bdi>
        </p>
      </div>

      <div className="flex items-center">
        <span className="bg-success rounded-full w-8.5 h-8.5 flex justify-center items-center">
          <Check className="text-white" />
        </span>

        <p className="flex-1 bg-surface-control h-px" />

        <span
          className={`${
            status === 0
              ? "bg-surface-raised"
              : status === 2
              ? "bg-linear-to-br from-brand to-brand-strong"
              : "bg-success"
          } rounded-full w-8.5 h-8.5 flex justify-center items-center`}
        >
          <Store className="text-white" />
        </span>

        <p className="flex-1 bg-surface-control h-px" />

        <span
          className={`${
            status === 3 ? "bg-success" : "bg-surface-raised"
          } rounded-full w-8.5 h-8.5 flex justify-center items-center`}
        >
          <Bike className={status >= 3 ? "text-white" : "text-muted-foreground"} />
        </span>
      </div>

      <div className="flex justify-between mt-2">
        <p className="text-card-foreground">{t("orderTracking.submitted")}</p>
        <p className="text-card-foreground">{t("orderTracking.restaurant")}</p>
        <p className="text-card-foreground">{t("orderTracking.arrived")}</p>
      </div>
    </div>
  );
}