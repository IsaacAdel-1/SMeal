// useSession.ts
import { useQuery } from "@tanstack/react-query";
import { getSession } from "../Services/getSession.service";

export default function useSession(sessionId: string | undefined) {
  return useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => getSession(sessionId!),
    enabled: !!sessionId,
  });
}