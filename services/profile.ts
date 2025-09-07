import { handleAxiosError } from "@/utils";
import { axiosInstance } from "./axiosInstance";
export interface ProfileResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
  };
  comments: CommentResponse[];
  ratings: RatedMovieResponse[];
}

export interface CommentResponse {
  _id: string;
  text: string;
  movie: string;
  createdAt: string;
}

export interface RatedMovieResponse {
  _id: string;
  title: string;
  createdAt: string;
  userRating: number | null;
}

const getProfile = async (): Promise<ProfileResponse | null> => {
  try {
    const { data } = await axiosInstance.get("/api/profile");
    return data;
  } catch (error) {
    handleAxiosError(error);
    return null;
  }
};

export { getProfile };
