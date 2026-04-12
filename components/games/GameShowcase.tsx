"use client";
import { useGetGame } from "@/hooks/games/useGetGame";

const GameShowcase = ({ id }: { id: string }) => {
  const { data } = useGetGame(id);
  const { game, screenshots, additions, series, achievements, movies, reddit } =
    data || {};
  console.log(
    game,
    screenshots,
    additions,
    series,
    achievements,
    movies,
    reddit,
  );

  return <div>{game?.name}</div>;
};

export default GameShowcase;
