
import { useState } from "react";
import SearchIcon from "../../../assets/svgs/Search";
import useCategories from "../hooks/useCategories";


    export default function ExploreCuisines({Search , SetSearch} : {Search : string ; SetSearch : (value : string)=> void}) {
        const {data , isPending, isError, error} = useCategories()
        const [selectedCategory , setSelectedCategory] = useState<string | null>("All items")
    return (
        <>
            <h2 className="text-white mt-8 font-semibold mb-4 text-xl">Explore Cuisines</h2>
            
            <div className="relative ">
                <SearchIcon className="size-5 text-[#818185] absolute top-1/2 -translate-1/2 left-5"/>
                <input type="text" placeholder="Search resturants, Cuisines" 
                    className="text-[#818185] ps-10 p-6 h-9.5 rounded-2xl w-full bg-[#121317] border border-[#2a2b2f] 
                    focus:outline outline-[#FF5247]"
                        onChange={(e)=>{SetSearch(e.target.value)}}
                        value={Search}
                    />
            </div>
            {isPending && <p className="text-[#818185]">Loading...</p>}

            {isError && <p className="text-red-500">{error.message}</p>}    
            {  data &&
                <ul className="flex gap-2 flex-wrap mt-6">
                    
                    <li className={` text-white truncate border border-[#2d2e32] rounded-2xl 
                        px-4 py-2  cursor-pointer ${selectedCategory === "All items" ? "bg-[#f6463b]" :"bg-[#0c0d12] hover:bg-[#1b1c21]"}`} 
                        onClick={()=>{setSelectedCategory("All items")}}>All items</li>
                {data.data.map((c : any)=>{
                    return <li className={` text-white truncate border border-[#2d2e32] rounded-2xl 
                        px-4 py-2  cursor-pointer ${selectedCategory === c.id ? "bg-[#f6463b]" :"bg-[#0c0d12] hover:bg-[#1b1c21]"}`} 
                    key={c.id} onClick={()=>{setSelectedCategory(c.id)}}>{c.name}</li>
                })}
            </ul>
            }
        </>
    )
    }
