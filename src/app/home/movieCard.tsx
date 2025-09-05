import React, { JSX } from "react";
import { MoviesInterface } from "./page";
import Image from "next/image";
import Typography from "@/components/atoms/typography";
import { TypographyVariant } from "../../../enums/typography";
import StarIcon from "@/assets/star";
import Genres from "../../components/molecules/genres";
import RatingAndReviews from "@/components/molecules/ratingAndReviews";

interface MoviesCardProps {
  movie: MoviesInterface;
}

export default function MovieCard({ movie }: MoviesCardProps): JSX.Element {
  const {
    averageRating,
    genres,
    id,
    numberOfReviews,
    poster,
    synopsis,
    title,
  } = movie;

  return (
    <div
      key={id}
      className="rounded-md shadow-md overflow-hidden transform transition duration-300 hover:scale-102 cursor-pointer"
    >
      <div className="relative w-full aspect-[2/3]">
        <Image
          src={poster}
          alt={title}
          fill
          className="object-cover"
          priority
        />
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
          averageRating={averageRating}
          numberOfReviews={numberOfReviews}
        />
        <Genres genres={genres} />
      </div>
    </div>
  );
}
