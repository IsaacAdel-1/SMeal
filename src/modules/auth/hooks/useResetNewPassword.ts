import { useMutation } from "@tanstack/react-query";
import ResetNewPassword from "../Services/ResetNewPassword.service";
import type { ResetPasswordParams } from "../types";
import { useNavigate } from "react-router-dom";



export default function useResetNewPassword() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn :({userId , token , newPassword}:ResetPasswordParams) => ResetNewPassword({userId , token , newPassword}),
    onSuccess: () => navigate("/login"),

  })
}
