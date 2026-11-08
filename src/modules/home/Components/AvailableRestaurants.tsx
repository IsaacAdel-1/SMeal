import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Pagination from "@/shared/components/Pagination";
import { useRestaurants } from "../hooks/useHomeQueries";
import ResturantCard from "./Resturant";

export default function AvailableRestaurants({
  search,
  selectedCat,
  page,
  onPageChange,
}: {
  search: string;
  selectedCat: string;
  page: number;
  onPageChange: (page: number, options?: { scroll?: boolean }) => void;
}) {
  const { t } = useTranslation();
  const { data, error, isError, isPending, isFetching } = useRestaurants({
    search,
    categoryId: selectedCat,
    page,
  });

  // A page number from the URL can be past the end once filters change.
  useEffect(() => {
    if (data && data.totalPages > 0 && page > data.totalPages) onPageChange(data.totalPages, { scroll: false });
  }, [data, page, onPageChange]);

  return (
    <section>
      <h2 className="mt-8 mb-4 text-xl font-semibold text-foreground">{t("availableRestaurants.title")}</h2>

      {isPending ? (
        <p className="text-muted-foreground">{t("availableRestaurants.loading")}</p>
      ) : isError ? (
        <p className="text-destructive">{error.message}</p>
      ) : (data?.items ?? []).length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card p-6 text-lg font-semibold">
          {search || selectedCat ? t("availableRestaurants.noMatches") : t("availableRestaurants.empty")}
        </p>
      ) : (
        <div className={`grid gap-6 transition-opacity sm:grid-cols-2 xl:grid-cols-3 ${isFetching ? "opacity-60" : ""}`}>
          {data.items.map((restaurant) => (
            <ResturantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      )}

      {data && (
        <div className="mt-6">
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            totalCount={data.totalCount}
            pageSize={data.pageSize}
            onPageChange={onPageChange}
            disabled={isFetching}
          />
        </div>
      )}
    </section>
  );
}
