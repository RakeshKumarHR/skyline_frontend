import { handleAxiosError } from "@/utils";
import { axiosInstance } from "./axiosInstance";
import { CommentResponse as CommentResponses } from "./profile";

export interface MovieResponse {
  readonly _id: string;
  title: string;
  synopsis: string;
  cover: string;
  genres: { _id: string; title: string }[];
  ratings: { user: string; value: number }[];
  averageRating: number;
  reviewsCount: number;
  comments?: [];
}

export interface GenresResponse {
  readonly _id: string;
  title: string;
}

interface CommentPayload {
  user: string;
  movie: string;
  text: string;
}

interface CommentResponse {
  message: string;
  data: {};
}

interface RatingPayload {
  movieId: string;
  rating: number;
  userId: string;
}
interface RatingResponse {
  message: string;
  movie: {};
}

const getMovies = async (): Promise<MovieResponse[]> => {
  try {
    const { data } = await axiosInstance.get("/api/movies");
    return data;
  } catch (error) {
    return handleAxiosError<MovieResponse[]>(error);
  }
};

const getGenres = async (): Promise<GenresResponse[]> => {
  try {
    const { data } = await axiosInstance.get("/api/movies/genres");
    return data;
  } catch (error) {
    return handleAxiosError<GenresResponse[]>(error);
  }
};

const getMovieById = async (movieId: string): Promise<MovieResponse | null> => {
  try {
    const { data } = await axiosInstance.get(`/api/movies/${movieId}`);
    return data;
  } catch (error) {
    return handleAxiosError<MovieResponse>(error);
  }
};

const addComment = async (
  payload: CommentPayload
): Promise<CommentResponse | null> => {
  try {
    const { data } = await axiosInstance.post("/api/comments", payload);
    return data;
  } catch (error) {
    return handleAxiosError<CommentResponse>(error);
  }
};

const addRating = async (
  payload: RatingPayload
): Promise<RatingResponse | null> => {
  try {
    const { data } = await axiosInstance.post("/api/movies/rate", payload);
    return data;
  } catch (error) {
    return handleAxiosError<RatingResponse>(error);
  }
};

const getCommentsByMovie = async (
  movieId: string
): Promise<CommentResponses[]> => {
  try {
    const { data } = await axiosInstance.get(`/api/comments/movie/${movieId}`);
    return data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export {
  getMovies,
  getGenres,
  getMovieById,
  addComment,
  addRating,
  getCommentsByMovie,
};
