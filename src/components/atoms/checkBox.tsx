import { InputHTMLAttributes } from "react";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function CheckBox({ label, ...props }: CheckBoxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className="h-3 w-3 rounded border border-gray-400 
                   appearance-none 
                   checked:bg-black checked:border-black 
                   relative
                   after:content-[''] after:absolute after:inset-0 
                   after:flex after:items-center after:justify-center
                   checked:after:content-['✔'] checked:after:text-white checked:after:text-[8px]"
        {...props}
      />
      <span className="text-gray-800 text-[10px]">{label}</span>
    </label>
  );
}
