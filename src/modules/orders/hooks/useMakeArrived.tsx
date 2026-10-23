import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeArrived } from "../Services/makeArrived.service"; 

export default function useMakeArrived() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => makeArrived(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
    },
    onError: (error) => {
      console.error("Error making session arrived:", error);
    },
  });
}
