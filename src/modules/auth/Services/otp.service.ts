import { BASE_URL } from "../../../constants";
import { apiRequest } from "../../../lib/api";

export default async function otp({email , code } : {email : string ; code : string}) {
    
    return apiRequest(`${BASE_URL}/api/auth/verify-email` , {
        body : JSON.stringify({email , code}),
        method : "POST",
        headers: { "Content-Type": "application/json" } 
    }, "Email verification failed. Please try again.");
}
