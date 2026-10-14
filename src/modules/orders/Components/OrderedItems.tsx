import BagIcon from "../../../assets/svgs/BagIcon";
import type { OrderItem } from "../types";

 
export const orderItems: OrderItem[] = [
  {
    id: 1,
    name: "Super Foul Sandwich",
    quantity: 1,
    unitPrice: 25,
  },
  {
    id: 2,
    name: "Falafel Extra Mix",
    quantity: 1,
    unitPrice: 20,
  },
];
export default function OrderedItems() {
    
  return (
    <div className="bg-[#101116] max-w-120 rounded-2xl mt-8 min-h-100 border border-[#222328] p-4">
        <header className="flex items-center justify-between">
            <p className="text-xl flex text-white items-center  gap-2"><BagIcon className="text-[#ff3b30] size-4"/> Your Ordered Items</p>
            <p className="text-[#8e8e93]">Locked & Submitted</p>
        </header>

        <ul className="flex flex-col gap-2 mt-4">
            {orderItems.map((item)=>{
                return <li className="bg-[#15161b] border border-[#212226] p-2 rounded-2xl flex justify-between">
                  <div>
                    <p className="text-white">{item.name}</p>
                    <p className="text-[#8e8e93] text-[14px]">Qty: {item.quantity} - {item.unitPrice} EGP each</p>
                  </div>
                  <p className="text-xl font-semibold text-white">{item.unitPrice} EGP</p>
                    </li>
            })}
        </ul>
    </div>
  )
}
