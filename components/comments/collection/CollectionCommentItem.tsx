import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import CollectionCommentAction from "./CollectionCommentAction";
import CollectionCommentLikeButton from "./CollectionCommentLikeButton";
import { useSession } from "next-auth/react";

export default function CollectionCommentItem({
  comment,
  mutate,
}: Readonly<{ comment: CommentType; mutate: () => void }>) {
  const { data: session } = useSession();
  return (
    <>
      {comment.user && (
        <div className="group flex w-full flex-row space-x-3 dark:border-slate-700">
          <div>
            {comment.user.image && (
              <div
                style={{
                  backgroundImage: `url(${comment.user.image ?? ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="size-8 rounded-full"
              ></div>
            )}
            {!comment.user.image && comment.user.name && (
              <span className="flex size-8 items-center justify-center rounded-full bg-sky-500 p-2 text-sky-50">
                {comment.user.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="w-full py-0">
            <p className="text-[.9rem] font-normal text-slate-500 transition-all duration-300 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-400">
              <span className="mr-2 inline-block font-medium text-slate-900 dark:text-slate-100">
                {comment.user?.name}
              </span>
              {comment.text}
            </p>

            <div className="mt-1 flex flex-row items-center space-x-4">
              <CollectionCommentLikeButton
                mutate={mutate}
                liked={
                  (session &&
                    comment.CommentLike &&
                    comment.CommentLike.some(
                      (like) => like.userId === session?.user?.id,
                    )) ||
                  false
                }
                count={comment.likeCount}
                commentId={comment.id}
              />
              <span className="text-sm font-normal text-slate-500 dark:text-slate-500">
                {dayjs(comment.date).fromNow(true)}
              </span>

              <CollectionCommentAction
                mutate={mutate}
                userId={comment.userId}
                commentId={comment.id}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
