import TrackingIcon from "../../../assets/svgs/TrackingIcon";

import { Check, Store, Bike } from "lucide-react";

export default function OrderTrackingCard() {
  return (
    <div className="lg:w-120 max-w-120 p-6 bg-[#101116] rounded-2xl border border-[#222328] ">
        <header className="flex items-center justify-between mb-6 gap-4">
            <p className="flex items-center text-white font-bold gap-2"><TrackingIcon className="text-[#ff3b30]"/>Live Order Tracking </p>
            <p className="text-[#34c759]">Placed with Restaurant</p>
        </header>

        <div className="flex items-center">
            
            <span className="bg-[#34c759] rounded-full w-8.5 h-8.5 flex justify-center items-center "><Check className="text-white"/></span>
            
            <p className="flex-1 bg-[#28292e] h-px"/>
            <span className="bg-linear-to-br from-[#FF5247] to-[#E0281E] rounded-full w-8.5 h-8.5 flex justify-center items-center"><Store className="text-white"/></span>
            <p className="flex-1 bg-[#28292e] h-px"/>
            <span className="bg-[#1c1d22] rounded-full w-8.5 h-8.5 flex justify-center items-center"><Bike className="text-[#838c93]"/></span>
        </div>

        <div className="flex justify-between mt-2">
            <p className="text-white">Submitted</p>
            <p className="text-white">Restaurant</p>
            <p className="text-white">Arrived</p>
        </div>
    </div>
  )
}
