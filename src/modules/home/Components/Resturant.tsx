import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Resturant } from "../types";
import ResturantLogo from "../../../assets/svgs/ResturantLogo";
import { StarIcon } from "../../../assets/svgs/Star";
import { BikeIcon } from "../../../assets/svgs/Bike";
import { Link } from "react-router-dom";

export default function ResturantCard(resturant: Resturant) {
  const { t } = useTranslation();

  return (
    <div className="bg-card text-card-foreground flex flex-col p-4 rounded-2xl">
      <div className="flex gap-4 items-center">
        <div className="h-16 w-16 shrink-0 flex items-center justify-center bg-card">
          {resturant.logoUrl ? (
            <img
              src={resturant.logoUrl}
              alt={resturant.name}
              className="h-full w-full object-cover rounded-2xl"
            />
          ) : (
            <ResturantLogo className="h-full w-full bg-card" />
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <p className="font-semibold text-xl text-card-foreground truncate">{resturant.name}</p>
          <p className="text-sm text-muted-foreground truncate">{resturant.address}</p>
          <div className="flex gap-4 text-sm text-info">
            <p className="flex items-center gap-1">
              <StarIcon className="w-4 h-4" /> 4
            </p>
            <p className="flex items-center gap-1">
              <BikeIcon className="w-4 h-4" />{" "}
              {t("restaurantCard.distance", { distance: resturant.maximumDeliveryDistanceKm })}
            </p>
          </div>
        </div>
      </div>
      <Link
        to={`/restaurants/${resturant.id}`}
        className="flex items-center gap-4 text-center justify-center h-9.5 bg-linear-135 rtl:bg-linear-225 from-brand to-brand-strong text-white mt-6 cursor-pointer rounded-[10px]"
      >
        {t("restaurantCard.viewDetails")} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
      </Link>
    </div>
  );
}