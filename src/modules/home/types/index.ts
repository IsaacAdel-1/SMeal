export interface Restaurant {
  id: string;
  name: string;
  phoneNumber: string | null;
  address: string | null;
  logoUrl: string | null;
  maximumDeliveryDistanceKm: number;
}

/** @deprecated kept for older imports, use `Restaurant`. */
export type Resturant = Restaurant;

export interface Category {
  id: string;
  name: string;
}

export interface ActiveSessionType {
  sessionId: string;
  restaurantId: string;
  restaurantName: string;
  logoUrl: string | null;
  ownerId: string;
  ownerName: string;
  participantCount: number;
  status: number;
  startedAt: string;
  expectedClosedAt: string;
  currentUserIsOwner: boolean;
  currentUserOrderId: string | null;
}
