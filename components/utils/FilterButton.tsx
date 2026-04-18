"use client";
import { Platform } from "@/types";
import { Button } from "../ui/button";
import { useGameFilterStore } from "@/store/game.store";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

const FilterButton = ({ tag }: { tag: Platform }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    selectedPlatform,
    setPlatforms,
    selectedParentPlatform,
    setParentPlatforms,
  } = useGameFilterStore();

  useGSAP(() => {
    if (!containerRef.current) return null;
    if (selectedParentPlatform === tag.id.toString()) {
      gsap.to(containerRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
      });
    } else {
      gsap.to(containerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
      });
    }
  }, [selectedParentPlatform]);
  return (
    <>
      <Button
        variant={
          selectedParentPlatform === tag.id.toString() ? "default" : "outline"
        }
        key={tag.id}
        onClick={() => {
          if (selectedParentPlatform === tag.id.toString()) {
            setParentPlatforms("");
            return;
          }
          setParentPlatforms(tag.id.toString());
        }}
      >
        {tag.name}
      </Button>
      <div
        ref={containerRef}
        className="flex flex-col gap-2 overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        {tag.platforms.length > 1 &&
          tag.platforms.map((platform: Platform) => (
            <Button
              variant={
                selectedPlatform.includes(platform.id.toString())
                  ? "default"
                  : "outline"
              }
              key={platform.id}
              onClick={() => {
                setPlatforms(platform.id.toString());
              }}
            >
              {platform.name}
            </Button>
          ))}
      </div>
    </>
  );
};

export default FilterButton;
