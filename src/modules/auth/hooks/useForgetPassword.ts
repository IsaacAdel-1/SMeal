import { useMutation } from "@tanstack/react-query";
import forgetPassword from "../Services/forgetPassword.service";



export default function useForgetPassword() {
  return useMutation({
    mutationFn :(data :{email : string}) => forgetPassword(data)
  })
}
