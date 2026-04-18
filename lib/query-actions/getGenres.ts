"use server";

export const getGenres = async () => {
  const res = await fetch(
    `https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`,
  );
  const data = await res.json();
  return data;
};
