"use client";

import { useGetWishlists } from "@/hooks/wishlist/useGetWishlists";
import { useToggleWishlist } from "@/hooks/wishlist/useToggleWishlist";
import { AlertCircle, Heart, Gamepad2, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/utils/LazyImage";
import { useRouter } from "next/navigation";

const WishlistShowcase = () => {
  const { data, isLoading, error } = useGetWishlists();
  const router = useRouter();

  return (
    <div className="space-y-8 p-15">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-pink-500/10">
          <Heart className="w-8 h-8 text-pink-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Wishlist</h1>
          <p className="text-muted-foreground mt-1">
            Keep track of the games you want to play next
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-[320px] rounded-xl" />
          ))}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.message || "Failed to load wishlist. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      {data && data.length === 0 && !isLoading && !error && (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed bg-muted/30">
          <Heart className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-semibold">Wishlist is empty</h3>
          <p className="text-muted-foreground max-w-sm mt-2">
            You haven't added any games to your wishlist yet. Start exploring
            and find your next favorite game!
          </p>
          <Button className="mt-6" onClick={() => router.push("/games")}>
            <Gamepad2 className="w-4 h-4 mr-2" />
            Browse Games
          </Button>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.map((item) => (
            <Card
              key={item.id}
              onClick={() => router.push(`/games/${item.gameId}`)}
              className="group overflow-hidden border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-pink-500/50 relative h-[320px] cursor-pointer p-0"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-muted h-[65%]">
                {item.gameImage ? (
                  <LazyImage
                    src={item.gameImage}
                    alt={item.gameName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-secondary/50">
                    <span className="text-muted-foreground text-sm">
                      No Image
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <CardHeader className="p-4 relative h-[35%] flex flex-col justify-between border-t">
                <CardTitle className="line-clamp-2 text-base font-semibold transition-colors group-hover:text-pink-500">
                  {item.gameName}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistShowcase;
