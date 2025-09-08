import { ButtonHTMLAttributes, JSX, MouseEventHandler } from "react";
import { ButtonVariant } from "../../../enums/typography";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
}

export default function Button({
  label,
  onClick,
  variant = ButtonVariant.filled,
}: ButtonProps): JSX.Element {
  const baseClasses =
    "text-[10px] h-[24px] rounded px-3 py-1 transition-colors";

  const variantClasses =
    variant === ButtonVariant.filled
      ? "bg-[#030213] text-white hover:bg-[#1a1a2e]"
      : "border border-[#030213] text-[#030213] hover:bg-[#f3f3f5]";
  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {label}
    </button>
  );
}
