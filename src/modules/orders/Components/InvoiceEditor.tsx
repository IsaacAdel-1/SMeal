import { Fragment, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BadgeCheck, Check, Flag, Pencil, Plus, Trash2, Undo2 } from "lucide-react";
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
import type { InvoiceDraft } from "../types";
import {
  buildInvoicePayload,
  isValidItem,
  toEditable,
  type EditableItem,
  type EditableParticipant,
} from "../utils/buildInvoicePayload";
import { useApproveInvoice, useUpdateInvoice } from "../hooks/useOrderQueries";
import { useOwnerStep } from "@/modules/restaurant-menu/hooks/useSessionMutations";

type EditableField = "name" | "quantity" | "unitPrice";

const toNumber = (value: string) => (value === "" ? Number.NaN : Number(value));
const numberValue = (value: number) => (Number.isNaN(value) ? "" : value);
const money = (value: number) => (Number.isFinite(value) ? value.toFixed(2) : "—");
const canEditRow = (item: EditableItem) => !!item.orderItemId || item.key.startsWith("new-");
const lineTotal = (item: EditableItem) =>
  Number.isFinite(item.quantity) && Number.isFinite(item.unitPrice) ? item.quantity * item.unitPrice : 0;

let newRowCount = 0;
/** Keys for rows added in the editor; `buildInvoicePayload` sends them as added items. */
const nextNewRowKey = () => `new-${++newRowCount}`;

const BUTTON = "flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold disabled:cursor-not-allowed disabled:opacity-50";

