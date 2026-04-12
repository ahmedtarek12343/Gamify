"use server";
export const getPopularGames = async () => {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&ordering=-rating,-ratings_count`,
  );
  if (!res.ok) throw new Error("Failed to fetch popular games");
  return res.json();
};
