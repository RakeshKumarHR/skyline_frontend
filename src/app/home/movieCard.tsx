import React, { JSX, useCallback } from "react";
import { MoviesInterface } from "./page";
import Image from "next/image";
import Typography from "@/components/atoms/typography";
import { TypographyVariant } from "../../../enums/typography";
import ChipComponent from "@/components/molecules/chip";
import StarIcon from "@/assets/star";

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

  const renderGenres = useCallback<() => React.ReactNode>(() => {
    return genres.map((ele) => <ChipComponent label={ele} key={ele} />);
  }, [genres]);

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
        <div className="flex items-center gap-1">
          <Typography className="flex items-center">
            <StarIcon className="w-3 h-3 !text-yellow-500" /> {averageRating}
          </Typography>
          <Typography className="!text-[8px] text-gray-500">
            ({numberOfReviews} Reviews)
          </Typography>
        </div>
        <div className="flex flex-wrap gap-1 ">{renderGenres()}</div>
      </div>
    </div>
  );
}
