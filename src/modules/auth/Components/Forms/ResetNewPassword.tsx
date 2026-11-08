import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LockIcon from "../../../../assets/svgs/LockIcon";
import CustomInput from "../CustomInput";
import { useResetNewPassword } from "../../hooks/useAuthMutations";
import { AUTH_LINK, AUTH_TITLE, PRIMARY_BUTTON } from "../styles";

// Messages are translation keys so they follow the active language.
const schema = z
  .object({
    newPassword: z.string().min(8, "setNewPassword.errors.passwordMin"),
    confirmPassword: z.string().min(1, "setNewPassword.errors.confirmRequired"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "setNewPassword.errors.mismatch",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function SetNewPasswordForm() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { mutate: resetPassword, isPending, error } = useResetNewPassword();

  if (!userId || !token) {
    return (
      <div className="py-16 md:py-24">
        <h2 className={AUTH_TITLE}>{t("setNewPassword.title")}</h2>
        <p role="alert" className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          {t("setNewPassword.errors.invalidLink")}
        </p>
        <Link className={`${AUTH_LINK} mt-6 inline-block`} to="/forget-password">
          {t("setNewPassword.requestNewLink")}
        </Link>
      </div>
    );
  }

  const onSubmit = (data: FormData) => resetPassword({ userId, token, newPassword: data.newPassword });

  return (
    <div className="py-16 md:py-24">
      <h2 className={AUTH_TITLE}>{t("setNewPassword.title")}</h2>
      <p className="text-muted-foreground">{t("setNewPassword.subtitle")}</p>

      <form className="mt-10 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} noValidate>
        <CustomInput
          label={t("setNewPassword.password")}
          icon={<LockIcon />}
          type="password"
          autoComplete="new-password"
          error={errors.newPassword?.message && t(errors.newPassword.message)}
          {...register("newPassword")}
        />

        <CustomInput
          label={t("setNewPassword.confirmPassword")}
          icon={<LockIcon />}
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message && t(errors.confirmPassword.message)}
          {...register("confirmPassword")}
        />

        <button type="submit" className={PRIMARY_BUTTON} disabled={isPending}>
          {isPending ? t("setNewPassword.saving") : t("setNewPassword.save")}
        </button>
        {error && (
          <p role="alert" className="text-sm whitespace-pre-line text-destructive">
            {error.message}
          </p>
        )}
        <p>
          {t("setNewPassword.backTo")}{" "}
          <Link className={AUTH_LINK} to="/login">
            {t("setNewPassword.signIn")}
          </Link>
        </p>
      </form>
    </div>
  );
}
