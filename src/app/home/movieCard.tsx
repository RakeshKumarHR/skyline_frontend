"use client";
import React, { JSX } from "react";
import Image from "next/image";
import Typography from "@/components/atoms/typography";
import { TypographyVariant } from "../../../enums/typography";

import Genres from "../../components/molecules/genres";
import RatingAndReviews from "@/components/molecules/ratingAndReviews";
import { MovieResponse } from "../../../services/movies";
import { useRouter } from "next/navigation";

interface MoviesCardProps {
  movie: MovieResponse;
}

export default function MovieCard({ movie }: MoviesCardProps): JSX.Element {
  const { genres, averageRating, _id, cover, synopsis, title, reviewsCount } =
    movie;
  const router = useRouter();

  const goToMovie = (): void => {
    router.push(`/movie/${_id}`);
  };

  return (
    <div
      key={_id}
      className="rounded-md shadow-md overflow-hidden transform transition duration-300 hover:scale-102 cursor-pointer"
      onClick={goToMovie}
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
          averageRating={averageRating}
          numberOfReviews={reviewsCount}
        />
        <Genres genres={genres.map((ele) => ele.title)} />
      </div>
    </div>
  );
}
