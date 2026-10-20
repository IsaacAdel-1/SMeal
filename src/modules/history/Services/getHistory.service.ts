import { BASE_URL } from "@/constants";
import Cookies from "js-cookie"

export default async function getHistory() {
    const token = Cookies.get("token")
    const response = await fetch(`${BASE_URL}/api/orders/my-history` , {
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en",
        },
       
    })

    if(!response.ok){
        throw new Error("Failed to get restaurant items")
    }

    return response.json()
}
