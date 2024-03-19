import Link from "next/link";
import CollectionCard from "./CollectionCard";
import CollectionItem from "../../../../components/CollectionItem";
import CollectionComments from "@/app/[locale]/collection/[collectionId]/CollectionComments";
import prisma from "@/lib/prisma";

async function getCollectionById(id: string): Promise<Collection | null> {
  const collection = await prisma.collection.findFirst({
    where: { id },
    include: {
      Item: {
        include: {
          Tags: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return collection;
}

async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where: { id },
  });

  return user;
}

async function getItemsByCollectionId(collectionId: string): Promise<Item[]> {
  try {
    const items = await prisma.item.findMany({
      where: { collectionId }, // Filter by matching collectionId
    });

    return items;
  } catch (error) {
    console.error(
      `Error fetching items for collection ID ${collectionId}:`,
      error,
    );
    return []; // Indicate error by returning an empty array
  }
}

export default async function page({
  params,
}: {
  params: {
    collectionId: string;
  };
}) {
  const collection = await getCollectionById(params.collectionId);

  return (
    <div className="container my-10 max-w-7xl">
      <div className="flex flex-col lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="flex w-full flex-col space-y-4 rounded lg:max-w-sm">
          {collection && collection && (
            <>
              <CollectionCard
                ownerUser={collection?.user ? collection?.user : null}
                collection={collection}
              />
              <CollectionComments collectionId={collection?.id} />
            </>
          )}
        </div>
        {collection?.Item && collection?.Item.length !== 0 && (
          <div className="mt-20 grid h-fit w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-2 xl:grid-cols-3">
            {collection?.Item.map((item) => (
              <Link
                key={item.id}
                href={`/collection/${collection?.id}/${item.id}`}
              >
                <CollectionItem {...item} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
