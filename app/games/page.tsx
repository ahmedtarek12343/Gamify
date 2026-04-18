"use client";
import FitersBar from "@/components/utils/FitersBar";
import { useGetGames } from "@/hooks/games/useGetGames";
import { useGameFilterStore } from "@/store/game.store";
import { Game, Tag } from "@/types";
import GameCard from "@/components/games/GameCard";
import GamesLoading from "@/components/loading/GamesLoading";
import { useDebounce } from "use-debounce";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GamesPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const RestrictedTags = [44, 50, 312];
  const {
    selectedPlatform,
    selectedTags,
    setPage,
    page,
    search,
    selectedParentPlatform,
    selectedGenres,
    setSearch,
    setOrdering,
    ordering,
  } = useGameFilterStore();

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useGetGames(
    debouncedSearch,
    page,
    selectedPlatform,
    selectedTags,
    selectedParentPlatform,
    selectedGenres,
    ordering,
  );
  console.log(data);

  const isMobile = useIsMobile();

  return (
    <>
      <div className="flex">
        <Button
          className="md:hidden fixed top-20 left-4 z-50"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {isFilterOpen ? "Close" : "Open"}
        </Button>
        <div
          className={`fixed -translate-x-full md:translate-x-0 transition-all duration-300 z-50 md:sticky top-0 h-screen ${isFilterOpen ? "translate-x-0" : ""}`}
        >
          <FitersBar />
        </div>
        {isFilterOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
        )}{" "}
        {/* Global Search Bar */}
        <div className="flex flex-col flex-1 p-6">
          <div>
            <div className="flex gap-4">
              <div className="flex-75">
                <div className=" flex items-center relative group">
                  <Search className="absolute left-3.5 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="search"
                    placeholder="Search thousands of games..."
                    className="w-full pl-10 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:border-primary/50 focus-visible:ring-primary/20 transition-all rounded-full h-10 shadow-inner"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-25 flex items-center gap-2">
                <p className="text-sm font-medium whitespace-nowrap">
                  Sort by:{" "}
                </p>
                <Select
                  defaultValue="relevance"
                  onValueChange={(value) => setOrdering(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="rating">Rating (High to Low)</SelectItem>
                    <SelectItem value="-name">Name (A-Z)</SelectItem>
                    <SelectItem value="name">Name (Z-A)</SelectItem>
                    <SelectItem value="-released">Released (Newest)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div
            className={`${isMobile ? "pt-16" : ""} flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full`}
          >
            {isLoading ? (
              <GamesLoading />
            ) : data?.results?.length === 0 ? (
              <p>No games found</p>
            ) : (
              data?.results
                ?.filter(
                  (game: Game) =>
                    !game?.tags?.some((tag: Tag) =>
                      RestrictedTags.includes(tag.id),
                    ),
                )
                .map((game: Game) => <GameCard key={game.id} game={game} />)
            )}
            {data?.results.length > 0 && (
              <div className="flex justify-between items-center mt-4 col-span-full">
                <Button
                  disabled={page === 1}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  Previous
                </Button>
                <Button
                  disabled={!data?.next}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GamesPage;
