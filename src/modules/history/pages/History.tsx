import { useTranslation } from "react-i18next";
import Navbar from "../../../shared/components/Navbar";
import MapingOrders from "../Components/MapingOrders";
import TotalPastSpent from "../Components/TotalPastSpent";

export default function History() {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar header={t("history.header")} />
      <div className="py-6 px-7">
        <TotalPastSpent />
        <MapingOrders />
      </div>
    </div>
  );
}