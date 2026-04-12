import { useQuery } from "@tanstack/react-query";
import { getPopularGames } from "@/lib/query-actions/getPopularGames";

export const useGetPopularGames = () => {
  return useQuery({
    queryKey: ["popular-games"],
    queryFn: getPopularGames,
  });
};
