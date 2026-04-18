"use client";

import { useGetTrendingGames } from "@/hooks/games/useGetTrendingGames";
import GameCard from "./GameCard";
import { Game } from "@/types";

const TrendingGames = () => {
  const { data } = useGetTrendingGames();
  console.log(data);

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold">Trending Games</h1>
      <div className="flex pt-10 pb-5 gap-6 overflow-x-auto no-track snap-x snap-mandatory">
        {data?.results.map((game: Game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default TrendingGames;
