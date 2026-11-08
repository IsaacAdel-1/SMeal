import { CheckCircle2, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ActiveSessionType } from "@/modules/home/types";
import SessionStatusBadge from "@/shared/session/SessionStatusBadge";
import { SessionStatus } from "@/shared/session/sessionStatus";
import { formatDateTime } from "@/lib/format";

export default function SessionBanner({ session, hasOrder }: { session: ActiveSessionType; hasOrder: boolean }) {
  const { t } = useTranslation();
  const isOpen = session.status === SessionStatus.Open;

  return (
    <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-info/30 bg-info/5 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <Users className="mt-0.5 size-5 shrink-0 text-info" />
        <div className="min-w-0">
          <p className="font-semibold text-foreground">
            {session.currentUserIsOwner
              ? t("sessionBanner.yourSession")
              : t("sessionBanner.hostedBy", { name: session.ownerName })}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("activeSession.joining", { count: session.participantCount })}
            {isOpen && ` • ${t("sessionBanner.closesAt", { time: formatDateTime(session.expectedClosedAt) })}`}
          </p>
          {!session.currentUserIsOwner && isOpen && !hasOrder && (
            <p className="mt-1 text-sm text-info">{t("sessionBanner.joinHint")}</p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {hasOrder && !session.currentUserIsOwner && (
          <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
            <CheckCircle2 className="size-3.5" /> {t("sessionBanner.youJoined")}
          </span>
        )}
        <SessionStatusBadge status={session.status} />
      </div>
    </div>
  );
}
