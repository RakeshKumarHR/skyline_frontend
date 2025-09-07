"use client";
import Typography from "@/components/atoms/typography";
import { JSX, useEffect, useMemo, useState } from "react";
import { TypographyVariant } from "../../../enums/typography";
import Movies from "./movies";
import Filters from "./filters";
import { Options } from "@/components/molecules/genreFilter";
import { GenresResponse, MovieResponse } from "../../../services/movies";
import { useRouter } from "next/router";

const { Caption } = TypographyVariant;
interface HomeInterface {
  movies: MovieResponse[];
  genres: GenresResponse[];
}

export default function Home({ movies, genres }: HomeInterface): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string | number | null>(
    null
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(debounce);
  }, [search]);

  const filteredMovies = useMemo<MovieResponse[]>(() => {
    return movies.filter((movie) => {
      const searchFilter = movie.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const matchesGenre =
        !selectedGenre ||
        movie.genres.some((genre) => genre.title === String(selectedGenre));

      return searchFilter && matchesGenre;
    });
  }, [debouncedSearch, movies, selectedGenre]);

  const genresList: Options[] = useMemo(() => {
    return genres.map((ele) => ({
      id: ele._id,
      label: ele.title,
      value: ele.title,
    }));
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="">
        <Typography>In-Flight Entertainment</Typography>
        <Typography variant={Caption} className="text-gray-500">
          Discover our curated collection of movies for your journey
        </Typography>
      </div>
      <Filters
        onSearch={(value) => {
          setSearch(value);
        }}
        genres={genresList}
        onSelect={(value) => {
          setSelectedGenre(value);
        }}
      />
      <Movies movies={filteredMovies} />
    </div>
  );
}
