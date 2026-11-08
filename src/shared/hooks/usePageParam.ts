import { useSearchParams } from "react-router-dom";

/** The dashboard scrolls inside <main id="main-content">, not the window. */
export const scrollMainToTop = () =>
  document.getElementById("main-content")?.scrollTo({ top: 0, behavior: "smooth" });

export default function usePageParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = Number(searchParams.get("page"));
  const page = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

  const setPage = (nextPage: number, { scroll = true }: { scroll?: boolean } = {}) => {
    if (nextPage === page) return;
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (nextPage <= 1) next.delete("page");
        else next.set("page", String(nextPage));
        return next;
      },
      { replace: !scroll },
    );
    if (scroll) scrollMainToTop();
  };

  return { page, setPage };
}
