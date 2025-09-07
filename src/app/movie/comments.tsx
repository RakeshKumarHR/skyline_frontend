import Typography from "@/components/atoms/typography";
import React, { JSX, useCallback } from "react";
import { TypographyVariant } from "../../../enums/typography";
import { CommentResponse } from "../../../services/profile";
import { formatDate } from "@/utils";
interface CommentProps {
  comments: CommentResponse[];
}
export default function Comments({ comments }: CommentProps): JSX.Element {
  const renderComments = useCallback<() => React.ReactNode>(() => {
    return comments.map((comment) => {
      return (
        <div
          className="p-[4px] flex flex-col items-start gap-1"
          key={comment._id}
        >
          <Typography className="font-medium">
            {comment?.user?.name}{" "}
            <span className="text-[10px] text-gray-500">
              {formatDate(comment?.createdAt)}
            </span>
          </Typography>
          <Typography
            className="flex-shrink text-gray-500"
            variant={TypographyVariant.Caption}
          >
            {comment.text}
          </Typography>
        </div>
      );
    });
  }, [comments]);
  return (
    <div className="border border-gray-100  rounded-lg p-[8px] gap-1">
      {renderComments()}
    </div>
  );
}
