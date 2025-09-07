import FilterIcon from "@/assets/filter";
import { JSX, useState } from "react";
import Typography from "../atoms/typography";
import { TypographyVariant } from "../../../enums/typography";
import DownIcon from "@/assets/down";
import DropdownMenu from "./dropdownMenu";

export interface Options {
  readonly id: number | string;
  label: string;
  value: string;
}

interface GenreFilterProps {
  genres: Array<Options>;
  onSelect: (item: string | number) => void;
}

export default function GenreFilter({
  genres,
  onSelect,
}: GenreFilterProps): JSX.Element {
  const [selected, setSelected] = useState<string | number>("");
  return (
    <DropdownMenu
      triggerElement={
        <div className="flex rounded-md bg-[#f3f3f5] h-[24px] px-2 gap-6 items-center ">
          <FilterIcon className="h-3 w-3" />
          <Typography
            variant={TypographyVariant.Caption}
            className="text-gray-500"
          >
            {selected || "All Genres"}
          </Typography>
          <DownIcon className="h-3 w-3" />
        </div>
      }
      options={genres}
      onSelect={(option) => {
        onSelect(option.value);
        setSelected(option.value);
      }}
    />
  );
}
