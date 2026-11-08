import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getRestaurant, getRestaurantItems } from "../services/menu.service";

export function useRestaurant(restaurantId: string) {
  return useQuery({
    queryKey: queryKeys.restaurant(restaurantId),
    queryFn: () => getRestaurant(restaurantId),
  });
}

export function useRestaurantItems(restaurantId: string) {
  return useQuery({
    queryKey: queryKeys.restaurantItems(restaurantId),
    queryFn: () => getRestaurantItems(restaurantId),
    staleTime: 60_000,
  });
}
