"use client";
import { useGetParentPlatforms } from "@/hooks/games/useGetParentTags";
import { Genre, Platform } from "@/types";
import FilterButton from "./FilterButton";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Fragment } from "react/jsx-runtime";
import { SlidersHorizontal, X } from "lucide-react";
import { useGetTags } from "@/hooks/games/useGetTags";
import { useGameFilterStore } from "@/store/game.store";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useGetGenres } from "@/hooks/games/useGetGenres";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const FitersBar = () => {
  const { data, isLoading: platformsLoading } = useGetParentPlatforms();
  const { data: tags, isLoading: tagsLoading } = useGetTags();
  const { data: genres, isLoading: genresLoading } = useGetGenres();
  const { setTags, selectedTags, setGenres, selectedGenres, clearFilters } =
    useGameFilterStore();

  if (platformsLoading || tagsLoading || genresLoading) {
    return (
      <div className="w-80 shrink-0 max-h-screen border-r border-border bg-card shadow-sm flex flex-col overflow-y-auto no-scrollbar">
        <div className="flex h-14 items-center rounded-lg border-b border-border/50 p-6 backdrop-blur-sm bg-card/95">
          <SlidersHorizontal className="mr-3 h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Filters
          </h2>
        </div>

        <div className="flex flex-col gap-6 px-4 py-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 shrink-0 h-[calc(100vh-4rem)] border-r border-border bg-card shadow-sm flex flex-col overflow-y-auto no-scrollbar sticky top-16">
      <div className="flex h-14 items-center rounded-lg border-b border-border/50 p-6 bg-card sticky -top-1 z-10">
        <SlidersHorizontal className="mr-3 h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Filters
        </h2>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            clearFilters();
          }}
          className="ml-auto"
        >
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4 py-6">
        <div className="mb-4 px-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Platforms
          </h4>
        </div>

        <div className="flex flex-col gap-3">
          {data?.results?.map((tag: Platform) => (
            <Fragment key={tag.id}>
              <div className="flex flex-col gap-2">
                <FilterButton tag={tag} />
              </div>
              <Separator className="my-1 opacity-40 last:hidden" />
            </Fragment>
          ))}
        </div>
        <div className="mb-4 px-2">
          <h4 className="text-xs mt-5 font-semibold text-muted-foreground uppercase tracking-widest">
            Tags
          </h4>
        </div>
        <div className="flex flex-col gap-3">
          {tags?.results?.map((tag: Platform) => (
            <label
              key={tag.id}
              htmlFor={tag.id.toString()}
              className="flex justify-between items-center gap-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>{tag.name}</span>
                <Badge variant="secondary">{tag.games_count}</Badge>
              </div>

              <Input
                type="checkbox"
                id={tag.id.toString()}
                className="w-4 h-4 accent-primary"
                checked={selectedTags.includes(tag.id.toString())}
                onChange={() => setTags(tag.id.toString())}
              />
            </label>
          ))}
        </div>
        <div className="mb-4 px-2">
          <h4 className="text-xs mt-5 font-semibold text-muted-foreground uppercase tracking-widest">
            Genres
          </h4>
        </div>
        <div className="flex flex-col gap-3">
          {genres?.results?.map((genre: Genre) => (
            <label
              key={genre.id}
              htmlFor={genre.id.toString()}
              className="flex justify-between items-center gap-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>{genre.name}</span>
                <Badge variant="secondary">{genre.games_count}</Badge>
              </div>

              <Input
                type="checkbox"
                id={genre.id.toString()}
                className="w-4 h-4 accent-primary"
                checked={selectedGenres.includes(genre.id.toString())}
                onChange={() => setGenres(genre.id.toString())}
              />
            </label>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FitersBar;
