"use client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ItemCommentAction from "./ItemCommentAction";
import ItemCommentLikeButton from "./ItemCommentLikeButton";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
dayjs.extend(relativeTime);

export default function ItemCommentItem({
  comment,
  mutate,
}: Readonly<{ comment: CommentType; mutate: () => void }>) {
  const { data: session } = useSession();

  if (!comment.userId) return;
  return (
    <>
      {comment.user && (
        <div className="group flex w-full flex-row space-x-3 dark:border-slate-700">
          <Avatar className="size-8 border-2">
            <AvatarImage src={comment.user.image as string} />
            <AvatarFallback className="flex items-center justify-center rounded-full bg-sky-500 p-2 text-sky-50">
              {comment.user.name ? comment.user.name.charAt(0) : "?"}
            </AvatarFallback>
          </Avatar>

          <div className="w-full py-0">
            <p className="text-[.9rem] font-normal text-slate-500 transition-all duration-300 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-400">
              <span className="mr-2 inline-block font-medium text-slate-900 dark:text-slate-100">
                {comment.user?.name}
              </span>
              {comment.text}
            </p>

            <div className="mt-1 flex flex-row items-center space-x-4">
              <ItemCommentLikeButton
                liked={
                  (session &&
                    comment.CommentLike &&
                    comment.CommentLike.some(
                      (like) => like.userId === session?.user?.id,
                    )) ||
                  false
                }
                mutate={mutate}
                count={comment.likeCount}
                commentId={comment.id}
              />

              <span className="text-sm font-normal text-slate-500 dark:text-slate-500">
                {dayjs(comment.date).fromNow(true)}
              </span>

              <ItemCommentAction
                mutate={mutate}
                commentId={comment.id}
                userId={comment.userId}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
