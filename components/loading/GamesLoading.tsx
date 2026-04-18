import React from "react";
import { Skeleton } from "../ui/skeleton";

const GamesLoading = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 w-full col-span-full">
      {[...Array(12)].map((_, i) => (
        <Skeleton key={i} className="h-48 w-full" />
      ))}
    </div>
  );
};

export default GamesLoading;
