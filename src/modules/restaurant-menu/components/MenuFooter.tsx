import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export type FooterButton = {
  key: string;
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  disabled?: boolean;
  /** Gradient classes for the primary button; secondary buttons are outlined. */
  style?: string;
  primary?: boolean;
};

interface MenuFooterProps {
  itemsCount: number;
  total: number;
  hint?: string | null;
  buttons: FooterButton[];
  loading?: boolean;
}

const SECONDARY =
  "flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface-control px-4 py-3 text-sm font-semibold text-foreground hover:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-50";
const PRIMARY =
  "flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-4 rtl:bg-linear-to-l";

export default function MenuFooter({ itemsCount, total, hint, buttons, loading = false }: MenuFooterProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 border-t border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5">
      <div className="min-w-0">
        <div className="flex items-center gap-3 text-sm sm:gap-4">
          <span className="truncate text-muted-foreground">{t("footer.itemsSelected", { count: itemsCount })}</span>
          <span className="size-1 shrink-0 rounded-full bg-surface-control" />
          <span className="shrink-0 font-bold text-foreground">{t("footer.totalPrice", { total: total.toFixed(2) })}</span>
        </div>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </div>

      {!loading && buttons.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          {buttons.map(({ key, label, onClick, icon: Icon, disabled, style, primary }) => (
            <button
              key={key}
              type="button"
              onClick={onClick}
              disabled={disabled}
              className={primary ? `${PRIMARY} flex-1 sm:flex-none ${style ?? ""}` : SECONDARY}
            >
              {Icon && <Icon className="size-4" />}
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
