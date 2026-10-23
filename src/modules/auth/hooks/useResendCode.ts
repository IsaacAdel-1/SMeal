import { useMutation } from "@tanstack/react-query";
import resendVerificationCode from "../Services/resendVerificationCode.service";

export default function useResendCode() {
  return useMutation({
    mutationFn: (data: { email: string }) => resendVerificationCode(data),
  });
}