
import { useMutation, useQueryClient } from "@tanstack/react-query"
import createSession from "../services/createSession.service"

export interface CreateSessionData {
  restaurantId: string;
  items: { menuItemId: string; quantity: number }[];
}

export default function useCreateSession() {
      const queryClient = useQueryClient();

    return useMutation({
        mutationFn : (data : CreateSessionData) => createSession(data.restaurantId , data.items) ,
        onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["activeSessions"] }),
    })
}
