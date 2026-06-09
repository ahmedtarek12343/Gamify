"use client";

import { useGetGameStatuses } from "@/hooks/games/useGetGameStatuses";
import {
  AlertCircle,
  Gamepad2,
  ListTodo,
  Play,
  CheckCircle2,
  PauseCircle,
  XCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import LazyImage from "../utils/LazyImage";
import { useRouter } from "next/navigation";

const StatusShowcase = () => {
  const { data, isLoading, error } = useGetGameStatuses();
  const router = useRouter();

  return (
    <div className="space-y-8 p-15">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-primary/10">
          <Gamepad2 className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Game Statuses</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your gaming journey
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
            {error.message || "Failed to load game statuses. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      {data && data.length === 0 && !isLoading && !error && (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed bg-muted/30">
          <Gamepad2 className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No Games Tracked</h3>
          <p className="text-muted-foreground max-w-sm mt-2">
            You haven't added any games to your status list yet. Start exploring
            and add some!
          </p>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.map((status) => (
            <Card
              key={status.id}
              onClick={() => router.push(`/games/${status.gameId}`)}
              className="group overflow-hidden border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/50 relative h-[320px] cursor-pointer p-0"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-muted h-[65%]">
                {status.gameImage ? (
                  <LazyImage
                    src={status.gameImage}
                    alt={status.gameName}
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
                <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <CardHeader className="p-4 relative h-[35%] flex flex-col justify-between border-t">
                <CardTitle className="line-clamp-2 text-base font-semibold transition-colors group-hover:text-primary">
                  {status.gameName}
                </CardTitle>
                <div className="flex justify-end mt-2">
                  <Badge
                    className={cn(
                      "flex items-center gap-1",
                      status.status === "Completed"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : status.status === "Playing"
                          ? "bg-blue-500 hover:bg-blue-600 text-white"
                          : status.status === "OnHold"
                            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                            : status.status === "Dropped"
                              ? "bg-red-500 hover:bg-red-600 text-white"
                              : status.status === "PlanToPlay"
                                ? "bg-purple-500 hover:bg-purple-600 text-white"
                                : "bg-secondary text-secondary-foreground",
                    )}
                  >
                    {status.status === "Completed" && (
                      <CheckCircle2 className="w-3 h-3" />
                    )}
                    {status.status === "Playing" && (
                      <Play className="w-3 h-3" />
                    )}
                    {status.status === "OnHold" && (
                      <PauseCircle className="w-3 h-3" />
                    )}
                    {status.status === "Dropped" && (
                      <XCircle className="w-3 h-3" />
                    )}
                    {status.status === "PlanToPlay" && (
                      <ListTodo className="w-3 h-3" />
                    )}
                    <span>{status.status}</span>
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusShowcase;
