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

export default function CustomInput({
  label,
  icon,
  type = "text",
  onChange,
  ...inputProps
}: CustomInputProps) {
  const [InputFocus, setInputFocus] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) setInputFocus(true);
    setHasValue(!!value);
    onChange(e);
  };

  return (
    <div
      className="relative w-full"
      onFocus={() => setInputFocus(true)}
      onBlur={() => setInputFocus(false)}
    >
      <label
        className={`pointer-events-none absolute left-10 ${InputFocus || hasValue ? "top-0 text-brand text-[12px] font-bold" : "top-1/2 -translate-y-1/2 text-muted-foreground text-[14px]"}`}
      >
        {label}
      </label>

      <div
        className={`pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 size-5 ${InputFocus ? "text-brand" : "text-muted-foreground"}`}
      >
        {icon}
      </div>

      <input
        className={`px-10 pt-4 pb-1 rounded-xl w-full placeholder:hidden outline-0 border border-border bg-card text-card-foreground max-[620px]:py-2 ${InputFocus || hasValue ? "" : "placeholder:text-muted-foreground"}`}
        type={inputType}
        {...inputProps}
        onChange={handleChange}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground hover:text-brand cursor-pointer"
        >
          {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      )}
    </div>
  );
}