import dayjs from "dayjs";

interface CollectionCardProps {
  ownerUser: User | null;
  collection: Collection;
}

export default function CollectionCard({
  ownerUser,
  collection,
}: Readonly<CollectionCardProps>) {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${collection.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="h-44 w-full rounded bg-slate-100 bg-cover bg-center bg-no-repeat dark:bg-slate-800 md:h-60"
      ></div>

      <div className="flex w-full flex-row justify-between">
        <p className=" flex flex-col py-2 text-slate-800 dark:text-slate-100">
          <span className="text-sm font-normal text-slate-400 dark:text-slate-500">
            Owner
          </span>
          {ownerUser?.name}
        </p>
        <p className="flex flex-col py-2 text-slate-800 dark:text-slate-100">
          <span className="text-sm font-normal text-slate-400 dark:text-slate-500">
            Topic
          </span>
          {collection.topic}
        </p>
        <p className="flex flex-col py-2 text-slate-800 dark:text-slate-100">
          <span className="text-sm font-normal text-slate-400 dark:text-slate-500">
            Items
          </span>
          null
        </p>
        <p className="flex flex-col py-2 text-slate-800 dark:text-slate-100">
          <span className="text-sm font-normal text-slate-400 dark:text-slate-500">
            Published
          </span>
          {dayjs(collection.publishedAt).format("MMM D, YYYY	")}
        </p>
      </div>

      <div>
        <h1 className="mb-2 text-2xl text-slate-800 dark:text-slate-100">
          {collection.name}
        </h1>
        <p className="text-md text-slate-800 dark:text-slate-500">
          {collection.description}
        </p>
      </div>
    </>
  );
}
