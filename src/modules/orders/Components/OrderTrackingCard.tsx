import { Bike, Check, Store, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OrderSession } from "../types";
import { formatDate } from "@/lib/format";
import { resolveAssetUrl } from "@/lib/utils";
import { SessionStatus } from "@/shared/session/sessionStatus";
import SessionStatusBadge from "@/shared/session/SessionStatusBadge";

type StepState = "done" | "current" | "pending";

const STEP_STYLES: Record<StepState, string> = {
  done: "bg-success text-white",
  current: "bg-linear-to-br from-brand to-brand-strong text-white",
  pending: "bg-surface-control text-muted-foreground",
};

function Step({ icon: Icon, state }: { icon: LucideIcon; state: StepState }) {
  return (
    <span className={`flex size-8.5 shrink-0 items-center justify-center rounded-full ${STEP_STYLES[state]}`}>
      <Icon className="size-4.5" />
    </span>
  );
}

const Line = ({ active }: { active: boolean }) => (
  <span className={`h-0.5 flex-1 ${active ? "bg-success" : "bg-surface-control"}`} />
);

export default function OrderTrackingCard({ myOrders }: { myOrders: OrderSession }) {
  const { t } = useTranslation();
  const { status } = myOrders;
  const logo = resolveAssetUrl(myOrders.logoUrl);

  const restaurantState: StepState =
    status > SessionStatus.Ordered ? "done" : status === SessionStatus.Ordered ? "current" : "pending";
  const arrivedState: StepState = status >= SessionStatus.Arrived ? "done" : "pending";

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6 text-start text-card-foreground">
      <header className="mb-6 flex items-center justify-between gap-4 pe-8">
        <div className="flex min-w-0 items-center gap-3">
          {logo && <img src={logo} alt="" className="size-12 shrink-0 rounded-xl object-cover" />}
          <div className="min-w-0">
            <p className="truncate font-bold">{myOrders.restaurantName}</p>
            <p className="text-sm text-muted-foreground">{t("orderTracking.title")}</p>
          </div>
        </div>
        <SessionStatusBadge status={status} />
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
          {t("orderTracking.expectedClose")}:{" "}
          <bdi className="text-card-foreground">{formatDate(myOrders.expectedClosedAt)}</bdi>
        </p>
      </div>

      <div className="flex items-center gap-1">
        <Step icon={Check} state="done" />
        <Line active={status >= SessionStatus.Ordered} />
        <Step icon={Store} state={restaurantState} />
        <Line active={status >= SessionStatus.Arrived} />
        <Step icon={Bike} state={arrivedState} />
      </div>

      <div className="mt-2 flex justify-between text-sm text-card-foreground">
        <p>{t("orderTracking.submitted")}</p>
        <p>{t("orderTracking.restaurant")}</p>
        <p>{t("orderTracking.arrived")}</p>
      </div>
    </div>
  );
}
