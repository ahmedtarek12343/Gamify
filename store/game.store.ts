import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface GameFilterStore {
  search: string;
  page: number;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  selectedPlatform: string[];
  setPlatforms: (platform: string) => void;
  selectedTags: string[];
  setTags: (tag: string) => void;
  selectedParentPlatform: string;
  setParentPlatforms: (platform: string) => void;
  clearFilters: () => void;
  clearPlatformFilters: () => void;
  clearParentPlatformFilters: () => void;
  clearTagFilters: () => void;
}

export const useGameFilterStore = create<GameFilterStore>()(
  immer((set) => ({
    search: "",
    page: 1,
    selectedPlatform: [],
    selectedParentPlatform: "",
    selectedTags: [],
    setSearch: (search: string) => set({ search }),
    setPage: (page: number) => set({ page }),
    setPlatforms: (platform: string) =>
      set((state) => {
        if (state.selectedPlatform.includes(platform)) {
          state.selectedPlatform = state.selectedPlatform.filter(
            (p) => p !== platform,
          );
        } else {
          state.selectedPlatform.push(platform);
        }
        state.page = 1;
      }),
    setTags: (tag: string) =>
      set((state) => {
        if (state.selectedTags.includes(tag)) {
          state.selectedTags = state.selectedTags.filter((t) => t !== tag);
        } else {
          state.selectedTags.push(tag);
        }
        state.page = 1;
      }),
    setParentPlatforms: (platform: string) =>
      set((state) => {
        state.selectedParentPlatform = platform;
        state.page = 1;
      }),
    clearFilters: () =>
      set({
        selectedPlatform: [],
        selectedParentPlatform: "",
        selectedTags: [],
        page: 1,
        search: "",
      }),
    clearParentPlatformFilters: () =>
      set({
        selectedParentPlatform: "",
        page: 1,
      }),
    clearPlatformFilters: () =>
      set({
        selectedPlatform: [],
        page: 1,
      }),
    clearTagFilters: () =>
      set({
        selectedTags: [],
        page: 1,
      }),
  })),
);
