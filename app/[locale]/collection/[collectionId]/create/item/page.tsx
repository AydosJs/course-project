import ItemForm from "./ItemFrom";
import ItemTableList from "./ItemTableList";
import initTranslations from "@/app/i18n";
import prisma from "@/lib/prisma";

interface Props {
  params: {
    locale: string; // Specify type as string
    collectionId: string;
  };
}

async function getCollectionItems(collectionId: string): Promise<Item[]> {
  const items = await prisma.item.findMany({
    where: {
      collectionId,
    },
  });

  return items;
}

export default async function CreateCollectionItem({
  params: { locale, collectionId },
}: Readonly<Props>) {
  const { t } = await initTranslations(locale, ["default"]);
  const collectionItems = await getCollectionItems(collectionId);

  return (
    <div className="container my-10 max-w-7xl">
      <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
        <div className="flex h-fit w-full flex-col rounded border border-slate-900/10  bg-slate-50 p-4 px-5 dark:border-slate-50/[0.06] dark:bg-slate-800/50 md:w-1/3 md:max-w-md">
          <h1 className="mb-6 text-lg tracking-tight text-slate-900 dark:text-slate-200">
            {t("create_item")}
          </h1>

          <ItemForm collectionId={collectionId} />
        </div>

        <div className="flex h-fit w-full flex-col rounded border  border-slate-900/10 bg-slate-50 p-4 px-5 dark:border-slate-50/[0.06] dark:bg-slate-800/50 md:w-2/3">
          <h1 className="mb-6 text-lg tracking-tight text-slate-900 dark:text-slate-200">
            {t("collection_items")}
          </h1>

          {collectionItems.length !== 0 && (
            <ItemTableList collectionItems={collectionItems} />
          )}
          {collectionItems.length === 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No items yet!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
