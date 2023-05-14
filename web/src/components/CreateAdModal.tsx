import { useEffect, useState, useContext } from "react";
import { AppContext } from "./Context/AppContext";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Check, GameController } from "phosphor-react";

import { Input } from "./Form/Input";
import { Select } from "./Form/Select";
import { WeekdaysInput } from "./Form/WeekdaysInput";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createAdFormSchema } from "../validation/create-ad";
import { api } from "../services/api";

export interface Game {
  id: string;
  title: string;
}

type CreateAdFormData = z.infer<typeof createAdFormSchema>;

export const CreateAdModal: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const { isAdModalOpen, setIsAdModalOpen } = useContext(AppContext);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
  const navigate = useNavigate();
  const methods = useForm<CreateAdFormData>({
    resolver: zodResolver(createAdFormSchema),
    defaultValues: {
      name: "",
      yearsPlaying: "",
      discord: "",
      weekDays: [],
      hourStart: "",
      hourEnd: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  useEffect(() => {
    api.get<Game[]>("/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  const handleCreateAd = async (data: CreateAdFormData) => {
    const toastLoading = toast.loading("Criando Anúncio...");
    try {
      await api.post(`/games/${data.game}/ads`, {
        game: data.game,
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: data.weekDays.sort(),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
      });
      toast.update(toastLoading, {
        render: "Anúncio criado com sucesso, você sera redirecionado para a página do game escolhido",
        type: "success",
        isLoading: false,
        autoClose: 3200,
      });

      handleCloseModal();

      setTimeout(() => {
        navigate(`/games/${data.game}/ads`);
      }, 4000);
    } catch (error) {
      console.log(error);
      toast.update(toastLoading, {
        render: "Houve um erro ao criar o anúncio, tente novamente mais tarde",
        type: "error",
        isLoading: false,
        autoClose: 3200,
      });
    }
  };

  const handleCloseModal = () => {
    reset();
    setIsAdModalOpen(false);
  };

  useEffect(() => {
    if (!isAdModalOpen) {
      handleCloseModal();
    }
  }, [isAdModalOpen]);

  return (
    <FormProvider {...methods}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
        <Dialog.Content
          className="fixed w-[480px] bg-space-700 py-8 px-10 text-white top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black/25
            animate-content-show"
        >
          <Dialog.Title className="text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>

          <form
            onSubmit={handleSubmit(handleCreateAd)}
            className="mt-8 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual o game
              </label>
            </div>
            <Controller
              name="game"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  games={games}
                  errorMessage={errors.game && errors.game.message}
                />
              )}
            />
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input
                id="name"
                type="text"
                {...register("name")}
                errorMessage={errors.name && errors.name.message}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 relative">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                <Input
                  id="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser zero :)"
                  {...register("yearsPlaying")}
                  errorMessage={errors.yearsPlaying && errors.yearsPlaying.message}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual o seu discord?</label>
                <Input
                  id="Discord"
                  type="text"
                  placeholder="Usuario#0000"
                  {...register("discord")}
                  errorMessage={errors.discord && errors.discord.message}
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="weekDays"
                  className="text-sm font-semibold sm:text-base"
                >
                  Quando costuma jogar?
                </label>
                <WeekdaysInput
                  name="weekDays"
                  control={control}
                  errorMessage={errors.weekDays && errors.weekDays.message}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Qual horario?</label>
                <div className="grid grid-cols-2 gap-2 relative">
                  <Input
                    id="hourStart"
                    type="time"
                    placeholder="De"
                    customClass="px-2"
                    {...register("hourStart")}
                    errorMessage={errors.hourStart && errors.hourStart.message}
                    className=""
                  />
                  <Input
                    id="hourEnd"
                    type="time"
                    placeholder="Até"
                    customClass="px-2"
                    {...register("hourEnd")}
                    errorMessage={errors.hourEnd && errors.hourEnd.message}
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm">
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={(checked) =>
                  setUseVoiceChannel(checked as boolean)
                }
                className="w-6 h-6 p-0.5 rounded bg-zinc-900"
              >
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
    </FormProvider>
  );
};
