export type Item = {
  orderItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  isMatched: boolean;
};

export type Participant = {
  orderId: string;
  participantId: string;
  participantName: string;
  foodAmount: number;
  deliveryShare: number;
  totalAmount: number;
  isPaid: boolean;
  items: Item[];
};

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

export function buildInvoicePayload(
  initialParticipants: Participant[],
  participants: Participant[],
): InvoicePayload | null {
  // أ. خريطة بالأصناف الأصلية
  const originalMap = new Map<string, Item>();
  initialParticipants.forEach((p) =>
    p.items.forEach((item) => originalMap.set(item.orderItemId, item)),
  );

  const updatedItems: UpdatedItem[] = [];
  const addedItems: AddedItem[] = [];
  const currentIds = new Set<string>();
 // A Set is like an array, but it doesn't allow duplicate elements
   
  participants.forEach((p) =>
    p.items.forEach((item) => {
      currentIds.add(item.orderItemId);
      const old = originalMap.get(item.orderItemId);

      if (!old) {

        addedItems.push({
          orderId: p.orderId,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        });
      } else if (
        old.name !== item.name ||
        old.quantity !== item.quantity ||
        old.unitPrice !== item.unitPrice
      ) {

        updatedItems.push({
          orderItemId: item.orderItemId,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        });
      }
    }),
  );

  const removedOrderItemIds = [...originalMap.keys()].filter(
    (id) => !currentIds.has(id),
  );

  if (
    !updatedItems.length &&
    !addedItems.length &&
    !removedOrderItemIds.length
  ) {
    return null;
  }

  return { updatedItems, removedOrderItemIds, addedItems };
}