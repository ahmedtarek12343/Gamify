"use server";
export const getGames = async (
  search?: string,
  page: number = 1,
  platforms?: string[],
  tags?: string[],
  parentPlatforms?: string,
) => {
  const params = new URLSearchParams({
    key: process.env.RAWG_API_KEY!,
    page: String(page),
  });

  if (search) params.append("search", search);
  if (platforms?.length) params.append("platforms", platforms.join(","));
  if (tags?.length) params.append("tags", tags.join(","));
  if (parentPlatforms) params.append("parent_platforms", parentPlatforms);

  const res = await fetch(`https://api.rawg.io/api/games?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch games");

  return res.json();
};
