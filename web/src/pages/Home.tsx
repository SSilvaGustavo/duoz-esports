import * as Dialog from '@radix-ui/react-dialog';
import logoImg from "../assets/logo-duoz.svg";
import piranhaPlant from "../assets/piranha-plant.gif"
import { CreateAdBanner } from "../components/CreateAdBanner";
import { CreateAdModal } from "../components/CreateAdModal";
import { GamesAds } from "../components/GamesAds";
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../components/Context/AppContext';
import { useForm } from 'react-hook-form';

export function Home() {
  const { pageLoaded, isLoading, isAdModalOpen, setIsAdModalOpen } = useContext(AppContext)
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hideImage = setTimeout(() => {
      setIsVisible(false);
      return clearInterval(hideImage)
    }, 8250)

    const showImage = setTimeout(() => {
      setIsVisible(true);
      return clearInterval(showImage)
    }, 16200)

    const secondHideImage = setTimeout(() => {
      setIsVisible(false);
      return clearInterval(secondHideImage)
    }, 28650)
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20 relative">
      <img
        src={logoImg}
        alt="Project Logo"
        className={`${pageLoaded ? "" : "animate-fade-in-down"}`}
      />
      {isVisible && isLoading && (
        <img
          src={piranhaPlant}
          alt="Holiday Piranha Plant"
          className={`absolute top-[12%] left-[56.5%] animate-[fade-in-top_0.5s_ease-in_4s_both]`}
        />
      )}

      <h1 className="text-6xl text-white font-black mt-20 flex gap-3">
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
      </h1>
      <GamesAds />
      <Dialog.Root>
        <CreateAdBanner open={isAdModalOpen} setOpen={setIsAdModalOpen}/>

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}
