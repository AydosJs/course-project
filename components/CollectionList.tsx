import { authOptions } from "@/app/api/auth/authOptions";
import CollectionCard from "@/components/CollectionCard";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";

async function getCollection(): Promise<Collection[]> {
  const collections = await prisma.collection.findMany({
    // orderBy: {
    //   publishedAt: "asc",
    // },
    include: {
      Item: true,
    },
  });

  collections.sort((a, b) => {
    return (
      new Date(b.Item.length).getTime() - new Date(a.Item.length).getTime()
    );
  });

  return collections;
}
export default async function CollectionList() {
  const collections = await getCollection();
  const session = await getServerSession(authOptions);

  return (
    <>
      {/* {collections.length === 0 && <div>No collections yet!</div>} */}

      {collections.length !== 0 &&
        collections.slice(0, session ? 6 : 5).map((collection) => (
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
