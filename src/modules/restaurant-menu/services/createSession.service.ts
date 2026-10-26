import { BASE_URL } from "@/constants";
import Cookies from "js-cookie"
import { apiRequest } from "@/lib/api";
import i18n from "@/i18n";

export default async function createSession(restaurantId : string , items : {menuItemId : string ; quantity : number}[]) {
    const token = Cookies.get("token")
    return apiRequest(`${BASE_URL}/api/breakfast-sessions` , {
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": i18n.language ,
        },
        body: JSON.stringify({restaurantId , items}),
        method : "POST"
    }, "Failed to create session");
}
