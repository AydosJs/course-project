import CollectionCard from "@/components/CollectionCard";
import prisma from "@/lib/prisma";
import Link from "next/link";

async function getCollection(): Promise<Collection[]> {
  const collections = await prisma.collection.findMany();

  return collections;
}
export default async function CollectionList() {
  const collections = await getCollection();

  return (
    <>
      {collections.length === 0 && <div>No collections yet!</div>}

      {collections.length !== 0 &&
        collections.map((collection) => (
          <Link
            className="col-span-2 xl:col-span-2"
            href={`/collection/${collection.id}`}
            key={collection.id}
          >
            <CollectionCard {...collection} />
          </Link>
        ))}
    </>
  );
}
