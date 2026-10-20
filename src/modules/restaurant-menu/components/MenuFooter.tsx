
import {
  CheckCheck,
  Flag,
  PlusCircle,
  ShoppingBag,
  Truck,
  UserPlus,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ActiveSessionType } from "@/modules/home/types";
import type { SessionAction } from "../services/sessionAction.service";

interface MenuFooterProps {
  itemsCount: number;
  total: number;
  session?: ActiveSessionType;
  sessionLoading: boolean;
  onCreateSession: () => void;
  onJoinSession: () => void;
  onSessionAction: (action: SessionAction) => void;
  disabled?: boolean;
  busy?: boolean;
}

const RED =
  "from-brand to-brand-strong shadow-[0_8px_24px_rgba(255,59,48,0.35)]";
const GREEN =
  "from-success to-success shadow-[0_8px_24px_rgba(52,199,89,0.35)]";
const BLUE =
  "from-info to-info shadow-[0_8px_24px_rgba(10,132,255,0.35)]";

export default function MenuFooter({
  itemsCount,
  total,
  session,
  sessionLoading,
  onCreateSession,
  onJoinSession,
  onSessionAction,
  disabled = false,
  busy = false,
}: MenuFooterProps) {
  const { t } = useTranslation();

  const getAction = () => {
    if (!session) {
      return {
        label: t("session.actions.create"),
        icon: PlusCircle,
        onClick: onCreateSession,
        style: RED,
      };
    }

    if (!session.currentUserIsOwner) {
      if (session.status !== 0) return null;

      return {
        label: t("session.actions.join"),
        icon: UserPlus,
        onClick: onJoinSession,
        style: BLUE,
      };
    }

    if (session.status === 0) {
      return {
        label: t("session.actions.close"),
        icon: CheckCheck,
        onClick: () => onSessionAction("close"),
        style: GREEN,
      };
    }

    if (session.status === 1) {
      return {
        label: t("session.actions.placeOrder"),
        icon: ShoppingBag,
        onClick: () => onSessionAction("order"),
        style: GREEN,
      };
    }

    if (session.status === 2) {
      return {
        label: t("session.actions.markArrived"),
        icon: Truck,
        onClick: () => onSessionAction("arrive"),
        style: GREEN,
      };
    }

    if (session.status === 3) {
      return {
        label: t("session.actions.end"),
        icon: Flag,
        onClick: () => onSessionAction("end"),
        style: RED,
      };
    }

    return null;
  };

  const action = getAction();
  const Icon = action?.icon;

  const showCancel = session?.currentUserIsOwner;
  const showReopen = session?.currentUserIsOwner && session.status === 1;

  const sideButton =
    "rounded-2xl border border-border bg-surface-control px-4 py-3 text-sm font-semibold text-foreground disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex items-center justify-between gap-4 border-t border-border bg-surface p-4 sm:px-8 sm:py-5">
      <div className="flex min-w-0 items-center gap-3 text-sm sm:gap-4">
        <span className="truncate text-muted-foreground">
          {t("footer.itemsSelected", { count: itemsCount })}
        </span>

        <span className="size-1 shrink-0 rounded-full bg-surface-control" />

        <span className="shrink-0 font-bold text-foreground">
          {t("footer.totalPrice", { total: total.toFixed(2) })}
        </span>
      </div>

      {!sessionLoading && (
        <div className="flex items-center gap-2">
          {showReopen && (
            <button
              type="button"
              disabled={busy}
              onClick={() => onSessionAction("open")}
              className={sideButton}
            >
              {t("session.actions.reopen")}
            </button>
          )}

          {showCancel && (
            <button
              type="button"
              disabled={busy}
              onClick={() => onSessionAction("cancel")}
              className={sideButton}
            >
              {t("session.actions.cancel")}
            </button>
          )}

          {action && Icon && (
            <button
              type="button"
              onClick={action.onClick}
              disabled={disabled}
              className={`flex shrink-0 items-center gap-2 rounded-2xl bg-linear-to-r px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-4 ${action.style}`}
            >
              <Icon className="size-4" />
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
