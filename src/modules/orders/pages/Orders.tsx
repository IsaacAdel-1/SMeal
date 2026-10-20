import useActiveSessions from "@/modules/home/hooks/useActiveSession";
import Navbar from "../../../shared/components/Navbar";
import BillBreakdown from "../Components/BillBreakdown";
import OrderedItems from "../Components/OrderedItems";
import OrderTrackingCard from "../Components/OrderTrackingCard";
import type { ActiveSessionType } from "@/modules/home/types";
import useOrderDetails from "../hooks/useOrderDetails";
import { t } from "i18next";

const findMySession = (sessions: ActiveSessionType[]) => {
  return sessions?.find((s) => s.currentUserIsOwner || s.currentUserOrderId !== null);
};

export default function Orders() {
  const { data: rawSessions } = useActiveSessions();
  const sessionsList = Array.isArray(rawSessions) 
    ? rawSessions 
    : rawSessions?.data ?? [];

  const mySession = findMySession(sessionsList);
  
  const { data: orderDetailsData } = useOrderDetails();
  

  const myOrderItems = orderDetailsData?.data.items[0].items
  const totalPrice = myOrderItems?.reduce((acc: number, item: any) => {
  return acc + (item.unitPrice * item.quantity || 0) ;
}, 0) ?? 0;
  const resturantName = orderDetailsData?.data.items[0].restaurantName

  
  
  if (!mySession) return <p>{t("orders.noActiveSession")}</p>;

  return (
    <div>
      <Navbar header={t("orders.header")} />
      <div className="flex items-start p-6 gap-10 max-[1024px]:flex-col md:flex-row w-full">
        <div>
          <OrderTrackingCard mySession={mySession} />
          <OrderedItems orderDetails={myOrderItems} />
        </div>
        <div>
          <BillBreakdown totalPrice={totalPrice} resturantName={resturantName} />
        </div>
      </div>
    </div>
  );
}
