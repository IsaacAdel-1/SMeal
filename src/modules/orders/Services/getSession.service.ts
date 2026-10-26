
import Cookies from "js-cookie";
import type { ApiEnvelope, SessionDetails, SessionParticipant } from "../types";
const BASE_URL = import.meta.env.VITE_API_URL; 

export async function getSession(sessionId: string): Promise<SessionDetails> {
  const res = await fetch(`${BASE_URL}/api/breakfast-sessions/${sessionId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  const json: ApiEnvelope<SessionDetails> = await res.json();

  if (!res.ok || !json.isSuccess) {
    throw new Error(json.message || "Failed to load session");
  }

  return json.data;
}

export async function getSessionParticipants(
  sessionId: string
): Promise<SessionParticipant[]> {
  const session = await getSession(sessionId);
  return session.participants ?? [];
}