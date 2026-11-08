import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ExternalLink, Info } from "lucide-react";
import Navbar from "@/shared/components/Navbar";
import SessionStatusBadge from "@/shared/session/SessionStatusBadge";
import { SessionStatus } from "@/shared/session/sessionStatus";
import { resolveAssetUrl } from "@/lib/utils";
import { InvoiceEditor } from "../Components/InvoiceEditor";
import UploadInvoiceForm from "../Components/UploadInvoiceForm";
import ParticipantsOrders from "../Components/ParticipantsOrders";
import { useInvoiceDraft, useSession } from "../hooks/useOrderQueries";

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-2xl border border-info/30 bg-info/5 p-4 text-sm">
      <Info className="mt-0.5 size-4 shrink-0 text-info" />
      {children}
    </p>
  );
}

export default function OrderInvoice() {
  const { t } = useTranslation();
  const { sessionId = "" } = useParams<{ sessionId: string }>();

  const { data: session, isLoading, isError, error } = useSession(sessionId);
  const isOwner = !!session?.currentUserIsOwner;
  const hasInvoice = !!session && (!!session.invoiceUrl || session.status >= SessionStatus.InvoiceReady);
  const draftQuery = useInvoiceDraft(sessionId, isOwner && hasInvoice);

  const back = (
    <Link to="/orders" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
      <ArrowLeft className="size-4 rtl:rotate-180" /> {t("invoice.backToOrders")}
    </Link>
  );

  if (isLoading) {
    return (
      <>
        <Navbar header={t("invoice.title")} />
        <p className="p-6 text-muted-foreground">{t("common.loading")}</p>
      </>
    );
  }

  if (isError || !session) {
    return (
      <>
        <Navbar header={t("invoice.title")} />
        <div className="flex flex-col gap-4 p-6">
          <p className="text-lg font-semibold text-destructive">{error?.message ?? t("common.genericError")}</p>
          {back}
        </div>
      </>
    );
  }

  const receiptUrl = resolveAssetUrl(session.invoiceUrl);

  return (
    <>
      <Navbar header={t("invoice.headerFor", { name: session.restaurantName })} />

      <div className="flex flex-col gap-6 p-4 sm:p-6">
        {back}

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 sm:p-6">
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold">{session.restaurantName}</h2>
            <p className="text-sm text-muted-foreground">
              {t("orderTracking.owner")}: <bdi>{session.ownerName}</bdi> •{" "}
              {t("invoice.participants", { count: session.participantCount })}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {receiptUrl && (
              <a
                href={receiptUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
              >
                <ExternalLink className="size-4" /> {t("invoice.viewReceipt")}
              </a>
            )}
            <SessionStatusBadge status={session.status} />
          </div>
        </section>

        {isOwner && !hasInvoice && session.status === SessionStatus.Arrived && (
          <UploadInvoiceForm sessionId={sessionId} />
        )}
        {isOwner && !hasInvoice && session.status < SessionStatus.Arrived && <Notice>{t("invoice.notReady")}</Notice>}

        {isOwner && hasInvoice &&
          (draftQuery.isLoading ? (
            <p className="text-muted-foreground">{t("common.loading")}</p>
          ) : draftQuery.data ? (
            <InvoiceEditor
              // Start from the server copy again after every save/approve.
              key={draftQuery.dataUpdatedAt}
              sessionId={sessionId}
              draft={draftQuery.data}
              canEdit={session.status !== SessionStatus.Completed}
              canEnd={session.status !== SessionStatus.Completed}
            />
          ) : (
            <Notice>{draftQuery.error?.message ?? t("invoice.draftUnavailable")}</Notice>
          ))}

        {!isOwner && <Notice>{t("invoice.readOnly")}</Notice>}
        {(!isOwner || !hasInvoice) && <ParticipantsOrders participants={session.participants ?? []} />}
      </div>
    </>
  );
}
