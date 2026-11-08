import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { invalidateSessionData } from "@/lib/queryKeys";
import {
  invoicePath,
  needsConfirmation,
  type SessionAction,
} from "@/shared/session/ownerActions";
import {
  createSession,
  deleteOrder,
  joinSession,
  sessionAction,
  updateOrder,
} from "../services/menu.service";
import type { OrderItem } from "../types";

/**
 * Every session mutation refreshes the session-related queries before it
 * resolves, so callers can rely on fresh data in their own `onSuccess`.
 */
function useSessionMutation<TVariables>(
  mutationFn: (variables: TVariables) => Promise<unknown>,
  successKey: string | ((variables: TVariables) => string),
) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn,
    onSuccess: async (_data, variables) => {
      toast.success(t(typeof successKey === "function" ? successKey(variables) : successKey));
      await invalidateSessionData(queryClient);
    },
  });
}

export const useCreateSession = () =>
  useSessionMutation(
    ({ restaurantId, items }: { restaurantId: string; items: OrderItem[] }) => createSession(restaurantId, items),
    "session.messages.created",
  );

export const useJoinSession = () =>
  useSessionMutation(
    ({ sessionId, items }: { sessionId: string; items: OrderItem[] }) => joinSession(sessionId, items),
    "session.messages.joined",
  );

export const useUpdateOrder = () =>
  useSessionMutation(
    ({ orderId, items }: { orderId: string; items: OrderItem[] }) => updateOrder(orderId, items),
    "session.messages.updated",
  );

export const useLeaveSession = () =>
  useSessionMutation((orderId: string) => deleteOrder(orderId), "session.messages.left");

export function useSessionAction() {
  const navigate = useNavigate();
  const mutation = useSessionMutation(
    (variables: { sessionId: string; action: SessionAction }) => sessionAction(variables),
    ({ action }) => `session.messages.${action}`,
  );

  const mutate: typeof mutation.mutate = (variables, options) =>
    mutation.mutate(variables, {
      ...options,
      onSuccess: (...args) => {
        if (variables.action === "order") navigate("/orders");
        if (variables.action === "end") navigate("/history");
        options?.onSuccess?.(...args);
      },
    });

  return { ...mutation, mutate };
}

/**
 * Runs the owner's next step: opens the invoice page, or calls the session
 * endpoint (asking for confirmation for cancel/end).
 */
export function useOwnerStep() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate, isPending } = useSessionAction();

  const run = (sessionId: string, action: SessionAction | "invoice") => {
    if (action === "invoice") return navigate(invoicePath(sessionId));
    if (needsConfirmation(action) && !window.confirm(t(`session.confirm.${action}`))) return;
    mutate({ sessionId, action });
  };

  return { run, isPending };
}
