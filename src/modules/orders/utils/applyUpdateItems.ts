import type { Participant } from "../types";
type EditableField = "name" | "quantity" | "unitPrice";


export const applyItemUpdate = (
  participants: Participant[],
  participantId: string,
  itemId: string,
  field: EditableField,
  value: string | number
): Participant[] =>
  participants.map((p) => {
    if (p.participantId !== participantId) return p;

    const items = p.items.map((item) => {
      if (item.orderItemId !== itemId) return item;
      const updated = { ...item, [field]: value };
      return { ...updated, total: updated.quantity * updated.unitPrice };
    });

    const foodAmount = items.reduce((sum, i) => sum + i.total, 0);

    return {
      ...p,
      items,
      foodAmount,
      totalAmount: foodAmount + p.deliveryShare,
    };
  });