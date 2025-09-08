"use client";
import { JSX, useCallback, useState } from "react";
import {
  CommentResponse,
  deleteComment,
  updateComment,
} from "../../../services/profile";
import Typography from "@/components/atoms/typography";
import { ButtonVariant, TypographyVariant } from "../../../enums/typography";
import { formatDate } from "@/utils";
import EditIcon from "@/assets/edit";
import DeleteIcon from "@/assets/delete";
import TextArea from "@/components/atoms/textArea";
import Button from "@/components/atoms/button";
import { useRouter } from "next/navigation";
interface CommentsInterface {
  comments: CommentResponse[];
}

interface CommentDetails {
  id: string | null;
  comment: string;
}
export default function Comments({ comments }: CommentsInterface): JSX.Element {
  const router = useRouter();
  const [commentDetails, setCommentDetails] = useState<CommentDetails>({
    id: null,
    comment: "",
  });

  const onEditClick = useCallback((id: string, text: string): void => {
    setCommentDetails({ id, comment: text });
  }, []);

  const onDeleteClick = useCallback((id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;
    deleteComments(id);
  }, []);

  const deleteComments = useCallback(async (id: string): Promise<void> => {
    await deleteComment(id);
    router.refresh();
  }, []);

  const editComment = useCallback(async (): Promise<void> => {
    if (commentDetails.comment && commentDetails.id) {
      const payload = {
        comment: commentDetails.comment,
        commentId: commentDetails.id,
      };
      const { data } = await updateComment(payload);
      if (data) {
        alert("comment updated");
        setCommentDetails({
          id: null,
          comment: "",
        });
      }
      router.refresh();
    }
  }, [commentDetails]);
  const renderComments = useCallback((): React.ReactNode => {
    return comments.map((comment) => {
      const isEditing = commentDetails.id === comment._id;

      return (
        <div
          className="border border-gray-100 rounded-lg p-2"
          key={comment._id}
        >
          <div className="flex flex-row">
            <div className="flex-grow">
              <Typography className="!text-[10px]">{comment.movie}</Typography>
              <Typography className="!text-[8px] text-gray-500 mb-1">
                {formatDate(comment.createdAt)}
              </Typography>
            </div>
            <div className="flex flex-col gap-1">
              {isEditing ? null : (
                <EditIcon
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onEditClick(comment._id, comment.text)}
                />
              )}
              <DeleteIcon
                className="h-3 w-3 cursor-pointer text-red-400"
                onClick={() => onDeleteClick(comment._id)}
              />
            </div>
          </div>

          {isEditing ? (
            <div className="flex flex-col gap-2 mt-2">
              <TextArea
                value={commentDetails.comment}
                onChange={(event) =>
                  setCommentDetails({
                    id: comment._id,
                    comment: event.target.value,
                  })
                }
              />
              <div className="flex flex-row gap-2 w-50">
                <Button
                  label="Cancel"
                  variant={ButtonVariant.outlined}
                  onClick={() => {
                    setCommentDetails({
                      id: null,
                      comment: "",
                    });
                  }}
                />
                <Button label="Save" onClick={editComment} />
              </div>
            </div>
          ) : (
            <Typography className="!text-[10px] text-gray-500">
              {comment.text}
            </Typography>
          )}
        </div>
      );
    });
  }, [comments, commentDetails, onEditClick]);
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
