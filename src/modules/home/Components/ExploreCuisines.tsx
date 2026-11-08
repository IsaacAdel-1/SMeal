import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import SearchIcon from "../../../assets/svgs/Search";
import { useCategories } from "../hooks/useHomeQueries";

const chip = (active: boolean) =>
  `shrink-0 rounded-2xl border px-4 py-2 font-medium whitespace-nowrap transition-colors ${
    active
      ? "border-brand bg-brand text-white"
      : "border-border bg-surface text-foreground hover:bg-surface-raised"
  }`;

export default function ExploreCuisines({
  search,
  onSearchChange,
  selectedCat,
  onCategoryChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCat: string;
  onCategoryChange: (value: string) => void;
}) {
  const { t } = useTranslation();
  const { data: categories, isPending, isError, error } = useCategories();

  return (
    <section>
      <h2 className="mt-8 mb-4 text-xl font-semibold text-foreground">{t("exploreCuisines.title")}</h2>

      <div className="relative">
        <SearchIcon className="pointer-events-none absolute start-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          aria-label={t("exploreCuisines.searchPlaceholder")}
          placeholder={t("exploreCuisines.searchPlaceholder")}
          className="h-12 w-full rounded-2xl border border-border bg-surface-raised ps-10 pe-10 text-foreground outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 [&::-webkit-search-cancel-button]:hidden"
          onChange={(e) => onSearchChange(e.target.value)}
          value={search}
        />
        {search && (
          <button
            type="button"
            aria-label={t("exploreCuisines.clearSearch")}
            onClick={() => onSearchChange("")}
            className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {isPending && <p className="mt-4 text-muted-foreground">{t("exploreCuisines.loading")}</p>}
      {isError && <p className="mt-4 text-destructive">{error.message}</p>}

      {categories && (
        <ul className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
          <li>
            <button type="button" aria-pressed={selectedCat === ""} className={chip(selectedCat === "")} onClick={() => onCategoryChange("")}>
              {t("exploreCuisines.all")}
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                aria-pressed={selectedCat === c.id}
                className={chip(selectedCat === c.id)}
                onClick={() => onCategoryChange(c.id)}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
