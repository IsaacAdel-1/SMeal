import { BASE_URL } from "../../../constants"


export default async function login({email , password} : {email : string; password : string ; }) {
    const response = await fetch(`${BASE_URL}/api/auth/login` , {
        body : JSON.stringify({email , password , fcmToken: "web-dev-token"}),
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        }
    })

    if(!response.ok){
        throw new Error("Invalid Login")
    }
    return response.json()
}
