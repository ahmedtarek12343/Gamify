"use server";
export const getTags = async () => {
  const res = await fetch(
    `https://api.rawg.io/api/tags?key=${process.env.RAWG_API_KEY}`,
  );
  const data = await res.json();
  return data;
};
