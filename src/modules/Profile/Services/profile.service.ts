import { apiRequest } from "@/lib/api";

export function changePassword(data: { currentPassword: string; newPassword: string }) {
  return apiRequest("/api/auth/change-password", { method: "POST", body: data });
}

export function updateLanguage(language: string) {
  return apiRequest("/api/profile/language", { method: "PUT", body: { language } });
}
