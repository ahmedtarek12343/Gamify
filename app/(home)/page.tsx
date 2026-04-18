"use client";
import TrendingGames from "@/components/games/TrendingGames";
import HeroSection from "@/components/home/HeroSection";
import ParentTags from "@/components/home/ParentTags";

const page = () => {
  return (
    <div>
      <HeroSection />
      <ParentTags />
      <TrendingGames />
    </div>
  );
};

export default page;
