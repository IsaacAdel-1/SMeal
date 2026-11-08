import { useState } from "react";
import ActiveGroupSessions from "../Components/ActiveSessions/ActiveGroupSessions";
import AvailableRestaurants from "../Components/AvailableRestaurants";
import ExploreCuisines from "../Components/ExploreCuisines";
import HomeNavbar from "../Components/HomeNavbar";
import useDebounce from "../hooks/useDebounce";
import { useActiveSessions } from "../hooks/useHomeQueries";
import usePageParam from "@/shared/hooks/usePageParam";

export default function HomePage() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 400);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { page, setPage } = usePageParam();
  const { data: sessions, isLoading: sessionsLoading } = useActiveSessions();

  // A new search or category starts again from the first page.
  const onSearchChange = (value: string) => {
    setSearchText(value);
    setPage(1, { scroll: false });
  };
  const onCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setPage(1, { scroll: false });
  };

  return (
    <div className="w-full">
      <HomeNavbar isHost={!!sessions?.some((s) => s.currentUserIsOwner)} />

      <div className="bg-background p-4 sm:p-6">
        <ActiveGroupSessions sessions={sessions} isLoading={sessionsLoading} />
        <ExploreCuisines
          search={searchText}
          onSearchChange={onSearchChange}
          selectedCat={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
        <AvailableRestaurants
          search={debouncedSearch}
          selectedCat={selectedCategory}
          page={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
