export type InvoiceStatus = "paid" | "pending" | "cancelled";
export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number; 
}

export interface Invoice {
  id: string;
  restaurant: string;
  createdAt: string; 
  hostName: string;
  isHost: boolean;
  status: InvoiceStatus;
  items: InvoiceItem[];
  deliveryTotal: number; 
  participants: number; 
}
