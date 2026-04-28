"use client";
import { UserButton, Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { ThemeToggle } from "../utils/ThemeToggle";
import { useState } from "react";
import { Gamepad2, Heart, ShoppingCartIcon, Star } from "lucide-react";
import ResponsiveSheet from "../utils/ResponsiveSheet";
import { SheetTitle } from "../ui/sheet";
import GamesCart from "../games/GamesCart";
import { useCartStore } from "@/store/cart.store";
import NavLink from "../utils/NavLink";
import Link from "next/link";

const Header = () => {
  const [open, setOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);
  return (
    <header className="h-16 sticky top-0 z-60 bg-background/90 border-b-2 border-border/40 backdrop-blur-3xl">
      <div className="px-6 flex justify-between items-center h-full">
        <div className="flex items-center gap-2">
          <Link href="/">
            <span className="text-2xl font-bold text-primary">Gamify</span>
          </Link>
        </div>
        <nav className="mr-auto ml-4">
          <ul className="hidden md:flex items-center">
            <li>
              <NavLink
                href="/games"
                className="text-primary h-16 flex items-center font-medium transition-colors border-b border-transparent hover:border-primary hover:text-primary hover:bg-accent/50 px-4"
              >
                Games
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/wishlist"
                className="text-primary h-16 flex items-center font-medium transition-colors border-b border-transparent hover:border-primary hover:text-primary hover:bg-accent/50 px-4"
              >
                Wishlist
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/orders"
                className="text-primary h-16 flex items-center font-medium transition-colors border-b border-transparent hover:border-primary hover:text-primary hover:bg-accent/50 px-4"
              >
                My Orders
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign Up</Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Status"
                  labelIcon={<Star className="size-4" />}
                  href="/status"
                ></UserButton.Link>
                <UserButton.Link
                  label="My Orders"
                  labelIcon={<ShoppingCartIcon className="size-4" />}
                  href="/orders"
                ></UserButton.Link>
                <UserButton.Link
                  label="games"
                  labelIcon={<Gamepad2 className="size-4" />}
                  href="/games"
                ></UserButton.Link>
                <UserButton.Link
                  label="wishlist"
                  labelIcon={<Heart className="size-4" />}
                  href="/wishlist"
                ></UserButton.Link>
              </UserButton.MenuItems>
            </UserButton>
          </Show>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setOpen(true)}
            className="relative"
          >
            <ShoppingCartIcon className="size-5" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-1 rounded-full">
                {cart.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </Button>
          <ResponsiveSheet open={open} setOpen={setOpen} className="z-77">
            <div className="flex flex-col h-[85vh] sm:h-full bg-background border-none outline-none">
              <div className="p-5 sm:p-6 border-b border-border/40 flex justify-between items-center bg-card/80 backdrop-blur-md sticky top-0 z-60">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <ShoppingCartIcon className="h-5 w-5 text-primary" />
                  </div>
                  <SheetTitle className="text-lg font-bold tracking-tight">
                    Shopping Cart
                  </SheetTitle>
                </div>
                {cart.length > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                    {cart.reduce((acc, item) => acc + item.qty, 0)} Items
                  </span>
                )}
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar">
                <GamesCart onClose={() => setOpen(false)} />
              </div>
            </div>
          </ResponsiveSheet>
          <ThemeToggle />{" "}
        </div>
      </div>
    </header>
  );
};

export default Header;
