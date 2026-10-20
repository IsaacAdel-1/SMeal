import { toast } from "sonner";

type ApiErrorBody = {
  errors?: unknown;
  message?: unknown;
  title?: unknown;
  detail?: unknown;
};

function collectMessages(value: unknown): string[] {
  if (typeof value === "string" && value.trim()) return [value];
  if (Array.isArray(value)) return value.flatMap(collectMessages);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectMessages);
  }
  return [];
}

function getErrorMessage(body: ApiErrorBody | null, fallback: string) {
  const errors = collectMessages(body?.errors);
  if (errors.length) return [...new Set(errors)].join("\n");

  if (typeof body?.message === "string" && body.message.trim()) return body.message;
  if (typeof body?.title === "string" && body.title.trim()) return body.title;
  if (typeof body?.detail === "string" && body.detail.trim()) return body.detail;
  return fallback;
}

export async function apiRequest<T = any>(
  input: RequestInfo | URL,
  init?: RequestInit,
  fallbackMessage = "Something went wrong. Please try again.",
): Promise<T> {
  const response = await fetch(input, init);
  const body = await response.json().catch(() => null) as ApiErrorBody | null;

  const hasBackendErrors = collectMessages(body?.errors).length > 0;
  const failedResponse = !response.ok || hasBackendErrors;

  if (failedResponse) {
    const error = new Error(getErrorMessage(body, fallbackMessage));
    toast.error(error.message, { id: `api-error:${error.message}` });
    throw error;
  }

  return body as T;
}

