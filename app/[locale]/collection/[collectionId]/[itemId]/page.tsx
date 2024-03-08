import CommentItem from "@/components/CommentItem";
import Button from "@/components/form-elements/Button";
import { FaRegCalendarAlt, FaRegHeart } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdOutlineTopic } from "react-icons/md";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import { BiSolidUser } from "react-icons/bi";
import AddCommentTextarea from "@/components/AddCommentTextarea";

async function getCollectionById(id: number): Promise<Collection | null> {
  const collection = await prisma.collection.findUnique({
    where: { id },
  });
  return collection;
}
async function getItemById(id: number): Promise<Item | null> {
  const item = await prisma.item.findUnique({
    where: { id },
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
  const item = await getItemById(Number(params.itemId));
  const collection = await getCollectionById(Number(params.collectionId));

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
              <div className="mb-4 flex w-full items-center justify-end sm:mb-0">
                <div className="flex w-fit cursor-pointer flex-row items-center truncate rounded-full border-2 border-sky-500/30 px-3 py-1.5 text-sky-500 transition-all duration-300 hover:border-sky-500 hover:bg-sky-500/10 dark:hover:text-sky-400">
                  <FaRegHeart className="size-4.5 mr-2" />
                  {item.likeCount}
                </div>
              </div>
              <div className="flex w-full flex-col flex-wrap divide-y md:flex-row md:divide-y-0">
                <div className="flex  w-full cursor-pointer flex-row items-center border-sky-500/30 p-2 py-3 text-sky-500 transition-all duration-300 hover:border-sky-500 dark:hover:text-sky-400 md:w-auto">
                  <span className="flex flex-row flex-nowrap">
                    <BiSolidUser className="mr-2 size-5 md:hidden" />
                    Author:&nbsp;
                  </span>
                  {collection?.name}
                </div>
                <div className="flex  w-full cursor-pointer flex-row items-center border-sky-500/30 p-2 py-3 text-sky-500 transition-all duration-300 hover:border-sky-500 dark:hover:text-sky-400 md:w-auto">
                  <span className="flex flex-row flex-nowrap">
                    <MdDriveFileRenameOutline className="mr-2 size-5 md:hidden" />
                    Name:&nbsp;
                  </span>
                  {collection?.name}
                </div>
                <div className="flex  w-full cursor-pointer flex-row items-center border-sky-500/30 p-2 py-3 text-sky-500 transition-all duration-300 hover:border-sky-500 dark:hover:text-sky-400 md:w-auto">
                  <span className="flex flex-row flex-nowrap">
                    <MdOutlineTopic className="mr-2 size-5 md:hidden" />
                    Topic:&nbsp;
                  </span>
                  {collection?.topic}
                </div>
                <div className="flex  w-full cursor-pointer flex-row items-center border-sky-500/30 p-2 py-3 text-sky-500 transition-all duration-300 hover:border-sky-500 dark:hover:text-sky-400 md:w-auto">
                  <span className="flex flex-row flex-nowrap">
                    <FaRegCalendarAlt className="mr-2 size-5 sm:size-4 md:hidden" />
                    Published:&nbsp;
                  </span>
                  {dayjs(item.publishedAt).format("MMM D, YYYY	")}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              {item.tags.length !== 0 &&
                item.tags.map((item, index) => (
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
                13 Comments
              </h1>

              <AddCommentTextarea />
              {/* <div className="mt-4 flex flex-row space-x-3">
                <div>
                  <span className="flex size-8 items-center justify-center rounded-full bg-sky-500 p-2">
                    J
                  </span>
                </div>
                <div className="flex w-full flex-col items-end space-y-2">
                  <textarea
                    className="text-md peer w-full rounded border-2 bg-slate-100 p-2 font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600 "
                    name=""
                    id=""
                    rows={2}
                    placeholder="Add a comment..."
                  />
                  <div className="opacity-50 peer-focus:opacity-100">
                    <Button className="w-auto p-2 text-sm">Comment</Button>
                  </div>
                </div>
              </div> */}

              <div className="mt-6 flex flex-col space-y-6">
                <CommentItem />
                <CommentItem />
                <CommentItem />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
