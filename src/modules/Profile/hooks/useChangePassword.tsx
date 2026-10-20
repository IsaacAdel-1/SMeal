import { useMutation } from "@tanstack/react-query";
import changePassword from "../Services/changePassword.service";

export default function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}