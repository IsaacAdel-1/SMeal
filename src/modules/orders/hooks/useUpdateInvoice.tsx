import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvoice } from "../Services/updateInvoice.service";
import type { InvoicePayload } from "../utils/buildInvoicePayload";
import { toast } from "sonner";

export default function useUpdateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, payload }: { sessionId: string; payload: InvoicePayload }) =>
      updateInvoice({ sessionId, payload }),
    onSuccess: () => {
      toast.success("Invoice updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update invoice.", {
        id: `api-error:${error.message}`,
      });
    },
  })
}
