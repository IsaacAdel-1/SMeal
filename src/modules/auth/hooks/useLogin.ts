import { useMutation } from '@tanstack/react-query'

import login from '../Services/login.service'
import { useAuth } from '../context/AuthContext';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const {login : setAuthUser} = useAuth()

  const navigate = useNavigate();
  return useMutation({
    mutationFn : (data : {email : string ; password :string;}) => login(data),
    onSuccess : (response) => {
      const {jwt , user} = response.data
      console.log("User from API:", user);
      setAuthUser(user)
      Cookies.set("token" , jwt.token , {
        sameSite : "strict",
        expires : new Date(jwt.expiresAt)
      })
      Cookies.set("refreshToken" , jwt.refreshToken , {
        sameSite : "strict",
        expires  : new Date(jwt.refreshTokenExpirationAt)
      })

      navigate("/home", { replace: true });
    }
  })
}
