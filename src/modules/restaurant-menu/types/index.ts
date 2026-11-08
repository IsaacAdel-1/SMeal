export interface MenuItemCardProps {
  name: string;
  description: string | null;
  price: number;
  imageUrl?: string | null;
  quantity: number;
  disabled?: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
}

/** GET /api/restaurants/{id}: the current user's order in this restaurant's session is included. */
export interface RestaurantDetails {
  id: string;
  name: string;
  description: string | null;
  phoneNumber: string | null;
  address: string | null;
  logoUrl: string | null;
  maximumDeliveryDistanceKm: number;
  sessionId: string | null;
  orderId: string | null;
  currentUserIsOwner: boolean | null;
  orderItems: OrderItem[] | null;
}

export type Quantities = Record<string, number>;
