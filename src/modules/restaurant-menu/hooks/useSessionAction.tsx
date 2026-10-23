import { useMutation, useQueryClient } from "@tanstack/react-query";
import sessionAction from "../services/sessionAction.service";
import { useNavigate } from "react-router-dom";

export default function useSessionAction() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: sessionAction,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      if (variables.action === "order") navigate("/orders");
    },
  });
}
