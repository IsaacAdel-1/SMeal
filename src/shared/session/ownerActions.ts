import { CheckCheck, Flag, Receipt, ShoppingBag, Truck, type LucideIcon } from "lucide-react";
import { SessionStatus } from "./sessionStatus";

export type SessionAction = "close" | "open" | "order" | "arrive" | "end" | "cancel";

export const ACTION_STYLES = {
  red: "from-brand to-brand-strong shadow-[0_8px_24px_rgba(255,59,48,0.35)]",
  green: "from-success to-success shadow-[0_8px_24px_rgba(52,199,89,0.35)]",
  blue: "from-info to-info shadow-[0_8px_24px_rgba(10,132,255,0.35)]",
} as const;

export type OwnerStep = {
  /** A session endpoint to call, or "invoice" to open the invoice page. */
  action: SessionAction | "invoice";
  labelKey: string;
  icon: LucideIcon;
  style: string;
};

/** The next step the session owner has to take for a session in `status`. */
export function getOwnerStep(status: number): OwnerStep | null {
  switch (status) {
    case SessionStatus.Open:
      return { action: "close", labelKey: "session.actions.close", icon: CheckCheck, style: ACTION_STYLES.red };
    case SessionStatus.Closed:
      return { action: "order", labelKey: "session.actions.placeOrder", icon: ShoppingBag, style: ACTION_STYLES.green };
    case SessionStatus.Ordered:
      return { action: "arrive", labelKey: "session.actions.markArrived", icon: Truck, style: ACTION_STYLES.green };
    case SessionStatus.Arrived:
      return { action: "invoice", labelKey: "session.actions.invoice", icon: Receipt, style: ACTION_STYLES.green };
    case SessionStatus.InvoiceReady:
      return { action: "invoice", labelKey: "session.actions.reviewInvoice", icon: Flag, style: ACTION_STYLES.red };
    default:
      return null;
  }
}

/** The owner can cancel until the food has arrived. */
export const canCancelSession = (status: number) => status <= SessionStatus.Ordered;

/** Actions that cannot be undone ask for confirmation first. */
export const needsConfirmation = (action: SessionAction) => action === "cancel" || action === "end";

export const invoicePath = (sessionId: string) => `/orders/${sessionId}/invoice`;
