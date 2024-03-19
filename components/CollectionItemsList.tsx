import prisma from "@/lib/prisma";
import Link from "next/link";
import CollectionItem from "./CollectionItem";

async function getItems(): Promise<Item[]> {
  const items = await prisma.item.findMany();
  return items;
}
export default async function CollectionItemsList() {
  const items = await getItems();

  return (
    <>
      {items.length === 0 && <div>No items yet!</div>}

      <div className="grid h-fit w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-2 xl:grid-cols-4">
        {items.slice(0, 8).map((item) => (
          <Link
            key={item.id}
            href={`/collection/${item.collectionId}/${item.id}`}
          >
            <CollectionItem {...item} />
          </Link>
        ))}
      </div>
    </>
  );
}
