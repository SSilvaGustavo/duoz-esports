import { useContext, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import { Headset } from "phosphor-react";

import { DiscordBox } from "./DiscordBox";
import { api } from "../Services/api";
import { AppContext } from "./Context/AppContext";

export interface SingleAdProps {
  id?: string;
  name: string;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
  weekDays: number[];
  onConnect: () => void;
}

interface Day {
  label: string;
  title: string;
}

export const stringDays: Day[] = [
  { label: "D", title: "Domingo" },
  { label: "S", title: "Segunda" },
  { label: "T", title: "Terça" },
  { label: "Q", title: "Quarta" },
  { label: "Q", title: "Quinta" },
  { label: "S", title: "Sexta" },
  { label: "S", title: "Sábado" },
];

export function GameAdsBox(props: SingleAdProps) {
  const { setIsAdModalOpen } = useContext(AppContext);
  const [discordUsername, setDiscordUsername] = useState("");

  async function getDiscordUser() {
    api
      .get(`/ads/${props.id}/discord`)
      .then(({ data }) => setDiscordUsername(data.discord));
  }

  const availableDays: string[] =
    props.weekDays.map((day) => stringDays[day].title ?? "") ?? [];
  return (
    <div className="pt-1 self-stretch rounded-lg mt-8 overflow-hidden bg-neon-gradient animate-content-show-box">
      <div className="flex flex-col text-white w-64 bg-space-700 p-4 gap-2 rounded-md">
        <div className="flex flex-col">
          <span className="text-gray-400">Nome</span>
          <span className="font-semibold">{props.name}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400">Tempo de jogo</span>
          <span className="font-semibold">{props.yearsPlaying} anos</span>
        </div>

        <div className="flex flex-col h-12 mb-5">
          <span className="text-gray-400">Disponibilidade</span>
          {
            <span className="flex font-semibold">
              {availableDays.join(" ")}
            </span>
          }
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400">Horários</span>
          <span className="font-semibold">
            {props.hourStart} <span className="text-gray-400">•</span>{" "}
            {props.hourEnd}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400">Voice</span>
          {props.useVoiceChannel ? (
            <span className="font-semibold text-green-300">Sim</span>
          ) : (
            <span className="font-semibold text-red-300">Não</span>
          )}
        </div>
        <div className="flex justify-center">
          <Dialog.Root onOpenChange={(open) => setIsAdModalOpen(open)}>
            <Dialog.Trigger
              onClick={getDiscordUser}
              className="flex gap-2 place-items-center px-8 py-2 mt-4 font-semibold rounded-md bg-space-400 hover:bg-space-500 transition-all hover:scale-105"
            >
              <Headset size={16} weight="bold" />
              Conectar
            </Dialog.Trigger>
            <DiscordBox discord={discordUsername} name={props.name} />
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
}
