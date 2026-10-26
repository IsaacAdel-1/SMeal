import { useQuery } from "@tanstack/react-query";
import getRestaurants from "../Services/resutrants.service";

import { keepPreviousData } from "@tanstack/react-query"
import { PAGE_SIZE } from "@/shared/types/pagination";

export default function useResturants({search , restaurantCategoryId, page} :{search : string ; restaurantCategoryId : string; page: number}) {
  return useQuery({
    queryKey : ["restaurants", page, PAGE_SIZE, search, restaurantCategoryId],
    queryFn : ()=> getRestaurants({search , restaurantCategoryId, pageNumber: page, pageSize: PAGE_SIZE}),
    placeholderData: keepPreviousData,
  })
}
