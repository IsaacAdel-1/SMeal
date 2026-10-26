import type { ApiResponse, PaginatedResponse } from "@/shared/types/pagination";

export interface SessionItem {
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
}

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
  deliveryShare: number;
  participantCount: number;
  orderId: string;
  items: SessionItem[];
}

export type MenuItem = SessionItem;
export type SessionsResponse = ApiResponse<PaginatedResponse<OrderSession>>;
export type ApiEnvelope<T> = ApiResponse<T>;


type Item = {
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

export type Props = {
  sessionId : string; 
  deliveryCost: number;
  participants: Participant[];
  isApproved?: boolean;
};



export type SessionItemProps = {
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
};

export type SessionParticipant = {
  participantId: string;
  participantName: string;
  paymentStatus: number;
  deliveryShare: number;
  orderId: string;
  items: SessionItemProps[];
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
  participants: SessionParticipant[];
};
