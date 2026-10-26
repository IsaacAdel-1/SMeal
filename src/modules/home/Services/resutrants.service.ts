import { BASE_URL } from "../../../constants"
import Cookies from "js-cookie"
import { apiRequest } from "../../../lib/api";
import i18n from "@/i18n";
import type { ApiResponse, PaginatedResponse, PaginationParams } from "@/shared/types/pagination";
import type { Restaurant } from "../types";

export default async function getRestaurants({search , restaurantCategoryId, pageNumber, pageSize} : {search : string ; restaurantCategoryId : string} & PaginationParams): Promise<PaginatedResponse<Restaurant>> {
    const token = Cookies.get("token");
    const query = new URLSearchParams()
    if(search) query.set("search" ,search)
    if(restaurantCategoryId) query.set("restaurantCategoryId" , restaurantCategoryId)
    query.set("pageNumber", String(pageNumber));
    query.set("pageSize", String(pageSize));
    const response = await apiRequest<ApiResponse<PaginatedResponse<Restaurant>>>(`${BASE_URL}/api/restaurants?${query}`,{
        headers :{
            Authorization: `Bearer ${token}`,
            "Accept-Language": i18n.language 
        }
    }, "Error while fetching restaurants");
    return response.data;
}
