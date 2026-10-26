

import { BASE_URL } from "../../../constants"
import Cookies from "js-cookie"
import { apiRequest } from "../../../lib/api";
import i18n from "@/i18n";
export default async function getActiveSessions() {
    const token = Cookies.get("token")
    return apiRequest(`${BASE_URL}/api/breakfast-sessions/active` , {
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": i18n.language ,
        }
    }, "Error while fetching active sessions");
}
