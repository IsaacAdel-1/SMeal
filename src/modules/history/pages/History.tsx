import Navbar from "../../../shared/components/Navbar";
import MapingOrders from "../Components/MapingOrders";
import TotalPastSpent from "../Components/TotalPastSpent";




export default function History() {
  return (
    <div>
        <Navbar header="Order Archive & History Workspace"/>
        <div className="py-6 px-7">

            <TotalPastSpent/>
            <MapingOrders />
        </div>
    </div>
  )
}
