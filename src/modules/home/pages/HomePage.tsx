import { useState } from "react";
import ActiveGroupSessions from "../Components/ActiveSessions/ActiveGroupSessions";
import AvailableRestaurants from "../Components/AvailableRestaurants";
import ExploreCuisines from "../Components/ExploreCuisines";
import HomeNavbar from "../Components/HomeNavbar";

import useDebounce from "../hooks/useDebounce";


export default function HomePage() {
   const [searchText , setSearchText] = useState("")
    const debouncedSearch = useDebounce(searchText , 400)
    
     
  return (
    <div className=" w-full">
        <HomeNavbar/>

        <div className="bg-[#08090e] p-6">
            <ActiveGroupSessions/>
            <ExploreCuisines Search={searchText} SetSearch={setSearchText}/>
            <AvailableRestaurants search={debouncedSearch}/>
        </div>
    </div>
  )
}
