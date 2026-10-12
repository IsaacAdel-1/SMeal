import { useMutation } from "@tanstack/react-query";
import otp from "../Services/otp.service";
import { useNavigate } from "react-router-dom";



export default function useOTP() {
    const navigate = useNavigate();
  return useMutation({
    mutationFn : otp ,
    onSuccess : ()=> navigate('/login')
  })
}
