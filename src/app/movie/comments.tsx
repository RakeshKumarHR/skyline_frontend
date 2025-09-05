import Typography from "@/components/atoms/typography";
import React, { JSX, useCallback } from "react";
import { TypographyVariant } from "../../../enums/typography";
const comments = [
  {
    commentId: 1,
    comment:
      "Aamir Khan's finest work! 3 Idiots taught us that success isn't just about grades. Such an inspiring story.",
    username: "John",
    commentDate: "Feb 20, 2024, 05:00 PM",
  },
];

export default function Comments(): JSX.Element {
  const renderComments = useCallback<() => React.ReactNode>(() => {
    return comments.map((comment) => {
      return (
        <div
          className="p-[4px] flex flex-col items-start gap-1"
          key={comment.commentId}
        >
          <Typography className="font-medium">
            {comment.username}{" "}
            <span className="text-[10px] text-gray-500">
              {comment.commentDate}
            </span>
          </Typography>
          <Typography
            className="flex-shrink text-gray-500"
            variant={TypographyVariant.Caption}
          >
            {comment.comment}
          </Typography>
        </div>
      );
    });
  }, [comments]);
  return (
    <div className="border border-gray-100  rounded-lg p-[8px]">
      {renderComments()}
    </div>
  );
}
