import { BASE_URL } from "@/constants";
import Cookies from "js-cookie"
import { apiRequest } from "@/lib/api";

export default async function getHistory() {
    const token = Cookies.get("token")
    return apiRequest(`${BASE_URL}/api/orders/my-history` , {
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en",
        },
       
    }, "Failed to get order history");
}
