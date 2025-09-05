"use client";
import StarIcon from "@/assets/star";
import React, { JSX, useState } from "react";

export default function StarRating(): JSX.Element {
  const [rating, setRating] = useState<number>(0);

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, ind) => {
        const starValue = ind + 1;
        return (
          <StarIcon
            key={ind}
            onClick={() => setRating(starValue)}
            className={`cursor-pointer hover:scale-115 ${
              starValue <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
}
