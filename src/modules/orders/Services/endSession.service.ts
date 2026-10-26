
import Cookies from "js-cookie";
import type { ApiEnvelope } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL; // نفس الـ base بتاع باقي الـ services

export async function endSession(sessionId: string): Promise<ApiEnvelope<unknown>> {
  const res = await fetch(`${BASE_URL}/api/breakfast-sessions/${sessionId}/end`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  let json: ApiEnvelope<unknown> | null = null;

  try {
    json = await res.json();
  } catch {
    // الـ response مش JSON (مثلاً 500 بـ body فاضي)
  }

  if (!res.ok || (json && !json.isSuccess)) {
    throw new Error(json?.message || "Failed to end session");
  }

  return json as ApiEnvelope<unknown>;
}