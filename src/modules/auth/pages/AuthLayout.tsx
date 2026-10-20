import { Outlet } from "react-router-dom";
import ClocheIcon from "../../../assets/svgs/ClocheIcon";
import AuthBranding from "../Components/AuthBranding";


export default function AuthLayout() {
  return (
    <div className="flex m-auto  justify-center mt-10 ">
        <div className="max-[800px]:hidden ">
            <AuthBranding/>
        </div>
            
        <div className="bg-background text-foreground relative w-130 rounded-e-2xl overflow-hidden  px-10 max-[760px]:px-7">
            <div className="absolute bg-surface-raised -top-5 -right-5 rounded-full p-5"><ClocheIcon className="h-25 w-25"/></div>
           
            <Outlet/>
        </div>
    </div>
  )
}
