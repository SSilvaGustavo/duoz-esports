import * as Dialog from "@radix-ui/react-dialog";
import { Check, Copy, Sword, X } from "phosphor-react";
import { useState } from "react";

export interface DiscordProps {
  discord: string;
  name: string;
}

export function DiscordBox({ discord, name, ...rest }: DiscordProps) {
  const [copied, setIsCopied] = useState(false)

  const handleCopyClick = () => {
    navigator.clipboard.writeText(discord)
    setIsCopied(true)
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed w-96 bg-space-700 py-8 px-10 text-white top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black/25
            animate-content-show">
              <div className="flex flex-col gap-1 justify-center items-center">
          <Dialog.Close onClick={() => setIsCopied(false)} title="Close">
            <X size={20} className="absolute top-5 right-5 text-zinc-400 hover:scale-110 hover:text-zinc-300 transition-all"/>
          </Dialog.Close>
          <Sword size={80} weight="duotone" className="text-space-500 mb-6"/>
          <Dialog.Title className="text-3xl font-bold text-white">BORA DUO!</Dialog.Title>
          <span className="text-zinc-400 mb-6">Domine todas suas partidas!</span>

          <span className="text-sm">Adicione {name} no Discord</span>
          <div className="flex flex-col w-full">
            <div className="flex justify-center items-center gap-3 bg-slate-800 py-3 rounded-md text-white font-medium relative cursor-pointer" title="Copiar" onClick={handleCopyClick}>
              <span>{discord}</span>
              {
              copied ? 
              <Check size={22} className="absolute right-6 text-green-500" />
            
              :
              <Copy size={22} className="absolute right-6"/>
            }
            </div>
            {copied && <span className="text-sm text-green-400 mt-2 text-center animate-content-show">Texto copiado com sucesso!</span>}
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
