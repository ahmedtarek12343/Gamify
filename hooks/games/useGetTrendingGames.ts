import { useQuery } from "@tanstack/react-query";

export const useGetTrendingGames = () => {
  return useQuery({
    queryKey: ["trending-games"],
    queryFn: async () => {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&dates=2024-01-01,2024-12-31&ordering=-rating`,
      );
      if (!res.ok) throw new Error("Failed to fetch trending games");
      return res.json();
    },
  });
};
