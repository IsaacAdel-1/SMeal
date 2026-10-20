import i18n from "i18next";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../constants";
import { apiRequest } from "../../../lib/api";

type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
};

export default async function changePassword({
  currentPassword,
  newPassword,
}: ChangePasswordData) {
  const token = Cookies.get("token");

  await apiRequest(`${BASE_URL}/api/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": i18n.language.split("-")[0],
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  }, "Error while changing password");
}
