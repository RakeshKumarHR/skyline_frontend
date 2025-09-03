import React, { JSX, useCallback } from "react";
import { MoviesInterface } from "./page";
import MovieCard from "./movieCard";
interface MoviesProps {
  movies: Array<MoviesInterface>;
}

export default function Movies({ movies = [] }: MoviesProps): JSX.Element {
  const renderMovies = useCallback<() => React.ReactNode>(() => {
    return movies?.map((movie) => {
      return <MovieCard movie={movie} key={movie.id} />;
    });
  }, [movies]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {renderMovies()}
    </div>
  );
}
