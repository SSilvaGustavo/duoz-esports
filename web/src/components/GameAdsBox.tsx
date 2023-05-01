import { Headset } from "phosphor-react";

export interface SingleAdProps {
  id?: string;
  name: string;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
  weekDays: number[];
}

export function GameAdsBox( props: SingleAdProps ) {
  const stringDays = [
    "Domingo ",
    "Segunda ",
    "Terça ",
    "Quarta ",
    "Quinta ",
    "Sexta ",
    "Sábado ",
  ];

  const availableDays: string[] = props.weekDays.map(day => stringDays[day] ?? '') ?? [];
  return (
    <div className="pt-1 self-stretch rounded-lg mt-8 overflow-hidden bg-duo-gradient animate-gradient-x">
      <div className="flex flex-col text-white w-64 bg-[#2A2634] p-4 gap-2 rounded-md">
        <div className="flex flex-col">
          <span className="text-gray-400">Nome</span>
          <span className="font-semibold">{props.name}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400">Tempo de jogo</span>
          <span className="font-semibold">{props.yearsPlaying} anos</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400">Disponibilidade</span>
          {
            <span className="flex font-semibold">{availableDays}</span>
          }
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400">Horários</span>
          <span className="font-semibold">
            {props.hourStart} <span className="text-gray-400">•</span> {props.hourEnd}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400">Voice</span>
          {
            props.useVoiceChannel ? 
            <span className="font-semibold text-green-300">Sim</span>
            :
            <span className="font-semibold text-red-300">Não</span>
          }
        </div>
        <div className="flex justify-center">
          <button 
          className="flex gap-2 place-items-center px-8 py-2 mt-4 font-semibold rounded-md bg-purple-500">
            <Headset size={16} weight="bold" />
            Conectar
          </button>
        </div>
      </div>
    </div>
  );
}
