"use server";
export const getPlatforms = async () => {
  const res = await fetch(
    `https://api.rawg.io/api/platforms?key=${process.env.RAWG_API_KEY}`,
  );
  const data = await res.json();
  return data;
};
