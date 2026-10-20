import { useQuery } from "@tanstack/react-query";
import getRestaurantItems from "../services/getRestaurantItems.service";

export default function useRestaurantsItems(restaurantId : string) {
  return useQuery({
    queryKey : ["restaurantItems"], 
    queryFn : ()=>getRestaurantItems(restaurantId)
  })
}
