

import { BASE_URL } from "@/constants";
import Cookies from "js-cookie";
import { getInvoiceErrorMessage } from "../utils/getInvoiceErrorMessage";

export const confirmInvoice = async (sessionId : string  ) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${BASE_URL}/api/breakfast-sessions/${sessionId}/invoice-draft`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
     
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(getInvoiceErrorMessage(data, "Failed to confirm invoice."));
    }

    return data;
  } 
  catch(error){
    throw error
  }
}
