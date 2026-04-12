"use server";
export const getGame = async (id: string) => {
  const res = await Promise.all([
    fetch(
      `https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`,
    ),
    fetch(
      `https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.RAWG_API_KEY}`,
    ),
    fetch(
      `https://api.rawg.io/api/games/${id}/additions?key=${process.env.RAWG_API_KEY}`,
    ),
    fetch(
      `https://api.rawg.io/api/games/${id}/game-series?key=${process.env.RAWG_API_KEY}`,
    ),
    fetch(
      `https://api.rawg.io/api/games/${id}/achievements?key=${process.env.RAWG_API_KEY}`,
    ),
    fetch(
      `https://api.rawg.io/api/games/${id}/movies?key=${process.env.RAWG_API_KEY}`,
    ),
    fetch(
      `https://api.rawg.io/api/games/${id}/reddit?key=${process.env.RAWG_API_KEY}`,
    ),
  ]);
  const [game, screenshots, additions, series, achievements, movies, reddit] =
    await Promise.all(res.map((r) => r.json()));
  return {
    game,
    screenshots,
    additions,
    series,
    achievements,
    movies,
    reddit,
  };
};
