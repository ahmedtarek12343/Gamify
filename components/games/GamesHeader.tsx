"use client";

import Link from "next/link";
import { UserButton, Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ThemeToggle } from "../utils/ThemeToggle";
import { useGameFilterStore } from "@/store/game.store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Search,
  Gamepad2,
  ShoppingCartIcon,
  TrashIcon,
  PlusIcon,
} from "lucide-react";
import { useState } from "react";
import ResponsiveSheet from "../utils/ResponsiveSheet";
import { useCartStore } from "@/store/cart.store";

const GamesHeader = () => {
  const { setSearch, search } = useGameFilterStore();
  const { cart, removeFromCart, addToCart, getTotalPrice } = useCartStore();
  console.log(cart);

  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 w-full border-b border-border bg-card shadow-sm z-40 relative">
      <div className="flex h-full items-center px-6 gap-4 xl:gap-8">
        {/* Logo Component */}
        <Link
          href="/"
          className="flex flex-shrink-0 items-center gap-2 transition-transform hover:scale-105 active:scale-95"
        >
          <div className="flex bg-primary/10 p-2 rounded-lg">
            <Gamepad2 className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:inline-block">
            Gamify
          </span>
        </Link>

        {/* Actions & Profile */}
        <div className="flex items-center gap-2 ms-auto shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            className="relative text-muted-foreground hover:text-foreground"
          >
            <ShoppingCartIcon className="size-5" />
            {/* Notification Dot */}
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full border-2 border-background bg-primary" />
            <span className="sr-only">Open cart</span>
          </Button>

          <ResponsiveSheet open={open} setOpen={setOpen}>
            <div className="flex flex-col h-full bg-card">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold tracking-tight">
                  Shopping Cart
                </h2>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground p-6">
                <div className="bg-muted p-4 rounded-full mb-4">
                  <ShoppingCartIcon className="size-8 opacity-50" />
                </div>
                {cart.length === 0 ? (
                  <>
                    <p className="font-medium text-foreground">
                      Your cart is empty
                    </p>
                    <p className="text-sm mt-1">
                      Looks like you haven&apos;t added any games yet.
                    </p>
                    <Button
                      className="mt-6"
                      variant="outline"
                      onClick={() => setOpen(false)}
                    >
                      Continue Browsing
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                <p>Total: {getTotalPrice()}</p>
              </div>
            </div>
          </ResponsiveSheet>

          <div className="h-6 mx-2 w-px bg-border/50 hidden sm:block" />

          <ThemeToggle />

          <div className="ml-2 hidden sm:flex items-center gap-2">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button variant="ghost" className="font-medium">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="font-medium rounded-full">Sign Up</Button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GamesHeader;
