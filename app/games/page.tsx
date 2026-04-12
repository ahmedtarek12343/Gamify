"use client";
import FitersBar from "@/components/utils/FitersBar";
import { useGetGames } from "@/hooks/games/useGetGames";
import { useGameFilterStore } from "@/store/game.store";

const page = () => {
  const {
    selectedPlatform,
    selectedTags,
    page,
    search,
    selectedParentPlatform,
  } = useGameFilterStore();

  const { data } = useGetGames(
    search,
    page,
    selectedPlatform,
    selectedTags,
    selectedParentPlatform,
  );
  console.log(data);
  return (
    <div>
      <FitersBar />
    </div>
  );
};

export default page;
