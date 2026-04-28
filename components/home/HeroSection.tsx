"use client";
import { useGetPopularGames } from "@/hooks/games/useGetPopularGames";
import { Navigation, Pagination, A11y, Parallax } from "swiper/modules";
import SplitText from "gsap/SplitText";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/parallax";
import { useRouter } from "next/navigation";
import LazyImage from "../utils/LazyImage";
import { Skeleton } from "../ui/skeleton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Game } from "@/types";
gsap.registerPlugin(SplitText);
const HeroSection = () => {
  const { data: popularGames, isLoading, isError } = useGetPopularGames();
  const router = useRouter();

  useGSAP(() => {
    const activeSlide = document.querySelector(".swiper-slide-active");
    if (!activeSlide) return;
    const title = activeSlide.querySelector(".hero-title");
    let split = new SplitText(title, { type: "chars", mask: "chars" });
    gsap.timeline().from(split.chars, {
      y: 30,
      opacity: 0,
      stagger: 0.04,
    });
  });

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
    <div className="h-[40vh] mt-10">
      <Swiper
        modules={[Navigation, Pagination, A11y, Parallax]}
        slidesPerView={1}
        navigation
        loop
        speed={1400}
        parallax
        pagination={{ clickable: true }}
        className="h-full"
        onSlideChange={(swiper) => {
          const activeSlide = swiper.slides[swiper.activeIndex];
          const title = activeSlide.querySelector(".hero-title");
          let split = new SplitText(title, { type: "chars", mask: "chars" });
          gsap.from(split.chars, {
            y: 30,
            opacity: 0,
            stagger: 0.04,
          });
        }}
      >
        {popularGames?.results.map((game: Game) => (
          <SwiperSlide
            key={game.id}
            className="relative cursor-pointer"
            onClick={() => {
              router.push(`/games/${game.id}`);
            }}
          >
            <div
              slot="container-start"
              className="absolute inset-0"
              data-swiper-parallax="-60%"
            >
              <LazyImage
                src={game.background_image}
                alt={game.name}
                priority
                fill
                sizes="100vw"
                className="w-full h-full hero-image object-cover rounded-2xl object-top"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/40 to-transparent" />
            <div className="absolute bottom-10 left-5 md:left-20 z-10">
              <h1 className="hero-title text-xl md:text-4xl font-bold">
                {game.name}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
