export interface MenuItemCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
}

export interface RestaurantSession {
  id: string;
  name: string;
  description: string;
  phoneNumber: string;
  address: string;
  logoUrl: string;
  maximumDeliveryDistanceKm: number;
  sessionId: string;
  orderId: string;
  currentUserIsOwner: boolean;
  orderItems: OrderItem[];
}

export interface RestaurantResponse {
  isSuccess: boolean;
  message: string;
  data: RestaurantSession;
  errors: string[];
}


export interface items {
    menuItemId : string ;
    quantity : number 
}