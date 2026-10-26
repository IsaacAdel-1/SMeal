import { useTranslation } from "react-i18next";
import useResturants from "../hooks/useResturants";
import type { Resturant } from "../types";
import ResturantCard from "./Resturant";
import { useEffect } from "react";
import usePageParam from "@/shared/hooks/usePageParam";
import Pagination from "@/shared/components/Pagination";

export default function AvailableRestaurants({
  search,
  selectedCat,
}: {
  search: string;
  selectedCat: string;
}) {
  const { t } = useTranslation();
  const { page, setPage } = usePageParam();
  const { data, error, isError, isPending, isFetching } = useResturants({
    search: search,
    restaurantCategoryId: selectedCat,
    page,
  });

  useEffect(() => {
    if (data && data.totalPages > 0 && page > data.totalPages) setPage(data.totalPages);
  }, [data, page, setPage]);

  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [page]);

  if (isPending) return <p className="mt-5 text-muted-foreground">{t("availableRestaurants.loading")}</p>;
  if (isError) return <p className="mt-5 text-red-500">{error.message}</p>;
  return (
    <div>
      <h2 className="text-foreground mt-8 font-semibold mb-4 text-xl">
        {t("availableRestaurants.title")}
      </h2>

      {data.items.length === 0 ? (
        <p className="text-2xl font-semibold mt-5">{t("availableRestaurants.empty")}</p>
      ) : <div className="grid gap-6 max-[930px]:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ">
        {data.items.map((res: Resturant) => (
          <ResturantCard key={res.id} {...res} />
        ))}
      </div>}
      <p className="mt-4 text-sm text-muted-foreground">
        Showing {data.totalCount === 0 ? 0 : (page - 1) * data.pageSize + 1}–{Math.min(page * data.pageSize, data.totalCount)} of {data.totalCount}
      </p>
      <div className="mt-4">
        <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage} disabled={isFetching} />
      </div>
    </div>
  );
}
