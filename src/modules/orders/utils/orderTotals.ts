import type { OrderSession } from "../types";

export function getOrderTotals(order: Pick<OrderSession, "items" | "deliveryShare">) {
  const subtotal = (order.items ?? []).reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const delivery = order.deliveryShare ?? null;
  return { subtotal, delivery, total: subtotal + (delivery ?? 0) };
}
