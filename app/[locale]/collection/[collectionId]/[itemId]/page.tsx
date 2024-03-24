import initTranslations from "@/app/i18n";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import ItemLikeButton from "./ItemLikeButton";
import Description from "./Description";
import Link from "next/link";
import ItemComments from "./ItemComments";

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
  const { t } = await initTranslations(params.locale, ["default"]);
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
              <ItemLikeButton
                itemId={item.id as string}
                likeCount={item.likeCount as number}
                likes={item.ItemLike as ItemLike[]}
              />
            </div>

            <div>
              <h1 className="text-xl text-slate-800 dark:text-slate-100">
                {item.name}
              </h1>
              <Description description={item?.description} />
            </div>

            <div className="flex flex-col divide-y rounded font-normal">
              <ListItem
                label="Collection name"
                value={item.collection?.name as string}
              />
              <ListItem
                label="Collection topic"
                value={item.collection?.topic as string}
              />
              <ListItem label="Author" value={item.user?.name as string} />
              <div className="flex flex-row items-center text-sm">
                <p className="w-1/2 py-3 md:w-1/3">Tags</p>
                <div className="flex w-1/2 flex-row flex-wrap gap-2 py-3 md:w-2/3 ">
                  {item.Tags &&
                    item.Tags.length !== 0 &&
                    item.Tags.map((item) => (
                      <Link
                        href={`/search?q=${encodeURI(item.text as string)}`}
                        key={item.id}
                      >
                        <span
                          className="cursor-pointer whitespace-nowrap text-nowrap rounded-full border-2 border-sky-500/20 bg-sky-500/10 px-2 py-1 font-normal text-sky-500 hover:border-sky-500/50 hover:text-sky-400"
                          key={item.id}
                        >
                          #{item.text}
                        </span>
                      </Link>
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

            <ItemComments itemId={item.id as string} />
          </div>
        </div>
      )}
    </>
  );
}

const ListItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-row items-center text-sm">
      <p className="w-1/2 py-3 md:w-1/3">{label}</p>
      <p className="w-1/2 py-3 text-slate-400 md:w-2/3">{value}</p>
    </div>
  );
};
