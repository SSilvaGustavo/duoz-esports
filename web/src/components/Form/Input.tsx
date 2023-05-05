import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  customClass?: string;
}

export function Input(props: InputProps) {
  const { customClass, ...rest } = props

  return (
    <input
      {...rest}
      className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500  ${props.customClass}`}
    />
  );
}
