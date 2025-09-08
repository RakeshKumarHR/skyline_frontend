"use client";
import { JSX, useCallback, useState } from "react";
import Typography from "@/components/atoms/typography";
import Button from "@/components/atoms/button";
import { TypographyVariant } from "../../../enums/typography";
import Genres from "@/components/molecules/genres";
import StarIcon from "@/assets/star";
import EditIcon from "@/assets/edit";
import DeleteIcon from "@/assets/delete";
import { deleteMovie, MovieResponse } from "../../../services/movies";
import AddMovie from "./addMovie";
import { MovieProps } from ".";
import { useRouter } from "next/navigation";

export default function Movies({ movies, genres }: MovieProps): JSX.Element {
  const router = useRouter();

  const [mode, setMode] = useState<"Add" | "Edit" | null>(null);
  const [movieDetails, setMovieDetails] = useState<null | MovieResponse>(null);

  const handleDelete = async (id: string): Promise<void> => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!confirmDelete) return;
    try {
      await deleteMovie(id);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  const renderMovies = useCallback((): React.ReactNode => {
    return movies.map((movie) => (
      <div
        className="border rounded-lg p-2 border-gray-100 flex flex-col justify-between gap-1"
        key={movie._id}
      >
        <div className="flex flex-col gap-1">
          <Typography variant={TypographyVariant.Caption}>
            {movie.title}
          </Typography>
          <Typography className="!text-[10px] text-gray-500 line-clamp-2">
            {movie.synopsis}
          </Typography>
          <Genres genres={movie.genres.map((ele) => ele.title)} />
          <div className="flex flex-row items-center gap-0.5">
            <StarIcon className="h-2 w-2 text-gray-500" />
            <Typography className="!text-[8px] text-gray-500">
              {movie.averageRating}
            </Typography>
            <Typography className="!text-[8px] text-gray-500">
              ({movie.reviewsCount} Reviews)
            </Typography>
          </div>
        </div>
        <div className="flex gap-2">
          <div
            className="border rounded flex gap-1 items-center justify-center p-1 border-gray-100 cursor-pointer hover:bg-gray-200 flex-grow"
            onClick={() => {
              setMovieDetails(movie);
              setMode("Edit");
            }}
          >
            <EditIcon className="text-gray-500 h-3 w-3" />
            <Typography className="!text-[8px]">Edit</Typography>
          </div>
          <div
            className="border rounded flex gap-1 items-center justify-center p-1 border-gray-200 cursor-pointer hover:bg-gray-200"
            onClick={() => handleDelete(movie._id)}
          >
            <DeleteIcon className="text-red-500 h-3 w-3" />
          </div>
        </div>
      </div>
    ));
  }, [movies]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <Typography variant={TypographyVariant.Caption}>
          Movie Management
        </Typography>
        <Button
          label="Add Movie"
          onClick={() => {
            setMode("Add");
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
        {renderMovies()}
      </div>
      {!!mode && (
        <AddMovie
          type={mode}
          movieDetails={movieDetails}
          onClose={() => {
            setMode(null);
            setMovieDetails(null);
            router.refresh();
          }}
          genres={genres}
        />
      )}
    </div>
  );
}
