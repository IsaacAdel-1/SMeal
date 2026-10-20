import { BASE_URL } from "@/constants";
import Cookies from "js-cookie"
import type { items } from "../types";

export default async function joinSession(sessionId : string , items : items[]) {
    const token = Cookies.get("token")
    const response = await fetch(`${BASE_URL}/api/orders` , {
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en",
        },
        body: JSON.stringify({sessionId , items}),
        method : "POST"
    })

    if(!response.ok){
        throw new Error("Failed to get restaurant items")
    }

    return response.json()
}
