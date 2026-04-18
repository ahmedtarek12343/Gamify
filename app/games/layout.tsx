import React from "react";
import GamesHeader from "@/components/games/GamesHeader";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <GamesHeader />
      {children}
    </div>
  );
};

export default layout;
