import { Egg, Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { resolveAssetUrl } from "@/lib/utils";
import type { MenuItemCardProps } from "../types";

export default function MenuItemCard({
  name,
  description,
  price,
  imageUrl,
  quantity,
  disabled = false,
  onIncrease,
  onDecrease,
}: MenuItemCardProps) {
  const { t } = useTranslation();
  const image = resolveAssetUrl(imageUrl);

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-2xl border bg-card p-3 transition-colors md:p-5 ${
        quantity > 0 ? "border-brand/50" : "border-border"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3 md:gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-surface-raised md:size-16">
          {image ? (
            <img src={image} alt="" loading="lazy" className="size-full object-cover" />
          ) : (
            <Egg className="size-6 text-info" />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate font-bold text-card-foreground">{name}</p>
          {description && <p className="truncate text-sm text-muted-foreground">{description}</p>}
          <p className="font-bold text-brand">
            {price.toFixed(2)} {t("common.currency")}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 rounded-xl border border-border bg-surface-raised p-1.5 md:gap-3 md:p-2">
        <button
          type="button"
          onClick={onDecrease}
          disabled={disabled || quantity === 0}
          aria-label={t("itemCard.decreaseQuantity", { name })}
          className="flex size-8 items-center justify-center rounded-lg bg-surface-control text-foreground disabled:cursor-not-allowed disabled:opacity-40 md:size-9"
        >
          <Minus className="size-4" />
        </button>

        <span aria-live="polite" className="w-6 text-center font-bold text-card-foreground tabular-nums">
          {quantity}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          disabled={disabled}
          aria-label={t("itemCard.increaseQuantity", { name })}
          className="flex size-8 items-center justify-center rounded-lg bg-surface-control text-foreground disabled:cursor-not-allowed disabled:opacity-40 md:size-9"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
