import { BASE_URL } from "../../../constants"
import Cookies from "js-cookie"
export default async function categories() {
    const token = Cookies.get("token")
    const repsonse = await fetch(`${BASE_URL}/api/restaurants/categories` , {
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en",
        }
    })

    if(!repsonse.ok){
        throw new Error("Error while fetching categories")
    }
    return repsonse.json() 
}
