import Dashboard from ".";
import { getMovies } from "../../../services/movies";

export default async function DashboardPage() {
  const data = await getMovies();
  return <Dashboard movies={data} />;
}
