import { BASE_URL } from "../../../constants";

export default async function otp({email , code } : {email : string ; code : string}) {
    
    const response = await fetch(`${BASE_URL}/api/auth/verify-email` , {
        body : JSON.stringify({email , code}),
        method : "POST",
        headers: { "Content-Type": "application/json" } 
    });

    if (!response.ok) {
    throw new Error("OTP verification failed");
  }
    return response.json()
}
