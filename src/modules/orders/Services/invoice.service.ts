import { BASE_URL } from "@/constants";
import Cookies from "js-cookie";
export const invoice = async (sessionId: string, fee: number, file: File) => {
  try {
        
    const formData = new FormData();
    formData.append("DeliveryCost", String(fee));
    formData.append("Invoice", file);

    const token = Cookies.get("token");
    const response = await fetch(`${BASE_URL}/api/breakfast-sessions/${sessionId}/invoice`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body : formData,
    });

    if (!response.ok) {
      throw new Error("Error while ");
    }

    const data = await response.json();
    return data;
  } 
  catch(error){
    throw error
  }
}