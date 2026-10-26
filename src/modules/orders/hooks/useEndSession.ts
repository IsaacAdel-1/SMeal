// hooks/useEndSession.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endSession } from "../Services/endSession.service";

export default function useEndSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => endSession(sessionId),
    onSuccess: (_data, sessionId) => {
      queryClient.invalidateQueries({ queryKey: ["session", sessionId] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
