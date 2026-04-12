"use server";
export const getParentPlatforms = async () => {
  const res = await fetch(
    `https://api.rawg.io/api/platforms/lists/parents?key=${process.env.RAWG_API_KEY}`,
  );
  const data = await res.json();
  return data;
};
