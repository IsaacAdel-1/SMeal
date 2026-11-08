import { ArrowRight, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import type { Restaurant } from "../types";
import ResturantLogo from "../../../assets/svgs/ResturantLogo";
import { BikeIcon } from "../../../assets/svgs/Bike";
import { resolveAssetUrl } from "@/lib/utils";

export default function ResturantCard(restaurant: Restaurant) {
  const { t } = useTranslation();
  const logo = resolveAssetUrl(restaurant.logoUrl);

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-4 text-card-foreground">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-surface-raised">
          {logo ? (
            <img src={logo} alt="" loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <ResturantLogo className="h-full w-full" />
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate text-xl font-semibold text-card-foreground">{restaurant.name}</p>
          {restaurant.address && (
            <p className="flex items-center gap-1 truncate text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">{restaurant.address}</span>
            </p>
          )}
          <p className="flex items-center gap-1 text-sm text-info">
            <BikeIcon className="h-4 w-4" />
            {t("restaurantCard.distance", { distance: restaurant.maximumDeliveryDistanceKm })}
          </p>
        </div>
      </div>
      <Link
        to={`/restaurants/${restaurant.id}`}
        className="mt-6 flex h-9.5 items-center justify-center gap-4 rounded-[10px] bg-linear-135 from-brand to-brand-strong text-center text-white transition-opacity hover:opacity-90 rtl:bg-linear-225"
      >
        {t("restaurantCard.viewDetails")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
      </Link>
    </div>
  );
}
