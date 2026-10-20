import { useQuery } from "@tanstack/react-query";

import getRestaurant from "../services/getRestaurant.service";

export default function useRestaurants(restaurantId : string) {
  return useQuery({
    queryKey : ["restaurant"], 
    queryFn : ()=>getRestaurant(restaurantId)
  })
}
