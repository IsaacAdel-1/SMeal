import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, Receipt } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSession } from "@/modules/orders/hooks/useOrderQueries";
import { resolveAssetUrl } from "@/lib/utils";

/** The history list has no receipt link, so the session details are loaded when the dialog opens. */
export default function ReceiptDialog({ sessionId, restaurantName }: { sessionId: string; restaurantName: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { data: session, isLoading, isError, error } = useSession(sessionId, open);
  const receiptUrl = resolveAssetUrl(session?.invoiceUrl);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-control py-3 text-sm font-semibold text-foreground transition hover:bg-surface-raised"
        >
          <Receipt className="h-4 w-4" />
          {t("history.viewReceipt")}
        </button>
      </DialogTrigger>

      <DialogContent className="bg-card text-card-foreground sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("history.receiptTitle", { name: restaurantName })}</DialogTitle>
          <DialogDescription className="sr-only">{t("history.viewReceipt")}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <p className="text-muted-foreground">{t("common.loading")}</p>
        ) : isError ? (
          <p className="text-destructive">{error.message}</p>
        ) : receiptUrl ? (
          <div className="flex flex-col gap-3">
            <img src={receiptUrl} alt={t("history.receiptTitle", { name: restaurantName })} className="max-h-[60vh] w-full rounded-xl object-contain" />
            <a href={receiptUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 self-end text-sm font-semibold text-brand hover:underline">
              <ExternalLink className="size-4" /> {t("history.openReceipt")}
            </a>
          </div>
        ) : (
          <p className="text-muted-foreground">{t("history.noReceipt")}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
