"use client";
import React, { JSX, useState, useRef, useEffect } from "react";
import { Options } from "./genreFilter";

interface MenuProps {
  triggerElement: React.ReactNode;
  options: Array<Options>;
  onSelect: (item: Options) => void;
}

export default function DropdownMenu({
  triggerElement,
  options,
  onSelect,
}: MenuProps): JSX.Element {
  const [open, setOpen] = useState<Boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {triggerElement}
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-1 max-h-[160px] overflow-scroll">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[10px] cursor-pointer"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
