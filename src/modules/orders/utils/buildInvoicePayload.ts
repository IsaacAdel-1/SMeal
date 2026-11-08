import type { InvoiceItem, InvoiceParticipant } from "../types";

export type UpdatedItem = {
  orderItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export type AddedItem = {
  orderId: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export type InvoicePayload = {
  updatedItems: UpdatedItem[];
  removedOrderItemIds: string[];
  addedItems: AddedItem[];
};

/** An invoice row being edited; `key` is stable even for rows without an order item id. */
export type EditableItem = InvoiceItem & { key: string; orderId: string };

export type EditableParticipant = Omit<InvoiceParticipant, "items"> & { items: EditableItem[] };

export function toEditable(participants: InvoiceParticipant[]): EditableParticipant[] {
  return participants.map((p) => ({
    ...p,
    items: (p.items ?? []).map((item, index) => ({
      ...item,
      orderId: p.orderId,
      key: item.orderItemId ?? `${p.orderId}-unmatched-${index}`,
    })),
  }));
}

/** Diffs the edited invoice against the draft; returns null when nothing changed. */
export function buildInvoicePayload(
  original: EditableParticipant[],
  current: EditableParticipant[],
): InvoicePayload | null {
  const originalById = new Map<string, EditableItem>();
  original.forEach((p) => p.items.forEach((item) => item.orderItemId && originalById.set(item.orderItemId, item)));

  const updatedItems: UpdatedItem[] = [];
  const addedItems: AddedItem[] = [];
  const currentIds = new Set<string>();

  current.forEach((p) =>
    p.items.forEach((item) => {
      if (!item.orderItemId) {
        // Rows created in the editor have no id yet.
        if (item.key.startsWith("new-")) {
          addedItems.push({ orderId: p.orderId, name: item.name.trim(), quantity: item.quantity, unitPrice: item.unitPrice });
        }
        return;
      }
      currentIds.add(item.orderItemId);
      const old = originalById.get(item.orderItemId);
      if (old && (old.name !== item.name || old.quantity !== item.quantity || old.unitPrice !== item.unitPrice)) {
        updatedItems.push({
          orderItemId: item.orderItemId,
          name: item.name.trim(),
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        });
      }
    }),
  );

  const removedOrderItemIds = [...originalById.keys()].filter((id) => !currentIds.has(id));

  if (!updatedItems.length && !addedItems.length && !removedOrderItemIds.length) return null;
  return { updatedItems, removedOrderItemIds, addedItems };
}

export const isValidItem = (item: Pick<InvoiceItem, "name" | "quantity" | "unitPrice">) =>
  item.name.trim().length > 0 &&
  Number.isFinite(item.quantity) &&
  item.quantity > 0 &&
  Number.isFinite(item.unitPrice) &&
  item.unitPrice >= 0;
