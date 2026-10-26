import { BASE_URL } from "@/constants";
import Cookies from "js-cookie"
import { apiRequest } from "@/lib/api";
import i18n from "@/i18n";

export default async function getHistory() {
    const token = Cookies.get("token")
    return apiRequest(`${BASE_URL}/api/orders/my-history` , {
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": i18n.language ,
        },
       
    }, "Failed to get order history");
}
