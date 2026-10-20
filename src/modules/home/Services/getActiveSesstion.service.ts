

import { BASE_URL } from "../../../constants"
import Cookies from "js-cookie"
import { apiRequest } from "../../../lib/api";
export default async function getActiveSessions() {
    const token = Cookies.get("token")
    return apiRequest(`${BASE_URL}/api/breakfast-sessions/active` , {
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en",
        }
    }, "Error while fetching active sessions");
}
