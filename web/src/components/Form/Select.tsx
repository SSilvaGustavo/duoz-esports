import { CaretDown, CaretUp, Check, GameController } from "phosphor-react";
import * as SelectUi from "@radix-ui/react-select";
import { ReactNode, SelectHTMLAttributes } from "react";

export function Select({ children }: { children: ReactNode }) {
  return (
    <SelectUi.Root name="game"> 
      <SelectUi.Trigger className="inline-flex items-center justify-between bg-zinc-900 py-3 px-4 rounded text-sm
       placeholder:text-zinc-500">
        <SelectUi.Value placeholder="Selecione o game que deseja jogar..." />
        <SelectUi.Icon>
          <CaretDown size={18} />
        </SelectUi.Icon>
      </SelectUi.Trigger>

      <SelectUi.Portal>
        <SelectUi.Content className="overflow-hidden bg-zinc-900 rounded text-white animate-contentShow">
          <SelectUi.ScrollUpButton className="flex justify-center items-center h-6 bg-zinc-900 cursor-default">
            <CaretUp />
          </SelectUi.ScrollUpButton>
          <SelectUi.Viewport className="p-1">
            <SelectUi.Group>
                { children }
            </SelectUi.Group>
          </SelectUi.Viewport>
        </SelectUi.Content>
      </SelectUi.Portal>
    </SelectUi.Root>
  );
}
