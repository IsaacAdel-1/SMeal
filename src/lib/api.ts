import { BASE_URL } from "@/constants";
import i18n from "@/i18n";
import {
  SESSION_EXPIRED_EVENT,
  clearSession,
  getRefreshToken,
  getToken,
  saveSession,
} from "@/modules/auth/utils/session";
import type { LoginResponse } from "@/modules/auth/types";
import { BULK_PAGE_SIZE, type PaginatedResponse } from "@/shared/types/pagination";

type ApiErrorBody = {
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
  title?: unknown;
  detail?: unknown;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** Thrown when the session cannot be refreshed; the auth context reports it once. */
export class SessionExpiredError extends ApiError {
  constructor(message: string) {
    super(message, 401);
    this.name = "SessionExpiredError";
  }
}

type QueryValue = string | number | boolean | null | undefined;

export type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  /** Plain objects are sent as JSON, FormData is sent as multipart. */
  body?: unknown;
  query?: Record<string, QueryValue>;
  headers?: Record<string, string>;
  /** Send the bearer token (default `true`). */
  auth?: boolean;
  fallbackMessage?: string;
};

function collectMessages(value: unknown): string[] {
  if (typeof value === "string" && value.trim()) return [value];
  if (Array.isArray(value)) return value.flatMap(collectMessages);
  if (value && typeof value === "object") return Object.values(value).flatMap(collectMessages);
  return [];
}

function getErrorMessage(body: ApiErrorBody | null, fallback: string) {
  const errors = collectMessages(body?.errors);
  if (errors.length) return [...new Set(errors)].join("\n");

  for (const value of [body?.message, body?.detail, body?.title]) {
    if (typeof value === "string" && value.trim()) return value;
  }
  return fallback;
}

const language = () => (i18n.resolvedLanguage ?? i18n.language ?? "en").split("-")[0];

function buildUrl(path: string, query?: Record<string, QueryValue>) {
  const url = `${BASE_URL}${path}`;
  if (!query) return url;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") params.set(key, String(value));
  }
  const search = params.toString();
  return search ? `${url}?${search}` : url;
}

async function readBody(response: Response) {
  const text = await response.text().catch(() => "");
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

let refreshing: Promise<boolean> | null = null;

/** Exchanges the refresh token for a new access token (once for parallel callers). */
function refreshSession(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return Promise.resolve(false);

  refreshing ??= (async () => {
    try {
      const response = await fetch(buildUrl("/api/auth/refresh-token"), {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept-Language": language() },
        body: JSON.stringify({ refreshToken }),
      });
      const body = (await readBody(response)) as { data?: LoginResponse } | null;
      if (!response.ok || !body?.data?.jwt?.token) return false;
      saveSession(body.data);
      return true;
    } catch {
      return false;
    } finally {
      refreshing = null;
    }
  })();

  return refreshing;
}

function expireSession() {
  clearSession();
  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
}

export async function apiRequest<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const {
    method = "GET",
    body,
    query,
    headers: extraHeaders,
    auth = true,
    fallbackMessage = i18n.t("common.genericError"),
  } = options;

  const send = (token?: string) => {
    const headers: Record<string, string> = { "Accept-Language": language(), ...extraHeaders };
    let payload: BodyInit | undefined;
    if (body instanceof FormData) {
      payload = body;
    } else if (body !== undefined) {
      payload = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }
    if (token) headers.Authorization = `Bearer ${token}`;
    return fetch(buildUrl(path, query), { method, headers, body: payload });
  };

  let response: Response;
  try {
    if (auth && !getToken()) await refreshSession();
    response = await send(auth ? getToken() : undefined);

    if (auth && response.status === 401 && (await refreshSession())) {
      response = await send(getToken());
    }
  } catch {
    throw new ApiError(i18n.t("common.networkError"), 0);
  }

  if (auth && response.status === 401) {
    expireSession();
    throw new SessionExpiredError(i18n.t("common.sessionExpired"));
  }

  const data = await readBody(response);
  const json = data && typeof data === "object" ? (data as ApiErrorBody) : null;
  const failed =
    !response.ok || json?.isSuccess === false || collectMessages(json?.errors).length > 0;

  if (failed) {
    const message =
      json || typeof data !== "string" || !data.trim() || data.length > 300
        ? getErrorMessage(json, fallbackMessage)
        : data;
    throw new ApiError(message, response.status);
  }

  return data as T;
}

/** Envelope returned by most endpoints. */
export interface ApiEnvelope<T> {
  isSuccess: boolean;
  message: string | null;
  data: T;
  errors: string[] | null;
}

/** Calls an endpoint and returns the `data` field of its envelope. */
export async function apiData<T>(path: string, options?: RequestOptions): Promise<T> {
  const envelope = await apiRequest<ApiEnvelope<T> | null>(path, options);
  return (envelope?.data ?? null) as T;
}

/** Loads every page of a paginated endpoint and returns all items. */
export async function apiAllPages<T>(
  path: string,
  options: RequestOptions = {},
  pageSize = BULK_PAGE_SIZE,
): Promise<T[]> {
  const page = (pageNumber: number) =>
    apiData<PaginatedResponse<T>>(path, { ...options, query: { ...options.query, pageNumber, pageSize } });

  const first = await page(1);
  const totalPages = Math.min(first?.totalPages ?? 1, 50);
  const rest = await Promise.all(
    Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => page(i + 2)),
  );
  return [first, ...rest].flatMap((p) => p?.items ?? []);
}
