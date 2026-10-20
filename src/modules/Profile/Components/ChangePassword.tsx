import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TFunction } from "i18next";
import z from "zod";
import { Lock, ShieldCheck, KeyRound } from "lucide-react";
import CustomInput from "@/modules/auth/Components/CustomInput";
import useChangePassword from "../hooks/useChangePassword";

const createSchema = (t: TFunction) =>
  z
    .object({
      currentPassword: z.string().min(8, t("changePassword.errors.passwordMin")),
      newPassword: z.string().min(8, t("changePassword.errors.passwordMin")),
      confirmNewPassword: z.string().min(8, t("changePassword.errors.passwordMin")),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t("changePassword.errors.passwordsMismatch"),
      path: ["confirmNewPassword"],
    });

type ChangePasswordForm = z.infer<ReturnType<typeof createSchema>>;

export default function ChangePassword() {
  const { t } = useTranslation();
  const schema = useMemo(() => createSchema(t), [t]);

  const LockIcon = <Lock />;
  const KeyRoundIcon = <KeyRound />;
  const ShieldCheckIcon = <ShieldCheck />;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({ resolver: zodResolver(schema) });

  const { mutate: changePassword, isPending, isSuccess, error } = useChangePassword();

  const onSubmit = ({ currentPassword, newPassword }: ChangePasswordForm) => {
    changePassword(
      { currentPassword, newPassword },
      { onSuccess: () => reset() }
    );
  };

  return (
    <div>
      <p className="text-xl font-semibold">{t("changePassword.description")}</p>

      <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <CustomInput
            label={t("changePassword.currentPassword")}
            type="password"
            icon={LockIcon}
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-2">{errors.currentPassword.message}</p>
          )}
        </div>

        <div>
          <CustomInput
            label={t("changePassword.newPassword")}
            type="password"
            icon={ShieldCheckIcon}
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-2">{errors.newPassword.message}</p>
          )}
        </div>

        <div>
          <CustomInput
            label={t("changePassword.confirmNewPassword")}
            type="password"
            icon={KeyRoundIcon}
            {...register("confirmNewPassword")}
          />
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm mt-2">{errors.confirmNewPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-linear-to-br rtl:bg-linear-to-bl from-brand to-brand-strong w-full text-white h-11.5 font-semibold rounded-xl mt-2 disabled:opacity-60"
        >
          {isPending ? t("changePassword.submitting") : t("changePassword.submit")}
        </button>

        {isSuccess && (
          <p className="text-green-600 text-sm">{t("changePassword.success")}</p>
        )}

        {error && <p className="text-red-500 text-sm">{error.message}</p>}
      </form>
    </div>
  );
}