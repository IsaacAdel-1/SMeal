import { useEffect, useRef, useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { Eye, UserPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Lamb from "./Lamb";
import type { ActiveSessionType } from "../../types";
import { parseApiDate } from "@/lib/format";
import { resolveAssetUrl } from "@/lib/utils";
import { ACTION_STYLES, canCancelSession, getOwnerStep } from "@/shared/session/ownerActions";
import { SessionStatus } from "@/shared/session/sessionStatus";
import SessionStatusBadge from "@/shared/session/SessionStatusBadge";
import { useOwnerStep, useSessionAction } from "@/modules/restaurant-menu/hooks/useSessionMutations";

const getRemaining = (end: string) =>
  Math.max(0, Math.floor((parseApiDate(end).getTime() - Date.now()) / 1000));

const pad = (n: number) => String(n).padStart(2, "0");

const BUTTON =
  "flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 rtl:bg-linear-to-l";

export default function ActiveSession({ session }: { session: ActiveSessionType }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    sessionId,
    restaurantId,
    restaurantName,
    ownerName,
    participantCount,
    expectedClosedAt,
    currentUserIsOwner,
    currentUserOrderId,
    status,
    logoUrl,
  } = session;

  const isOpen = status === SessionStatus.Open;
  const [totalSeconds, setTotalSeconds] = useState(() => getRemaining(expectedClosedAt));
  const { run, isPending: stepPending } = useOwnerStep();
  const { mutate: sessionAction, isPending: actionPending } = useSessionAction();
  const isPending = stepPending || actionPending;
  const autoClosed = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    const tick = () => {
      const remaining = getRemaining(expectedClosedAt);
      setTotalSeconds(remaining);
      // When the timer runs out the host's browser closes the session for everyone.
      if (remaining === 0) {
        clearInterval(id);
        if (currentUserIsOwner && !autoClosed.current) {
          autoClosed.current = true;
          sessionAction({ sessionId, action: "close" });
        }
      }
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expectedClosedAt, isOpen, currentUserIsOwner, sessionId]);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const ownerStep = currentUserIsOwner ? getOwnerStep(status) : null;
  const OwnerIcon = ownerStep?.icon;
  const menuPath = `/restaurants/${restaurantId}`;
  const logo = resolveAssetUrl(logoUrl);

  return (
    <div className="h-full rounded-2xl border border-border bg-card p-6">
      <header className="flex flex-wrap items-center justify-between gap-2">
        {isOpen ? (
          <p className="flex items-center gap-1.5 rounded-2xl border border-success/30 bg-success/10 px-2 py-1 leading-none font-semibold text-success">
            <Lamb /> {t("activeSession.active")}
          </p>
        ) : (
          <SessionStatusBadge status={status} />
        )}

        {isOpen && (
          <p
            className="flex items-center gap-1 rounded-2xl border border-brand/30 bg-brand/10 px-2 py-0.75 text-brand"
            aria-label={t("activeSession.timeLeft")}
          >
            <MdOutlineAccessTime className="size-4" />
            <span dir="ltr" className="tabular-nums">
              {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </span>
          </p>
        )}
      </header>

      <div className="mt-4 flex items-center gap-3">
        {logo && <img src={logo} alt="" className="size-12 shrink-0 rounded-xl object-cover" />}
        <div className="min-w-0">
          <p className="truncate text-xl font-bold text-card-foreground">{restaurantName}</p>
          <p className="flex flex-wrap items-center gap-1 text-info">
            <FaUserShield className="size-4 text-brand" />
            {t("activeSession.host")}: <bdi>{ownerName}</bdi>
            {currentUserIsOwner && ` (${t("activeSession.you")})`} •{" "}
            {t("activeSession.joining", { count: participantCount })}
          </p>
        </div>
      </div>

      {(ownerStep || isOpen) && <div className="my-4 h-px w-full bg-border" />}

      {currentUserIsOwner ? (
        ownerStep &&
        OwnerIcon && (
          <div className="flex gap-2">
            {isOpen && (
              <button
                type="button"
                onClick={() => navigate(menuPath)}
                className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-surface-control px-4 text-sm font-semibold text-foreground hover:bg-surface-raised"
              >
                <Eye className="size-4" />
                {t("session.actions.viewOrder")}
              </button>
            )}
            <button
              type="button"
              className={`${BUTTON} ${ownerStep.style}`}
              onClick={() => run(sessionId, ownerStep.action)}
              disabled={isPending}
            >
              <OwnerIcon className="size-4" />
              {t(ownerStep.labelKey)}
            </button>
            {!isOpen && canCancelSession(status) && (
              <button
                type="button"
                onClick={() => run(sessionId, "cancel")}
                disabled={isPending}
                className="h-12 shrink-0 rounded-xl border border-border bg-surface-control px-4 text-sm font-semibold text-foreground hover:bg-surface-raised disabled:opacity-50"
              >
                {t("session.actions.cancel")}
              </button>
            )}
          </div>
        )
      ) : (
        isOpen && (
          <button
            type="button"
            className={`${BUTTON} ${currentUserOrderId ? ACTION_STYLES.green : ACTION_STYLES.blue}`}
            onClick={() => navigate(menuPath)}
          >
            {currentUserOrderId ? <Eye className="size-4" /> : <UserPlus className="size-4" />}
            {currentUserOrderId ? t("session.actions.viewOrder") : t("session.actions.join")}
          </button>
        )
      )}
    </div>
  );
}
