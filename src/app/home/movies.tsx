import React, { JSX, useCallback } from "react";
import MovieCard from "./movieCard";
import { MovieResponse } from "../../../services/movies";
interface MoviesProps {
  movies: Array<MovieResponse>;
}

export default function Movies({ movies = [] }: MoviesProps): JSX.Element {
  const renderMovies = useCallback<() => React.ReactNode>(() => {
    return movies?.map((movie) => {
      return <MovieCard movie={movie} key={movie._id} />;
    });
  }, [movies]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 gap-4">
      {renderMovies()}
    </div>
  );
}
