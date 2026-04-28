"use client";
import { useGetGame } from "@/hooks/games/useGetGame";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LazyImage from "../utils/LazyImage";
import GameCard from "./GameCard";
import { Comment } from "../Comments/Comment";

import {
  Star,
  Calendar,
  Globe,
  Trophy,
  Play,
  Image as ImageIcon,
  MessageSquare,
  Loader2,
  Link as LinkIcon,
  AlertCircle,
  ShoppingCartIcon,
  Trash2,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cart.store";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useChangeGameStatus } from "@/hooks/games/useChangeGameStatus";
import { Status } from "@/app/generated/prisma/enums";
import { useGetGameStatus } from "@/hooks/games/useGetGameStatus";
import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { RedditShowcase } from "./RedditShowcase";
import { AchievementsShowcase } from "./AchievementsShowcase";
import { useToggleWishlist } from "@/hooks/wishlist/useToggleWishlist";
import { useGetWishlistStatus } from "@/hooks/wishlist/useGetWishlistStatus";

gsap.registerPlugin(SplitText);

const GameShowcase = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useGetGame(id);
  const { addToCart } = useCartStore();
  const { mutate } = useChangeGameStatus();
  const { data: gameStatus } = useGetGameStatus(id);
  const { mutate: toggleWishlist } = useToggleWishlist();
  const { data: wishlistStatus } = useGetWishlistStatus(id);
  const cartIconRef = useRef<HTMLDivElement>(null);
  const cartTextRef = useRef<HTMLParagraphElement>(null);
  const cartText2Ref = useRef<HTMLParagraphElement>(null);
  const cartBtnRef = useRef<HTMLButtonElement>(null);

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data?.game) {
    return (
      <div className="w-full flex justify-center p-8">
        <div className="max-w-md bg-destructive/10 text-destructive p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5" />
          <div>
            <h3 className="font-semibold">Error</h3>
            <p className="text-sm">Failed to load game information.</p>
          </div>
        </div>
      </div>
    );
  }

  const { game, screenshots, additions, series, achievements, movies, reddit } =
    data;

  return (
    <div className="flex flex-col gap-8 pb-16 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[70vh] md:rounded-b-3xl overflow-hidden shadow-2xl border-b border-primary/10">
        {movies.results.length > 0 ? (
          movies.results[0].isYoutube ? (
            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-b-3xl">
              <iframe
                src={`https://www.youtube.com/embed/${movies.results[0].id}?autoplay=1&mute=1&loop=1&playlist=${movies.results[0].id}&controls=0&showinfo=0&rel=0&modestbranding=1&vq=hd1080`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "100vw",
                  height: "56.25vw",
                  minHeight: "100%",
                  minWidth: "177.77vh",
                  border: "none",
                }}
                allow="autoplay; encrypted-media; fullscreen"
              />
            </div>
          ) : (
            <video
              src={movies.results[0].data.max}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover rounded-b-3xl"
            />
          )
        ) : game.background_image ? (
          <LazyImage
            src={game.background_image}
            alt={game.name}
            fill
            className="object-cover transition-transform duration-1000 hover:scale-105"
            priority
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <ImageIcon className="w-20 h-20 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col gap-4">
          <div className="flex gap-4 items-center flex-wrap">
            <h1 className="text-4xl md:text-6xl font-black text-foreground drop-shadow-lg">
              {game.name}
            </h1>
            <Button
              ref={cartBtnRef}
              onClick={() => {
                addToCart(game);
                toast.success(`${game.name} added to cart`);
                const split = new SplitText(cartTextRef.current, {
                  type: "chars",
                });
                gsap
                  .timeline({
                    onComplete: () => {
                      gsap.delayedCall(1, () => {
                        const resetTl = gsap.timeline();

                        resetTl
                          .to(cartIconRef.current, {
                            x: 0,
                            duration: 0.9,
                            ease: "power3.inOut",
                          })
                          // 2. Fade old text shortly after movement starts
                          .to(
                            split.chars,
                            {
                              opacity: 1,
                              stagger: 0.018,
                              duration: 0.35,
                              ease: "power2.out",
                            },
                            "<0.2",
                          )
                          // 3. Recolor button DURING transition
                          .to(
                            cartBtnRef.current,
                            {
                              backgroundColor: "#fff",
                              color: "#000",
                              duration: 0.35,
                              ease: "power2.out",
                            },
                            "<0.2",
                          )
                          // 4. Show success text before motion fully ends
                          .to(
                            cartText2Ref.current,
                            {
                              opacity: 0,
                              x: 0,
                              duration: 0.45,
                              ease: "back",
                            },
                            "<0.35",
                          );
                      });
                    },
                  })

                  .to(cartIconRef.current, {
                    x: 120,
                    duration: 0.9,
                    ease: "power3.inOut",
                  })
                  // 2. Fade old text shortly after movement starts
                  .to(
                    split.chars,
                    {
                      opacity: 0,
                      stagger: 0.018,
                      duration: 0.35,
                      ease: "power2.out",
                    },
                    "<0.2",
                  )
                  // 3. Recolor button DURING transition
                  .to(
                    cartBtnRef.current,
                    {
                      backgroundColor: "#10b981",
                      color: "#ffffff",
                      duration: 0.35,
                      ease: "power2.out",
                    },
                    "<0.2",
                  )
                  // 4. Show success text before motion fully ends
                  .to(
                    cartText2Ref.current,
                    {
                      opacity: 1,
                      x: 24,
                      duration: 0.45,
                      ease: "back",
                    },
                    "<0.35",
                  );
              }}
              className="overflow-hidden"
              size="lg"
            >
              <div className="relative flex items-center gap-2">
                <div ref={cartIconRef} className="cart-icon">
                  <ShoppingCartIcon className="w-4 h-4" />{" "}
                </div>
                <p ref={cartTextRef}>Add to Cart</p>
                <p
                  ref={cartText2Ref}
                  className="absolute top-1/2 left-0 -translate-x-[125px] -translate-y-1/2"
                >
                  Enjoy &hearts;
                </p>
              </div>
            </Button>
            <Select
              onValueChange={(value) => {
                try {
                  mutate({
                    gameId: game.id.toString(),
                    gameName: game.name,
                    gameImage: game.background_image,
                    status: value as Status,
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
              value={gameStatus?.status}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="Playing">Playing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="OnHold">On Hold</SelectItem>
                <SelectItem value="Dropped">Dropped</SelectItem>
                <SelectItem value="PlanToPlay">Plan to Play</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                toggleWishlist(game);
              }}
              className="overflow-hidden"
              size="lg"
            >
              {wishlistStatus ? (
                <>
                  <Trash2 className="w-4 h-4" /> Remove Wishlist
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4" /> Add to Wishlist
                </>
              )}
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {game.rating > 0 && (
              <Badge
                variant="secondary"
                className="px-3 py-1.5 text-sm flex items-center gap-1.5 backdrop-blur-md bg-background/50 border-primary/20 hover:bg-background/80 transition-colors"
              >
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                {game.rating.toFixed(1)}
              </Badge>
            )}
            {game.released && (
              <Badge
                variant="secondary"
                className="px-3 py-1.5 text-sm flex items-center gap-1.5 backdrop-blur-md bg-background/50 border-primary/20 hover:bg-background/80 transition-colors"
              >
                <Calendar className="w-4 h-4 text-primary" />
                {new Date(game.released).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Badge>
            )}
            {game.website && (
              <Link
                href={game.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge
                  variant="secondary"
                  className="px-3 py-1.5 text-sm flex items-center gap-1.5 backdrop-blur-md bg-background/50 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  Official Website
                </Badge>
              </Link>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {game.genres?.map((g: any) => (
              <Badge
                key={g.id}
                variant="outline"
                className="text-foreground/80 border-foreground/20 backdrop-blur-sm bg-background/20"
              >
                {g.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          {/* Media Tabs (Screenshots & Videos) */}
          {(screenshots?.results?.length > 0 ||
            movies?.results?.length > 0) && (
            <Tabs
              defaultValue={
                screenshots?.results?.length > 0 ? "screenshots" : "trailers"
              }
              className="w-full"
            >
              <TabsList className="mb-4 bg-muted/50 p-1">
                {screenshots?.results?.length > 0 && (
                  <TabsTrigger
                    value="screenshots"
                    className="flex gap-2 data-[state=active]:bg-background data-[state=active]:text-primary rounded-md"
                  >
                    <ImageIcon className="w-4 h-4" /> Screenshots
                  </TabsTrigger>
                )}
                {movies?.results?.length > 0 && (
                  <TabsTrigger
                    value="trailers"
                    className="flex gap-2 data-[state=active]:bg-background data-[state=active]:text-primary rounded-md"
                  >
                    <Play className="w-4 h-4" /> Trailers
                  </TabsTrigger>
                )}
              </TabsList>

              {screenshots?.results?.length > 0 && (
                <TabsContent value="screenshots" className="mt-0 outline-none">
                  <ScrollArea className="w-full pb-4">
                    <div className="flex gap-4">
                      {screenshots.results.map((screenshot: any) => (
                        <div
                          key={screenshot.id}
                          className="relative w-[300px] md:w-[450px] aspect-video overflow-hidden rounded-xl shrink-0 group border border-primary/10 shadow-sm"
                        >
                          <LazyImage
                            src={screenshot.image}
                            alt="Screenshot"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </TabsContent>
              )}

              {movies?.results?.length > 0 && (
                <TabsContent value="trailers" className="mt-0 outline-none">
                  <ScrollArea className="w-full pb-4">
                    <div className="flex gap-4">
                      {movies.results.map((movie: any) => (
                        <div
                          key={movie.id}
                          className="relative w-[300px] md:w-[450px] aspect-video overflow-hidden rounded-xl shrink-0 group border border-primary/10 bg-black shadow-sm"
                        >
                          {movie.isYoutube ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${movie.id}`}
                              title={movie.name}
                              allowFullScreen
                              className="w-full h-full"
                            />
                          ) : (
                            <video
                              src={movie.data.max || movie.data["480"]}
                              poster={movie.preview}
                              controls
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </TabsContent>
              )}
            </Tabs>
          )}

          {/* About */}
          {game.description && (
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold flex items-center gap-2 text-foreground">
                <ImageIcon className="w-6 h-6 text-primary" />
                About this game
              </h3>
              <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
                <div
                  className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground leading-relaxed
                  prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-ul:list-disc prose-ol:list-decimal"
                  dangerouslySetInnerHTML={{ __html: game.description }}
                />
              </div>
            </div>
          )}

          {/* Series */}
          {series?.results?.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <LinkIcon className="w-6 h-6 text-primary" />
                More from this Series
              </h3>
              <ScrollArea className="w-full pb-4">
                <div className="flex gap-4">
                  {series.results.map((item: any) => (
                    <div key={item.id} className="w-[300px] shrink-0">
                      <GameCard game={item} />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          )}

          {/* Additions */}
          {additions?.results?.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <LinkIcon className="w-6 h-6 text-primary" />
                DLCs & Additions
              </h3>
              <ScrollArea className="w-full pb-4">
                <div className="flex gap-4">
                  {additions.results.map((item: any) => (
                    <div key={item.id} className="w-[300px] shrink-0">
                      <GameCard game={item} />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Achievements */}
          <AchievementsShowcase achievements={achievements} />

          {/* Reddit Community */}
          <RedditShowcase reddit={reddit} />

          {/* Comments */}
          <Comment gameId={id} />
        </div>
      </div>
    </div>
  );
};

export default GameShowcase;
