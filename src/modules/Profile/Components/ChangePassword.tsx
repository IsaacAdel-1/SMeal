import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TFunction } from "i18next";
import z from "zod";
import { toast } from "sonner";
import { KeyRound, Lock, ShieldCheck } from "lucide-react";
import CustomInput from "@/modules/auth/Components/CustomInput";
import { PRIMARY_BUTTON } from "@/modules/auth/Components/styles";
import { changePassword } from "../Services/profile.service";

const createSchema = (t: TFunction) =>
  z
    .object({
      currentPassword: z.string().min(1, t("changePassword.errors.currentRequired")),
      newPassword: z.string().min(8, t("changePassword.errors.passwordMin")),
      confirmNewPassword: z.string().min(1, t("changePassword.errors.confirmRequired")),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t("changePassword.errors.passwordsMismatch"),
      path: ["confirmNewPassword"],
    })
    .refine((data) => data.newPassword !== data.currentPassword, {
      message: t("changePassword.errors.samePassword"),
      path: ["newPassword"],
    });

type ChangePasswordForm = z.infer<ReturnType<typeof createSchema>>;

export default function ChangePassword({ onDone }: { onDone?: () => void }) {
  const { t } = useTranslation();
  const schema = useMemo(() => createSchema(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({ resolver: zodResolver(schema) });

  const { mutate, isPending, error } = useMutation({
    mutationFn: changePassword,
    meta: { inlineError: true },
    onSuccess: () => {
      toast.success(t("changePassword.success"));
      reset();
      onDone?.();
    },
  });

  const onSubmit = ({ currentPassword, newPassword }: ChangePasswordForm) => mutate({ currentPassword, newPassword });

  return (
    <div className="w-full">
      <p className="text-muted-foreground">{t("changePassword.description")}</p>

      <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <CustomInput
          label={t("changePassword.currentPassword")}
          type="password"
          autoComplete="current-password"
          icon={<Lock />}
          error={errors.currentPassword?.message}
          {...register("currentPassword")}
        />
        <CustomInput
          label={t("changePassword.newPassword")}
          type="password"
          autoComplete="new-password"
          icon={<ShieldCheck />}
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />
        <CustomInput
          label={t("changePassword.confirmNewPassword")}
          type="password"
          autoComplete="new-password"
          icon={<KeyRound />}
          error={errors.confirmNewPassword?.message}
          {...register("confirmNewPassword")}
        />

        <button type="submit" disabled={isPending} className={`${PRIMARY_BUTTON} mt-2`}>
          {isPending ? t("changePassword.submitting") : t("changePassword.submit")}
        </button>

        {error && (
          <p role="alert" className="text-sm whitespace-pre-line text-destructive">
            {error.message}
          </p>
        )}
      </form>
    </div>
  );
}
