import { CaretLeft, CaretRight } from "phosphor-react";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  left?: boolean;
  leftCaretCustom?: string;
  rightCaretCustom?: string;
}

export function Carets(props: ButtonProps) {
  const { left, leftCaretCustom, rightCaretCustom } = props;

  return (
    <button {...props}>
      {props.left ? (
        <CaretLeft
          className={`w-12 h-12 text-sky-200 ml-4 ${props.leftCaretCustom}`}
        />
      ) : (
        <CaretRight
          className={`w-12 h-12 text-sky-200 mr-4 ${props.rightCaretCustom}`}
        />
      )}
    </button>
  );
}
