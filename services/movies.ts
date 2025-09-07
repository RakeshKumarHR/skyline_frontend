import { axiosInstance } from "./axiosInstance";

export interface MovieResponse {
  readonly _id: string;
  title: string;
  synopsis: string;
  cover: string;
  genres: { _id: string; title: string }[];
  ratings: number[];
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

const handleAxiosError = <T = null>(error: any): T => {
  console.error("API Error:", error);
  return null as T;
};

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

export { getMovies, getGenres, getMovieById, addComment };
