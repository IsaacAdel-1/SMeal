import Cookies from "js-cookie";
import i18n from "i18next";
import type { SessionsResponse } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getMyOrders = async (): Promise<SessionsResponse> => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${BASE_URL}/api/orders/my-orders`, {
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

  return res.json() as Promise<SessionsResponse>;
};
