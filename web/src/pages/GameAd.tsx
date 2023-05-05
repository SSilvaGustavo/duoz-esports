import axios from "axios";
import { SingleGameAd, SingleGameProps } from "../components/SingleGameAd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameAdsBox, SingleAdProps } from "../components/GameAdsBox";
import { Carets } from "../components/Carets";
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from "../components/CreateAdModal";
import { GameController } from "phosphor-react";

interface GameProps extends SingleGameProps {}

interface GameAdsProps extends SingleAdProps {}

export function GameAd() {
  const [game, setGame] = useState<GameProps>();
  const [adInfos, setAdInfos] = useState<GameAdsProps[]>([]);
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    axios(`http://localhost:3333/games/${gameId}`).then((response) => {
      setGame(response.data);
    });

    axios(`http://localhost:3333/games/${gameId}/ads`).then((response) => {
      setAdInfos(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <div className="flex flex-col place-items-center justify-center absolute top-6 left-6 group">
        <Carets left onClick={() => navigate(-1)} leftCaretCustom="hover:text-sky-400 transition-colors"/>
        <span className="ml-5 opacity-0 transition-all text-white text-sm group-hover:opacity-100">Back</span>
      </div>
        <SingleGameAd 
          bannerUrl={`${game?.bannerUrl}`} 
          title={`${game?.title}`} 
          description={`${game?.description}`} 
          categories={`${game?.categories}`}
          platforms={`${game?.platforms}`}
        />

      <div className="flex flex-col w-full place-items-center text-white gap-2 mt-24 mb-4 animate-fade-in-forward">
        <h1 className="text-4xl font-bold">Bora duo?</h1>
        <span className="text-gray-400 text-xl">Conecte-se e comece a jogar!</span>
      </div>

    <div className="flex gap-8 w-full">
      {adInfos.length ?
        adInfos?.map((ad) => {
          return (
              <GameAdsBox
                key={ad.id}
                id={ad.id}
                name={ad.name}
                yearsPlaying={ad.yearsPlaying}
                hourStart={ad.hourStart}
                weekDays={ad.weekDays}
                hourEnd={ad.hourEnd}
                useVoiceChannel={ad.useVoiceChannel}
              />
          );
        })
      :
        <div className="flex flex-col w-full justify-center place-items-center text-gray-200 gap-4 mt-6 animate-fade-in-forward">
          <span className="text-xl">Infelizmente ainda não temos anúncios, seja o primeiro a criar um :)</span>
          <Dialog.Root>
            <Dialog.Trigger className="flex items-center gap-3 py-3 px-4 text-white rounded bg-space-400 hover:bg-space-500 transition-colors">
            <GameController size={24} />
            Publicar Anúncio
            </Dialog.Trigger>
           <CreateAdModal />
          </Dialog.Root>
        </div>
    }
      </div>
    </div>
  );
}