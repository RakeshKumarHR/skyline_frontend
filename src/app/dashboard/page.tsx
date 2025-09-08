import Dashboard from ".";
import { getAllComments, getGenres, getMovies } from "../../../services/movies";

export default async function DashboardPage() {
  const movies = await getMovies();
  const genres = await getGenres();
  const comments = await getAllComments();

  return <Dashboard movies={movies} genres={genres} comments={comments} />;
}
