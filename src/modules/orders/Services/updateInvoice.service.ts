import { BASE_URL } from "@/constants";
import Cookies from "js-cookie";

import type { InvoicePayload } from "../utils/buildInvoicePayload";
import { getInvoiceErrorMessage } from "../utils/getInvoiceErrorMessage";
export const updateInvoice = async ({sessionId ,payload } :{sessionId : string ; payload : InvoicePayload} ) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${BASE_URL}/api/breakfast-sessions/${sessionId}/invoice-draft`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body : JSON.stringify(payload)
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(getInvoiceErrorMessage(data, "Failed to update invoice."));
    }

    return data;
  } 
  catch(error){
    throw error
  }
}
