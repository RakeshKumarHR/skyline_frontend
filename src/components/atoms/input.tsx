import { ChangeEventHandler, InputHTMLAttributes, JSX, useState } from "react";
import Typography from "./typography";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
  placeholder,
  label,
  onChange,
  value,
  ...props
}: InputProps): JSX.Element {
  return (
    <div>
      <Typography className="!text-[10px]">{label}</Typography>
      <input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="h-[24px] px-2 rounded bg-[#F3F3F5] text-[10px]  outline-none w-full"
        {...props}
      />
    </div>
  );
}
