import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { PAGE_SIZE } from "@/shared/types/pagination";
import { getActiveSessions, getCategories, getRestaurants } from "../Services/home.service";

export function useActiveSessions() {
  return useQuery({
    queryKey: queryKeys.activeSessions,
    queryFn: getActiveSessions,
    // Other people join and the host moves the session forward, so keep it fresh.
    refetchInterval: 30_000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: getCategories,
    staleTime: 5 * 60_000,
  });
}

export function useRestaurants({ search, categoryId, page }: { search: string; categoryId: string; page: number }) {
  return useQuery({
    queryKey: queryKeys.restaurants({ page, search, categoryId }),
    queryFn: () =>
      getRestaurants({ search, restaurantCategoryId: categoryId, pageNumber: page, pageSize: PAGE_SIZE }),
    placeholderData: keepPreviousData,
  });
}
