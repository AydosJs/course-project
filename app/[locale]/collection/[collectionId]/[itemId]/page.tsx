import initTranslations from "@/app/i18n";
import CommentItem from "@/components/CommentItem";
import ItemCommentTextarea from "@/components/item-comment/ItemCommentTextarea";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import { Heart } from "lucide-react";

async function getCollectionById(
  id: string,
): Promise<Omit<Collection, "customFields"> | null> {
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

async function getItemTagsById(ids: string[]): Promise<Tags[]> {
  const tags = await prisma.tags.findMany({
    where: {
      OR: ids.map((id) => ({ id })),
    },
  });

  return tags;
}

export default async function page({
  params,
}: {
  params: {
    collectionId: string;
    itemId: string;
    locale: string;
  };
}) {
  const item = await getItemById(params.itemId);
  const collection = await getCollectionById(params.collectionId);
  const itemComments = await getItemComments(params.itemId);
  const { t } = await initTranslations(params.locale, ["default"]);

  // const likes = await getItemLikes(params.itemId);
  let owner;
  let tags: Tags[] = [];

  if (item) {
    const user = await getUserById(item.ownerId);
    const fetchTags = await getItemTagsById(item.tagsId);
    tags = fetchTags;
    owner = user;
  }

  const customFields = JSON.parse(item?.customFields as string);

  return (
    <>
      {item && (
        <div className="container my-10 w-full max-w-7xl">
          <div className="mx-auto flex w-full max-w-2xl flex-col space-y-6">
            <div
              style={{
                backgroundImage: `url(${item.cover})`,
              }}
              className="h-56 w-full rounded bg-slate-100 bg-cover bg-center bg-no-repeat dark:bg-slate-800 sm:h-80"
            ></div>

            <div className="flex w-full flex-row items-center justify-end space-x-2 px-4 sm:justify-start sm:px-0">
              <div className="group flex w-fit cursor-pointer flex-row items-center text-sky-500 transition-all duration-300  dark:hover:text-sky-400">
                <div className="rounded-full p-1.5 group-hover:bg-sky-500/30">
                  <Heart className="relative size-5" />
                </div>
                <span className="text-base font-medium">17k</span>
              </div>
            </div>

            <div>
              <h1 className="text-xl text-slate-800 dark:text-slate-100">
                {item.name}
              </h1>
              <p className="text-md mt-4 text-slate-400 transition-all duration-300 dark:text-slate-400">
                {item.description}
              </p>
            </div>

            <div className="flex flex-col divide-y rounded font-normal">
              <ListItem
                label="Collection name"
                value={collection?.name as string}
              />
              <ListItem
                label="Collection topic"
                value={collection?.topic as string}
              />
              <ListItem label="Author" value={owner?.name as string} />
              <div className="flex flex-row items-center text-sm">
                <p className="w-1/2 py-2.5 md:w-1/3">Tags</p>
                <div className="flex w-1/2 flex-row flex-wrap gap-2 py-2.5 md:w-2/3 ">
                  {tags.length !== 0 &&
                    tags.map((item) => (
                      <span
                        className="py-.5 cursor-pointer whitespace-nowrap text-nowrap rounded-full border-2 border-sky-500/20 bg-sky-500/10 px-2 font-normal text-sky-500 hover:border-sky-500/50 hover:text-sky-400"
                        key={item.id}
                      >
                        #{item.text}
                      </span>
                    ))}
                </div>
              </div>

              {customFields?.map(
                (field: { label: string; value: string }, index: number) => (
                  <ListItem
                    key={index + field.label}
                    label={field.label}
                    value={field.value}
                  />
                ),
              )}

              <ListItem
                label="Published"
                value={dayjs(item.publishedAt).format("MMM D, YYYY")}
              />
            </div>

            <div className="!mt-12">
              <h1 className="text-md mb-4 font-medium text-slate-800 dark:text-slate-100">
                {itemComments.length} {t("comments")}
              </h1>
              <hr className="mb-4 w-full rounded-full bg-slate-700" />

              {item.id && <ItemCommentTextarea itemId={item.id} />}

              {itemComments.length > 0 && (
                <div className="mt-4 flex flex-col space-y-6">
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

const ListItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-row items-center text-sm">
      <p className="w-1/2 py-2.5 md:w-1/3">{label}</p>
      <p className="w-1/2 py-2.5 text-slate-400 md:w-2/3">{value}</p>
    </div>
  );
};
