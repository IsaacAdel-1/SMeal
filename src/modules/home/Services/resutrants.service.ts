import { BASE_URL } from "../../../constants"
import Cookies from "js-cookie"

export default async function resutrants({search , restaurantCategoryId} : {search : string ; restaurantCategoryId : string}) {
    const token = Cookies.get("token");
    const query = new URLSearchParams()
    if(search) query.set("search" ,search)
    if(restaurantCategoryId) query.set("restaurantCategoryId" , restaurantCategoryId)
    const response = await fetch(`${BASE_URL}/api/restaurants?${query}`,{
        headers :{
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en"
        }
    })

    if (!response.ok){
        throw new Error("Error while fetching resturants");
    }
    return response.json()
}
