import { useQuery } from "@tanstack/react-query";
import { getTrendingGames } from "@/lib/query-actions/getTrendingGames";

export const useGetTrendingGames = () => {
  return useQuery({
    queryKey: ["trending-games"],
    queryFn: getTrendingGames,
  });
};
