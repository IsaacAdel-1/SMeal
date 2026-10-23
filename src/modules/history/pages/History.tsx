import { useTranslation } from "react-i18next";
import Navbar from "../../../shared/components/Navbar";
import MapingOrders from "../Components/MapingOrders";
import TotalPastSpent from "../Components/TotalPastSpent";
import useHistory from "../hooks/useHistory";

export default function History() {
  const { t } = useTranslation();
  const { data } = useHistory();
  const orders = data?.data?.items ?? [];
  const totalSpent = orders.reduce((sum :number , o :any) => sum + o.total, 0);

  return (
    <div>
      <Navbar header={t("history.header")} />
      <div className="py-6 px-7">
        <TotalPastSpent totalSpent={totalSpent} count={orders.length} />

        <MapingOrders />
      </div>
    </div>
  );
}