import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload } from "lucide-react";
import { useUploadInvoice } from "../hooks/useOrderQueries";

const createSchema = (t: TFunction) =>
  z.object({
    fee: z
      .string()
      .trim()
      .min(1, t("invoice.errors.feeRequired"))
      .refine((value) => Number.isFinite(Number(value)) && Number(value) >= 0, t("invoice.errors.feeInvalid")),
    invoice: z
      .custom<FileList>()
      .refine((files) => files instanceof FileList && files.length > 0, t("invoice.errors.fileRequired"))
      .refine((files) => !(files instanceof FileList) || !files[0] || files[0].type.startsWith("image/"), t("invoice.errors.fileType")),
  });

type FormValues = z.infer<ReturnType<typeof createSchema>>;

const FIELD =
  "w-full rounded-xl border border-border bg-surface-raised p-3 text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function UploadInvoiceForm({ sessionId }: { sessionId: string }) {
  const { t } = useTranslation();
  const schema = useMemo(() => createSchema(t), [t]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const { mutate: upload, isPending } = useUploadInvoice();

  const onSubmit = (data: FormValues) =>
    upload({ sessionId, deliveryCost: Number(data.fee), file: data.invoice[0] });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:p-6"
      noValidate
    >
      <div>
        <h2 className="text-lg font-bold">{t("invoice.uploadTitle")}</h2>
        <p className="text-sm text-muted-foreground">{t("invoice.uploadDescription")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold">
          {t("invoice.deliveryFee")}
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step="0.01"
            className={FIELD}
            aria-invalid={!!errors.fee || undefined}
            {...register("fee")}
          />
          {errors.fee && <span className="font-normal text-destructive">{errors.fee.message}</span>}
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold">
          {t("invoice.receiptFile")}
          <input
            type="file"
            accept="image/*"
            className={`${FIELD} file:me-3 file:rounded-lg file:border-0 file:bg-brand file:px-3 file:py-1 file:text-white`}
            aria-invalid={!!errors.invoice || undefined}
            {...register("invoice")}
          />
          {errors.invoice && <span className="font-normal text-destructive">{errors.invoice.message as string}</span>}
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center gap-2 self-start rounded-xl bg-success px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <Upload className="size-4" />
        {isPending ? t("invoice.uploading") : t("invoice.upload")}
      </button>
    </form>
  );
}
