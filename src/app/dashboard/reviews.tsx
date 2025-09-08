"use client";
import { JSX, useCallback, useEffect, useState } from "react";
import { CommentsResponse } from "../../../services/movies";
import Table from "@/components/molecules/table";
import { columns } from "../constants/dashboard";
import EyeIcon from "@/assets/eye";
import DeleteIcon from "@/assets/delete";
import EyeSlash from "@/assets/eye-slash";
import { deleteComment, updateCommentStatus } from "../../../services/profile";
import { useRouter } from "next/navigation";
interface CommentProps {
  reviews: CommentsResponse[];
}

interface ReviewRow {
  id: string;
  user: string;
  movie: string;
  comment: string;
  date: string;
  status: JSX.Element;
  actions: JSX.Element;
}
export default function Reviews({ reviews }: CommentProps): JSX.Element {
  const router = useRouter();
  const [rows, setRows] = useState<ReviewRow[]>([]);

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

  const updateStatus = useCallback(async (id: string, flag: boolean) => {
    await updateCommentStatus(id, flag);
    router.refresh();
  }, []);
  useEffect(() => {
    setRows(
      reviews.map((c) => ({
        id: c._id,
        user: c.user?.name,
        movie: c.movie?.title,
        comment: c.text,
        date: new Date(c.createdAt).toLocaleString(),
        status: (
          <span
            className={`px-2 py-0.5 rounded-sm !text-[10px] capitalize  ${
              c.status === "visible"
                ? "bg-[#030213] text-white"
                : c.status === "hidden"
                ? "bg-gray-200 text-gray-700"
                : "bg-green-100 text-green-600"
            }`}
          >
            {c.status}
          </span>
        ),
        actions: (
          <div className="flex gap-2">
            <div
              className="border rounded flex gap-1 items-center justify-center p-1 border-gray-200 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                updateStatus(c._id, !(c.status === "visible"));
              }}
            >
              {c.status === "visible" ? (
                <EyeSlash className="h-3 w-3" />
              ) : (
                <EyeIcon className="h-3 w-3" />
              )}
            </div>
            <div
              className="border rounded flex gap-1 items-center justify-center p-1 border-gray-200 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                onDeleteClick(c._id);
              }}
            >
              <DeleteIcon className="h-3 w-3 text-red-500" />
            </div>
          </div>
        ),
      }))
    );
  }, [reviews]);
  return <Table columns={columns} rows={rows} />;
}
