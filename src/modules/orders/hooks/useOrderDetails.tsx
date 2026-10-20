import { useQuery } from "@tanstack/react-query";
import getOrderDetails from "../Services/getOrderDetails.service";

export default function useOrderDetails() {
  return useQuery({
    queryKey : ["orderDetails"],
    queryFn : getOrderDetails
  })
}
