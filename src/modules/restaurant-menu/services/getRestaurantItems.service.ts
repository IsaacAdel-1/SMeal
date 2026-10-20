import { BASE_URL } from "@/constants";
import Cookies from "js-cookie"

export default async function getRestaurantItems(restaurantId : string) {
    const token = Cookies.get("token")
    const response = await fetch(`${BASE_URL}/api/restaurants/${restaurantId}/menu-items` , {
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en",
        }
    })

    if(!response.ok){
        throw new Error("Failed to get restaurant items")
    }

    return response.json()
}
