"use client";
import GenreFilter, { Options } from "@/components/molecules/genreFilter";
import SearchBar from "@/components/molecules/searchbar";
import { JSX, useState } from "react";
interface FilterProps {
  genres: Options[];
  onSearch(value: string): void;
  onSelect(value: string | number): void;
}

export default function Filters({
  onSearch,
  genres,
  onSelect,
}: FilterProps): JSX.Element {
  const [searhKeyword, setSearchKeyword] = useState<string>("");

  return (
    <div className="row flex gap-4">
      <SearchBar
        placeHolder="search movies..."
        onChange={(e) => {
          onSearch(e.target.value);
          setSearchKeyword(e.target.value);
        }}
        value={searhKeyword}
      />
      <GenreFilter
        genres={genres}
        onSelect={(genre: string | number) => {
          onSelect(genre);
        }}
      />
    </div>
  );
}
