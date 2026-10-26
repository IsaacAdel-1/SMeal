import { BASE_URL } from "@/constants";
import Cookies from "js-cookie"
import type { RestaurantResponse } from "../types";
import { apiRequest } from "@/lib/api";
import i18n from "@/i18n";

export default async function getRestaurant(restaurantId : string) :Promise<RestaurantResponse> {
    const token = Cookies.get("token")
    return apiRequest<RestaurantResponse>(`${BASE_URL}/api/restaurants/${restaurantId}` , {
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": i18n.language,
        }
    }, "Failed to get restaurant");
}
