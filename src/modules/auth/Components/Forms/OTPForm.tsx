import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useOTP from "../../hooks/useOTP";
import type { OTPFormData } from "../../types";
import { useLocation } from "react-router-dom";

export default function OTPForm() {
  const { t } = useTranslation();

  const length = 4;
  const otpFields = ["OTP0", "OTP1", "OTP2", "OTP3"] as const;
  const [OTPValues, setOTPValues] = useState(Array(length).fill(""));

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const location = useLocation();
  const email = location.state?.email;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    if (!/^\d?$/.test(e.target.value)) return;
    const OTP = [...OTPValues];
    OTP[i] = e.target.value;
    setOTPValues(OTP);
    if (i < length - 1 && e.target.value) {
      inputs.current[i + 1]?.focus();
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace" && !OTPValues[i] && i > 0) {
      const OTP = [...OTPValues];
      OTP[i - 1] = "";
      setOTPValues(OTP);
      inputs.current[i - 1]?.focus();
    }
  };

  const { register, handleSubmit } = useForm<OTPFormData>();
  const { mutate: sendOTP, isError, isPending, error } = useOTP();

  const onSubmit = (data: OTPFormData) => {
    const { OTP0, OTP1, OTP2, OTP3 } = data;
    sendOTP({ code: OTP0 + OTP1 + OTP2 + OTP3, email: email });
  };

  return (
    <div className="mt-40">
      <h2 className="font-bold text-[28px]">{t("otp.title")}</h2>
      <p className="text-muted-foreground">{t("otp.subtitle")}</p>
      <p className="font-bold mb-20">
        <bdi>{email}</bdi>
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div dir="ltr" className="flex gap-2 mb-10">
          {otpFields.map((field, i) => {
            const { onChange, ref, ...rest } = register(field);
            return (
              <input
                type="text"
                className="border border-border w-12 h-12 bg-surface-raised text-foreground rounded-xl flex text-center text-2xl font-bold"
                inputMode="numeric"
                maxLength={1}
                key={i}
                aria-label={t("otp.digit", { number: i + 1 })}
                {...rest}
                onChange={(e) => {
                  onChange(e);
                  handleChange(e, i);
                }}
                ref={(element) => {
                  ref(element);
                  inputs.current[i] = element;
                }}
                value={OTPValues[i]}
                onKeyDown={(e) => handleOnKeyDown(e, i)}
              />
            );
          })}
        </div>

        <button className="bg-linear-to-br rtl:bg-linear-to-bl from-brand to-brand-strong w-full text-white h-11.5 font-semibold rounded-xl">
          {isPending ? t("otp.sending") : t("otp.verify")}
        </button>
      </form>

      {isError && (
        <p className="text-red-500">{error?.message || t("otp.errors.generic")}</p>
      )}

      <p>
        {t("otp.noCode")}{" "}
        <button type="button" className="text-brand font-semibold cursor-pointer">
          {t("otp.resend")}
        </button>
      </p>
    </div>
  );
}