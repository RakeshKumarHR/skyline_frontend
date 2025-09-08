"use client";
import { JSX, useMemo, useState } from "react";
import { GenresResponse, MovieResponse } from "../../../services/movies";
import Typography from "@/components/atoms/typography";
import { TypographyVariant } from "../../../enums/typography";
import Tabs, { TabOption } from "@/components/molecules/tabs";
import Movies from "./movies";

export interface MovieProps {
  movies: MovieResponse[];
  genres: GenresResponse[];
}
export default function Dashboard({ movies, genres }: MovieProps): JSX.Element {
  const tabList = useMemo((): TabOption[] => {
    return [
      {
        id: 1,
        label: "Movies",
        count: movies.length,
      },
      {
        id: 2,
        label: "Reviews",
        count: movies.length,
      },
    ];
  }, []);
  const [selectedTab, setSelectedTab] = useState(tabList[0].id);

  return (
    <div className="flex flex-col gap-1">
      <div>
        <Typography className="font-semiBold">Admin Panel</Typography>
        <Typography
          variant={TypographyVariant.Caption}
          className="text-gray-500"
        >
          Manage movies and moderate reviews
        </Typography>
      </div>
      <Tabs
        list={tabList}
        onSelect={(id) => {
          setSelectedTab(id);
        }}
      />
      {selectedTab === 1 ? <Movies movies={movies} genres={genres} /> : null}
    </div>
  );
}
