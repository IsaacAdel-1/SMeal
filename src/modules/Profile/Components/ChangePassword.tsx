
import CustomInput from "@/modules/auth/Components/CustomInput";
import { Lock, ShieldCheck, KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import z from "zod";

export default function ChangePassword() {
  const { t } = useTranslation();

  const LockIcon = <Lock />;
  const KeyRoundIcon = <KeyRound />;
  const ShieldCheckIcon = <ShieldCheck />;
  
  const schema = z.object({
    currentPassword : z.string().min(8 , "password should be less than 8 characters"),
    newPassword : z.string().min(8 , "password should be less than 8 characters"),
    confirmNewPassword : z.string().min(8 , "password should be less than 8 characters"),

  })
  const { register } = useForm();

  return (
    <div>
      <p>{t("changePassword.description")}</p>

      <div>
        <CustomInput
          label={t("changePassword.currentPassword")}
          type="password"
          icon={LockIcon}
          {...register("currentPassword")}
        />

        <CustomInput
          label={t("changePassword.newPassword")}
          type="password"
          icon={ShieldCheckIcon}
          {...register("newPassword")}
        />

        <CustomInput
          label={t("changePassword.confirmNewPassword")}
          type="password"
          icon={KeyRoundIcon}
          {...register("confirmNewPassword")}
        />
      </div>
    </div>
  );
}
