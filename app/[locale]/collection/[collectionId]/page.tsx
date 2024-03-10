import Link from "next/link";
import CollectionCard from "./CollectionCard";
import CollectionItem from "../../../../components/CollectionItem";
import CollectionComments from "@/app/[locale]/collection/[collectionId]/CollectionComments";
import prisma from "@/lib/prisma";

async function getCollectionById(id: string): Promise<Collection | null> {
  const collection = await prisma.collection.findFirst({
    where: { id },
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

async function getCollectionDetails(collectionId: string): Promise<{
  collection: Collection | null;
  ownerUser: User | null;
  items: Item[] | [];
}> {
  try {
    const collection = await getCollectionById(collectionId);

    if (collection) {
      try {
        const items = await getItemsByCollectionId(collection.id);
        const owner = await getUserById(collection.ownerId);
        return { collection, ownerUser: owner, items };
      } catch (error) {
        console.error(
          `Error fetching user for collection ${collection.id}:`,
          error,
        );
        return { collection, ownerUser: null, items: [] }; // Indicate missing user data
      }
    }

    return { collection: null, ownerUser: null, items: [] }; // Indicate missing collection
  } catch (error) {
    console.error(`Error fetching collection ${collectionId}:`, error);
    return { collection: null, ownerUser: null, items: [] }; // Indicate error
  }
}

export default async function page({
  params,
}: {
  params: {
    collectionId: string;
  };
}) {
  const { collection, ownerUser, items } = await getCollectionDetails(
    params.collectionId,
  );

  return (
    <div className="container my-10 max-w-7xl">
      <div className="flex flex-col lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="flex w-full flex-col space-y-4 rounded lg:max-w-sm">
          {ownerUser && collection && (
            <>
              <CollectionCard ownerUser={ownerUser} collection={collection} />
              <CollectionComments collectionId={collection?.id} />
            </>
          )}
        </div>
        {items.length !== 0 && (
          <div className="mt-20 grid h-fit w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
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
