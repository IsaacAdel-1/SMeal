import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import LockIcon from "../../../../assets/svgs/LockIcon";
import MailIcon from "../../../../assets/svgs/MailIcon";
import CustomInput from "../CustomInput";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const createLoginSchema = (t: TFunction) =>
  z.object({
    email: z.email(t("login.errors.emailInvalid")),
    password: z.string().min(8, t("login.errors.passwordMin")),
  });

type LoginData = z.infer<ReturnType<typeof createLoginSchema>>;

export default function LoginForm() {
  const { t } = useTranslation();
  const schema = useMemo(() => createLoginSchema(t), [t]);

  const Mail = <MailIcon />;
  const Lock = <LockIcon />;

  const { mutate, isPending , error} = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: LoginData) => {
    mutate(data);
  };

  return (
    <div className="mt-45">
      <h2 className="font-bold text-[28px]">{t("login.title")}</h2>
      <p className="text-muted-foreground">{t("login.subtitle")}</p>

      <form className="flex flex-col gap-3 mt-10" onSubmit={handleSubmit(onSubmit)}>
        <CustomInput label={t("login.email")} icon={Mail} {...register("email")} />
        {errors.email?.message && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}

        <CustomInput label={t("login.password")} icon={Lock} {...register("password")} type="password"/>
        {errors.password?.message && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}

        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <input id="remember" type="checkbox" className="accent-brand size-4" />
            <label htmlFor="remember">{t("login.rememberMe")}</label>
          </div>

          <Link className="text-brand text-sm font-bold cursor-pointer" to={"/forget-password"}>
            {t("login.forgotPassword")}
          </Link>
        </div>

        <button
          type="submit"
          className="bg-linear-to-br rtl:bg-linear-to-bl from-brand to-brand-strong w-full text-white h-11.5 font-semibold rounded-xl"
          disabled={isPending}
        >
          {isPending ? t("login.signingIn") : t("login.signIn")}
        </button>

        <p>
          {t("login.noAccount")}{" "}
          <Link className="text-brand font-semibold cursor-pointer" to={"/signup"}>
            {t("login.signUp")}
          </Link>
        </p>
        {error && <p className="text-sm text-destructive">{error.message}</p>} 
      </form>
    </div>
  );
}