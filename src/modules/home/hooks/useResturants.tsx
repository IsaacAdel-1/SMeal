import { useQuery } from "@tanstack/react-query";
import resutrants from "../Services/resutrants.service";

import { keepPreviousData } from "@tanstack/react-query"

export default function useResturants({search , restaurantCategoryId} :{search : string ; restaurantCategoryId : string}) {
  return useQuery({
    queryKey : ["resturants" , search ,restaurantCategoryId],
    queryFn : ()=> resutrants({search ,  restaurantCategoryId}),
    placeholderData: keepPreviousData,
  })
}
