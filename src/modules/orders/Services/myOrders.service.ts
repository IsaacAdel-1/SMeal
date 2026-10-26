import Cookies from "js-cookie";
import i18n from "i18next";
import type { SessionsResponse } from "../types";
import type { PaginatedResponse, PaginationParams } from "@/shared/types/pagination";
import type { OrderSession } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getMyOrders = async ({pageNumber, pageSize}: PaginationParams): Promise<PaginatedResponse<OrderSession>> => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const query = new URLSearchParams({ pageNumber: String(pageNumber), pageSize: String(pageSize) });
  const res = await fetch(`${BASE_URL}/api/orders/my-orders?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": i18n.language,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch orders (${res.status})`);
  }

  const response = await res.json() as SessionsResponse;
  return response.data;
};
