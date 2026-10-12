import { Check } from "lucide-react";
import photo from '../../../assets/images/sm_logo.png'

import BowlIcon from "../../../assets/svgs/BowlIcon";
export default function AuthBranding() {
    const CheckSpan = ()=>{
        return <span className="bg-[#fbe6e6] rounded-full w-6 h-6 p-1 flex items-center justify-center">
            <Check  className="text-[#ee3f3c]"/>
        </span>
    }
  return (
    <div className="bg-[#fcf6f5] max-w-130 px-12.5 py-8 relative overflow-hidden max-h-full rounded-l-2xl border-r border-[#e5e5e5]">
        <header className="mb-15">
            <img src={photo} className="w-12 h-12"/>
            <h2 className="font-extrabold  text-2xl text-[#ee3d3a]"><span className="text-black">S</span>Meals</h2>
        </header>
        
        <div>
            <h1 className="font-extrabold text-4xl mb-8">Gourmet Meals, Delivered Daily.</h1>
            <p>Experience the ultimate culinary subscription platform designed to fuel your schedule with fresh, chef-prepared options effortlessly.</p>
        </div>

        <ul className="flex flex-col gap-4 mt-10 relative z-10">
            <li className="flex gap-2"><CheckSpan/> Fresh ingredients sourced daily from local farms</li>
            <li className="flex gap-2"><CheckSpan/> Flexible scheduling tailored to your busy routine</li>
            <li className="flex gap-2"><CheckSpan/> Nutritionist-approved macro plans & recipes</li>
        </ul>

        <div className="mt-20 text-[12px] text-[#999999] z-10 relative">© 2026 sMeals · Powered by SB Tech</div>


        <div className="absolute -bottom-10 -left-12 w-50 h-50 z-1 bg-[#f0dcdd] rounded-full p-10"><BowlIcon/></div>
    </div>
  )
}
