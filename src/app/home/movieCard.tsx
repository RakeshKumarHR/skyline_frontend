import React, { JSX } from "react";
import Image from "next/image";
import Typography from "@/components/atoms/typography";
import { TypographyVariant } from "../../../enums/typography";
import StarIcon from "@/assets/star";
import Genres from "../../components/molecules/genres";
import RatingAndReviews from "@/components/molecules/ratingAndReviews";
import { MovieResponse } from "../../../services/movies";

interface MoviesCardProps {
  movie: MovieResponse;
}

export default function MovieCard({ movie }: MoviesCardProps): JSX.Element {
  const { genres, ratings, _id, cover, synopsis, title, reviewsCount } = movie;

  return (
    <div
      key={_id}
      className="rounded-md shadow-md overflow-hidden transform transition duration-300 hover:scale-102 cursor-pointer"
    >
      <div className="relative w-full aspect-[2/3]">
        <Image src={cover} alt={title} fill className="object-cover" priority />
      </div>

      <div className="p-2 flex flex-col gap-1">
        <Typography className="line-clamp-1">{title}</Typography>
        <Typography
          variant={TypographyVariant.Caption}
          className="text-gray-500 line-clamp-2"
        >
          {synopsis}
        </Typography>
        <RatingAndReviews
          averageRating={ratings}
          numberOfReviews={reviewsCount}
        />
        <Genres genres={genres.map((ele) => ele.title)} />
      </div>
    </div>
  );
}
