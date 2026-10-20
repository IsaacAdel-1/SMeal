import { BASE_URL } from "@/constants";
import Cookies from "js-cookie";
import { apiRequest } from "@/lib/api";

export type SessionAction =  "close" | "open" | "order" | "arrive" | "end" | "cancel" | "invoice";

export default async function sessionAction({
  sessionId,
  action,
}: {
  sessionId: string;
  action: SessionAction;
}) {
  const token = Cookies.get("token");
  return apiRequest(
    `${BASE_URL}/api/breakfast-sessions/${sessionId}/${action}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept-Language": "en",
      },
    },
    `${action} failed. Please try again.`,
  );
}
