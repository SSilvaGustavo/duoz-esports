import { ButtonHTMLAttributes } from "react";

import { CaretLeft, CaretRight } from "phosphor-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  left?: boolean;
  leftCaretCustom?: string;
  rightCaretCustom?: string;
}

export function Carets(props: ButtonProps) {
  const { left, leftCaretCustom, rightCaretCustom, ...rest } = props;

  return (
    <button {...rest} className="group">
      {props.left ? (
        <CaretLeft
          className={`w-10 h-auto text-sky-200 ml-4 ${
            props.leftCaretCustom ?? ""
          } lg:w-12 group-disabled:opacity-40`}
        />
      ) : (
        <CaretRight
          className={`w-10 h-auto text-sky-200 mr-4 ${
            props.rightCaretCustom ?? ""
          } lg:w-12 group-disabled:opacity-40`}
        />
      )}
    </button>
  );
}
