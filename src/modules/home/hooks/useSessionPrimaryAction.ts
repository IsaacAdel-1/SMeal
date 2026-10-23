import {
  CheckCheck,
  Flag,
  PlusCircle,
  ShoppingBag,
  Truck,
  UserPlus,
  Receipt,
} from "lucide-react";
import type { TFunction } from "i18next";
import type { ActiveSessionType } from "@/modules/home/types";
import type { SessionAction } from "@/modules/restaurant-menu/services/sessionAction.service";

export const RED =
  "from-brand to-brand-strong shadow-[0_8px_24px_rgba(255,59,48,0.35)]";
export const GREEN =
  "from-success to-success shadow-[0_8px_24px_rgba(52,199,89,0.35)]";
export const BLUE =
  "from-info to-info shadow-[0_8px_24px_rgba(10,132,255,0.35)]";

interface Params {
  t: TFunction;
  session?: ActiveSessionType;
  onCreateSession: () => void;
  onJoinSession: () => void;
  onSessionAction: (action: SessionAction) => void;
}

export const getAction = ({
  t,
  session,
  onCreateSession,
  onJoinSession,
  onSessionAction,
}: Params) => {
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
      style: RED,
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
      label: t("session.actions.invoice"),
      icon: Receipt,
      onClick: () => onSessionAction("invoice"),
      style: GREEN,
    };
  }

  if (session.status === 4) {
    return {
      label: t("session.actions.end"),
      icon: Flag,
      onClick: () => onSessionAction("end"),
      style: RED,
    };
  }
  return null;
};