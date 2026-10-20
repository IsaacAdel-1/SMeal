import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import MailIcon from "../../../../assets/svgs/MailIcon";
import CustomInput from "../CustomInput";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useForgetPassword from "../../hooks/useForgetPassword";

const createForgetPasswordSchema = (t: TFunction) =>
  z.object({
    email: z.email(t("forgetPassword.errors.emailInvalid")),
  });

type ForgetPasswordData = z.infer<ReturnType<typeof createForgetPasswordSchema>>;

export default function ForgetPassword() {
  const { t } = useTranslation();
  const schema = useMemo(() => createForgetPasswordSchema(t), [t]);

  const Mail = <MailIcon />;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordData>({ resolver: zodResolver(schema) });

  const { mutate: forgetPassword, isPending } = useForgetPassword();

  const onSubmit = (data: ForgetPasswordData) => {
    forgetPassword(data);
  };

  return (
    <div className="mt-40">
      <h2 className="font-bold text-[28px]">{t("forgetPassword.title")}</h2>
      <p className="text-muted-foreground mb-10">{t("forgetPassword.subtitle")}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          icon={Mail}
          label={t("forgetPassword.email")}
          {...register("email")}
        />

        {errors.email?.message && (
          <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="bg-linear-to-br rtl:bg-linear-to-bl from-brand to-brand-strong w-full text-white h-11.5 font-semibold rounded-xl mt-6"
        >
          {isPending ? t("forgetPassword.sending") : t("forgetPassword.submit")}
        </button>
      </form>
    </div>
  );
}