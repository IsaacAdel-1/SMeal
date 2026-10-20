import { BASE_URL } from "@/constants";
import Cookies from "js-cookie"
import type { RestaurantResponse } from "../types";

export default async function getRestaurant(restaurantId : string) :Promise<RestaurantResponse> {
    const token = Cookies.get("token")
    const response = await fetch(`${BASE_URL}/api/restaurants/${restaurantId}` , {
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
