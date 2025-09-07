import { JSX } from "react";
import Home from ".";
import { getGenres, getMovies } from "../../../services/movies";

export default async function Movies() {
  const data = await getMovies();
  const genres = await getGenres();

  return <Home movies={data} genres={genres} />;
}
