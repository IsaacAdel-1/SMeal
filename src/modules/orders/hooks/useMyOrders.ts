import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../Services/myOrders.service";

export const MY_ORDERS_KEY = "my-orders";

export default function useMyOrders() {
  return useQuery({
    queryKey: [MY_ORDERS_KEY],
    queryFn: getMyOrders,
  });
}
