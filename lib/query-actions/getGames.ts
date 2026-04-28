"use server";
export const getGames = async (
  search?: string,
  pageParam?: number,
  platforms?: string[],
  tags?: string[],
  parentPlatforms?: string,
  genres?: string[],
  ordering?: string,
) => {
  const params = new URLSearchParams({
    key: process.env.RAWG_API_KEY!,
  });

  if (search) params.append("search", search);
  if (platforms?.length) params.append("platforms", platforms.join(","));
  if (tags?.length) params.append("tags", tags.join(","));
  if (parentPlatforms) params.append("parent_platforms", parentPlatforms);
  if (genres?.length) params.append("genres", genres.join(","));
  if (ordering) params.append("ordering", ordering);

  const res = await fetch(
    `https://api.rawg.io/api/games?page=${pageParam ?? 1}&${params.toString()}`,
  );

  if (!res.ok) throw new Error("Failed to fetch games");

  return res.json();
};
