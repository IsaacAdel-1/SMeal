import { useParams } from "react-router-dom";
import { OrderTable } from "../Components/InvoiceEditor";
import { dummyOrder } from "../data/OrdersTableDummyData";

export default function OrderInvoice() {
    
  const { sessionId } = useParams<{ sessionId: string }>();
  if (!sessionId) {
  return <p>Invalid session</p>;
}
    const {data} = dummyOrder 
  return (
    <div className="p-6 shrink-0">
  <div className="rounded-xl border border-[#232428] bg-[#101116] p-4 text-white">
    <OrderTable
    sessionId = {sessionId}
    deliveryCost={data.deliveryCost}
    participants={data.participants}
    isApproved={data.isApproved}
  />
  </div>
</div>
  )
}

