
import TrackingIcon from "../../../assets/svgs/TrackingIcon";
import { Check, Store, Bike } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { SessionItem } from "../types";

export default function OrderTrackingCard({
  myOrders,
}: {
  myOrders: SessionItem;
}) {
  const { t } = useTranslation();
  const status = myOrders.status;
  return (

    <>
      
      <div 
      key={myOrders.orderId || myOrders.sessionId}
      className="lg:w-120 max-w-120 p-6 bg-card text-card-foreground rounded-2xl border border-border mb-4"
      >
        <header className="flex items-center justify-between mb-6 gap-4">
          <p className="flex items-center text-card-foreground font-bold gap-2">
            <TrackingIcon className="text-brand" />
            {t("orderTracking.title")}
          </p>

          <p className="text-success">
            {t("orderTracking.placedStatus")}
          </p>
        </header>

        <div className="flex items-center">
          <span
            className={`bg-success
              rounded-full w-8.5 h-8.5 flex justify-center items-center`}
              >
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
          <p className="text-card-foreground">
            {t("orderTracking.submitted")}
          </p>
          <p className="text-card-foreground">
            {t("orderTracking.restaurant")}
          </p>
          <p className="text-card-foreground">
            {t("orderTracking.arrived")}
          </p>
        </div>
      </div>
        
      
      
    </>
  );
}
