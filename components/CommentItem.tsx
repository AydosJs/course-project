import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import prisma from "@/lib/prisma";
import { Heart } from "lucide-react";

async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where: { id },
  });
  return user;
}

async function getCommentLikes(commentId: string): Promise<CommentLike[]> {
  const item = await prisma.commentLike.findMany({
    where: {
      commentId,
    },
  });

  return item;
}

export default async function CommentItem(comment: Readonly<CommentType>) {
  if (!comment.userId) return;

  const owner = await getUserById(comment.userId);
  console.log("owner", owner);
  // const likes = await getCommentLikes(comment.id);

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
              <span className="flex size-8 items-center justify-center rounded-full bg-sky-500 p-2">
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

            <div className="mt-1 flex flex-row space-x-4">
              <div className="group/like flex w-fit cursor-pointer flex-row items-center text-slate-500 hover:text-sky-500">
                <div className="rounded-full p-1  group-hover/like:bg-sky-500/30">
                  <Heart className="relative size-4" />
                </div>
                <span className="text-sm font-medium">{comment.likeCount}</span>
              </div>
              <div>
                <span className="text-sm font-normal text-slate-500 dark:text-slate-500">
                  {dayjs(comment.date).fromNow(true)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
