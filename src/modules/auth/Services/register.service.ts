import { BASE_URL } from "../../../constants";
import type { Register } from "../types";
import { apiRequest } from "../../../lib/api";

export default async function register(data : Register) {
    return apiRequest(`${BASE_URL}/api/auth/register` , {
        method : "POST",
        body : JSON.stringify(data),
        headers : {
            "Content-Type" : "application/json"
        }
    }, "Registration failed. Please try again.");
}
