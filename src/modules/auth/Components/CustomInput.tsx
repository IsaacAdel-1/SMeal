import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export interface CustomInputProps extends Omit<ComponentProps<"input">, "placeholder"> {
  label: string;
  icon: ReactNode;
  error?: string;
}

export default function CustomInput({
  label,
  icon,
  type = "text",
  error,
  id,
  className,
  ...inputProps
}: CustomInputProps) {
  const { t } = useTranslation();
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={cn("w-full", className)}>
      <div className="relative w-full">
        <input
          {...inputProps}
          id={inputId}
          type={inputType}
          placeholder=" "
          aria-invalid={!!error || undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "peer h-14 w-full rounded-xl border bg-card ps-10 pt-5 pb-1 text-start text-card-foreground outline-none transition-colors",
            "focus:border-brand focus:ring-2 focus:ring-brand/20",
            "autofill:shadow-[inset_0_0_0_1000px_var(--card)] autofill:[-webkit-text-fill-color:var(--card-foreground)]",
            isPassword ? "pe-10" : "pe-3",
            error ? "border-destructive" : "border-border",
          )}
        />

        <label
          htmlFor={inputId}
          className="pointer-events-none absolute start-10 top-1/2 z-10 -translate-y-1/2 text-sm text-muted-foreground transition-all
            peer-focus:top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-brand
            peer-autofill:top-3.5 peer-autofill:text-xs peer-autofill:font-bold
            peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-bold"
        >
          {label}
        </label>

        <div className="pointer-events-none absolute start-3 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center text-muted-foreground peer-focus:text-brand [&_svg]:size-5">
          {icon}
        </div>

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? t("common.hidePassword") : t("common.showPassword")}
            className="absolute end-3 top-1/2 size-5 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-brand"
          >
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
