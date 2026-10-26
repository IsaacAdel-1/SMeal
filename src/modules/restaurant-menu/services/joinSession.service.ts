import { BASE_URL } from "@/constants";
import Cookies from "js-cookie"
import type { items } from "../types";
import { apiRequest } from "@/lib/api";
import i18n from "@/i18n";

export default async function joinSession(sessionId : string , items : items[]) {
    const token = Cookies.get("token")
    return apiRequest(`${BASE_URL}/api/orders` , {
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": i18n.language ,
        },
        body: JSON.stringify({sessionId , items}),
        method : "POST"
    }, "Failed to join session");
}
