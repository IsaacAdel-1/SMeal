import { useState } from "react";
import ActiveGroupSessions from "../Components/ActiveSessions/ActiveGroupSessions";
import AvailableRestaurants from "../Components/AvailableRestaurants";
import ExploreCuisines from "../Components/ExploreCuisines";
import HomeNavbar from "../Components/HomeNavbar";
import useDebounce from "../hooks/useDebounce";
import useActiveSessions from "../hooks/useActiveSession";

export default function HomePage() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 400);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data: sessions } = useActiveSessions();
  console.log(sessions)
  
  return (
    <div className="w-full">
      <HomeNavbar />

      <div className="bg-background p-6">
        <ActiveGroupSessions sessions={sessions}/>
        <ExploreCuisines
          Search={searchText}
          SetSearch={setSearchText}
          selectedCat={selectedCategory}
          setSelectedCat={setSelectedCategory}
        />
        <AvailableRestaurants
          search={debouncedSearch}
          selectedCat={selectedCategory}
        />
      </div>
    </div>
  );
}