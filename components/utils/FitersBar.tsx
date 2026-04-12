"use client";
import { useGameFilterStore } from "@/store/game.store";
import { useGetParentPlatforms } from "@/hooks/games/useGetParentTags";
import { Platform } from "@/types";
import { Button } from "../ui/button";

const FitersBar = () => {
  const {
    selectedPlatform,
    setPlatforms,
    selectedParentPlatform,
    setParentPlatforms,
    clearPlatformFilters,
    clearParentPlatformFilters,
  } = useGameFilterStore();
  const { data } = useGetParentPlatforms();

  return (
    <div>
      <p>Filters</p>
      <div className="flex items-center gap-2">
        {data?.results.map((tag: Platform) => (
          <>
            <Button
              variant={
                selectedParentPlatform === tag.id.toString()
                  ? "default"
                  : "outline"
              }
              key={tag.id}
              onClick={() => {
                clearPlatformFilters();
                setParentPlatforms(tag.id.toString());
              }}
            >
              {tag.name}
            </Button>
            <div className="flex flex-col gap-2">
              {tag.platforms.length > 1 &&
                tag.platforms.map((platform: Platform) => (
                  <Button
                    variant={
                      selectedPlatform.includes(platform.id.toString())
                        ? "default"
                        : "outline"
                    }
                    key={platform.id}
                    onClick={() => {
                      clearPlatformFilters();
                      setParentPlatforms(tag.id.toString());
                      setPlatforms(platform.id.toString());
                    }}
                  >
                    {platform.name}
                  </Button>
                ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default FitersBar;
