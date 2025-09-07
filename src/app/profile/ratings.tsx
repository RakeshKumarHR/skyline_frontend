import { JSX, useCallback } from "react";
import { RatedMovieResponse } from "../../../services/profile";
import Typography from "@/components/atoms/typography";
import StarRating from "@/components/molecules/statRating";
import { formatDate } from "@/utils";
import { TypographyVariant } from "../../../enums/typography";

interface RatingsInterface {
  ratings: RatedMovieResponse[];
}

export default function Ratings({ ratings }: RatingsInterface): JSX.Element {
  const renderRatings = useCallback((): React.ReactNode => {
    return ratings.map((ele) => {
      return (
        <div
          key={ele._id}
          className="border border-gray-100 rounded-lg p-2 w-full self-start"
        >
          <Typography className="!text-[10px] ">{ele.title}</Typography>
          <Typography className="!text-[8px] text-gray-500 mb-1">
            {formatDate(ele.createdAt)}
          </Typography>
          <StarRating readOnly value={ele.userRating || 0} />
        </div>
      );
    });
  }, [ratings]);
  return (
    <div className="flex flex-col gap-2 mb-2">
      <Typography
        variant={TypographyVariant.Caption}
        className="text-gray-500 "
      >
        Your Ratings
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {renderRatings()}
      </div>
    </div>
  );
}
