import Link from "next/link";
import CollectionCard from "./CollectionCard";
import CollectionItem from "../../../../components/CollectionItem";
import CollectionComments from "@/app/[locale]/collection/[collectionId]/CollectionComments";
import prisma from "@/lib/prisma";

async function getCollectionById(id: number) {
  const collection = await prisma.collection.findUnique({
    where: { id },
  });
  return collection;
}

export default async function page({
  params,
}: {
  params: {
    collectionId: string;
  };
}) {
  const collection = await getCollectionById(Number(params.collectionId));
  console.log("collection", { collection });
  return (
    <div className="container my-10 max-w-7xl">
      <div className="flex flex-col lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="flex w-full flex-col space-y-4 rounded lg:max-w-sm">
          <CollectionCard
            name={collection?.name}
            description={collection?.description}
            topic={collection?.topic}
            itemLength={13}
            publishedAt={collection?.publishedAt}
            cover={collection?.cover}
          />
          <CollectionComments />
        </div>
        <div className="mt-20 grid h-fit w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-2 xl:grid-cols-3">
          {/* <Link href={`/collection/${params.collectionId}/1`}>
            <CollectionItem />
          </Link>
           */}
        </div>
      </div>
    </div>
  );
}
