import { useSearchParams } from "react-router-dom";

export default function usePageParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = Number(searchParams.get("page"));
  const page = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

  const setPage = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    if (nextPage <= 1) nextParams.delete("page");
    else nextParams.set("page", String(nextPage));
    setSearchParams(nextParams);
  };

  return { page, setPage };
}
