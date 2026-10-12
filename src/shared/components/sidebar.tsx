import { Link } from 'react-router-dom'
import Logo from '../../assets/images/sm_logo.png'
import { sidebarItems } from '../../constants/sidebarItems'
import { useState } from 'react';



export type User = {
  id: number;
  fullName: string;
  role: "customer" | "admin" | "chef";
};

export const mockUser: User = {
  id: 1,
  fullName: "Ahmed Hassan",
  role: "customer",
};
export default function sidebar() {

  const InitialLetters = mockUser.fullName.split(" ")[0].charAt(0) + mockUser.fullName.split(" ")[1].charAt(0);
  const [ActiveItem , setActiveItem] =useState(sidebarItems[0].title)
  const handleClick= (id : string)=>{
    setActiveItem(id);
  }
  return (
    <div className='bg-[#0c0d12] w-75 min-h-screen p-4 flex flex-col justify-between sticky  top-0 bottom-0'>
      <div>
        <header className='flex gap-2 '>
            <img src={Logo} className='w-12 h-12'/>
            <div >
                <p className='text-white text-xl font-semibold'>sMeal</p>
                <p className='text-[#757282] text-[12px]'>Desktop Workspace</p>
            </div>
        </header>
        <div className='w-full bg-[#1a1b20] h-px my-5'/>

        <ul className='flex flex-col gap-2'>
            {sidebarItems.map((item)=>{
              return <li className={`text-[#8e8e93] font-semibold p-2 rounded-2xl ${ActiveItem === item.title ? "bg-linear-to-r from-[#fe5045] to-[#e22a20] text-white" : "hover:bg-[#16161b] hover:text-white"} `} key={item.title} onClick={()=> handleClick(item.title)}>
                <Link to={item.path} className='flex items-center gap-2'>
                  <p>{<item.icon size={27}/>}</p>
                  <p>{item.title}</p> 
                </Link>
              </li>
            })}
        </ul>
      </div>

      <div className='flex text-white gap-2'>
        <p className='bg-[#ee3c31] w-12 h-12 flex items-center justify-center text-2xl font-semibold rounded-2xl'>{InitialLetters}</p>
        <div>
          <p className='font-semibold '>{mockUser.fullName}</p>
          <p className='text-[#577e93] text-[12px]'>{mockUser.role}</p>
        </div>
      </div>
    </div>
  )
}
