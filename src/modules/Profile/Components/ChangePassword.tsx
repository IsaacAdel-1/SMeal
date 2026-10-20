
import CustomInput from "@/modules/auth/Components/CustomInput";
import { Lock, ShieldCheck, KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function ChangePassword() {
  const { t } = useTranslation();

  const LockIcon = <Lock />;
  const KeyRoundIcon = <KeyRound />;
  const ShieldCheckIcon = <ShieldCheck />;

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
