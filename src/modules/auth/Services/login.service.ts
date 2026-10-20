import { BASE_URL } from "../../../constants"
import { apiRequest } from "../../../lib/api";


export default async function login({email , password} : {email : string; password : string ; }) {
    return apiRequest(`${BASE_URL}/api/auth/login` , {
        body : JSON.stringify({email , password , fcmToken: "web-dev-token"}),
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        }
    }, "Login failed. Please try again.");
}
