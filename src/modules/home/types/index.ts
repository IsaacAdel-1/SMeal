export interface Resturant {
        id: string;
        name: string;
        phoneNumber: string;
        address: string;
        logoUrl: string
        maximumDeliveryDistanceKm: number ;
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

export interface ActiveSessionsResponse {
  isSuccess: boolean;
  message: string;
  data: ActiveSessionType[];
  errors: string[];
}