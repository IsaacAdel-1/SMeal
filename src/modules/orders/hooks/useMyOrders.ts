import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../Services/myOrders.service";
import { PAGE_SIZE } from "@/shared/types/pagination";

export const MY_ORDERS_KEY = "orders";

export default function useMyOrders(page: number) {
  return useQuery({
    queryKey: [MY_ORDERS_KEY, page, PAGE_SIZE],
    queryFn: () => getMyOrders({ pageNumber: page, pageSize: PAGE_SIZE }),
    placeholderData: keepPreviousData,
  });
}
