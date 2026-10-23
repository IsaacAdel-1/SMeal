import CalculatorIcon from "../../../assets/svgs/CalculatorIcon";
import { useTranslation } from "react-i18next";

export default function BillBreakdown({
  totalPrice,
}: {
  totalPrice: number;
}) {
  const { t } = useTranslation();
  const totalDilevery = 40;
  const people = 3;
  const DileveryForOne = totalDilevery / people;
  const totalAmount = totalPrice + DileveryForOne;

  return (
    <div className="bg-card text-card-foreground rounded-2xl p-4 min-w-85 lg:w-120">
      <header className="flex justify-between items-center mb-4 text-card-foreground">
        <p className="flex">
          <CalculatorIcon className="text-brand" />
          {t("billBreakdown.title")}
        </p>
        <p className="text-muted-foreground">Restaurant Name</p>
      </header>

      <div className="flex justify-between items-center my-3">
        <p className="text-muted-foreground">
          {t("billBreakdown.itemsSubtotal")}
        </p>
        <p>{totalPrice.toFixed(2)}</p>
      </div>

      <div className="flex justify-between items-center my-3">
        <p className="text-muted-foreground">
          {t("billBreakdown.deliveryShare", { people })}
        </p>
        <p>{DileveryForOne.toFixed(2)}</p>
      </div>

      <div className="line h-px border border-border" />

      <div className="flex justify-between items-center my-3 font-bold">
        <p>{t("billBreakdown.totalAmount")}</p>
        <p className="text-success">{totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
}
