import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useInvoice from "../hooks/useInvoice";
import type { ReactElement } from "react";

const schema = z.object({
  fee: z.string().min(1, "Fee is required"),
  invoice: z.any().refine((files) => files?.length > 0, "Receipt is required"),
});

export type FormValues = z.infer<typeof schema>;

export default function UploadReceiptDialog({ sessionId , children}: { sessionId: string , children : ReactElement }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const {mutate : invoice} = useInvoice()
  const onSubmit = (data: FormValues) => {
        invoice({
    sessionId,
    fee: Number(data.fee),
    file: data.invoice[0],   
  });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload receipt</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="number"
            step="0.01"
            placeholder="Delivery fee"
            {...register("fee")}
            className="rounded-xl bg-surface-raised p-3"
          />
          {errors.fee && <p className="text-sm text-red-500">{errors.fee.message}</p>}

          <input type="file" accept="image/*" {...register("invoice")} />
          {errors.invoice && (
            <p className="text-sm text-red-500">{errors.invoice.message as string}</p>
          )}

          <button type="submit" className="rounded-xl bg-success p-3 font-semibold">
            Submit
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}