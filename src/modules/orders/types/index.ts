export interface SessionItem {
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
}

/** MyOrderDto: the current user's order in a session (my-orders and my-history). */
export interface OrderSession {
  sessionId: string;
  restaurantId: string;
  restaurantName: string;
  logoUrl: string | null;
  ownerId: string;
  ownerName: string;
  status: number;
  startedAt: string;
  expectedClosedAt: string;
  /** Known once the host uploads the receipt with the delivery cost. */
  deliveryShare: number | null;
  participantCount: number;
  orderId: string;
  items: SessionItem[] | null;
}

export type MenuItem = SessionItem;

export type SessionParticipant = {
  participantId: string;
  participantName: string;
  paymentStatus: number;
  deliveryShare: number | null;
  orderId: string;
  items: SessionItem[] | null;
};

export type SessionDetails = {
  sessionId: string;
  restaurantId: string;
  restaurantName: string;
  logoUrl: string | null;
  ownerId: string;
  ownerName: string;
  status: number;
  startedAt: string;
  expectedClosedAt: string;
  participantCount: number;
  currentUserIsOwner: boolean;
  invoiceUrl: string | null;
  participants: SessionParticipant[] | null;
};

export type InvoiceItem = {
  /** Null for receipt lines that could not be matched to an order item. */
  orderItemId: string | null;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  isMatched: boolean;
};

export type InvoiceParticipant = {
  orderId: string;
  participantId: string;
  participantName: string;
  foodAmount: number;
  deliveryShare: number;
  totalAmount: number;
  isPaid: boolean;
  items: InvoiceItem[] | null;
};

export type InvoiceDraft = {
  foodTotal: number;
  deliveryCost: number;
  grandTotal: number;
  participantsCount: number;
  isApproved: boolean;
  participants: InvoiceParticipant[] | null;
};
