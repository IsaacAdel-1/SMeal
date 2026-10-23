import { MdOutlineAccessTime } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Lamb from "./Lamb";
import type { ActiveSessionType } from "../../types";
import useSessionAction from "@/modules/restaurant-menu/hooks/useSessionAction";
import { getAction } from "../../hooks/useSessionPrimaryAction";

const parseUtc = (date: string) => {
  const hasZone = /Z|[+-]\d{2}:?\d{2}$/.test(date);
  const trimmed = date.replace(/(\.\d{3})\d+/, "$1");
  return new Date(hasZone ? trimmed : `${trimmed}Z`);
};

const getRemaining = (end: string) =>
  Math.max(0, Math.floor((parseUtc(end).getTime() - Date.now()) / 1000));

const pad = (n: number) => String(n).padStart(2, "0");

export default function ActiveSession({ session }: { session: ActiveSessionType }) {
  const { t } = useTranslation();
  const {
    sessionId,
    restaurantName,
    ownerName,
    participantCount,
    expectedClosedAt,
    currentUserIsOwner,
  } = session;

  const [totalSeconds, setTotalSeconds] = useState(() => getRemaining(expectedClosedAt));
  const { mutate, isPending } = useSessionAction();

  useEffect(() => {
    if (session.status !== 0) return;

    const id = setInterval(() => {
      const remaining = getRemaining(expectedClosedAt);
      setTotalSeconds(remaining);

      if (remaining === 0) {
        clearInterval(id);

        if (currentUserIsOwner) {
          mutate({ sessionId, action: "close" });
        }
      }
    }, 1000);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expectedClosedAt, session.status]);

  const displaySeconds = session.status === 0 ? totalSeconds : 0;
  const hours = Math.floor(displaySeconds / 3600);
  const minutes = Math.floor((displaySeconds % 3600) / 60);
  const seconds = displaySeconds % 60;

  const action = getAction({
    t,
    session,
    onCreateSession: () => {},
    onJoinSession: () => {},
    onSessionAction: (a) => mutate({ sessionId, action: a }),
  });
  const Icon = action?.icon;

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <header className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 rounded-2xl border border-success/30 bg-success/10 px-2 py-1 font-semibold leading-none text-success">
          <Lamb /> {t("activeSession.active")}
        </p>

        <p className="flex items-center gap-1 rounded-2xl border border-brand/30 bg-brand/10 px-2 py-0.75 text-brand">
          <MdOutlineAccessTime className="size-4" />
          <span dir="ltr">
            {pad(hours)}:{pad(minutes)}:{pad(seconds)}
          </span>
        </p>
      </header>

      <div>
        <p className="text-xl font-bold text-card-foreground">{restaurantName}</p>
        <p className="flex items-center gap-1 text-info">
          <FaUserShield className="size-4 text-brand" />
          {t("activeSession.host")}: <bdi>{ownerName}</bdi>
          {currentUserIsOwner && ` (${t("activeSession.you")})`} •{" "}
          {t("activeSession.joining", { count: participantCount })}
        </p>
      </div>

      {currentUserIsOwner && action && Icon && (
        <div>
          <div className="my-4 h-px w-full bg-border" />
          <button
            className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r rtl:bg-linear-to-l font-bold text-white ${action.style}`}
            onClick={action.onClick}
            disabled={isPending}
          >
            <Icon className="size-4" />
            {action.label}
          </button>
        </div>
      )}
    </div>
  );
}