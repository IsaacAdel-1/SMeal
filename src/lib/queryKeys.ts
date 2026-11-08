import type { QueryClient } from "@tanstack/react-query";

export const queryKeys = {
  activeSessions: ["activeSessions"] as const,
  categories: ["categories"] as const,
  restaurants: (params: { page: number; search: string; categoryId: string }) =>
    ["restaurants", params] as const,
  restaurant: (id: string) => ["restaurant", id] as const,
  restaurantItems: (id: string) => ["restaurantItems", id] as const,
  myOrders: (page: number) => ["orders", page] as const,
  history: ["history"] as const,
  session: (id: string) => ["session", id] as const,
  invoiceDraft: (id: string) => ["invoiceDraft", id] as const,
};

/**
 * Refreshes everything that depends on a breakfast session: the home cards,
 * the restaurant page (current user's order), orders, history and invoices.
 */
export function invalidateSessionData(queryClient: QueryClient) {
  return Promise.all(
    [
      queryKeys.activeSessions,
      ["restaurant"],
      ["orders"],
      queryKeys.history,
      ["session"],
      ["invoiceDraft"],
    ].map((queryKey) => queryClient.invalidateQueries({ queryKey })),
  );
}
