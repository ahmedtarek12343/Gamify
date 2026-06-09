"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

const LazyImage = ({ ...props }: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full">
      <Image
        {...props}
        onLoad={() => setLoaded(true)}
        className={`${props.className}`}
      />
      {!loaded && <Skeleton className="w-full h-full" />}
    </div>
  );
};

export default LazyImage;
