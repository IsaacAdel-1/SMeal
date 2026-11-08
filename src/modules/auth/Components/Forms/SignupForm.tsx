import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone } from "lucide-react";
import LockIcon from "../../../../assets/svgs/LockIcon";
import MailIcon from "../../../../assets/svgs/MailIcon";
import UserIcon from "../../../../assets/svgs/UserIcon";
import CustomInput from "../CustomInput";
import { useRegister } from "../../hooks/useAuthMutations";
import { AUTH_LINK, AUTH_TITLE, PRIMARY_BUTTON } from "../styles";

const createSignupSchema = (t: TFunction) =>
  z.object({
    firstName: z.string().trim().min(2, t("signup.errors.firstNameMin")),
    lastName: z.string().trim().min(2, t("signup.errors.lastNameMin")),
    email: z.email(t("signup.errors.emailInvalid")),
    phoneNumber: z.string().regex(/^01\d{9}$/, t("signup.errors.phoneInvalid")),
    password: z.string().min(8, t("signup.errors.passwordMin")),
    termsAndConditions: z.boolean().refine((value) => value, {
      message: t("signup.errors.termsRequired"),
    }),
  });

type SignupData = z.infer<ReturnType<typeof createSignupSchema>>;

export default function SignupForm() {
  const { t } = useTranslation();
  const schema = useMemo(() => createSignupSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({ resolver: zodResolver(schema), defaultValues: { termsAndConditions: false } });
  const { mutate: registerUser, isPending, error } = useRegister();

  const onSubmit = ({ termsAndConditions: _accepted, ...data }: SignupData) => registerUser(data);

  return (
    <div className="py-12">
      <h2 className={AUTH_TITLE}>{t("signup.title")}</h2>
      <p className="text-muted-foreground">{t("signup.subtitle")}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-3" noValidate>
        <div className="grid gap-3 sm:grid-cols-2">
          <CustomInput
            label={t("signup.firstName")}
            icon={<UserIcon />}
            autoComplete="given-name"
            error={errors.firstName?.message}
            {...register("firstName")}
          />
          <CustomInput
            label={t("signup.lastName")}
            icon={<UserIcon />}
            autoComplete="family-name"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>
        <CustomInput
          label={t("signup.email")}
          icon={<MailIcon />}
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <CustomInput
          label={t("signup.phone")}
          icon={<Phone />}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          dir="ltr"
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />
        <CustomInput
          label={t("signup.password")}
          icon={<LockIcon />}
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <div>
          <label htmlFor="termsAndConditions" className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="size-4 accent-brand"
              id="termsAndConditions"
              {...register("termsAndConditions")}
            />
            {t("signup.acceptTerms")}
          </label>
          {errors.termsAndConditions && (
            <p className="mt-1.5 text-sm text-destructive">{errors.termsAndConditions.message}</p>
          )}
        </div>

        <button className={PRIMARY_BUTTON} type="submit" disabled={isPending}>
          {isPending ? t("signup.submitting") : t("signup.submit")}
        </button>

        {error && (
          <p role="alert" className="text-sm whitespace-pre-line text-destructive">
            {error.message}
          </p>
        )}

        <p>
          {t("signup.haveAccount")}{" "}
          <Link className={AUTH_LINK} to="/login">
            {t("signup.signIn")}
          </Link>
        </p>
      </form>
    </div>
  );
}
