import type { SessionDetails, Participant } from "../types";

export const mapSessionToParticipants = (
  session: SessionDetails
): Participant[] =>
  session.participants.map((p) => {
    const items = (p.items ?? []).map((i) => ({
      orderItemId: i.menuItemId,
      name: i.menuItemName,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
      total: i.quantity * i.unitPrice,
      isMatched: true,
    }));

    const foodAmount = items.reduce((sum, i) => sum + i.total, 0);

    return {
      orderId: p.orderId,
      participantId: p.participantId,
      participantName: p.participantName,
      isPaid: p.paymentStatus === 1,
      deliveryShare: p.deliveryShare,
      items,
      foodAmount,
      totalAmount: foodAmount + p.deliveryShare,
    };
  });