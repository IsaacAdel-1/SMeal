import { BASE_URL } from "@/constants"
import Cookies from "js-cookie"



export default async function getOrderDetails(){
    
    const token = Cookies.get("token")
    const response = await fetch(`${BASE_URL}/api/orders/my-orders` ,{
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en",
        }
    })
    
    if(!response.ok){
        throw new Error("Failed to get order Details")
    }
    return response.json() 
}
