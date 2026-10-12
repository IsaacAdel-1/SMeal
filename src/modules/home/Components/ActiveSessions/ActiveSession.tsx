import { MdOutlineAccessTime } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";


import Lamb from './Lamb'
import { useEffect, useState } from "react";
import { mockUser } from "../HomeNavbar";
import LockIcon from "../../../../assets/svgs/LockIcon";

export default function ActiveSession() {
  const [totalSeconds , setTotalSeconds] = useState(3600);
  useEffect(()=>{

    const id = setInterval(()=>{
      setTotalSeconds(prev => prev > 0 ? prev -1 : 0)
      
    } , 1000)

    return ()=> clearInterval(id)
  },[])

  const hours = Math.floor(totalSeconds / 3600) ;
  const minuts = Math.floor((totalSeconds % 3600) / 60 )
  const seconds = Math.floor(totalSeconds % 60)
  const pad = (n : number)=> String(n).padStart(2 , "0");
  const resturant = "El Shabrawy";
  const HostName = "Ahmed Hassan";
  
  return (
    <div className="bg-linear-to-r from-[#2b1014] via-[#1a0d11] to-[#0d0d12] border border-[#ff3b30]/25 rounded-2xl p-6">
        <header className='flex justify-between items-center'>
          <p className="bg-[#2a271d] border border-[#2c4f2c] text-[#31c759] font-semibold leading-none py-1 px-2 rounded-2xl flex items-center gap-1.5 "><Lamb/> Session Active</p>
          <p className="bg-[#3a191e] flex items-center text-[#ff3b30] gap-1 border border-[#611f22] py-.75 px-2 rounded-2xl"><MdOutlineAccessTime className="size-4" /> <span>{pad(hours)}:{pad(minuts)}:{pad(seconds)}</span></p>
        </header>

        <div>

          <p className="text-white font-bold text-xl">{resturant}</p>
          <p className="flex items-center gap-1 text-[#aeaed2]"><FaUserShield className="size-4 text-[#ff3b30]" />Host : {HostName}</p>
        </div>

        

        {mockUser.isHost && <div>
           <div className="h-px w-full bg-[#332429] my-4"></div>
            <button className="w-full h-12 flex items-center justify-center gap-2 rounded-xl font-bold text-white bg-linear-to-r from-[#ff5148] to-[#e0291f] shadow-[0_8px_24px_rgba(255,59,48,0.35)]">
              <LockIcon className="size-4" />
              Confirm Order
          </button>
           </div>}
    </div> 
  )
}
