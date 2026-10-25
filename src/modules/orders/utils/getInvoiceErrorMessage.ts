type ErrorBody = {
  message?: unknown;
  title?: unknown;
  detail?: unknown;
  errors?: unknown;
};

function collectMessages(value: unknown): string[] {
  if (typeof value === "string" && value.trim()) return [value];
  if (Array.isArray(value)) return value.flatMap(collectMessages);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectMessages);
  }
  return [];
}

export function getInvoiceErrorMessage(body: ErrorBody | null, fallback: string) {
  const validationErrors = collectMessages(body?.errors);
  if (validationErrors.length) return [...new Set(validationErrors)].join("\n");

  for (const value of [body?.message, body?.title, body?.detail]) {
    if (typeof value === "string" && value.trim()) return value;
  }

  return fallback;
}
