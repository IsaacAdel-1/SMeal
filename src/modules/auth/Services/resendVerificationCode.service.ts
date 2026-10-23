import i18n from "i18next";
import { BASE_URL } from "@/constants";

export default async function resendVerificationCode(data: { email: string }) {
  const response = await fetch(`${BASE_URL}/api/auth/resend-verification-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": i18n.language ,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) return;

  const error = await response.json().catch(() => null);
  throw new Error(error?.detail || error?.title || i18n.t("otp.errors.resendFailed"));
}