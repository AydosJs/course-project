import { getServerSession } from "next-auth";
import CollectionForm from "./CollectionForm";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";

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
  const session = await getServerSession(authOptions);

  if (
    collection &&
    collection.ownerId !== session?.user.id &&
    !session?.user.isAdmin
  ) {
    redirect("/");
  }

  return (
    <div className="container my-10 max-w-7xl">
      <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="mx-auto flex w-full max-w-xl  flex-col rounded border-slate-900/10 dark:border-slate-50/[0.06] sm:border sm:bg-slate-50 sm:p-4 sm:px-5 sm:dark:bg-slate-800/50">
          <h1 className="mb-6 text-lg tracking-tight text-slate-900 dark:text-slate-200">
            Edit Collection
          </h1>
          {collection && <CollectionForm collection={collection} />}
        </div>
      </div>
    </div>
  );
}
