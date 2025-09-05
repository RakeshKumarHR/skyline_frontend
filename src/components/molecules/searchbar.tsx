"use client";
import SearchIcon from "@/assets/search";
import { ChangeEventHandler, JSX } from "react";
interface SearchBarProps {
  placeHolder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
export default function SearchBar({
  placeHolder = "",
  value = "",
  onChange,
}: SearchBarProps): JSX.Element {
  return (
    <div className="flex rounded-md bg-[#f3f3f5] h-[24px] px-2 gap-2 items-center flex-grow col-span-7">
      <SearchIcon className="h-3 w-3" />
      <input
        className="text-[10px]  outline-none w-full"
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