export function InvoiceEditor({
  sessionId,
  draft,
  canEdit,
  canEnd,
}: {
  sessionId: string;
  draft: InvoiceDraft;
  /** Only the host edits, and only until the invoice is approved. */
  canEdit: boolean;
  canEnd: boolean;
}) {
  const { t } = useTranslation();
  const original = useMemo(() => toEditable(draft.participants ?? []), [draft]);
  const [participants, setParticipants] = useState<EditableParticipant[]>(original);
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const { mutate: save, isPending: saving } = useUpdateInvoice();
  const { mutate: approve, isPending: approving } = useApproveInvoice();
  const { run, isPending: ending } = useOwnerStep();
  const busy = saving || approving || ending;
  const editable = canEdit && !draft.isApproved;

  const payload = buildInvoicePayload(original, participants);
  const hasChanges = !!payload;
  const hasInvalidRows = participants.some((p) => p.items.some((i) => canEditRow(i) && !isValidItem(i)));

  const updateParticipant = (orderId: string, update: (items: EditableItem[]) => EditableItem[]) =>
    setParticipants((prev) => prev.map((p) => (p.orderId === orderId ? { ...p, items: update(p.items) } : p)));

  const updateItem = (orderId: string, key: string, field: EditableField, value: string | number) =>
    updateParticipant(orderId, (items) =>
      items.map((item) => {
        if (item.key !== key) return item;
        const next = { ...item, [field]: value };
        return { ...next, total: lineTotal(next) };
      }),
    );

  const removeItem = (orderId: string, key: string) => updateParticipant(orderId, (items) => items.filter((i) => i.key !== key));

  const addItem = (orderId: string) => {
    const key = nextNewRowKey();
    updateParticipant(orderId, (items) => [
      ...items,
      { key, orderId, orderItemId: null, name: "", quantity: 1, unitPrice: 0, total: 0, isMatched: true },
    ]);
    setEditingKey(key);
  };

  const discard = () => {
    setParticipants(original);
    setEditingKey(null);
  };

  const foodOf = (p: EditableParticipant) => p.items.reduce((sum, i) => sum + lineTotal(i), 0);
  const foodTotal = participants.reduce((sum, p) => sum + foodOf(p), 0);
  const grandTotal = foodTotal + draft.deliveryCost;

  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold">{t("invoice.draftTitle")}</h2>
          <p className="text-sm text-muted-foreground">{t("invoice.participants", { count: participants.length })}</p>
        </div>
        {draft.isApproved && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-sm font-semibold text-success">
            <BadgeCheck className="size-4" /> {t("invoice.approved")}
          </span>
        )}
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">{t("invoice.item")}</TableHead>
            <TableHead className="text-center">{t("invoice.quantity")}</TableHead>
            <TableHead className="text-end">{t("invoice.unitPrice")}</TableHead>
            <TableHead className="text-end">{t("invoice.total")}</TableHead>
            {editable && <TableHead className="w-20" />}
          </TableRow>
        </TableHeader>

        <TableBody>
          {participants.map((p) => (
            <Fragment key={p.orderId}>
              <TableRow className="bg-muted/60 font-semibold hover:bg-muted/60">
                <TableCell colSpan={editable ? 4 : 3}>
                  <bdi>{p.participantName}</bdi>
                </TableCell>
                <TableCell className={`text-end text-xs ${p.isPaid ? "text-success" : "text-muted-foreground"}`}>
                  {p.isPaid ? t("invoice.paid") : t("invoice.unpaid")}
                </TableCell>
              </TableRow>

              {p.items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={editable ? 5 : 4} className="ps-8 text-muted-foreground">
                    {t("invoice.noItems")}
                  </TableCell>
                </TableRow>
              )}

              {p.items.map((item) => {
                const isEditing = editable && editingKey === item.key;
                const invalid = canEditRow(item) && !isValidItem(item);
                return (
                  <TableRow key={item.key} className={invalid ? "bg-destructive/5" : undefined}>
                    <TableCell className="ps-8">
                      {isEditing ? (
                        <Input
                          aria-label={t("invoice.itemName")}
                          value={item.name}
                          onChange={(e) => updateItem(p.orderId, item.key, "name", e.target.value)}
                        />
                      ) : (
                        <span className="flex items-center gap-2">
                          {item.name || "—"}
                          {!item.isMatched && (
                            <span className="rounded-md border border-brand/30 bg-brand/10 px-1.5 py-0.5 text-[11px] font-semibold text-brand">
                              {t("invoice.notMatched")}
                            </span>
                          )}
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="text-center">
                      {isEditing ? (
                        <Input
                          type="number"
                          min={1}
                          aria-label={t("invoice.quantity")}
                          className="mx-auto w-20"
                          value={numberValue(item.quantity)}
                          onChange={(e) => updateItem(p.orderId, item.key, "quantity", toNumber(e.target.value))}
                        />
                      ) : (
                        item.quantity
                      )}
                    </TableCell>

                    <TableCell className="text-end">
                      {isEditing ? (
                        <Input
                          type="number"
                          min={0}
                          step="0.01"
                          aria-label={t("invoice.unitPrice")}
                          className="ms-auto w-24"
                          value={numberValue(item.unitPrice)}
                          onChange={(e) => updateItem(p.orderId, item.key, "unitPrice", toNumber(e.target.value))}
                        />
                      ) : (
                        money(item.unitPrice)
                      )}
                    </TableCell>

                    <TableCell className="text-end">{money(lineTotal(item))}</TableCell>

                    {editable && (
                      <TableCell>
                        {canEditRow(item) && (
                          <div className="flex justify-end gap-1">
                            <button
                              type="button"
                              className="rounded-md p-1.5 hover:bg-surface-raised"
                              aria-label={isEditing ? t("invoice.confirmEdit") : t("invoice.editItem", { name: item.name })}
                              onClick={() => setEditingKey(isEditing ? null : item.key)}
                            >
                              {isEditing ? <Check size={18} /> : <Pencil size={18} />}
                            </button>
                            <button
                              type="button"
                              className="rounded-md p-1.5 text-destructive hover:bg-destructive/10"
                              aria-label={t("invoice.remove", { name: item.name })}
                              onClick={() => removeItem(p.orderId, item.key)}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}

              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={3} className="text-end text-muted-foreground">
                  {editable && (
                    <button
                      type="button"
                      onClick={() => addItem(p.orderId)}
                      className="float-start inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                    >
                      <Plus className="size-4" /> {t("invoice.addItem")}
                    </button>
                  )}
                  {t("invoice.food")}: {money(foodOf(p))} + {t("invoice.deliveryShare")}: {money(p.deliveryShare)}
                </TableCell>
                <TableCell className="text-end font-bold">{money(foodOf(p) + p.deliveryShare)}</TableCell>
                {editable && <TableCell />}
              </TableRow>
            </Fragment>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-end">
              {t("invoice.foodTotal")}: {money(foodTotal)} + {t("invoice.delivery")}: {money(draft.deliveryCost)}
            </TableCell>
            <TableCell className="text-end text-base font-bold text-success">{money(grandTotal)}</TableCell>
            {editable && <TableCell />}
          </TableRow>
        </TableFooter>
      </Table>

      {hasInvalidRows && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          {t("invoice.invalidRows")}
        </p>
      )}

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        {editable && hasChanges && (
          <>
            <button type="button" onClick={discard} disabled={busy} className={`${BUTTON} border border-border bg-surface-control text-foreground`}>
              <Undo2 className="size-4" /> {t("invoice.discard")}
            </button>
            <button
              type="button"
              disabled={busy || hasInvalidRows}
              onClick={() => payload && save({ sessionId, payload }, { onSuccess: () => setEditingKey(null) })}
              className={`${BUTTON} bg-brand text-white`}
            >
              {saving ? t("invoice.saving") : t("invoice.save")}
            </button>
          </>
        )}

        {editable && !hasChanges && (
          <button type="button" disabled={busy} onClick={() => approve(sessionId)} className={`${BUTTON} bg-success text-white`}>
            <BadgeCheck className="size-4" />
            {approving ? t("invoice.approving") : t("invoice.approve")}
          </button>
        )}

        {canEnd && draft.isApproved && (
          <button type="button" disabled={busy} onClick={() => run(sessionId, "end")} className={`${BUTTON} bg-brand text-white`}>
            <Flag className="size-4" />
            {t("session.actions.end")}
          </button>
        )}
      </div>
    </section>
  );
}
