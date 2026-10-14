import { useState } from 'react';
// import HomePage from '../modules/home/pages/HomePage'
import Sidebar from '../shared/components/sidebar'
import { Menu, X } from "lucide-react";
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  const [sidebarOpen , setSidebarOpen] = useState(false)
  return (
    <div className='flex'>
      {!sidebarOpen ? <Menu className={`w-6 h-6 fixed top-5 text-white right-2 z-10 md:hidden`}  onClick={()=>{setSidebarOpen(true) ; scrollTo(0,0)}}/> : <X className='w-6 h-6 fixed top-5 text-white right-2 z-10 md:hidden' onClick={()=>{setSidebarOpen(false)}}/>}
        <div className={` z-8 ${sidebarOpen ? "max-[640px]:absolute max-[640px]:max-w-75" : "max-[640px]:hidden "}`}>
            <Sidebar/>
            
        </div>
        <div className='w-full bg-[#08090e]'>
            {/* <HomePage/> */}
            <Outlet/>
        </div>
    </div>
  )
}
