import CollectionForm from "./CollectionForm";
import prisma from "@/lib/prisma";

async function getCollectionById(
  collectionId: string,
): Promise<Collection | null> {
  const collection = await prisma.collection.findFirst({
    where: { id: collectionId },
  });
  return collection;
}

export default async function page({
  params,
}: Readonly<{
  params: {
    collectionId: string;
  };
}>) {
  const collection = await getCollectionById(params.collectionId);

  return (
    <div className="container my-10 max-w-7xl">
      <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="mx-auto flex w-full max-w-xl  flex-col rounded border border-slate-900/10 bg-slate-50 p-4 px-5 dark:border-slate-50/[0.06] dark:bg-slate-800/50">
          <h1 className="mb-6 text-lg tracking-tight text-slate-900 dark:text-slate-200">
            Edit Collection
          </h1>
          {collection && <CollectionForm collection={collection} />}
        </div>
      </div>
    </div>
  );
}
