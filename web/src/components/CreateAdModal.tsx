import { useEffect, useState, FormEvent } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Check, GameController } from "phosphor-react";

import { Input } from "./Form/Input";
import { Select } from "./Form/Select";
import * as SelectUi from "@radix-ui/react-select";
import { useNavigate } from "react-router-dom";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
  const navigate = useNavigate()

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const toastLoading = toast.loading("Criando Anúncio...")
    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
    })
      toast.update(toastLoading, {render: "Anúncio criado com sucesso, você sera redirecionado para a página do game escolhido", type: "success", isLoading: false, autoClose: 3200})

      setTimeout(() => {
        navigate(`/games/${data.game}/ads`)
      },4000)

    } catch (error) {
      toast.update(toastLoading, {render: "Houve um erro ao criar o anúncio, tente mais tarde", type: "error", isLoading: false, autoClose: 3200})
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content
        className="fixed w-[480px] bg-space-700 py-8 px-10 text-white top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black/25
            animate-contentShow"
      >
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>
        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game
            </label>
          </div>
          <Select>
            <SelectUi.Label className="flex justify-center items-center pb-1 text-zinc-500">Games</SelectUi.Label>
            {
              games.map(games => {
                return (
                <SelectUi.Item key={games.id} value={games.id} className="flex items-center relative h-6 px-[13px] cursor-default hover:bg-space-400">
                  <SelectUi.ItemIndicator className="absolute right-6 inline-flex items-center justify-center text-green-500">
                    <Check size={18} weight="bold"/>
                  </SelectUi.ItemIndicator>
                  <SelectUi.ItemText>{games.title}</SelectUi.ItemText>
                </SelectUi.Item>
                )
              })
            }
          </Select>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input id="name" name="name" type="text" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder="Tudo bem ser zero :)"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu discord?</label>
              <Input id="Discord" name="discord" type="text" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando voce joga?</label>
              <ToggleGroup.Root type="multiple" className="grid grid-cols-4 gap-4" value={weekDays} onValueChange={setWeekDays}>
                <ToggleGroup.Item value="0" className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-space-400' : 'bg-zinc-900'}`} title="Domingo">
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item value="1" className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-space-400' : 'bg-zinc-900'}`} title="Segunda">
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item value="2" className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-space-400' : 'bg-zinc-900'}`} title="Terça">
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item value="3" className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-space-400' : 'bg-zinc-900'}`} title="Quarta">
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item value="4" className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-space-400' : 'bg-zinc-900'}`} title="Quinta">
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item value="5" className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-space-400' : 'bg-zinc-900'}`} title="Sexta">
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item value="6" className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-space-400' : 'bg-zinc-900'}`} title="Sábado">
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horario?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input id="hourStart" name="hourStart" type="time" placeholder="De" customClass="px-3"/>
                <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até" customClass="px-3"/>
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root 
            checked={useVoiceChannel}
            onCheckedChange={(checked) => {
              if (checked === true) {
                setUseVoiceChannel(true)
              } else {
                setUseVoiceChannel(false)
              }
            }} 
            className="w-6 h-6 p-0.5 rounded bg-zinc-900">
              <Checkbox.Indicator>
                <Check weight="bold" className="w-5 h-5 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="flex items-center gap-3 px-5 h-12 rounded-md font-semibold bg-space-400 hover:bg-space-500 transition-colors"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </Dialog.Portal>
  );
}
