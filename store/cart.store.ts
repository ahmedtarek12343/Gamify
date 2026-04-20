import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Game } from "@/types";
import { generatePrice } from "@/lib/utils";

interface CartStore {
  cart: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (game: Game) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  immer((set, get) => ({
    cart: [],
    addToCart: (game: Game) =>
      set((state) => {
        const existingGame = state.cart.find((g) => g.id === game.id);
        if (existingGame) {
          existingGame.qty += 1;
        } else {
          state.cart.push({ ...game, qty: 1 });
        }
      }),
    removeFromCart: (game: Game) =>
      set((state) => {
        const existingGame = state.cart.find((g) => g.id === game.id);
        if (existingGame) {
          if (existingGame.qty === 1) {
            state.cart = state.cart.filter((g) => g.id !== game.id);
          } else {
            existingGame.qty -= 1;
          }
        }
      }),
    getTotalPrice: () => {
      const { cart } = get();
      const totalPrice = cart.reduce((acc: number, game: Game) => {
        return (
          acc + generatePrice(new Date(game.released).getTime()) * game.qty
        );
      }, 0);
      return totalPrice;
    },
    clearCart: () =>
      set({
        cart: [],
      }),
  })),
);
