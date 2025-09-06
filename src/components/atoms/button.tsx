import { ButtonHTMLAttributes, JSX, MouseEventHandler } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ label, onClick }: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="bg-[#030213] text-white text-[10px] h-[24px] rounded w-full"
    >
      {label}
    </button>
  );
}
