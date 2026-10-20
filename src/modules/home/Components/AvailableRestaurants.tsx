import { useTranslation } from "react-i18next";
import useResturants from "../hooks/useResturants";
import type { Resturant } from "../types";
import ResturantCard from "./Resturant";

export default function AvailableRestaurants({
  search,
  selectedCat,
}: {
  search: string;
  selectedCat: string;
}) {
  const { t } = useTranslation();
  const { data, error, isError, isPending } = useResturants({
    search: search,
    restaurantCategoryId: selectedCat,
  });

  if (isPending) return <p className="mt-5 text-muted-foreground">{t("availableRestaurants.loading")}</p>;
  if (isError) return <p className="mt-5 text-red-500">{error.message}</p>;
  if (data?.data?.items.length === 0)
    return <p className="text-2xl font-semibold mt-5">{t("availableRestaurants.empty")}</p>;

  return (
    <div>
      <h2 className="text-foreground mt-8 font-semibold mb-4 text-xl">
        {t("availableRestaurants.title")}
      </h2>

      <div className="grid grid-cols-2 gap-6 max-[640px]:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.data.items.map((res: Resturant) => (
          <ResturantCard key={res.id} {...res} />
        ))}
      </div>
    </div>
  );
}