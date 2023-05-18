import { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/Context/AppContext";

import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "../assets/logo-duoz.svg";
import piranhaPlant from "../assets/piranha-plant.gif";

import { CreateAdBanner } from "../components/CreateAdBanner";
import { GamesAds } from "../components/GamesAds";

export function Home() {
  const {
    pageLoaded,
    isLoading,
    isAdModalOpen,
    setIsAdModalOpen,
    isDesktop,
    isMobile,
  } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hideImage = setTimeout(() => {
      setIsVisible(false);
      return clearInterval(hideImage);
    }, 8250);

    const showImage = setTimeout(() => {
      setIsVisible(true);
      return clearInterval(showImage);
    }, 16200);

    const secondHideImage = setTimeout(() => {
      setIsVisible(false);
      return clearInterval(secondHideImage);
    }, 28650);
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20 relative overflow-hidden">
      <img
        src={logoImg}
        alt="Project Logo"
        className={`${
          pageLoaded ? "" : "animate-fade-in-down"
        } max-w-[50%] md:max-w-full`}
      />
      {isVisible && isLoading && isDesktop && (
        <img
          src={piranhaPlant}
          alt="Holiday Piranha Plant"
          className={`absolute top-[12%] -left-3 animate-[fade-in-top_0.5s_ease-in_4s_both] md:left-[56.5%]`}
        />
      )}

      <div className="flex justify-start w-full ml-14 text-4xl text-white font-black mt-20 gap-3 md:text-6xl md:justify-center md:ml-0">
        <p className={`${pageLoaded ? "" : "animate-fade-in-left"}`}>Seu </p>
        <p
          className={`bg-neon-gradient bg-clip-text text-transparent ${
            pageLoaded ? "" : "animate-fade-in-right-back"
          }`}
        >
          duo{" "}
        </p>
        <p className={`${pageLoaded ? "" : "animate-fade-in-left"}`}>
          esta aqui.
        </p>
      </div>
      {!isMobile ? (
        <span className="text-zinc-400 flex justify-start w-full ml-14 mt-3 text-lg animate-fade-in-right">
          Selecione um jogo que deseja jogar
        </span>
      ) : (
        <></>
      )}
      <GamesAds />
      <Dialog.Root>
        <CreateAdBanner open={isAdModalOpen} setOpen={setIsAdModalOpen} />
      </Dialog.Root>
    </div>
  );
}
