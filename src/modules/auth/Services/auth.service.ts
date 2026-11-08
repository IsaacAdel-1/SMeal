import { apiData, apiRequest } from "@/lib/api";
import type { LoginResponse, Register, ResetPasswordParams } from "../types";

export function login({ email, password }: { email: string; password: string }) {
  return apiData<LoginResponse>("/api/auth/login", {
    method: "POST",
    auth: false,
    body: { email, password, fcmToken: "web-dev-token" },
  });
}

export function register(data: Register) {
  return apiRequest("/api/auth/register", { method: "POST", auth: false, body: data });
}

export function verifyEmail(data: { email: string; code: string }) {
  return apiRequest("/api/auth/verify-email", { method: "POST", auth: false, body: data });
}

export function resendVerificationCode(data: { email: string }) {
  return apiRequest("/api/auth/resend-verification-code", { method: "POST", auth: false, body: data });
}

export function forgotPassword(data: { email: string }) {
  return apiRequest("/api/auth/forgot-password", { method: "POST", auth: false, body: data });
}

export function resetPassword(data: ResetPasswordParams) {
  return apiRequest("/api/auth/reset-password", { method: "POST", auth: false, body: data });
}

/** Tells the API to drop the session. The token is passed explicitly because cookies are cleared right after. */
export function logoutRequest(token: string | undefined) {
  if (!token) return Promise.resolve(null);
  return apiRequest("/api/auth/logout", {
    method: "POST",
    auth: false,
    headers: { Authorization: `Bearer ${token}` },
  });
}
