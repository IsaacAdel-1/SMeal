
import { Egg } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { MenuItemCardProps } from "../types";

export default function MenuItemCard({
  name,
  description,
  price,
  imageUrl,
  quantity,
  onIncrease,
  onDecrease,
}: MenuItemCardProps) {
  const { t } = useTranslation("menu");

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-2 md:p-5">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex size-10 md:size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-surface-raised">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="size-full object-cover"
            />
          ) : (
            <Egg className="size-6 text-info" />
          )}
        </div>

        <div className="min-w-0 text-[12px]">
          <p className="truncate font-bold text-card-foreground">{name}</p>
          <p className="truncate text-sm text-muted-foreground">
            {description}
          </p>
          <p className="font-bold text-brand">
            {price.toFixed(2)} {t("common.currency")}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 md:gap-3 rounded-xl border border-border bg-surface-raised p-2">
        <button
          type="button"
          onClick={onDecrease}
          disabled={quantity === 0}
          aria-label={t("itemCard.decreaseQuantity")}
          className="flex size-6 md:size-9 items-center justify-center rounded-lg bg-surface-control font-bold text-foreground disabled:opacity-50"
        >
          -
        </button>

        <span className="w-6 text-center font-bold text-card-foreground">
          {quantity}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          aria-label={t("itemCard.increaseQuantity")}
          className="flex size-6 md:size-9 items-center justify-center rounded-lg bg-surface-control font-bold text-foreground"
        >
          +
        </button>
      </div>
    </div>
  );
}
