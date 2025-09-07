import { JSX } from "react";
import Typography from "../atoms/typography";
import StarIcon from "@/assets/star";

interface RatingProps {
  averageRating: number;
  numberOfReviews: number;
}

export default function RatingAndReviews({
  averageRating,
  numberOfReviews,
}: RatingProps): JSX.Element {
  return (
    <div className="flex items-center gap-1">
      <Typography className="flex items-center">
        <StarIcon className="w-3 h-3 !text-yellow-500" />{" "}
        {averageRating?.toFixed(2)}
      </Typography>
      <Typography className="!text-[8px] text-gray-500">
        ({numberOfReviews} Reviews)
      </Typography>
    </div>
  );
}
