import { BASE_URL } from "@/constants";
import Cookies from "js-cookie"

export default async function createSession(restaurantId : string , items : {menuItemId : string ; quantity : number}[]) {
    const token = Cookies.get("token")
    const response = await fetch(`${BASE_URL}/api/breakfast-sessions` , {
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en",
        },
        body: JSON.stringify({restaurantId , items}),
        method : "POST"
    })

    if(!response.ok){
        throw new Error("Failed to get restaurant items")
    }

    return response.json()
}
