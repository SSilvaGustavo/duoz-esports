import { AppContext } from "../components/Context/AppContext";
import { Fragment, useContext, useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";

import { GameController } from "phosphor-react";
import logoImg from "../assets/logo-duoz.svg";

import { SingleGameAd, SingleGameProps } from "../components/SingleGameAd";
import { GameAdsBox, SingleAdProps } from "../components/GameAdsBox";
import { Carets } from "../components/Utils/Carets";
import { CreateAdModal } from "../components/CreateAdModal";

import { Loading } from "../components/Utils/Loading";
import { KeenSliderOptions, useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { api } from "../Services/api";

interface GameProps extends SingleGameProps {}

interface GameAdsProps extends SingleAdProps {}

export function GameAd() {
  const [game, setGame] = useState<GameProps>();
  const [adInfos, setAdInfos] = useState<GameAdsProps[]>([]);
  const {
    isLoading,
    setIsLoading,
    isDesktop,
    setIsAdModalOpen,
    isAdModalOpen,
    isMobile,
  } = useContext(AppContext);
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderOptions: KeenSliderOptions = {
    initial: 0,
    breakpoints: {
      "(max-width: 640px )": {
        slides: { origin: "auto", perView: 1.25, spacing: 18 },
      },
      "(min-width: 768px )": {
        slides: { origin: "auto", perView: 2.6, spacing: 18 },
      },
      "(min-width: 1024px )": {
        slides: { origin: "auto", perView: 3, spacing: 26 },
      },
      "(min-width: 1280px )": {
        slides: { origin: "auto", perView: 4.4, spacing: 26 },
      },
    },
    animationEnded(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  };

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    breakpoints: {
      "(max-width: 640px )": {
        slides: { origin: "auto", perView: 1.25, spacing: 18 },
      },
      "(min-width: 768px )": {
        slides: { origin: "auto", perView: 2.6, spacing: 18 },
      },
      "(min-width: 1024px )": {
        slides: { origin: "auto", perView: 3, spacing: 26 },
      },
      "(min-width: 1280px )": {
        slides: { origin: "auto", perView: 4.4, spacing: 26 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    api.get(`/games/${gameId}`).then((response) => {
      setGame(response.data);
      setIsLoading(true);
      instanceRef.current?.update();
    });

    api.get(`/games/${gameId}/ads`).then((response) => {
      setAdInfos(response.data);
      instanceRef.current?.update();
    });
  }, []);

  useEffect(() => {
    instanceRef.current?.update({
      ...sliderOptions,
    });
  }, [instanceRef, sliderOptions]);

  console.log(adInfos.length);

  return (
    <div className="max-w-[1344px] mx-8 flex flex-col items-center my-10 md:my-20 xl:mx-auto">
      <Loading size={38} load={isLoading} />
      <div className="flex justify-center group md:flex-col">
        <Carets
          left
          onClick={() => navigate(-1)}
          leftCaretCustom="hover:text-sky-400 transition-colors absolute top-[5%] md:top-[10%] left-0 lg:top-6 lg:left-6"
        />
        {!isDesktop ? (
          <Link to={"/"}>
            <Fragment>
              <div className="w-full flex justify-center items-center mb-14">
                <img src={logoImg} alt="Project Logo" className="w-28" />
              </div>
            </Fragment>
          </Link>
        ) : (
          <Fragment></Fragment>
        )}
      </div>
      <SingleGameAd
        bannerUrl={`${game?.bannerUrl}`}
        title={`${game?.title}`}
        description={`${game?.description}`}
        categories={`${game?.categories}`}
        platforms={`${game?.platforms}`}
      />

      {adInfos.length ? (
        <Fragment>
          <div className="flex flex-col mt-10 mb-2 w-full place-items-center text-white gap-2 animate-fade-in-forward md:mt-24 md:mb-4">
            <h1
              className={`
                  text-3xl font-bold md:text-4xl 
                  ${ isAdModalOpen ? "hidden" : "" }
                `}
            >
              Bora duo?
            </h1>
            <span className={`
            text-gray-400 text-lg md:text-xl
              ${ isAdModalOpen ? "hidden" : "" }
            `}>
              Conecte-se e comece a jogar!
            </span>
          </div>
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
      <div className="w-full flex">
        {loaded && instanceRef.current && adInfos.length > 4 && isDesktop && (
          <Carets
            className="animate-[fade-in-forward_0.5s_ease-in-out_0.8s_both]"
            left={true}
            disabled={currentSlide === 0}
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
          />
        )}
        <div className="flex w-full overflow-hidden">
          {adInfos.length ? (
            <div
              ref={sliderRef}
              className={`keen-slider ${
                adInfos.length < 5 && isDesktop
                  ? "justify-center"
                  : "justify-start"
              }`}
            >
              {adInfos?.map((ad) => (
                <div
                  className="keen-slider__slide min-w-fit max-w-fit"
                  key={ad.id}
                >
                  <GameAdsBox
                    id={ad.id}
                    name={ad.name}
                    yearsPlaying={ad.yearsPlaying}
                    hourStart={ad.hourStart}
                    weekDays={ad.weekDays}
                    hourEnd={ad.hourEnd}
                    useVoiceChannel={ad.useVoiceChannel}
                    onConnect={() => ad.id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col w-full justify-center place-items-center text-gray-200 gap-4 mt-14 animate-fade-in-forward md:mt-6 lg:mt-32">
              <span className="text-lg text-center md:text-xl">
                Infelizmente ainda não temos anúncios, seja o primeiro a criar
                :)
              </span>
              <Dialog.Root onOpenChange={(open) => setIsAdModalOpen(open)}>
                <Dialog.Trigger className="flex items-center gap-3 py-3 px-4 text-white rounded bg-space-400 hover:bg-space-500 transition-colors">
                  <GameController size={24} />
                  Publicar Anúncio
                </Dialog.Trigger>
                <CreateAdModal />
              </Dialog.Root>
            </div>
          )}
        </div>
        {loaded && instanceRef.current && adInfos.length > 4 && isDesktop && (
          <Carets
            className="animate-[fade-in-forward_0.5s_ease-in-out_0.8s_both]"
            disabled={
              instanceRef.current?.size >= 1216
                ? currentSlide === instanceRef.current.slides.length - 4
                : currentSlide === instanceRef.current.slides.length - 3
            }
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
          />
        )}
      </div>
    </div>
  );
}
