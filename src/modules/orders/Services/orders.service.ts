import { apiAllPages, apiData } from "@/lib/api";
import type { PaginatedResponse, PaginationParams } from "@/shared/types/pagination";
import type { InvoiceDraft, OrderSession, SessionDetails } from "../types";
import type { InvoicePayload } from "../utils/buildInvoicePayload";

export function getMyOrders({ pageNumber, pageSize }: PaginationParams) {
  return apiData<PaginatedResponse<OrderSession>>("/api/orders/my-orders", {
    query: { pageNumber, pageSize },
  });
}

export function getMyHistory() {
  return apiAllPages<OrderSession>("/api/orders/my-history");
}

export function getSession(sessionId: string) {
  return apiData<SessionDetails>(`/api/breakfast-sessions/${sessionId}`);
}

export function getInvoiceDraft(sessionId: string) {
  return apiData<InvoiceDraft>(`/api/breakfast-sessions/${sessionId}/invoice-draft`);
}

/** Uploads the receipt photo and the delivery cost; the API answers with the invoice draft. */
export function uploadInvoice({ sessionId, deliveryCost, file }: { sessionId: string; deliveryCost: number; file: File }) {
  const body = new FormData();
  body.append("DeliveryCost", String(deliveryCost));
  body.append("Invoice", file);
  return apiData<InvoiceDraft>(`/api/breakfast-sessions/${sessionId}/invoice`, { method: "POST", body });
}

export function updateInvoiceDraft({ sessionId, payload }: { sessionId: string; payload: InvoicePayload }) {
  return apiData<InvoiceDraft>(`/api/breakfast-sessions/${sessionId}/invoice-draft`, {
    method: "PUT",
    body: payload,
  });
}

export function approveInvoice(sessionId: string) {
  return apiData<InvoiceDraft>(`/api/breakfast-sessions/${sessionId}/invoice-draft/approve`, { method: "PUT" });
}
