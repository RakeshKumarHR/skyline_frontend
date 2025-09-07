"use client";
import StarIcon from "@/assets/star";
import React, { JSX, useEffect, useState } from "react";
interface StarRatingProps {
  onChange?: (value: number) => void;
  value?: number;
  readOnly?: boolean;
}
export default function StarRating({
  onChange = () => {},
  value,
  readOnly = false,
}: StarRatingProps): JSX.Element {
  const [rating, setRating] = useState<number>(0);
  useEffect(() => {
    if (value) {
      setRating(value);
    }
  }, [value]);

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, ind) => {
        const starValue = ind + 1;
        return (
          <StarIcon
            key={ind}
            onClick={() => {
              onChange(starValue);
              if (!readOnly) {
                setRating(starValue);
              }
            }}
            className={` ${!readOnly && "hover:scale-115 cursor-pointer"} ${
              starValue <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
}
