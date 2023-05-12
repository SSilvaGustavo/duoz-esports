import { useContext } from "react";
import { AppContext } from "./Context/AppContext";

import * as Dialog from "@radix-ui/react-dialog";

import { MagnifyingGlassPlus } from "phosphor-react";

import { CreateAdModal } from "./CreateAdModal";

interface CreateAdBannerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function CreateAdBanner({ open, setOpen }: CreateAdBannerProps) {
  const { pageLoaded } = useContext(AppContext);

  return (
    <div
      className={`pt-1 bg-neon-gradient self-stretch rounded-lg mt-8 overflow-hidden animate-gradient-x 
      ${pageLoaded ? "" : "animate-[fade-in-top_0.5s_ease-in-out_both_0.5s]"}`}
    >
      <div className="bg-space-700 px-8 py-6 flex justify-between items-center">
        <div>
          <strong className="text-2xl text-white font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="flex items-center gap-3 py-3 px-4 text-white rounded bg-space-400 hover:bg-space-500 transition-colors">
            <MagnifyingGlassPlus size={24} />
            Publicar Anúncio
          </Dialog.Trigger>

          <CreateAdModal />
        </Dialog.Root>
      </div>
    </div>
  );
}
