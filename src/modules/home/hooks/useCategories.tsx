import { useQuery } from "@tanstack/react-query";
import categories from "../Services/categories.service";

export default function useCategories() {
  return useQuery({
    queryKey : ["categories"],
    queryFn : categories 
  })
}
