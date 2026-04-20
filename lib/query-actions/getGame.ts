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

  let trailers = movies;
  if (!movies.results?.length) {
    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(game.name + " official trailer")}&type=video&maxResults=3&key=${process.env.YOUTUBE_API_KEY}`,
    );
    const ytData = await ytRes.json();
    trailers = {
      results:
        ytData.items?.map((item: any) => ({
          id: item.id.videoId,
          name: item.snippet.title,
          preview: item.snippet.thumbnails.high.url,
          // normalized shape so GameShowcase doesn't need to change much
          isYoutube: true,
        })) ?? [],
    };
  }
  return {
    game,
    screenshots,
    additions,
    series,
    achievements,
    movies: trailers,
    reddit,
  };
};
