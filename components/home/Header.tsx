"use client";
import Link from "next/link";
import { UserButton, Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { ThemeToggle } from "../utils/ThemeToggle";
import { useState } from "react";
import { ShoppingCartIcon } from "lucide-react";
import ResponsiveSheet from "../utils/ResponsiveSheet";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="h-16">
      <div className="px-6 flex justify-between items-center h-full">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">Gamify</span>
        </div>
        <nav className="mr-auto ml-4">
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/games">Games</Link>
            </li>
            <li>
              <Link href="/wishlist">Wishlist</Link>
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
            <UserButton />
          </Show>
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <ShoppingCartIcon className="size-5" />
          </Button>
          <ResponsiveSheet open={open} setOpen={setOpen}>
            <div className="p-4">
              <p>Shopping Cart</p>
            </div>
          </ResponsiveSheet>
          <ThemeToggle />{" "}
        </div>
      </div>
    </header>
  );
};

export default Header;
