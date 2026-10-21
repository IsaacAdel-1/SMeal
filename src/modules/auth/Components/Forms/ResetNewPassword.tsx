import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import LockIcon from "../../../../assets/svgs/LockIcon";
import CustomInput from "../CustomInput";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import useResetNewPassword from "../../hooks/useResetNewPassword";

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
  const [searchParams] =useSearchParams()
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { mutate: ResetNewPassword, isPending, error } = useResetNewPassword();
  const onSubmit = (data: FormData) => {
    console.log("submit", { userId, token, data })
    if (!userId || !token) return;
    ResetNewPassword({userId , token , newPassword: data.newPassword })
  };

  if (!userId || !token) {
  return <p>{t("setNewPassword.errors.invalidLink")}</p>; 
}
  return (
    <div className="mt-45">
      <h2 className="font-bold text-[28px]">{t("setNewPassword.title")}</h2>
      <p className="text-muted-foreground">{t("setNewPassword.subtitle")}</p>

      <form className="flex flex-col gap-3 mt-10" onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label={t("setNewPassword.password")}
          icon={<LockIcon />}
          {...register("newPassword")}
          type="password"
        />
        {errors.newPassword?.message && (
          <p className="text-sm text-destructive">{t(errors.newPassword.message)}</p>
        )}

        <CustomInput
          label={t("setNewPassword.confirmPassword")}
          icon={<LockIcon />}
          {...register("confirmPassword")}
          type="password"
        />
        {errors.confirmPassword?.message && (
          <p className="text-sm text-destructive">{t(errors.confirmPassword.message)}</p>
        )}

        <button
          type="submit"
          className="bg-linear-to-br rtl:bg-linear-to-bl from-brand to-brand-strong w-full text-white h-11.5 font-semibold rounded-xl"
          disabled={isPending}
        >
          {t("setNewPassword.save")}
        </button>
        {error && <p className="text-sm text-destructive">{error.message}</p>}
        <p>
          {t("setNewPassword.backTo")}{" "}
          <Link className="text-brand font-semibold cursor-pointer" to={"/login"}>
            {t("setNewPassword.signIn")}
          </Link>
        </p>
      </form>
    </div>
  );
}