import { useContext, useEffect, useState } from "react";
import { AppContext } from "./Context/AppContext";

import { GameBanner } from "./GameBanner";
import { Carets } from "./Utils/Carets";
import { Loading } from "./Utils/Loading";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { api } from "../services/api";

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

  const { pageLoaded, setIsLoading, isLoading } = useContext(AppContext);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: { origin: "auto", perView: 5.5, spacing: 15 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
      instanceRef.current?.update();
    },
  });

  useEffect(() => {
    api.get<Game[]>("/games").then((response) => {
      setGames(response.data);
      setIsLoading(true);
      instanceRef.current?.update();
    });
  }, []);

  return (
    <div
      className={`w-full flex items-center gap-4 mt-16 
      ${pageLoaded ? "" : "animate-[fade-in-down_0.5s_ease-in-out_0.5s_both]"}`}
    >
      {loaded && instanceRef.current && (
        <Carets
          left={true}
          disabled={currentSlide === 0}
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.prev()
          }
          leftCaretCustom={
            currentSlide === 0
              ? "opacity-30"
              : "opacity-100 hover:text-sky-400 transition-colors"
          }
        />
      )}
      <div ref={sliderRef} className="keen-slider">
        {games.map((game) => {
          return (
            <div key={game.id} className="keen-slider__slide rounded-lg">
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
      {loaded && instanceRef.current && (
        <Carets
          disabled={currentSlide === instanceRef.current.slides.length - 5}
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.next()
          }
          rightCaretCustom={
            currentSlide === instanceRef.current.slides.length - 5
              ? "opacity-30"
              : "opacity-100 hover:text-sky-400 transition-colors"
          }
        />
      )}
    </div>
  );
}
