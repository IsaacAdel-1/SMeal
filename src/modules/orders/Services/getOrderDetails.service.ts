import { BASE_URL } from "@/constants"
import Cookies from "js-cookie"
import { apiRequest } from "@/lib/api";



export default async function getOrderDetails(){
    
    const token = Cookies.get("token")
    return apiRequest(`${BASE_URL}/api/orders/my-orders` ,{
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en",
        }
    }, "Failed to get order details");
}
