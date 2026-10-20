
import BagIcon from "../../../assets/svgs/BagIcon";
import type { OrderItemsType } from "../types";
import { useTranslation } from "react-i18next";

export default function OrderedItems({
  orderDetails,
}: {
  orderDetails: OrderItemsType[];
}) {
const { t } = useTranslation();
  return (
    <div className="bg-card text-card-foreground max-w-120 rounded-2xl mt-8 min-h-100 border border-border p-4">
      <header className="flex items-center justify-between">
        <p className="text-xl flex text-card-foreground items-center gap-2">
          <BagIcon className="text-brand size-4" />
          {t("orderedItems.title")}
        </p>
        <p className="text-muted-foreground">
          {t("orderedItems.status")}
        </p>
      </header>

      <ul className="flex flex-col gap-2 mt-4">
        {orderDetails?.map((item) => {
          const price = item.unitPrice * item.quantity;

          return (
            <li
              key={item.menuItemName}
              className="bg-surface-raised border border-border p-2 rounded-2xl flex justify-between "
            >
              <div>
                <p className="text-card-foreground  ">
                  {item.menuItemName}
                </p>

                <p className="text-muted-foreground text-[14px]">
                  {t("orderedItems.quantityAndUnitPrice", {
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                  })}
                </p>
              </div>

              <p className="text-xl font-semibold text-card-foreground">
                {t("orderedItems.price", {
                  price: price.toFixed(2),
                })}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
