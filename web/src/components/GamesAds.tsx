import { useContext, useEffect, useState } from "react";
import { AppContext } from "./Context/AppContext";

import { GameBanner } from "./GameBanner";
import { Carets } from "./Utils/Carets";
import { Loading } from "./Utils/Loading";

import { KeenSliderOptions, useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { api } from "../Services/api";

interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

export function GamesAds() {
  const [games, setGames] = useState<Game[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { pageLoaded, setIsLoading, isLoading, isDesktop } =
    useContext(AppContext);

  const sliderOptions: KeenSliderOptions = {
    initial: 0,
    breakpoints: {
      "(max-width: 640px )": {
        slides: { origin: "auto", perView: 1.5, spacing: 18 },
      },
      "(min-width: 768px )": {
        slides: { origin: "auto", perView: 3.5, spacing: 18 },
      },
      "(min-width: 1024px )": {
        slides: { origin: "auto", perView: 3.5, spacing: 15 },
      },
      "(min-width: 1280px )": {
        slides: { origin: "auto", perView: 5.5, spacing: 15 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    animationEnded(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  };

  const [sliderRef, instanceRef] = useKeenSlider(sliderOptions);

  useEffect(() => {
    api.get("/games").then((response) => {
      setGames(response.data);
      setIsLoading(true);
    });
  }, []);

  useEffect(() => {
    instanceRef.current?.update({
      ...sliderOptions,
    });
  }, [instanceRef, sliderOptions]);

  return (
    <div
      className={`w-full flex items-center gap-4 mt-8 ${
        pageLoaded ? "" : "animate-[fade-in-down_0.5s_ease-in-out_0.5s_both]"
      } ${!isDesktop ? "ml-14" : ""} lg:mt-16`}
    >
      {loaded && instanceRef.current && isDesktop && (
        <Carets
          left={true}
          disabled={currentSlide === 0}
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.prev()
          }
        />
      )}
      <div ref={sliderRef} className="keen-slider">
        {games.map((game) => {
          return (
            <div
              key={game.id}
              className="keen-slider__slide rounded-lg ease-in-out duration-150"
            >
              <GameBanner
                gameId={game.id}
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
              />
            </div>
          );
        })}
        <Loading size={38} load={isLoading} />
      </div>
      {loaded && instanceRef.current && isDesktop && (
        <Carets
          disabled={
            instanceRef.current?.size >= 1000
              ? currentSlide === instanceRef.current.slides.length - 5
              : currentSlide === instanceRef.current.slides.length - 3
          }
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.next()
          }
        />
      )}
    </div>
  );
}
