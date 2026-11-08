import { useTranslation } from "react-i18next";
import { useAuth } from "@/modules/auth/context/AuthContext";

/** The API has no endpoint for editing the profile, so the details are shown read-only. */
export default function PersonalDetails() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const fields = [
    { key: "firstName", value: user?.firstName },
    { key: "lastName", value: user?.lastName },
    { key: "email", value: user?.email, ltr: true },
    { key: "phone", value: user?.phoneNumber, ltr: true },
  ];

  return (
    <div className="flex w-full flex-col gap-4">
      {fields.map((field) => (
        <div key={field.key} className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-muted-foreground">{t(`personalDetails.${field.key}`)}</span>
          <p
            dir={field.ltr ? "ltr" : undefined}
            className="rounded-xl bg-surface-raised px-4 py-3 text-start break-all text-foreground"
          >
            {field.value || "—"}
          </p>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">{t("personalDetails.readOnlyNote")}</p>
    </div>
  );
}
