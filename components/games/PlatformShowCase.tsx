"use client";
import { useGetParentPlatforms } from "@/hooks/games/useGetParentTags";
import { Platform } from "@/types";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGameFilterStore } from "@/store/game.store";
import { Fragment } from "react/jsx-runtime";

const PlatformShowCase = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useGetParentPlatforms();
  const platform = data?.results.find((tag: Platform) => tag.id === Number(id));
  const { setPlatforms, setParentPlatforms } = useGameFilterStore();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="h-[40vh] mt-10">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="h-[40vh] mt-10">
        <p>Something went wrong</p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center gap-2">
        <p>{platform.name}</p>
        <Badge variant="secondary" className="ml-2">
          <span>{platform.platforms.length}</span>
        </Badge>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {platform?.platforms.map((platform: Platform) => (
          <div key={platform.id}>
            <div
              onClick={() => {
                setPlatforms(platform.id.toString());
                setParentPlatforms(id);
                router.push(`/games`);
              }}
              className={buttonVariants({ variant: "outline" })}
            >
              <p>{platform.name}</p>
            </div>{" "}
            <Image
              src={platform.image_background}
              alt={platform.name}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformShowCase;
