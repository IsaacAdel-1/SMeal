import { useTranslation } from "react-i18next";
import SearchIcon from "../../../assets/svgs/Search";
import useCategories from "../hooks/useCategories";

export default function ExploreCuisines({
  Search,
  SetSearch,
  selectedCat,
  setSelectedCat,
}: {
  Search: string;
  SetSearch: (value: string) => void;
  selectedCat: string;
  setSelectedCat: (value: string) => void;
}) {
  const { t } = useTranslation();
  const { data, isPending, isError, error } = useCategories();

  return (
    <>
      <h2 className="text-foreground mt-8 font-semibold mb-4 text-xl">
        {t("exploreCuisines.title")}
      </h2>

      <div className="relative">
        <SearchIcon className="size-5 text-muted-foreground absolute top-1/2 -translate-y-1/2 start-3" />
        <input
          type="text"
          placeholder={t("exploreCuisines.searchPlaceholder")}
          className="text-foreground placeholder:text-muted-foreground ps-10 p-6 h-9.5 rounded-2xl w-full bg-surface-raised border border-border focus:outline outline-brand"
          onChange={(e) => {
            SetSearch(e.target.value);
          }}
          value={Search}
        />
      </div>

      {isPending && <p className="text-muted-foreground">{t("exploreCuisines.loading")}</p>}

      {isError && <p className="text-red-500">{error.message}</p>}

      {data && (
        <ul className="flex gap-2 overflow-x-scroll no-scrollbar mt-6">
          <li
            className={`text-foreground truncate border border-border rounded-2xl min-w-25 px-4 py-2 cursor-pointer ${
              selectedCat === "" ? "bg-brand" : "bg-surface hover:bg-surface-raised"
            }`}
            onClick={() => {
              setSelectedCat("");
            }}
          >
            {t("exploreCuisines.all")}
          </li>
          {data.data.map((c: any) => {
            return (
              <li
                className={`text-foreground truncate border border-border rounded-2xl min-w-30 px-4 py-2 cursor-pointer ${
                  selectedCat === c.id ? "bg-brand" : "bg-surface hover:bg-surface-raised"
                }`}
                key={c.id}
                onClick={() => {
                  setSelectedCat(c.id);
                }}
              >
                {c.name}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}