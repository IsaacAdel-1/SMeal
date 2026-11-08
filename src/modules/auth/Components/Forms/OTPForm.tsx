import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation } from "react-router-dom";
import { useResendCode, useVerifyEmail } from "../../hooks/useAuthMutations";
import { AUTH_TITLE, PRIMARY_BUTTON } from "../styles";

const LENGTH = 4;
const emptyCode = () => Array<string>(LENGTH).fill("");

export default function OTPForm() {
  const { t } = useTranslation();
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email;

  const [digits, setDigits] = useState<string[]>(emptyCode);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate: verify, isPending, error } = useVerifyEmail();
  const {
    mutate: resend,
    isPending: isResending,
    isSuccess: resent,
    error: resendError,
  } = useResendCode();

  if (!email) return <Navigate to="/signup" replace />;

  const code = digits.join("");
  const isComplete = code.length === LENGTH;

  const fillFrom = (index: number, value: string) => {
    const chars = value.replace(/\D/g, "").slice(0, LENGTH - index).split("");
    if (!chars.length) return;
    const next = [...digits];
    chars.forEach((char, offset) => (next[index + offset] = char));
    setDigits(next);
    inputs.current[Math.min(index + chars.length, LENGTH - 1)]?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) {
      const next = [...digits];
      next[i] = "";
      setDigits(next);
      return;
    }
    // Empty box, autofill or a pasted code: spread the digits forward.
    if (value.length > 2 || !digits[i]) return fillFrom(i, value);
    // Typing into a filled box keeps the newly typed digit.
    fillFrom(i, value.replace(digits[i], "") || digits[i]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      const next = [...digits];
      next[i - 1] = "";
      setDigits(next);
      inputs.current[i - 1]?.focus();
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) verify({ email, code });
  };

  return (
    <div className="py-16 md:py-24">
      <h2 className={AUTH_TITLE}>{t("otp.title")}</h2>
      <p className="text-muted-foreground">{t("otp.subtitle")}</p>
      <p className="mb-12 font-bold">
        <bdi>{email}</bdi>
      </p>

      <form onSubmit={onSubmit}>
        <div dir="ltr" className="mb-10 flex gap-2">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(element) => {
                inputs.current[i] = element;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={LENGTH}
              aria-label={t("otp.digit", { number: i + 1 })}
              className="flex size-12 rounded-xl border border-border bg-surface-raised text-center text-2xl font-bold text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              value={digit}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={(e) => {
                e.preventDefault();
                fillFrom(i, e.clipboardData.getData("text"));
              }}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>

        <button type="submit" className={PRIMARY_BUTTON} disabled={!isComplete || isPending}>
          {isPending ? t("otp.sending") : t("otp.verify")}
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-3 text-sm whitespace-pre-line text-destructive">
          {error.message || t("otp.errors.generic")}
        </p>
      )}

      <div className="mt-4">
        <p>
          {t("otp.noCode")}{" "}
          <button
            type="button"
            disabled={isResending}
            onClick={() => resend({ email }, { onSuccess: () => setDigits(emptyCode()) })}
            className="cursor-pointer font-semibold text-brand disabled:opacity-60"
          >
            {isResending ? t("otp.resending") : t("otp.resend")}
          </button>
        </p>

        {resent && <p className="mt-1 text-sm text-success">{t("otp.resent")}</p>}
        {resendError && <p className="mt-1 text-sm text-destructive">{resendError.message}</p>}
      </div>
    </div>
  );
}
