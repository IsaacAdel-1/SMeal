import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailCheck } from "lucide-react";
import MailIcon from "../../../../assets/svgs/MailIcon";
import CustomInput from "../CustomInput";
import { useForgetPassword } from "../../hooks/useAuthMutations";
import { AUTH_LINK, AUTH_TITLE, PRIMARY_BUTTON } from "../styles";

const createForgetPasswordSchema = (t: TFunction) =>
  z.object({
    email: z.email(t("forgetPassword.errors.emailInvalid")),
  });

type ForgetPasswordData = z.infer<ReturnType<typeof createForgetPasswordSchema>>;

export default function ForgetPassword() {
  const { t } = useTranslation();
  const schema = useMemo(() => createForgetPasswordSchema(t), [t]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgetPasswordData>({ resolver: zodResolver(schema) });

  const { mutate: forgetPassword, isPending, isSuccess, error } = useForgetPassword();

  return (
    <div className="py-16 md:py-24">
      <h2 className={AUTH_TITLE}>{t("forgetPassword.title")}</h2>
      <p className="mb-10 text-muted-foreground">{t("forgetPassword.subtitle")}</p>

      {isSuccess ? (
        <div role="status" className="flex gap-3 rounded-2xl border border-success/30 bg-success/10 p-4">
          <MailCheck className="size-6 shrink-0 text-success" />
          <p>
            {t("forgetPassword.success")} <bdi className="font-semibold">{getValues("email")}</bdi>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit((data) => forgetPassword(data))} noValidate>
          <CustomInput
            icon={<MailIcon />}
            type="email"
            autoComplete="email"
            label={t("forgetPassword.email")}
            error={errors.email?.message}
            {...register("email")}
          />

          <button type="submit" disabled={isPending} className={`${PRIMARY_BUTTON} mt-6`}>
            {isPending ? t("forgetPassword.sending") : t("forgetPassword.submit")}
          </button>

          {error && (
            <p role="alert" className="mt-3 text-sm whitespace-pre-line text-destructive">
              {error.message}
            </p>
          )}
        </form>
      )}

      <p className="mt-6">
        {t("forgetPassword.backTo")}{" "}
        <Link className={AUTH_LINK} to="/login">
          {t("forgetPassword.signIn")}
        </Link>
      </p>
    </div>
  );
}
