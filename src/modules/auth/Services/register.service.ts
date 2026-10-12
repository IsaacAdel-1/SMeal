import { BASE_URL } from "../../../constants";
import type { Register } from "../types";

export default async function register(data : Register) {
    const response = await fetch(`${BASE_URL}/api/auth/register` , {
        method : "POST",
        body : JSON.stringify(data),
        headers : {
            "Content-Type" : "application/json"
        }
    })

    if (!response.ok) {
    throw new Error("Registration failed");
  }

    return response.json()
}
