import { useQuery } from "@tanstack/react-query";
import resutrants from "../Services/resutrants.service";

import { keepPreviousData } from "@tanstack/react-query"

export default function useResturants(search :string) {
  return useQuery({
    queryKey : ["resturants" , search],
    queryFn : ()=> resutrants(search),
    placeholderData: keepPreviousData,
  })
}
