import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { invalidateSessionData, queryKeys } from "@/lib/queryKeys";
import { PAGE_SIZE } from "@/shared/types/pagination";
import {
  approveInvoice,
  getInvoiceDraft,
  getMyHistory,
  getMyOrders,
  getSession,
  updateInvoiceDraft,
  uploadInvoice,
} from "../Services/orders.service";

export function useMyOrders(page: number) {
  return useQuery({
    queryKey: queryKeys.myOrders(page),
    queryFn: () => getMyOrders({ pageNumber: page, pageSize: PAGE_SIZE }),
    placeholderData: keepPreviousData,
  });
}

export function useHistory() {
  return useQuery({ queryKey: queryKeys.history, queryFn: getMyHistory });
}

export function useSession(sessionId: string | undefined, enabled = true) {
  return useQuery({
    queryKey: queryKeys.session(sessionId ?? ""),
    queryFn: () => getSession(sessionId!),
    enabled: !!sessionId && enabled,
  });
}

export function useInvoiceDraft(sessionId: string, enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.invoiceDraft(sessionId),
    queryFn: () => getInvoiceDraft(sessionId),
    enabled,
    // The editor restarts from fresh data on every refetch, so only refetch after our own saves.
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

function useInvoiceMutation<TVariables>(mutationFn: (variables: TVariables) => Promise<unknown>, successKey: string) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn,
    onSuccess: async () => {
      toast.success(t(successKey));
      await invalidateSessionData(queryClient);
    },
  });
}

export const useUploadInvoice = () => useInvoiceMutation(uploadInvoice, "invoice.messages.uploaded");
export const useUpdateInvoice = () => useInvoiceMutation(updateInvoiceDraft, "invoice.messages.saved");
export const useApproveInvoice = () => useInvoiceMutation(approveInvoice, "invoice.messages.approved");
