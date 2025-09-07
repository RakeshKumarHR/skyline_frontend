import { JSX, useCallback } from "react";
import { CommentResponse } from "../../../services/profile";
import Typography from "@/components/atoms/typography";
import { TypographyVariant } from "../../../enums/typography";
import { formatDate } from "@/utils";
interface CommentsInterface {
  comments: CommentResponse[];
}
export default function Comments({ comments }: CommentsInterface): JSX.Element {
  const renderComments = useCallback((): React.ReactNode => {
    return comments.map((comment) => {
      return (
        <div
          key={comment._id}
          className="border border-gray-100 rounded-lg p-2"
        >
          <Typography className="!text-[10px]">{comment.movie}</Typography>
          <Typography className="!text-[8px] text-gray-500 mb-1">
            {formatDate(comment.createdAt)}
          </Typography>
          <Typography className=" !text-[10px] text-gray-500">
            {comment.text}
          </Typography>
        </div>
      );
    });
  }, [comments]);
  return (
    <div className="flex flex-col gap-2 mb-2">
      <Typography
        variant={TypographyVariant.Caption}
        className="text-gray-500 "
      >
        Your Comments
      </Typography>
      {renderComments()}
    </div>
  );
}
