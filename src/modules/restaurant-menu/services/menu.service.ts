import { apiAllPages, apiData, apiRequest } from "@/lib/api";
import type { SessionAction } from "@/shared/session/ownerActions";
import type { MenuItem, OrderItem, RestaurantDetails } from "../types";

export function getRestaurant(restaurantId: string) {
  return apiData<RestaurantDetails>(`/api/restaurants/${restaurantId}`);
}

/** The menu endpoint is paginated; the page needs the whole menu. */
export function getRestaurantItems(restaurantId: string) {
  return apiAllPages<MenuItem>(`/api/restaurants/${restaurantId}/menu-items`);
}

/** Starts a group session; the owner's order is created with it. Returns the session id. */
export function createSession(restaurantId: string, items: OrderItem[]) {
  return apiData<string>("/api/breakfast-sessions", { method: "POST", body: { restaurantId, items } });
}

/** Joining a session means placing an order in it. Returns the order id. */
export function joinSession(sessionId: string, items: OrderItem[]) {
  return apiData<string>("/api/orders", { method: "POST", body: { sessionId, items } });
}

export function updateOrder(orderId: string, items: OrderItem[]) {
  return apiRequest(`/api/orders/${orderId}`, { method: "PUT", body: { items } });
}

/** Removes the user's order, i.e. leaves the session. */
export function deleteOrder(orderId: string) {
  return apiRequest(`/api/orders/${orderId}`, { method: "DELETE" });
}

export function sessionAction({ sessionId, action }: { sessionId: string; action: SessionAction }) {
  return apiRequest(`/api/breakfast-sessions/${sessionId}/${action}`, { method: "POST" });
}
