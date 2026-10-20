import { BASE_URL } from "@/constants";
import Cookies from "js-cookie";

export type SessionAction =  "close" | "open" | "order" | "arrive" | "end" | "cancel" | "invoice";

export default async function sessionAction({
  sessionId,
  action,
}: {
  sessionId: string;
  action: SessionAction;
}) {
  const token = Cookies.get("token");
  const response = await fetch(
    `${BASE_URL}/api/breakfast-sessions/${sessionId}/${action}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept-Language": "en",
      },
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.errors?.[0] ?? `${action} failed (${response.status})`);
  }

  return response.json();
}