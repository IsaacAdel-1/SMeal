import { useMutation } from "@tanstack/react-query";
import joinSession from "../services/joinSession.service";
import type { items } from "../types";

export default function useJoinSession() {
  return useMutation({
    mutationFn : ({sessionId , items } : {sessionId : string , items: items[]})=> joinSession (sessionId , items)
  })
}
