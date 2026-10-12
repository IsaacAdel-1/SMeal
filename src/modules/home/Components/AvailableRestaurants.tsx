
import useResturants from "../hooks/useResturants"
import type { Resturant } from "../types"
import ResturantCard from "./Resturant"


export default function AvailableRestaurants({ search , selectedCat}: { search: string ; selectedCat :string }) {
   const {data , error , isError , isPending} = useResturants({search : search, restaurantCategoryId : selectedCat})
    
    if(isPending) return <p>Loading Resturants...</p>
    if(isError) return <p>{error.message}</p>
  return (
    <div>
        <h2 className="text-white mt-8 font-semibold mb-4 text-xl">Available Restaurants</h2>

        <div className="grid grid-cols-2 gap-6 max-[640px]:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.data.items.map((res : Resturant)=>{
                return <ResturantCard {...res}/>
            })}
        </div>
    </div>
  )
}
