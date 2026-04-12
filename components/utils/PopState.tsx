"use client";

import { useEffect } from "react";
import { useGameFilterStore } from "@/store/game.store";

export function PopState() {
  const clearFilters = useGameFilterStore((s) => s.clearFilters);
  useEffect(() => {
    const handlePopState = () => {
      clearFilters();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [clearFilters]);

  return null;
}
