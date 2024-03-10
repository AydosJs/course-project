import CommentItem from "@/components/CommentItem";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import AddCommentTextarea from "@/components/AddCommentTextarea";
import {
  CalendarDays,
  Heart,
  MessageCircleCode,
  SquarePen,
  UserRound,
} from "lucide-react";

async function getCollectionById(id: string): Promise<Collection | null> {
  const collection = await prisma.collection.findFirst({
    where: { id },
  });
  return collection;
}
async function getItemById(id: string): Promise<Item | null> {
  const item = await prisma.item.findFirst({
    where: { id },
  });
  return item;
}

async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where: { id },
  });

  return user;
}

async function getItemComments(itemId: string): Promise<CommentType[]> {
  if (!itemId) {
    return []; // Early return if itemId is not provided
  }
  try {
    const comments = await prisma.itemComments.findMany({
      where: { itemId }, // Filter by matching itemId
    });

    return comments;
  } catch (error) {
    console.error(
      `Error fetching comments for collection ID ${itemId}:`,
      error,
    );
    return []; // Indicate error by returning an empty array
  }
}

async function getItemLikes(itemId: string): Promise<ItemLike[]> {
  if (!itemId) {
    return []; // Early return if itemId is not provided
  }
  const item = await prisma.itemLike.findMany({
    where: {
      itemId,
    },
  });

  return item;
}

export default async function page({
  params,
}: {
  params: {
    collectionId: string;
    itemId: string;
  };
}) {
  const item = await getItemById(params.itemId);
  const collection = await getCollectionById(params.collectionId);
  const itemComments = await getItemComments(params.itemId);
  // const likes = await getItemLikes(params.itemId);
  let owner;

  if (item) {
    const user = await getUserById(item.ownerId);
    owner = user;
  }
  return (
    <>
      {item && (
        <div className="container my-10 w-full max-w-7xl">
          <div className="mx-auto flex w-full max-w-2xl flex-col">
            <div
              style={{
                backgroundImage: `url(${item.cover})`,
              }}
              className="h-56 w-full rounded bg-slate-100 bg-cover bg-center bg-no-repeat dark:bg-slate-800 sm:h-80"
            ></div>

            <div className="mt-6 flex flex-col space-y-4">
              {item?.likeCount !== 0 && (
                <div className="mb-4 flex w-full items-center justify-end sm:mb-0">
                  <div className="flex w-fit cursor-pointer flex-row items-center truncate rounded-full border-2 border-sky-500/30 px-3 py-1.5 text-sky-500 transition-all duration-300 hover:border-sky-500 hover:bg-sky-500/10 dark:hover:text-sky-400">
                    <Heart className="mr-2 size-5" />
                    {item?.likeCount}
                  </div>
                </div>
              )}
              <div className="flex w-full flex-col flex-wrap divide-y md:flex-row md:divide-y-0">
                {owner && (
                  <div className="flex  w-full cursor-pointer flex-row items-center border-sky-500/30 p-2 py-3 text-sky-500 transition-all duration-300 hover:border-sky-500 dark:hover:text-sky-400 md:w-auto">
                    <span className="flex flex-row flex-nowrap">
                      <UserRound className="mr-2 size-5 md:hidden" />
                      Author:&nbsp;
                    </span>
                    {owner?.name}
                  </div>
                )}
                <div className="flex  w-full cursor-pointer flex-row items-center border-sky-500/30 p-2 py-3 text-sky-500 transition-all duration-300 hover:border-sky-500 dark:hover:text-sky-400 md:w-auto">
                  <span className="flex flex-row flex-nowrap">
                    <SquarePen className="mr-2 size-5 md:hidden" />
                    Name:&nbsp;
                  </span>
                  {collection?.name}
                </div>
                <div className="flex  w-full cursor-pointer flex-row items-center border-sky-500/30 p-2 py-3 text-sky-500 transition-all duration-300 hover:border-sky-500 dark:hover:text-sky-400 md:w-auto">
                  <span className="flex flex-row flex-nowrap">
                    <MessageCircleCode className="mr-2 size-5 md:hidden" />
                    Topic:&nbsp;
                  </span>
                  {collection?.topic}
                </div>
                <div className="flex  w-full cursor-pointer flex-row items-center border-sky-500/30 p-2 py-3 text-sky-500 transition-all duration-300 hover:border-sky-500 dark:hover:text-sky-400 md:w-auto">
                  <span className="flex flex-row flex-nowrap">
                    <CalendarDays className="mr-2 size-5 sm:size-4 md:hidden" />
                    Published:&nbsp;
                  </span>
                  {dayjs(item.publishedAt).format("MMM D, YYYY	")}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              {item.tags.length !== 0 &&
                item.tags.map((item) => (
                  <span
                    key={item}
                    className="cursor-pointer text-sm text-slate-400 transition-all duration-300 hover:text-slate-900 dark:text-slate-300  dark:hover:text-slate-100"
                  >
                    #{item}
                  </span>
                ))}
            </div>

            <h1 className="mt-2 text-xl text-slate-800 dark:text-slate-100">
              {item.name}
            </h1>

            <p className="text-md mt-2 text-slate-400 transition-all duration-300 dark:text-slate-400">
              {item.description}
            </p>

            <div className="!mt-12">
              <h1 className="text-md font-medium text-slate-800 dark:text-slate-100">
                {itemComments.length} Comments
              </h1>

              <AddCommentTextarea />

              {itemComments.length > 0 && (
                <div className="mt-6 flex flex-col space-y-6">
                  {itemComments.map((item) => (
                    <CommentItem key={item.id} {...item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
