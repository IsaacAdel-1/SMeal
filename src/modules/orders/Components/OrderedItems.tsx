import { useTranslation } from "react-i18next";
import BagIcon from "../../../assets/svgs/BagIcon";
import type { MenuItem } from "../types";

export default function OrderedItems({ orderDetails, editable }: { orderDetails: MenuItem[]; editable: boolean }) {
  const { t } = useTranslation();

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-4 text-card-foreground">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-xl text-card-foreground">
          <BagIcon className="size-4 text-brand" />
          {t("orderedItems.title")}
        </p>
        <p className="text-sm text-muted-foreground">
          {editable ? t("orderedItems.editable") : t("orderedItems.status")}
        </p>
      </header>

      {orderDetails.length === 0 ? (
        <p className="mt-4 text-muted-foreground">{t("orderedItems.empty")}</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-2">
          {orderDetails.map((item) => (
            <li
              key={item.menuItemId}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface-raised p-3"
            >
              <div className="min-w-0">
                <p className="truncate text-card-foreground">{item.menuItemName}</p>
                <p className="text-[14px] text-muted-foreground">
                  {t("orderedItems.quantityAndUnitPrice", { quantity: item.quantity, unitPrice: item.unitPrice })}
                </p>
              </div>

              <p className="shrink-0 text-lg font-semibold text-card-foreground">
                {t("orderedItems.price", { price: (item.unitPrice * item.quantity).toFixed(2) })}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
