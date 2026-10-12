import { useState } from "react";
import ActiveGroupSessions from "../Components/ActiveSessions/ActiveGroupSessions";
import AvailableRestaurants from "../Components/AvailableRestaurants";
import ExploreCuisines from "../Components/ExploreCuisines";
import HomeNavbar from "../Components/HomeNavbar";

import useDebounce from "../hooks/useDebounce";


export default function HomePage() {
   const [searchText , setSearchText] = useState("")
    const debouncedSearch = useDebounce(searchText , 400)
    const [selectedCategory , setSelectedCategory] = useState<string>("")

     
  return (
    <div className=" w-full">
        <HomeNavbar/>

        <div className="bg-[#08090e] p-6 ">
            <ActiveGroupSessions/>
            <ExploreCuisines Search={searchText} SetSearch={setSearchText} selectedCat={selectedCategory} setSelectedCat= {setSelectedCategory}/>
            <AvailableRestaurants search={debouncedSearch} selectedCat={selectedCategory}/>
        </div>
    </div>
  )
}
