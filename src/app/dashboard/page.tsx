import Dashboard from ".";
import { getGenres, getMovies } from "../../../services/movies";

export default async function DashboardPage() {
  const movies = await getMovies();
  const genres = await getGenres();
  return <Dashboard movies={movies} genres={genres} />;
}
