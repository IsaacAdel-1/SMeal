import Navbar from "../../../shared/components/Navbar";
import BillBreakdown from "../Components/BillBreakdown";
import OrderedItems from "../Components/OrderedItems";
import OrderTrackingCard from "../Components/OrderTrackingCard";

export default function Orders() {
  return (
    <div>
      <Navbar header="My Order / Active Session Dashboard"/> 
    <div className="flex items-start p-6 gap-10 max-[1024px]:flex-col md:flex-row w-full">
        <div className="">
            <OrderTrackingCard/>
            <OrderedItems/>
        </div>
        <div>
          <BillBreakdown />
        </div>
    </div>
    </div>
  )
}
