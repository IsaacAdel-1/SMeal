export interface MenuItem {
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
}

export interface SessionItem {
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
  items: MenuItem[];
}

export interface PaginatedData<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface ApiEnvelope<T> {
  isSuccess: boolean;
  message: string;
  data: T;
  errors?: string[];
}

export type SessionsResponse = ApiEnvelope<PaginatedData<SessionItem>>;


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