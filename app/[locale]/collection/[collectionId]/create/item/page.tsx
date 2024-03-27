import ItemTableList from "./ItemTable/ItemTableList";
import initTranslations from "@/app/i18n";
import prisma from "@/lib/prisma";
import ItemForm from "./ItemForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";

interface Props {
  params: {
    locale: string;
    collectionId: string;
  };
}

async function getCollection(collectionId: string): Promise<Collection | null> {
  const collection = await prisma.collection.findFirst({
    where: {
      id: collectionId,
    },
    include: {
      Item: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  collection?.Item.sort((a, b) => {
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  return collection;
}

export default async function CreateCollectionItem({
  params: { locale, collectionId },
}: Readonly<Props>) {
  const { t } = await initTranslations(locale, ["default"]);
  const collection = await getCollection(collectionId);

  const session = await getServerSession(authOptions);

  if (!session) return;

  if (
    collection &&
    collection?.ownerId !== session?.user.id &&
    !session?.user.isAdmin
  ) {
    redirect("/");
  }

  return (
    <div className="container my-10 max-w-7xl">
      <div className="flex flex-col justify-center space-y-12 md:flex-row md:space-x-6 md:space-y-0">
        <div className="flex h-fit w-full flex-col rounded border-slate-900/10 dark:border-slate-50/[0.06]  sm:border sm:bg-slate-50 sm:p-4 sm:px-5 sm:dark:bg-slate-800/50 md:w-1/3 md:max-w-md">
          <h1 className="mb-6 text-lg tracking-tight text-slate-900 dark:text-slate-200">
            {t("create_item")}
          </h1>

          {collection && <ItemForm collection={collection} />}
        </div>

        <div className="flex h-fit w-full flex-col rounded border-slate-900/10  dark:border-slate-50/[0.06] sm:border sm:bg-slate-50 sm:p-4 sm:px-5 sm:dark:bg-slate-800/50 md:w-2/3">
          <h1 className="mb-6 text-lg tracking-tight text-slate-900 dark:text-slate-200">
            {t("collection_items")}
          </h1>

          {collection?.Item && collection?.Item.length !== 0 && (
            <ItemTableList collectionItems={collection.Item} />
          )}
          {collection?.Item && collection?.Item.length === 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No items yet!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
