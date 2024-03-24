import prisma from "@/lib/prisma";
import { CollectionDataTable } from "./collection-data-table";
import { CollectionColumns } from "./collection-columns";

async function getCollections(): Promise<Collection[]> {
  const collection = await prisma.collection.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      Item: true,
    },
  });

  collection.sort((a: any, b: any) => {
    return (
      new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    );
  });

  return collection;
}

export default async function CollectionTable() {
  const collections = await getCollections();

  return (
    <div>
      {collections && (
        <CollectionDataTable columns={CollectionColumns} data={collections} />
      )}
    </div>
  );
}
