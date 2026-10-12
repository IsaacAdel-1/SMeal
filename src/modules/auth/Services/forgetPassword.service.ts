import { BASE_URL } from "../../../constants"


export default async function forgetPassword(email : {email : string}) {
    const response = await fetch(`${BASE_URL}/api/auth/forgot-password`,{
        body : JSON.stringify(email),
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        }
    }) 

    if(!response.ok){
        throw new Error("Error while sending email");
    }
    return response.json()
}
