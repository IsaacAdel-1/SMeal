import { useMutation } from "@tanstack/react-query";
import register from "../Services/register.service";
import type { Register } from "../types";
import { useNavigate } from "react-router-dom";


export default function useRegister() {
    const navigate = useNavigate()
  return useMutation({
    mutationFn : (data : Register) =>register(data),
    onSuccess : (_response , data) => navigate('/verify-otp' , {state : {email : data.email}})
  })
}
