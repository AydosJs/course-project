import initTranslations from "@/app/i18n";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import ItemLikeButton from "./ItemLikeButton";
import Description from "./Description";
import Link from "next/link";
import ItemComments from "./ItemComments";
import { ImageOff } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import ItemViewActions from "./ItemViewActions";

async function getItemById(id: string): Promise<Item | null> {
  const item = await prisma.item.findFirst({
    where: { id },
    include: {
      ItemComments: true,
      collection: {
        select: {
          id: true,
          name: true,
          topic: true,
        },
      },
      Tags: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      ItemLike: true,
    },
  });

  return item;
}

async function getTagsById(id: string[]): Promise<Tags[] | null> {
  const tags = await prisma.tags.findMany({
    where: {
      id: {
        in: id,
      },
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
  const tags = await getTagsById(item?.tagsId ? item?.tagsId : []);

  const { t } = await initTranslations(params.locale, ["default"]);
  const customFields = JSON.parse(item?.customFields as string);
  const session = await getServerSession(authOptions);

  return (
    <>
      {item && (
        <div className="container my-10 w-full max-w-7xl">
          <div className="mx-auto flex w-full max-w-2xl flex-col space-y-6">
            <div
              style={{
                backgroundImage: `url(${item.cover})`,
              }}
              className="relative h-56 w-full overflow-hidden rounded bg-slate-100 bg-cover bg-center bg-no-repeat dark:bg-slate-800/20 sm:h-80"
            >
              {item.cover === "" && (
                <>
                  <ImageOff className=" absolute left-1/2 top-1/2 size-10 -translate-x-1/2   -translate-y-1/2 opacity-60 dark:text-sky-500" />
                  <div className="absolute inset-0 -z-10 h-full w-full border-2 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-10 [background-size:20px_20px]"></div>
                </>
              )}
            </div>
            {tags?.length !== 0 && (
              <div className="flex flex-row flex-wrap gap-x-2 gap-y-4">
                {tags &&
                  tags.length !== 0 &&
                  tags.map((item) => (
                    <Link
                      href={`/search?q=${encodeURI(item.text)}`}
                      key={item.id}
                    >
                      <span
                        className="cursor-pointer whitespace-nowrap text-nowrap rounded-full border-2 border-sky-500/20 bg-sky-500/10 px-2 py-1 text-sm font-normal text-sky-500 hover:border-sky-500/50 hover:text-sky-400"
                        key={item.id}
                      >
                        #{item.text}
                      </span>
                    </Link>
                  ))}
              </div>
            )}

            <div className="flex w-full flex-row-reverse items-center justify-between pr-4 lg:flex-row lg:pl-4 lg:pr-0">
              <ItemLikeButton
                itemId={item.id as string}
                likeCount={item.likeCount}
                likes={item.ItemLike as ItemLike[]}
              />

              {(session?.user.id === item?.ownerId ||
                session?.user.isAdmin) && <ItemViewActions item={item} />}
            </div>

            <div>
              <h1 className="text-xl text-slate-800 dark:text-slate-100">
                {item.name}
              </h1>
              <Description description={item?.description} />
            </div>

            <div className="flex flex-col rounded font-normal">
              <h1 className="mb-2 border-b pb-2 text-lg font-medium text-slate-600 dark:text-slate-100">
                {t("collection_info")}
              </h1>
              <ListItem label="Name" value={item.collection?.name as string} />
              <ListItem
                label="Topic"
                value={item.collection?.topic as string}
              />
              <ListItem label="Owner" value={item.user?.name as string} />
            </div>

            <div className="flex flex-col rounded font-normal">
              <h1 className="mb-2 border-b pb-2 text-lg font-medium text-slate-600 dark:text-slate-100">
                {t("item_info")}
              </h1>

              {customFields?.map(
                (
                  field: {
                    label: string;
                    value: string;
                    type: "string" | "number" | "boolean" | "date";
                  },
                  index: number,
                ) => (
                  <ListItem
                    key={index + field.label}
                    label={field.label}
                    value={
                      field.type === "date"
                        ? dayjs(field.value).format("MMM D, YYYY")
                        : field.value
                    }
                  />
                ),
              )}

              <ListItem
                label="Published"
                value={dayjs(item.publishedAt).format("MMM D, YYYY")}
              />
            </div>

            <ItemComments itemId={item.id as string} />
          </div>
        </div>
      )}
    </>
  );
}

const ListItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-row items-center space-x-2 text-sm">
      <p className="w-fit truncate py-3 capitalize dark:text-slate-400">
        {label}
      </p>
      <div className="flex-grow border-t border-dashed"></div>
      <p className="w-fit truncate py-3 text-right text-slate-400">{value}</p>
    </div>
  );
};
