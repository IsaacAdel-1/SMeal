import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import {
  forgotPassword,
  login,
  register,
  resendVerificationCode,
  resetPassword,
  verifyEmail,
} from "../Services/auth.service";
import type { Register, ResetPasswordParams } from "../types";

/** These forms show the error under the submit button, so skip the global toast. */
const INLINE_ERROR = { inlineError: true };

type LoginVariables = { email: string; password: string; remember: boolean };

export function useLogin() {
  const { login: startSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;

  return useMutation({
    meta: INLINE_ERROR,
    mutationFn: ({ email, password }: LoginVariables) => login({ email, password }),
    onSuccess: (response, { remember }) => {
      startSession(response, remember);
      navigate(from && from.startsWith("/") ? from : "/home", { replace: true });
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();
  return useMutation({
    meta: INLINE_ERROR,
    mutationFn: (data: Register) => register(data),
    onSuccess: (_response, data) => navigate("/verify-otp", { state: { email: data.email } }),
  });
}

export function useVerifyEmail() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return useMutation({
    meta: INLINE_ERROR,
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast.success(t("otp.success"));
      navigate("/login", { replace: true });
    },
  });
}

export function useResendCode() {
  return useMutation({
    meta: INLINE_ERROR,
    mutationFn: (data: { email: string }) => resendVerificationCode(data),
  });
}

export function useForgetPassword() {
  return useMutation({
    meta: INLINE_ERROR,
    mutationFn: (data: { email: string }) => forgotPassword(data),
  });
}

export function useResetNewPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return useMutation({
    meta: INLINE_ERROR,
    mutationFn: (data: ResetPasswordParams) => resetPassword(data),
    onSuccess: () => {
      toast.success(t("setNewPassword.success"));
      navigate("/login", { replace: true });
    },
  });
}
