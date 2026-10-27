import { useState, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface CustomInputProps {
  label: string;
  icon: ReactNode;
  type?: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  ref: React.Ref<HTMLInputElement>;
}

const FLOAT =
  "top-1 bg-card px-1 text-[12px] font-bold text-brand";

export default function CustomInput({
  label,
  icon,
  type = "text",
  ...inputProps
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="relative w-full">
      <input
        {...inputProps}
        type={inputType}
        placeholder=" "
        className="peer h-14 w-full rounded-xl border border-border bg-card px-10 pt-4 text-start text-card-foreground outline-0
          autofill:shadow-[inset_0_0_0_1000px_var(--card)]
          autofill:[-webkit-text-fill-color:var(--card-foreground)]"
      />

      <label
        className={`pointer-events-none absolute start-10 top-1/3 z-10 -translate-y-1/2 text-[14px] text-muted-foreground transition-all
          peer-focus:${FLOAT.split(" ").join(" peer-focus:")}
          peer-autofill:${FLOAT.split(" ").join(" peer-autofill:")}
          peer-[:not(:placeholder-shown)]:${FLOAT.split(" ").join(" peer-[:not(:placeholder-shown)]:")}`}
      >
        {label}
      </label>

      <div className="pointer-events-none absolute start-2 top-1/2 size-5 -translate-y-1/2 text-muted-foreground peer-focus:text-brand">
        {icon}
      </div>

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute end-3 top-1/2 size-5 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-brand"
        >
          {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      )}
    </div>
  );
}