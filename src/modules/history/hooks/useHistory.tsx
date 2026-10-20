import { useQuery } from "@tanstack/react-query";
import getHistory from "../Services/getHistory.service";


export default function useHistory() {
    
  return useQuery({
    queryKey : ["history"],
    queryFn : getHistory
  }) 
}
