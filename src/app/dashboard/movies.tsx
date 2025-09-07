import { JSX, useCallback } from "react";
import { MovieProps } from ".";
import Typography from "@/components/atoms/typography";
import Button from "@/components/atoms/button";
import { TypographyVariant } from "../../../enums/typography";
import Genres from "@/components/molecules/genres";
import StarIcon from "@/assets/star";
import EditIcon from "@/assets/edit";
import DeleteIcon from "@/assets/delete";

export default function Movies({ movies }: MovieProps): JSX.Element {
  const renderMovies = useCallback((): React.ReactNode => {
    return movies.map((movie) => (
      <div
        className="border rounded-lg p-2 border-gray-100 flex flex-col gap-1"
        key={movie._id}
      >
        <Typography variant={TypographyVariant.Caption}>
          {movie.title}
        </Typography>
        <Typography className="!text-[10px] text-gray-500">
          {movie.synopsis}
        </Typography>
        <Genres genres={movie.genres.map((ele) => ele.title)} />
        <div className="flex flex-row items-center gap-0.5">
          <StarIcon className="h-2 w-2 text-gray-500" />
          <Typography className="!text-[8px] text-gray-500">
            {movie.averageRating}
          </Typography>
          <Typography className="!text-[8px] text-gray-500">
            ({movie.reviewsCount} Reviews)
          </Typography>
        </div>
        <div className="flex gap-2">
          <div className="border rounded flex gap-1 items-center justify-center p-1 border-gray-100 cursor-pointer hover:bg-gray-200 flex-grow">
            <EditIcon className="text-gray-500 h-3 w-3" />
            <Typography className="!text-[8px]">Edit</Typography>
          </div>
          <div className="border rounded flex gap-1 items-center justify-center p-1 border-gray-200 cursor-pointer hover:bg-gray-200 ">
            <DeleteIcon className="text-red-500 h-3 w-3" />
          </div>
        </div>
      </div>
    ));
  }, [movies]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <Typography variant={TypographyVariant.Caption}>
          Movie Management
        </Typography>
        <Button label="Add Movie" onClick={() => {}} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
        {renderMovies()}
      </div>
    </div>
  );
}
