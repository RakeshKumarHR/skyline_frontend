"use client";
import Typography from "@/components/atoms/typography";
import Image from "next/image";
import { JSX, useCallback, useState } from "react";
import { TypographyVariant } from "../../../../enums/typography";
import CommentIcon from "@/assets/comment";
import PostIcon from "@/assets/post";
import Comments from "../comments";
import Genres from "../../../components/molecules/genres";
import RatingAndReviews from "@/components/molecules/ratingAndReviews";
import StarRating from "@/components/molecules/statRating";
import {
  addComment,
  addRating,
  MovieResponse,
} from "../../../../services/movies";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TextArea from "@/components/atoms/textArea";

interface MovieProps {
  movie: MovieResponse;
}

export default function MovieComponent({ movie }: MovieProps): JSX.Element {
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  const userId = session?.user?.id;

  const submitComment = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const payload = {
        user: String(userId),
        movie: movie._id,
        text: comment,
      };
      const data = await addComment(payload);
      if (data?.data && data?.message) {
        alert(data?.message);
        setComment("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [comment, movie, userId]);

  const updateRating = async (rating: number): Promise<void> => {
    const data = await addRating({
      movieId: movie._id,
      rating,
      userId: String(userId),
    });
    if (data) {
      router.refresh();
    }
  };
  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-3 flex flex-col gap-2">
        <div className="relative w-full aspect-[2/3] ">
          <Image
            src={movie.cover}
            alt={movie.title}
            fill
            className="object-cover rounded"
            priority
          />
        </div>
        <Typography>{movie.title}</Typography>
        <Genres genres={movie.genres?.map((ele) => ele.title)} />
      </div>
      <div className="col-span-7 flex flex-col gap-2">
        <Typography className="font-medium ">Synopsis</Typography>
        <Typography
          className="text-gray-500"
          variant={TypographyVariant.Caption}
        >
          {movie.synopsis}
        </Typography>
        <RatingAndReviews
          averageRating={movie.averageRating}
          numberOfReviews={movie.reviewsCount}
        />
        <div className="border border-gray-100 p-[8px] rounded-lg flex flex-col gap-2 self-start">
          <Typography variant={TypographyVariant.Caption}>
            Rate this movie
          </Typography>
          <StarRating
            onChange={(rating) => {
              updateRating(rating);
            }}
          />
        </div>
        <div className="flex gap-2 items-center ">
          <CommentIcon className="h-4 w-4" />
          <Typography
            className="text-gray-500"
            variant={TypographyVariant.Caption}
          >
            Comments
          </Typography>
        </div>
        <div className="border border-gray-100 rounded-lg p-[8px] gap-2 flex flex-col">
          <TextArea
            placeholder="Share your thoughts about this movie..."
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
          <div
            className="bg-[#030213] px-[12px] py-[6px] self-end flex gap-2 rounded items-center"
            onClick={submitComment}
          >
            <PostIcon className="h-3 w-3" />
            <Typography
              className="text-white"
              variant={TypographyVariant.Caption}
            >
              {loading ? "Posting..." : "Post Comment"}
            </Typography>
          </div>
        </div>
        <Comments />
      </div>
    </div>
  );
}
