import { Fragment, useContext } from "react";
import { AppContext } from "./Context/AppContext";

import * as Dialog from "@radix-ui/react-dialog";

import { MagnifyingGlassPlus } from "phosphor-react";

import { CreateAdModal } from "./CreateAdModal";

interface CreateAdBannerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function CreateAdBanner({ open, setOpen }: CreateAdBannerProps) {
  const { pageLoaded, isMobile } = useContext(AppContext);

  return (
    <div
      className={`pt-1 mx-4 bg-neon-gradient self-stretch rounded-lg mt-8 overflow-hidden animate-gradient-x 
      ${
        pageLoaded ? "" : "animate-[fade-in-top_0.5s_ease-in-out_both_0.5s]"
      } xl:mx-0`}
    >
      <div className="bg-space-700 px-8 py-6 flex justify-between items-center flex-col md:flex-row">
        <div>
          <strong className="text-2xl text-white font-black block mb-5 md:mb-0">
            Não encontrou seu duo?
          </strong>
          {isMobile ? (
            <span className="text-zinc-400 my-3 block md:my-0">
              Publique um anúncio para encontrar novos players!
            </span>
          ) : (
            <Fragment></Fragment>
          )}
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
