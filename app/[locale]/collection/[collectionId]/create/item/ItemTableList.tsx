import { ItemComments } from "@prisma/client";
import TableItem from "./TableItem";
import prisma from "@/lib/prisma";

async function getTags(): Promise<Tags[]> {
  const tags = await prisma.tags.findMany({});
  return tags;
}

async function getComments(): Promise<ItemComments[]> {
  const comments = await prisma.itemComments.findMany({});
  return comments;
}

async function getLikes(): Promise<ItemLike[]> {
  const likes = await prisma.itemLike.findMany({});
  return likes;
}

export default async function ItemTableList({
  collectionItems,
}: Readonly<{
  collectionItems: Item[];
}>) {
  const tags = await getTags();
  const comments = await getComments();
  const likes = await getLikes();

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full table-fixed align-middle">
        <div className="min-w-[700px] overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/30">
            <thead>
              <tr className="uppercase text-slate-900 *:font-semibold dark:text-slate-100">
                <th scope="col" className="px-2 py-3 text-start text-xs">
                  Title & Description
                </th>
                <th scope="col" className="px-2 py-3 text-start text-xs">
                  Tags
                </th>
                <th
                  scope="col"
                  className="truncate px-2 py-3 text-start text-xs"
                >
                  Likes & Comm..
                </th>
                <th scope="col" className="px-2 py-3 text-start text-xs">
                  Published
                </th>
                <th scope="col" className="px-2 py-3 text-end text-xs">
                  <span className="mr-1">&</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y  divide-slate-200 dark:divide-slate-700/30">
              {collectionItems.length !== 0 &&
                collectionItems.map((item) => {
                  const matchingTags = tags.filter(
                    (tag) => tag.itemId === item.id,
                  );

                  const matchingComments = comments.filter(
                    (comment) => comment.itemId === item.id,
                  );

                  const matchingLikes = likes.filter(
                    (like) => like.itemId === item.id,
                  );

                  return (
                    <TableItem
                      key={item.id}
                      item={item}
                      tags={matchingTags}
                      comments={matchingComments}
                      likes={matchingLikes}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
