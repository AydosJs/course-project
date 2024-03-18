import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import prisma from "@/lib/prisma";
import CollectionCommentAction from "./CollectionCommentAction";
import CollectionCommentLikeButton from "./CollectionCommentLikeButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where: { id },
  });
  return user;
}

async function getCommentLikes(commentId: string) {
  const res = await prisma.commentLike.findMany({
    where: { commentId },
  });
  return res;
}

export default async function CollectionCommentItem(
  comment: Readonly<CommentType>,
) {
  const owner = await getUserById(comment.userId);
  const session = await getServerSession(authOptions);
  const likes = await getCommentLikes(comment.id);

  if (!comment.userId) return;
  return (
    <>
      {owner && (
        <div className="group flex w-full flex-row space-x-3 dark:border-slate-700">
          <div>
            {owner.image && (
              <div
                style={{
                  backgroundImage: `url(${owner.image ?? ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="size-8 rounded-full"
              ></div>
            )}
            {!owner.image && owner.name && (
              <span className="flex size-8 items-center justify-center rounded-full bg-sky-500 p-2 text-sky-50">
                {owner.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="w-full py-0">
            <p className="text-[.9rem] font-normal text-slate-500 transition-all duration-300 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-400">
              <span className="mr-2 inline-block font-medium text-slate-900 dark:text-slate-100">
                {owner?.name}
              </span>
              {comment.text}
            </p>

            <div className="mt-1 flex flex-row items-center space-x-4">
              <CollectionCommentLikeButton
                liked={
                  (session &&
                    likes.some((like) => like.userId === session?.user?.id)) ||
                  false
                }
                count={comment.likeCount}
                commentId={comment.id}
              />
              <span className="text-sm font-normal text-slate-500 dark:text-slate-500">
                {dayjs(comment.date).fromNow(true)}
              </span>

              <CollectionCommentAction
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
