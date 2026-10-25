import { Fragment, useState } from "react";
import { Check, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Props } from "../types";
import { buildInvoicePayload } from "../utils/buildInvoicePayload";
import useUpdateInvoice from "../hooks/useUpdateInvoice";
import useConfirmInvoice from "../hooks/useConfrmInvoice";

type EditableField = "name" | "quantity" | "unitPrice";

export function OrderTable({
  sessionId, 
  deliveryCost,
  participants: initialParticipants,
  isApproved = false,
}: Props) {
  const [participants, setParticipants] = useState(initialParticipants);

  const [editingId, setEditingId] = useState<string | null>(null);
  
  const {
    mutate: updateInvoice,
    isPending: UpdateLoading,
    error: updateError,
  } = useUpdateInvoice();
  const {
    mutate: confirm,
    isPending: ConfirmLoading,
    error: confirmError,
  } = useConfirmInvoice();
  const loading = UpdateLoading || ConfirmLoading ;   
  
  const updateItem = (
    participantId: string,
    itemId: string,
    field: EditableField,
    value: string | number
  ) => {
    setParticipants((prev) =>
      prev.map((p) => {
        if (p.participantId !== participantId) return p;

        const items = p.items.map((item) => {
          if (item.orderItemId !== itemId) return item;

          const updated = { ...item, [field]: value };
          return { ...updated, total: updated.quantity * updated.unitPrice };
        });

        const foodAmount = items.reduce((sum, i) => sum + i.total, 0);

        return {
          ...p,
          items,
          foodAmount,
          totalAmount: foodAmount + p.deliveryShare,
        };
      })
    );
  };
  const onConfirm = ()=>{
    
    const payload = buildInvoicePayload(initialParticipants , participants) ;
    if(!payload) {confirm(sessionId)}
    else if (!!payload){ updateInvoice({sessionId , payload})}
  }
  const foodTotal = participants.reduce((sum, p) => sum + p.foodAmount, 0);
  const grandTotal = foodTotal + deliveryCost;
  
  return (
    <div className="shrink-0">
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead className="text-center">Qty</TableHead>
          <TableHead className="text-right">Unit Price</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="w-12" />
        </TableRow>
      </TableHeader>

      <TableBody>
        {participants.map((p) => (
          <Fragment key={p.participantId}>
            <TableRow className="bg-muted/50 font-semibold">
              <TableCell colSpan={4}>{p.participantName}</TableCell>
              <TableCell className="text-right">
                {p.isPaid ? "Paid" : "Unpaid"}
              </TableCell>
            </TableRow>

            {p.items.map((item) => {
              const isEditing = editingId === item.orderItemId;

              return (
                <TableRow key={item.orderItemId}>
                  <TableCell className="pl-8">
                    {isEditing ? (
                      <Input
                        value={item.name}
                        onChange={(e) =>
                          updateItem(
                            p.participantId,
                            item.orderItemId,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      item.name
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    {isEditing ? (
                      <Input
                        type="number"
                        min={1}
                        className="w-20 mx-auto"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            p.participantId,
                            item.orderItemId,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                      />
                    ) : (
                      item.quantity
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    {isEditing ? (
                      <Input
                        type="number"
                        min={0}
                        className="w-24 ml-auto"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(
                            p.participantId,
                            item.orderItemId,
                            "unitPrice",
                            Number(e.target.value)
                          )
                        }
                      />
                    ) : (
                      item.unitPrice
                    )}
                  </TableCell>

                  <TableCell className="text-right">{item.total}</TableCell>

                  <TableCell>
                    {!isApproved && (
                      <button
                        type="button"
                        aria-label={isEditing ? "Finish editing" : "Edit item"}
                        onClick={() =>
                          setEditingId(isEditing ? null : item.orderItemId)
                        }
                      >
                        {isEditing ? <Check size={18} /> : <Pencil size={18} />}
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell colSpan={3} className="text-right">
                Food: {p.foodAmount} + Delivery: {p.deliveryShare}
              </TableCell>
              <TableCell className="text-right font-bold">
                {p.totalAmount}
              </TableCell>
              <TableCell />
            </TableRow>
          </Fragment>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            Food: {foodTotal} + Delivery: {deliveryCost}
          </TableCell>
          <TableCell className="text-right font-bold">{grandTotal}</TableCell>
          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>

    <button
      type="button"
      onClick={onConfirm}
      disabled={loading}
      className="rounded-md bg-green-600 px-4 py-2 text-white disabled:opacity-50"
    >
      {loading ? "Confirming..." : "Confirm"}
    </button>
    {(updateError || confirmError) && (
      <p role="alert" className="mt-2 text-sm text-destructive">
        {(updateError ?? confirmError)?.message || "Something went wrong. Please try again."}
      </p>
    )}
    </div>
  );
}
