import { JSX } from "react";
import { getCommentsByMovie, getMovieById } from "../../../../services/movies";
import MovieComponent from ".";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function Movie({
  params,
}: MoviePageProps): Promise<JSX.Element> {
  try {
    const { id } = await params;
    const movie = await getMovieById(id);
    const comments = await getCommentsByMovie(id);

    if (!movie) {
      return <p>Movie not found.</p>;
    }

    return <MovieComponent movie={movie} comments={comments} />;
  } catch (error: any) {
    return <p>Failed to load movie. Please try again later.</p>;
  }
}
