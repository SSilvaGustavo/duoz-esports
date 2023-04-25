import { useEffect, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';

import "./styles/global.css";

import logoImg from "./assets/logo-esports.svg";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { GamesAds } from "./components/GamesAds";

function App() {
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="Project Logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-duo-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>
      <GamesAds />
      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
