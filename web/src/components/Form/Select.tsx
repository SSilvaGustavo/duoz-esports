import { CaretDown, CaretUp, Check } from "phosphor-react";
import * as SelectUi from "@radix-ui/react-select";
import { forwardRef } from "react";
import { Game } from "../CreateAdModal";

interface SelectGameProps {
  value: string;
  games: Game[];
  onChange: () => void;
  errorMessage?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectGameProps>((props, ref) => {
  const { value, games, onChange, errorMessage } = props;

  return (
    <SelectUi.Root value={value} onValueChange={onChange}> 
      <SelectUi.Trigger id="game" name="game" className="inline-flex items-center justify-between bg-zinc-900 py-3 px-4 rounded text-sm
       placeholder:text-zinc-500">
        <SelectUi.Value placeholder="Selecione o game que deseja jogar..." />
        <SelectUi.Icon>
          <CaretDown size={18} />
        </SelectUi.Icon>
      </SelectUi.Trigger>

      <SelectUi.Portal>
        <SelectUi.Content className="overflow-hidden bg-zinc-900 rounded text-white animate-content-show">
          <SelectUi.ScrollUpButton className="flex justify-center items-center h-6 bg-zinc-900 cursor-default">
            <CaretUp />
          </SelectUi.ScrollUpButton>
          <SelectUi.Viewport className="p-1">
            {games && games.map((game: Game)=> (
              <SelectUi.Item value={game.id} key={game.id} ref={ref} className="flex items-center relative h-6 px-[13px] cursor-default hover:bg-space-400">
                <SelectUi.ItemIndicator className="absolute right-6 inline-flex items-center justify-center text-green-500">
                  <Check size={18} weight="bold"/>
                </SelectUi.ItemIndicator>
                <SelectUi.ItemText>{game.title}</SelectUi.ItemText>
              </SelectUi.Item>
            ))}
          </SelectUi.Viewport>
        </SelectUi.Content>
      </SelectUi.Portal>
      {!!errorMessage && <span className="flex items-center gap-1 text-sm text-red-500 font-semibold">{errorMessage}</span>}
    </SelectUi.Root>
  )
})
