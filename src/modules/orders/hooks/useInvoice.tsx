import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invoice } from "../Services/invoice.service";

export default function useInvoice() {
  const queryClient = useQueryClient();
    interface invoiceProps {
        sessionId : string; 
        fee : number ;
        file :File ;
    }
  return useMutation({
    mutationFn: ({sessionId , fee , file} :invoiceProps) => invoice(sessionId , fee , file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
    },
    onError: (error) => {
      console.error("Error making session arrived:", error);
    },
  });
}
