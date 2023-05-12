import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { Control, FieldValues, Path, useController } from "react-hook-form";

interface Day {
  label: string;
  title: string;
}

const days: Day[] = [
  { label: "D", title: "Domingo" },
  { label: "S", title: "Segunda" },
  { label: "T", title: "Terça" },
  { label: "Q", title: "Quarta" },
  { label: "Q", title: "Quinta" },
  { label: "S", title: "Sexta" },
  { label: "S", title: "Sábado" },
];

interface WeekdaysInputControlProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errorMessage?: string;
}

export const WeekdaysInput = <T extends FieldValues = FieldValues>({
  name,
  control,
  errorMessage,
}: WeekdaysInputControlProps<T>): JSX.Element => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  return (
    <>
      <ToggleGroup.Root
        type="multiple"
        className="grid grid-cols-4 gap-2"
        value={value.map(String)}
        onValueChange={(newValue) => onChange(newValue.map(Number))}
      >
        {days.map((day, index) => (
          <ToggleGroup.Item
            key={day.title}
            value={index.toString()}
            className="[&[data-state='on']]:bg-space-400 aspect-square w-9 rounded bg-zinc-900 transition-colors hover:bg-zinc-800"
            title={day.title}
          >
            {day.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>

      {!!errorMessage && (
        <span className="w-48 flex items-center gap-1 text-sm text-red-500 font-semibold">
          {errorMessage}
        </span>
      )}
    </>
  );
};
