import * as Dialog from '@radix-ui/react-dialog';
import logoImg from "../assets/logo-duoz.svg";
import { CreateAdBanner } from "../components/CreateAdBanner";
import { CreateAdModal } from "../components/CreateAdModal";
import { GamesAds } from "../components/GamesAds";
import { useContext } from 'react';
import { AppContext } from '../components/Context/AppContext';

export function Home() {
  const { pageLoaded } = useContext(AppContext)

  return (
      <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="Project Logo" className={`${pageLoaded ? '' : 'animate-fade-in-down'}`}/>

      <h1 className="text-6xl text-white font-black mt-20 flex gap-3">
        <p className={`${pageLoaded ? '' : 'animate-fade-in-left'}`}>Seu </p>
        <p className={`bg-neon-gradient bg-clip-text text-transparent ${pageLoaded ? '' : 'animate-fade-in-right-back'}`}>duo </p>
        <p className={`${pageLoaded ? '' : 'animate-fade-in-left'}`}>esta aqui.</p>
      </h1>
      <GamesAds />
      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
      </div>
  )
}
