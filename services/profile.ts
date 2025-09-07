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
  user?: {
    _id: string;
    name: string;
  };
}

export interface RatedMovieResponse {
  _id: string;
  title: string;
  createdAt: string;
  userRating: number | null;
}
interface CommentPayload {
  commentId: string;
  comment: string;
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

const updateComment = async (payload: CommentPayload) => {
  try {
    const { data } = await axiosInstance.put("/api/comments", payload);
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const deleteComment = async (commentId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/api/comments/${commentId}`);
    return data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export { getProfile, updateComment, deleteComment };
