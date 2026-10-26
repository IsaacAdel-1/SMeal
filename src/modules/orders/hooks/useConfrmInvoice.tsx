import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmInvoice } from "../Services/confirmInvoice.service";
import { toast } from "sonner";

export default function useConfirmInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => confirmInvoice(sessionId),
    onSuccess: () => {
      toast.success("Invoice confirmed successfully.");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to confirm invoice.", {
        id: `api-error:${error.message}`,
      });
    },
  })
}
