import { useState } from 'react';
import HomePage from '../modules/home/pages/HomePage'
import Sidebar from '../shared/components/sidebar'
import { Menu, X } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen , setSidebarOpen] = useState(true)
  return (
    <div className='flex'>
      <Menu className={`w-6 h-6 fixed top-5 text-white right-2 z-10 lg:hidden`}  onClick={()=>{setSidebarOpen(prev =>!prev) ; scrollTo(0,0)}}/>
        <div className={` z-8 ${sidebarOpen ? "max-[640px]:absolute max-[640px]:max-w-75" : "max-[640px]:hidden "}`}>
            <Sidebar/>
            
        </div>
        <div className=' w-full'>
            <HomePage/>
        </div>
    </div>
  )
}
