import { BASE_URL } from "../../../constants"
import Cookies from "js-cookie"
import { apiRequest } from "../../../lib/api";

export default async function resutrants({search , restaurantCategoryId} : {search : string ; restaurantCategoryId : string}) {
    const token = Cookies.get("token");
    const query = new URLSearchParams()
    if(search) query.set("search" ,search)
    if(restaurantCategoryId) query.set("restaurantCategoryId" , restaurantCategoryId)
    return apiRequest(`${BASE_URL}/api/restaurants?${query}`,{
        headers :{
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en"
        }
    }, "Error while fetching restaurants");
}
