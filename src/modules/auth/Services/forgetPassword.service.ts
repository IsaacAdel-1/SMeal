import i18n from "i18next";
import { BASE_URL } from "../../../constants";
import { apiRequest } from "../../../lib/api";

export default async function forgetPassword(data: { email: string }) {
  await apiRequest(`${BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": i18n.language.split("-")[0],
    },
    body: JSON.stringify(data),
  }, "Error while sending email");
}
