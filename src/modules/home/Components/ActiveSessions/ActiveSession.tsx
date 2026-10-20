import { MdOutlineAccessTime } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Lamb from "./Lamb";
import LockIcon from "../../../../assets/svgs/LockIcon";
import type { ActiveSessionType } from "../../types";
import useSessionAction from "@/modules/restaurant-menu/hooks/useSessionAction";

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

  useEffect(() => {
    const id = setInterval(() => {
      setTotalSeconds(getRemaining(expectedClosedAt));
    }, 1000);

    return () => clearInterval(id);
  }, [expectedClosedAt]);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const {mutate : ConfirmOrder , isPending : ConfirmPending}= useSessionAction()
  const {mutate : Order , isPending : OrderPending }= useSessionAction()
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

      {currentUserIsOwner  && session.status === 0 && (
        <div>
          <div className="my-4 h-px w-full bg-border" />
          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r rtl:bg-linear-to-l from-brand to-brand-strong font-bold text-white shadow-[0_8px_24px_rgba(255,59,48,0.35)]"
            onClick={()=>{ConfirmOrder({sessionId , action : "close"})}}
            disabled={ConfirmPending}
          >
            <LockIcon className="size-4" />
            {t("activeSession.confirmOrder")}
          </button>
        </div>
      )}

      {currentUserIsOwner  && session.status === 1 && (
        <div>
          <div className="my-4 h-px w-full bg-border" />
          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r rtl:bg-linear-to-l from-brand to-brand-strong font-bold text-white shadow-[0_8px_24px_rgba(255,59,48,0.35)]"
            onClick={()=>{Order({sessionId , action : "order"})}}
            disabled={OrderPending}
          >
            <LockIcon className="size-4" />
            {/* {t("activeSession.confirmOrder")} */}
            Order
          </button>
        </div>
      )}
    </div>
  );
}