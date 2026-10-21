import { BASE_URL } from "@/constants";

import type { ResetPasswordParams } from "../types";
import i18n from "@/i18n";


export default async function ResetNewPassword ({ userId, token, newPassword }: ResetPasswordParams){
  
    const response = await fetch(`${BASE_URL}/api/auth/reset-password` ,{
        body : JSON.stringify({userId , token , newPassword}),
        method : "POST" ,
        headers : {
            "Content-Type" : "application/json",
            "Accept-Language": i18n.language,
        }
    })
    if(response.ok) return ;
    const error = await response.json().catch(() => null);
    throw new Error(error?.detail || error?.title || "Error while sending new password");
} 