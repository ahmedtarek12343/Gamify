"use client";

import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon, Plus, Minus, Gamepad2 } from "lucide-react";
import Image from "next/image";
import { generatePrice } from "@/lib/utils";
import Link from "next/link";
import { Game } from "@/types";
import { useAddOrder } from "@/hooks/order/useAddOrder";

interface GamesCartProps {
  onClose?: () => void;
}

const GamesCart = ({ onClose }: GamesCartProps) => {
  const { cart, removeFromCart, addToCart, getTotalPrice } = useCartStore();
  const { mutate, isPending } = useAddOrder();

  const getPrice = (game: Game) => {
    const price = generatePrice(new Date(game.released).getTime());
    return typeof price === "number" ? price * game.qty : price;
  };
  const order = {
    totalAmount: getTotalPrice(),
    orderItems: cart.map((item) => ({
      gameId: item.id,
      gameName: item.name,
      gameImage: item.background_image,
      gamePrice: getPrice(item),
      gameQuantity: item.qty,
    })),
  };

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 h-full">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <div className="bg-gradient-to-br from-muted to-muted/50 p-6 rounded-full relative border border-border shadow-inner">
            <ShoppingCartIcon className="size-12 text-muted-foreground/50" />
          </div>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-foreground">
          Your cart is empty
        </h3>
        <p className="text-sm text-muted-foreground mt-2 mb-8 max-w-[250px]">
          Looks like you haven&apos;t added any games yet. Discover amazing
          titles to play!
        </p>
        <Button
          onClick={onClose}
          size="lg"
          className="rounded-full font-semibold shadow-md transition-transform hover:scale-105"
        >
          <Gamepad2 className="mr-2 h-4 w-4" />
          Browse Games
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden ">
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 no-scrollbar">
        <div className="py-6 flex flex-col gap-5">
          {cart.map((game) => (
            <div
              key={game.id}
              className="flex gap-4 group items-center relative overflow-hidden rounded-2xl border bg-card/50 p-2 pr-4 transition-all hover:bg-card hover:shadow-lg hover:border-primary/30 cart-item"
            >
              <div className="relative aspect-[3/4] w-20 sm:w-24 shrink-0 overflow-hidden rounded-xl border bg-muted shadow-sm transition-transform duration-500 group-hover:scale-[1.02]">
                {game.background_image ? (
                  <Image
                    src={game.background_image}
                    alt={game.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-secondary/50">
                    <span className="text-muted-foreground text-[10px]">
                      No Image
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="flex flex-col flex-1 justify-center gap-2 overflow-hidden py-1">
                <div className="flex flex-col items-start gap-1">
                  <Link
                    href={`/games/${game.id}`}
                    onClick={onClose}
                    className="font-semibold text-sm sm:text-base line-clamp-2 leading-tight transition-colors hover:text-primary decoration-primary/50 hover:underline underline-offset-4"
                  >
                    {game.name}
                  </Link>
                  <div className="flex items-center gap-2 cart-price">
                    <span className="font-bold whitespace-nowrap text-sm sm:text-base bg-primary/10 text-primary px-2 py-0.5 rounded-md border border-primary/20 ">
                      ${getPrice(game)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center rounded-lg border bg-background/80 backdrop-blur-sm shadow-sm overflow-hidden transition-colors hover:border-border/80">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none hover:bg-destructive/10 hover:text-destructive transition-colors"
                      onClick={(e) => {
                        removeFromCart(game);
                      }}
                    >
                      <Minus className="h-3 w-3" />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="w-8 text-center text-sm font-semibold bg-muted/30 h-full flex items-center justify-center border-x">
                      {game.qty}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none hover:bg-primary/10 transition-colors hover:text-green-500"
                      onClick={(e) => {
                        addToCart(game);
                      }}
                    >
                      <Plus className="h-3 w-3 " />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card/90 backdrop-blur-xl border-t p-5 sm:p-7 pb-25 mx-auto w-full z-10 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.15)] relative">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                Total
              </span>
              <span className="text-[10px] text-muted-foreground mt-0.5 bg-muted px-2 py-0.5 rounded-full w-max">
                Taxes calculated at checkout
              </span>
            </div>
            <p className="font-black text-3xl sm:text-4xl tracking-tight text-foreground">
              <span className="text-primary text-2xl sm:text-3xl mr-1">$</span>
              {getTotalPrice().toFixed(2)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <Button
              variant="outline"
              size="lg"
              className="w-full font-semibold rounded-xl h-12"
              onClick={onClose}
            >
              Keep Shopping
            </Button>
            <Button
              size="lg"
              className="w-full font-bold rounded-xl h-12 shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              disabled={cart.length === 0 || isPending}
              onClick={() => mutate(order)}
            >
              {isPending ? "Processing..." : "Checkout"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesCart;
