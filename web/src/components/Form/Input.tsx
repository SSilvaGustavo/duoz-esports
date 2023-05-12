import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  customClass?: string;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { customClass, errorMessage, ...rest } = props;

  return (
    <>
      <input
        {...rest}
        ref={ref}
        className={`bg-zinc-900 py-3 px-4 rounded text-sm max-h-12 placeholder:text-zinc-500  ${props.customClass}`}
      />
      {!!errorMessage && <span className="flex items-center gap-1 text-sm text-red-500 font-semibold">{errorMessage}</span>}
    </>
  )
})
