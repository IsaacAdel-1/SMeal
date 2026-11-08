import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { SessionStatus, getSessionStatusLabel } from "./sessionStatus";

const TONES: Record<number, string> = {
  [SessionStatus.Open]: "border-success/30 bg-success/10 text-success",
  [SessionStatus.Closed]: "border-info/30 bg-info/10 text-info",
  [SessionStatus.Ordered]: "border-brand/30 bg-brand/10 text-brand",
  [SessionStatus.Arrived]: "border-success/30 bg-success/10 text-success",
  [SessionStatus.InvoiceReady]: "border-brand/30 bg-brand/10 text-brand",
  [SessionStatus.Completed]: "border-border bg-surface-raised text-muted-foreground",
};

export default function SessionStatusBadge({ status, className }: { status: number; className?: string }) {
  const { t } = useTranslation();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap",
        TONES[status] ?? TONES[SessionStatus.Completed],
        className,
      )}
    >
      {t(`sessionStatus.${status}`, { defaultValue: getSessionStatusLabel(status) })}
    </span>
  );
}
