import { axiosInstance } from "./axiosInstance";
export interface MovieResponse {
  readonly _id: string;
  title: string;
  synopsis: string;
  cover: string;
  genres: { _id: string; title: string }[];
  ratings: number;
  averageRating: number;
  reviewsCount: number;
  comments?: [];
}

export interface GenresResponse {
  readonly _id: string;
  title: string;
}
const getMovies = (): Promise<MovieResponse[]> => {
  return axiosInstance
    .get("/api/movies")
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => ({ err }));
};

const getGenres = (): Promise<GenresResponse[]> => {
  return axiosInstance
    .get("/api/movies/genres")
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => ({ err }));
};

const getMovieById = (movieId: string): Promise<MovieResponse> => {
  return axiosInstance
    .get(`/api/movies/${movieId}`)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => ({ err }));
};
export { getMovies, getGenres, getMovieById };
