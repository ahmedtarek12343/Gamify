"use server";
export const getTrendingGames = async () => {
  const date = new Date();
  const year = date.getFullYear();
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&dates=${year}-01-01,${year}-12-31&ordering=-rating&page_size=10`,
  );
  if (!res.ok) throw new Error("Failed to fetch trending games");
  return res.json();
};
