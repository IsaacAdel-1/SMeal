import { apiData } from "@/lib/api";
import type { PaginatedResponse, PaginationParams } from "@/shared/types/pagination";
import type { ActiveSessionType, Category, Restaurant } from "../types";

export function getCategories() {
  return apiData<Category[]>("/api/restaurants/categories");
}

export async function getActiveSessions() {
  return (await apiData<ActiveSessionType[] | null>("/api/breakfast-sessions/active")) ?? [];
}

export function getRestaurants({
  search,
  restaurantCategoryId,
  pageNumber,
  pageSize,
}: { search: string; restaurantCategoryId: string } & PaginationParams) {
  return apiData<PaginatedResponse<Restaurant>>("/api/restaurants", {
    query: { search: search.trim(), restaurantCategoryId, pageNumber, pageSize },
  });
}
