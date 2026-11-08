import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LockIcon from "../../../../assets/svgs/LockIcon";
import MailIcon from "../../../../assets/svgs/MailIcon";
import CustomInput from "../CustomInput";
import { useLogin } from "../../hooks/useAuthMutations";
import { AUTH_LINK, AUTH_TITLE, PRIMARY_BUTTON } from "../styles";

const createLoginSchema = (t: TFunction) =>
  z.object({
    email: z.email(t("login.errors.emailInvalid")),
    password: z.string().min(8, t("login.errors.passwordMin")),
  });

type LoginData = z.infer<ReturnType<typeof createLoginSchema>>;

export default function LoginForm() {
  const { t } = useTranslation();
  const schema = useMemo(() => createLoginSchema(t), [t]);
  const [remember, setRemember] = useState(true);

  const { mutate, isPending, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: LoginData) => mutate({ ...data, remember });

  return (
    <div className="py-16 md:py-24">
      <h2 className={AUTH_TITLE}>{t("login.title")}</h2>
      <p className="text-muted-foreground">{t("login.subtitle")}</p>

      <form className="mt-10 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} noValidate>
        <CustomInput
          label={t("login.email")}
          icon={<MailIcon />}
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <CustomInput
          label={t("login.password")}
          icon={<LockIcon />}
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="remember" className="flex cursor-pointer items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              className="size-4 accent-brand"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            {t("login.rememberMe")}
          </label>

          <Link className="text-sm font-bold text-brand hover:underline" to="/forget-password">
            {t("login.forgotPassword")}
          </Link>
        </div>

        <button type="submit" className={PRIMARY_BUTTON} disabled={isPending}>
          {isPending ? t("login.signingIn") : t("login.signIn")}
        </button>

        {error && (
          <p role="alert" className="text-sm whitespace-pre-line text-destructive">
            {error.message}
          </p>
        )}

        <p>
          {t("login.noAccount")}{" "}
          <Link className={AUTH_LINK} to="/signup">
            {t("login.signUp")}
          </Link>
        </p>
      </form>
    </div>
  );
}
