import { useQuery } from "@tanstack/react-query";

import getActiveSessions from "../Services/getActiveSesstion.service";

export default function useActiveSessions() {
  return useQuery({
    queryKey : ["activeSessions"],
    queryFn : getActiveSessions 
  })
}
