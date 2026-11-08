import { useTranslation } from "react-i18next";
import type { SessionParticipant } from "../types";

export default function ParticipantsOrders({ participants }: { participants: SessionParticipant[] }) {
  const { t } = useTranslation();
  const currency = t("common.currency");

  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      <h2 className="mb-4 text-lg font-bold">{t("invoice.people")}</h2>

      {participants.length === 0 ? (
        <p className="text-muted-foreground">{t("invoice.noItems")}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {participants.map((p) => {
            const items = p.items ?? [];
            const food = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
            return (
              <div key={p.orderId} className="rounded-xl border border-border bg-surface-raised p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="truncate font-semibold">
                    <bdi>{p.participantName}</bdi>
                  </p>
                  <span className={`text-xs font-semibold ${p.paymentStatus === 1 ? "text-success" : "text-muted-foreground"}`}>
                    {p.paymentStatus === 1 ? t("invoice.paid") : t("invoice.unpaid")}
                  </span>
                </div>
                <ul className="flex flex-col gap-1 text-sm">
                  {items.map((i) => (
                    <li key={i.menuItemId} className="flex justify-between gap-2">
                      <span className="text-info">
                        {i.quantity}× {i.menuItemName}
                      </span>
                      <span>{(i.quantity * i.unitPrice).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 border-t border-border pt-2 text-end text-sm font-semibold">
                  {t("invoice.food")}: {food.toFixed(2)} {currency}
                  {p.deliveryShare !== null && ` + ${t("invoice.delivery")}: ${p.deliveryShare.toFixed(2)}`}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
