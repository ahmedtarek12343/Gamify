import { buttonVariants } from "../ui/button";
import { useGetParentPlatforms } from "@/hooks/games/useGetParentTags";
import Link from "next/link";
import { Platform } from "@/types";
import { Badge } from "../ui/badge";

const ParentTags = () => {
  const { data, isLoading, isError } = useGetParentPlatforms();
  console.log(data);
  return (
    <div className="py-10 border px-4 mt-5 rounded-lg">
      <h2 className="text-lg font-bold mb-5 text-center">
        Buy PS5, PlayStation, Xbox & Nintendo Games in Egypt
      </h2>
      <p className="text-center text-muted-foreground text-sm max-w-4xl mx-auto">
        Discover the latest and greatest video games for all major platforms at
        Gamify. From action-packed adventures to immersive RPGs, we have
        something for every gamer. Shop now for PS5, PlayStation, Xbox, and
        Nintendo games in Egypt.
      </p>
      <div className="max-w-5xl mx-auto flex flex-wrap gap-4 mt-5">
        {data?.results.slice(0, 10).map((tag: Platform) => (
          <Link
            key={tag.id}
            href={`/platform/${tag.id}`}
            className={buttonVariants({ variant: "outline" })}
          >
            <p>{tag.name}</p>
            <Badge variant="secondary" className="ml-2">
              <span>{tag.platforms.length}</span>
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ParentTags;
