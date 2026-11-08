import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import photo from "../../../assets/images/sm_logo.png";
import BowlIcon from "../../../assets/svgs/BowlIcon";

function CheckSpan() {
  return (
    <span className="bg-surface-raised rounded-full w-6 h-6 p-1 flex items-center justify-center shrink-0">
      <Check className="text-brand" />
    </span>
  );
}

export default function AuthBranding() {
  const { t } = useTranslation();

  const features = [
    t("authBranding.features.fresh"),
    t("authBranding.features.flexible"),
    t("authBranding.features.nutrition"),
  ];

  return (
    <div className="relative w-full overflow-hidden border-e border-border bg-surface px-12.5 py-8 text-foreground">
      <header className="mb-15">
        <img src={photo} alt="sMeals" className="w-12 h-12" />
        <h2 dir="ltr" className="font-extrabold text-2xl text-brand text-start">
          <span className="text-foreground">S</span>Meals
        </h2>
      </header>

      <div>
        <h1 className="font-extrabold text-4xl mb-8">{t("authBranding.title")}</h1>
        <p>{t("authBranding.description")}</p>
      </div>

      <ul className="flex flex-col gap-4 mt-10 relative z-10">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <CheckSpan /> {feature}
          </li>
        ))}
      </ul>

      <div className="mt-20 text-[12px] text-muted-foreground z-10 relative">
        {t("authBranding.copyright")}
      </div>

      <div aria-hidden="true" className="absolute -bottom-10 -inset-s-12 w-50 h-50 z-1 bg-surface-raised rounded-full p-10">
        <BowlIcon />
      </div>
    </div>
  );
}