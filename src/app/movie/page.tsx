import Typography from "@/components/atoms/typography";
import Image from "next/image";
import { JSX } from "react";
import { TypographyVariant } from "../../../enums/typography";
import CommentIcon from "@/assets/comment";
import PostIcon from "@/assets/post";
import Comments from "./comments";
import Genres from "../../components/molecules/genres";
import RatingAndReviews from "@/components/molecules/ratingAndReviews";
import StarRating from "@/components/molecules/statRating";
const movie = {
  id: 1,
  title: "The Galactic Odyssey",
  synopsis:
    "A young astronaut embarks on an interstellar journey to save his home planet from impending doom.",
  averageRating: 4.7,
  numberOfReviews: 1285,
  genres: ["Sci-Fi", "Adventure", "Action"],
  poster:
    "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
};

export default function Movie(): JSX.Element {
  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-3 flex flex-col gap-2">
        <div className="relative w-full aspect-[2/3] ">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover rounded"
            priority
          />
        </div>
        <Typography>{movie.title}</Typography>
        <Genres genres={movie.genres} />
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
          numberOfReviews={movie.numberOfReviews}
        />
        <div className="border border-gray-100 p-[8px] rounded-lg flex flex-col gap-2 self-start">
          <Typography variant={TypographyVariant.Caption}>
            Rate this movie
          </Typography>
          <StarRating />
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
          <textarea
            className="bg-[#F3F3F5] rounded-lg px-[12px] py-[8px] w-full text-[10px] h-[60px] resize-none align-top outline-0"
            placeholder="Share your thoughts about this movie..."
          />
          <div className="bg-[#030213] px-[12] py-[6] self-end flex gap-2 rounded items-center">
            <PostIcon className="h-3 w-3" />
            <Typography
              className="text-white"
              variant={TypographyVariant.Caption}
            >
              Post Comment
            </Typography>
          </div>
        </div>
        <Comments />
      </div>
    </div>
  );
}
