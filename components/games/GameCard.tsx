import { Game } from "@/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import LazyImage from "../utils/LazyImage";
import { useRouter } from "next/navigation";
import { generatePrice } from "@/lib/utils";
import Image from "next/image";
import Platforms from "@/constants";

const GameCard = ({ game }: { game: Game }) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => {
        router.push(`/games/${game.id}`);
      }}
      className="pt-0 snap-start shrink-0 basis-[300px] group overflow-hidden border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/50 relative h-[400px] cursor-pointer"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {game.background_image ? (
          <LazyImage
            src={game.background_image}
            alt={game.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary/50">
            <span className="text-muted-foreground text-sm">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <CardHeader className="p-4 relative">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-primary">
            {game.name}
          </CardTitle>
          {game.rating > 0 && (
            <Badge
              variant="secondary"
              className="flex shrink-0 items-center gap-1 backdrop-blur-sm bg-background/80"
            >
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span>{game.rating.toFixed(1)}</span>
            </Badge>
          )}
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          {game.genres.map((genre) => (
            <Badge key={genre.id} variant="secondary">
              {genre.name}
            </Badge>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Badge>{new Date(game.released).getFullYear()}</Badge>
        </div>
        <div className="flex items-center gap-2 py-2">
          {game.parent_platforms?.map((platform) => (
            <Image
              key={platform.platform.id}
              src={
                Platforms.find((p) => p.name === platform.platform.slug)?.img ||
                "/next.svg"
              }
              alt={platform.platform.name}
              width={20}
              height={20}
              className="dark:invert"
            />
          ))}
        </div>
        <p className="text-lg font-semibold">
          {typeof generatePrice(new Date(game.released).getTime()) === "number"
            ? generatePrice(new Date(game.released).getTime()) + "$"
            : generatePrice(new Date(game.released).getTime())}
        </p>
      </CardHeader>
    </Card>
  );
};

export default GameCard;
