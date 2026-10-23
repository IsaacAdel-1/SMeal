import { BASE_URL } from "@/constants";
import Cookies from "js-cookie";
export const makeArrived = async (sessionId: string) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${BASE_URL}/api/breakfast-sessions/${sessionId}/arrive`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
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