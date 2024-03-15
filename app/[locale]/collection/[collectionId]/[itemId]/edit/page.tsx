import initTranslations from "@/app/i18n";
import prisma from "@/lib/prisma";
import ItemEditForm from "./ItemEditForm";

interface Props {
  params: {
    locale: string;
    itemId: string;
  };
}

interface ItemWithTags {
  item: Item;
  tags: Tags[];
}

async function getItemById(id: string): Promise<ItemWithTags | null> {
  if (!id) return null;
  const item = await prisma.item.findFirst({
    where: {
      id,
    },
  });

  if (!item) return null; // Handle the case where the item is not found

  const tags = await prisma.tags.findMany({
    where: {
      OR: item.tagsId.map((id) => ({ id })),
    },
  });

  return { item, tags };
}

export default async function CreateCollectionItem({
  params: { locale, itemId },
}: Readonly<Props>) {
  const { t } = await initTranslations(locale, ["default"]);
  const data = await getItemById(itemId);

  const item = data?.item ?? null;
  const tags = data?.tags ?? [];

  return (
    <div className="container my-10 max-w-7xl">
      <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
        <div className="flex h-fit w-full flex-col rounded border border-slate-900/10  bg-slate-50 p-4 px-5 dark:border-slate-50/[0.06] dark:bg-slate-800/50 md:max-w-lg">
          <h1 className="mb-6 text-lg tracking-tight text-slate-900 dark:text-slate-200">
            {t("create_item")}
          </h1>

          {item && <ItemEditForm item={item} tags={tags} />}
        </div>
      </div>
    </div>
  );
}
