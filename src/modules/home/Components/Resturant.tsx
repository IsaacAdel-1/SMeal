import { ArrowRight } from "lucide-react";
import type { Resturant } from "../types";
import ResturantLogo from "../../../assets/svgs/ResturantLogo";
import { StarIcon } from "../../../assets/svgs/Star";
import { BikeIcon } from "../../../assets/svgs/Bike";

export default function ResturantCard(resturant: Resturant) {
  return (
    <div className="bg-[#101116] flex flex-col p-4 rounded-2xl">
      <div className="flex gap-4 items-center">
        <div className="h-16 w-16 shrink-0 flex items-center justify-center">
          {resturant.logoUrl ? (
            <img
              src={resturant.logoUrl}
              className="h-full w-full object-cover rounded-2xl"
            />
          ) : (
            <ResturantLogo className="h-full w-full" />
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <p className="font-semibold text-xl text-white truncate">
            {resturant.name}
          </p>
          <p className="text-sm text-[#8e8e93] truncate">{resturant.address}</p>
          <div className="flex gap-4 text-sm text-indigo-200">
            <p className="flex items-center gap-1">
              <StarIcon className="w-4 h-4" /> 4
            </p>
            <p className="flex items-center gap-1">
              <BikeIcon className="w-4 h-4" />{" "}
              {resturant.maximumDeliveryDistanceKm} km
            </p>
          </div>
        </div>
      </div>
      <button className="flex items-center gap-4 text-center justify-center h-9.5 hover:bg-linear-135 from-[#FF5247] to-[#E0281E] mt-6 cursor-pointer rounded-[10px] bg-white/5 text-white">
        View Details & Menu <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
