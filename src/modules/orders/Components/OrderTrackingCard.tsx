
import type { ActiveSessionType } from "@/modules/home/types";
import TrackingIcon from "../../../assets/svgs/TrackingIcon";
import { Check, Store, Bike } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function OrderTrackingCard({
  mySession,
}: {
  mySession: ActiveSessionType;
}) {
    const { t } = useTranslation();
    const status = mySession.status;

  return (
    <div className="lg:w-120 max-w-120 p-6 bg-card text-card-foreground rounded-2xl border border-border">
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
          className={`${
            status === 0
              ? "bg-linear-to-br from-brand to-brand-strong"
              : "bg-success"
          } rounded-full w-8.5 h-8.5 flex justify-center items-center`}
        >
          <Check className="text-white" />
        </span>

        <p className="flex-1 bg-surface-control h-px" />

        <span
          className={`${
            status === 0
              ? "bg-surface-raised"
              : status === 1
                ? "bg-linear-to-br from-brand to-brand-strong"
                : "bg-success"
          } rounded-full w-8.5 h-8.5 flex justify-center items-center`}
        >
          <Store className="text-white" />
        </span>

        <p className="flex-1 bg-surface-control h-px" />

        <span
          className={`${
            status === 2 ? "bg-success" : "bg-surface-raised"
          } rounded-full w-8.5 h-8.5 flex justify-center items-center`}
        >
          <Bike className="text-muted-foreground" />
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
  );
}
